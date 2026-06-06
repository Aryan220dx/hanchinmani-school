"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { type Resolver, useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import {
  type EnquiryType,
  admissionClassOptions,
  admissionEnquiryDefaults,
  basicEnquiryDefaults,
  enquirySchema,
  enquiryTypeLabels,
  hostelEnquiryDefaults,
  transportEnquiryDefaults
} from "@/lib/enquiry/schema";
import { cn } from "@/lib/utils";

type FormValues = Record<string, string>;

const defaultsByType: Record<EnquiryType, FormValues> = {
  general: basicEnquiryDefaults,
  admission: admissionEnquiryDefaults,
  hostel: hostelEnquiryDefaults,
  transport: transportEnquiryDefaults
};

function FieldError({ message }: { message?: string }) {
  return message ? <span className="text-xs text-red-600">{message}</span> : null;
}

function TextField({ name, label, placeholder, register, error }: { name: string; label: string; placeholder: string; register: ReturnType<typeof useForm<FormValues>>["register"]; error?: string }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700">
      {label}
      <input className="focus-ring rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal" placeholder={placeholder} {...register(name)} />
      <FieldError message={error} />
    </label>
  );
}

export function EnquiryHub({ initialType = "general" }: { initialType?: EnquiryType }) {
  const [successLocked, setSuccessLocked] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const {
    clearErrors,
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(enquirySchema) as unknown as Resolver<FormValues>,
    defaultValues: defaultsByType[initialType]
  });

  const enquiryType = (watch("type") || initialType) as EnquiryType;

  useEffect(() => {
    reset(defaultsByType[enquiryType]);
  }, [enquiryType, reset]);

  async function onSubmit(values: FormValues) {
    if (isSubmitting || successLocked) {
      return;
    }

    clearErrors("root");
    setStatusMessage("");

    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    const data = await response.json().catch(() => ({}));

    if (response.status === 429 && data?.deliveryDelayed) {
      setStatusMessage(data.error || "Your enquiry has been received. If email delivery is delayed, our team will still review your submission shortly.");
      reset(defaultsByType[enquiryType]);
      setSuccessLocked(true);
      window.setTimeout(() => setSuccessLocked(false), 3000);
      return;
    }

    if (!response.ok) {
      setError("root", {
        message: data?.error || "We could not send this message right now. Please try again shortly."
      });
      return;
    }

    reset(defaultsByType[enquiryType]);
    setStatusMessage("Thank you. Your enquiry has been submitted successfully.");
    setSuccessLocked(true);
    window.setTimeout(() => setSuccessLocked(false), 3000);
  }

  return (
    <form className="glass rounded-2xl p-6 shadow-glass md:p-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-5">
        <input className="hidden" tabIndex={-1} autoComplete="off" {...register("website")} />

        <fieldset className="grid gap-3">
          <legend className="font-display text-2xl font-semibold text-text-main">How can we help you?</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {(["general", "admission", "hostel", "transport"] as EnquiryType[]).map((type) => (
              <label
                className={cn(
                  "flex items-center gap-3 rounded-xl border bg-white px-4 py-3 text-sm font-semibold transition",
                  enquiryType === type ? "border-primary/40 text-primary shadow-sm" : "border-slate-200 text-slate-700 hover:border-primary/25"
                )}
                key={type}
              >
                <input className="h-4 w-4 accent-primary" type="radio" value={type} {...register("type")} />
                {enquiryTypeLabels[type]}
              </label>
            ))}
          </div>
        </fieldset>

        {enquiryType === "general" ? (
          <>
            <TextField name="name" label="Name" placeholder="Your name" register={register} error={errors.name?.message} />
            <TextField name="email" label="Email" placeholder="Email address" register={register} error={errors.email?.message} />
            <TextField name="phone" label="Phone Number" placeholder="Mobile number" register={register} error={errors.phone?.message} />
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Message
              <textarea className="focus-ring min-h-32 rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal" placeholder="How can the school office help?" {...register("message")} />
              <FieldError message={errors.message?.message} />
            </label>
          </>
        ) : null}

        {enquiryType === "admission" ? (
          <>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber">Student Details</p>
              <div className="mt-4 grid gap-5">
                <TextField name="studentName" label="Name of Student" placeholder="Student name" register={register} error={errors.studentName?.message} />
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Class Seeking Admission
                  <select className="focus-ring rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal" {...register("classSeekingAdmission")}>
                    <option value="">Select class</option>
                    {admissionClassOptions.map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <FieldError message={errors.classSeekingAdmission?.message} />
                </label>
                <TextField name="previousSchoolName" label="Previous School" placeholder="Previous school name" register={register} error={errors.previousSchoolName?.message} />
                <TextField name="previousClassStudied" label="Previous Class Studied" placeholder="Previous class" register={register} error={errors.previousClassStudied?.message} />
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber">Parent Details</p>
              <div className="mt-4 grid gap-5">
                <TextField name="fatherName" label="Father's Name" placeholder="Father's name" register={register} error={errors.fatherName?.message} />
                <TextField name="motherName" label="Mother's Name" placeholder="Mother's name" register={register} error={errors.motherName?.message} />
                <TextField name="parentEmail" label="Parent Email Address" placeholder="Parent email address" register={register} error={errors.parentEmail?.message} />
                <TextField name="contactNumber" label="Contact Number" placeholder="Mobile number" register={register} error={errors.contactNumber?.message} />
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber">Address Details</p>
              <label className="mt-4 grid gap-2 text-sm font-semibold text-slate-700">
                Address
                <textarea className="focus-ring min-h-28 rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal" placeholder="Residential address" {...register("residentialAddress")} />
                <FieldError message={errors.residentialAddress?.message} />
              </label>
            </div>

            <fieldset className="grid gap-3 text-sm font-semibold text-slate-700">
              <legend>Hostel Facility Required</legend>
              <div className="flex gap-3">
                {["Yes", "No"].map((option) => (
                  <label className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal" key={option}>
                    <input className="h-4 w-4 accent-primary" type="radio" value={option} {...register("hostelFacilityRequired")} />
                    {option}
                  </label>
                ))}
              </div>
              <FieldError message={errors.hostelFacilityRequired?.message} />
            </fieldset>
          </>
        ) : null}

        {enquiryType === "hostel" ? (
          <>
            <TextField name="parentName" label="Parent Name" placeholder="Parent name" register={register} error={errors.parentName?.message} />
            <TextField name="parentEmail" label="Parent Email Address" placeholder="Parent email address" register={register} error={errors.parentEmail?.message} />
            <TextField name="contactNumber" label="Contact Number" placeholder="Mobile number" register={register} error={errors.contactNumber?.message} />
            <TextField name="studentName" label="Student Name" placeholder="Student name" register={register} error={errors.studentName?.message} />
            <TextField name="className" label="Class" placeholder="Class" register={register} error={errors.className?.message} />
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Message
              <textarea className="focus-ring min-h-32 rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal" placeholder="Share hostel-related details" {...register("message")} />
              <FieldError message={errors.message?.message} />
            </label>
          </>
        ) : null}

        {enquiryType === "transport" ? (
          <>
            <TextField name="parentName" label="Parent Name" placeholder="Parent name" register={register} error={errors.parentName?.message} />
            <TextField name="parentEmail" label="Parent Email Address" placeholder="Parent email address" register={register} error={errors.parentEmail?.message} />
            <TextField name="contactNumber" label="Contact Number" placeholder="Mobile number" register={register} error={errors.contactNumber?.message} />
            <TextField name="areaLocation" label="Area / Location" placeholder="Area or pickup location" register={register} error={errors.areaLocation?.message} />
            <TextField name="studentName" label="Student Name" placeholder="Student name" register={register} error={errors.studentName?.message} />
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Message
              <textarea className="focus-ring min-h-32 rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal" placeholder="Share transport-related details" {...register("message")} />
              <FieldError message={errors.message?.message} />
            </label>
          </>
        ) : null}

        <Button type="submit" className="w-full" disabled={isSubmitting || successLocked}>
          <Send className="h-4 w-4" /> {isSubmitting ? "Sending..." : "Submit Enquiry"}
        </Button>
        {errors.root ? <p className="text-sm text-red-600">{errors.root.message}</p> : null}
        {(isSubmitSuccessful || statusMessage) && !errors.root ? <p className="text-sm text-primary">{statusMessage || "Thank you. Your enquiry has been submitted successfully."}</p> : null}
      </div>
    </form>
  );
}

export const ContactForm = EnquiryHub;
