import { HeroSlider } from "@/components/site/HeroSlider";
import { ProgramsSection, SupportOurCause, CTABand } from "@/components/site/blocks";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides, getPrograms } from "@/lib/content";

export const metadata = pageMeta(
  "Our Programs",
  "FOSCOD works through two pillars: Community Empowerment and Development (CEDP) and Global Learning and Exchange (internships, volunteering, research)."
);

export default async function ProgramsPage() {
  const [heroSlides, programs] = await Promise.all([
    getHeroSlides("programs"),
    getPrograms(),
  ]);

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* white — two programs in one row, from the CMS */}
      <ProgramsSection
        eyebrow="About our programs"
        title="Choose the path that fits you"
        intro="Every FOSCOD program is rooted in the same belief: communities lead, and we build alongside them. Come to learn, or invest in the work."
        items={programs}
      />

      {/* mint */}
      <SupportOurCause />

      {/* white */}
      <CTABand
        title="Find the right program for you"
        actions={[
          { href: "/programs/finder", label: "Open the program finder" },
          { href: "/programs/program-fees", label: "View fees", variant: "secondary" },
        ]}
      />
    </>
  );
}
