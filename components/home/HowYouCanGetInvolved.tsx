import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Button } from "@/components/ui/Button";
import { CommunityIcon, resolveCommunityIcon } from "@/components/ui/CommunityIcon";
import type { InvolvementCard } from "@/lib/content";

const tones = ["earth", "water", "forest"] as const;

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
            <div
              key={card.title}
              className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)]"
            >
              {card.imageUrl ? (
                <PhotoSlot
                  tone={tones[i % 3]}
                  ratio="16/9"
                  imageUrl={card.imageUrl}
                  caption={card.imageAlt || card.title}
                  className="rounded-none border-0 border-b border-[var(--border)]"
                />
              ) : (
                <div className="flex h-36 w-full items-center justify-center border-b border-[var(--border)]">
                  <CommunityIcon
                    name={resolveCommunityIcon(card.icon) ?? "volunteer"}
                    className="h-12 w-12 text-[var(--accent-600)]"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-[var(--ink)]">{card.title}</h3>
                <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-[var(--muted)]">
                  {card.body}
                </p>
                        <Button
                  href={card.href}
                  variant="secondary"
                  size="sm"
                  className="mt-4 self-start"
                >
                  {card.ctaLabel}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

