"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, ChevronDown, School } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function HeroSection() {
  return (
    <header className="relative flex min-h-svh items-center overflow-hidden bg-primary text-white">
      <motion.div className="absolute inset-0" initial={{ scale: 1 }} animate={{ scale: 1.06 }} transition={{ duration: 14, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}>
        <Image src="/images/hero/campus-banner.jpg" alt="Smt. Vidya P Hanchinmani International School campus" fill sizes="100vw" priority className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#062f3a]/95 via-primary/70 to-black/20" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#062f3a] to-transparent" />
      <motion.div className="container-padded relative z-10 pt-28" initial="hidden" animate="visible" variants={staggerContainer}>
        <motion.p variants={fadeInUp} className="text-sm font-semibold uppercase tracking-[0.22em] text-amber">
          Smt. Vidya P Hanchinmani International School, Hubballi
        </motion.p>
        <motion.h1 variants={fadeInUp} className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] md:text-7xl">
          Shaping the Architects of Tomorrow
        </motion.h1>
        <motion.p variants={fadeInUp} className="mt-7 max-w-2xl text-lg leading-8 text-white/82 md:text-xl">
          Where curiosity meets opportunity in North Karnataka&apos;s premier CBSE institution, guided by 200+ faculties, educators and educationists.
        </motion.p>
        <motion.div variants={fadeInUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="/contact" variant="amber" size="lg">
            Apply Now <ArrowRight className="h-5 w-5" />
          </Button>
          <Button href="/contact" variant="glass" size="lg">
            <CalendarDays className="h-5 w-5" /> Schedule a Visit
          </Button>
        </motion.div>
        <motion.div variants={fadeInUp} className="mt-14 grid gap-3 sm:grid-cols-3">
          {["200+ Faculty", "CBSE Affiliated", "Hubballi, Karnataka"].map((stat) => (
            <div className="dark-glass rounded-full px-5 py-3 text-sm font-semibold" key={stat}>
              {stat}
            </div>
          ))}
        </motion.div>
      </motion.div>
      <School className="absolute bottom-8 right-8 z-10 hidden h-28 w-28 text-white/10 md:block" />
      <ChevronDown className="absolute bottom-6 left-1/2 z-10 h-6 w-6 -translate-x-1/2 animate-bounce text-white/70" />
    </header>
  );
}
