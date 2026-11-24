import { CTABand } from "@/components/site/blocks";
import { OpportunityHero } from "@/components/site/OpportunityHero";
import { OpportunitiesLanding, type OpportunityLandingFacets } from "@/components/site/OpportunitiesLanding";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getOpportunities } from "@/lib/opportunities";
import { getGleDevelopmentSectors } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "GLE opportunities",
  "Search current internship, volunteering, group, trip and study-tour opportunities hosted by FOSCOD CEDP and local partner organizations across Uganda."
);

export default async function OpportunitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const initialType: "internship" | "volunteer" | undefined =
    type === "internship" || type === "volunteer" ? type : undefined;

  const [opportunities, sectors] = await Promise.all([
    getOpportunities(),
    getGleDevelopmentSectors(),
  ]);

  // Project areas = distinct opportunity `category` values (e.g. "WASH & Health").
  const projectOptions = Array.from(
    new Set(opportunities.map((o) => o.category).filter(Boolean))
  ).sort();

  const facets: OpportunityLandingFacets = {
    projects: projectOptions,
    themes: sectors.map((s) => ({ slug: s.slug, label: s.title })),
  };

  const heroCopy = initialType
    ? initialType === "internship"
      ? {
          title: "Internship opportunities",
          intro:
            "Supervised internships with FOSCOD's community program (CEDP) and local partner organizations — structured as individual, group or global service trip formats. Each placement is matched to your learning objectives and a community-defined priority, with a named supervisor and agreed outputs.",
        }
      : {
          title: "Volunteer opportunities",
          intro:
            "Volunteering placements with FOSCOD's community program (CEDP) and local partner organizations — structured as individual, group or global service trip formats. You contribute to community-defined priorities under local supervision, with orientation, guided reflection and cultural exchange.",
        }
    : undefined;

  return (
    <>
      {/* 1. Hero */}
      <OpportunityHero
        title={heroCopy?.title}
        intro={heroCopy?.intro}
        imageUrl="/images/gle/volunteer/who-can-volunteer.jpg"
        imageAlt="A FOSCOD participant working alongside community members in Jinja, Uganda"
      />

      {/* 2. Title + brief introduction */}
      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <Eyebrow>Opportunities directory</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">
              Explore project opportunities that fit your goals
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Browse community environment development and global, education-led opportunities hosted by
              FOSCOD&apos;s CEDP and local partner organizations across Uganda. Use the filter tool to narrow
              by category, project, thematic area or participation format — then open any card to read the
              full brief and apply.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Sticky filter tool + card listings */}
      <section id="opportunities" className="scroll-mt-24 pb-16 md:pb-24" aria-label="Opportunities directory">
        <OpportunitiesLanding
          opportunities={opportunities}
          facets={facets}
          initialType={initialType}
        />
      </section>

      {/* 4. Closing CTA */}
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