import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * OpportunityHero — the landing hero for the opportunities directory.
 *
 * A split, editorial hero (distinct from the rotating HeroSlider used on other
 * landing pages): a deep-teal panel with the eyebrow, headline, intro and
 * primary CTAs on the left, and a layered field-photo collage on the right.
 * Falls back to designed duotone blocks when no CMS imagery is present.
 */
export function OpportunityHero({
  eyebrow = "Global Learning Exchange Program",
  title = "Find your opportunity",
  intro = "One directory for internships, volunteering, group placements, service-learning trips and study tours — hosted by FOSCOD's community program (CEDP) and local partner organizations across Uganda.",
  primaryCta = { href: "/apply", label: "Express interest" },
  secondaryCta = { href: "#opportunities", label: "Browse opportunities" },
  imageUrl,
  imageAlt,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  imageUrl?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--accent-700)] text-white">
      {/* ambient gradient wash */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 85% 0%, rgba(95,163,154,.55), transparent 55%), radial-gradient(90% 80% at 0% 100%, rgba(217,154,36,.18), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="container-page grid items-center gap-10 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24">
        {/* copy */}
        <div>
          <span className="inline-flex items-center gap-2 font-[family-name:var(--font-text)] text-[0.7rem] uppercase tracking-[0.18em] text-white/80">
            <span className="h-px w-6 bg-white/60" aria-hidden />
            {eyebrow}
          </span>
          <h1 className="mt-4 max-w-xl text-[clamp(2.1rem,5vw,3.6rem)] font-medium leading-[1.05] text-white [text-wrap:balance]">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-white/85">{intro}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={primaryCta.href} variant="on-dark" size="lg">
              {primaryCta.label}
            </Button>
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-full)] border border-white/70 px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-white hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {secondaryCta.label}
            </Link>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/15 pt-6">
            {[
              { k: "5", v: "Program types" },
              { k: "13", v: "Thematic areas" },
              { k: "1", v: "Directory" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="text-[1.6rem] font-medium leading-none text-white">{s.k}</dt>
                <dd className="mt-1.5 font-[family-name:var(--font-text)] text-[0.68rem] uppercase tracking-[0.12em] text-white/70">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* image collage */}
        <div className="relative hidden md:block" aria-hidden={!imageUrl}>
          <div className="relative ml-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[var(--radius-xl)] border border-white/15 shadow-[var(--shadow-lg)]">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt={imageAlt ?? ""} className="h-full w-full object-cover" loading="eager" />
            ) : (
              <div
                className="h-full w-full"
                style={{ background: "linear-gradient(135deg, #123f3a, #1c6e66 55%, #5fa39a)" }}
              />
            )}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(13,32,30,0) 45%, rgba(13,32,30,.55) 100%)" }}
            />
          </div>

          {/* floating accent card */}
          <div className="absolute -bottom-6 -left-2 w-56 rounded-[var(--radius-lg)] border border-white/15 bg-[var(--surface)] p-4 text-[var(--ink)] shadow-[var(--shadow-lg)]">
            <p className="font-[family-name:var(--font-text)] text-[0.6rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
              Community-led
            </p>
            <p className="mt-1.5 text-[0.9rem] leading-snug text-[var(--ink-soft)]">
              Every listing names its host, purpose, learning goals and supervision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}