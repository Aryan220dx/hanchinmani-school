"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export function Testimonials() {
  const [emblaRef] = useEmblaCarousel({ align: "start", loop: true });

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-padded">
        <SectionHeader eyebrow="Parent Voice" title="Structured for Real Testimonials" description="These initial cards are placeholders, ready to be replaced by verified parent feedback through a CMS." />
        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {testimonials.map((item) => (
              <Card className="min-w-0 flex-[0_0_88%] p-7 sm:flex-[0_0_48%] lg:flex-[0_0_32%]" key={item.name}>
                <div className="flex gap-1 text-amber">
                  {Array.from({ length: 5 }).map((_, index) => <Star className="h-4 w-4 fill-current" key={index} />)}
                </div>
                <p className="mt-6 text-lg leading-8 text-slate-700">&quot;{item.quote}&quot;</p>
                <p className="mt-6 font-semibold text-primary">{item.name}</p>
                <p className="text-sm text-text-muted">{item.grade}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
