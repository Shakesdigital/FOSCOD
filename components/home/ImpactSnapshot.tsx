import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ImpactMetric } from "@/lib/content";

export function ImpactSnapshot({ metrics }: { metrics: ImpactMetric[] }) {
  return (
    <section className="bg-[var(--ink)] text-[var(--bg)]">
      <div className="container-page py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="eyebrow text-[var(--accent-300)] [&::before]:bg-[var(--accent-300)]">
              Field report · impact
            </span>
            <h2 className="mt-4 text-[clamp(1.9rem,3.5vw,2.6rem)] text-[var(--bg)]">
              Impact we can stand behind
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-[color-mix(in_srgb,var(--bg)_72%,transparent)]">
              We publish verified numbers only. Metrics still being confirmed
              show as drafts until our team validates them in the field.
            </p>
          </div>
          <Button href="/impact" variant="on-dark" size="md">
            See the impact dashboard
          </Button>
        </div>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-[var(--ink)] p-6">
              <dd className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,5vw,3.2rem)] leading-none text-[var(--bg)]">
                {m.value}
                {m.unit && (
                  <span className="ml-1 text-xl text-[var(--accent-300)]">
                    {m.unit}
                  </span>
                )}
              </dd>
              <dt className="mt-3 text-[0.95rem] text-[color-mix(in_srgb,var(--bg)_82%,transparent)]">
                {m.label}
              </dt>
              <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.12em] text-[color-mix(in_srgb,var(--bg)_55%,transparent)]">
                {m.status === "draft" ? (
                  <span className="text-[var(--gold-500)]">◷ {m.note}</span>
                ) : (
                  <span>✓ verified</span>
                )}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
