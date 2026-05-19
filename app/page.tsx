import { AcademicJourney } from "@/components/sections/AcademicJourney";
import { AdmissionsCTA } from "@/components/sections/AdmissionsCTA";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { GalleryTeaser } from "@/components/sections/GalleryTeaser";
import { HeroSection } from "@/components/sections/HeroSection";
import { LeadershipCards } from "@/components/sections/LeadershipCards";
import { NoticeBoard } from "@/components/sections/NoticeBoard";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LeadershipCards />
      <FeatureGrid />
      <AcademicJourney />
      <GalleryTeaser />
      <NoticeBoard />
      <Testimonials />
      <AdmissionsCTA />
    </>
  );
}
