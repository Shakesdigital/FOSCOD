import { Section, SectionHeader } from "@/components/site/Section";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { CommunityIcon, resolveCommunityIcon } from "@/components/ui/CommunityIcon";
import type { Testimonial } from "@/lib/content";

const tones = ["earth", "water", "forest"] as const;

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (!items.length) return null;
  return (
    <Section>
      <SectionHeader
        eyebrow="From our alumni"
        title="The people who came to learn"
        intro="Permissioned reflections from past interns, volunteers, and university cohorts."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <figure
            key={t.name + i}
            className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)]"
          >
            {t.photo_url ? (
              <PhotoSlot
                tone={tones[i % 3]}
                ratio="4/3"
                imageUrl={t.photo_url}
                alt={t.name}
                caption={t.name}
                className="rounded-none border-0 border-b border-[var(--border)]"
              />
            ) : (
              <div className="flex h-36 w-full items-center justify-center border-b border-[var(--border)]">
                <CommunityIcon
                  name={resolveCommunityIcon(t.linked_program?.toLowerCase() as any) ?? "volunteer"}
                  className="h-12 w-12 text-[var(--accent-600)]"
                />
              </div>
            )}
            <figcaption className="flex flex-1 flex-col p-6">
              <span
                className="font-[family-name:var(--font-text)] text-5xl leading-none text-[var(--accent-300)]"
                aria-hidden
              >
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 leading-relaxed text-[var(--ink-soft)]">
                {t.quote}
              </blockquote>
              <p className="mt-4 font-medium text-[var(--ink)]">{t.name}</p>
              <p className="font-[family-name:var(--font-text)] text-[0.7rem] uppercase tracking-[0.1em] text-[var(--muted)]">
                {t.program} · {t.cohort}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}