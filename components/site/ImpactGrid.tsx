import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Button } from "@/components/ui/Button";
import type { ProjectImpactCard } from "@/lib/content";

const tones = ["forest", "water", "earth"] as const;

/** ImpactGrid — horizontally laid-out grid of impact cards.
 *  Up to 3 cards per row on desktop (collapses to single column on mobile).
 *  Each card has an image, title, excerpt, verified outcome badge, and a CTA button
 *  routing to a full impact story page. */

export function ImpactGrid({
  items,
  eyebrow = "Project impact",
  title,
  intro,
  surface = false,
}: {
  items: ProjectImpactCard[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  surface?: boolean;
}) {
  if (!items.length) return null;

  return (
    <section className={`py-16 md:py-24 ${surface ? "bg-[var(--surface-2)]" : ""}`}>
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          {title && <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">{title}</h2>}
          {intro && <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">{intro}</p>}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((card, i) => (
            <div
              key={card.title + i}
              className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)]"
            >
              <div className="relative">
                <PhotoSlot
                  tone={tones[i % 3]}
                  ratio="16/9"
                  imageUrl={card.imageUrl}
                  alt={card.imageAlt || card.title}
                  caption={card.imageAlt || card.title}
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                {card.verifiedOutcome && (
                  <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
                    ✓ {card.verifiedOutcome}
                  </p>
                )}
                <h3 className="mt-3 text-xl leading-snug">{card.title}</h3>
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
          ))}
        </div>
      </div>
    </section>
  );
}
