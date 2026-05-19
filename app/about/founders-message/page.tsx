import Image from "next/image";
import { leaders } from "@/lib/data/site";

export default function FoundersMessagePage() {
  const founder = leaders[0];
  const secretary = leaders[1];
  return (
    <section className="bg-surface pb-24 pt-36">
      <div className="container-padded grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div className="relative min-h-[520px] overflow-hidden rounded-2xl shadow-glass">
          <Image src={founder.image} alt={founder.name} fill className="object-cover" />
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-glass md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber">Founder&apos;s Message</p>
          <h1 className="mt-5 font-display text-5xl font-semibold">{founder.name}</h1>
          <p className="mt-2 font-semibold text-primary">{founder.title}, {founder.organization}</p>
          <p className="mt-8 text-lg leading-8 text-text-muted">{founder.quote}</p>
          <div className="mt-10 border-t border-slate-100 pt-8">
            <h2 className="font-display text-3xl font-semibold">{secretary.name}</h2>
            <p className="mt-3 leading-7 text-text-muted">{secretary.quote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
