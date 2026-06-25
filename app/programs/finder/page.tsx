import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/blocks";
import { ProgramFinder } from "@/components/programs/ProgramFinder";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Find the Right FOSCOD Program",
  "Compare FOSCOD internship, volunteer, group, and research programs by type, sector, and duration."
);

export default function FinderPage() {
  return (
    <>
      <PageHero
        eyebrow="Program finder"
        title="Find the right FOSCOD program"
        intro="Filter by program type and duration to compare opportunities, then apply to the one that fits your goals and timeline."
      />
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
