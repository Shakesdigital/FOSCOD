import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContentCard } from "@/components/ui/ContentCard";
import type { InvolvementCard } from "@/lib/content";

/** HowYouCanGetInvolved — three pathway cards after the homepage programs section.
 *  Replaces the former Featured Projects carousel.
 *  Cards match the ProjectCarousel card design: border, rounded, hover lift, PhotoSlot. */
export function HowYouCanGetInvolved({
  cards,
  eyebrow = "How you can get involved",
  title = "Your pathway into the work",
  intro,
  surface = false,
}: {
  cards: InvolvementCard[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  surface?: boolean;
}) {
  return (
    <section className={`py-14 md:py-20 ${surface ? "bg-[var(--surface-2)]" : ""}`}>
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">{title}</h2>
          {intro && <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">{intro}</p>}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <div key={card.title} className="group h-full">
              <ContentCard
                title={card.title}
                excerpt={card.body}
                href={card.href}
                ctaLabel={card.ctaLabel}
                imageRatio="16/9"
                tone={card.tone ?? (["earth", "water", "forest"] as const)[i % 3]}
                imageUrl={card.imageUrl}
                imageAlt={card.imageAlt}
                icon={card.icon}
                asLink={Boolean(card.href)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}