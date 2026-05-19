"use client";

import { motion } from "framer-motion";
import { features } from "@/lib/data/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { fadeInUp, hoverLift, staggerContainer } from "@/lib/motion";

export function FeatureGrid() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(14,116,144,.12),transparent_28rem),radial-gradient(circle_at_88%_60%,rgba(217,119,6,.10),transparent_24rem)]" />
      <div className="container-padded relative">
        <SectionHeader eyebrow="Why Hanchinmani" title="Specific Strengths, Not Slogans" description="The school experience is built around measurable infrastructure, trained faculty and intellectual enrichment." />
        <motion.div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={staggerContainer}>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div variants={fadeInUp} whileHover={hoverLift} key={feature.title}>
                <Card className="h-full p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-text-muted">{feature.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
