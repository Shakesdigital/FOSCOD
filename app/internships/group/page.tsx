import { HeroSlider } from "@/components/site/HeroSlider";
import { FeatureRow, ApplyBand } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides } from "@/lib/content";

export const metadata = pageMeta(
  "Group Internship Program",
  "Bring a university cohort or professional group to work a shared community project with FOSCOD in Uganda, with academic alignment and supervision."
);

export default async function GroupInternshipPage() {
  const heroSlides = await getHeroSlides("internship-group");
  return (
    <>
      <HeroSlider slides={heroSlides} />

      <section className="py-12 md:py-16">
        <div className="container-page mx-auto max-w-2xl text-center">
          <Eyebrow>About our Group internship program</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">Bring your cohort to the field</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Group internships are built for university cohorts and professional
            teams working on one shared community priority. Academic alignment,
            supervision, logistics, risk ownership, and support are agreed during co-design.
          </p>
        </div>
      </section>

      <FeatureRow
        title="Aligned to your academic goals"
        tone="water"
        imageCaption="Cohort planning — add photo via CMS"
        body="We map the project to your program's learning outcomes and timeline, then match it to a genuine community priority under local supervision."
        cta={{ href: "/apply", label: "More Details" }}
      />
      <FeatureRow
        title="Shared project, shared learning"
        reverse
        surface
        tone="forest"
        imageCaption="Team at work — add photo via CMS"
        body="Your group contributes to a community-defined project under local guidance, with learning outputs and expected community value agreed during design."
        cta={{ href: "/impact", label: "More Details" }}
      />
      <FeatureRow
        title="Responsibilities and support agreed"
        tone="earth"
        imageCaption="Orientation & support — add photo via CMS"
        body="The group brief assigns accommodation, orientation, transport, accessibility, insurance, safeguarding, emergency, and risk-management responsibilities between FOSCOD, the institution, and participants."
        cta={{ href: "/programs/program-fees", label: "More Details" }}
      />

      <ApplyBand label="Apply Today" href="/apply" />
    </>
  );
}
