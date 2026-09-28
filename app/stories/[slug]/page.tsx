import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { HeroSlider } from "@/components/site/HeroSlider";
import { type HeroSlide } from "@/lib/content";
import { Prose, CTABand } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { getStory, getLatestStories } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = await getStory(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.excerpt,
    openGraph: { title: `${s.title} — FOSCOD`, description: s.excerpt },
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [s, all] = await Promise.all([getStory(slug), getLatestStories()]);
  if (!s) notFound();

  const related = all.filter((x) => x.slug !== slug).slice(0, 4);

  const heroSlides: HeroSlide[] = [{
    eyebrow: s.category,
    title: s.title,
    intro: s.excerpt,
    tone: "water",
    imageUrl: undefined,
    cta: { href: "/apply", label: "Apply now" },
  }];

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* article body + sidebar */}
      <section className="py-14 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_300px]">
          <article>
            <Prose>
              <p className="text-xl text-[var(--ink)]">{s.excerpt}</p>
              {s.body ? (
                s.body.split("\n\n").map((para, i) => <p key={i}>{para}</p>)
              ) : (
                <>
                  <p>
                    The full story text, gallery, and related links are managed in
                    the CMS Story editor — including category, author, location,
                    theme, and SEO fields. This article will read from that record
                    once published.
                  </p>
                  <p>
                    FOSCOD&rsquo;s field posts — host families, the solar-powered
                    salon in Naluvule, the 2025 internship debrief, the Kalagala
                    greening project, and the Water-is-Life spring in Lubani — each
                    live here, categorized by theme, location, year, and program
                    pillar.
                  </p>
                </>
              )}
            </Prose>

            <div className="mt-10">
              <PhotoSlot tone="forest" ratio="16/9" caption={`${s.title} — in-article image`} />
            </div>

            <p className="mt-10">
              <Link href="/stories" className="text-[var(--accent-700)] hover:underline">
                ← Back to the blog
              </Link>
            </p>
          </article>

          <aside className="space-y-8">
            <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-2)] p-6">
              <Eyebrow>More from the blog</Eyebrow>
              <ul className="mt-4 space-y-4">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={r.href} className="group block">
                      <p className="font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">{r.category}</p>
                      <p className="mt-1 text-[0.95rem] leading-snug text-[var(--ink)] transition-colors group-hover:text-[var(--accent-700)]">{r.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CTABand
        title="Start your own FOSCOD story"
        actions={[
          { href: "/apply", label: "Apply now" },
          { href: "/stories", label: "Read more stories", variant: "secondary" },
        ]}
      />
    </>
  );
}
