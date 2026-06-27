import { PageHero } from "@/components/site/PageHero";
import { Steps } from "@/components/site/blocks";
import { SubmitForm, type Field } from "@/components/forms/SubmitForm";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Apply to Join FOSCOD",
  "Start your internship or volunteer journey in Uganda. Choose the pathway that fits your goals, timeline, and field interests."
);

const steps = [
  { title: "Choose program type", body: "Internship, volunteer, group, or research." },
  { title: "Submit application", body: "Tell us your goals and field interests." },
  { title: "Review & matching", body: "FOSCOD reviews and matches your placement." },
  { title: "Confirmation & deposit", body: "Secure your place." },
  { title: "Pre-departure prep", body: "Logistics, health, and safety support." },
  { title: "Arrival & orientation", body: "Local orientation and your placement begins." },
];

const fields: Field[] = [
  { name: "first_name", label: "First name", required: true },
  { name: "last_name", label: "Last name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "country", label: "Country" },
  { name: "program_type", label: "Program type", type: "select", required: true, options: ["Internship", "Volunteer", "Group / University", "Research / Academic"] },
  { name: "sector", label: "Field of interest", type: "select", options: ["WASH & public health", "Renewable energy", "Livelihoods", "Health", "Environment", "Social inclusion", "Research", "Communications", "Fundraising", "ICT / data"] },
  { name: "duration", label: "Preferred duration", type: "select", options: ["4 weeks", "8 weeks", "10 weeks", "12 weeks", "Custom"] },
  { name: "start_date", label: "Preferred start date" },
  { name: "message", label: "Anything else we should know?", type: "textarea" },
];

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="Apply to join FOSCOD"
        intro="Start your internship or volunteer journey in Uganda. Choose the pathway that fits your goals, timeline, and field interests."
      />

      <section className="container-page py-12 md:py-16">
        <h2 className="max-w-xl text-[clamp(1.7rem,3vw,2.3rem)]">Program dates</h2>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Indicative intakes — confirm exact dates with our team when you apply.
        </p>
        <div className="mt-8 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--surface-2)] text-[var(--muted)]">
              <tr>
                <th className="px-5 py-3 font-medium">Intake</th>
                <th className="px-5 py-3 font-medium">Applications close</th>
                <th className="px-5 py-3 font-medium">Program starts</th>
                <th className="px-5 py-3 font-medium">Durations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {[
                ["Spring", "Rolling", "Feb / Mar", "4–12 weeks"],
                ["Summer", "Rolling", "Jun / Jul", "4–12 weeks"],
                ["Autumn", "Rolling", "Sep / Oct", "4–12 weeks"],
              ].map((r) => (
                <tr key={r[0]} className="bg-[var(--surface)]">
                  {r.map((c, i) => (
                    <td key={i} className={i === 0 ? "px-5 py-3 font-medium text-[var(--ink)]" : "px-5 py-3 text-[var(--muted)]"}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="container-page pb-4">
        <h2 className="max-w-xl text-[clamp(1.7rem,3vw,2.3rem)]">Application procedure</h2>
        <div className="mt-10"><Steps steps={steps} /></div>
      </section>

      <section className="container-page pb-12">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">Start your application</h2>
            <p className="mt-3 text-[var(--muted)]">
              One form for all pathways — we'll route your application to the right
              team. University groups can request a dedicated call.
            </p>
          </div>
          <SubmitForm
            formType="internship"
            fields={fields}
            submitLabel="Submit application"
            successTitle="Application received"
            successBody="Our admissions team replies within two working days with next steps."
          />
        </div>
      </section>
    </>
  );
}
