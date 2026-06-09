"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogIn, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <a className="focus-ring fixed left-4 top-4 z-[60] -translate-y-20 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary focus:translate-y-0" href="#main">
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4">
        <nav
          aria-label="Main navigation"
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 transition-all duration-500 ease-out md:px-6",
            scrolled
              ? "border border-black/[0.06] bg-white/[0.95] text-slate-900 shadow-[0_18px_55px_-28px_rgba(15,23,42,0.55)] backdrop-blur-2xl"
              : "border border-white/20 bg-white/20 text-white shadow-none backdrop-blur-md"
          )}
        >
          <Link href="/" className="focus-ring flex items-center gap-3 rounded-full">
            <Image src="/images/logo-school.jpg" alt="Hanchinmani School logo" width={42} height={42} className="rounded-full bg-white object-cover" priority />
            <span className={cn("hidden font-display text-xl font-bold sm:block", scrolled ? "text-primary" : "text-white")}>Hanchinmani School</span>
          </Link>
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <div className="group relative" key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "focus-ring flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold transition",
                    scrolled ? "text-slate-800 hover:bg-primary/8 hover:text-primary" : "text-white/88 hover:bg-white/12 hover:text-white",
                    pathname === item.href && (scrolled ? "text-primary" : "text-white")
                  )}
                >
                  {item.label}
                  {item.children ? <ChevronDown className="h-3.5 w-3.5" /> : null}
                </Link>
                {item.children ? (
                  <div className="invisible absolute left-0 top-full w-64 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
                    <div className="glass rounded-2xl p-2 shadow-glass">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} className="focus-ring block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-primary/8 hover:text-primary">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <Button href="/login" variant={scrolled ? "outline" : "glass"} size="sm">
              <LogIn className="h-4 w-4" /> Login
            </Button>
            <Button href="/contact" variant="amber" size="sm">
              Apply Now
            </Button>
          </div>
          <button className={cn("focus-ring rounded-full p-3 lg:hidden", scrolled ? "text-primary" : "text-white")} aria-label="Open menu" onClick={() => setOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>
      <AnimatePresence>
        {open ? (
          <motion.div className="fixed inset-0 z-[70] bg-primary text-white lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center justify-between p-5">
              <span className="font-display text-2xl font-semibold">Hanchinmani School</span>
              <button className="focus-ring rounded-full p-3" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <motion.div className="space-y-1 px-5 pt-4" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
              {navItems.map((item) => (
                <motion.div key={item.label} variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                  <Link href={item.href} className="block border-b border-white/10 py-4 text-xl font-semibold">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Button href="/contact" variant="amber" size="lg" className="mt-8 w-full">
                Apply Now
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
