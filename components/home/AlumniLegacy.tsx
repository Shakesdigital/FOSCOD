import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import type { Testimonial } from "@/lib/content";

export function AlumniLegacy({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Section surface>
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Alumni & community</Eyebrow>
        <h2 className="mt-4 text-[clamp(1.9rem,3.5vw,2.6rem)]">
          Showcasing our alumni&rsquo;s legacy in community transformation
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
          Past interns, volunteers, and university cohorts leave more than a
          report behind — they leave working projects and lasting relationships.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {(["forest", "water", "earth"] as const).map((tone, i) => (
          <PhotoSlot
            key={tone}
            tone={tone}
            ratio="4/3"
            caption={["Alumni in the field", "Community handover", "Host family"][i]}
          />
        ))}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure
            key={i}
            className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-7"
          >
            <span className="font-[family-name:var(--font-display)] text-5xl leading-none text-[var(--accent-300)]" aria-hidden>
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

      <div className="mt-10 text-center">
        <Button href="/alumni" variant="secondary" size="md">
          Explore the alumni network
        </Button>
      </div>
    </Section>
  );
}
