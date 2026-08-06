import { PageHero } from "@/components/site/PageHero";
import { FeatureGrid, FAQ, Steps, CTABand } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SubmitForm, type Field } from "@/components/forms/SubmitForm";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Donate to Community-Led Development in Uganda",
  "Help FOSCOD expand clean energy, WASH, livelihoods, health, and youth opportunities in underserved communities."
);

const priorities = [
  { title: "Water Spring Protection — Naluvule", body: "Support a named WASH project while FOSCOD confirms the current scope, budget, maintenance plan, and evidence package.", kicker: "Named project" },
  { title: "Solar-Powered Water System — Naluvule", body: "Discuss support for community water infrastructure, governance, maintenance, and monitoring as one connected service.", kicker: "Named project" },
  { title: "Greening Kalagala", body: "Support community environmental action with activities and results tied to approved project records.", kicker: "Named project" },
  { title: "Coffee Farming Mobilization", body: "Explore livelihoods support that considers skills, production risk, organization, market access, and follow-through.", kicker: "Named project" },
  { title: "Planned Carbon Credit Project", body: "Support project development for clean cooking and restoration without treating estimated benefits as issued or verified carbon credits.", kicker: "Planned project" },
  { title: "Where most needed", body: "Allow FOSCOD to propose the most useful current priority, with the purpose and reporting arrangement agreed before funds are transferred.", kicker: "Flexible support" },
];

const faqs = [
  { q: "How are funds used?", a: "Before a contribution is finalized, FOSCOD should confirm the project or purpose, current budget basis, restrictions, transfer route, acknowledgement, and reporting arrangement. Approved support is then recorded through the organization's governance and monitoring processes." },
  { q: "Can I support a specific project?", a: "Yes. Choose a named project or priority area and FOSCOD will confirm its current status, funding need, and what can be responsibly reported before accepting restricted support." },
  { q: "What proof can I review?", a: "Start with FOSCOD's Ugandan registration, physical address, leadership, Buikwe Local Government MoU, verified 2019–2024 figures, and approved project records. Current financial or policy documents are provided only after the team verifies the latest approved versions." },
  { q: "Can I claim a carbon offset by supporting the planned carbon project?", a: "No. The project is planned. An offset claim would require an eligible methodology, authorization where applicable, validation, monitoring, independent verification, issuance, transfer, and retirement of credits under the relevant rules." },
  { q: "Is online payment available now?", a: "The current website begins with a giving inquiry. FOSCOD will confirm an approved transfer method directly; do not send money through an unverified link or account." },
];

const stewardship = [
  { title: "Confirm the priority", body: "Connect support to a current community or organizational priority and verify its status." },
  { title: "Agree the purpose", body: "Document the budget basis, restrictions, responsibilities, timeline, and evidence expected." },
  { title: "Implement & monitor", body: "Track delivery with appropriate community participation, financial controls, and project indicators." },
  { title: "Listen & adapt", body: "Use community and partner feedback to address problems and improve the work." },
  { title: "Report honestly", body: "Separate completed activities, verified outcomes, limitations, and future targets." },
];

const fields: Field[] = [
  { name: "name", label: "Your name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "interest", label: "Project or priority you'd like to support", type: "select", options: ["Water Spring Protection — Naluvule", "Solar-Powered Water System — Naluvule", "Greening Kalagala", "Coffee Farming Mobilization", "Planned Carbon Credit Project", "Where most needed"] },
  { name: "message", label: "Message (optional)", type: "textarea" },
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="Back community-led action in Buikwe District"
        intro="Start a giving conversation around a named project or priority. FOSCOD will confirm the current need, use of funds, transfer method, and reporting arrangement before you contribute."
      />

      <section className="container-page py-12 md:py-16">
        <Eyebrow>Choose what to support</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-[clamp(1.7rem,3vw,2.3rem)]">Begin with a verified project conversation</h2>
        <div className="mt-10"><FeatureGrid items={priorities} columns={3} /></div>
        <p className="mt-6 font-[family-name:var(--font-mono)] text-[0.72rem] text-[var(--muted)]">
          ◷ Suggested giving amounts tied to concrete uses are added once FOSCOD
          verifies costs — we never publish unverified figures.
        </p>
      </section>

      <section className="bg-[var(--surface-2)] py-16 md:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <Eyebrow>How stewardship works</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">From community priority to honest reporting</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">A donation should have a clear purpose, a safe route, and evidence proportionate to the size and risk of the work.</p>
          </div>
          <div className="mt-10"><Steps steps={stewardship} /></div>
        </div>
      </section>

      <section id="giving-inquiry" className="py-16 md:py-20">
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

      <CTABand
        title="Support begins with clarity"
        body="Tell FOSCOD which project or theme interests you. The team will confirm the current opportunity and approved giving route."
        actions={[
          { href: "#giving-inquiry", label: "Start a giving inquiry" },
          { href: "/impact", label: "Review verified impact", variant: "secondary" },
          { href: "/about#registration", label: "Check our identity", variant: "ghost" },
        ]}
      />
    </>
  );
}
