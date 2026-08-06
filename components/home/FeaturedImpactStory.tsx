import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Button } from "@/components/ui/Button";
import type { ImpactStory } from "@/lib/content";

/** FeaturedImpactStory — full-width story with community voice and photo.
 *  Used on Home page and Impact page. */
export function FeaturedImpactStory({
  story,
  eyebrow = "Featured impact story",
}: {
  story: ImpactStory | null;
  eyebrow?: string;
}) {
  if (!story) return null;

  const dateStr = story.published_at
    ? new Date(story.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <Eyebrow>{eyebrow}</Eyebrow>
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h2 className="text-[clamp(1.8rem,3.2vw,2.5rem)] leading-snug">{story.title}</h2>
            {dateStr && (
              <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                Published {dateStr}
              </p>
            )}

            {story.quote && (
              <blockquote className="mt-6 border-l-4 border-[var(--accent-600)] pl-6 italic text-lg leading-relaxed text-[var(--ink-soft)]">
                &ldquo;{story.quote}&rdquo;
              </blockquote>
            )}

            {story.community_voice && (
              <p className="mt-4 font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.12em] text-[var(--accent-700)]">
                — {story.community_voice}
              </p>
            )}

            {story.verified_outcome && (
              <p className="mt-6 font-medium text-[var(--ink)]">
                <span className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.12em] text-[var(--forest-700)]">Verified outcome: </span>
                {story.verified_outcome}
              </p>
            )}

            {story.narrative && (
              <div className="mt-6 max-w-[var(--measure)] space-y-4 text-[1.05rem] leading-relaxed text-[var(--ink-soft)]">
                {story.narrative.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}

            <div className="mt-8">
              <Button href={`/impact/stories/${story.slug}`} variant="secondary" size="md">
                Read full story →
              </Button>
            </div>
          </div>

          <div className="relative">
            <PhotoSlot
              tone={story.linked_program === "GLE" ? "water" : "forest"}
              ratio="3/4"
              imageUrl={story.hero_image_url}
              caption={story.title}
              className="shadow-[var(--shadow-lg)]"
            />
            {story.gallery && story.gallery.length > 0 && (
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {story.gallery.slice(0, 2).map((img, i) => (
                  <PhotoSlot
                    key={i}
                    tone="earth"
                    ratio="4/3"
                    imageUrl={img.url}
                    caption={img.caption ?? story.title}
                    className="shadow-[var(--shadow-sm)]"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}