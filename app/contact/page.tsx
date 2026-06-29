import { HeroSlider } from "@/components/site/HeroSlider";
import { SubmitForm, type Field } from "@/components/forms/SubmitForm";
import { LocationBlock } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides } from "@/lib/content";

export const metadata = pageMeta(
  "Contact FOSCOD",
  "Questions about programs, partnerships, donations, or community projects? We'd be glad to help."
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

export default async function ContactPage() {
  const heroSlides = await getHeroSlides("contact");
  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* Send us a message */}
      <section className="container-page py-12 md:py-16">
        <div className="max-w-2xl">
          <Eyebrow>Send us a message</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Application &amp; inquiry form</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Whether you&rsquo;re applying for a program, exploring a partnership, or
            just have a question, this reaches our team directly.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <SubmitForm formType="contact" fields={fields} submitLabel="Send message" />

          <div className="space-y-8">
            <div>
              <h3 className="text-xl">Reach us</h3>
              <div className="mt-4 space-y-1 font-[family-name:var(--font-mono)] text-sm text-[var(--ink-soft)]">
                <p>{site.contact.location}</p>
                <p>{site.contact.email}</p>
                <p>{site.contact.phone}</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl">Quick links</h3>
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

      {/* Our location */}
      <LocationBlock
        embedSrc="https://www.google.com/maps?q=Jinja,Uganda&output=embed"
        address={site.contact.location}
        email={site.contact.email}
        phone={site.contact.phone}
        hours="Monday – Friday, 9:00am – 5:00pm EAT"
      />
    </>
  );
}
