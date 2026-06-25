import { PageHero } from "@/components/site/PageHero";
import { SplitSection, Prose, FeatureGrid, Steps, CheckList, FAQ, CTABand } from "@/components/site/blocks";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Sustainable Development Internships in Uganda",
  "Build real-world skills through supervised community projects, research, monitoring, communications, public health, clean energy, and enterprise development."
);

const types = [
  { title: "Individual Internship", body: "One-to-one placement matched to your goals and field." },
  { title: "Group Engage Internship", body: "Small teams working a shared community project." },
  { title: "University Cohort Program", body: "Faculty-led cohorts with academic alignment." },
];

const sectors = [
  { title: "WASH & public health", body: "Water, sanitation, hygiene, and community health." },
  { title: "Agroforestry & livelihoods", body: "Climate-smart agriculture and green enterprise." },
  { title: "Community economic empowerment", body: "VSLAs, microenterprise, and savings groups." },
  { title: "Research & baseline surveys", body: "Community-based participatory research." },
  { title: "Monitoring, data & ICT4D", body: "M&E systems and data for development." },
  { title: "Communications & storytelling", body: "Field documentation and narrative." },
  { title: "Policy & advocacy", body: "Local and national development advocacy." },
  { title: "Resource mobilization", body: "Fundraising and proposal development." },
  { title: "Climate & community impact", body: "Carbon, MRV, and flagship project support." },
];

const journey = [
  { title: "Apply", body: "Submit your application and field interests." },
  { title: "Pre-departure support", body: "Guidance on logistics, health, and safety." },
  { title: "Arrival & orientation", body: "Local orientation and host introduction." },
  { title: "Project design", body: "Scope your work with local supervisors." },
  { title: "Implementation", body: "Deliver alongside the community." },
  { title: "Reporting & certificate", body: "Final report, certificate, and alumni network." },
];

const faqs = [
  { q: "Who can apply?", a: "Students, recent graduates, young professionals, faculty-led groups, and researchers." },
  { q: "How long are placements?", a: "Common durations are 4, 8, 10, and 12 weeks, with custom options for groups." },
  { q: "Is supervision provided?", a: "Yes — every intern works under local supervision with 24/7 in-country support." },
];

export default function InternshipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Internships"
        title="Sustainable development internships in Uganda"
        intro="Build real-world skills through supervised community projects, research, monitoring, communications, public health, clean energy, and enterprise development."
      >
        <Button href="/apply" variant="primary" size="lg">Apply for an internship</Button>
        <Button href="/programs/program-fees" variant="secondary" size="lg">View fees</Button>
      </PageHero>

      <SplitSection eyebrow="Internship types" title="Three ways to intern">
        <div className="space-y-8">
          <FeatureGrid items={types} columns={3} />
          <Prose>
            <p>
              Every internship is matched to your goals, timeline, and field
              interests, then supervised by FOSCOD staff and community partners.
            </p>
          </Prose>
        </div>
      </SplitSection>

      <section className="bg-[var(--surface-2)] py-16 md:py-20">
        <div className="container-page">
          <h2 className="max-w-xl text-[clamp(1.7rem,3vw,2.3rem)]">Internship sectors</h2>
          <div className="mt-10"><FeatureGrid items={sectors} columns={3} /></div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <h2 className="max-w-xl text-[clamp(1.7rem,3vw,2.3rem)]">Your program journey</h2>
        <div className="mt-10"><Steps steps={journey} /></div>
      </section>

      <section className="container-page grid gap-12 pb-8 md:grid-cols-2">
        <div>
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">Learning outcomes</h2>
          <div className="mt-6">
            <CheckList tone="water" items={[
              "Community assessment", "Project design", "Monitoring & evaluation",
              "Stakeholder engagement", "Ethical practice", "Cross-cultural skills",
            ]} />
          </div>
        </div>
        <div>
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">Common questions</h2>
          <div className="mt-6"><FAQ items={faqs} /></div>
        </div>
      </section>

      <CTABand
        title="Apply for an internship"
        body="Start your application or request an academic partnership call for your university."
        actions={[
          { href: "/apply", label: "Apply now" },
          { href: "/contact", label: "Request a partnership call", variant: "secondary" },
        ]}
      />
    </>
  );
}
