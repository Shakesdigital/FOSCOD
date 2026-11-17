import { HeroSlider } from "@/components/site/HeroSlider";
import { IntroSection, FAQ, ProgramDatesTable, TestimonialCarousel, CardsCarousel, Steps, CTABand } from "@/components/site/blocks";
import { SectionHeader } from "@/components/site/Section";
import { SubNav, PhotoBand, ExpandableCard, StatsRow } from "@/components/site/gle-landing";
import { StatCard } from "@/components/site/StatGrid";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import { getOpportunities, type OpportunitySummary } from "@/lib/opportunities";
import { getHeroSlides, getProgramDates, getAllTestimonials, getImpactStats } from "@/lib/content";
import { gleLandingContent, selectImpactStats, selectTestimonials } from "@/lib/gle-landing";

export const metadata = pageMeta(
  "Volunteer Program — Global Learning Exchange",
  "Volunteer with FOSCOD in Uganda: community-defined placements for individuals, groups and global service trips — with local supervision, orientation, cultural immersion and guided reflection."
);

export default async function VolunteerPage() {
  const c = gleLandingContent.volunteer;
  const [heroSlides, dates, allTestimonials, impactStats, opportunities] = await Promise.all([
    getHeroSlides(c.heroSlug),
    getProgramDates(),
    getAllTestimonials(),
    getImpactStats(),
    getOpportunities("volunteer"),
  ]);

  const opportunityCards = (list: OpportunitySummary[]) =>
    list.slice(0, 9).map((o) => ({
      title: o.title,
      excerpt: o.excerpt,
      href: `/opportunities/${o.slug}`,
      ctaLabel: "Read more",
      kicker: [o.category, o.duration].filter(Boolean).join(" · ") || undefined,
      tag: "Volunteer",
      imageUrl: o.featured_image_url,
      tone: "forest" as const,
    }));

  const stats = selectImpactStats(impactStats, c.impact.metrics);
  const voiceItems = selectTestimonials(allTestimonials, c.kind);

  return (
    <>
      <HeroSlider slides={heroSlides} />

      <SubNav items={c.subNav} />

      {/* ===== About the volunteer program ===== */}
      <IntroSection
        title={c.about.title}
        eyebrow={c.about.eyebrow}
        body={c.about.body}
        ctaLabel={c.about.ctaLabel}
        ctaHref={c.about.ctaHref}
      />

      {/* ===== Types of volunteer programs ===== */}
      <section id="types" className="scroll-mt-36 bg-[var(--surface-2)] py-16 md:py-24" aria-label="Types of volunteer programs">
        <div className="container-page">
          <SectionHeader eyebrow={c.types.eyebrow} title={c.types.title} intro={c.types.intro} align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {c.types.items.map((t) => (
              <ExpandableCard key={t.title} title={t.title} intro={t.intro} body={t.body} tag={t.tag} tone={t.tone} />
            ))}
          </div>
          {c.types.note && (
            <p className="mx-auto mt-8 max-w-2xl text-center text-[0.92rem] leading-relaxed text-[var(--muted)]">{c.types.note}</p>
          )}
        </div>
      </section>

      {/* ===== Who can volunteer ===== */}
      <PhotoBand
        id="eligibility"
        eyebrow={c.eligibility.eyebrow}
        title={c.eligibility.title}
        body={c.eligibility.intro}
        bullets={c.eligibility.bullets}
        tone="forest"
        imageUrl="/images/gle/volunteer/who-can-volunteer.jpg"
        imageAlt="A FOSCOD volunteer taking notes beside community members against a brick wall in Jinja, Uganda"
        align="right"
      />

      {/* ===== Start dates ===== */}
      {dates.length > 0 ? (
        <ProgramDatesTable
          eyebrow="Program dates"
          title="Start dates"
          intro="Placements are scheduled individually. Confirmed intake windows appear below; timing, support and costs are always confirmed in writing before placement."
          rows={dates}
          bg="bg-[var(--forest-50)]"
          firstLabel="Intake"
          secondLabel="Details"
        />
      ) : (
        <section id="dates" className="scroll-mt-36 bg-[var(--forest-50)] py-16 md:py-24" aria-label="Start dates">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeader
                eyebrow="Program dates"
                title="Start dates"
                intro="Placements are scheduled individually — matched to community priorities, partner availability and your availability. Confirmed intake windows will appear here once scheduled; timing, support and costs are always confirmed in writing before placement."
                align="center"
              />
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/apply?type=guidance">Request placement guidance</Button>
                <Button href="/contact" variant="secondary">Contact us</Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== Duration ===== */}
      <PhotoBand
        id="duration"
        eyebrow={c.duration.eyebrow}
        title={c.duration.title}
        body={c.duration.body}
        tone="earth"
        imageUrl="/images/gle/volunteer/duration.jpg"
        imageAlt="A FOSCOD volunteer sitting with children against a mud wall in a Ugandan community"
        align="left"
      />

      {/* ===== Program fees ===== */}
      <PhotoBand
        id="fees"
        eyebrow={c.fees.eyebrow}
        title={c.fees.title}
        body={c.fees.body}
        cta={c.fees.cta}
        tone="water"
        imageUrl="/images/gle/volunteer/fees.jpg"
        imageAlt="A FOSCOD volunteer reviewing documents with community members in a village in Jinja, Uganda"
        align="right"
      />

      {/* ===== How to apply — numbered stages ===== */}
      <section id="how" className="scroll-mt-36 bg-[var(--surface-2)] py-16 md:py-24" aria-label="How to apply">
        <div className="container-page">
          <SectionHeader
            eyebrow="How to apply"
            title="From application to placement, step by step"
            intro="FOSCOD works collaboratively with you, your institution, communities and partner organizations to develop a meaningful and mutually beneficial experience."
            align="center"
          />
          <div className="mt-12">
            <Steps steps={c.applySteps} />
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[0.92rem] leading-relaxed text-[var(--muted)]">
            Submitting an application starts a matching process — it does not guarantee acceptance or a particular host organization.
          </p>
        </div>
      </section>

      {/* ===== Live opportunities carousel (published openings only) ===== */}
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
        <section id="opportunities" className="scroll-mt-36 bg-[var(--surface-2)] py-16 md:py-24" aria-label="Volunteer opportunities">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeader
                eyebrow={c.opportunities.eyebrow}
                title="Volunteer openings are published as they are confirmed"
                intro="Openings appear in the opportunities directory once verified with hosts. Meanwhile, browse the directory or contact us — we match interests to community priorities as placements open."
                align="center"
              />
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href={c.opportunities.cta.href}>{c.opportunities.cta.label}</Button>
                <Button href="/contact" variant="secondary">Contact us</Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== Volunteer project impact ===== */}
      <section id="impact" className="scroll-mt-36 py-16 md:py-24" aria-label="Volunteer project impact">
        <div className="container-page">
          <SectionHeader eyebrow={c.impact.eyebrow} title={c.impact.title} align="center" />
          <StatsRow>
            {stats.map((s) => (
              <StatCard key={s.label} value={s.value} label={s.label} note={s.note} />
            ))}
          </StatsRow>
          <div className="mt-10 text-center">
            <Button href={c.impact.cta.href} variant="secondary" size="md">{c.impact.cta.label}</Button>
          </div>
        </div>
      </section>

      {/* ===== Alumni voices (published only) ===== */}
      <TestimonialCarousel
        eyebrow={c.voices.eyebrow}
        title={c.voices.title}
        intro={c.voices.intro}
        items={voiceItems}
        cta={c.voices.cta}
        bg="bg-[var(--surface-2)]"
      />

      {/* ===== Final CTA ===== */}
      <CTABand
        eyebrow={c.finalCta.eyebrow}
        title={c.finalCta.title}
        body={c.finalCta.body}
        actions={c.finalCta.actions}
      />

      {/* ===== FAQs ===== */}
      <section id="faqs" className="scroll-mt-36 py-16 md:py-24" aria-label="Frequently asked questions">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeader
              eyebrow="Frequently asked questions"
              title="Questions volunteers ask"
              align="center"
            />
          </div>
          <div className="mt-10">
            <FAQ items={c.faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
