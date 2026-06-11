import { EnquiryHub } from "@/components/sections/ContactForm";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function AdmissionsPage() {
  return (
    <section className="bg-surface pb-24 pt-36">
      <div className="container-padded">
        <SectionHeader eyebrow="Admissions" title="Admission Enquiry" description="Share your child's details and our school office will review the request and respond." />
        <div className="mt-14 max-w-4xl">
          <EnquiryHub initialType="admission" />
        </div>
      </div>
    </section>
  );
}
