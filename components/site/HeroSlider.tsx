"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { HeroSlide } from "@/lib/content";

const toneGradients: Record<string, string> = {
  earth: "linear-gradient(135deg, #7d3a23, #a8553a 55%, #c98a5f)",
  water: "linear-gradient(135deg, #123f3a, #1c6e66 55%, #5fa39a)",
  forest: "linear-gradient(135deg, #23381f, #2f5d3a 55%, #6f9c63)",
};

/** HeroSlider — the rotating hero at the top of each landing page.
 *  Full-bleed photo/duotone + dark overlay + centered copy and CTAs.
 *  Autoplays (paused on hover/focus and for reduced-motion users),
 *  with prev/next arrows, dot indicators, and keyboard support. */
export function HeroSlider({
  slides,
  interval = 6500,
}: {
  slides: HeroSlide[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const regionRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (next: number) => setIndex((i) => (next + count) % count),
    [count]
  );

  // Autoplay — disabled for a single slide or reduced-motion preference.
  useEffect(() => {
    if (count <= 1 || paused) return;
    if (typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearInterval(id);
  }, [count, paused, interval]);

  if (count === 0) return null;

  return (
    <section
      ref={regionRef}
      className="relative isolate overflow-hidden border-b border-[var(--border)]"
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
    >
      <div className="relative min-h-[440px] md:min-h-[560px]">
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {/* background */}
              <div
                className="absolute inset-0 -z-20"
                style={
                  slide.imageUrl
                    ? { backgroundImage: `url(${slide.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
                    : { backgroundImage: toneGradients[slide.tone] ?? toneGradients.forest }
                }
                aria-hidden
              />
              {/* legibility overlay */}
              <div
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(13,32,30,.45) 0%, rgba(13,32,30,.30) 40%, rgba(13,32,30,.62) 100%)",
                }}
                aria-hidden
              />

              <div className="container-page flex min-h-[440px] flex-col items-center justify-center py-20 text-center md:min-h-[560px] md:py-28">
                {slide.eyebrow && (
                  <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.18em] text-white/85">
                    {slide.eyebrow}
                  </span>
                )}
                <h1 className="mt-4 max-w-3xl text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.06] text-white [text-wrap:balance]">
                  {slide.title}
                </h1>
                {slide.intro && (
                  <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-white/85">
                    {slide.intro}
                  </p>
                )}
                {(slide.cta || slide.cta2 || slide.cta3) && (
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    {slide.cta && (
                      <Button href={slide.cta.href} variant="primary" size="lg" tabIndex={active ? 0 : -1}>
                        {slide.cta.label}
                      </Button>
                    )}
                    {slide.cta2 && (
                      <a
                        href={slide.cta2.href}
                        tabIndex={active ? 0 : -1}
                        className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-full)] border border-white/70 px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-white hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {slide.cta2.label}
                      </a>
                    )}
                    {slide.cta3 && (
                      <a
                        href={slide.cta3.href}
                        tabIndex={active ? 0 : -1}
                        className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-full)] border border-white/70 px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-white hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {slide.cta3.label}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* controls (only when more than one slide) */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-black/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:flex"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                <path d="M11 3L5 9l6 6" stroke="currentColor" strokeWidth="1.8" fill="none" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-black/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:flex"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                <path d="M7 3l6 6-6 6" stroke="currentColor" strokeWidth="1.8" fill="none" />
              </svg>
            </button>

            <div className="absolute inset-x-0 bottom-5 z-10 flex items-center justify-center gap-2.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    i === index ? "w-7 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* polite live region for screen readers */}
        <p className="sr-only" aria-live="polite">
          Slide {index + 1} of {count}
        </p>
      </div>
    </section>
  );
}
