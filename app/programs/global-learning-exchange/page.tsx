import { HeroSlider } from "@/components/site/HeroSlider";
import {
  IntroSection,
  ApplySection,
  TestimonialCarousel,
  FeatureGrid,
  CheckList,
  Steps,
  ProgramDatesTable,
  CTABand,
  FAQ,
} from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeader } from "@/components/site/Section";
import { pageMeta } from "@/lib/seo";
import {
  getHeroSlides,
  getGlePathways,
  getGleIntroduction,
  getGleApplySection,
  getProgramDates,
  getAlumniExperiences,
  getPartners,
  type Partner,
} from "@/lib/content";

export const metadata = pageMeta(
  "Global Learning & Exchange (GLE)",
  "FOSCOD's Global Learning and Exchange program connects students, professionals, researchers, and groups with structured field learning in Uganda."
);

const ethicalSteps = [
  { title: "Listen & define", body: "FOSCOD and local partners identify a useful question, project, or role before recruitment." },
  { title: "Match & prepare", body: "We review fit, agree boundaries and outputs, and confirm the preparation and support required." },
  { title: "Work with guidance", body: "Participants contribute under FOSCOD staff & community-partner direction, with regular reflection." },
  { title: "Hand over", body: "Work, data, materials, and unfinished actions are documented for continuity after departure." },
  { title: "Review together", body: "Participant learning and community value should both inform the next cycle." },
];

const internVolunteerItems = [
  "Application review & matching to community priorities",
  "Role-specific cultural, ethical, safety, and technical preparation",
  "Accommodation, transport, and support confirmed in the current intake brief",
  "Supervised field work with FOSCOD staff & community mentors",
  "Ethical development practice standards & reflection sessions",
  "Debrief, handover, and completion record agreed for the role",
];

const partnerItems = [
  "Partnership scope, roles, costs, and review points documented in writing",
  "Co-designed programs aligned to academic calendars & learning outcomes",
  "Faculty-led group roles, risk ownership, accessibility, and support agreed in advance",
  "Community-Based Participatory Research (CBPR) collaboration",
  "Research ethics, data, authorship, dissemination, and local feedback agreed in advance",
];

const gleFaqs = [
  { q: "Who defines the work?", a: "FOSCOD develops roles from priorities identified with communities and local partners. An applicant's interests help with matching, but do not replace the community-defined purpose of the work." },
  { q: "Do I need previous experience?", a: "Requirements depend on the role. Observation and learning activities may be suitable for beginners; research, technical, health-related, or direct community work requires relevant preparation and closer review." },
  { q: "What support is included?", a: "The current program brief confirms the named supervisor, orientation, accommodation arrangement, local transport, emergency contact, and other support for that specific intake. Services are not assumed until confirmed in writing." },
  { q: "Can my institution award academic credit?", a: "FOSCOD can work with an institution to align activities and evidence of learning. The home institution remains responsible for approving academic credit." },
  { q: "How are safeguarding and respectful storytelling handled?", a: "Participants must follow role boundaries, consent requirements, the code of conduct, and rules for photography, stories, personal data, and research data. Current checks depend on the placement." },
  { q: "How is community benefit assessed?", a: "The intended community value is agreed during design, then reviewed through outputs, partner feedback, handover, and appropriate project indicators—not participant satisfaction alone." },
];

