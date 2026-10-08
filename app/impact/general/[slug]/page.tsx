import { HeroSlider } from "@/components/site/HeroSlider";
import { CardGrid } from "@/components/site/blocks";
import { HowYouCanGetInvolved } from "@/components/home/HowYouCanGetInvolved";
import { SectionHeader } from "@/components/site/Section";
import { VideoPlayer } from "@/components/site/VideoPlayer";
import { TestimonialCarousel } from "@/components/site/TestimonialCard";
import { pageMeta } from "@/lib/seo";
import { getGeneralImpactPage, getAllGeneralImpactSlugs } from "@/lib/content";
import type { HeroSlide } from "@/lib/content";
import type { GridCard } from "@/components/site/blocks";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllGeneralImpactSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getGeneralImpactPage(slug);
  if (!page) return { title: "Page not found" };
  return pageMeta(
    page.metaTitle || page.title,
    page.metaDescription ||
      `${page.title} — verified impact stories from FOSCOD's ${page.program} work in Uganda.`
  );
}

export default async function GeneralImpactPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getGeneralImpactPage(slug);
  if (!page) notFound();

  // Build hero slides from the page's hero fields
  const heroSlides: HeroSlide[] = [
    {
      eyebrow: page.eyebrow,
      title: page.title,
      intro: page.descriptionBody,
      tone: page.tone,
      imageUrl: page.heroImageUrl,
      cta: page.heroCta1,
      cta2: page.heroCta2,
      cta3: page.heroCta3,
    },
  ];

  // Map CD story cards to CardGrid shape
  const cdCardItems: GridCard[] = (page.cdStoryCards || []).map((c) => ({
    title: c.title,
    excerpt: c.excerpt || c.verifiedOutcome,
    href: c.href,
    tone: page.tone,
    imageUrl: c.imageUrl,
    imageAlt: c.imageAlt || c.title,
    kicker: c.verifiedOutcome,
  }));

  // Map GLE story cards to CardGrid shape
  const gleCardItems: GridCard[] = (page.gleStoryCards || []).map((c) => ({
    title: c.title,
    excerpt: c.excerpt || c.verifiedOutcome,
    href: c.href,
    tone: page.tone,
    imageUrl: c.imageUrl,
    imageAlt: c.imageAlt || c.title,
    kicker: c.verifiedOutcome,
  }));

  return (
    <>
      {/* 1. Hero — like all other landing pages */}
      <HeroSlider slides={heroSlides} />

      {/* 2. Heading & brief description (always renders) */}
      {(page.descriptionTitle || page.descriptionBody) && (
        <section className="bg-[var(--surface-2)] py-16 md:py-24">
          <div className="container-page">
            {page.descriptionTitle && (
              <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] font-medium">{page.descriptionTitle}</h2>
            )}
            {page.descriptionBody && (
              <p className="mt-4 max-w-3xl leading-relaxed text-[var(--ink-soft)]">{page.descriptionBody}</p>
            )}
          </div>
        </section>
      )}

      {/* 3. Featured community empowerment / development impact stories (CD section) */}
      {cdCardItems.length > 0 && (
        <CardGrid
          eyebrow={page.cdStoriesEyebrow || "Community stories"}
          title={page.cdStoriesTitle || "Featured impact stories"}
          intro={page.cdStoriesIntro}
          items={cdCardItems}
          more={{ href: "/impact/stories", label: "See all stories" }}
        />
      )}

      {/* 4. Global learning & empowerment stories (GLE section — same card format as CD) */}
      {gleCardItems.length > 0 && (
        <CardGrid
          eyebrow={page.gleStoriesEyebrow || "Global learning stories"}
          title={page.gleStoriesTitle || "Featured global learning stories"}
          intro={page.gleStoriesIntro}
          items={gleCardItems}
          more={{ href: "/impact/stories", label: "See all stories" }}
          surface
        />
      )}

      {/* 5. Explore more stories — clean slider + single video */}
      {(page.exploreTestimonials?.length || page.exploreVideos?.length) ? (
        <section className="py-16 md:py-24">
          <div className="container-page">
            {/* Section header — centered, kept here only, not repeated in left column */}
            <SectionHeader
              eyebrow={page.exploreEyebrow || "More voices and videos"}
              title={page.exploreTitle || "Community voices & field films"}
              intro={page.exploreIntro}
              align="center"
            />

            <div className="mt-12 grid gap-12 lg:grid-cols-[0.55fr_0.45fr]">
              {/* Left column: testimonial carousel (one at a time) */}
              {page.exploreTestimonials && page.exploreTestimonials.length > 0 && (
                <TestimonialCarousel
                  items={page.exploreTestimonials}
                  cta={page.exploreTestimonialsCta || { href: "/impact/stories", label: "Discover more stories" }}
                  surface={false}
                />
              )}

              {/* Right column: single video + CTA */}
              {page.exploreVideos && page.exploreVideos.length > 0 && (
                <div className="flex flex-col">
                  <VideoPlayer
                    videoUrl={page.exploreVideos[0].videoUrl}
                    thumbnailUrl={page.exploreVideos[0].thumbnailUrl}
                    thumbnailAlt={page.exploreVideos[0].thumbnailAlt || page.exploreVideos[0].title || "Video thumbnail"}
                    title={page.exploreVideos[0].title}
                    caption={page.exploreVideos[0].title}
                  />
                  {/* Videos CTA below the single video */}
                  {page.exploreVideosCta && (
                    <div className="mt-8 text-center">
                      <a
                        href={page.exploreVideosCta.href}
                        className="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-[var(--accent-700)] transition-colors hover:underline"
                      >
                        {page.exploreVideosCta.label} →
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      ) : null}

      {/* 6. Get involved section at the very bottom (same as all other landing pages) */}
      {page.getInvolvedCards && page.getInvolvedCards.length > 0 && (
        <HowYouCanGetInvolved
          cards={page.getInvolvedCards}
          eyebrow={page.getInvolvedEyebrow || "How you can get involved"}
          title={page.getInvolvedTitle || "Your pathway into the work"}
          intro={page.getInvolvedIntro}
          surface
        />
      )}
    </>
  );
}
