import { HeroSlider } from "@/components/site/HeroSlider";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { AlumniLegacy } from "@/components/home/AlumniLegacy";
import { SupportCause } from "@/components/home/SupportCause";
import { ProgramsSection } from "@/components/site/blocks";
import { ProjectCarousel } from "@/components/site/ProjectCarousel";
import { getHeroSlides, getPrograms, getFeaturedProjects } from "@/lib/content";

export default async function HomePage() {
  const [heroSlides, programs, projects] = await Promise.all([
    getHeroSlides("home"),
    getPrograms(),
    getFeaturedProjects(),
  ]);

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* white */}
      <WhoWeAre />

      {/* mint — two programs aligned in one row */}
      <ProgramsSection
        eyebrow="Our programs"
        title="Two ways to work with FOSCOD"
        intro="Whether you come to learn or to invest, the work stays community-led and locally owned."
        items={programs}
        surface
      />

      {/* white — featured projects carousel, 3 cards per slide */}
      <ProjectCarousel
        projects={projects}
        eyebrow="Featured projects"
        title="Projects led by the communities we serve"
        intro="Clean energy, water, climate, and livelihoods — explore the work, three projects at a time."
      />

      {/* mint */}
      <AlumniLegacy />

      {/* white */}
      <SupportCause />
    </>
  );
}
