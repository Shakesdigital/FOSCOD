import { PageHero } from "@/components/site/PageHero";
import { FeatureGrid, FAQ } from "@/components/site/blocks";
import { SubmitForm, type Field } from "@/components/forms/SubmitForm";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Donate to Community-Led Development in Uganda",
  "Help FOSCOD expand clean energy, WASH, livelihoods, health, and youth opportunities in underserved communities."
);

const priorities = [
  { title: "WASH", body: "Clean water, sanitation, and hygiene.", kicker: "Fund a project" },
  { title: "Renewable energy", body: "Solar enterprises and clean cooking.", kicker: "Fund a project" },
  { title: "Biochar Uganda", body: "Climate, soil, and carbon removal.", kicker: "Fund a project" },
  { title: "Sustainable livelihoods", body: "Green enterprise and savings groups.", kicker: "Fund a project" },
  { title: "School & youth health", body: "Nutrition and preventive health.", kicker: "Fund a project" },
];

const faqs = [
  { q: "How are funds used?", a: "Donations go directly to community-prioritized projects, with transparent reporting on outcomes." },
  { q: "Can I fund a specific project?", a: "Yes — choose a priority area, or talk to us about directing your gift." },
  { q: "Is FOSCOD accountable?", a: "As a registered Ugandan NGO, we maintain clear governance, reporting, and accountability." },
];

const fields: Field[] = [
  { name: "name", label: "Your name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "interest", label: "Project you'd like to support", type: "select", options: ["WASH", "Renewable energy", "Biochar Uganda", "Sustainable livelihoods", "School & youth health", "Where most needed"] },
  { name: "message", label: "Message (optional)", type: "textarea" },
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="Donate to community-led development"
        intro="Help FOSCOD expand clean energy, WASH, livelihoods, health, and youth opportunities in underserved communities in Uganda."
      />

      <section className="container-page py-12 md:py-16">
        <h2 className="max-w-xl text-[clamp(1.7rem,3vw,2.3rem)]">Fund a priority project</h2>
        <div className="mt-10"><FeatureGrid items={priorities} columns={3} /></div>
        <p className="mt-6 font-[family-name:var(--font-mono)] text-[0.72rem] text-[var(--muted)]">
          ◷ Suggested giving amounts tied to concrete uses are added once FOSCOD
          verifies costs — we never publish unverified figures.
        </p>
      </section>

      <section className="bg-[var(--surface-2)] py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">Donor FAQ</h2>
            <div className="mt-6"><FAQ items={faqs} /></div>
          </div>
          <div>
            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">Talk to us about giving</h2>
            <p className="mt-3 text-[var(--muted)]">
              A payment link / gateway is wired in the CMS. Meanwhile, tell us how
              you'd like to give and we'll follow up.
            </p>
            <div className="mt-6">
              <SubmitForm
                formType="donor"
                fields={fields}
                submitLabel="Start a donation conversation"
                successTitle="Thank you"
                successBody="We'll be in touch about giving options."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
