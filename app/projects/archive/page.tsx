import { HeroSlider } from "@/components/site/HeroSlider";
import { CTABand, IntroSection } from "@/components/site/blocks";
import { ProjectArchiveGrid } from "@/components/site/ProjectArchiveGrid";
import { pageMeta } from "@/lib/seo";
import {
  getHeroSlides,
  getAllProjects,
} from "@/lib/content";

export const revalidate = 60;

export const metadata = pageMeta(
  "Projects archive",
  "All of FOSCOD's community-led projects across CEDP and GLE — from clean energy and WASH to livelihoods and ecosystem restoration."
);

export default async function ProjectsArchivePage() {
  const [slides, projects] = await Promise.all([
    getHeroSlides("projects-archive"),
    getAllProjects(),
  ]);

  return (
    <>
      {/* 1. Hero */}
      <HeroSlider slides={slides} />

      {/* 2. Intro — centered heading, image left, text right */}
      <IntroSection
        eyebrow="Verified projects"
        title="Community-led change in action"
        body="Each project is designed and led by the communities where FOSCOD works — across clean energy, WASH, livelihoods, health, education, environment, and research. Use the filter sidebar to explore by program — Community Empowerment and Development Program (CEDP) or Global Learning & Exchange (GLE) — and by theme."
        align="center"
      />

      {/* 3. Filterable project grid */}
      <ProjectArchiveGrid
        allProjects={projects}
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
