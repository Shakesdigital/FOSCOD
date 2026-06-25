import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/blocks";
import { pageMeta } from "@/lib/seo";
import { getImpactMetrics } from "@/lib/content";

export const metadata = pageMeta(
  "Our Impact",
  "FOSCOD publishes verified metrics only. Where numbers are still being confirmed, we show drafts rather than zeros."
);

export default async function ImpactPage() {
  const metrics = await getImpactMetrics();
  return (
    <>
      <PageHero
        eyebrow="Field report · impact"
        title="Impact we can stand behind"
        intro="We publish verified numbers only. Metrics still being confirmed show as drafts until our team validates them in the field — we never display zeros."
      />

      <section className="container-page py-12 md:py-16">
        <dl className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-[var(--surface)] p-6">
              <dd className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,4vw,3rem)] leading-none text-[var(--ink)]">
                {m.value}
                {m.unit && <span className="ml-1 text-xl text-[var(--accent-600)]">{m.unit}</span>}
              </dd>
              <dt className="mt-3 text-[0.95rem] text-[var(--ink-soft)]">{m.label}</dt>
              <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.12em]">
                {m.status === "draft" ? (
                  <span className="text-[var(--gold-700)]">◷ {m.note ?? "being updated"}</span>
                ) : (
                  <span className="text-[var(--forest-700)]">✓ verified</span>
                )}
              </p>
            </div>
          ))}
        </dl>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { t: "Map of active locations", b: "Kalagala, Buikwe, Busoga, Greater Mukono and more — map view managed in the CMS." },
            { t: "Impact by theme", b: "WASH, energy, climate, livelihoods, health, and inclusion outcomes." },
            { t: "Annual reports", b: "Downloadable reports and verified outcomes, published as they're confirmed." },
          ].map((c) => (
            <div key={c.t} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-2)] p-6">
              <h3 className="text-lg">{c.t}</h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--muted)]">{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      <CTABand
        title="Help us grow verified impact"
        actions={[
          { href: "/donate", label: "Donate" },
          { href: "/stories", label: "Read field stories", variant: "secondary" },
        ]}
      />
    </>
  );
}
