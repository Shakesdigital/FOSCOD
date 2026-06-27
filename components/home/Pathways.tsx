import Link from "next/link";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Pathway } from "@/lib/content";

export function Pathways({ pathways }: { pathways: Pathway[] }) {
  return (
    <Section>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <Eyebrow>Our programs</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.9rem,3.5vw,2.6rem)]">
            Two ways to work with FOSCOD
          </h2>
        </div>
        <p className="max-w-sm text-[0.95rem] text-[var(--muted)]">
          Whether you come to learn or to invest, the work stays community-led
          and locally owned.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {pathways.map((p) => {
          const accentVar = p.tone === "accent" ? "var(--clay-600)" : "var(--accent-600)";
          return (
            <Link
              key={p.key}
              href={p.href}
              className="group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] md:p-10"
            >
              <span
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: accentVar }}
                aria-hidden
              />
              <p className="font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                {p.kicker}
              </p>
              <h3 className="mt-3 text-2xl">{p.title}</h3>
              <p className="mt-4 flex-1 leading-relaxed text-[var(--ink-soft)]">
                {p.body}
              </p>
              <span
                className="mt-7 inline-flex items-center gap-2 text-[0.95rem] font-medium transition-colors"
                style={{ color: accentVar }}
              >
                {p.cta}
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
