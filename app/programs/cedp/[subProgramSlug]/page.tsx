import { PageHero } from "@/components/site/PageHero";
import { SplitSection, Prose, CardGrid, CTABand, FeatureGrid } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { pageMeta } from "@/lib/seo";
import { getSubPrograms, getActivitiesBySubProgram, getImpactStats, getImpactStories, getFeaturedProjects } from "@/lib/content";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ subProgramSlug: string }> }) {
  const { subProgramSlug } = await params;
  const subPrograms = await getSubPrograms();
  const subProgram = subPrograms.find((sp) => sp.slug === subProgramSlug);
  if (!subProgram) return { title: "Sub-program not found" };
  return pageMeta(
    subProgram.name,
    subProgram.description || `CEDP Sub-program: ${subProgram.name} — Strategic Goal ${subProgram.strategic_goal}`
  );
}

const subProgramCTAs: Record<string, { label: string; href: string }> = {
  "green-skills-renewable-energy": { label: "Support Green Skills training", href: "/donate?program=green-skills" },
  "clean-cooking-health": { label: "Fund a household clean cookstove", href: "/donate?program=clean-cooking" },
  "water-sanitation-hygiene": { label: "Support a spring protection project", href: "/donate?program=wash" },
  "green-livelihoods-economic-empowerment": { label: "Invest in a green enterprise", href: "/donate?program=livelihoods" },
  "inclusive-leadership": { label: "Sponsor a youth climate ambassador", href: "/donate?program=leadership" },
  "ecosystem-restoration-carbon-offsets": { label: "Support reforestation & carbon offsets", href: "/donate?program=ecosystem" },
};

const strategicGoals: Record<number, string> = {
  1: "Build community capacity in renewable energy technologies and green entrepreneurship through certified training centers.",
  2: "Reduce household air pollution and deforestation through clean cooking solutions and carbon finance.",
  3: "Achieve universal access to safe water and sanitation through community-owned infrastructure and governance.",
  4: "Grow inclusive green economies via agroforestry, savings groups, and climate-smart enterprise.",
  5: "Empower women and youth as climate leaders and decision-makers in community development.",
  6: "Restore degraded ecosystems and generate verified carbon credits through community conservation.",
};

const target2030: Record<string, string[]> = {
  "green-skills-renewable-energy": [
    "5 community training centers established",
    "2,500+ people trained in renewable energy technologies",
    "Technical partnerships and certification pathways strengthened",
  ],
  "clean-cooking-health": [
    "5,000 households transitioned to clean energy solutions",
    "Women/youth-led stove production enterprises",
    "Carbon credit registration & community reinvestment",
  ],
  "water-sanitation-hygiene": [
    "Water access expanded through solar-powered systems, protected springs, and rainwater harvesting",
    "Community-Led Total Sanitation implemented across the 5 Kalagala Parish communities",
    "WASH committees trained in governance, maintenance, and water-quality monitoring",
  ],
  "green-livelihoods-economic-empowerment": [
    "100 green enterprises supported; 10 cooperatives registered",
    "Climate-smart agriculture demo plots in all 5 communities",
    "Revolving green-finance loan funds operational",
  ],
  "inclusive-leadership": [
    "50% women's participation across all initiatives",
    "Women and youth supported to lead climate and clean-energy initiatives",
    "Inclusive participation built into training, enterprise, and community leadership",
  ],
  "ecosystem-restoration-carbon-offsets": [
    "Biodiversity conservation across 15 local ecosystems",
    "Community carbon projects developed against recognized certification methodologies",
    "Transparent benefit-sharing with community carbon committees",
  ],
};

