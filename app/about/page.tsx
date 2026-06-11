import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { leaders, contact } from "@/lib/data/site";

export default function AboutPage() {
  return (
    <section className="bg-surface pb-24 pt-36">
      <div className="container-padded">
        <SectionHeader eyebrow="About School" title="Rooted in Hubballi, Built for Tomorrow" description="An editorial overview of the institution, the Shantesh Education Society and the academic trust carried from the legacy site." />
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <div className="space-y-6 text-lg leading-8 text-text-muted">
            <p>{contact.institution} is a pioneer education centre for creative teaching, founded by Shri. Prahlad R Hanchinmani and mentored by Dr. Gururaj Karajagi.</p>
            <p>The school ignites a passion through smart classrooms, highly qualified trained teachers, lifelong learning and the nurturing of resilient, compassionate, critical thinkers.</p>
            <p>Its strength is specificity: science and math labs, e-library, AI and robotics training, telescope astronomy, a 10 acres campus and a faculty ecosystem built over decades.</p>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-2xl shadow-glass">
            <Image src="/images/hero/campus-banner.jpg" alt="Hanchinmani campus" fill className="object-cover" />
          </div>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {leaders.map((leader) => (
            <article className="rounded-2xl bg-white p-6 shadow-glass" key={leader.name}>
              <h2 className="font-display text-2xl font-semibold">{leader.name}</h2>
              <p className="mt-1 font-semibold text-amber">{leader.title}</p>
              <p className="mt-4 text-sm leading-6 text-text-muted">{leader.quote}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
