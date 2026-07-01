import { HeroSlider } from "@/components/site/HeroSlider";
import { FeatureRow, ApplyBand } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides } from "@/lib/content";

export const metadata = pageMeta(
  "Group Volunteer Program",
  "Bring a university cohort, faculty-led group, or professional team to work a shared community project with FOSCOD in Uganda."
);

export default async function GroupVolunteerPage() {
  const heroSlides = await getHeroSlides("volunteer-group");
  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* about — white */}
      <section className="py-12 md:py-16">
        <div className="container-page mx-auto max-w-2xl text-center">
          <Eyebrow>About our Group volunteer program</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">Bring your team to the field</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Group volunteering is designed for university cohorts, faculty-led
            groups, and professional teams who want to work one shared community
            project together — with logistics, supervision, and safety handled.
          </p>
        </div>
      </section>

      <FeatureRow
        title="Planned around your group's goals"
        tone="water"
        imageCaption="Group planning session — add photo via CMS"
        body="We build the project around your cohort's learning objectives, field interests, and timeline — then match it to a genuine community priority."
        cta={{ href: "/apply", label: "More Details" }}
      />
      <FeatureRow
        title="A shared project, shared impact"
        reverse
        surface
        tone="forest"
        imageCaption="Team at work — add photo via CMS"
        body="Your team works together under local supervision, contributing to a real project the community leads — and leaving something that lasts."
        cta={{ href: "/impact", label: "More Details" }}
      />
      <FeatureRow
        title="Logistics and safety handled"
        tone="earth"
        imageCaption="Orientation & support — add photo via CMS"
        body="Accommodation, orientation, risk management, and 24/7 in-country support are arranged for the whole group, so you can focus on the work."
        cta={{ href: "/programs/program-fees", label: "More Details" }}
      />

      <ApplyBand label="Apply Today" href="/apply" />
    </>
  );
}
