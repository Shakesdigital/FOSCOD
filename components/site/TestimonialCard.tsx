import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** TestimonialCard — a single testimonial with profile photo, quote, and attribution,
 *  wrapped in the program's accent tone as a border-left accent. */
export function TestimonialCard({
  quote,
  name,
  role,
  photoUrl,
  photoAlt,
  tone = "forest",
  className = "",
}: {
  quote: string;
  name: string;
  role?: string;
  photoUrl?: string;
  photoAlt?: string;
  tone?: "earth" | "water" | "forest";
  className?: string;
}) {
  const toneVars: Record<string, { border: string; bg: string }> = {
    earth: { border: "var(--clay-300)", bg: "var(--clay-50)" },
    water: { border: "var(--water-500)", bg: "var(--accent-50)" },
    forest: { border: "var(--forest-500)", bg: "var(--forest-50)" },
  };
  const style = toneVars[tone];

  return (
    <div
      className={`flex flex-col gap-4 rounded-[var(--radius-lg)] border-l-4 border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)] ${className}`}
      style={{ borderLeftColor: style.border }}
    >
      {photoUrl ? (
        <img src={photoUrl} alt={photoAlt || name} className="h-12 w-12 rounded-full object-cover object-center" loading="lazy" width={48} height={48} />
      ) : (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent-100)] text-[var(--accent-700)]">
          {name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>
      )}
      <blockquote className="text-lg italic leading-relaxed text-[var(--ink-soft)]">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-auto">
        <span className="block font-medium text-[var(--ink)]">{name}</span>
        {role && <span className="block font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{role}</span>}
      </figcaption>
    </div>
  );
}

/** TestimonialGrid — a 2-column grid of TestimonialCard components,
 *  CMS-managed via the explore_testimonials JSON field. */
export function TestimonialGrid({
  eyebrow,
  title,
  intro,
  items,
  cta,
  surface = false,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  items: { quote: string; name: string; role?: string; photoUrl?: string; photoAlt?: string; tone?: "earth" | "water" | "forest" }[];
  cta?: { href: string; label: string };
  surface?: boolean;
}) {
  if (!items.length) return null;
  return (
    <div className={`py-14 md:py-20 ${surface ? "bg-[var(--surface-2)]" : ""}`}>
      <div className="container-page">
        {(eyebrow || title) && (
          <div className="max-w-2xl">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">{title}</h2>}
            {intro && <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">{intro}</p>}
          </div>
        )}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {items.map((t, i) => (
            <TestimonialCard
              key={t.name + i}
              quote={t.quote}
              name={t.name}
              role={t.role}
              photoUrl={t.photoUrl}
              photoAlt={t.photoAlt}
              tone={(["forest", "water", "earth"][i % 3] as "earth" | "water" | "forest")}
            />
          ))}
        </div>
        {cta && (
          <div className="mt-10">
            <a
              href={cta.href}
              className="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-[var(--accent-700)] transition-colors hover:underline"
            >
              {cta.label} →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
