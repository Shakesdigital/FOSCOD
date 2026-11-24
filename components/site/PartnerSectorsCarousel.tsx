import Link from "next/link";
import { CommunityIcon, resolveCommunityIcon, type CommunityIconName } from "@/components/ui/CommunityIcon";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { resolveOpportunityCtaHref } from "@/lib/opportunity-cta";

export type PartnerSector = {
  title: string;
  brief: string;
  icon: CommunityIconName;
  imageUrl?: string;
  imageAlt?: string;
};

/** PartnerSectorsCarousel — a horizontally looping strip of local partner
 *  development sectors. Each card uses an image, with an icon fallback only
 *  while the CMS image is unavailable. The track is duplicated for a seamless
 *  loop, pauses on hover/focus, and falls back to horizontal scrolling for
 *  reduced motion. */
export function PartnerSectorsCarousel({
  items,
  href,
  tone = "water",
}: {
  items: PartnerSector[];
  href: string;
  tone?: "earth" | "water" | "forest";
}) {
  // "Explore opportunities" cards always resolve to the opportunities directory.
  const resolvedHref = resolveOpportunityCtaHref(href, "Explore opportunities") ?? href;
  return (
    <div
      className="gle-marquee relative mt-8 overflow-hidden"
      role="region"
      aria-label="Local partner organization development sectors"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[var(--surface-2)] to-transparent sm:w-20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[var(--surface-2)] to-transparent sm:w-20"
        aria-hidden
      />

      <div className="gle-marquee-track flex w-max">
        {[0, 1].map((group) => (
          <ul
            key={group}
            className="flex shrink-0 gap-5 pr-5"
            role="list"
            aria-hidden={group === 1 || undefined}
          >
            {items.map((item) => (
              <li key={`${item.title}-${group}`} className="w-[15rem] shrink-0 sm:w-[17rem]">
                <Link
                  href={resolvedHref}
                  tabIndex={group === 1 ? -1 : undefined}
                  className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-300)] hover:shadow-[var(--shadow-md)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-600)]"
                >
                  <div className="relative">
                    <PhotoSlot
                      caption={item.imageAlt ?? item.title}
                      tone={tone}
                      ratio="16/9"
                      imageUrl={item.imageUrl}
                      alt={item.imageAlt ?? item.title}
                      bare
                    />
                    {!item.imageUrl && (
                      <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-[var(--radius-lg)] bg-black/30 text-white backdrop-blur-sm">
                        <CommunityIcon
                          name={resolveCommunityIcon(item.icon) ?? "partner"}
                          className="h-5 w-5"
                        />
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-[1rem] leading-snug font-medium text-[var(--ink)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[0.86rem] leading-relaxed text-[var(--muted)]">
                      {item.brief}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-[var(--accent-700)]">
                      Explore opportunities
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}