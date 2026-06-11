import { z } from "zod";

export const enquiryTypes = ["general", "admission", "hostel", "transport"] as const;

export const enquiryTypeLabels: Record<EnquiryType, string> = {
  general: "General Enquiry",
  admission: "Admission Enquiry",
  hostel: "Hostel Enquiry",
  transport: "Transport Enquiry"
};

export const admissionClassOptions = [
  "Nursery",
  "LKG",
  "UKG",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10"
] as const;

export const hostelOptions = ["Yes", "No"] as const;

const tenDigitPhone = (message: string) =>
  z
    .string()
    .trim()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => /^\d{10}$/.test(value), message);

export const basicEnquirySchema = z.object({
  type: z.literal("general"),
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(160),
  phone: tenDigitPhone("Please enter a valid 10-digit phone number"),
  message: z.string().trim().min(10, "Please share a little more detail").max(3000),
  website: z.string().max(0).optional().or(z.literal(""))
});

export const admissionEnquirySchema = z.object({
  type: z.literal("admission"),
  studentName: z.string().trim().min(2, "Please enter the student's name").max(120),
  classSeekingAdmission: z.enum(admissionClassOptions, { required_error: "Please select a class" }),
  previousSchoolName: z.string().trim().max(160).optional().or(z.literal("")),
  previousClassStudied: z.string().trim().max(80).optional().or(z.literal("")),
  fatherName: z.string().trim().min(2, "Please enter the father's name").max(120),
  fatherPhone: tenDigitPhone("Please enter a valid 10-digit father's contact number"),
  motherName: z.string().trim().min(2, "Please enter the mother's name").max(120),
  motherPhone: tenDigitPhone("Please enter a valid 10-digit mother's contact number"),
  parentEmail: z.string().trim().email("Please enter a valid parent email address").max(160),
  contactNumber: tenDigitPhone("Please enter a valid 10-digit contact number"),
  residentialAddress: z.string().trim().min(8, "Please enter the residential address").max(1000),
  transportRequired: z.boolean().optional(),
  hostelFacilityRequired: z.enum(hostelOptions, { required_error: "Please select hostel requirement" }).optional(),
  website: z.string().max(0).optional().or(z.literal(""))
});

export const hostelEnquirySchema = z.object({
  type: z.literal("hostel"),
  parentName: z.string().trim().min(2, "Please enter the parent name").max(120),
  parentEmail: z.string().trim().email("Please enter a valid parent email address").max(160),
  contactNumber: tenDigitPhone("Please enter a valid 10-digit contact number"),
  studentName: z.string().trim().min(2, "Please enter the student's name").max(120),
  className: z.string().trim().min(1, "Please enter the class").max(80),
  message: z.string().trim().max(3000).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal(""))
});

export const transportEnquirySchema = z.object({
  type: z.literal("transport"),
  parentName: z.string().trim().min(2, "Please enter the parent name").max(120),
  parentEmail: z.string().trim().email("Please enter a valid parent email address").max(160),
  contactNumber: tenDigitPhone("Please enter a valid 10-digit contact number"),
  areaLocation: z.string().trim().min(2, "Please enter the area or location").max(160),
  studentName: z.string().trim().min(2, "Please enter the student's name").max(120),
  message: z.string().trim().max(3000).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal(""))
});

export const enquirySchema = z.discriminatedUnion("type", [basicEnquirySchema, admissionEnquirySchema, hostelEnquirySchema, transportEnquirySchema]);

export type EnquiryType = (typeof enquiryTypes)[number];
export type BasicEnquiryInput = z.infer<typeof basicEnquirySchema>;
export type AdmissionEnquiryInput = z.infer<typeof admissionEnquirySchema>;
export type HostelEnquiryInput = z.infer<typeof hostelEnquirySchema>;
export type TransportEnquiryInput = z.infer<typeof transportEnquirySchema>;
export type EnquiryInput = z.infer<typeof enquirySchema>;

export const basicEnquiryDefaults: BasicEnquiryInput = {
  type: "general",
  name: "",
  email: "",
  phone: "",
  message: "",
  website: ""
};

export const admissionEnquiryDefaults = {
  type: "admission",
  studentName: "",
  classSeekingAdmission: "",
  previousSchoolName: "",
  previousClassStudied: "",
  fatherName: "",
  fatherPhone: "",
  motherName: "",
  motherPhone: "",
  parentEmail: "",
  contactNumber: "",
  residentialAddress: "",
  transportRequired: false,
  hostelFacilityRequired: "No",
  website: ""
};

export const hostelEnquiryDefaults = {
  type: "hostel",
  parentName: "",
  parentEmail: "",
  contactNumber: "",
  studentName: "",
  className: "",
  message: "",
  website: ""
};

export const transportEnquiryDefaults = {
  type: "transport",
  parentName: "",
  parentEmail: "",
  contactNumber: "",
  areaLocation: "",
  studentName: "",
  message: "",
  website: ""
};
