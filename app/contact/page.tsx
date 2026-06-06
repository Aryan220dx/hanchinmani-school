import { Mail, MapPin, Phone } from "lucide-react";
import { EnquiryHub } from "@/components/sections/ContactForm";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contact } from "@/lib/data/site";

export default function ContactPage() {
  return (
    <section className="bg-surface pb-24 pt-36">
      <div className="container-padded">
        <SectionHeader eyebrow="Get In Touch" title="How Can We Help You?" description="Use one simple hub for general questions, admissions, hostel details and transport enquiries." />
        <div className="mt-14 grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-2xl bg-primary p-8 text-white shadow-glass">
            <h2 className="font-display text-3xl font-semibold">{contact.shortName}</h2>
            <div className="mt-8 space-y-6 text-white/82">
              <p className="flex gap-4"><MapPin className="mt-1 h-5 w-5 shrink-0 text-amber" /> {contact.address}</p>
              <p className="flex gap-4"><Phone className="mt-1 h-5 w-5 shrink-0 text-amber" /> {contact.officePhone}<br />{contact.mobile}</p>
              <p className="flex gap-4"><Mail className="mt-1 h-5 w-5 shrink-0 text-amber" /> {contact.email}</p>
            </div>
          </div>
          <EnquiryHub />
        </div>
      </div>
    </section>
  );
}
