import { ArrowRight, FileDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AdmissionsCTA() {
  return (
    <section className="bg-white px-4 py-20">
      <div className="container-padded overflow-hidden rounded-[2rem] bg-teal-texture p-8 text-white shadow-glass md:p-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_.8fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber">Admissions</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight md:text-6xl">Your Child&apos;s Future Starts Here</h2>
            <p className="mt-5 max-w-2xl text-white/76">Begin with an application or schedule a conversation with the school office in Dharwad.</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row md:flex-col">
            <Button href="/admissions" variant="amber" size="lg">Begin Application <ArrowRight className="h-5 w-5" /></Button>
            <Button href="/mandatory-disclosure" variant="glass" size="lg">Download Prospectus <FileDown className="h-5 w-5" /></Button>
          </div>
        </div>
      </div>
    </section>
  );
}
