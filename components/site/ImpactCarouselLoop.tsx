"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import type { ProjectImpactCard } from "@/lib/content";

const tones = ["forest", "water", "earth"] as const;

/** ImpactCarouselLoop — looping infinite carousel of impact cards.
 *  Each card has an image, title, excerpt, verified outcome, and a CTA button
 *  routing to a full impact story page. Autoplays, paused on hover/focus,
 *  with prev/next arrows and dot indicators. */

export function ImpactCarouselLoop({
  items,
  eyebrow = "Project impact",
  title,
  intro,
  surface = false,
  interval = 7500,
}: {
  items: ProjectImpactCard[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  surface?: boolean;
  interval?: number;
}) {
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((n: number) => setIndex((i) => (n + count) % count), [count]);

  useEffect(() => {
    if (count <= 1 || paused) return;
    if (typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearInterval(id);
  }, [count, paused, interval]);

  if (count === 0) return null;

  return (
    <section className={`py-16 md:py-24 ${surface ? "bg-[var(--surface-2)]" : ""}`}>
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl text-center">
            <Eyebrow>{eyebrow}</Eyebrow>
            {title && <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">{title}</h2>}
            {intro && <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">{intro}</p>}
          </div>
          {count > 1 && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous impact story"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-strong)] text-[var(--ink)] transition-colors hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-700)]"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                  <path d="M11 3L5 9l6 6" stroke="currentColor" strokeWidth="1.8" fill="none" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next impact story"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-strong)] text-[var(--ink)] transition-colors hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-700)]"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                  <path d="M7 3l6 6-6 6" stroke="currentColor" strokeWidth="1.8" fill="none" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div
          className="relative mt-10 overflow-hidden"
          aria-roledescription="carousel"
          aria-label="Project impact stories"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {items.map((card, i) => (
              <div
                key={card.title + i}
                className="w-full shrink-0"
                aria-hidden={i !== index}
              >
                <div className="mx-auto max-w-2xl">
                  <div className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-all duration-200">
                    <div className="relative">
                      <PhotoSlot
                        tone={tones[i % 3]}
                        ratio="16/9"
                        caption={card.title}
                        imageUrl={card.imageUrl}
                        alt={card.imageAlt || card.title}
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      {card.verifiedOutcome && (
                        <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
                          ✓ {card.verifiedOutcome}
                        </p>
                      )}
                      <h3 className="mt-3 text-2xl leading-snug">{card.title}</h3>
                      {card.excerpt && (
                        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">
                          {card.excerpt}
                        </p>
                      )}
                      {card.href && (
                        <Button
                          href={card.href}
                          variant="secondary"
                          size="sm"
                          className="mt-5 self-start"
                        >
                          {card.ctaLabel || "Read the impact story"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {count > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to impact story ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-700)] ${
                    i === index ? "w-7 bg-[var(--accent-600)]" : "w-2.5 bg-[var(--border-strong)] hover:bg-[var(--muted)]"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
