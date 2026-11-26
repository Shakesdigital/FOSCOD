import { HeroSlider } from "@/components/site/HeroSlider";
import { CardsCarousel, CTABand } from "@/components/site/blocks";
import { SectionHeader } from "@/components/site/Section";
import { GleBreadcrumb } from "@/components/site/gle-page";
import { GleSelectionSections } from "@/components/site/gle-selectors";
import {
  ExpandableCard,
  PhotoBand,
  SubNav,
  ContentBlock,
  IntroSplit,
  PackageGrid,
} from "@/components/site/gle-landing";
import { GleAlumniExperiences } from "@/components/site/GleAlumniExperiences";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import { getOpportunities, type OpportunitySummary } from "@/lib/opportunities";
import { getAllTestimonials, getHeroSlides } from "@/lib/content";
import { gleLandingContent, selectTestimonials } from "@/lib/gle-landing";
import { retargetGleApplyHref } from "@/lib/gle-selections";

const pathway = "internship" as const;

export const metadata = pageMeta(
  "Internship Program — Global Learning Exchange",
  "Intern with FOSCOD in Uganda: supervised placements aligned to your learning objectives for individuals, groups and global service trips — a defined role, named supervision, agreed outputs and a useful handover."
);

export default async function InternshipPage() {
  const c = gleLandingContent.internship;
  const [sourceHeroSlides, allTestimonials, opportunities] = await Promise.all([
    getHeroSlides(c.heroSlug),
    getAllTestimonials(),
    getOpportunities("internship"),
  ]);

  const heroSlides = sourceHeroSlides.map((slide) => ({
    ...slide,
    cta: slide.cta
      ? { ...slide.cta, href: retargetGleApplyHref(slide.cta.href, pathway) }
      : undefined,
    cta2: slide.cta2
      ? { ...slide.cta2, href: retargetGleApplyHref(slide.cta2.href, pathway) }
      : undefined,
  }));

  const opportunityCards = (list: OpportunitySummary[]) =>
    list.slice(0, 9).map((opportunity) => ({
      title: opportunity.title,
      excerpt: opportunity.excerpt,
      href: `/opportunities/${opportunity.slug}`,
      ctaLabel: "Read more",
      kicker: [opportunity.category, opportunity.duration].filter(Boolean).join(" · ") || undefined,
      tag: "Internship",
      imageUrl: opportunity.featured_image_url,
      tone: "water" as const,
    }));

  const voiceItems = selectTestimonials(allTestimonials, c.kind);
  const readyActions = c.readyToApply.actions.map((action) => ({
    ...action,
    href: retargetGleApplyHref(action.href, pathway),
  }));

  return (
    <>
      <GleBreadcrumb current="Internship" />
      <HeroSlider slides={heroSlides} />
      <SubNav items={c.subNav} />

      {/* PROGRAM INFORMATION */}
      <IntroSplit
        id="about"
        eyebrow={c.about.eyebrow}
        title={c.about.title}
        body={c.about.body}
        cta={{ href: c.about.ctaHref, label: c.about.ctaLabel }}
        imageUrl={c.about.imageUrl}
        imageAlt={c.about.imageAlt}
        tone="water"
      />

      {/* INTERNSHIP PROGRAMS */}
      <section
        id="types"
        className="scroll-mt-36 bg-[var(--surface-2)] py-10 md:py-14"
        aria-label="Types of internships"
      >
        <div className="container-page">
          <ContentBlock maxWidth="2xl" spacing="normal">
            <SectionHeader eyebrow={c.types.eyebrow} title={c.types.title} intro={c.types.intro} align="center" />
          </ContentBlock>

          <PackageGrid>
            {c.types.items.map((item) => (
              <ExpandableCard
                key={item.title}
                title={item.title}
                intro={item.intro}
                body={item.body}
                tag={item.tag}
                tone={item.tone}
                size="feature"
              />
            ))}
          </PackageGrid>

          {c.types.note && (
            <ContentBlock className="mt-8" maxWidth="2xl" spacing="tight">
              <p className="text-center text-[0.92rem] leading-relaxed text-[var(--muted)]">
                {c.types.note}
              </p>
            </ContentBlock>
          )}

          <ContentBlock className="mt-6" maxWidth="2xl" spacing="tight">
            <div className="text-center">
              <Button href="/opportunities" variant="ghost" size="sm">
                See all GLE program types
              </Button>
            </div>
          </ContentBlock>
        </div>
      </section>

      {/* INTERNSHIP PACKAGE */}
      <section
        id="package"
        className="scroll-mt-36 py-10 md:py-14"
        aria-label="Internship package"
      >
        <div className="container-page">
          <ContentBlock maxWidth="2xl" spacing="normal">
            <SectionHeader
              eyebrow={c.package.eyebrow}
              title={c.package.title}
              intro={c.package.intro}
              align="center"
            />
          </ContentBlock>

          <div className="mt-10">
            <PackageGrid>
              {c.package.items.map((item) => (
                <ExpandableCard
                  key={item.title}
                  title={item.title}
                  intro={item.intro}
                  body={item.body}
                  imageUrl={item.imageUrl}
                  imageAlt={item.imageAlt}
                  tone="water"
                  size="feature"
                />
              ))}
            </PackageGrid>
          </div>
        </div>
      </section>

      {/* CURRENT OPENINGS */}
      <div id="current-openings" className="scroll-mt-36">
        {opportunities.length > 0 ? (
          <CardsCarousel
            eyebrow={c.opportunities.eyebrow}
            title={c.opportunities.title}
            intro={c.opportunities.intro}
            items={opportunityCards(opportunities)}
            cta={c.opportunities.cta}
            bg="bg-[var(--surface-2)]"
          />
        ) : (
          <section className="bg-[var(--surface-2)] py-10 md:py-14" aria-label="Internship opportunities">
            <div className="container-page">
              <ContentBlock maxWidth="2xl" spacing="normal">
                <SectionHeader
                  eyebrow={c.opportunities.eyebrow}
                  title="Internship openings are published as they are confirmed"
                  intro="Openings appear in the opportunities directory once verified with hosts. Meanwhile, browse the directory or contact us — we match learning objectives to community priorities as placements open."
                  align="center"
                />
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Button href={c.opportunities.cta.href}>{c.opportunities.cta.label}</Button>
                  <Button href="/contact" variant="secondary">Contact us</Button>
                </div>
              </ContentBlock>
            </div>
          </section>
        )}
      </div>

      {/* THEMATIC AREAS & ENGAGEMENT APPROACH */}
      <GleSelectionSections pathway={pathway} />

      {/* WHO CAN APPLY */}
      <PhotoBand
        id="eligibility"
        eyebrow={c.eligibility.eyebrow}
        title={c.eligibility.title}
        body={c.eligibility.intro}
        bullets={c.eligibility.bullets}
        tone="water"
        imageUrl={c.eligibility.imageUrl}
        imageAlt={c.eligibility.imageAlt}
        align="left"
        variant="split"
      />

      {/* ALUMNI EXPERIENCES */}
      <div id="voices" className="scroll-mt-36">
        <GleAlumniExperiences
          eyebrow={c.voices.eyebrow}
          title={c.voices.title}
          intro={c.voices.intro}
          items={voiceItems}
          cta={c.voices.cta}
          video={c.voices.video}
          videoSide="left"
        />
      </div>

      {/* FEES */}
      <PhotoBand
        id="fees"
        eyebrow={c.fees.eyebrow}
        title={c.fees.title}
        body={c.fees.body}
        cta={c.fees.cta}
        tone="water"
        imageUrl={c.fees.imageUrl}
        imageAlt={c.fees.imageAlt}
        align="right"
        variant="split"
      />

      {/* READY TO APPLY */}
      <div id="apply" className="scroll-mt-36 bg-[var(--surface-2)]">
        <CTABand
          eyebrow={c.readyToApply.eyebrow}
          title={c.readyToApply.title}
          body={c.readyToApply.body}
          actions={readyActions}
          compact
        />
      </div>

    </>
  );
}
