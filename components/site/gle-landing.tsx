/**
 * Building blocks for the GLE Volunteer & Internship landing pages.
 * All server components — the expandable cards use native <details>, so the
 * "read more" interaction needs no JavaScript.
 * 
 * DESIGN POLISH: Enhanced visual hierarchy, better section rhythm,
 * refined component aesthetics while preserving all content.
 */
import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** SubNav — the sticky on-page anchor strip under the main header
 *  (mirrors the former site's section jump-bar, restyled to the brand). */
export function SubNav({ items, label = "On this page" }: { items: { href: string; label: string }[]; label?: string }) {
  return (
    <nav
      aria-label={label}
      className="sticky top-16 z-40 border-b border-[var(--border-strong)] bg-[var(--surface)]/95 backdrop-blur-sm shadow-[var(--shadow-sm)] md:top-20"
    >
      <div className="container-page flex gap-1.5 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className="whitespace-nowrap rounded-[var(--radius-full)] px-4 py-2.5 font-[family-name:var(--font-text)] text-[0.8rem] font-medium text-[var(--ink-soft)] transition-all duration-200 hover:bg-[var(--accent-100)] hover:text-[var(--accent-700)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-600)]"
          >
            {i.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

/** SectionBand — a polished full-width section wrapper with consistent rhythm.
 *  Provides subtle background alternation and visual breathing room. */
const bandBgs: Record<"earth" | "water" | "forest" | "neutral", string> = {
  earth: "var(--ink)",
  water: "var(--surface)",
  forest: "var(--surface-2)",
  neutral: "var(--surface)",
};

const bandTones: Record<string, string> = {
  earth: "linear-gradient(135deg, #7d3a23, #a8553a 55%, #c98a5f)",
  water: "linear-gradient(135deg, #123f3a, #1c6e66 55%, #5fa39a)",
  forest: "linear-gradient(135deg, #23381f, #2f5d3a 55%, #6f9c63)",
  neutral: "linear-gradient(135deg, #3d3d3d, #5a5a5a 55%, #8a8a8a)",
};

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
  variant = "default", // "default" | "split" | "hero"
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
  variant?: "default" | "split" | "hero";
}) {
  const bgColor = bandBgs[tone];
  const toneGradient = bandTones[tone];

  const card = (
    <div
      className={`w-full max-w-2xl rounded-[var(--radius-xl)] border border-white/15 bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] p-8 md:p-10 lg:p-12 shadow-[var(--shadow-xl)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[var(--shadow-2xl)]`}
    >
      {eyebrow && <Eyebrow className="text-[var(--accent-100)]">{eyebrow}</Eyebrow>}
      <h2 id={`${id ?? title}-heading`} className="mt-3 text-[clamp(1.75rem,3vw,2.25rem)] leading-tight tracking-tight">
        {title}
      </h2>
      {body && <p className="mt-5 text-[1.02rem] leading-relaxed text-[var(--ink-soft)]">{body}</p>}
      {bullets && (
        <ul className="mt-6 space-y-3" role="list">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-[0.98rem] leading-relaxed text-[var(--ink-soft)]">
              <span className="mt-2.5 flex-shrink-0 h-2 w-2 rounded-full bg-[var(--accent-600)]" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
      )}
      {cta && (
        <div className="mt-8">
          <Button href={cta.href} variant="primary" size="md" className="w-full sm:w-auto">
            {cta.label}
          </Button>
        </div>
      )}
    </div>
  );

  if (variant === "hero") {
    return (
      <section
        id={id}
        className={`relative isolate overflow-hidden py-24 md:py-32 ${imageUrl ? "" : "bg-[var(--surface-2)]"}`}
        aria-labelledby={`${id ?? title}-heading`}
      >
        <div className="absolute inset-0 -z-20" style={{ background: bgColor }} aria-hidden="true" />
        <div className="container-page">
          {imageUrl ? (
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute inset-0 -z-10 rounded-[var(--radius-2xl)] opacity-15" style={{ background: toneGradient }} aria-hidden="true" />
              <div className="relative rounded-[var(--radius-2xl)] overflow-hidden">
                <img
                  src={imageUrl}
                  alt={imageAlt ?? ""}
                  className="block h-auto w-full object-cover"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(to top, ${bgColor} 0%, transparent 60%)` }} aria-hidden="true" />
              </div>
              <div className="absolute inset-x-0 bottom-0 -z-10 translate-y-1/2 md:-translate-y-0 md:bottom-auto md:top-1/2 md:translate-y-0 md:left-auto md:right-0 md:w-1/2">
                <div className="absolute inset-0 rounded-[var(--radius-2xl)] bg-[var(--surface)]/95 backdrop-blur-md shadow-[var(--shadow-xl)]" aria-hidden="true" />
                <div className="relative p-8 md:p-10 lg:p-12">{card}</div>
              </div>
            </div>
          ) : (
            <div className={`flex ${align === "right" ? "justify-end" : "justify-start"}`}>{card}</div>
          )}
        </div>
      </section>
    );
  }

  if (variant === "split") {
    return (
      <section id={id} className="relative isolate overflow-hidden py-20 md:py-28" aria-labelledby={`${id ?? title}-heading`}>
        <div className="absolute inset-0 -z-20" style={{ background: bgColor }} aria-hidden="true" />
        {imageUrl ? (
          <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className={align === "right" ? "flex lg:order-2 lg:justify-end" : "flex"}>{card}</div>
            <div
              className={`relative w-full max-w-lg overflow-hidden self-center rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)] ${
                align === "right" ? "lg:order-1 lg:justify-self-end" : "lg:justify-self-start"
              }`}
            >
              <img
                src={imageUrl}
                alt={imageAlt ?? ""}
                className="block h-auto max-h-[500px] w-full object-cover"
                loading="lazy"
              />
              {/* band-color wash + inner-edge fade make the photo melt into the section */}
              <div className="pointer-events-none absolute inset-0 opacity-15" style={{ backgroundColor: bgColor }} aria-hidden="true" />
              <div
                className={`pointer-events-none absolute inset-y-0 w-1/3 ${
                  align === "right" ? "right-0" : "left-0"
                }`}
                style={{
                  background: `linear-gradient(to ${align === "right" ? "left" : "right"}, ${bgColor} 0%, transparent 100%)`,
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        ) : (
          <div className={`container-page flex ${align === "right" ? "justify-end" : "justify-start"}`}>{card}</div>
        )}
      </section>
    );
  }

  // Default variant (original behavior, polished)
  return (
    <section id={id} className="relative isolate overflow-hidden py-20 md:py-28" aria-labelledby={`${id ?? title}-heading`}>
      <div className="absolute inset-0 -z-20" style={{ background: bgColor }} aria-hidden="true" />
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
            <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundColor: bgColor }} aria-hidden="true" />
            <div
              className={`pointer-events-none absolute inset-y-0 w-1/3 ${
                align === "right" ? "right-0" : "left-0"
              }`}
              style={{
                background: `linear-gradient(to ${align === "right" ? "left" : "right"}, ${bgColor} 0%, transparent 100%)`,
              }}
              aria-hidden="true"
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
 *  package and the benefits lists on the landing pages.
 * 
 * DESIGN POLISH: Better visual hierarchy, optional icon/image, cleaner disclosure. */
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
  size = "default", // "default" | "compact" | "feature"
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
  size?: "default" | "compact" | "feature";
}) {
  const toneGradient = bandTones[tone];
  const isCompact = size === "compact";
  const isFeature = size === "feature";

  const heading = (
    <div className="flex-1 min-w-0">
      {tag && (
        <span className="inline-block mb-2 font-[family-name:var(--font-text)] text-[0.6rem] uppercase tracking-[0.14em] text-[var(--accent-700)] bg-[var(--accent-50)] px-2 py-0.5 rounded-[var(--radius-full)]">
          {tag}
        </span>
      )}
      <h3 className="text-[1.15rem] leading-snug text-[var(--ink)]">{title}</h3>
      <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--muted)]">{intro}</p>
    </div>
  );

  const media = (
    <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
      {imageUrl ? (
        <img src={imageUrl} alt={imageAlt ?? title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
      ) : icon ? (
        <div className="flex h-full w-full items-center justify-center" style={{ backgroundImage: toneGradient }} aria-hidden="true">
          <span className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-full)] border border-white/30 bg-white/15 text-2xl text-white">
            {icon}
          </span>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center" style={{ background: `linear-gradient(135deg, var(--surface-2), var(--surface))` }} aria-hidden="true">
          <span className="text-[var(--muted)] text-sm">Add image via CMS</span>
        </div>
      )}
    </div>
  );

  if (isCompact) {
    return (
      <details className="group overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 hover:shadow-[var(--shadow-md)]">
        <summary className="flex cursor-pointer list-none gap-4 p-5 marker:hidden">
          {media}
          {heading}
          <span className="flex-shrink-0 mt-auto font-[family-name:var(--font-text)] text-[0.75rem] font-medium text-[var(--accent-700)]">
            <span className="group-open:hidden">{readMoreLabel} +</span>
            <span className="hidden group-open:inline">Show less −</span>
          </span>
        </summary>
        <div className="border-t border-[var(--border)] px-5 pb-5">
          <p className="text-[0.92rem] leading-relaxed text-[var(--ink-soft)]">{body}</p>
        </div>
      </details>
    );
  }

  if (isFeature) {
    return (
      <details className="group overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:shadow-[var(--shadow-lg)] hover:-translate-y-1">
        <summary className="flex cursor-pointer list-none flex-col marker:hidden">
          {media}
          <div className="flex-1 p-6 md:p-8">{heading}</div>
          <div className="border-t border-[var(--border)] px-6 py-4 font-[family-name:var(--font-text)] text-[0.78rem] font-medium text-[var(--accent-700)] text-center">
            <span className="group-open:hidden">{readMoreLabel} +</span>
            <span className="hidden group-open:inline">Show less −</span>
          </div>
        </summary>
        <div className="px-6 pb-6 pt-4">
          <p className="text-[0.98rem] leading-relaxed text-[var(--ink-soft)]">{body}</p>
        </div>
      </details>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-shadow duration-200 hover:shadow-[var(--shadow-md)]">
      {media}
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

/** SectionDivider — a subtle visual separator between major sections. */
export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <hr className={`border-[var(--border)] my-16 md:my-20 ${className}`} aria-hidden="true" />
  );
}

/** ContentBlock — a flexible content container with consistent spacing and alignment. */
export function ContentBlock({
  id,
  children,
  className = "",
  align = "center",
  maxWidth = "2xl",
  spacing = "normal", // "tight" | "normal" | "loose"
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
  maxWidth?: "xl" | "2xl" | "3xl" | "full";
  spacing?: "tight" | "normal" | "loose";
}) {
  const maxWidths = { xl: "max-w-xl", "2xl": "max-w-2xl", "3xl": "max-w-3xl", full: "max-w-full" };
  const spacings = { tight: "space-y-4", normal: "space-y-6", loose: "space-y-8" };
  const alignClasses = { left: "", center: "mx-auto text-center" };

  return (
    <div
      id={id}
      className={`container-page ${alignClasses[align]} ${maxWidths[maxWidth]} ${spacings[spacing]} ${className}`}
    >
      {children}
    </div>
  );
}

/** CardGrid — a responsive grid of feature cards with consistent styling. */
export function CardGrid({
  items,
  columns = 3,
  gap = "gap-6",
  className = "",
}: {
  items: ReactNode[];
  columns?: 2 | 3 | 4;
  gap?: string;
  className?: string;
}) {
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <ul className={`grid ${gap} ${cols} ${className}`} role="list">
      {items.map((item, index) => (
        <li key={index} className="group">{item}</li>
      ))}
    </ul>
  );
}

/** IconFeature — a compact icon + text feature for dense information areas. */
export function IconFeature({
  icon,
  title,
  description,
  tone = "forest",
  href,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  tone?: "earth" | "water" | "forest";
  href?: string;
}) {
  const toneGradient = bandTones[tone];

  const content = (
    <div className="flex flex-col h-full p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)]" style={{ background: toneGradient }} aria-hidden="true">
        {icon}
      </div>
      <h3 className="mt-4 text-lg leading-snug font-medium text-[var(--ink)]">{title}</h3>
      <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-[var(--muted)]">{description}</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group block h-full overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 hover:border-[var(--accent-300)]">
        {content}
      </Link>
    );
  }

  return (
    <div className="h-full overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] transition-shadow duration-200 hover:shadow-[var(--shadow-md)]">
      {content}
    </div>
  );
}

/** NumberedStep — a polished step in a process timeline. */
export function NumberedStep({
  number,
  title,
  description,
  imageUrl,
  imageAlt,
  isFirst = false,
  isLast = false,
}: {
  number: number;
  title: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  isFirst?: boolean;
  isLast?: boolean;
}) {
  return (
    <li className="relative flex gap-4" style={{ "--step-count": String(number) } as React.CSSProperties}>
      {!isFirst && (
        <div className="pointer-events-none absolute left-4 top-0 bottom-0 w-px bg-[var(--border)]" aria-hidden="true" />
      )}
      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-600)] font-[family-name:var(--font-text)] text-xs font-semibold text-white">
        {String(number).padStart(2, "0")}
      </span>
      <div className="min-w-0 flex-1 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6">
        {imageUrl && (
          <div className="-mx-6 -mt-6 mb-4 overflow-hidden rounded-t-[var(--radius-lg)]">
            <img src={imageUrl} alt={imageAlt ?? ""} className="h-48 w-full object-cover" loading="lazy" />
          </div>
        )}
        <h3 className="text-lg leading-snug font-medium text-[var(--ink)]">{title}</h3>
        {description && <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--muted)]">{description}</p>}
      </div>
    </li>
  );
}