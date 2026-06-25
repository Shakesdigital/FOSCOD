import { PageHero } from "@/components/site/PageHero";
import { SplitSection, Prose, FeatureGrid, CheckList, CTABand } from "@/components/site/blocks";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Internship & Volunteer Programs in Uganda",
  "FOSCOD's Global Learning and Exchange program connects students, professionals, researchers, and groups with structured field learning in Uganda."
);

const pathways = [
  { title: "Internship", body: "Supervised field experience for academic credit or career growth.", kicker: "Individual or group" },
  { title: "Volunteer", body: "Structured service that supports community priorities and lasting impact.", kicker: "Individual or group" },
  { title: "Group Program", body: "University cohorts and faculty-led service learning with risk management.", kicker: "Universities" },
  { title: "Research / Academic", body: "Baseline surveys, monitoring, and ethical research partnerships.", kicker: "Researchers" },
];

const learn = [
  "Community assessment", "Project design", "Monitoring & evaluation",
  "Leadership", "Ethical development practice", "Cultural adaptation",
];

const included = [
  "Pre-departure support", "Orientation", "Placement & supervision",
  "Accommodation / host family", "Local support 24/7", "Cultural activities", "Certificate",
];

export default function GlePage() {
  return (
    <>
      <PageHero
        eyebrow="Global Learning & Exchange"
        title="Internship and volunteer programs in Uganda"
        intro="Gain practical development experience while contributing to community-led projects in clean energy, WASH, livelihoods, health, environment, research, communications, and social inclusion."
      >
        <Button href="/programs/finder" variant="primary" size="lg">Find your program</Button>
        <Button href="/apply" variant="secondary" size="lg">Apply now</Button>
        <Button href="/programs/program-fees" variant="ghost" size="lg">View fees</Button>
      </PageHero>

      <SplitSection eyebrow="The offer" title="Learn ethical development through real projects">
        <Prose>
          <p>
            Participants work alongside FOSCOD, community organizations, host
            families, and local leaders. You contribute to genuine community
            priorities under local supervision — not manufactured tasks.
          </p>
          <p>
            Whether you come for academic credit, career experience, service, or
            research, the structure is the same: prepare, place, deliver, reflect,
            and leave something that lasts.
          </p>
        </Prose>
      </SplitSection>

      <section className="bg-[var(--surface-2)] py-16 md:py-20">
        <div className="container-page">
          <h2 className="max-w-xl text-[clamp(1.7rem,3vw,2.3rem)]">Choose your pathway</h2>
          <div className="mt-10"><FeatureGrid items={pathways} columns={4} /></div>
        </div>
      </section>

      <section className="container-page grid gap-12 py-16 md:grid-cols-2 md:py-20">
        <div>
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">What you will learn</h2>
          <div className="mt-6"><CheckList items={learn} tone="water" /></div>
        </div>
        <div>
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">What is included</h2>
          <div className="mt-6"><CheckList items={included} /></div>
        </div>
      </section>

      <CTABand
        title="Ready to start your journey?"
        body="Compare programs in the finder, then apply. Our team replies within two working days."
        actions={[
          { href: "/programs/finder", label: "Find your program" },
          { href: "/internships", label: "Internships", variant: "secondary" },
          { href: "/volunteer", label: "Volunteer", variant: "ghost" },
        ]}
      />
    </>
  );
}
