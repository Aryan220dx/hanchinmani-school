import { CheckCircle2 } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = ["Submit an application or enquiry", "Speak with the school office", "Campus visit and document guidance", "Admission confirmation"];

export default function AdmissionsPage() {
  return (
    <section className="bg-surface pb-24 pt-36">
      <div className="container-padded">
        <SectionHeader eyebrow="Admission" title="A Calm, Clear Admissions Path" description="Begin the school conversation without the old clutter. The official office details remain preserved across the site." />
        <div className="mt-14 grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-2xl bg-white p-7 shadow-glass">
            <h2 className="font-display text-3xl font-semibold">Admission Process</h2>
            <div className="mt-8 space-y-5">
              {steps.map((step) => (
                <p className="flex gap-3 text-slate-700" key={step}>
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" /> {step}
                </p>
              ))}
            </div>
          </div>
          <ContactForm mode="admission" />
        </div>
      </div>
    </section>
  );
}
