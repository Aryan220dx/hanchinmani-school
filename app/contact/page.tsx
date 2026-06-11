import { Bus, Clock, GraduationCap, Home, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";
import { MapEmbed } from "@/components/MapEmbed";
import { EnquiryHub } from "@/components/sections/ContactForm";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contact } from "@/lib/data/site";
import { SCHOOL_INFO } from "@/lib/schoolInfo";

export default function ContactPage() {
  const primaryPhoneHref = SCHOOL_INFO.contact.phone ? `tel:${SCHOOL_INFO.contact.phone.split("/")[0].replace(/[^\d+]/g, "")}` : null;
  const contactItems = [
    {
      icon: MapPin,
      label: "School Address",
      value: SCHOOL_INFO.address.display,
      href: SCHOOL_INFO.address.googleMapsLink,
      hrefLabel: "Get Directions"
    },
    {
      icon: Clock,
      label: "Office Hours",
      value: SCHOOL_INFO.contact.officeHours
    },
    ...(SCHOOL_INFO.contact.phone
      ? [
          {
            icon: Phone,
            label: "Main Contact",
            value: SCHOOL_INFO.contact.phone,
            href: primaryPhoneHref
          }
        ]
      : []),
    ...(SCHOOL_INFO.contact.email
      ? [
          {
            icon: Mail,
            label: "Email",
            value: SCHOOL_INFO.contact.email,
            href: `mailto:${SCHOOL_INFO.contact.email}`
          }
        ]
      : [])
  ];

  const enquiryTypes = [
    {
      icon: GraduationCap,
      title: "Admissions Enquiry",
      description: "Learn about admission requirements, procedures, and available classes."
    },
    {
      icon: Home,
      title: "Hostel Enquiry",
      description: "Information about hostel facilities for students from Grade 6 onwards."
    },
    {
      icon: Bus,
      title: "Transport Enquiry",
      description: "Details about transport routes and availability within city limits."
    },
    {
      icon: MessageSquare,
      title: "General Enquiry",
      description: "Any other questions or feedback. We are happy to help."
    }
  ];

  return (
    <>
      <section className="bg-surface pb-14 pt-36">
        <div className="container-padded">
          <SectionHeader eyebrow="Get In Touch" title="Contact Us" description="Reach out for admissions, general enquiries, hostel details, transport support, or a school visit." />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-padded">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <article className="rounded-2xl bg-surface p-6 shadow-glass" key={item.label}>
                  <Icon className="h-7 w-7 text-primary" />
                  <h2 className="mt-5 font-display text-2xl font-semibold">{item.label}</h2>
                  <p className="mt-3 text-sm leading-6 text-text-muted">{item.value}</p>
                  {item.href ? (
                    <Link href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className="mt-4 inline-block text-sm font-semibold text-primary">
                      {item.hrefLabel || item.value}
                    </Link>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-padded">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <div className="rounded-2xl bg-primary p-8 text-white shadow-glass">
            <h2 className="font-display text-3xl font-semibold">{contact.shortName}</h2>
            <div className="mt-8 space-y-6 text-white/82">
              <p className="flex gap-4"><MapPin className="mt-1 h-5 w-5 shrink-0 text-amber" /> {contact.address}</p>
              <p className="flex gap-4"><Phone className="mt-1 h-5 w-5 shrink-0 text-amber" /> {contact.officePhone}<br />{contact.mobile}</p>
              <p className="flex gap-4"><Mail className="mt-1 h-5 w-5 shrink-0 text-amber" /> {contact.email}</p>
            </div>
            <div className="mt-8">
              <MapEmbed />
            </div>
          </div>
          <EnquiryHub />
        </div>
      </div>
    </section>

      <section className="bg-white py-20">
        <div className="container-padded">
          <SectionHeader eyebrow="Enquiry Categories" title="The Right Starting Point" description="Choose the topic that matches your question when you fill out the form." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {enquiryTypes.map((item) => {
              const Icon = item.icon;
              return (
                <article className="rounded-2xl bg-surface p-6 shadow-glass" key={item.title}>
                  <Icon className="h-8 w-8 text-primary" />
                  <h2 className="mt-5 font-display text-2xl font-semibold">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-text-muted">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
