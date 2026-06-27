import { PageHero } from "@/components/site/PageHero";
import { FeatureRow, SupportOurCause, CTABand } from "@/components/site/blocks";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Our Programs",
  "FOSCOD works through two pillars: Community Empowerment and Development (CEDP) and Global Learning and Exchange (internships, volunteering, research)."
);

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our programs"
        title="Two pillars, one mission"
        intro="FOSCOD advances community-led development and connects global learners to real field work — so local innovation and global knowledge strengthen each other."
        bannerTone="forest"
      />

      <FeatureRow
        eyebrow="Pillar 01"
        title="Global Learning & Exchange"
        tone="water"
        imageCaption="Interns in the field — add photo via CMS"
        body="Internships, volunteering, group programs, and research placements that give students, professionals, and universities structured, supervised field experience in Uganda."
        cta={{ href: "/programs/global-learning-exchange", label: "Explore global learning" }}
      />
      <FeatureRow
        eyebrow="Pillar 02"
        title="Community Empowerment & Development"
        reverse
        tone="forest"
        imageCaption="Community project — add photo via CMS"
        body="Locally owned solutions across clean energy, environment, WASH, livelihoods, health, and inclusion — designed and delivered with the communities that lead them."
        cta={{ href: "/programs/community-empowerment-development", label: "Explore CEDP" }}
      />

      <SupportOurCause />

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
