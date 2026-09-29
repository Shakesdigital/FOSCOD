import { HeroSlider } from "@/components/site/HeroSlider";
import { CTABand } from "@/components/site/blocks";
import { SectionHeader } from "@/components/site/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { StatGrid } from "@/components/site/StatGrid";
import { VideoPlayer } from "@/components/site/VideoPlayer";
import { TestimonialCarousel } from "@/components/site/TestimonialCard";
import { RichStory } from "@/components/site/RichStory";
import { pageMeta } from "@/lib/seo";
import { getImpactStoryDetail, getAllImpactStoryDetailSlugs, getImpactStories } from "@/lib/content";
import type { HeroSlide } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllImpactStoryDetailSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = await getImpactStoryDetail(slug);
  if (!detail) return { title: "Story not found" };
  return pageMeta(
    detail.metaTitle || detail.title,
    detail.metaDescription || `Full impact story: ${detail.title} — verified community-led change from FOSCOD's CEDP work in Uganda.`
  );
}

export default async function ImpactStoryFullPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = await getImpactStoryDetail(slug);
  if (!detail) notFound();

  // Fetch supplementary data for "read more" sections
  const allStories = await getImpactStories(12);

  // Build hero slide from the detail's hero fields
  const heroSlides: HeroSlide[] = [
    {
      eyebrow: detail.eyebrow || "Impact story",
      title: detail.title,
      intro: detail.heroIntro,
      tone: detail.tone,
      imageUrl: detail.heroImageUrl,
      cta: detail.heroCta,
    },
  ];

  // Related stories (excluding current)
  const relatedStories = allStories
    .filter((s) => s.slug !== slug && s.slug !== detail.slug)
    .slice(0, 3);

  return (
    <>
      {/* 1. HERO */}
      <HeroSlider slides={heroSlides} />

      <article className="pb-12 md:pb-16">
        {/* 2. Title & Full Story (Visual Editor content) — wider measure */}
        <section className="py-14 md:py-20">
          <div className="container-page">
            {/* Story header — title and community voice */}
            <div className="mx-auto max-w-[var(--measure-wide)] text-center">
              <Eyebrow>{detail.eyebrow || "Community impact story"}</Eyebrow>
              <h1 className="mt-4 text-[clamp(2rem,5vw,3.2rem)] font-medium leading-[1.06] text-[var(--ink)]">
                {detail.title}
              </h1>
              {detail.heroIntro && (
                <p className="mt-6 text-xl leading-relaxed text-[var(--ink-soft)]">
                  {detail.heroIntro}
                </p>
              )}
            </div>

            {/* Full story body — Visual Editor blocks rendered via RichStory */}
            <div className="mt-12">
              <RichStory blocks={detail.storyBody} tone={detail.tone} />
            </div>
          </div>
        </section>

        {/* 3. Statistics — centered, no background wrapper, cards separated */}
        {detail.statsItems && detail.statsItems.length > 0 && (
          <section className="py-14 md:py-20">
            <div className="container-page">
              <div className="mx-auto max-w-2xl text-center">
                <SectionHeader
                  eyebrow={detail.statsEyebrow || "Verified outcomes"}
                  title={detail.statsTitle || "Measurable impact"}
                  intro={detail.statsIntro || "Statistics backed by evidence and community-verified monitoring."}
                  align="center"
                />
              </div>
              <div className="mt-10">
                <StatGrid items={detail.statsItems} count={4} />
              </div>
            </div>
          </section>
        )}

        {/* 4. Video section — centered, balanced two-column */}
        {(detail.videoUrl || detail.videoTitle) && (
          <section className="py-14 md:py-20">
            <div className="container-page">
              <div className="mx-auto max-w-3xl text-center">
                {detail.videoEyebrow && <Eyebrow>{detail.videoEyebrow}</Eyebrow>}
                {detail.videoTitle && (
                  <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">{detail.videoTitle}</h2>
                )}
                {detail.videoDescription && (
                  <p className="mt-4 max-w-xl leading-relaxed text-[var(--ink-soft)] mx-auto">
                    {detail.videoDescription}
                  </p>
                )}
              </div>
              <div className="mt-10 flex justify-center">
                <div className="max-w-2xl">
                  <VideoPlayer
                    videoUrl={detail.videoUrl}
                    thumbnailUrl={detail.videoThumbnailUrl}
                    thumbnailAlt={detail.videoThumbnailAlt || detail.title}
                    title={detail.videoTitle || detail.title}
                    caption={detail.videoTitle}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 5. Community testimonials — carousel format, one at a time */}
        {detail.testimonials && detail.testimonials.length > 0 && (
          <TestimonialCarousel
            eyebrow={detail.testimonialsEyebrow || "Voices from the community"}
            title={detail.testimonialsTitle || "What the community says"}
            intro={detail.testimonialsIntro || "Permissioned reflections from the people behind this impact story."}
            items={detail.testimonials}
          />
        )}

        {/* 6. Related stories */}
        {relatedStories.length > 0 && (
          <section className="py-14 md:py-20">
            <div className="container-page">
              <div className="mx-auto max-w-2xl text-center">
                <SectionHeader
                  eyebrow="More impact stories"
                  title="Other stories of change"
                  intro="Explore more verified impact stories from communities where FOSCOD works."
                  align="center"
                />
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedStories.map((story, i) => (
                  <Link
                    key={story.slug}
                    href={`/impact/stories/${story.slug}/full`}
                    className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
                  >
                    <PhotoSlot
                      tone={(["forest", "water", "earth"] as const)[i % 3]}
                      ratio="16/10"
                      imageUrl={story.hero_image_url}
                      alt={story.title}
                      caption={story.title}
                      className="rounded-none border-0 border-b border-[var(--border)]"
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
                        {story.linked_program || "Community story"}
                      </p>
                      <h3 className="mt-2 text-lg leading-snug font-medium">{story.title}</h3>
                      {story.quote && (
                        <blockquote className="mt-2 border-l-4 border-[var(--accent-600)] pl-3 text-sm italic text-[var(--ink-soft)]">
                          &ldquo;{story.quote}&rdquo;
                        </blockquote>
                      )}
                      <span className="mt-4 inline-flex text-sm font-medium text-[var(--accent-700)]">
                        Read full story →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      {/* Closing CTA band — reduced padding */}
      <CTABand
        title="Read more stories of change"
        body="Explore our full collection of impact stories, videos, and community experiences — all verified and consent-approved."
        actions={[
          { href: "/impact", label: "View all impact" },
          { href: "/impact/stories", label: "Impact story archive", variant: "secondary" },
          { href: "/donate", label: "Support this work", variant: "ghost" },
        ]}
      />
    </>
  );
}
