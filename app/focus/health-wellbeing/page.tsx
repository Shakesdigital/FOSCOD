import { PageHero } from "@/components/site/PageHero";
import { FeatureGrid, CTABand } from "@/components/site/blocks";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Health and Wellbeing",
  "Strengthening community health through nutrition, safe water, sanitation, youth wellbeing, and preventive education."
);

const areas = [
  { title: "Health care access", body: "Connecting communities to essential services." },
  { title: "Nutrition programs", body: "Addressing nutrition for children and families." },
  { title: "Safe water & sanitation", body: "Clean water and hygiene as health foundations." },
  { title: "Maternal & infant health", body: "Family education and preventive care." },
  { title: "School & youth health", body: "Healthy schools and young people." },
];

export default function HealthPage() {
  return (
    <>
      <PageHero
        eyebrow="Focus area"
        title="Health and wellbeing"
        intro="Strengthening community health through nutrition, safe water, sanitation, youth wellbeing, and preventive education."
      />
      <section className="container-page py-16 md:py-20">
        <FeatureGrid items={areas} columns={3} />
      </section>
      <CTABand
        title="Strengthen community health"
        actions={[
          { href: "/donate", label: "Support health projects" },
          { href: "/apply", label: "Apply for a health internship", variant: "secondary" },
        ]}
      />
    </>
  );
}
