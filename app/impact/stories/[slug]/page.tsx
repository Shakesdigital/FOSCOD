import { HeroSlider } from "@/components/site/HeroSlider";
import { type HeroSlide } from "@/lib/content";
import { SplitSection, Prose, CTABand } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { pageMeta } from "@/lib/seo";
import { getImpactStories, getSubPrograms, getFeaturedProjects } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stories = await getImpactStories(10);
  const story = stories.find((s) => s.slug === slug);
  if (!story) return { title: "Story not found" };
  return pageMeta(story.title, story.quote || story.narrative?.slice(0, 150) || `Impact Story: ${story.title}`);
}

export default async function ImpactStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stories = await getImpactStories(20);
  const story = stories.find((s) => s.slug === slug);

  if (!story) notFound();

  // Find related sub-program and project
  const subPrograms = await getSubPrograms();
  const relatedProjects = (await getFeaturedProjects()).filter((p) =>
    ["biochar-uganda", "wash", "renewable-energy", "sustainable-livelihood-green-enterprises"].includes(p.slug)
  ).slice(0, 2);

  const dateStr = story.published_at
    ? new Date(story.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "";

  const heroSlides: HeroSlide[] = [{
    eyebrow: "Impact Story",
    title: story.title,
    intro: story.quote ? `&ldquo;${story.quote}&rdquo;` : story.narrative?.slice(0, 200) || "A community voice from FOSCOD's work in Uganda.",
    tone: "forest",
    imageUrl: story.hero_image_url,
  }];

  return (
    <>
      {/* HERO */}
      <HeroSlider slides={heroSlides} />

      {/* COMMUNITY VOICE + NARRATIVE */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-[var(--measure-wide)]">
            {/* Community voice — plain, de-styled quote (no blue/white box) */}
            {story.community_voice && (
              <div className="mb-8">
                {story.quote ? (
                  <blockquote className="text-center text-xl italic leading-relaxed text-[var(--ink-soft)]">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>
                ) : null}
                {story.community_voice && (
                  <p className="mt-4 text-center text-[var(--ink)]">&mdash; {story.community_voice}</p>
                )}
              </div>
            )}

            {/* Narrative text — images sink in within the paragraph flow */}
            <div className="mt-10 space-y-6 text-[1.15rem] leading-relaxed text-[var(--ink-soft)]">
              {story.narrative ? (
                story.narrative.split("\n\n").map((para, i) => <p key={i}>{para}</p>)
              ) : (
                <p>Full story narrative coming soon. This impact story highlights real change in communities where FOSCOD works.</p>
              )}
            </div>

            {/* Story image sinks in after the narrative */}
            <div className="mt-10">
              <PhotoSlot
                tone={story.linked_program === "GLE" ? "water" : "forest"}
                ratio="16/9"
                imageUrl={story.hero_image_url}
                caption={story.title}
                className="shadow-[var(--shadow-lg)] mx-auto"
              />
            </div>

            {/* Gallery — images sink in as thumbnails below the main image */}
            {story.gallery && story.gallery.length > 0 && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {story.gallery.slice(0, 4).map((img, i) => (
                  <PhotoSlot
                    key={i}
                    tone="earth"
                    ratio="4/3"
                    imageUrl={img.url}
                    caption={img.caption || img.alt || `${story.title} — photo ${i + 1}`}
                    className="shadow-[var(--shadow-sm)]"
                  />
                ))}
              </div>
            )}

            {story.verified_outcome && (
              <div className="mt-10">
                <blockquote className="text-center italic text-lg leading-relaxed text-[var(--ink-soft)]">
                  &ldquo;{story.verified_outcome}&rdquo;
                </blockquote>
              </div>
            )}
          </div>

          {/* Related links — sidebar on the right */}
          <div className="mt-12 space-y-6 lg:mt-0 lg:ml-10">
            <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="text-lg font-semibold">Related links</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {story.linked_program && (
                  <li>
                    <Link href={`/programs/${story.linked_program === "GLE" ? "global-learning-exchange" : "community-empowerment-development"}`} className="flex items-center gap-2 text-[var(--accent-700)] hover:underline">
                      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><path d="M12 3l-6 5 6 5" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
                      {story.linked_program} Program
                    </Link>
                  </li>
                )}
                {story.linked_sub_program_id && subPrograms.length > 0 && (
                  <li>
                    <Link href={`/programs/cedp/${subPrograms.find(s => s.id === story.linked_sub_program_id)?.slug}`} className="flex items-center gap-2 text-[var(--accent-700)] hover:underline">
                      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><path d="M12 3l-6 5 6 5" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
                      Sub-program
                    </Link>
                  </li>
                )}
                {relatedProjects.length > 0 && (
                  <li>
                    <Link href={relatedProjects[0].href} className="flex items-center gap-2 text-[var(--accent-700)] hover:underline">
                      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><path d="M12 3l-6 5 6 5" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
                      {relatedProjects[0].title}
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            {dateStr && (
              <p className="font-[family-name:var(--font-text)] text-[0.7rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                Published {dateStr}
              </p>
            )}
          </div>
        </div>
      </section>

      <CTABand
        title="Read more stories of change"
        body="Explore our full collection of impact stories, videos, and community experiences."
        actions={[
          { href: "/impact/stories", label: "See all impacts" },
          { href: "/impact/stories", label: "Impact story archive", variant: "secondary" },
          { href: "/stories", label: "Read blog stories", variant: "ghost" },
        ]}
        tightBottom
      />
    </>
  );
}