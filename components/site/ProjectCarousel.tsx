"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import type { FeaturedProject } from "@/lib/content";

const tones = ["earth", "water", "forest"] as const;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/** ProjectCarousel — featured FOSCOD projects shown 3 cards per slide.
 *  Content comes from the `projects` CMS table (via getFeaturedProjects).
 *  Autoplays (paused on hover/focus, off for reduced-motion), with
 *  prev/next arrows and dot indicators. */
export function ProjectCarousel({
  projects,
  eyebrow = "Featured projects",
  title,
  intro,
  surface = false,
  interval = 7500,
}: {
  projects: FeaturedProject[];
  eyebrow?: string;
  title: string;
  intro?: string;
  surface?: boolean;
  interval?: number;
}) {
  const slides = chunk(projects, 3);
  const count = slides.length;
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
    <section className={`py-14 md:py-20 ${surface ? "bg-[var(--surface-2)]" : ""}`}>
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">{title}</h2>
            {intro && <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">{intro}</p>}
          </div>
          {count > 1 && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous projects"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-strong)] text-[var(--ink)] transition-colors hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-700)]"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                  <path d="M11 3L5 9l6 6" stroke="currentColor" strokeWidth="1.8" fill="none" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next projects"
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
          aria-label="Featured projects"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((group, gi) => (
              <ul
                key={gi}
                aria-hidden={gi !== index}
                className="grid w-full shrink-0 grid-cols-1 gap-6 md:grid-cols-3"
              >
                {group.map((p, i) => (
                  <li key={p.slug} className="group h-full">
                    <a href={p.href} className="block h-full focus-visible:outline-none">
                      <div className="flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-[var(--border-strong)] group-hover:shadow-[var(--shadow-md)]">
                        <PhotoSlot tone={tones[(gi * 3 + i) % 3]} ratio="4/3" tag={p.theme} caption={p.title} />
                        <div className="flex flex-1 flex-col p-6">
                          <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                            {p.location}
                          </p>
                          <h3 className="mt-1.5 text-lg leading-snug">{p.title}</h3>
                          <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-[var(--muted)]">{p.summary}</p>
                          <span className="mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-[var(--accent-700)]">
                            Learn more
                            <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {count > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to projects slide ${i + 1}`}
                aria-current={i === index}
                className={`h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-700)] ${
                  i === index ? "w-7 bg-[var(--accent-600)]" : "w-2.5 bg-[var(--border-strong)] hover:bg-[var(--muted)]"
                }`}
              />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Button href="/projects" variant="secondary" size="md">View all projects</Button>
        </div>
      </div>
    </section>
  );
}
