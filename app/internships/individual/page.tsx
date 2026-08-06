import { HeroSlider } from "@/components/site/HeroSlider";
import { FeatureRow, ApplyBand } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides } from "@/lib/content";

export const metadata = pageMeta(
  "Individual Internship Program",
  "A supervised internship role matched to your field, timeline, preparation, and a current community priority."
);

export default async function IndividualInternshipPage() {
  const heroSlides = await getHeroSlides("internship-individual");
  return (
    <>
      <HeroSlider slides={heroSlides} />

      <section className="py-12 md:py-16">
        <div className="container-page mx-auto max-w-2xl text-center">
          <Eyebrow>About our Individual internship program</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">A placement matched to your goals</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Individual internships match your field, timeline, and career goals to a
            current community priority — with role boundaries, local supervision,
            and support arrangements confirmed in the intake brief.
          </p>
        </div>
      </section>

      <FeatureRow
        title="Matched to your field and goals"
        tone="forest"
        imageCaption="Intern at work — add photo via CMS"
        body="Tell us your background, discipline, and career goals, and we'll match you to a genuine community project where your contribution counts."
        cta={{ href: "/apply", label: "More Details" }}
      />
      <FeatureRow
        title="Local supervision and mentorship"
        reverse
        surface
        tone="water"
        imageCaption="Supervisor & intern — add photo via CMS"
        body="The current role brief confirms your supervisor, orientation, check-ins, emergency contact, and the support FOSCOD can provide for that intake."
        cta={{ href: "/impact", label: "More Details" }}
      />
      <FeatureRow
        title="Accommodation and cultural learning"
        tone="earth"
        imageCaption="Host family — add photo via CMS"
        body="FOSCOD confirms the approved accommodation arrangement, cultural preparation, conduct expectations, and practical responsibilities before you accept a place."
        cta={{ href: "/programs/program-fees", label: "More Details" }}
      />

      <ApplyBand label="Apply Today" href="/apply" />
    </>
  );
}
