import { Section, SectionHeader } from "@/components/site/Section";
import type { Testimonial } from "@/lib/content";

export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <Section>
      <SectionHeader
        eyebrow="From our alumni"
        title="The people who came to learn"
        intro="Reviews from past interns, volunteers, and university cohorts. Replace these placeholders with verified alumni quotes in the CMS."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((t, i) => (
          <figure
            key={i}
            className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-7"
          >
            <span
              className="font-[family-name:var(--font-display)] text-5xl leading-none text-[var(--accent-300)]"
              aria-hidden
            >
              &ldquo;
            </span>
            <blockquote className="mt-2 flex-1 leading-relaxed text-[var(--ink-soft)]">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 border-t border-[var(--border)] pt-4">
              <p className="font-medium text-[var(--ink)]">{t.name}</p>
              <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.1em] text-[var(--muted)]">
                {t.program} · {t.cohort}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
