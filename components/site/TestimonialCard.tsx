"use client";

import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useState, useEffect, useRef, useCallback } from "react";

/** TestimonialCard — a single testimonial with profile photo, quote, and attribution.
 *  Tone-based accent; profile image center-aligned in carousel context. */
export function TestimonialCard({
  quote,
  name,
  role,
  photoUrl,
  photoAlt,
  tone = "forest",
  centerImage = false,
}: {
  quote: string;
  name: string;
  role?: string;
  photoUrl?: string;
  photoAlt?: string;
  tone?: "earth" | "water" | "forest";
  centerImage?: boolean;
}) {
  return (
    <div
      className="flex flex-col gap-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-8 text-center"
    >
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={photoAlt || name}
          className={`h-16 w-16 rounded-full object-cover object-center ${centerImage ? "mx-auto" : ""}`}
          loading="lazy"
          width={64}
          height={64}
        />
      ) : (
        <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--accent-100)] text-[var(--accent-700)] font-medium ${centerImage ? "mx-auto" : ""}`}>
          {name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>
      )}
      <blockquote className="text-xl italic leading-relaxed text-[var(--ink-soft)]">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-auto">
        <span className="block font-medium text-[var(--ink)]">{name}</span>
        {role && <span className="block font-[family-name:var(--font-text)] text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{role}</span>}
      </figcaption>
    </div>
  );
}

/** TestimonialCarousel — a clean slider showing one testimonial at a time.
 *  Auto-plays with pause-on-hover, includes dot indicators and prev/next arrows.
 *  Center-aligned profile image with tone-based accent. Optional CTA button below. */
export function TestimonialCarousel({
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
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const count = items.length;

  const go = useCallback(
    (next: number) => setIndex((i) => (next + count) % count),
    [count]
  );

  // Auto-play (pauses on hover)
  useEffect(() => {
    if (count <= 1 || paused) return;
    if (typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 6500);
    return () => window.clearInterval(id);
  }, [count, paused]);

  if (count === 0) return null;

  return (
    <div className={`py-14 md:py-20 ${surface ? "bg-[var(--surface-2)]" : ""}`}>
      <div className="container-page">
        {/* Section header — centered, no repetition on the left */}
        {(eyebrow || title) && (
          <div className="mx-auto max-w-2xl text-center">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">{title}</h2>}
            {intro && <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">{intro}</p>}
          </div>
        )}

        {/* Carousel */}
        <div
          ref={regionRef}
          className="relative mt-10"
          role="region"
          aria-roledescription="carousel"
          aria-label="Community testimonials carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") go(index - 1);
            if (e.key === "ArrowRight") go(index + 1);
          }}
        >
          <div className="overflow-hidden">
            <div
              className="transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {items.map((t, i) => (
                <div key={i} className="w-full">
                  {index === i && (
                    <TestimonialCard
                      quote={t.quote}
                      name={t.name}
                      role={t.role}
                      photoUrl={t.photoUrl}
                      photoAlt={t.photoAlt}
                      tone={t.tone ?? "forest"}
                      centerImage
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Prev/next arrows (only when more than one slide) */}
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous testimonial"
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--border)] bg-[var(--surface)] p-2.5 text-[var(--ink)] hover:bg-[var(--accent-50)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-600)]"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                  <path d="M11 3L5 9l6 6" stroke="currentColor" strokeWidth="1.8" fill="none" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next testimonial"
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--border)] bg-[var(--surface)] p-2.5 text-[var(--ink)] hover:bg-[var(--accent-50)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-600)]"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                  <path d="M7 3l6 6-6 6" stroke="currentColor" strokeWidth="1.8" fill="none" />
                </svg>
              </button>
            </>
          )}

          {/* Dot indicators */}
          {count > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-600)] ${
                    i === index ? "w-7 bg-[var(--accent-600)]" : "w-2.5 bg-[var(--muted)] hover:bg-[var(--ink-soft)]"
                  }`}
                />
              ))}
            </div>
          )}

          {/* CTA button below the carousel */}
          {cta && (
            <div className="mt-8 text-center">
              <a
                href={cta.href}
                className="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-[var(--accent-700)] transition-colors hover:underline"
              >
                {cta.label} →
              </a>
            </div>
          )}

          {/* Polite live region */}
          <p className="sr-only" aria-live="polite">
            Testimonial {index + 1} of {count}
          </p>
        </div>
      </div>
    </div>
  );
}

/** TestimonialGrid — kept for backward compatibility (e.g. general impact page explore section).
 *  Renders a simple 2-column grid of testimonials without the carousel. */
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
          <div className="max-w-2xl text-center">
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
              tone={t.tone ?? "forest"}
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
