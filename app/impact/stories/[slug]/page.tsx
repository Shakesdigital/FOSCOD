import { PageHero } from "@/components/site/PageHero";
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

  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow="Impact Story"
        title={story.title}
        intro={story.quote ? `&ldquo;${story.quote}&rdquo;` : story.narrative?.slice(0, 200) || "A community voice from FOSCOD's work in Uganda."}
        imageUrl={story.hero_image_url}
      />

      {/* COMMUNITY VOICE + NARRATIVE */}
      <section className="py-16 md:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            {story.community_voice && (
              <div className="mb-8 p-6 rounded-[var(--radius-lg)] border border-[var(--accent-200)] bg-[var(--accent-50)]">
                <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.12em] text-[var(--accent-700)]">Community voice</p>
                <p className="mt-2 font-semibold text-[var(--ink)]">{story.community_voice}</p>
                {story.quote && (
                  <blockquote className="mt-4 border-l-4 border-[var(--accent-600)] pl-6 italic text-lg leading-relaxed text-[var(--ink-soft)]">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>
                )}
              </div>
            )}

            <div className="max-w-[var(--measure)] space-y-6 text-[1.05rem] leading-relaxed text-[var(--ink-soft)]">
              {story.narrative ? (
                story.narrative.split("\n\n").map((para, i) => <p key={i}>{para}</p>)
              ) : (
                <p>Full story narrative coming soon. This impact story highlights real change in communities where FOSCOD works.</p>
              )}
            </div>

            {story.verified_outcome && (
              <div className="mt-10 p-6 rounded-[var(--radius-lg)] border border-[var(--forest-200)] bg-[var(--forest-50)]">
                <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.12em] text-[var(--forest-700)]">Verified outcome</p>
                <p className="mt-2 font-medium text-[var(--ink)]">{story.verified_outcome}</p>
              </div>
            )}
          </div>

          {/* SIDEBAR: PHOTO + RELATED LINKS */}
          <div className="space-y-6">
            <PhotoSlot
              tone={story.linked_program === "GLE" ? "water" : "forest"}
              ratio="3/4"
              imageUrl={story.hero_image_url}
              caption={story.title}
              className="shadow-[var(--shadow-lg)]"
            />

            {story.gallery && story.gallery.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
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
              <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                Published {dateStr}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* BREADCRUMB */}
      <section className="py-12">
        <div className="container-page">
          <nav className="flex items-center gap-2 text-sm text-[var(--muted)]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--ink)]">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/impact" className="hover:text-[var(--ink)]">Impact</Link>
            <span aria-hidden>/</span>
            <Link href="/impact/stories" className="hover:text-[var(--ink)]">Stories</Link>
            <span aria-hidden>/</span>
            <span className="text-[var(--ink)]" aria-current="page">{story.title}</span>
          </nav>
        </div>
      </section>

      <CTABand
        title="Read more stories of change"
        body="Explore our full collection of impact stories, videos, and community experiences."
        actions={[
          { href: "/impact", label: "View all impact" },
          { href: "/stories", label: "Read blog stories", variant: "secondary" },
          { href: "/donate", label: "Support this work", variant: "ghost" },
        ]}
      />
    </>
  );
}