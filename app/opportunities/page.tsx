import { CTABand } from "@/components/site/blocks";
import { HeroSlider } from "@/components/site/HeroSlider";
import { OpportunitiesDirectory, type OpportunityFacets } from "@/components/site/OpportunitiesDirectory";
import { getOpportunities } from "@/lib/opportunities";
import {
  getGlePathways,
  getGleDevelopmentSectors,
  getGleParticipationFormats,
  type HeroSlide,
} from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "GLE opportunities",
  "Search current internship, volunteering, group, trip and study-tour opportunities hosted by FOSCOD CEDP and local partner organizations across Uganda."
);

export default async function OpportunitiesPage() {
  const [opportunities, experienceTypes, sectors, formats] = await Promise.all([
    getOpportunities(),
    getGlePathways(),
    getGleDevelopmentSectors(),
    getGleParticipationFormats(),
  ]);

  const facets: OpportunityFacets = {
    experienceTypes: experienceTypes.map((p) => ({ slug: p.title, label: p.title })),
    sectors: sectors.map((s) => ({ slug: s.slug, label: s.title })),
    locations: Array.from(new Set(opportunities.map((o) => o.location).filter(Boolean))).sort(),
    formats: formats.map((f) => ({ slug: f.slug, label: f.title })),
  };

  return (
    <>
      <HeroSlider
        slides={[
          {
            eyebrow: "Global Learning Exchange Program",
            title: "Find your opportunity",
            intro:
              "One directory for internships, volunteering, group placements, service-learning trips and study tours — hosted by FOSCOD's community program (CEDP) and local partner organizations across Uganda. Each listing names its host, purpose, learning goals, supervision and practical arrangements.",
            cta: { href: "/apply", label: "Express interest without selecting an opening" },
            tone: "forest",
          },
        ]}
      />

      <section className="py-14 md:py-20" aria-label="Opportunities directory">
        <OpportunitiesDirectory opportunities={opportunities} facets={facets} />
      </section>

      <section className="bg-[var(--surface-2)] py-14 md:py-16">
        <div className="container-page">
          <CTABand
            title="Nothing fits yet?"
            body="Openings are listed only when a host, supervisor and role details are confirmed. Submitting an application or enquiry starts a matching process — it does not guarantee acceptance or a particular host organization."
            actions={[
              { href: "/apply", label: "Express general interest" },
              { href: "/partners", label: "Partner or host an opportunity", variant: "ghost" },
            ]}
            tightBottom
          />
        </div>
      </section>
    </>
  );
}
