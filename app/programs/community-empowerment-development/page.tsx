import { HeroSlider } from "@/components/site/HeroSlider";
import { SplitSection, Prose, Steps, CardGrid, CTABand } from "@/components/site/blocks";
import { Section, SectionHeader } from "@/components/site/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import {
  getCedpAreasOfFocus,
  getCedpImpactStoryCards,
  getCedpImpactCards,
  getCedpHeroSlides,
} from "@/lib/content";

const approach = [
  { title: "Community assessment", body: "We start by listening — mapping needs and assets together with residents." },
  { title: "Asset-based co-design", body: "Solutions are designed with communities, not imposed — using local knowledge and resources." },
  { title: "Implementation", body: "Delivered with local organizations, global participants, and 25% community co-contribution." },
  { title: "Monitoring & reporting", body: "Honest measurement and transparent reporting against verified indicators." },
  { title: "Local ownership", body: "Communities own and sustain what's built — 86% of completed projects continue independently." },
];

export const metadata = pageMeta(
  "Community Empowerment & Development Program (CEDP)",
  "CEDP supports underserved communities in Uganda to lead practical solutions in clean energy, environment, livelihoods, health, WASH, and inclusion."
);

const kalagalaCommunities = [
  { name: "Kalagala", description: "Parish center, market access" },
  { name: "Kyambogo", description: "Agricultural heartland" },
  { name: "Naluvule", description: "Water spring & solar pilot site" },
  { name: "Wabusanke", description: "Bordering Mabira Forest" },
  { name: "Byabuku", description: "Peri-urban, forest-edge community" },
];

export default async function CedpPage() {
  const [heroSlides, areasOfFocus, impactStoryCards, impactCards] =
    await Promise.all([
      getCedpHeroSlides(),
      getCedpAreasOfFocus(),
      getCedpImpactStoryCards(),
      getCedpImpactCards(),
    ]);

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
            Launched in 2022, CEDP expanded FOSCOD's community work into an integrated development model where environmental sustainability and renewable energy sit at the center of local transformation.
          </p>
          <p>
            The program works across six interlinked sub-programs — each corresponding to a Strategic Goal in the 2026–2030 plan — across <strong>Kalagala Parish's five communities</strong>: Kalagala, Kyambogo, Naluvule, Wabusanke, and Byabuku. These communities sit in a peri-urban zone bordering Mabira Forest, where rural and urban service delivery gaps overlap.
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
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {areasOfFocus.map((card) => (
            <div
              key={card.title}
              className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <PhotoSlot
                tone="forest"
                ratio="16/9"
                caption={card.imageAlt || card.title}
                imageUrl={card.imageUrl}
                alt={card.imageAlt}
                className="mb-4"
              />
              <h3 className="text-xl leading-snug">{card.title}</h3>
              <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-[var(--muted)]">
                {card.description}
              </p>
              {card.ctaHref && card.ctaLabel && (
                <Button href={card.ctaHref} variant="secondary" size="sm" className="mt-4">
                  {card.ctaLabel}
                </Button>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* 4. From priority to ownership — white */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>From priority to ownership</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">How a community-led project should move</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              The sequence keeps local knowledge, delivery roles, evidence, and long-term responsibility in the same conversation.
            </p>
          </div>
          <div className="mt-10"><Steps steps={approach} /></div>
        </div>
      </section>

      {/* 5. Geography — mint (kept as-is) */}
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

      {/* 6. Impacts — white */}
      <CardGrid
        eyebrow="Impacts"
        title="Stories of community-led change"
        intro="Real outcomes from projects across Kalagala Parish — each driven by community priorities and sustained by local ownership."
        items={impactStoryCards.map((c) => ({
          title: c.title,
          excerpt: c.excerpt,
          href: c.href,
          tone: "forest" as const,
          imageUrl: c.imageUrl,
          imageAlt: c.imageAlt,
        }))}
      />

      {/* 7. Cross-cutting commitments — mint (kept as-is) */}
      <section className="bg-[var(--surface-2)] py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Cross-cutting commitments</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Principles that apply to every sub-program</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
              <div className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--accent-700)]">25%</div>
              <h3 className="mt-2 text-xl">Community Co-contribution</h3>
              <p className="mt-2 text-[var(--ink-soft)]">Labour, materials, or cash — communities invest in every project, ensuring ownership and sustainability.</p>
            </div>
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
              <div className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--accent-700)]">50%</div>
              <h3 className="mt-2 text-xl">Women's Participation</h3>
              <p className="mt-2 text-[var(--ink-soft)]">Target across all initiatives — from enterprise leadership to climate ambassador roles to training cohorts.</p>
            </div>
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
              <div className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--accent-700)]">86%</div>
              <h3 className="mt-2 text-xl">Sustained Community Benefit</h3>
              <p className="mt-2 text-[var(--ink-soft)]">Verified share of completed projects that continue to benefit communities independently.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CEDP Impact — white */}
      <CardGrid
        eyebrow="CEDP impact"
        title="Impact cards from community-led work"
        intro="Verified outcomes from projects across clean energy, water, and livelihoods — each reflecting the priorities communities set for themselves."
        items={impactCards.map((c) => ({
          title: c.title,
          excerpt: c.excerpt,
          href: c.href,
          tone: "water" as const,
          kicker: c.verifiedOutcome,
          imageUrl: c.imageUrl,
          imageAlt: c.imageAlt,
        }))}
      />

      {/* 9. Support community-led development — mint */}
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
        />
        </div>
      </section>
    </>
  );
}
