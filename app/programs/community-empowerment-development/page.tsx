import { HeroSlider } from "@/components/site/HeroSlider";
import { Prose, CTABand, CardsCarousel, type GridCard } from "@/components/site/blocks";
import { Section, SectionHeader } from "@/components/site/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContentCard } from "@/components/ui/ContentCard";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { pageMeta } from "@/lib/seo";
import { getCedpAreasOfFocus, getCedpImpactCards, getCedpHeroSlides, getCedpAccomplishments, type CedpAccomplishment } from "@/lib/content";

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

function accomplishmentTone(areaSlug: string | null): "earth" | "water" | "forest" {
  if (areaSlug === "clean-energy-climate-resilience") return "earth";
  if (areaSlug === "water-sanitation-community-health") return "water";
  return "forest";
}

function completionLabel(a: CedpAccomplishment): string {
  if (!a.period) return "";
  if (a.kind === "output") return `Completed ${a.period}`;
  return a.period;
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

  // Delivered projects lead, followed by work still continuing.
  const projectCards: GridCard[] = [...delivered, ...continuing].map((a) => ({
    title: a.title,
    excerpt: a.description,
    imageUrl: a.imageUrl ?? undefined,
    imageAlt: a.imageAlt ?? a.title,
    tone: accomplishmentTone(a.areaSlug),
    meta: completionLabel(a),
  }));

  return (
    <>
      {/* 1. Hero (kept as-is) */}
      <HeroSlider slides={heroSlides} />

      {/* 2. Model — teal/mint brand surface */}
      <section className="bg-[var(--surface-2)] py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>The model</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">
              An integrated development approach anchored in place
            </h2>
          </div>
          <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
            <div>
              <PhotoSlot
                tone="earth"
                ratio="4/3"
                imageUrl="/images/cedp/model.jpg"
                alt="Integrated community development in Kalagala Parish"
                caption="Integrated community development in Kalagala Parish"
                className="shadow-[var(--shadow-md)]"
              />
            </div>
            <Prose>
              <p>
                CEDP is FOSCOD&apos;s place-based development program that supports underserved communities to identify their priorities, strengthen local capacities and lead collaborative solutions to development challenges.
              </p>
              <p>
                Grounded in ethical community engagement, local leadership and environmental sustainability, the program promotes lasting improvements in community well-being and livelihoods through <strong>three integrated focus areas</strong> across <strong>Kalagala Parish&apos;s five communities</strong> in Wakisi Division, Njeru Municipality, Buikwe District: Kalagala, Kyambogo, Naluvule, Wabusanke, and Byabuku — a peri-urban zone bordering Mabira Forest where rural and municipal service-delivery gaps overlap.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      {/* 3. Areas of focus — white */}
      <Section>
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
                tag={card.tag}
                asLink={Boolean(card.ctaHref)}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Evidence — delivered & continuing projects as a one-row looping slider */}
      <CardsCarousel
        bg="bg-[var(--surface-2)]"
        eyebrow="Evidence"
        title="What communities have achieved with FOSCOD's support"
        intro="Reported accomplishments in Kalagala Parish, 2022 – October 2026. Delivered projects are shown first, followed by work still continuing. Source: FOSCOD contribution to the Wakisi Division budget conference, submitted by the Executive Director, November 2026."
        items={projectCards}
      />

      {/* 4b. Future priorities — compact note */}
      {future.length > 0 && (
        <section className="bg-[var(--surface)] pb-16 md:pb-24">
          <div className="container-page">
            <div className="mx-auto max-w-3xl rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-2)] p-6">
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
          </div>
        </section>
      )}

      {/* 5. Geography — its own section, pale mint */}
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

      {/* 6. CEDP Impact — white, one-row, touch-friendly looping carousel */}
      <CardsCarousel
        bg="bg-[var(--surface)]"
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
          tag: c.tag,
          ctaLabel: c.ctaLabel,
        }))}
      />

      {/* 7. Support community-led development — teal/mint brand surface */}
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
