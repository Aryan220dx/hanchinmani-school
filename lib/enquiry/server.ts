import "server-only";

import { type EnquiryInput } from "@/lib/enquiry/schema";
import { sendAdmissionEmail, sendAutoReply, sendBasicEnquiryEmail, sendHostelEmail, sendTransportEmail } from "@/lib/email/resend";

export async function submitEnquiry(input: EnquiryInput) {
  if (input.type === "admission") {
    await sendAdmissionEmail(input);
    await sendAutoReply(input.parentEmail);
    return {
      ok: true,
      autoReply: "sent" as const
    };
  }

  if (input.type === "hostel") {
    await sendHostelEmail(input);
    await sendAutoReply(input.parentEmail);
    return {
      ok: true,
      autoReply: "sent" as const
    };
  }

  if (input.type === "transport") {
    await sendTransportEmail(input);
    await sendAutoReply(input.parentEmail);
    return {
      ok: true,
      autoReply: "sent" as const
    };
  }

  await sendBasicEnquiryEmail(input);
  await sendAutoReply(input.email);

  return {
    ok: true,
    autoReply: "sent" as const
  };
}
