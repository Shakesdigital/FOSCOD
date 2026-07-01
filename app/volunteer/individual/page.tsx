import { HeroSlider } from "@/components/site/HeroSlider";
import { FeatureRow, ApplyBand } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides } from "@/lib/content";

export const metadata = pageMeta(
  "Individual Volunteer Program",
  "A one-to-one volunteer placement matched to your skills and the community's needs, with local supervision and 24/7 support."
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
            community need — a personalised placement with local supervision, a
            host-family experience, and 24/7 in-country support.
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
        title="Immersion with a host family"
        tone="earth"
        imageCaption="Host family — add photo via CMS"
        body="Live with a host family for genuine cultural immersion — one of the most valued parts of the FOSCOD experience for our volunteers."
        cta={{ href: "/programs/program-fees", label: "More Details" }}
      />

      <ApplyBand label="Apply Today" href="/apply" />
    </>
  );
}
