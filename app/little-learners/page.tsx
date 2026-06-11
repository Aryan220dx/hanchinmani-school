import Image from "next/image";
import Link from "next/link";
import { Brush, Gamepad2, HeartHandshake, MapPin, School, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SCHOOL_INFO } from "@/lib/schoolInfo";

const programCards = [
  {
    title: "Nursery",
    image: "/images/little-learners/ll-01.jpg",
    highlights: ["Gentle routines", "Language readiness", "Playful discovery"]
  },
  {
    title: "LKG",
    image: "/images/little-learners/ll-04.jpg",
    highlights: ["Early literacy", "Creative movement", "Social confidence"]
  },
  {
    title: "UKG",
    image: "/images/little-learners/ll-05.jpg",
    highlights: ["School readiness", "Number sense", "Stage confidence"]
  }
];

const activityHighlights = [
  { icon: HeartHandshake, title: "Warm Environment", body: "A caring setting where children feel seen, settled and ready to participate.", image: "/images/little-learners/ll-02.jpg" },
  { icon: Brush, title: "Creative Expression", body: "Music, art, colour days and celebrations make learning memorable.", image: "/images/little-learners/ll-12.jpg" },
  { icon: Gamepad2, title: "Activity-Based Learning", body: "Children learn through movement, conversation, observation and hands-on play.", image: "/images/little-learners/ll-03.jpg" },
  { icon: Sparkles, title: "Parent Confidence", body: "Clear routines and visible participation help parents trust the early years journey.", image: "/images/little-learners/ll-11.jpg" }
];

const galleryImages = [
  { src: "/images/little-learners/ll-06.jpg", alt: "Little Learners student speaking at a graduation event", category: "Confidence" },
  { src: "/images/little-learners/ll-07.jpg", alt: "School leadership viewing the learning environment", category: "Campus" },
  { src: "/images/little-learners/ll-08.jpg", alt: "Teachers and guests in a classroom environment", category: "Environment" },
  { src: "/images/little-learners/ll-09.jpg", alt: "Learning resources in the school laboratory", category: "Exploration" },
  { src: "/images/little-learners/ll-10.jpg", alt: "Visitors and teachers in an activity-rich classroom", category: "Learning" },
  { src: "/images/little-learners/ll-13.jpg", alt: "Little Learners student at a graduation photo area", category: "Celebration" }
];

export default function LittleLearnersPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary pb-20 pt-36 text-white">
        <Image src="/images/little-learners/ll-04.jpg" alt="Little Learners classroom moment" fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#062f3a]/95 via-primary/72 to-black/20" />
        <div className="container-padded relative grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber">Little Learners</p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-tight md:text-7xl">A Bright Beginning for Nursery, LKG and UKG</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">A warm early-years space shaped around play, confidence, language development and joyful participation.</p>
          </div>
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl shadow-glass">
            <Image src="/images/little-learners/ll-02.jpg" alt="Children seated during Little Learners activities" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-padded">
          <SectionHeader eyebrow="Our Programs" title="Early Years, Clearly Structured" description="Short, steady routines help children build comfort, curiosity and classroom confidence." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {programCards.map((program, index) => (
              <article className="overflow-hidden rounded-2xl bg-surface shadow-glass" key={program.title}>
                <div className="relative aspect-[4/3]">
                  <Image src={program.image} alt={`${program.title} students at Little Learners`} fill priority={index < 2} sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 hover:scale-105" />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-3xl font-semibold">{program.title}</h2>
                  <div className="mt-5 grid gap-2">
                    {program.highlights.map((point) => (
                      <p className="text-sm font-semibold text-text-muted" key={point}>{point}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-padded">
          <SectionHeader eyebrow="Learning Environment" title="Seen Through Real Moments" description="Photos from school life carry the story of participation, care and confidence." />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {activityHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <article className="grid overflow-hidden rounded-2xl bg-white shadow-glass sm:grid-cols-[.9fr_1.1fr]" key={item.title}>
                  <div className="relative min-h-[230px]">
                    <Image src={item.image} alt={`${item.title} at Little Learners`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  </div>
                  <div className="p-6">
                    <Icon className="h-8 w-8 text-primary" />
                    <h2 className="mt-5 font-display text-3xl font-semibold">{item.title}</h2>
                    <p className="mt-4 text-sm leading-6 text-text-muted">{item.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-padded">
          <SectionHeader eyebrow="Gallery" title="Little Learners in Action" description="A quick visual tour of celebrations, classrooms and school moments." />
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((item) => (
              <article className="group overflow-hidden rounded-2xl bg-surface shadow-glass" key={item.src}>
                <div className="relative aspect-[4/3]">
                  <Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-amber">{item.category}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-teal-texture py-20 text-white">
        <div className="container-padded grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="flex items-center gap-3 text-amber">
              <MapPin className="h-5 w-5" />
              <p className="text-sm font-semibold uppercase tracking-[0.22em]">Visit Us</p>
            </div>
            <h2 className="mt-5 font-display text-4xl font-semibold">Begin the Conversation</h2>
            <p className="mt-4 max-w-2xl text-white/78">{SCHOOL_INFO.address.display}</p>
          </div>
          <Link href="/contact" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-amber px-6 py-3 font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-[#b96105]">
            <School className="h-5 w-5" />
            Contact School
          </Link>
        </div>
      </section>
    </>
  );
}
