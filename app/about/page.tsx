import { PageHero } from "@/components/site/PageHero";
import { SplitSection, Prose, FeatureGrid, FeatureRow, HowWeWork, CTABand } from "@/components/site/blocks";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "About FOSCOD",
  "FOSCOD is a Ugandan indigenous NGO working with rural and underserved communities to design sustainable, ethical, and locally owned development solutions."
);

const values = [
  { title: "Community-driven solutions", body: "Communities set the priorities; we build alongside them, never for them." },
  { title: "Equity & inclusion", body: "Youth, women, people with disabilities, and marginalized households participate fully." },
  { title: "Sustainability & innovation", body: "Environmental stewardship and clean energy sit at the center of our model." },
  { title: "Transparency", body: "Clear governance, honest reporting, and accountability to partners and donors." },
  { title: "Holistic development", body: "Health, livelihoods, environment, and learning advance together, not in silos." },
  { title: "Collaboration", body: "Local organizations, universities, and global participants co-create what lasts." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title="A Ugandan NGO with local roots and global partnerships"
        intro="FOSCOD works with rural and underserved communities to design sustainable, ethical, and locally owned development solutions — combining community-led practice with global knowledge exchange."
      />

      <SplitSection eyebrow="Mission" title="Why we exist">
        <Prose>
          <p>
            We combine community-led practice with global knowledge exchange so
            communities, students, researchers, and partners can co-create
            solutions that last.
          </p>
          <p>
            <strong>Mission.</strong> Empower rural communities through innovative
            environmental solutions, ethical sustainable development, and global
            knowledge exchange.
          </p>
          <p>
            <strong>Vision.</strong> Rural communities leading environmental
            sustainability and clean energy adoption through strong local and
            global partnerships.
          </p>
        </Prose>
      </SplitSection>

      <section className="bg-[var(--surface-2)] py-16 md:py-20">
        <div className="container-page">
          <h2 className="max-w-xl text-[clamp(1.7rem,3vw,2.3rem)]">What we value</h2>
          <div className="mt-10">
            <FeatureGrid items={values} columns={3} />
          </div>
        </div>
      </section>

      <FeatureRow
        eyebrow="Our approach"
        title="Community-led, asset-based, locally owned"
        tone="forest"
        imageCaption="Community planning session — add photo via CMS"
        body="We start by listening. Through community assessment and asset-based co-design, communities set the priorities and lead delivery — we bring global knowledge, supervision, and partnerships that make solutions last."
        cta={{ href: "/programs/community-empowerment-development", label: "See our model" }}
      />

      <HowWeWork
        title="How we work"
        steps={[
          "Conduct community situation analysis",
          "Build partnerships with local leaders",
          "Co-design solutions with the community",
          "Implement with local supervision",
          "Monitor, report, and hand over ownership",
        ]}
      />

      <SplitSection eyebrow="2025–2030" title="Our strategic direction">
        <Prose>
          <p>
            Transform communities into centers of excellence for environmental
            stewardship and renewable energy. We are deepening our two pillars —
            Community Empowerment and Development (CEDP) and Global Learning and
            Exchange (GLE) — and strengthening governance, reporting, and
            measurable impact.
          </p>
          <p>
            As a registered Ugandan indigenous NGO, we hold ourselves to
            transparency and accountability in everything from project design to
            financial reporting.
          </p>
        </Prose>
      </SplitSection>

      <CTABand
        title="Work with FOSCOD"
        body="Meet the team behind the work, explore a partnership, or get in touch."
        actions={[
          { href: "/team", label: "Meet the team" },
          { href: "/partners", label: "Partner with us", variant: "secondary" },
          { href: "/contact", label: "Contact", variant: "ghost" },
        ]}
      />
    </>
  );
}
