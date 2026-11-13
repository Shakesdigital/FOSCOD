import { HeroSlider } from "@/components/site/HeroSlider";
import { SplitSection, Prose, Steps, CardGrid, CTABand } from "@/components/site/blocks";
import { Section, SectionHeader } from "@/components/site/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContentCard } from "@/components/ui/ContentCard";
import { pageMeta } from "@/lib/seo";
import { getCedpAreasOfFocus, getCedpImpactCards, getCedpHeroSlides, getCedpAccomplishments, type CedpAccomplishment } from "@/lib/content";

const approach = [
  { title: "Community assessment", body: "We start by listening — mapping needs and assets together with residents." },
  { title: "Asset-based co-design", body: "Solutions are designed with communities, not imposed — using local knowledge and resources." },
  { title: "Implementation", body: "Delivered with local organizations, global participants, and 25% community co-contribution." },
  { title: "Monitoring & reporting", body: "Honest measurement and transparent reporting against verified indicators." },
  { title: "Local ownership", body: "Communities own and sustain what's built — 86% of completed projects continue independently." },
];

export const metadata = pageMeta(
  "Community Empowerment and Development Program (CEDP)",
  "CEDP is FOSCOD's place-based development program that supports underserved communities to identify their priorities, strengthen local capacities and lead collaborative solutions in Kalagala Parish, Buikwe District."
);

const kalagalaCommunities = [
  { name: "Kalagala", description: "Parish center, market access" },
  { name: "Kyambogo", description: "Agricultural heartland" },
  { name: "Naluvule", description: "Water spring & solar pilot site" },
  { name: "Wabusanke", description: "Bordering Mabira Forest" },
  { name: "Byabuku", description: "Peri-urban, forest-edge community" },
];

function AccomplishmentItem({ a }: { a: CedpAccomplishment }) {
  return (
    <li className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="font-semibold">{a.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{a.description}</p>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.72rem] text-[var(--muted)]">
        {a.period && <span>{a.period}</span>}
        {a.attribution && <span>{a.attribution}</span>}
      </div>
    </li>
  );
}

