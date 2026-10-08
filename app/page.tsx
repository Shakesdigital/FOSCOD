import { HeroSlider } from "@/components/site/HeroSlider";
import { TalkingAboutUs } from "@/components/home/TalkingAboutUs";
import { HowYouCanGetInvolved } from "@/components/home/HowYouCanGetInvolved";
import { FeaturedImpactStory } from "@/components/home/FeaturedImpactStory";
import { PartnerLogos } from "@/components/home/PartnerLogos";
import { FeatureGrid, ProgramsSection, Steps } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getHeroSlides, getPrograms, getFeaturedImpactStory, getPartners, getTalkingAboutUs, getInvolvementCards, getAudiencePaths, getResponsibleEngagement } from "@/lib/content";

export default async function HomePage() {
  const [heroSlides, programs, featuredStory, partners, talkingAboutUsData, involvementCards, audiencePathsData, responsibleEngagementData] = await Promise.all([
    getHeroSlides("home"),
    getPrograms(),
    getFeaturedImpactStory(),
    getPartners(),
    getTalkingAboutUs(),
    getInvolvementCards(),
    getAudiencePaths(),
    getResponsibleEngagement(),
  ]);

  return (
    <>
      {/* Hero — mission statement + 3-CTA row (Partner / Apply / Support) */}
      <HeroSlider slides={heroSlides} />

      {/* Talking about us — brief editorial section linking to About */}
      <TalkingAboutUs content={talkingAboutUsData} />

      {/* Our programs — two-pillar introduction */}
      <ProgramsSection
        eyebrow="Our programs"
        title="Two ways to work with FOSCOD"
        intro="Whether you come to learn or to invest, the work stays community-led and locally owned."
        items={programs}
      />

      {/* Find your way into the work — audience pathway cards */}
      <section className="py-14 md:py-20 bg-[var(--surface-2)]">
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
              items={audiencePathsData.map((path) => ({
                ...path,
                kicker: path.kicker ?? "Your pathway",
                imageUrl: path.imageUrl,
                imageAlt: path.imageAlt,
              }))}
            />
          </div>
        </div>
      </section>

      {/* What responsible collaboration means here — intro */}
      <section className="py-14 md:py-20 bg-[var(--bg)]">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>What responsible collaboration means here</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">Local direction before outside participation</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              A useful partnership begins with the problem as communities understand it, then matches the right people, resources, safeguards, and evidence to the work.
            </p>
          </div>
        </div>
      </section>

      {/* Responsible collaboration — steps cards */}
      <section className="py-14 md:py-20 bg-[var(--surface-2)]">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Responsible collaboration in practice</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">How we put it into practice</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Each principle is built into how we design, staff, and report on every engagement.
            </p>
          </div>
          <div className="mt-10"><Steps steps={responsibleEngagementData} /></div>
        </div>
      </section>

      {/* Featured Impact Story */}
      <FeaturedImpactStory story={featuredStory} />

      {/* How you can get involved */}
      <HowYouCanGetInvolved
        cards={involvementCards}
        eyebrow="How you can get involved"
        title="Your pathway into the work"
        intro="Volunteer, intern, partner on a project, or support through a verified giving conversation — each pathway is supervised, community-linked, and transparent."
      />

      {/* Partner logos strip */}
      <PartnerLogos partners={partners} />

    </>
  );
}
