"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { VideoPlayer } from "@/components/site/VideoPlayer";

const tones = ["forest", "water", "earth"] as const;

/** GleAlumniExperiences — a split alumni section: a single fading testimonial
 *  slider on the left and an alumni video on the right, with a full-stories
 *  link below. The track auto-advances, pauses on hover/focus, and respects
 *  reduced-motion preferences. */
export function GleAlumniExperiences({
  eyebrow,
  title,
  intro,
  items,
  cta,
  video,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  items: { quote: string; name: string; program?: string; cohort?: string; photoUrl?: string }[];
  cta?: { href: string; label: string };
  video?: { url: string; title: string; caption?: string; thumbnailUrl?: string };
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  useEffect(() => {
    if (count <= 1 || paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => window.clearInterval(id);
  }, [count, paused]);

  if (!count) return null;

  return (
    <section className="bg-[var(--surface-2)] py-10 md:py-14" aria-label="Alumni experiences">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {title && <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.3rem)]">{title}</h2>}
          {intro && <p className="mt-3 text-lg leading-relaxed text-[var(--ink-soft)]">{intro}</p>}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Fading testimonial slider */}
          <div
            className="flex flex-col"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div
              className="grid flex-1"
              role="region"
              aria-roledescription="carousel"
              aria-label="Alumni testimonial carousel"
            >
              {items.map((item, i) => (
                <div
                  key={`${item.name}-${i}`}
                  className={`col-start-1 row-start-1 transition-opacity duration-700 ${
                    i === index ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                  aria-hidden={i !== index}
                >
                  <div className="h-full [&>div]:h-full">
                    <TestimonialCard
                      quote={item.quote}
                      name={item.name}
                      role={[item.program, item.cohort].filter(Boolean).join(" · ")}
                      photoUrl={item.photoUrl}
                      tone={tones[i % tones.length]}
                      centerImage
                    />
                  </div>
                </div>
              ))}
            </div>

            {count > 1 && (
              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIndex((i) => (i - 1 + count) % count)}
                    aria-label="Previous alumni testimonial"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] transition-colors hover:bg-[var(--accent-50)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-600)]"
                  >
                    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden>
                      <path d="M11 3L5 9l6 6" stroke="currentColor" strokeWidth="1.8" fill="none" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIndex((i) => (i + 1) % count)}
                    aria-label="Next alumni testimonial"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] transition-colors hover:bg-[var(--accent-50)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-600)]"
                  >
                    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden>
                      <path d="M7 3l6 6-6 6" stroke="currentColor" strokeWidth="1.8" fill="none" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Go to alumni testimonial ${i + 1}`}
                      aria-current={i === index}
                      className={`h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-600)] ${
                        i === index
                          ? "w-6 bg-[var(--accent-600)]"
                          : "w-2 bg-[var(--border-strong)] hover:bg-[var(--muted)]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <p className="sr-only" aria-live="polite">
              Testimonial {index + 1} of {count}
            </p>
          </div>

          {/* Alumni video */}
          <div className="flex flex-col">
            <VideoPlayer
              videoUrl={video?.url}
              thumbnailUrl={video?.thumbnailUrl}
              thumbnailAlt={video?.title ?? "FOSCOD alumni testimonial video"}
              title={video?.title}
              caption={video?.caption}
            />
          </div>
        </div>

        {cta && (
          <div className="mt-8 text-center">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-[var(--accent-700)] transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-700)]"
            >
              {cta.label} →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
