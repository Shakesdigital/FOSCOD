import { PageHero } from "@/components/site/PageHero";
import { CTABand, FAQ, FeatureGrid, Steps } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SubmitForm, type Field } from "@/components/forms/SubmitForm";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta(
  "Partner with FOSCOD",
  "Collaborate with a Ugandan community-based development organization to create practical, locally owned, and measurable change."
);

const types = [
  { title: "Funders & grantmakers", body: "Develop a theme- or project-specific concept with agreed outcomes, budget assumptions, safeguards, learning questions, and reporting milestones.", kicker: "Resource partnership" },
  { title: "Universities & researchers", body: "Co-design faculty-led learning, supervised placements, or community-based research with academic and local value defined together.", kicker: "Knowledge partnership" },
  { title: "NGOs & community organizations", body: "Build a consortium, referral, capacity-strengthening, or delivery relationship with transparent roles, costs, attribution, and risk.", kicker: "Delivery partnership" },
  { title: "Government & public institutions", body: "Coordinate with local mandates, community priorities, technical standards, referral routes, and public reporting needs.", kicker: "Public coordination" },
  { title: "Technical & responsible business partners", body: "Contribute relevant technology, expertise, market access, equipment, quality assurance, or long-term project support.", kicker: "Technical partnership" },
  { title: "Community stakeholders", body: "Bring a priority, local knowledge, implementation role, feedback, or concern into a clear and respectful conversation.", kicker: "Local partnership" },
];

const process = [
  { title: "Listen & assess fit", body: "Clarify the community priority, each partner's goals, constraints, and what useful collaboration would look like." },
  { title: "Co-design", body: "Agree the problem, people involved, activities, outcomes, learning questions, and decision-making process." },
  { title: "Document the partnership", body: "Confirm roles, budget, safeguarding, data, communications, risk, reporting, and review points in writing." },
  { title: "Deliver together", body: "Implement with local coordination, appropriate technical support, feedback, and clear responsibility." },
  { title: "Review, learn & report", body: "Compare results with the agreed evidence, hear partner and community feedback, and document what changes next." },
];

const partnerFaqs = [
  { q: "What should we include in our first message?", a: "Share your organization, the problem or theme you care about, preferred geography, type of contribution, approximate timing, decision process, and any non-negotiable compliance or evidence requirements." },
  { q: "Can FOSCOD prepare a concept note?", a: "Yes, after an initial fit conversation. The concept should reflect a verified community priority, realistic delivery capacity, a clear budget basis, safeguards, and measurable outcomes." },
  { q: "What due-diligence information can we request?", a: `Begin with FOSCOD's legal identity (${site.registration.number}), governance, physical address, program track record, approved partner references, and Buikwe Local Government MoU. Current policies and financial documents are shared only after the team verifies the latest approved versions.` },
  { q: "How are roles and decision-making agreed?", a: "The partnership document should name who decides, delivers, supervises, holds data, communicates publicly, manages risks, receives funds, reports, and responds to feedback or complaints." },
  { q: "Can a partner make carbon or health claims?", a: "Not by default. Project claims must match the actual technology, monitoring evidence, methodology, verification status, authorization, and communications rules. Planned benefits are labelled as planned." },
];

const fields: Field[] = [
  { name: "org_name", label: "Organization", required: true },
  { name: "contact_name", label: "Contact name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "partnership_type", label: "Partnership type", type: "select", options: ["Funder / Grantmaker", "University / Research", "NGO / Community organization", "Government / Public institution", "Technical / Business", "Community stakeholder"] },
  { name: "interest", label: "Area of collaboration", type: "select", options: ["Green skills & renewable energy", "Clean cooking & health", "Water, sanitation & hygiene", "Green livelihoods", "Inclusive leadership", "Ecosystem restoration / carbon", "Global learning & exchange"] },
  { name: "message", label: "Tell us about your goals", type: "textarea", required: true },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner with FOSCOD"
        title="Build locally led development with a Ugandan organization rooted in Buikwe"
        intro="Work with FOSCOD and community partners to co-design practical action in clean energy, WASH, green livelihoods, inclusive leadership, restoration, or global learning—with roles and evidence agreed from the start."
      />

      <section id="partnership-inquiry" className="container-page scroll-mt-28 py-12 md:py-16">
        <Eyebrow>Choose your partnership path</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-[clamp(1.7rem,3vw,2.3rem)]">Different partners bring different value—and need different answers</h2>
        <div className="mt-10"><FeatureGrid items={types} columns={3} /></div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8">
            <Eyebrow>Why work with FOSCOD</Eyebrow>
            <h2 className="mt-4 text-2xl">Local presence with a documented track record</h2>
            <ul className="mt-5 space-y-3 text-[var(--ink-soft)]">
              <li><strong>Registered in Uganda:</strong> {site.registration.number}</li>
              <li><strong>Located in Buikwe District:</strong> {site.contact.location}</li>
              <li><strong>Public-sector coordination:</strong> MoU with {site.mou.partner}</li>
              <li><strong>Verified 2019–2024 record:</strong> 16 completed community projects, 20 grassroots organizations trained, and 86% of completed projects continuing to benefit communities independently</li>
            </ul>
          </div>
          <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8">
            <Eyebrow>Partnership principle</Eyebrow>
            <h2 className="mt-4 text-2xl">Shared responsibility, not transferred risk</h2>
            <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">
              A strong partnership makes local decision-making, realistic costs, safeguarding, data responsibilities, visibility, risk, and reporting explicit. FOSCOD uses the discovery and design stages to surface these questions before delivery begins.
            </p>
            <p className="mt-4 text-sm text-[var(--muted)]">
              Practice context: <a className="text-[var(--accent-700)] underline" href="https://www.oecd.org/en/publications/practical-guidelines-for-supporting-locally-led-development_eaecf72b-en.html" target="_blank" rel="noreferrer">OECD guidance on locally led development</a> emphasizes local actors as co-decision-makers across priorities, implementation, accountability, and learning.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface-2)] py-16 md:py-20">
        <div className="container-page">
          <h2 className="max-w-xl text-[clamp(1.7rem,3vw,2.3rem)]">The partnership process</h2>
          <div className="mt-10"><Steps steps={process} /></div>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">Start a partnership inquiry</h2>
            <p className="mt-3 text-[var(--muted)]">
              Tell us a little about your organization and goals. We'll follow up to
              arrange a discovery call.
            </p>
          </div>
          <SubmitForm
            formType="partner"
            fields={fields}
            submitLabel="Start partnership inquiry"
            successTitle="Inquiry received"
            successBody="We'll be in touch to arrange a discovery call."
          />
        </div>
      </section>

      <section className="bg-[var(--surface-2)] py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Partner FAQ</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Prepare for a useful first conversation</h2>
            <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">Clear questions about governance, evidence, money, safeguards, roles, and learning are welcome.</p>
          </div>
          <FAQ items={partnerFaqs} />
        </div>
      </section>

      <CTABand
        title="Bring the goal. We will help test the fit."
        body="Start with a partnership inquiry. FOSCOD will review the request before proposing a concept, commitment, or public claim."
        actions={[
          { href: "#partnership-inquiry", label: "Start a partnership inquiry" },
          { href: "/impact", label: "Review verified impact", variant: "secondary" },
          { href: "/about#registration", label: "See registration details", variant: "ghost" },
        ]}
      />
    </>
  );
}
