import { HeroSlider } from "@/components/site/HeroSlider";
import { ImpactStrip } from "@/components/home/ImpactStrip";
import { CTABand, FeatureGrid, ProgramsSection, Steps } from "@/components/site/blocks";
import { FeaturedImpactStory } from "@/components/home/FeaturedImpactStory";
import { ProjectCarousel } from "@/components/site/ProjectCarousel";
import { PartnerLogos } from "@/components/home/PartnerLogos";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getHeroSlides, getPrograms, getFeaturedProjects, getImpactStats, getFeaturedImpactStory, getPartners } from "@/lib/content";
import { audiencePaths, responsibleEngagement } from "@/lib/landing-content";

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

      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Find your way into the work</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">Start with who you are and what you want to contribute</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              FOSCOD connects community priorities in Uganda with people and institutions ready to learn, fund, research, or deliver responsibly.
            </p>
          </div>
          <div className="mt-10">
            <FeatureGrid
              columns={4}
              items={audiencePaths.map((path) => ({ ...path, kicker: "Your pathway" }))}
            />
          </div>
        </div>
      </section>

      {/* Two-program introduction — GLE + CEDP cards */}
      <ProgramsSection
        eyebrow="Our programs"
        title="Two ways to work with FOSCOD"
        intro="Whether you come to learn or to invest, the work stays community-led and locally owned."
        items={programs}
        surface
      />

      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <Eyebrow>What responsible collaboration means here</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">Local direction before outside participation</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              A useful partnership begins with the problem as communities understand it, then matches the right people, resources, safeguards, and evidence to the work.
            </p>
          </div>
          <div className="mt-10"><Steps steps={responsibleEngagement} /></div>
        </div>
      </section>

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

      <CTABand
        title="What would you like to do with FOSCOD?"
        body="Explore a program first, or tell us your goals and we will help identify the most useful next conversation."
        actions={[
          { href: "/programs", label: "Explore programs" },
          { href: "/partners", label: "Discuss a partnership", variant: "secondary" },
          { href: "/apply", label: "Check your fit", variant: "ghost" },
        ]}
      />

    </>
  );
}
