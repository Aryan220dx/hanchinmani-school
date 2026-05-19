import { AcademicJourney } from "@/components/sections/AcademicJourney";
import { FeatureGrid } from "@/components/sections/FeatureGrid";

export default function AcademicsPage() {
  return (
    <>
      <section className="bg-teal-texture pb-20 pt-36 text-white">
        <div className="container-padded max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber">Academics</p>
          <h1 className="mt-5 font-display text-5xl font-semibold md:text-7xl">CBSE Learning with Intellectual Infrastructure</h1>
          <p className="mt-6 text-lg leading-8 text-white/78">Science and math labs, foundation courses from Grade 6, e-library access, coding, AI, robotics and telescope astronomy are part of the learning ecosystem.</p>
        </div>
      </section>
      <AcademicJourney />
      <FeatureGrid />
    </>
  );
}
