import { PageHero } from "@/components/site/PageHero";
import { SplitSection, Prose, FeatureGrid, Steps, CheckList, CTABand } from "@/components/site/blocks";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Volunteer in Uganda with FOSCOD",
  "Work with communities, not just in communities, through structured volunteer programs that support local priorities and lasting impact."
);

const types = [
  { title: "Individual Volunteer", body: "A placement matched to your skills and the community's needs." },
  { title: "Group Volunteer", body: "Teams and faculty-led groups working a shared project." },
];

const sectors = [
  { title: "Microfinance", body: "VSLA and savings group support." },
  { title: "Women empowerment", body: "Training, leadership, and enterprise." },
  { title: "Community development", body: "Local priorities and infrastructure." },
  { title: "Human rights", body: "Advocacy and inclusion." },
  { title: "Youth development", body: "Skills, mentorship, and opportunity." },
  { title: "Environment", body: "Tree planting, energy, and restoration." },
  { title: "Health", body: "WASH promotion and community health." },
  { title: "ICT for development", body: "Data, communications, and tools." },
];

const journey = [
  { title: "Pre-arrival preparation", body: "Logistics, health, and safety guidance." },
  { title: "Orientation", body: "Local orientation and host introduction." },
  { title: "Project design", body: "Scope your work with local supervisors." },
  { title: "Implementation", body: "Deliver alongside the community." },
  { title: "Reflection & retreat", body: "Reflection, excursion, and learning." },
  { title: "Final report", body: "Document outcomes and join the alumni network." },
];

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="Volunteer"
        title="Volunteer in Uganda with FOSCOD"
        intro="Work with communities — not just in communities — through structured volunteer programs that support local priorities and lasting impact."
      >
        <Button href="/apply" variant="primary" size="lg">Apply to volunteer</Button>
        <Button href="/programs/program-fees" variant="secondary" size="lg">View program fees</Button>
      </PageHero>

      <SplitSection eyebrow="Program types" title="Volunteer individually or as a group">
        <div className="space-y-8">
          <FeatureGrid items={types} columns={2} />
          <Prose>
            <p>
              Volunteers contribute to community activities, training support, WASH
              promotion, school and community projects, livelihood support,
              documentation, and environmental action — always under local
              supervision.
            </p>
          </Prose>
        </div>
      </SplitSection>

      <section className="bg-[var(--surface-2)] py-16 md:py-20">
        <div className="container-page">
          <h2 className="max-w-xl text-[clamp(1.7rem,3vw,2.3rem)]">Volunteer sectors</h2>
          <div className="mt-10"><FeatureGrid items={sectors} columns={4} /></div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <h2 className="max-w-xl text-[clamp(1.7rem,3vw,2.3rem)]">The volunteer package</h2>
        <div className="mt-10"><Steps steps={journey} /></div>
      </section>

      <section className="container-page pb-8">
        <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">Benefits</h2>
        <div className="mt-6">
          <CheckList items={[
            "Structured program", "Lasting community impact", "Hands-on learning",
            "Cross-cultural exchange", "Professional growth", "Retreat & excursion",
          ]} />
        </div>
      </section>

      <CTABand
        title="Apply to volunteer"
        actions={[
          { href: "/apply", label: "Apply now" },
          { href: "/contact", label: "Talk to the team", variant: "secondary" },
        ]}
      />
    </>
  );
}
