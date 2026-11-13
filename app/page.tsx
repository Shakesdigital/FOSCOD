import { HeroSlider } from "@/components/site/HeroSlider";
import { TalkingAboutUs } from "@/components/home/TalkingAboutUs";
import { HowYouCanGetInvolved } from "@/components/home/HowYouCanGetInvolved";
import { ImpactSnapshot } from "@/components/home/ImpactSnapshot";
import { PartnerLogos } from "@/components/home/PartnerLogos";
import { ProgramsSection } from "@/components/site/blocks";
import { getHeroSlides, getPrograms, getPartners, getTalkingAboutUs, getInvolvementCards, getImpactMetrics } from "@/lib/content";

/** Homepage — a traffic director, not a story (per the landing-page research):
 *  one sentence of who we are, the two programs, proof we can stand behind,
 *  then three clear pathways into the work. */
export default async function HomePage() {
  const [heroSlides, programs, partners, talkingAboutUsData, involvementCards, metrics] = await Promise.all([
    getHeroSlides("home"),
    getPrograms(),
    getPartners(),
    getTalkingAboutUs(),
    getInvolvementCards(),
    getImpactMetrics(),
  ]);

  return (
    <>
      {/* 1. Hero — mission + primary action */}
      <HeroSlider slides={heroSlides} />

      {/* 2. Who we are — one short editorial strip linking to About */}
      <TalkingAboutUs content={talkingAboutUsData} />

      {/* 3. Our programs — the two pillars */}
      <ProgramsSection
        eyebrow="Our programs"
        title="Two ways to work with FOSCOD"
        intro="Whether you come to learn or to invest, the work stays community-led and locally owned."
        items={programs}
      />

      {/* 4. Proof — verified, dated impact figures */}
      <ImpactSnapshot metrics={metrics} />

      {/* 5. Three pathways in — learn, partner, support */}
      <HowYouCanGetInvolved
        cards={involvementCards}
        eyebrow="How you can get involved"
        title="Your pathway into the work"
        intro="Learn with us, partner on a priority, or support community-led work — each pathway is supervised, community-linked, and transparent."
      />

      {/* Partners strip — quiet trust signal */}
      <PartnerLogos partners={partners} />
    </>
  );
}
