"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { leaders } from "@/lib/data/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeInUp, hoverLift, staggerContainer } from "@/lib/motion";

export function LeadershipCards() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="container-padded">
        <SectionHeader
          eyebrow="Leadership"
          title="Guided by Vision"
          description="The institution's authority is carried by real people, long service and a living academic partnership."
        />
        <motion.div className="mt-14 grid gap-6 md:grid-cols-3" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={staggerContainer}>
          {leaders.map((leader) => (
            <motion.article key={leader.name} variants={fadeInUp} whileHover={hoverLift} className="group relative overflow-hidden rounded-2xl bg-slate-900 shadow-glass">
              <div className="relative aspect-[3/4]">
                <Image src={leader.image} alt={leader.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <span className="text-6xl font-display leading-none text-amber/80">&quot;</span>
                <p className="mt-1 line-clamp-5 text-sm leading-6 text-white/82">{leader.quote}</p>
                <h3 className="mt-5 font-display text-2xl font-semibold">{leader.name}</h3>
                <p className="text-sm font-semibold text-amber">{leader.title}</p>
                <p className="text-sm text-white/65">{leader.organization}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
