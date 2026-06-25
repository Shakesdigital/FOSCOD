import { PageHero } from "@/components/site/PageHero";
import { SubmitForm, type Field } from "@/components/forms/SubmitForm";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Contact FOSCOD",
  "Questions about programs, partnerships, donations, or community projects? We'd be happy to help."
);

const fields: Field[] = [
  { name: "name", label: "Your name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "reason", label: "Reason for contact", type: "select", required: true, options: ["Apply", "Partner", "Donate", "Media / Research", "Alumni", "Other"] },
  { name: "message", label: "Message", type: "textarea", required: true },
];

const quick = [
  { t: "Apply", d: "Internships & volunteering", href: "/apply" },
  { t: "Partner", d: "Universities, NGOs, funders", href: "/partners" },
  { t: "Donate", d: "Fund a community project", href: "/donate" },
  { t: "Alumni", d: "Reconnect & mentor", href: "/alumni" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch with FOSCOD"
        intro="Have a question about programs, partnerships, donations, or community projects? We'd be happy to help."
      />

      <section className="container-page py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <SubmitForm formType="contact" fields={fields} submitLabel="Send message" />

          <div className="space-y-8">
            <div>
              <h2 className="text-xl">Reach us</h2>
              <div className="mt-4 space-y-1 font-[family-name:var(--font-mono)] text-sm text-[var(--ink-soft)]">
                <p>{site.contact.location}</p>
                <p>{site.contact.email}</p>
                <p>{site.contact.phone}</p>
              </div>
            </div>
            <div>
              <h2 className="text-xl">Quick links</h2>
              <ul className="mt-4 grid gap-3">
                {quick.map((q) => (
                  <li key={q.t}>
                    <a
                      href={q.href}
                      className="flex items-center justify-between rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 transition-colors hover:border-[var(--ink)]"
                    >
                      <span>
                        <span className="font-medium text-[var(--ink)]">{q.t}</span>
                        <span className="block text-[0.85rem] text-[var(--muted)]">{q.d}</span>
                      </span>
                      <span className="text-[var(--accent-700)]">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
