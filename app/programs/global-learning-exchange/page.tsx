import { HeroSlider } from "@/components/site/HeroSlider";
import {
  IntroSection,
  ApplySection,
  FeatureGrid,
  Steps,
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
  getGleDevelopmentSectors,
  getGleEngagementApproaches,
  getGleParticipationFormats,
  type GleDevelopmentSector,
  type GleTaxonomyItem,
} from "@/lib/content";

export const metadata = pageMeta(
  "Global Learning Exchange Program (GLE)",
  "FOSCOD's Global Learning Exchange Program (GLE) designs and facilitates internships, volunteering, research, service learning and study tours in collaboration with local communities and partner organizations in Uganda."
);

/* "How we develop your GLE experience" — the five phases from the
   approved program description. */
const experiencePhases = [
  { title: "Understanding your interests", body: "We review your academic background, skills, learning objectives and preferred program options." },
  { title: "Identifying suitable opportunities", body: "We explore community priorities, available projects, research needs and potential host organizations." },
  { title: "Collaborative placement planning", body: "We agree on activities, learning objectives, responsibilities, supervision, expected outputs and ethical requirements." },
  { title: "Supported engagement & learning", body: "FOSCOD provides orientation, mentorship, practical guidance, monitoring and opportunities for reflection." },
  { title: "Knowledge sharing & continuity", body: "We review outcomes with community partners, share findings and document lessons to support continuing development." },
];

const gleFaqs = [
  { q: "Who defines the work?", a: "FOSCOD develops roles from priorities identified with communities and local partners. An applicant's interests help with matching, but do not replace the community-defined purpose of the work." },
  { q: "Do I need previous experience?", a: "Requirements depend on the role. Observation and learning activities may be suitable for beginners; research, technical, health-related, or direct community work requires relevant preparation and closer review." },
  { q: "What support is included?", a: "The current program brief confirms the named supervisor, orientation, accommodation arrangement, local transport, emergency contact, and other support for that specific intake. Services are not assumed until confirmed in writing." },
  { q: "Can my institution award academic credit?", a: "FOSCOD can work with an institution to align activities and evidence of learning. The home institution remains responsible for approving academic credit." },
  { q: "How are safeguarding and respectful storytelling handled?", a: "Participants must follow role boundaries, consent requirements, the code of conduct, and rules for photography, stories, personal data, and research data. Current checks depend on the placement." },
  { q: "I'm not sure which program suits me — can I ask for guidance?", a: "Yes. Request placement guidance in the application form or contact FOSCOD, and we will help you identify an appropriate program type, thematic area and engagement approach." },
  { q: "Does applying guarantee a placement?", a: "No. Submitting an application starts a matching process that considers community priorities, partner availability and program requirements — it does not guarantee acceptance or a particular host organization." },
];

function StepBlock({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-14 first:mt-10">
      <div className="flex items-baseline gap-3">
        <span className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.14em] text-[var(--accent-700)]">
          Step {step}
        </span>
        <h3 className="text-xl font-semibold md:text-2xl">{title}</h3>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function SectorList({ sectors, category }: { sectors: GleDevelopmentSector[]; category: "cedp" | "partner" }) {
  const items = sectors.filter((s) => s.category === category);
  if (category === "cedp") {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((s) => (
          <div key={s.slug} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="font-semibold">{s.title}</p>
            {s.description && (
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{s.description}</p>
            )}
          </div>
        ))}
      </div>
    );
  }
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((s) => (
        <li
          key={s.slug}
          className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm"
        >
          {s.title}
        </li>
      ))}
    </ul>
  );
}

