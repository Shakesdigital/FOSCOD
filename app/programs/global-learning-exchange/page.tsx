import { HeroSlider } from "@/components/site/HeroSlider";
import { Button } from "@/components/ui/Button";
import {
  IntroSection,
  ApplySection,
  FeatureGrid,
  CTABand,
  FAQ,
  ProgramDatesTable,
  TestimonialCarousel,
  CardsCarousel,
} from "@/components/site/blocks";
import { SectionHeader } from "@/components/site/Section";
import { pageMeta } from "@/lib/seo";
import { getOpportunities, type OpportunitySummary } from "@/lib/opportunities";
import {
  getHeroSlides,
  getGleIntroduction,
  getGleProgramCards,
  getGleTargetAudience,
  getGleBenefits,
  getProgramDates,
  getAllTestimonials,
  getGleApplySection,
  type GlePathwayCard,
  type GleIconCard,
  type Testimonial,
} from "@/lib/content";

export const metadata = pageMeta(
  "Global Learning Exchange Program (GLE)",
  "FOSCOD's Global Learning Exchange Program (GLE) designs and facilitates internships, volunteering, research, service learning and study tours in collaboration with local communities and partner organizations in Uganda."
);

const gleFaqs = [
  { q: "Who defines the work?", a: "FOSCOD develops roles from priorities identified with communities and local partners. An applicant's interests help with matching, but do not replace the community-defined purpose of the work." },
  { q: "Do I need previous experience?", a: "Requirements depend on the role. Observation and learning activities may be suitable for beginners; research, technical, health-related, or direct community work requires relevant preparation and closer review." },
  { q: "What support is included?", a: "The current program brief confirms the named supervisor, orientation, accommodation arrangement, local transport, emergency contact, and other support for that specific intake. Services are not assumed until confirmed in writing." },
  { q: "Can my institution award academic credit?", a: "FOSCOD can work with an institution to align activities and evidence of learning. The home institution remains responsible for approving academic credit." },
  { q: "How are safeguarding and respectful storytelling handled?", a: "Participants must follow role boundaries, consent requirements, the code of conduct, and rules for photography, stories, personal data, and research data. Current checks depend on the placement." },
  { q: "I'm not sure which program suits me — can I ask for guidance?", a: "Yes. Request placement guidance in the application form or contact FOSCOD, and we will help you identify an appropriate program type, thematic area and engagement approach." },
  { q: "Does applying guarantee a placement?", a: "No. Submitting an application starts a matching process that considers community priorities, partner availability and program requirements — it does not guarantee acceptance or a particular host organization." },
];

/* Program cards (volunteer / internship) → FeatureGrid items. */
function programCardItems(cards: GlePathwayCard[]) {
  return cards.map((p) => ({
    title: p.title,
    body: p.body,
    href: p.href,
    cta: p.cta,
    kicker: p.kicker,
    imageUrl: p.imageUrl,
    imageAlt: p.imageAlt,
    icon: p.icon,
    tone: p.tone,
    tag: p.tag,
  }));
}

/* Audience / benefits → icon cards. */
function iconCardItems(cards: GleIconCard[]) {
  return cards.map((c) => ({ title: c.title, body: c.body, icon: c.icon }));
}

/* Published opportunities → carousel cards (heading, image, excerpt, CTA). */
function opportunityCards(opportunities: OpportunitySummary[]) {
  return opportunities.slice(0, 9).map((o) => ({
    title: o.title,
    excerpt: o.excerpt,
    href: `/opportunities/${o.slug}`,
    ctaLabel: "Read more",
    kicker: [o.category, o.duration].filter(Boolean).join(" · ") || undefined,
    tag: o.type ? o.type.charAt(0).toUpperCase() + o.type.slice(1) : undefined,
    imageUrl: o.featured_image_url,
    tone: o.type === "internship" ? ("water" as const) : o.type === "volunteer" ? ("forest" as const) : undefined,
  }));
}

