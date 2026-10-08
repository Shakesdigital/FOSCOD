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
    // Full width on mobile; sink-in (constrained width) when floated left/right
    if (a === "center") return "w-full";
    if (a === "left" || a === "right") return "md:w-[45%]";
    return "w-full";
  };

  return (
    <div className="mx-auto max-w-none space-y-6">
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
              <blockquote key={i} className={`rounded-[var(--radius-md)] bg-[var(--surface-2)] px-4 py-3 italic text-[var(--ink-soft)] ${textAlignClass(block.alignment)}`}>
                &ldquo;{block.content}&rdquo;
                {block.attribution && (
                  <cite className="mt-2 block font-[family-name:var(--font-text)] text-xs uppercase tracking-[0.12em] text-[var(--muted)] not-italic">
                    — {block.attribution}
                  </cite>
                )}
              </blockquote>
            );
          case "image":
            return (
              <figure key={i} className={`mt-4 ${imageAlignClass(block.alignment)} ${imageMaxWidth(block.alignment)}`}>
                <PhotoSlot
                  tone={tone}
                  ratio="4/3"
                  imageUrl={block.imageUrl}
                  alt={block.imageAlt || block.caption || "Story image"}
                  caption={block.imageAlt || block.caption || "Story image"}
                  className="shadow-[var(--shadow-sm)]"
                />
                {block.caption && (
                  <figcaption className="mt-2 font-[family-name:var(--font-text)] text-center text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          default:
            // paragraph — wrapped in a container that allows floated images to sink in
            return (
              <div key={i} className={`relative ${imageAlignClass(block.alignment)} ${imageMaxWidth(block.alignment)}`}>
                <p className={`leading-relaxed text-[var(--ink-soft)] text-lg ${textAlignClass(block.alignment)}`}>
                  {block.content}
                </p>
              </div>
            );
        }
      })}
    </div>
  );
}
