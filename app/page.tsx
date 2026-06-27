import { Hero } from "@/components/home/Hero";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { AlumniLegacy } from "@/components/home/AlumniLegacy";
import { SupportCause } from "@/components/home/SupportCause";
import { FeatureRow } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function HomePage() {
  return (
    <>
      <Hero />

      <WhoWeAre />

      {/* Our programs — intro + two alternating text/image rows */}
      <section className="pt-4">
        <div className="container-page mx-auto max-w-2xl text-center">
          <Eyebrow>Our programs</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.9rem,3.5vw,2.6rem)]">
            Two ways to work with FOSCOD
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Whether you come to learn or to invest, the work stays community-led
            and locally owned.
          </p>
        </div>
      </section>
      <FeatureRow
        title="Join a global learning program"
        tone="water"
        imageCaption="Interns in the field — add photo via CMS"
        body="Internships, volunteering, group programs, and research placements give students, professionals, and universities structured, supervised field experience in clean energy, WASH, livelihoods, health, and more."
        cta={{ href: "/programs/global-learning-exchange", label: "Learn more" }}
      />
      <FeatureRow
        title="Support community-led development"
        reverse
        tone="forest"
        imageCaption="Community project — add photo via CMS"
        body="Fund and partner on locally owned solutions across renewable energy, environment, WASH, livelihoods, and inclusion — designed and delivered with the communities that lead them."
        cta={{ href: "/programs/community-empowerment-development", label: "Learn more" }}
      />

      {/* Featured highlight */}
      <FeatureRow
        eyebrow="Featured project"
        title="Biochar Uganda: regenerating land and livelihoods"
        tone="earth"
        imageCaption="Biochar Uganda, Kalagala Parish — add photo via CMS"
        body="In Kalagala Parish, invasive water hyacinth becomes biochar — improving soil, enabling clean cooking, and removing carbon, while creating enterprise for women and youth."
        cta={{ href: "/projects/biochar-uganda", label: "Learn more" }}
      />

      <AlumniLegacy />

      <SupportCause />
    </>
  );
}
