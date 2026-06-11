import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { contact, navItems } from "@/lib/data/site";

export function Footer() {
  return (
    <footer className="bg-[#062f3a] text-white">
      <div className="container-padded grid gap-10 py-16 md:grid-cols-[1.3fr_.8fr_.9fr_1.2fr]">
        <div>
          <Image src="/images/logo.png" alt="Hanchinmani School Logo" width={76} height={76} className="rounded-full bg-white" />
          <h2 className="mt-5 font-display text-2xl font-semibold">{contact.shortName}</h2>
          <p className="mt-4 max-w-sm text-white/70">Shaping the Architects of Tomorrow in Hubballi with CBSE academics, faculty depth and future-ready learning.</p>
        </div>
        <div>
          <h3 className="font-semibold text-amber">Quick Links</h3>
          <div className="mt-5 grid gap-3">
            {navItems.slice(1, 8).map((item) => (
              <Link className="text-white/72 transition hover:text-white" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-amber">Campus</h3>
          <div className="mt-5 grid gap-3 text-white/72">
            {["Infrastructure", "Labs", "Library", "Security", "Transportation", "Extra-curricular"].map((item) => (
              <Link href="/campus" className="transition hover:text-white" key={item}>
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-amber">Contact Us</h3>
          <div className="mt-5 space-y-4 text-white/72">
            <p className="flex gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0 text-amber" /> {contact.address}</p>
            <p className="flex gap-3"><Phone className="mt-1 h-5 w-5 shrink-0 text-amber" /> {contact.officePhone}<br />{contact.mobile}</p>
            <p className="flex gap-3"><Mail className="mt-1 h-5 w-5 shrink-0 text-amber" /> {contact.email}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container-padded flex flex-col justify-between gap-3 text-sm text-white/55 md:flex-row">
          <span>Copyright 2026 {contact.institution}</span>
          <span>Privacy Policy · Terms</span>
        </div>
      </div>
    </footer>
  );
}
