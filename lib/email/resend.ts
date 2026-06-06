import "server-only";

import { Resend } from "resend";
import {
  type AdmissionEnquiryInput,
  type BasicEnquiryInput,
  type HostelEnquiryInput,
  type TransportEnquiryInput,
  enquiryTypeLabels
} from "@/lib/enquiry/schema";

const AUTO_REPLY_SUBJECT = "SVPHIS Enquiry Received";
const AUTO_REPLY_TEXT = `Thank you for contacting SVPHIS.

We have successfully received your enquiry.

Our team will review your request and contact you shortly.

Regards,
SVPHIS Administration`;

type EmailResult = Awaited<ReturnType<Resend["emails"]["send"]>>;
type EmailRow = [string, string];
type EmailSection = {
  heading: string;
  rows: EmailRow[];
};

export class EmailDeliveryError extends Error {
  providerResponse?: unknown;
  statusCode?: number;
  isRateLimited: boolean;

  constructor(message: string, options?: { providerResponse?: unknown; statusCode?: number; isRateLimited?: boolean }) {
    super(message);
    this.name = "EmailDeliveryError";
    this.providerResponse = options?.providerResponse;
    this.statusCode = options?.statusCode;
    this.isRateLimited = options?.isRateLimited ?? false;
  }
}

function logEmailDebug(event: string, details?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    console.info(`[resend:${event}]`, details || {});
  }
}

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const schoolEmail = process.env.SCHOOL_CONTACT_EMAIL?.trim();
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || "SVPHIS Website <onboarding@resend.dev>";

  if (!apiKey) {
    logEmailDebug("config-missing", { key: "RESEND_API_KEY" });
    throw new Error("Missing RESEND_API_KEY");
  }

  if (!schoolEmail) {
    logEmailDebug("config-missing", { key: "SCHOOL_CONTACT_EMAIL" });
    throw new Error("Missing SCHOOL_CONTACT_EMAIL");
  }

  logEmailDebug("config-loaded", {
    hasApiKey: Boolean(apiKey),
    schoolEmail,
    fromEmail
  });

  return { apiKey, schoolEmail, fromEmail };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderRows(rows: EmailRow[]) {
  return rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #475569; font-weight: 700; width: 180px;">${escapeHtml(label)}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");
}

function renderSections(sections: EmailSection[]) {
  return sections
    .map(
      (section) => `
        <div style="padding: 18px 24px 4px;">
          <h2 style="margin: 0; color: #005a71; font-size: 16px;">${escapeHtml(section.heading)}</h2>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tbody>${renderRows(section.rows)}</tbody>
        </table>`
    )
    .join("");
}

function renderAdminEmail(title: string, sections: EmailSection[]) {
  return `
    <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px;">
      <div style="max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
        <div style="background: #005a71; color: #ffffff; padding: 22px 24px;">
          <p style="margin: 0 0 6px; color: #f59e0b; font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;">SVPHIS Website</p>
          <h1 style="margin: 0; font-size: 24px; line-height: 1.25;">${escapeHtml(title)}</h1>
        </div>
        ${renderSections(sections)}
      </div>
    </div>`;
}

function formatOptional(value?: string) {
  return value?.trim() || "Not provided";
}

function getStatusCode(value: unknown) {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const source = value as Record<string, unknown>;
  const statusCode = source.statusCode ?? source.status ?? source.code;

  if (typeof statusCode === "number") {
    return statusCode;
  }

  if (typeof statusCode === "string") {
    const parsed = Number.parseInt(statusCode, 10);
    return Number.isNaN(parsed) ? undefined : parsed;
  }

  return undefined;
}

function isRateLimitResponse(value: unknown) {
  const statusCode = getStatusCode(value);
  const message = value instanceof Error ? value.message : JSON.stringify(value ?? "");

  return statusCode === 429 || /rate limit|too many requests/i.test(message);
}

function renderAutoReply() {
  return `
    <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px;">
      <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 28px;">
        <h1 style="margin: 0 0 16px; color: #005a71; font-size: 24px;">SVPHIS Enquiry Received</h1>
        <p style="color: #0f172a; line-height: 1.7;">Thank you for contacting SVPHIS.</p>
        <p style="color: #0f172a; line-height: 1.7;">We have successfully received your enquiry.</p>
        <p style="color: #0f172a; line-height: 1.7;">Our team will review your request and contact you shortly.</p>
        <p style="color: #0f172a; line-height: 1.7;">Regards,<br />SVPHIS Administration</p>
      </div>
    </div>`;
}

async function sendEmail(payload: Parameters<Resend["emails"]["send"]>[0], logLabel: string, config = getEmailConfig()): Promise<EmailResult> {
  const resend = new Resend(config.apiKey);

  logEmailDebug("send-attempt", {
    label: logLabel,
    to: payload.to,
    subject: payload.subject
  });

  try {
    const result = await resend.emails.send(payload);

    logEmailDebug("response", {
      label: logLabel,
      data: result.data,
      error: result.error
    });

    if (result.error) {
      logEmailDebug("send-failure", {
        label: logLabel,
        error: result.error.message,
        providerResponse: result.error
      });
      throw new EmailDeliveryError(result.error.message, {
        providerResponse: result.error,
        statusCode: getStatusCode(result.error),
        isRateLimited: isRateLimitResponse(result.error)
      });
    }

    logEmailDebug("send-success", { label: logLabel, id: result.data?.id });
    return result;
  } catch (error) {
    if (error instanceof EmailDeliveryError) {
      throw error;
    }

    logEmailDebug("send-failure", {
      label: logLabel,
      error: error instanceof Error ? error.message : "Unknown Resend failure",
      providerResponse: error
    });
    throw new EmailDeliveryError(error instanceof Error ? error.message : "Unknown Resend failure", {
      providerResponse: error,
      statusCode: getStatusCode(error),
      isRateLimited: isRateLimitResponse(error)
    });
  }
}

