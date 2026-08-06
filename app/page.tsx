import { HeroSlider } from "@/components/site/HeroSlider";
import { ImpactStrip } from "@/components/home/ImpactStrip";
import { ProgramsSection } from "@/components/site/blocks";
import { FeaturedImpactStory } from "@/components/home/FeaturedImpactStory";
import { ProjectCarousel } from "@/components/site/ProjectCarousel";
import { PartnerLogos } from "@/components/home/PartnerLogos";
import { getHeroSlides, getPrograms, getFeaturedProjects, getImpactStats, getFeaturedImpactStory, getPartners } from "@/lib/content";

export default async function HomePage() {
  const [heroSlides, programs, projects, impactStats, featuredStory, partners] = await Promise.all([
    getHeroSlides("home"),
    getPrograms(),
    getFeaturedProjects(),
    getImpactStats(),
    getFeaturedImpactStory(),
    getPartners(),
  ]);

  return (
    <>
      {/* Hero — mission statement + 3-CTA row (Partner / Apply / Support) */}
      <HeroSlider slides={heroSlides} />

      {/* Verified impact strip — 4-5 stats from impact_stats with "as of [date]" */}
      <ImpactStrip stats={impactStats} />

      {/* Two-program introduction — GLE + CEDP cards */}
      <ProgramsSection
        eyebrow="Our programs"
        title="Two ways to work with FOSCOD"
        intro="Whether you come to learn or to invest, the work stays community-led and locally owned."
        items={programs}
        surface
      />

      {/* Featured Impact Story — full-width with community voice */}
      <FeaturedImpactStory story={featuredStory} />

      {/* Featured Projects — 3-card carousel from Projects collection */}
      <ProjectCarousel
        projects={projects}
        eyebrow="Featured projects"
        title="Projects led by the communities we serve"
        intro="Clean energy, water, climate, and livelihoods — explore the work, three projects at a time."
      />

      {/* Partner logos strip */}
      <PartnerLogos partners={partners} />

    </>
  );
}
