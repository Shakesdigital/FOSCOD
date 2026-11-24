import { HeroSlider } from "@/components/site/HeroSlider";
import {
  CardsCarousel,
  CTABand,
  FAQ,
  IntroSection,
  ProgramDatesTable,
  TestimonialCarousel,
} from "@/components/site/blocks";
import { SectionHeader } from "@/components/site/Section";
import { GleBreadcrumb, GleTimeline } from "@/components/site/gle-page";
import { GleSelectionSections } from "@/components/site/gle-selectors";
import {
  ExpandableCard,
  PhotoBand,
  StatsRow,
  SubNav,
  ContentBlock,
  SectionDivider,
  CardGrid,
} from "@/components/site/gle-landing";
import { StatCard } from "@/components/site/StatGrid";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import { getOpportunities, type OpportunitySummary } from "@/lib/opportunities";
import {
  getAllTestimonials,
  getHeroSlides,
  getImpactStats,
  getProgramDates,
} from "@/lib/content";
import {
  gleLandingContent,
  selectImpactStats,
  selectTestimonials,
} from "@/lib/gle-landing";
import {
  buildGleApplicationHref,
  retargetGleApplyHref,
} from "@/lib/gle-selections";

const pathway = "internship" as const;

export const metadata = pageMeta(
  "Internship Program — Global Learning Exchange",
  "Intern with FOSCOD in Uganda: supervised placements aligned to your learning objectives for individuals, groups and global service trips — a defined role, named supervision, agreed outputs and a useful handover."
);

