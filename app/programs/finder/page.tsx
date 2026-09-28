import { HeroSlider } from "@/components/site/HeroSlider";
import { CTABand } from "@/components/site/blocks";
import { ProgramFinder } from "@/components/programs/ProgramFinder";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides } from "@/lib/content";

export const metadata = pageMeta(
  "Find the Right FOSCOD Program",
  "Compare FOSCOD internship, volunteer, group, and research programs by type, sector, and duration."
);

export default async function FinderPage() {
  const heroSlides = await getHeroSlides("finder");
  return (
    <>
      <HeroSlider slides={heroSlides} />
      <section className="container-page py-12 md:py-16">
        <ProgramFinder />
      </section>
      <CTABand
        title="Found your fit?"
        actions={[
          { href: "/apply", label: "Apply now" },
          { href: "/programs/program-fees", label: "View fees", variant: "secondary" },
        ]}
      />
    </>
  );
}