export default async function GlePage() {
  const [heroSlides, introduction, programCards, audience, benefits, dates, testimonials, opportunities, applySection] =
    await Promise.all([
      getHeroSlides("global-learning-exchange"),
      getGleIntroduction(),
      getGleProgramCards(),
      getGleTargetAudience(),
      getGleBenefits(),
      getProgramDates(),
      getAllTestimonials(),
      getOpportunities(),
      getGleApplySection(),
    ]);

  const carouselTestimonials: Testimonial[] = testimonials;

  return (
    <>
      {/* ===== 1. Landing: hero + introduction + two program cards ===== */}
      <HeroSlider slides={heroSlides} />

      <IntroSection
        title={introduction.title}
        eyebrow={introduction.eyebrow}
        body={introduction.body}
        imageUrl={introduction.imageUrl}
        imageAlt={introduction.imageAlt}
        ctaLabel={introduction.ctaLabel}
        ctaHref={introduction.ctaHref}
      />

      <section className="pb-16 md:pb-24" aria-label="Choose your program">
        <div className="container-page">
          <SectionHeader
            eyebrow="Two ways to take part"
            title="Volunteer or intern with GLE"
            intro="Both programs run as individual, group or global service trip formats, with shared development sectors from FOSCOD's Community Empowerment and Development Program (CEDP) and local partner organizations."
            align="center"
          />
          <div className="mt-12">
            <FeatureGrid columns={2} items={programCardItems(programCards)} />
          </div>
        </div>
      </section>

      {/* ===== 2. Target audience ===== */}
      <section className="bg-[var(--surface-2)] py-16 md:py-24" aria-label="Target audience">
        <div className="container-page">
          <SectionHeader
            eyebrow="Target audience"
            title="Who takes part"
            intro="GLE connects students, professionals, researchers and university groups with structured, supervised field learning in Uganda."
            align="center"
          />
          <div className="mt-12">
            <FeatureGrid columns={3} items={iconCardItems(audience)} />
          </div>
        </div>
      </section>

      {/* ===== 3. Program benefits ===== */}
      <section className="bg-[var(--forest-50)] py-16 md:py-24" aria-label="Program benefits">
        <div className="container-page">
          <SectionHeader
            eyebrow="Program benefits"
            title="What you gain — and what the community gains"
            intro="Placements are designed so participants grow professionally and interculturally while communities receive useful, ethical contributions."
            align="center"
          />
          <div className="mt-12">
            <FeatureGrid columns={3} items={iconCardItems(benefits)} />
          </div>
        </div>
      </section>

      {/* ===== Opportunities carousel (published openings only) ===== */}
      <CardsCarousel
        eyebrow="Current openings"
        title="Live opportunities"
        intro="A sample of openings currently published in the opportunities directory. Each listing names its host, purpose, learning goals, supervision and practical arrangements."
        items={opportunityCards(opportunities)}
        cta={{ href: "/opportunities", label: "View all opportunities" }}
        bg="bg-[var(--water-50)]"
      />

      {/* ===== 4. Start dates ===== */}
      {dates.length > 0 ? (
        <ProgramDatesTable
          eyebrow="Program dates"
          title="Start dates"
          intro="Placements are scheduled individually. Confirmed intake windows appear below; timing, support and costs are always confirmed in writing before placement."
          rows={dates}
          bg="bg-[var(--accent-50)]"
          firstLabel="Intake"
          secondLabel="Details"
        />
      ) : (
        <section className="bg-[var(--accent-50)] py-16 md:py-24" aria-label="Start dates">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeader
                eyebrow="Program dates"
                title="Start dates"
                intro="Placements are scheduled individually — matched to community priorities, partner availability and your learning objectives. Confirmed intake windows will appear here once scheduled; timing, support and costs are always confirmed in writing before placement."
                align="center"
              />
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/apply?type=guidance">Request placement guidance</Button>
                <Button href="/opportunities" variant="secondary">Explore opportunities</Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== 5. Testimonials (published only) ===== */}
      <TestimonialCarousel
        eyebrow="Participant voices"
        title="What participants say"
        intro="Stories from alumni of FOSCOD placements. Each published story has a named participant and confirmed permission."
        items={carouselTestimonials.map((t) => ({ quote: t.quote, name: t.name, program: t.program, cohort: t.cohort }))}
        cta={{ href: "/testimonials", label: "Read all testimonials" }}
        bg="bg-[var(--surface-2)]"
      />

      {/* ===== 6. Application details ===== */}
      <div className="bg-[var(--accent-100)]">
        <ApplySection
          title={applySection.title}
          eyebrow={applySection.eyebrow}
          body={applySection.body}
          imageUrl={applySection.imageUrl}
          imageAlt={applySection.imageAlt}
          ctaLabel={applySection.ctaLabel}
          ctaHref={applySection.ctaHref}
          bg="bg-[var(--accent-100)]"
        />

        <section className="pb-16 md:pb-24" aria-label="Before you apply">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-[clamp(1.7rem,3vw,2.3rem)]">Questions responsible participants ask</h2>
              <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">
                Open roles should name their purpose, boundaries, expected outputs, supervisor, timing, requirements, and costs. If a detail is still being verified, FOSCOD will confirm it before placement.
              </p>
            </div>
            <div className="mt-10">
              <FAQ items={gleFaqs} />
            </div>
          </div>
        </section>

        <CTABand
          bg="bg-[var(--accent-100)]"
          title="Begin your GLE journey"
          body="Explore opportunities that match your interests and learning objectives, request placement guidance, or partner your institution. Submitting an application starts a matching process — it does not guarantee acceptance or a particular host."
          actions={[
            { href: "/opportunities", label: "Explore opportunities" },
            { href: "/apply?type=guidance", label: "Request placement guidance", variant: "secondary" },
            { href: "/partners", label: "Partner your institution", variant: "ghost" },
          ]}
          tightBottom
        />
      </div>
    </>
  );
}
