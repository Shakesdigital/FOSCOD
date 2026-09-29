import type { ReactNode } from "react";
import { PhotoSlot } from "@/components/ui/PhotoSlot";

export type StoryBlock = {
  type: "paragraph" | "heading" | "quote" | "image";
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
  caption?: string;
  attribution?: string;
  alignment?: "left" | "center" | "right";
};

/** RichStory — renders a Visual Editor-style story body.
 *  The story_body JSON field is an ordered array of typed blocks
 *  (paragraph, heading, quote, image) that allows editors to place
 *  images anywhere within the narrative — including left/right/center
 *  float alignment for blog-style layouts. */
export function RichStory({
  blocks,
  tone = "forest",
}: {
  blocks: StoryBlock[];
  tone?: "earth" | "water" | "forest";
}) {
  if (!blocks.length) {
    return (
      <p className="text-[var(--muted)]">
        Full story narrative coming soon. This impact story highlights real change in communities where FOSCOD works.
      </p>
    );
  }

  const textAlignClass = (a?: string) => {
    switch (a) {
      case "center": return "text-center";
      case "right": return "text-right";
      default: return "text-left";
    }
  };

  const imageAlignClass = (a?: string) => {
    switch (a) {
      case "right":
        return "ml-auto";
      case "center":
        return "mx-auto";
      default:
        return "mr-auto";
    }
  };

  const imageMaxWidth = (a?: string) => {
    // Full width on mobile; constrained width when floated left/right
    if (a === "center") return "w-full";
    return "w-full md:max-w-[60%]";
  };

  return (
    <div className="mx-auto max-w-[var(--measure-wide)] space-y-8">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h3 key={i} className={`text-2xl font-semibold text-[var(--ink)] ${textAlignClass(block.alignment)}`}>
                {block.content}
              </h3>
            );
          case "quote":
            return (
              <blockquote key={i} className={`border-l-4 border-[var(--accent-600)] pl-6 italic text-[var(--ink-soft)] ${textAlignClass(block.alignment)}`}>
                &ldquo;{block.content}&rdquo;
                {block.attribution && (
                  <cite className="mt-2 block font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.12em] text-[var(--muted)] not-italic">
                    — {block.attribution}
                  </cite>
                )}
              </blockquote>
            );
          case "image":
            return (
              <figure key={i} className={`${imageAlignClass(block.alignment)} ${imageMaxWidth(block.alignment)}`}>
                <PhotoSlot
                  tone={tone}
                  ratio="16/9"
                  imageUrl={block.imageUrl}
                  alt={block.imageAlt || block.caption || "Story image"}
                  caption={block.imageAlt || block.caption || "Story image"}
                  className="shadow-[var(--shadow-sm)]"
                />
                {block.caption && (
                  <figcaption className="mt-2 font-[family-name:var(--font-mono)] text-center text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          default:
            // paragraph
            return (
              <p key={i} className={`leading-relaxed text-[var(--ink-soft)] text-lg ${textAlignClass(block.alignment)}`}>
                {block.content}
              </p>
            );
        }
      })}
    </div>
  );
}
