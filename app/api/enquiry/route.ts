import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { EmailDeliveryError } from "@/lib/email/resend";
import { enquirySchema } from "@/lib/enquiry/schema";
import { submitEnquiry } from "@/lib/enquiry/server";

const RATE_LIMIT_MESSAGE = "Your enquiry has been received. If email delivery is delayed, our team will still review your submission shortly.";

function logEnquiryDebug(event: string, details?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    console.info(`[api/enquiry:${event}]`, details || {});
  }
}

async function runSpamProtectionHooks() {
  // Reserved for future rate limiting, CAPTCHA verification, IP reputation checks and blocklists.
  return { allowed: true };
}

export async function POST(request: Request) {
  try {
    logEnquiryDebug("submission-received");
    const body = await request.json();
    const input = enquirySchema.parse(body);
    logEnquiryDebug("validation-success", { type: input.type });
    const spamCheck = await runSpamProtectionHooks();

    if (!spamCheck.allowed) {
      logEnquiryDebug("spam-blocked");
      return NextResponse.json({ error: "Submission blocked." }, { status: 429 });
    }

    logEnquiryDebug("email-generation", { type: input.type });
    logEnquiryDebug("email-send-attempt", { type: input.type });
    const result = await submitEnquiry(input);
    logEnquiryDebug("delivery-success", result);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      logEnquiryDebug("validation-failure", { issues: error.flatten().fieldErrors });
      return NextResponse.json({ error: "Validation failed.", issues: error.flatten().fieldErrors }, { status: 400 });
    }

    if (error instanceof Error && error.message.startsWith("Missing ")) {
      logEnquiryDebug("delivery-failure", { error: error.message });
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (error instanceof EmailDeliveryError && error.isRateLimited) {
      logEnquiryDebug("delivery-rate-limited", {
        error: error.message,
        statusCode: error.statusCode,
        providerResponse: error.providerResponse
      });
      console.error("Unified enquiry Resend rate limit:", error.providerResponse || error);
      return NextResponse.json({ error: RATE_LIMIT_MESSAGE, deliveryDelayed: true }, { status: 429 });
    }

    logEnquiryDebug("delivery-failure", {
      error: error instanceof Error ? error.message : "Unknown error",
      providerResponse: error instanceof EmailDeliveryError ? error.providerResponse : undefined
    });
    console.error("Unified enquiry route error:", error);
    return NextResponse.json({ error: "Could not send your enquiry right now. Please try again shortly." }, { status: 502 });
  }
}
