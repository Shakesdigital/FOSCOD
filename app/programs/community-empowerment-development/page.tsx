import { PageHero } from "@/components/site/PageHero";
import { SplitSection, Prose, FeatureGrid, Steps, CTABand, CardGrid } from "@/components/site/blocks";
import { pageMeta } from "@/lib/seo";
import { getImpactStats, getSubPrograms, getFeaturedProjects } from "@/lib/content";
import { cedpSubPrograms } from "@/lib/site";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata = pageMeta(
  "Community Empowerment & Development Program (CEDP)",
  "CEDP supports underserved communities in Uganda to lead practical solutions in clean energy, environment, livelihoods, health, WASH, and inclusion."
);

const focus = [
  { title: "Green Skills & Renewable Energy", body: "Connect practical energy learning with safe use, maintenance, enterprise pathways, and inclusion—not equipment alone." },
  { title: "Clean Cooking & Health", body: "Combine appropriate technology with affordability, user choice, correct use, after-sales support, and responsible health evidence." },
  { title: "Water, Sanitation & Hygiene", body: "Link water infrastructure with quality, hygiene, governance, accessibility, maintenance, and reliable service." },
  { title: "Green Livelihoods", body: "Bring skills, savings, production risk, environmental stewardship, market access, and follow-through into one livelihood pathway." },
  { title: "Inclusive Leadership", body: "Move beyond attendance toward voice, decision-making roles, safe participation, and access to opportunity." },
  { title: "Ecosystem Restoration", body: "Plan for the right sites and species, community roles, survival monitoring, ecosystem function, and transparent benefits." },
];

const approach = [
  { title: "Community assessment", body: "We start by listening — mapping needs and assets together with residents." },
  { title: "Asset-based co-design", body: "Solutions are designed with communities, not imposed — using local knowledge and resources." },
  { title: "Implementation", body: "Delivered with local organizations, global participants, and 25% community co-contribution." },
  { title: "Monitoring & reporting", body: "Honest measurement and transparent reporting against verified indicators." },
  { title: "Local ownership", body: "Communities own and sustain what's built — 86% of completed projects continue independently." },
];

const kalagalaCommunities = [
  { name: "Kalagala", description: "Parish center, market access" },
  { name: "Kyambogo", description: "Agricultural heartland" },
  { name: "Naluvule", description: "Water spring & solar pilot site" },
  { name: "Wabusanke", description: "Bordering Mabira Forest" },
  { name: "Byabuku", description: "Peri-urban, forest-edge community" },
];