export async function sendBasicEnquiryEmail(input: BasicEnquiryInput) {
  const config = getEmailConfig();
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
  const label = enquiryTypeLabels[input.type];

  return sendEmail({
    from: config.fromEmail,
    to: config.schoolEmail,
    replyTo: input.email,
    subject: "[SVPHIS] New General Enquiry",
    html: renderAdminEmail("NEW GENERAL ENQUIRY", [
      {
        heading: "Submission Details",
        rows: [
          ["Enquiry Type", label],
          ["Submitted At", timestamp]
        ]
      },
      {
        heading: "Contact Information",
        rows: [
          ["Name", input.name],
          ["Email", input.email],
          ["Phone Number", input.phone]
        ]
      },
      {
        heading: "Message",
        rows: [["Message", input.message]]
      }
    ])
  }, `${input.type}-admin`, config);
}

export async function sendContactEmail(input: BasicEnquiryInput) {
  return sendBasicEnquiryEmail(input);
}

export async function sendAdmissionEmail(input: AdmissionEnquiryInput) {
  const config = getEmailConfig();
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
  const label = enquiryTypeLabels[input.type];

  return sendEmail({
    from: config.fromEmail,
    to: config.schoolEmail,
    replyTo: input.parentEmail,
    subject: "[SVPHIS] New Admission Enquiry",
    html: renderAdminEmail("NEW ADMISSION ENQUIRY", [
      {
        heading: "Submission Details",
        rows: [
          ["Enquiry Type", label],
          ["Submitted At", timestamp]
        ]
      },
      {
        heading: "Student Information",
        rows: [
          ["Student Name", input.studentName],
          ["Class Seeking Admission", input.classSeekingAdmission]
        ]
      },
      {
        heading: "Parent Information",
        rows: [
          ["Father's Name", input.fatherName],
          ["Mother's Name", input.motherName],
          ["Parent Email Address", input.parentEmail],
          ["Contact Number", input.contactNumber]
        ]
      },
      {
        heading: "Additional Information",
        rows: [
          ["Previous School", formatOptional(input.previousSchoolName)],
          ["Previous Class Studied", formatOptional(input.previousClassStudied)],
          ["Address", input.residentialAddress],
          ["Hostel Facility Required", input.hostelFacilityRequired]
        ]
      }
    ])
  }, "admission-admin", config);
}

export async function sendHostelEmail(input: HostelEnquiryInput) {
  const config = getEmailConfig();
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
  const label = enquiryTypeLabels[input.type];

  return sendEmail({
    from: config.fromEmail,
    to: config.schoolEmail,
    replyTo: input.parentEmail,
    subject: "[SVPHIS] New Hostel Enquiry",
    html: renderAdminEmail("NEW HOSTEL ENQUIRY", [
      {
        heading: "Submission Details",
        rows: [
          ["Enquiry Type", label],
          ["Submitted At", timestamp]
        ]
      },
      {
        heading: "Student Information",
        rows: [
          ["Student Name", input.studentName],
          ["Class", input.className]
        ]
      },
      {
        heading: "Parent Information",
        rows: [
          ["Parent Name", input.parentName],
          ["Parent Email Address", input.parentEmail],
          ["Contact Number", input.contactNumber]
        ]
      },
      {
        heading: "Additional Information",
        rows: [["Hostel Requirement Details", formatOptional(input.message)]]
      }
    ])
  }, "hostel-admin", config);
}

export async function sendTransportEmail(input: TransportEnquiryInput) {
  const config = getEmailConfig();
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
  const label = enquiryTypeLabels[input.type];

  return sendEmail({
    from: config.fromEmail,
    to: config.schoolEmail,
    replyTo: input.parentEmail,
    subject: "[SVPHIS] New Transport Enquiry",
    html: renderAdminEmail("NEW TRANSPORT ENQUIRY", [
      {
        heading: "Submission Details",
        rows: [
          ["Enquiry Type", label],
          ["Submitted At", timestamp]
        ]
      },
      {
        heading: "Student Information",
        rows: [["Student Name", input.studentName]]
      },
      {
        heading: "Parent Information",
        rows: [
          ["Parent Name", input.parentName],
          ["Parent Email Address", input.parentEmail],
          ["Contact Number", input.contactNumber]
        ]
      },
      {
        heading: "Transport Information",
        rows: [
          ["Area / Location", input.areaLocation],
          ["Message", formatOptional(input.message)]
        ]
      }
    ])
  }, "transport-admin", config);
}

export async function sendAutoReply(to: string) {
  const config = getEmailConfig();

  return sendEmail({
    from: config.fromEmail,
    to,
    subject: AUTO_REPLY_SUBJECT,
    text: AUTO_REPLY_TEXT,
    html: renderAutoReply()
  }, "auto-reply", config);
}
