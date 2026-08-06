import { HeroSlider } from "@/components/site/HeroSlider";
import { FeatureRow, ApplyBand } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides } from "@/lib/content";

export const metadata = pageMeta(
  "Individual Volunteer Program",
  "A supervised volunteer role matched to your skills, preparation, and a current community priority."
);

export default async function IndividualVolunteerPage() {
  const heroSlides = await getHeroSlides("volunteer-individual");
  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* about — white */}
      <section className="py-12 md:py-16">
        <div className="container-page mx-auto max-w-2xl text-center">
          <Eyebrow>About our Individual volunteer program</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">A placement matched to you</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Individual volunteering matches your skills and interests to a real
            current community priority — with clear boundaries, local supervision,
            and support arrangements confirmed for the intake.
          </p>
        </div>
      </section>

      <FeatureRow
        title="A placement matched to your skills"
        tone="forest"
        imageCaption="Volunteer at work — add photo via CMS"
        body="Tell us your background, goals, and field interests, and we'll match you to a genuine community priority where your contribution counts."
        cta={{ href: "/apply", label: "More Details" }}
      />
      <FeatureRow
        title="Local supervision and support"
        reverse
        surface
        tone="water"
        imageCaption="Supervisor & volunteer — add photo via CMS"
        body="You're supported by FOSCOD staff and community leaders throughout — with orientation, guidance, and round-the-clock in-country support."
        cta={{ href: "/impact", label: "More Details" }}
      />
      <FeatureRow
        title="Accommodation and cultural learning"
        tone="earth"
        imageCaption="Host family — add photo via CMS"
        body="The current brief confirms the approved accommodation arrangement, cultural preparation, conduct expectations, and what each participant is responsible for."
        cta={{ href: "/programs/program-fees", label: "More Details" }}
      />

      <ApplyBand label="Apply Today" href="/apply" />
    </>
  );
}
