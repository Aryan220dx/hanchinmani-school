"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { journey } from "@/lib/data/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function AcademicJourney() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="container-padded">
        <SectionHeader eyebrow="Academic Journey" title="Primary to Senior Secondary" description="A clear CBSE pathway that grows from belonging and confidence into scientific curiosity and disciplined preparation." />
        <motion.div className="relative mt-16 grid gap-8 md:grid-cols-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <div className="absolute left-0 right-0 top-10 hidden h-px bg-primary/20 md:block" />
          {journey.map((stage, index) => (
            <motion.article variants={fadeInUp} className="relative rounded-2xl bg-white p-7 shadow-glass" key={stage.title}>
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-primary text-2xl font-bold text-white">{index + 1}</div>
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-amber">{stage.range}</p>
              <h3 className="mt-3 font-display text-3xl font-semibold">{stage.title}</h3>
              <p className="mt-4 leading-7 text-text-muted">{stage.description}</p>
              <div className="mt-6 space-y-3">
                {stage.points.map((point) => (
                  <p className="flex gap-3 text-sm text-slate-700" key={point}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {point}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
