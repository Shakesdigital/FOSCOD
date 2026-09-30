import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import type { ProjectActivity } from "@/lib/content";

/** ActivityList — vertically stacked activities with alternating image sides.
 *  Image is on the right for the first item, left for the second, and so on.
 *  Falls back to PhotoSlot placeholders when no image URL is provided. */
export function ActivityList({
  items,
  eyebrow = "Activities",
  title,
  intro,
  tone = "forest",
}: {
  items: ProjectActivity[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  tone?: "earth" | "water" | "forest";
}) {
  if (!items.length) return null;

  const tones = ["forest", "water", "earth"] as const;

  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        {(eyebrow || title || intro) && (
          <div className="mx-auto max-w-2xl text-center">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">{title}</h2>}
            {intro && <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">{intro}</p>}
          </div>
        )}

        <div className="mt-14 space-y-12">
          {items.map((activity, i) => {
            const imageOnRight = i % 2 === 0;
            return (
              <div
                key={activity.title + i}
                className="grid items-center gap-10 md:grid-cols-2"
              >
                <div className={imageOnRight ? "md:order-1" : "md:order-2"}>
                  <PhotoSlot
                    tone={tones[i % 3]}
                    ratio="4/3"
                    imageUrl={activity.imageUrl}
                    alt={activity.imageAlt || activity.title}
                    caption={activity.imageAlt || activity.title}
                    className="shadow-[var(--shadow-md)]"
                  />
                </div>
                <div className={imageOnRight ? "md:order-2" : "md:order-1"}>
                  <h3 className="text-[clamp(1.3rem,2.2vw,1.7rem)] leading-snug">{activity.title}</h3>
                  {activity.description && (
                    <div
                      className="mt-4 max-w-[var(--measure)] space-y-3 leading-relaxed text-[var(--ink-soft)]"
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{ __html: activity.description.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>") }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