function ApproachOrFormatList({ items, columns }: { items: GleTaxonomyItem[]; columns: 1 | 3 }) {
  return (
    <div className={`grid gap-4 ${columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {items.map((a) => (
        <div key={a.slug} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="font-semibold">{a.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{a.description}</p>
        </div>
      ))}
    </div>
  );
}

export default async function GlePage() {
  const [heroSlides, introduction, pathways, sectors, approaches, formats, applySection] =
    await Promise.all([
      getHeroSlides("global-learning-exchange"),
      getGleIntroduction(),
      getGlePathways(),
      getGleDevelopmentSectors(),
      getGleEngagementApproaches(),
      getGleParticipationFormats(),
      getGleApplySection(),
    ]);

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* 2. Introduction — the approved program description (CMS) */}
      <IntroSection
        title={introduction.title}
        eyebrow={introduction.eyebrow}
        body={introduction.body}
        imageUrl={introduction.imageUrl}
        imageAlt={introduction.imageAlt}
        ctaLabel={introduction.ctaLabel}
        ctaHref={introduction.ctaHref}
      />

      {/* 3. Explore your opportunities in four steps */}
      <section className="bg-[var(--surface-2)] py-16 md:py-24">
        <div className="container-page">
          <SectionHeader
            eyebrow="Explore GLE opportunities"
            title="Explore your opportunities in four steps"
            intro="GLE offers diverse learning and engagement opportunities through FOSCOD's Community Empowerment and Development Program (CEDP) and a network of local partner organizations. Programs are designed to align participants' academic and professional learning objectives with community priorities, local knowledge and partner expertise."
            align="center"
          />

          {/* Step 1 — program type */}
          <StepBlock step="1" title="Choose your program type">
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
                icon: p.icon,
                tone: p.tone,
                tag: p.tag,
              }))}
            />
          </StepBlock>

          {/* Step 2 — thematic interests (multiple selections allowed) */}
          <StepBlock step="2" title="Choose your thematic areas">
            <p className="max-w-3xl text-[var(--ink-soft)]">
              Participants may select one or more thematic interests from FOSCOD's program and its local
              partner organizations. Placement opportunities depend on partner availability, program
              requirements and agreed learning objectives.
            </p>
            <div className="mt-6 space-y-8">
              <div>
                <p className="mb-3 font-medium">A. FOSCOD&apos;s Community Empowerment and Development Program (CEDP)</p>
                <SectorList sectors={sectors} category="cedp" />
              </div>
              <div>
                <p className="mb-3 font-medium">B. Local partner organizations&apos; development sectors</p>
                <SectorList sectors={sectors} category="partner" />
              </div>
            </div>
          </StepBlock>

          {/* Step 3 — engagement approach (complementary emphases) */}
          <StepBlock step="3" title="Choose your engagement approach">
            <p className="max-w-3xl text-[var(--ink-soft)]">
              The three approaches are complementary — a participant may select a primary focus or pursue an
              integrated experience, depending on community priorities, learning objectives and placement
              opportunities.
            </p>
            <div className="mt-6">
              <ApproachOrFormatList items={approaches} columns={3} />
            </div>
            <p className="mt-6 max-w-3xl rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-relaxed text-[var(--ink-soft)]">
              <strong>For service-learning trips and study tours:</strong> instead of a research or project
              classification, participants or sponsoring institutions identify their preferred thematic areas
              and learning objectives. FOSCOD collaborates with institutions and local partners to design
              suitable experiences that may combine community development practice, participatory learning,
              research exposure, reflection and cultural exchange.
            </p>
          </StepBlock>

          {/* Step 4 — participation format */}
          <StepBlock step="4" title="Choose your participation format">
            <ApproachOrFormatList items={formats} columns={1} />
          </StepBlock>
        </div>
      </section>

      {/* 4. Ethical commitment + how the experience is developed */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Our commitment to ethical community engagement</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">
              Communities and participants are active partners
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              FOSCOD&apos;s community-engaged learning is grounded in meaningful participation, mutual respect,
              shared responsibility and sustainable development. We recognize communities, participants, host
              organizations and sponsoring institutions as active partners who bring valuable knowledge, skills
              and experiences. Our approach promotes locally defined priorities, community ownership,
              reciprocal learning and responsible contributions that generate value for all partners and
              strengthen development beyond individual placements.
            </p>
          </div>
          <div className="mt-10">
            <SectionHeader
              eyebrow="How we develop your GLE experience"
              title="From interests to lasting outcomes"
              align="center"
            />
            <div className="mt-10">
              <Steps steps={experiencePhases} />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Apply */}
      <ApplySection
        title={applySection.title}
        eyebrow={applySection.eyebrow}
        body={applySection.body}
        imageUrl={applySection.imageUrl}
        imageAlt={applySection.imageAlt}
        ctaLabel={applySection.ctaLabel}
        ctaHref={applySection.ctaHref}
      />

      {/* 6. Before you apply */}
      <section className="bg-[var(--surface-2)] py-16 md:py-20">
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

      {/* 7. CTA band */}
      <section className="py-16 md:py-20">
        <div className="container-page">
          <CTABand
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
      </section>
    </>
  );
}
