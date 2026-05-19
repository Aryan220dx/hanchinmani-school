import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { campusFacilities } from "@/lib/data/site";

export default function CampusPage() {
  return (
    <section className="bg-surface pb-24 pt-36">
      <div className="container-padded">
        <SectionHeader eyebrow="Our Campus" title="Physical Proof of Care" description="Infrastructure, labs, library, transportation and safety are presented as direct parent-facing evidence." />
        <div className="mt-14 grid gap-7">
          {campusFacilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <article id={item.id} className="grid scroll-mt-28 overflow-hidden rounded-2xl bg-white shadow-glass md:grid-cols-2" key={item.id}>
                <div className={`relative min-h-[280px] ${index % 2 ? "md:order-2" : ""}`}>
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-8 md:p-12">
                  <Icon className="h-10 w-10 text-primary" />
                  <h2 className="mt-5 font-display text-4xl font-semibold">{item.title}</h2>
                  <p className="mt-5 text-lg leading-8 text-text-muted">{item.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
