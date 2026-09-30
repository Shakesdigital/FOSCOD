import { Eyebrow } from "@/components/ui/Eyebrow";

/** ImpactStrip — verified metrics strip with "as of [date]" labels.
 *  Powers the Home page's verified impact strip and the Impact page dashboard. */
export function ImpactStrip({
  stats,
  eyebrow = "Verified impact",
  title = "The difference, measured honestly",
}: {
  stats: { metric_name: string; current_value: string; unit?: string; as_of_date?: string; source_note?: string; status: "verified" | "draft" }[];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="bg-[var(--surface-2)] py-12 md:py-16">
      <div className="container-page">
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">{title}</h2>
        </div>
        <dl className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((m) => (
            <div key={m.metric_name} className="bg-[var(--surface)] p-6">
              <dd className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,4vw,3rem)] leading-none text-[var(--ink)]">
                {m.current_value}
                {m.unit && <span className="ml-1 text-xl text-[var(--accent-600)]">{m.unit}</span>}
              </dd>
              <dt className="mt-3 text-[0.95rem] text-[var(--ink-soft)]">{m.metric_name}</dt>
              <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.12em]">
                {m.as_of_date && (
                  <span className="text-[var(--muted)]">As of {new Date(m.as_of_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                )}
                {m.source_note && !m.as_of_date && (
                  <span className="text-[var(--gold-700)]">◷ {m.source_note}</span>
                )}
                {m.status === "verified" && !m.as_of_date && (
                  <span className="text-[var(--forest-700)]">✓ Verified</span>
                )}
                {m.status === "draft" && !m.source_note && !m.as_of_date && (
                  <span className="text-[var(--gold-700)]">◷ Being updated</span>
                )}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}