export default async function GlePage() {
  const [heroSlides, introduction, pathways, applySection, dates, alumni, partnersData] = await Promise.all([
    getHeroSlides("global-learning-exchange"),
    getGleIntroduction(),
    getGlePathways(),
    getGleApplySection(),
    getProgramDates(),
    getAlumniExperiences(),
    getPartners(),
  ]);

  return (
    <>
      {/* 1. Hero (kept as-is) */}
      <HeroSlider slides={heroSlides} />

      {/* 2. Introduction — white (title on top, image-left, text-right) */}
      <IntroSection
        title={introduction.title}
        eyebrow={introduction.eyebrow}
        body={introduction.body}
        imageUrl={introduction.imageUrl}
        imageAlt={introduction.imageAlt}
        ctaLabel={introduction.ctaLabel}
        ctaHref={introduction.ctaHref}
      />

      {/* 3. Find your pathway — mint (2×2 grid with images) */}
      <section className="bg-[var(--surface-2)] py-16 md:py-24">
        <div className="container-page">
          <SectionHeader
            eyebrow="Find your pathway"
            title="One program, different levels of responsibility"
            intro="Choose the route that fits your role. Dates, fees, supervision, and deliverables are confirmed for each approved intake or partnership."
            align="center"
          />
          <div className="mt-12">
            <FeatureGrid
              columns={2}
              items={pathways.map((p) => ({
                title: p.title,
                body: p.body,
                href: p.href,
                cta: p.cta,
                kicker: p.kicker,
                imageUrl: p.imageUrl,
                imageAlt: p.imageAlt,
              }))}
            />
          </div>
        </div>
      </section>

      {/* 4. Ethical commitment — white (centered heading) */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Our ethical commitment</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">
              Learning and community value must travel together
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Good global learning balances participant development with community direction, local expertise, reciprocity, safeguarding, and continuity. FOSCOD uses that standard to shape each role and partnership.
            </p>
          </div>
          <div className="mt-10">
            <Steps steps={ethicalSteps} />
          </div>
          <p className="mt-6 text-center text-sm leading-relaxed text-[var(--muted)]">
            Practice context:{" "}
            <a
              className="text-[var(--accent-700)] underline"
              href="https://compact.org/news/fair-trade-learning"
              target="_blank"
              rel="noreferrer"
            >
              Fair Trade Learning standards
            </a>
            {" "}emphasise both community outcomes and student learning, with community voice and direction throughout program design.
          </p>
        </div>
      </section>

      {/* 5. How it works — mint (centered heading, dot bullets) */}
      <section className="bg-[var(--surface-2)] py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">
              Two pathways, one standard of support
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8">
              <h3 className="text-center text-xl font-semibold">For Interns & Volunteers</h3>
              <div className="mt-4">
                <CheckList items={internVolunteerItems} columns={1} />
              </div>
            </div>
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8">
              <h3 className="text-center text-xl font-semibold">For Universities & Partners</h3>
              <div className="mt-4">
                <CheckList items={partnerItems} columns={1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Apply — white (title, image-left, statement + CTA on right) */}
      <ApplySection
        title={applySection.title}
        eyebrow={applySection.eyebrow}
        body={applySection.body}
        imageUrl={applySection.imageUrl}
        imageAlt={applySection.imageAlt}
        ctaLabel={applySection.ctaLabel}
        ctaHref={applySection.ctaHref}
      />

      {/* 7. Start dates — mint (table format) */}
      <ProgramDatesTable
        eyebrow="Program dates"
        title="Upcoming intakes & partners"
        rows={dates}
        surface
      />

      {/* 8. Alumni testimonial carousel — white (3 per slide) */}
      <TestimonialCarousel
        eyebrow="Alumni testimonies"
        title="From people who've been there"
        items={alumni}
      />

      {/* 9. Partner institutions — mint (immediately after testimonials) */}
      <section className="bg-[var(--surface-2)] py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Partner institutions</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">
              Universities & organizations that trust FOSCOD
            </h2>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {partnersData.map((p: Partner) => (
              <div key={p.name} className="flex items-center gap-3">
                {p.logo_url ? (
                  <img
                    src={p.logo_url}
                    alt={p.logo_alt || p.name}
                    className="h-12 w-12 rounded-full object-cover"
                    loading="lazy"
                    width={48}
                    height={48}
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-100)]">
                    <span className="font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.12em] text-[var(--accent-700)]">
                      {p.name.split(" ")[0].charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-medium">{p.name.split(" via")[0]}</p>
                  <p className="text-sm text-[var(--muted)]">{p.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Before you apply — white (kept at end) */}
      <section className="py-16 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Before you apply</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">
              Questions responsible participants ask
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">
              Open roles should name their purpose, boundaries, expected outputs, supervisor, timing, requirements, and costs. If a detail is still being verified, FOSCOD will confirm it before placement.
            </p>
          </div>
          <div className="mt-10">
            <FAQ items={gleFaqs} />
          </div>
        </div>
      </section>

      {/* 11. CTA Block — mint */}
      <section className="bg-[var(--surface-2)] py-16 md:py-20">
        <div className="container-page">
          <CTABand
            title="Ready to check your fit?"
            body="Compare pathways, review the current role details, then send an application for the FOSCOD team to assess. Institutions can request a co-design conversation."
            actions={[
              { href: "/apply", label: "Apply today" },
              { href: "/programs/finder", label: "Find your program", variant: "secondary" },
              { href: "/partners", label: "Partner your institution", variant: "ghost" },
            ]}
          />
        </div>
      </section>
    </>
  );
}