export default async function InternshipPage() {
  const c = gleLandingContent.internship;
  const [sourceHeroSlides, dates, allTestimonials, impactStats, opportunities] = await Promise.all([
    getHeroSlides(c.heroSlug),
    getProgramDates(),
    getAllTestimonials(),
    getImpactStats(),
    getOpportunities("internship"),
  ]);

  const applicationHref = buildGleApplicationHref(pathway, { program: "individual" });
  const guidanceHref = buildGleApplicationHref(pathway, {
    program: "individual",
    programGuidance: true,
  });
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

  const stats = selectImpactStats(impactStats, c.impact.metrics);
  const voiceItems = selectTestimonials(allTestimonials, c.kind);
  const finalActions = c.finalCta.actions.map((action) => ({
    ...action,
    href: retargetGleApplyHref(action.href, pathway),
  }));

  return (
    <>
      <GleBreadcrumb current="Internship" />
      <HeroSlider slides={heroSlides} />
      <SubNav items={c.subNav} />

      {/* ABOUT SECTION */}
      <section className="py-16 md:py-24" aria-labelledby="about-heading">
        <ContentBlock id="about" maxWidth="2xl" spacing="loose">
          <SectionHeader
            eyebrow={c.about.eyebrow}
            title={c.about.title}
            align="center"
          />
          <div className="prose-space max-w-3xl">
            {c.about.body.split("\n\n").map((para, i) => (
              <p key={i} className="leading-relaxed text-[var(--ink-soft)]">{para}</p>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href={c.about.ctaHref} variant="primary" size="md">
              {c.about.ctaLabel}
            </Button>
          </div>
        </ContentBlock>
      </section>

      <SectionDivider />

      {/* PROGRAM TYPES */}
      <section
        id="types"
        className="scroll-mt-36 bg-[var(--surface-2)] py-16 md:py-24"
        aria-label="Types of internships"
      >
        <div className="container-page">
          <ContentBlock maxWidth="2xl" spacing="normal">
            <SectionHeader eyebrow={c.types.eyebrow} title={c.types.title} intro={c.types.intro} align="center" />
          </ContentBlock>

          <CardGrid columns={3} items={
            c.types.items.map((item) => (
              <ExpandableCard
                key={item.title}
                title={item.title}
                intro={item.intro}
                body={item.body}
                tag={item.tag}
                tone={item.tone}
                size="feature"
              />
            ))
          } />

          {c.types.note && (
            <ContentBlock className="mt-10" maxWidth="2xl" spacing="tight">
              <p className="text-center text-[0.92rem] leading-relaxed text-[var(--muted)]">
                {c.types.note}
              </p>
            </ContentBlock>
          )}
          
          <ContentBlock className="mt-8" maxWidth="2xl" spacing="tight">
            <div className="text-center">
              <Button href="/programs/global-learning-exchange/opportunities" variant="ghost" size="sm">
                See all GLE program types
              </Button>
            </div>
          </ContentBlock>
        </div>
      </section>

      <SectionDivider />

      {/* INTERNSHIP PACKAGE & BENEFITS */}
      <section
        id="package"
        className="scroll-mt-36 py-16 md:py-24"
        aria-label="Internship package and benefits"
      >
        <div className="container-page">
          <ContentBlock maxWidth="2xl" spacing="normal">
            <SectionHeader eyebrow={c.package.eyebrow} title={c.package.title} intro={c.package.intro} align="center" />
          </ContentBlock>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-center text-xl text-[var(--accent-700)] lg:text-left mb-2">{c.package.packageLabel}</h3>
              <p className="text-center text-sm text-[var(--muted)] lg:text-left mb-6">Expand each item to see what it covers</p>
              <div className="grid gap-5">
                {c.package.items.map((item) => (
                  <ExpandableCard
                    key={item.title}
                    title={item.title}
                    intro={item.intro}
                    body={item.body}
                    tone="water"
                    size="compact"
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-center text-xl text-[var(--accent-700)] lg:text-left mb-2">{c.package.benefitsLabel}</h3>
              <p className="text-center text-sm text-[var(--muted)] lg:text-left mb-6">Expand each benefit to learn more</p>
              <div className="grid gap-5">
                {c.package.benefits.map((benefit) => (
                  <ExpandableCard
                    key={benefit.title}
                    title={benefit.title}
                    intro={benefit.intro}
                    body={benefit.body}
                    tone="water"
                    size="compact"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* THEMATIC AREAS & ENGAGEMENT APPROACH - Interactive Selection */}
      <GleSelectionSections pathway={pathway} />

      <SectionDivider />

      {/* ELIGIBILITY */}
      <PhotoBand
        id="eligibility"
        eyebrow={c.eligibility.eyebrow}
        title={c.eligibility.title}
        body={c.eligibility.intro}
        bullets={c.eligibility.bullets}
        tone="water"
        imageUrl="/images/gle/internship/who-can-apply.jpg"
        imageAlt="A FOSCOD intern collaborating with community members in Uganda"
        align="left"
        variant="split"
      />

      <SectionDivider />

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
          <section className="bg-[var(--surface-2)] py-16 md:py-24" aria-label="Internship opportunities">
            <div className="container-page">
              <ContentBlock maxWidth="2xl" spacing="normal">
                <SectionHeader
                  eyebrow={c.opportunities.eyebrow}
                  title="Internship openings are published as they are confirmed"
                  intro="Openings appear in the opportunities directory once verified with hosts. Meanwhile, browse the directory or contact us — we match learning objectives to community priorities as placements open."
                  align="center"
                />
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button href={c.opportunities.cta.href}>{c.opportunities.cta.label}</Button>
                  <Button href="/contact" variant="secondary">Contact us</Button>
                </div>
              </ContentBlock>
            </div>
          </section>
        )}
      </div>

      <SectionDivider />

      {/* PROGRAM DATES */}
      {dates.length > 0 ? (
        <div id="dates" className="scroll-mt-36">
          <ProgramDatesTable
            eyebrow="Program dates"
            title="Start dates"
            intro="Placements are scheduled individually. Confirmed intake windows appear below; timing, support and costs are always confirmed in writing before placement."
            rows={dates}
            bg="bg-[var(--water-50)]"
            firstLabel="Intake"
            secondLabel="Details"
          />
        </div>
      ) : (
        <section id="dates" className="scroll-mt-36 bg-[var(--water-50)] py-16 md:py-24" aria-label="Start dates">
          <div className="container-page">
            <ContentBlock maxWidth="2xl" spacing="normal">
              <SectionHeader
                eyebrow="Program dates"
                title="Start dates"
                intro="Placements are scheduled individually — matched to community priorities, partner availability and your availability. Confirmed intake windows will appear here once scheduled; timing, support and costs are always confirmed in writing before placement."
                align="center"
              />
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href={guidanceHref}>Request placement guidance</Button>
                <Button href="/contact" variant="secondary">Contact us</Button>
              </div>
            </ContentBlock>
          </div>
        </section>
      )}

      <SectionDivider />

      {/* FEES */}
      <PhotoBand
        id="fees"
        eyebrow={c.fees.eyebrow}
        title={c.fees.title}
        body={c.fees.body}
        cta={c.fees.cta}
        tone="water"
        imageUrl="/images/gle/internship/fees.jpg"
        imageAlt="A FOSCOD intern reviewing project documents with community members"
        align="right"
        variant="split"
      />

      <SectionDivider />

      {/* IMPACT */}
      <section id="impact" className="scroll-mt-36 py-16 md:py-24" aria-label="Internship impact">
        <div className="container-page">
          <ContentBlock maxWidth="2xl" spacing="normal">
            <SectionHeader eyebrow={c.impact.eyebrow} title={c.impact.title} align="center" />
          </ContentBlock>
          <StatsRow>
            {stats.map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} note={stat.note} />
            ))}
          </StatsRow>
          <ContentBlock className="mt-10" maxWidth="2xl" spacing="tight">
            <div className="text-center">
              <Button href={c.impact.cta.href} variant="secondary" size="md">{c.impact.cta.label}</Button>
            </div>
          </ContentBlock>
        </div>
      </section>

      <SectionDivider />

      {/* DURATION */}
      <PhotoBand
        id="duration"
        eyebrow={c.duration.eyebrow}
        title={c.duration.title}
        body={c.duration.body}
        tone="earth"
        imageUrl="/images/gle/internship/duration.jpg"
        imageAlt="A FOSCOD intern learning with children in a Ugandan community"
        align="right"
        variant="split"
      />

      <SectionDivider />

      {/* LOCATION */}
      <div id="location" className="scroll-mt-36">
        <IntroSection
          title={c.location.title}
          eyebrow={c.location.eyebrow}
          body={c.location.body}
          ctaLabel={c.location.cta.label}
          ctaHref={c.location.cta.href}
          noImage
        />
      </div>

      <SectionDivider />

      {/* FAQs */}
      <section id="faqs" className="scroll-mt-36 py-16 md:py-24" aria-label="Frequently asked questions">
        <div className="container-page">
          <ContentBlock maxWidth="2xl" spacing="normal">
            <SectionHeader eyebrow="Frequently asked questions" title="Questions interns ask" align="center" />
          </ContentBlock>
          <ContentBlock className="mt-10" maxWidth="3xl" spacing="normal">
            <FAQ items={c.faqs} />
          </ContentBlock>
        </div>
      </section>

      <SectionDivider />

      {/* HOW TO APPLY */}
      <section id="how" className="scroll-mt-36 bg-[var(--surface-2)] py-16 md:py-24" aria-label="How to apply">
        <div className="container-page">
          <ContentBlock maxWidth="2xl" spacing="normal">
            <SectionHeader
              eyebrow="How to apply"
              title="From application to placement, step by step"
              intro="FOSCOD works collaboratively with you, your institution, communities and partner organizations to develop a meaningful and mutually beneficial experience."
              align="center"
            />
          </ContentBlock>
          <ContentBlock className="mt-12" maxWidth="3xl" spacing="normal">
            <GleTimeline steps={c.applySteps} firstStepHref={applicationHref} />
          </ContentBlock>
          <ContentBlock className="mt-8" maxWidth="2xl" spacing="tight">
            <p className="text-center text-[0.92rem] leading-relaxed text-[var(--muted)]">
              Submitting an application starts a matching process — it does not guarantee acceptance or a particular host organization.
            </p>
          </ContentBlock>
        </div>
      </section>

      <SectionDivider />

      {/* ALUMNI VOICES */}
      <div id="voices" className="scroll-mt-36">
        <TestimonialCarousel
          eyebrow={c.voices.eyebrow}
          title={c.voices.title}
          intro={c.voices.intro}
          items={voiceItems}
          cta={c.voices.cta}
          bg="bg-[var(--surface-2)]"
        />
      </div>

      <SectionDivider />

      {/* FINAL CTA */}
      <div id="apply" className="scroll-mt-36">
        <CTABand
          eyebrow={c.finalCta.eyebrow}
          title={c.finalCta.title}
          body={c.finalCta.body}
          actions={finalActions}
        />
      </div>
    </>
  );
}