export default async function CedpPage() {
  const [heroSlides, areasOfFocus, impactCards, accomplishments] =
    await Promise.all([
      getCedpHeroSlides(),
      getCedpAreasOfFocus(),
      getCedpImpactCards(),
      getCedpAccomplishments(),
    ]);

  const delivered = accomplishments.filter((a) => a.kind === "output");
  const continuing = accomplishments.filter((a) => a.kind === "continuing");
  const future = accomplishments.filter((a) => a.kind === "future");

  /* ------------------------------------------------------------------ */
  /* Section backgrounds alternate: white → mint → white → mint → etc.  */
  /*   white  = no inline bg  (defaults to --bg)                         */
  /*   mint   = bg-[var(--surface-2)]  (#eaf5ee)                         */
  /* ------------------------------------------------------------------ */

  return (
    <>
      {/* 1. Hero (kept as-is) */}
      <HeroSlider slides={heroSlides} />

      {/* 2. Model description — white */}
      <SplitSection eyebrow="The model" title="An integrated development approach anchored in place">
        <Prose>
          <p>
            CEDP is FOSCOD&apos;s place-based development program that supports underserved communities to identify their priorities, strengthen local capacities and lead collaborative solutions to development challenges.
          </p>
          <p>
            Grounded in ethical community engagement, local leadership and environmental sustainability, the program promotes lasting improvements in community well-being and livelihoods through <strong>three integrated focus areas</strong> across <strong>Kalagala Parish&apos;s five communities</strong> in Wakisi Division, Njeru Municipality, Buikwe District: Kalagala, Kyambogo, Naluvule, Wabusanke, and Byabuku — a peri-urban zone bordering Mabira Forest where rural and municipal service-delivery gaps overlap.
          </p>
        </Prose>
      </SplitSection>

      {/* 3. Areas of focus — mint */}
      <Section surface>
        <SectionHeader
          eyebrow="Areas of focus"
          title="Lasting change rarely fits into one sector"
          intro="Energy affects health and enterprise. Water affects time, dignity, and livelihoods. Inclusion affects whose priorities shape every decision. CEDP keeps those connections visible while each area of focus has its own outcomes and evidence."
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areasOfFocus.map((card) => (
            <div key={card.title} className="group h-full">
              <ContentCard
                title={card.title}
                excerpt={card.description}
                href={card.ctaHref}
                ctaLabel={card.ctaLabel}
                imageRatio="16/9"
                tone={card.tone ?? "forest"}
                imageUrl={card.imageUrl}
                imageAlt={card.imageAlt}
                icon={card.icon}
                tag={card.tag}
                asLink={Boolean(card.ctaHref)}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Accomplishments — white */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Evidence</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">
              What communities have achieved with FOSCOD&apos;s support
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Reported accomplishments in Kalagala Parish, 2022 – October 2026. Outputs are reported
              separately from measured changes in health, income or the environment; community and partner
              contributions are credited throughout. Source: FOSCOD contribution to the Wakisi Division budget
              conference, submitted by the Executive Director, November 2026.
            </p>
          </div>
          <div className="mt-12 space-y-10">
            {delivered.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold">Delivered</h3>
                <ul className="mt-5 grid gap-4 md:grid-cols-2">
                  {delivered.map((a) => (
                    <AccomplishmentItem key={a.title} a={a} />
                  ))}
                </ul>
              </div>
            )}
            {continuing.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold">Continuing</h3>
                <ul className="mt-5 grid gap-4 md:grid-cols-2">
                  {continuing.map((a) => (
                    <AccomplishmentItem key={a.title} a={a} />
                  ))}
                </ul>
              </div>
            )}
            {future.length > 0 && (
              <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-2)] p-6">
                <h3 className="text-lg font-semibold">Future priorities (indicative)</h3>
                <div className="mt-3 space-y-3">
                  {future.map((a) => (
                    <p key={a.title} className="text-sm leading-relaxed text-[var(--ink-soft)]">
                      <span className="font-medium text-[var(--ink)]">{a.title}. </span>
                      {a.description}
                    </p>
                  ))}
                </div>
                <p className="mt-4 text-xs text-[var(--muted)]">
                  FY 2027/28 priorities are indicative and subject to funding, community participation,
                  technical feasibility, partner commitments and applicable approvals.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Geography — mint */}
      <section className="bg-[var(--surface-2)] py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Geography</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Kalagala Parish: five communities, one program</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Click a community to explore active projects. Naluvule hosts our solar-powered water system pilot; Wabusanke and Byabuku border Mabira Forest for ecosystem restoration work.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {kalagalaCommunities.map((c) => (
              <div
                key={c.name}
                className="relative group rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
              >
                <h3 className="text-lg font-semibold">{c.name}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{c.description}</p>
                <div className="mt-4 pt-4 border-t border-[var(--border)]">
                  <a href={`/projects?community=${c.name.toLowerCase()}`} className="text-sm font-medium text-[var(--accent-700)] hover:underline">
                    View projects →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CEDP Impact — mint */}
      <CardGrid
        surface
        eyebrow="CEDP impact"
        title="Impact cards from community-led work"
        intro="Verified outcomes from projects across clean energy, water, and livelihoods — each reflecting the priorities communities set for themselves."
        items={impactCards.map((c) => ({
          title: c.title,
          excerpt: c.excerpt,
          href: c.href,
          tone: c.tone ?? ("water" as const),
          kicker: c.verifiedOutcome,
          imageUrl: c.imageUrl,
          imageAlt: c.imageAlt,
          icon: c.icon,
          tag: c.tag,
          ctaLabel: c.ctaLabel,
        }))}
      />

      {/* 8. Support community-led development — mint */}
      <section className="bg-[var(--surface-2)] py-16 md:py-24">
        <div className="container-page">
          <CTABand
            title="Support community-led development"
            body="Partner on a flagship project, fund priority work, or join as an intern or volunteer."
            actions={[
              { href: "/partners", label: "Partner with us" },
              { href: "/donate", label: "Donate to a project", variant: "secondary" },
              { href: "/projects", label: "Explore projects", variant: "ghost" },
            ]}
            tightBottom
          />
        </div>
      </section>
    </>
  );
}
