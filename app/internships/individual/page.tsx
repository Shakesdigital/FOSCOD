import { HeroSlider } from "@/components/site/HeroSlider";
import { FeatureRow, ApplyBand } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides } from "@/lib/content";

export const metadata = pageMeta(
  "Individual Internship Program",
  "A one-to-one internship placement matched to your field, timeline, and career goals, with local supervision and a host-family experience."
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
            real community need — a personalised placement with local supervision, a
            host-family experience, and 24/7 in-country support.
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
        body="You're supported by FOSCOD staff and community partners throughout — with orientation, mentorship, a mid-term retreat, and round-the-clock support."
        cta={{ href: "/impact", label: "More Details" }}
      />
      <FeatureRow
        title="Immersion with a host family"
        tone="earth"
        imageCaption="Host family — add photo via CMS"
        body="Live with a host family for genuine cultural immersion — one of the most valued parts of the FOSCOD internship experience."
        cta={{ href: "/programs/program-fees", label: "More Details" }}
      />

      <ApplyBand label="Apply Today" href="/apply" />
    </>
  );
}
