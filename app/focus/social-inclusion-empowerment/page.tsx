import { PageHero } from "@/components/site/PageHero";
import { FeatureGrid, Steps, CTABand } from "@/components/site/blocks";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Social Inclusion and Empowerment",
  "Supporting youth, women, people with disabilities, and vulnerable households to participate fully in community development."
);

const groups = [
  { title: "Youth empowerment", body: "Skills, mentorship, and leadership for young people." },
  { title: "Women empowerment", body: "Training, enterprise, and decision-making power." },
  { title: "Disability inclusion", body: "Access and participation for people with disabilities." },
  { title: "Marginalized populations", body: "Reaching households often left out of development." },
];

const how = [
  { title: "Community research", body: "Understand who is excluded and why." },
  { title: "Asset-based planning", body: "Build on existing strengths and leaders." },
  { title: "Training & leadership", body: "Equip people to lead their own change." },
  { title: "Monitoring", body: "Track inclusion outcomes honestly." },
];

export default function SocialInclusionPage() {
  return (
    <>
      <PageHero
        eyebrow="Focus area"
        title="Social inclusion and empowerment"
        intro="Supporting youth, women, people with disabilities, and vulnerable households to participate fully in community development."
      />
      <section className="container-page py-16 md:py-20">
        <FeatureGrid items={groups} columns={4} />
      </section>
      <section className="bg-[var(--surface-2)] py-16 md:py-20">
        <div className="container-page">
          <h2 className="max-w-xl text-[clamp(1.7rem,3vw,2.3rem)]">How we work</h2>
          <div className="mt-10"><Steps steps={how} /></div>
        </div>
      </section>
      <CTABand
        title="Advance inclusion with us"
        actions={[
          { href: "/partners", label: "Partner on inclusion" },
          { href: "/volunteer", label: "Volunteer in social inclusion", variant: "secondary" },
        ]}
      />
    </>
  );
}
