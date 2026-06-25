import { PageHero } from "@/components/site/PageHero";
import { FeatureGrid, Steps } from "@/components/site/blocks";
import { SubmitForm, type Field } from "@/components/forms/SubmitForm";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Partner with FOSCOD",
  "Collaborate with a Ugandan community-based development organization to create practical, locally owned, and measurable change."
);

const types = [
  { title: "Strategic partners", body: "Long-term collaboration on shared goals." },
  { title: "Academic & research", body: "Group programs, credit alignment, and research." },
  { title: "Program partners", body: "Co-deliver projects on the ground." },
  { title: "Corporate sponsors", body: "CSR and climate/carbon partnerships." },
  { title: "Community partners", body: "CBOs, NGOs, and local government." },
];

const process = [
  { title: "Inquiry", body: "Tell us your goals and area of interest." },
  { title: "Discovery call", body: "We explore fit and possibilities." },
  { title: "Concept note", body: "We draft a shared concept." },
  { title: "MOU & design", body: "Formalize and design the project." },
  { title: "Implementation", body: "Deliver together with communities." },
  { title: "Reporting", body: "Transparent measurement and reporting." },
];

const fields: Field[] = [
  { name: "org_name", label: "Organization", required: true },
  { name: "contact_name", label: "Contact name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "partnership_type", label: "Partnership type", type: "select", options: ["Strategic", "Academic / Research", "Program", "Corporate / CSR", "Community"] },
  { name: "interest", label: "Area of collaboration", type: "select", options: ["Education & skills", "Health", "Environment", "Social inclusion", "Internship & volunteer program", "Climate / carbon"] },
  { name: "message", label: "Tell us about your goals", type: "textarea", required: true },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner with FOSCOD"
        title="Build practical, locally owned change"
        intro="Collaborate with a Ugandan community-based development organization to create measurable change — backed by local knowledge, a field network, and community trust."
      />

      <section className="container-page py-12 md:py-16">
        <h2 className="max-w-xl text-[clamp(1.7rem,3vw,2.3rem)]">Ways to partner</h2>
        <div className="mt-10"><FeatureGrid items={types} columns={3} /></div>
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
    </>
  );
}