export default async function CedpPage() {
  const [cedpImpactStats, subPrograms, featuredProjects] = await Promise.all([
    getImpactStats("CEDP"),
    getSubPrograms(),
    getFeaturedProjects(),
  ]);

  // Filter for CEDP projects
  const cedpProjects = featuredProjects.filter((p) =>
    ["greening-kalagala", "water-spring-protection-naluvule", "coffee-farming-mobilization", "solar-powered-water-system-naluvule", "carbon-credit-project"].includes(p.slug)
  );

  return (
    <>
      <PageHero
        eyebrow="Community Empowerment & Development Program"
        title="Community-led development at the center"
        intro="CEDP supports underserved communities in Kalagala Parish, Njeru Municipality, Buikwe District — a peri-urban area bordering Mabira Forest, in a 'development limbo' between rural and urban service delivery."
      />

      {/* Why Kalagala + Program Description */}
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

      <section className="bg-[var(--surface-2)] py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Why the themes connect</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">Lasting change rarely fits into one sector</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Energy affects health and enterprise. Water affects time, dignity, and livelihoods. Inclusion affects whose priorities shape every decision. CEDP keeps those connections visible while each sub-program has its own outcomes and evidence.
            </p>
          </div>
          <div className="mt-10"><FeatureGrid items={focus} columns={3} /></div>
          <p className="mx-auto mt-8 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Wider context is not presented as FOSCOD impact. Uganda's <a className="text-[var(--accent-700)] underline" href="https://www.iea.org/reports/uganda-energy-transition-plan/executive-summary" target="_blank" rel="noreferrer">Energy Transition Plan</a>, <a className="text-[var(--accent-700)] underline" href="https://www.unicef.org/uganda/what-we-do/wash" target="_blank" rel="noreferrer">UNICEF WASH guidance</a>, and <a className="text-[var(--accent-700)] underline" href="https://unfccc.int/documents/613828" target="_blank" rel="noreferrer">Uganda's updated climate commitment</a> help explain why integrated, locally owned action matters.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <Eyebrow>From priority to ownership</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">How a community-led project should move</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              The sequence keeps local knowledge, delivery roles, evidence, and long-term responsibility in the same conversation.
            </p>
          </div>
          <div className="mt-10"><Steps steps={approach} /></div>
        </div>
      </section>

      {/* Geography — Kalagala Communities */}
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
            {kalagalaCommunities.map((c, i) => (
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

      {/* Sub-program Grid */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Six sub-programs</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">Each tied to a Strategic Goal in the 2026–2030 plan</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Click through for activities, impact stats, and related projects.
            </p>
          </div>
          <div className="mt-10">
            <CardGrid
              eyebrow=""
              title=""
              items={subPrograms.length > 0 ? subPrograms.map((sp, i) => ({
                title: sp.name,
                excerpt: sp.description?.slice(0, 120) || `Strategic Goal ${sp.strategic_goal} — ${sp.name}`,
                href: `/programs/cedp/${sp.slug}`,
                tone: (["forest", "water", "earth", "forest", "water", "earth"] as const)[i % 3],
                kicker: `Strategic Goal ${sp.strategic_goal}`,
                tag: sp.key_stats?.[0]?.value ? `${sp.key_stats[0].label}: ${sp.key_stats[0].value}` : undefined,
              })) : cedpSubPrograms.map((sp, i) => ({
                title: sp.name,
                excerpt: `Strategic Goal ${sp.goal} — Community-driven solutions in ${sp.name.toLowerCase()}`,
                href: `/programs/cedp/${sp.slug}`,
                tone: (["forest", "water", "earth", "forest", "water", "earth"] as const)[i % 3],
                kicker: `Strategic Goal ${sp.goal}`,
              }))}
              surface
            />
          </div>
        </div>
      </section>

      {/* Cross-cutting Commitments */}
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

      {/* CEDP Impact Stats */}
      <section className="py-12 md:py-16">
        <div className="container-page">
          <div className="max-w-2xl">
            <Eyebrow>CEDP impact</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Verified outcomes from community-led work</h2>
          </div>
          <dl className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
            {cedpImpactStats.length > 0 ? (
              cedpImpactStats.map((m) => (
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
              // Fallback CEDP-specific stats from Fact Sheet
              [
                { label: "Community projects (2022–2024)", value: "35", note: "Agriculture, environment, health, energy, inclusion" },
                { label: "Projects sustaining independently", value: "86%", note: "Continue to benefit communities" },
                { label: "Grassroots orgs trained", value: "20", note: "In ethical community development" },
                { label: "Kalagala Parish communities", value: "5", note: "Kalagala, Kyambogo, Naluvule, Wabusanke, Byabuku" },
              ].map((m) => (
                <div key={m.label} className="bg-[var(--surface)] p-6">
                  <dd className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,4vw,3rem)] leading-none text-[var(--ink)]">
                    {m.value}
                  </dd>
                  <dt className="mt-3 text-[0.95rem] text-[var(--ink-soft)]">{m.label}</dt>
                  <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                    {m.note}
                  </p>
                </div>
              ))
            )}
          </dl>
        </div>
      </section>

      <CTABand
        title="Support community-led development"
        body="Partner on a flagship project, fund priority work, or join as an intern or volunteer."
        actions={[
          { href: "/partners", label: "Partner with us" },
          { href: "/donate", label: "Donate to a project", variant: "secondary" },
          { href: "/projects", label: "Explore projects", variant: "ghost" },
        ]}
      />
    </>
  );
}
