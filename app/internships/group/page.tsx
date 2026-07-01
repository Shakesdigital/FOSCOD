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
            teams working one shared community project — with academic alignment,
            supervision, logistics, and safety handled.
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
        body="Your group works together on a real community project, building assessment, design, and delivery skills alongside the people they serve."
        cta={{ href: "/impact", label: "More Details" }}
      />
      <FeatureRow
        title="Logistics and safety handled"
        tone="earth"
        imageCaption="Orientation & support — add photo via CMS"
        body="Accommodation, orientation, risk management, and 24/7 in-country support are arranged for the whole cohort, so faculty can focus on learning."
        cta={{ href: "/programs/program-fees", label: "More Details" }}
      />

      <ApplyBand label="Apply Today" href="/apply" />
    </>
  );
}
