import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { CommunityIcon, resolveCommunityIcon } from "@/components/ui/CommunityIcon";

/**
 * ContentCard — a single, unified card component for every card-like surface
 * across the site.  Replaces the five inconsistent card patterns that grew
 * ad-hoc (FeatureGrid img with fixed h-32, CardGrid inline markup,
 * HowYouCanGetInvolved custom card, Pathways text-only, CEDP area cards in-page).
 *
 * Handles: featured image (PhotoSlot for duotone fallback or real URL),
 * optional icon fallback, kicker / tag labels, title, excerpt, and a CTA
 * button that sticks to the bottom via flex-1 distribution.
 */
export type ContentCardTone = "earth" | "water" | "forest";

export interface ContentCardProps {
  /** Card title — always rendered. */
  title: string;
  /** Short description / body — rendered with flex-1 so the CTA sits at the bottom. */
  excerpt?: string;
  /** Link target — when omitted the card is non-interactive. */
  href?: string;
  /** CTA button label (default "Read more"). */
  ctaLabel?: string;
  /** Optional sub-label above the title. */
  kicker?: string;
  /** Optional badge over the image. */
  tag?: string;
  /** Tone for PhotoSlot duotone fallback. */
  tone?: ContentCardTone;
  /** Featured image URL. */
  imageUrl?: string | null;
  /** Alt text for the featured image. */
  imageAlt?: string | null;
  /** Icon name (emoji or CommunityIconName) — used only when imageUrl is absent. */
  icon?: string;
  /** Image aspect ratio. */
  imageRatio?: string;
  /** Mark the media as a video — renders a play affordance. */
  video?: boolean;
  /** When true the card is a plain link (no wrapper). */
  asLink?: boolean;
  /** Extra classes for the card root. */
  className?: string;
  /** Optional meta string rendered below the excerpt (e.g. date). */
  meta?: string;
  /** Render custom content below the excerpt instead of a plain string. */
  children?: ReactNode;
}

export function ContentCard({
  title,
  excerpt,
  href,
  ctaLabel = "Read more",
  kicker,
  tag,
  tone = "forest",
  imageUrl,
  imageAlt,
  icon,
  imageRatio = "16/9",
  video = false,
  asLink = false,
  className = "",
  meta,
  children,
}: ContentCardProps) {
  const showMedia = imageUrl || icon;
  const tones = ["forest", "water", "earth"] as const;
  const fallbackTone = tones[Math.abs(title.length) % 3];
  const resolvedTone = tone ?? fallbackTone;

  const mediaEl = (
    <>
      {imageUrl ? (
        <PhotoSlot
          tone={resolvedTone}
          ratio={imageRatio}
          imageUrl={imageUrl}
          alt={imageAlt || title}
          caption={title}
          tag={tag}
          className="rounded-none border-0 border-b border-[var(--border)]"
        />
      ) : (
        <div className="flex h-40 w-full items-center justify-center border-b border-[var(--border)]">
          <CommunityIcon
            name={resolveCommunityIcon(icon) ?? "volunteer"}
            className="h-12 w-12 text-[var(--accent-600)]"
          />
        </div>
      )}
      {video && (
        <span
          className="absolute inset-0 z-20 flex items-center justify-center"
          aria-hidden
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[var(--accent-700)] shadow-[var(--shadow-md)] transition-transform group-hover:scale-105">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 4l10 6-10 6V4z" />
            </svg>
          </span>
        </span>
      )}
    </>
  );

  const contentEl = (
    <div className="flex flex-1 flex-col p-6">
      {kicker && (
        <p className="font-[family-name:var(--font-text)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
          {kicker}
        </p>
      )}
      <h3 className="mt-2 text-lg leading-snug">{title}</h3>
      {excerpt && (
        <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-[var(--muted)]">
          {excerpt}
        </p>
      )}
      {meta && (
        <p className="mt-2 font-[family-name:var(--font-text)] text-[0.7rem] uppercase tracking-[0.1em] text-[var(--muted)]">
          {meta}
        </p>
      )}
      {children && <div className="mt-2">{children}</div>}
      {href && (
        <Button
          href={href}
          variant="secondary"
          size="sm"
          className="mt-4 self-start"
        >
          {ctaLabel}
        </Button>
      )}
    </div>
  );

  const cardClasses =
    "group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)]";

  if (asLink && href) {
    return (
      <Link href={href} className={`${cardClasses} ${className}`}>
        {showMedia && mediaEl}
        {contentEl}
      </Link>
    );
  }

  return (
    <div className={`${cardClasses} ${className}`}>
      {showMedia && (
        <div className="relative">
          {mediaEl}
        </div>
      )}
      {contentEl}
    </div>
  );
}