export default async function SubProgramPage({ params }: { params: Promise<{ subProgramSlug: string }> }) {
  const { subProgramSlug } = await params;
  const [allSubPrograms, activities, impactStats, impactStories, allProjects] = await Promise.all([
    getSubPrograms(),
    getActivitiesBySubProgram(subProgramSlug),
    getImpactStats("CEDP", undefined), // will filter by subProgramId in real implementation
    getImpactStories(1),
    getFeaturedProjects(),
  ]);

  const subProgram = allSubPrograms.find((sp) => sp.slug === subProgramSlug);
  if (!subProgram) notFound();

  // Filter projects for this sub-program (in real CMS, would use sub_program_ids)
  const relatedProjects = allProjects.filter((p) =>
    ["greening-kalagala", "water-spring-protection-naluvule", "coffee-farming-mobilization", "solar-powered-water-system-naluvule", "carbon-credit-project"].includes(p.slug)
  ).slice(0, 3);

  const cta = subProgramCTAs[subProgramSlug] || { label: "Support this program", href: "/donate" };
  const goal = strategicGoals[subProgram.strategic_goal] || `Strategic Goal ${subProgram.strategic_goal}`;
  const targets = target2030[subProgramSlug] || ["Target by 2030 — being finalized"];

  return (
    <>
      {/* HERO SECTION */}
      <PageHero
        eyebrow={`CEDP — Strategic Goal ${subProgram.strategic_goal}`}
        title={subProgram.name}
        intro={subProgram.description || `Community-driven solutions in ${subProgram.name.toLowerCase()} for Kalagala Parish and beyond.`}
        imageUrl={subProgram.hero_image_url}
        cta={cta}
      />

      {/* PROGRAM DESCRIPTION */}
      <SplitSection eyebrow="What we do" title={subProgram.name}>
        <Prose>
          <p>{goal}</p>
          <p className="mt-4">
            In <strong>Kalagala Parish</strong>, this sub-program addresses the specific challenges of a peri-urban area bordering Mabira Forest — where rural and urban service delivery gaps overlap, and communities face pressure on land, water, and forest resources.
          </p>
          <p className="mt-4">
            <strong>Why Kalagala:</strong> The five communities (Kalagala, Kyambogo, Naluvule, Wabusanke, Byabuku) represent a "development limbo" — too urban for traditional rural programs, too rural for municipal services. CEDP bridges this gap with community-owned solutions.
          </p>
        </Prose>
      </SplitSection>

      {/* 2030 TARGETS */}
      <section className="bg-[var(--surface-2)] py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>2030 targets (Strategic Goal {subProgram.strategic_goal})</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Outcome-level targets — dated, not achieved</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              These are targets we are working toward by 2030, not current achievements. Progress is tracked annually in our MEL reports.
            </p>
          </div>
          <div className="mt-10">
            <FeatureGrid
              items={targets.map((t, i) => ({
                title: `Target ${i + 1}`,
                body: t,
                kicker: "By 2030",
              }))}
              columns={3}
            />
          </div>
        </div>
      </section>

      {/* PROGRAM ACTIVITIES */}
      <section className="py-16 md:py-24" id="activities">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Program activities</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">Every activity is community-driven and supervised</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Click an activity for details: what it involves, who it reaches, status, and linked projects.
            </p>
          </div>
          {activities.length > 0 ? (
            <CardGrid
              eyebrow=""
              title=""
              items={activities.map((a, i) => ({
                title: a.title,
                excerpt: a.summary || a.description?.slice(0, 150) || "Activity details coming soon",
                href: `/activities/${a.slug}`,
                tone: (["forest", "water", "earth"] as const)[i % 3],
                kicker: a.status.charAt(0).toUpperCase() + a.status.slice(1),
                media: true,
              }))}
              surface
            />
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Placeholder activities from spec - will be replaced by CMS data */}
              <p className="col-span-full text-center text-[var(--muted)]">
                Activities are managed in the CMS. Add them via the admin panel to appear here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* IMPACT */}
      <section className="bg-[var(--surface-2)] py-16 md:py-24" id="impact">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Impact</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Verified outcomes from this sub-program</h2>
          </div>

          {/* Impact Stats */}
          <dl className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.length > 0 ? (
              impactStats.map((m) => (
                <div key={m.metric_name} className="bg-[var(--surface)] p-6">
                  <dd className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,4vw,3rem)] leading-none text-[var(--ink)]">
                    {m.current_value}
                  </dd>
                  <dt className="mt-3 text-[0.95rem] text-[var(--ink-soft)]">{m.metric_name}</dt>
                  <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.12em]">
                    {m.as_of_date ? (
                      <span className="text-[var(--muted)]">As of {new Date(m.as_of_date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</span>
                    ) : m.status === "verified" ? (
                      <span className="text-[var(--forest-700)]">✓ Verified</span>
                    ) : (
                      <span className="text-[var(--gold-700)]">◷ Being updated</span>
                    )}
                  </p>
                </div>
              ))
            ) : (
              // Placeholder - will be replaced by CMS data
              [
                { label: "Projects completed", value: "—", note: "Data being updated" },
                { label: "Households reached", value: "—", note: "Data being updated" },
                { label: "People trained", value: "—", note: "Data being updated" },
                { label: "Hectares restored", value: "—", note: "Data being updated" },
              ].map((m) => (
                <div key={m.label} className="bg-[var(--surface)] p-6">
                  <dd className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,4vw,3rem)] leading-none text-[var(--ink)]">
                    {m.value}
                  </dd>
                  <dt className="mt-3 text-[0.95rem] text-[var(--ink-soft)]">{m.label}</dt>
                  <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.12em] text-[var(--gold-700)]">
                    ◷ {m.note}
                  </p>
                </div>
              ))
            )}
          </dl>

          {/* Embedded Impact Story */}
          {impactStories.length > 0 && impactStories[0] && (
            <div className="mt-12 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8">
              <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
                <div>
                  <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.12em] text-[var(--accent-700)]">Community voice</p>
                  <h3 className="mt-2 text-xl font-semibold">{impactStories[0].title}</h3>
                  {impactStories[0].quote && (
                    <blockquote className="mt-4 border-l-4 border-[var(--accent-600)] pl-6 italic text-[var(--ink-soft)]">
                      &ldquo;{impactStories[0].quote}&rdquo;
                    </blockquote>
                  )}
                  {impactStories[0].community_voice && (
                    <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.12em] text-[var(--accent-700)]">
                      — {impactStories[0].community_voice}
                    </p>
                  )}
                  {impactStories[0].verified_outcome && (
                    <p className="mt-4 font-medium text-[var(--ink)]">
                      <span className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.12em] text-[var(--forest-700)]">Verified outcome: </span>
                      {impactStories[0].verified_outcome}
                    </p>
                  )}
                  <a href={`/impact/stories/${impactStories[0].slug}`} className="mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-[var(--accent-700)]">
                    Read full story →
                  </a>
                </div>
                <div>
                  <PhotoSlot
                    tone="forest"
                    ratio="4/3"
                    imageUrl={impactStories[0].hero_image_url}
                    caption={impactStories[0].title}
                    className="shadow-[var(--shadow-md)]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-center">Related projects</h3>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {relatedProjects.map((p, i) => (
                  <a
                    key={p.slug}
                    href={p.href}
                    className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
                  >
                    <PhotoSlot tone={["forest", "water", "earth"][i % 3] as "forest" | "water" | "earth"} ratio="16/9" tag={p.theme} caption={p.title} />
                    <div className="flex flex-1 flex-col p-5">
                      <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
                        {p.theme}
                      </p>
                      <h4 className="mt-2 text-lg leading-snug">{p.title}</h4>
                      <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-[var(--muted)]">{p.summary}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-[var(--accent-700)]">
                        View project →
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTABand
        title={`Support ${subProgram.name}`}
        body="Your contribution funds training, equipment, and community co-investment for lasting change."
        actions={[
          { href: cta.href, label: cta.label },
          { href: "/partners", label: "Partner on this program", variant: "secondary" },
          { href: "/impact", label: "See all impact", variant: "ghost" },
        ]}
      />
    </>
  );
}
