import { PageHero } from "@/components/site/PageHero";
import { SplitSection, Prose, FeatureGrid, Steps, CTABand } from "@/components/site/blocks";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Community Empowerment and Development Program (CEDP)",
  "CEDP supports underserved communities in Uganda to lead practical solutions in clean energy, environment, livelihoods, health, WASH, and inclusion."
);

const focus = [
  { title: "Education & skills", body: "Training and learning that builds local capacity." },
  { title: "Health & wellbeing", body: "Nutrition, safe water, sanitation, and preventive care." },
  { title: "Economic empowerment", body: "VSLAs, green enterprise, and climate-smart livelihoods." },
  { title: "Environmental sustainability", body: "Renewable energy, agroforestry, and land restoration." },
  { title: "Social inclusion", body: "Youth, women, and people with disabilities leading change." },
];

const approach = [
  { title: "Community assessment", body: "We start by listening — mapping needs and assets together." },
  { title: "Asset-based co-design", body: "Solutions are designed with communities, not imposed." },
  { title: "Implementation", body: "Delivered with local organizations and global participants." },
  { title: "Monitoring & reporting", body: "Honest measurement and transparent reporting." },
  { title: "Local ownership", body: "Communities own and sustain what's built." },
];

export default function CedpPage() {
  return (
    <>
      <PageHero
        eyebrow="Community Empowerment & Development"
        title="Community-led development at the center"
        intro="CEDP supports underserved communities in Uganda to lead practical solutions in clean energy, environment, livelihoods, health, WASH, and inclusion."
      />

      <SplitSection eyebrow="The model" title="An integrated development approach">
        <Prose>
          <p>
            Launched in 2022, CEDP expanded FOSCOD's community work into an
            integrated development model where environmental sustainability and
            renewable energy sit at the center of local transformation.
          </p>
          <p>
            The program works with communities, academic partners, local
            organizations, and global participants to co-create locally rooted
            solutions across <strong>Kalagala Parish, Buikwe District, the Busoga
            region, Greater Mukono</strong>, and other active locations.
          </p>
        </Prose>
      </SplitSection>

      <section className="bg-[var(--surface-2)] py-16 md:py-20">
        <div className="container-page">
          <h2 className="max-w-xl text-[clamp(1.7rem,3vw,2.3rem)]">Focus areas</h2>
          <div className="mt-10"><FeatureGrid items={focus} columns={3} /></div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <h2 className="max-w-xl text-[clamp(1.7rem,3vw,2.3rem)]">How we work</h2>
        <div className="mt-10"><Steps steps={approach} /></div>
      </section>

      <CTABand
        title="Support community-led development"
        body="Partner on a flagship project, fund priority work, or join as an intern or volunteer."
        actions={[
          { href: "/partners", label: "Partner with us" },
          { href: "/donate", label: "Donate to a project", variant: "secondary" },
          { href: "/projects", label: "Explore projects", variant: "ghost" },
        ]}
      />
    </>
  );
}
