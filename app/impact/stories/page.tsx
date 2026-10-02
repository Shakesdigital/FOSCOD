import { HeroSlider } from "@/components/site/HeroSlider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CTABand } from "@/components/site/blocks";
import { ImpactStoryGrid } from "@/components/site/ImpactStoryGrid";
import { pageMeta } from "@/lib/seo";
import {
  getHeroSlides,
  getImpactStories,
  getCedpAreasOfFocus,
  getGleDevelopmentSectors,
  getSubPrograms,
  getAllProjects,
} from "@/lib/content";

export const revalidate = 60;

export const metadata = pageMeta(
  "Impact stories archive",
  "All of FOSCOD's verified impact stories from CEDP and GLE — community-led change across Uganda, published with evidence and consent."
);

export default async function ImpactStoriesPage() {
  const [slides, stories, cedpAreas, gleSectors, subPrograms, projects] = await Promise.all([
    getHeroSlides("impact-stories"),
    getImpactStories(100),
    getCedpAreasOfFocus(),
    getGleDevelopmentSectors(),
    getSubPrograms(),
    getAllProjects(),
  ]);

  return (
    <>
      {/* 1. Hero */}
      <HeroSlider slides={slides} />

      {/* 2. Intro */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-12 md:py-16">
        <div className="container-page max-w-5xl">
          <Eyebrow>Verified stories</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">
            Community voices, evidence-backed outcomes
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--ink-soft)]">
            These stories are published only after consent is recorded and
            outcomes are verified through independent monitoring. Use the
            filter sidebar to explore by program — Community Empowerment
            and Development Program (CEDP) or Global Learning & Exchange (GLE)
            — and by thematic area, development sector, or project.
          </p>
        </div>
      </section>

      {/* 3. Filterable story grid */}
      <ImpactStoryGrid
        allStories={stories}
        cedpAreas={cedpAreas}
        gleSectors={gleSectors}
        subPrograms={subPrograms}
        projects={projects}
      />

      {/* 4. Closing CTA */}
      <section className="bg-[var(--surface-2)] py-14 md:py-20">
        <div className="container-page">
          <CTABand
            title="Help FOSCOD grow verified impact"
            body="Support community-led change — or co-design a program that aligns with your institution's goals."
            actions={[
              { href: "/donate", label: "Support the work" },
              { href: "/partners", label: "Partner with FOSCOD", variant: "secondary" },
            ]}
          />
        </div>
      </section>
    </>
  );
}
