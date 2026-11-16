/**
 * Building blocks for the GLE Volunteer & Internship landing pages.
 * All server components — the expandable cards use native <details>, so the
 * "read more" interaction needs no JavaScript.
 */
import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

const bandTones: Record<string, string> = {
  earth: "linear-gradient(135deg, #7d3a23, #a8553a 55%, #c98a5f)",
  water: "linear-gradient(135deg, #123f3a, #1c6e66 55%, #5fa39a)",
  forest: "linear-gradient(135deg, #23381f, #2f5d3a 55%, #6f9c63)",
};

/** SubNav — the sticky on-page anchor strip under the main header
 *  (mirrors the former site's section jump-bar, restyled to the brand). */
export function SubNav({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav
      aria-label="On this page"
      className="sticky top-16 z-40 border-b border-[var(--accent-700)] bg-[var(--accent-600)] shadow-[var(--shadow-sm)] md:top-20"
    >
      <div className="container-page flex gap-1 overflow-x-auto py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className="whitespace-nowrap rounded-[var(--radius-full)] px-3.5 py-2.5 font-[family-name:var(--font-text)] text-[0.82rem] font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {i.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

/** PhotoBand — a brand-gradient section with the content card on one side and,
 *  when a photo is supplied, a contained image on the other that melts into
 *  the band (tone wash + soft edge fade) instead of filling the background. */
export function PhotoBand({
  id,
  eyebrow,
  title,
  body,
  bullets,
  cta,
  tone = "water",
  imageUrl,
  imageAlt,
  align = "left",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  body?: string;
  bullets?: string[];
  cta?: { href: string; label: string };
  tone?: "earth" | "water" | "forest";
  imageUrl?: string;
  imageAlt?: string;
  align?: "left" | "right";
}) {
  const card = (
    <div
      className={`w-full max-w-xl rounded-[var(--radius-xl)] border border-white/20 bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] p-8 shadow-[var(--shadow-lg)] backdrop-blur-md md:p-10`}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={`${id ?? title}-heading`} className="mt-3 text-[clamp(1.5rem,2.6vw,2rem)]">{title}</h2>
      {body && <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">{body}</p>}
      {bullets && (
        <ul className="mt-4 space-y-2.5">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-600)]" aria-hidden />
              {b}
            </li>
          ))}
        </ul>
      )}
      {cta && (
        <div className="mt-7">
          <Button href={cta.href} variant="primary" size="md">{cta.label}</Button>
        </div>
      )}
    </div>
  );

  return (
    <section id={id} className="relative isolate overflow-hidden py-20 md:py-28" aria-labelledby={`${id ?? title}-heading`}>
      <div className="absolute inset-0 -z-20" style={{ backgroundImage: bandTones[tone] }} aria-hidden />
      {imageUrl ? (
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className={align === "right" ? "flex lg:order-2 lg:justify-end" : "flex"}>{card}</div>
          <div
            className={`relative w-full max-w-lg overflow-hidden self-center rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] ${
              align === "right" ? "lg:order-1 lg:justify-self-end" : "lg:justify-self-start"
            }`}
          >
            <img
              src={imageUrl}
              alt={imageAlt ?? ""}
              className="block h-auto max-h-[540px] w-full object-cover"
              loading="lazy"
            />
            {/* tone wash + inner-edge fade make the photo melt into the band */}
            <div
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{ backgroundImage: bandTones[tone] }}
              aria-hidden
            />
            <div
              className={`pointer-events-none absolute inset-y-0 w-1/3 ${
                align === "right"
                  ? "right-0 bg-gradient-to-l from-[var(--accent-700)]/70 to-transparent"
                  : "left-0 bg-gradient-to-r from-[var(--accent-700)]/70 to-transparent"
              }`}
              aria-hidden
            />
          </div>
        </div>
      ) : (
        <div className={`container-page flex ${align === "right" ? "justify-end" : "justify-start"}`}>{card}</div>
      )}
    </section>
  );
}

/** ExpandableCard — a card with visible intro and a native-disclosure
 *  "read more" reveal. Powers the program-type cards, the volunteer/internship
 *  package and the benefits lists on the landing pages. */
export function ExpandableCard({
  title,
  intro,
  body,
  tag,
  tone = "forest",
  imageUrl,
  imageAlt,
  icon,
  readMoreLabel = "Read more",
}: {
  title: string;
  intro: string;
  body: string;
  tag?: string;
  tone?: "earth" | "water" | "forest";
  imageUrl?: string;
  imageAlt?: string;
  icon?: string;
  readMoreLabel?: string;
}) {
  const heading = (
    <div className="flex-1">
      {tag && (
        <span className="font-[family-name:var(--font-text)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
          {tag}
        </span>
      )}
      <h3 className="text-[1.15rem] leading-snug">{title}</h3>
      <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--muted)]">{intro}</p>
    </div>
  );

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-shadow duration-200 hover:shadow-[var(--shadow-md)]">
      {imageUrl ? (
        <img src={imageUrl} alt={imageAlt ?? title} className="h-40 w-full object-cover" loading="lazy" width={640} height={320} />
      ) : icon ? (
        <div className="flex h-40 w-full items-center justify-center" style={{ backgroundImage: bandTones[tone] }} aria-hidden>
          <span className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-full)] border border-white/30 bg-white/15 text-3xl text-white">
            {icon}
          </span>
        </div>
      ) : null}
      <details className="group flex flex-1 flex-col px-6 py-5">
        <summary className="flex cursor-pointer list-none flex-col marker:hidden">
          {heading}
          <span className="mt-auto pt-4 font-[family-name:var(--font-text)] text-[0.78rem] font-medium text-[var(--accent-700)]">
            <span className="group-open:hidden">{readMoreLabel} +</span>
            <span className="hidden group-open:inline">Show less −</span>
          </span>
        </summary>
        <p className="mt-3 text-[0.92rem] leading-relaxed text-[var(--ink-soft)]">{body}</p>
      </details>
    </div>
  );
}

/** StatsRow — verified impact figures in the impact section of the landing pages. */
export function StatsRow({
  children,
  intro,
}: {
  children: ReactNode;
  intro?: string;
}) {
  return (
    <div>
      {intro && <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">{intro}</p>}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </div>
  );
}
