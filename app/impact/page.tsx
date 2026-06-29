import { HeroSlider } from "@/components/site/HeroSlider";
import { CardGrid, QuoteGrid, CTABand } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMeta } from "@/lib/seo";
import {
  getHeroSlides,
  getImpactMetrics,
  getImpactStories,
  getImpactVideos,
  getCommunityExperiences,
  getAlumniExperiences,
} from "@/lib/content";

export const metadata = pageMeta(
  "Our Impact",
  "FOSCOD publishes verified metrics only. Where numbers are still being confirmed, we show drafts rather than zeros."
);

export default async function ImpactPage() {
  const [heroSlides, metrics, stories, alumni, videos, community] = await Promise.all([
    getHeroSlides("impact"),
    getImpactMetrics(),
    getImpactStories(),
    getAlumniExperiences(),
    getImpactVideos(),
    getCommunityExperiences(),
  ]);

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* Heading + metric strip */}
      <section className="container-page py-12 md:py-16">
        <div className="max-w-2xl">
          <Eyebrow>By the numbers</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">The difference, measured honestly</h2>
        </div>
        <dl className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-[var(--surface)] p-6">
              <dd className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,4vw,3rem)] leading-none text-[var(--ink)]">
                {m.value}
                {m.unit && <span className="ml-1 text-xl text-[var(--accent-600)]">{m.unit}</span>}
              </dd>
              <dt className="mt-3 text-[0.95rem] text-[var(--ink-soft)]">{m.label}</dt>
              <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.12em]">
                {m.status === "draft" ? (
                  <span className="text-[var(--gold-700)]">◷ {m.note ?? "being updated"}</span>
                ) : (
                  <span className="text-[var(--forest-700)]">✓ verified</span>
                )}
              </p>
            </div>
          ))}
        </dl>
      </section>

      {/* Impact stories */}
      <CardGrid
        eyebrow="Impact stories"
        title="Real change on the ground"
        intro="The clearest measure of our work is what's different in a community after we've worked together."
        items={stories.map((s) => ({ title: s.title, excerpt: s.excerpt, href: s.href }))}
        more={{ href: "/stories", label: "Read more stories" }}
      />

      {/* Alumni experiences */}
      <QuoteGrid
        eyebrow="Alumni experiences"
        title="In their words"
        intro="Past interns, volunteers, and university cohorts on what the experience meant to them."
        items={alumni}
        more={{ href: "/alumni", label: "Meet our alumni" }}
        surface
      />

      {/* Impact videos */}
      <CardGrid
        eyebrow="Impact videos"
        title="Short films from the field"
        intro="A few minutes with the people and projects behind the numbers."
        items={videos.map((v) => ({ title: v.title, excerpt: v.excerpt, href: v.href, video: true }))}
        more={{ href: "/stories", label: "Watch more" }}
      />

      {/* Community experiences */}
      <CardGrid
        eyebrow="Community experiences"
        title="From the people we work with"
        intro="Host families, savings groups, and local leaders on co-creating change."
        items={community.map((c) => ({ title: c.title, excerpt: c.excerpt, href: c.href }))}
        more={{ href: "/stories", label: "Read more" }}
        surface
      />

      <CTABand
        title="Help us grow verified impact"
        actions={[
          { href: "/donate", label: "Donate" },
          { href: "/stories", label: "Read field stories", variant: "secondary" },
        ]}
      />
    </>
  );
}
