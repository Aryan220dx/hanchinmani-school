"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function AnimatedSection({
  className,
  children,
  as = "section",
  id
}: {
  className?: string;
  children: React.ReactNode;
  as?: "section" | "div" | "header";
  id?: string;
}) {
  const Comp = motion[as];

  return (
    <Comp
      id={id}
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <motion.div variants={fadeInUp}>{children}</motion.div>
    </Comp>
  );
}
