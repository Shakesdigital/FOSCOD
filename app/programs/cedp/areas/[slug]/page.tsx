import { HeroSlider } from "@/components/site/HeroSlider";
import { CardGrid, Prose, SplitSection } from "@/components/site/blocks";
import { HowYouCanGetInvolved } from "@/components/home/HowYouCanGetInvolved";
import { Section, SectionHeader } from "@/components/site/Section";
import { ContentCard } from "@/components/ui/ContentCard";
import { pageMeta } from "@/lib/seo";
import {
  getCedpArea,
  getCedpAreas,
  getCedpAreaProjects,
  getCedpAreaImpacts,
} from "@/lib/content";
import type { HeroSlide } from "@/lib/content";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const areas = await getCedpAreas();
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = await getCedpArea(slug);
  if (!area) return { title: "Area not found" };
  return pageMeta(
    area.title,
    area.metaDescription ||
      area.description ||
      `${area.title} — Community-led development in Kalagala Parish, Uganda.`
  );
}

export default async function CedpAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [area, areaProjects, areaImpacts] = await Promise.all([
    getCedpArea(slug),
    getCedpAreaProjects(slug),
    getCedpAreaImpacts(slug),
  ]);

  if (!area) notFound();

  /* ------------------------------------------------------------------ */
  /* Section backgrounds alternate: white → mint → white → mint → etc.  */
  /*   white  = no inline bg  (defaults to --bg)                         */
  /*   mint   = bg-[var(--surface-2)]  (#eaf5ee)                         */
  /* ------------------------------------------------------------------ */

  // Hero slide from the area record
  const heroSlides: HeroSlide[] = [
    {
      eyebrow: area.subtitle || "CEDP",
      title: area.title,
      intro: area.description,
      cta: area.heroCta1,
      cta2: area.heroCta2,
      cta3: area.heroCta3,
      tone: area.tone,
      imageUrl: area.heroImageUrl,
    },
  ];

  // Impact cards mapped to CardGrid shape
  const impactItems = areaImpacts.map((c) => ({
    title: c.title,
    excerpt: c.excerpt || c.story,
    href: c.href,
    tone: area.tone,
    imageUrl: c.imageUrl,
    imageAlt: c.imageAlt,
    icon: c.icon,
    tag: c.tag,
    kicker: c.verifiedOutcome,
    ctaLabel: c.ctaLabel,
  }));

  return (
    <>
      {/* 1. Hero — white */}
      <HeroSlider slides={heroSlides} />

      {/* 2. Description — mint */}
      <SplitSection eyebrow="What we do" title={area.title} surface>
        <Prose>
          <p>{area.description}</p>
          <p className="mt-4">
            In <strong>Kalagala Parish</strong>, this area of focus addresses the specific
            challenges of a peri-urban zone bordering Mabira Forest — where rural and urban
            service delivery gaps overlap and communities face pressure on land, water, and
            forest resources.
          </p>
        </Prose>
      </SplitSection>

      {/* 3. Projects — white */}
      <Section>
        <SectionHeader
          eyebrow="Projects"
          title="Community-led projects in this area"
          intro="Each project is co-designed with communities and tracks real, verifiable outcomes."
        />

        {areaProjects.length > 0 ? (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areaProjects.map((p, i) => (
              <li key={p.slug} className="group h-full">
                <ContentCard
                  title={p.title}
                  excerpt={p.summary}
                  href={p.href}
                  ctaLabel={p.customCtaLabel || "Read more about the project"}
                  kicker={p.theme}
                  imageRatio="16/10"
                  tone={(["forest", "water", "earth"] as const)[i % 3]}
                  tag={p.theme}
                  asLink={true}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-10 text-[var(--muted)]">
            Projects for this area are managed in the CMS. Add them via the admin panel to
            appear here.
          </p>
        )}
      </Section>

      {/* 4. Impact — mint */}
      <CardGrid
        surface
        eyebrow="Impact"
        title="Verified outcomes from this area"
        intro="Evidence-backed results from community-led work — each reflecting the priorities communities set for themselves."
        items={impactItems}
        more={{ href: "/impact", label: "See all impact" }}
      />

      {/* 5. Get involved — white */}
      {area.getInvolvedCards && (
        <HowYouCanGetInvolved
          cards={area.getInvolvedCards}
          eyebrow="How you can get involved"
          title="Your pathway into the work"
          intro="Join, partner, or support — every contribution is tied to a community-defined priority with clear evidence."
        />
      )}
    </>
  );
}
