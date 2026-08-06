import { HeroSlider } from "@/components/site/HeroSlider";
import { SplitSection, Prose, FeatureGrid, TeamPreview, CardGrid, CTABand } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides, getTeam, getPartners } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata = pageMeta(
  "About Us",
  "FOSCOD is a registered Ugandan indigenous NGO advancing sustainable, community-led development in rural and underserved areas."
);

export default async function AboutPage() {
  const [heroSlides, staff, board, partners] = await Promise.all([
    getHeroSlides("about"),
    getTeam("staff"),
    getTeam("board"),
    getPartners(),
  ]);

  // Group partners by type
  const partnersByType = partners.reduce((acc, p) => {
    const type = p.type || "Partner";
    if (!acc[type]) acc[type] = [];
    acc[type].push(p);
    return acc;
  }, {} as Record<string, typeof partners>);

  const values = [
    {
      title: "Integrated & Holistic Development",
      body: "Health, livelihoods, environment, and learning advance together — not in silos.",
      benchmark: "Programs connect education, health, economic empowerment, and environmental sustainability.",
    },
    {
      title: "Equity & Inclusion",
      body: "Equal access for youth, women, people with disabilities, and marginalized households.",
      benchmark: "50% women's participation target across all initiatives.",
    },
    {
      title: "Community Ownership & Leadership",
      body: "Locally led, culturally relevant; communities set the priorities.",
      benchmark: "Communities define priorities and lead culturally appropriate, environmentally sound solutions.",
    },
    {
      title: "Sustainability & Innovation",
      body: "Long-term impact, with renewable energy and stewardship at the centre.",
      benchmark: "Programs invest in long-term, adaptive solutions rooted in local realities.",
    },
    {
      title: "Collaboration & Shared Learning",
      body: "Cross-sector knowledge shared between communities, universities, and partners.",
      benchmark: "Knowledge and solutions are co-created with communities, government, academia, and partners.",
    },
    {
      title: "Transparency & Accountability",
      body: "Honest reporting and ethical management of every resource.",
      benchmark: "Resources, performance, and impact are managed and communicated responsibly.",
    },
    {
      title: "Empowerment Through Learning",
      body: "Knowledge as the catalyst for lasting change.",
      benchmark: "2,500+ people trained in renewable energy technologies by 2030.",
    },
  ];

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">A journey to Ugandan autonomy</h2>
            <div className="mt-6 space-y-4 max-w-[var(--measure)] text-[1.05rem] leading-relaxed text-[var(--ink-soft)]">
              <p>
                <strong>2007 — Founded through an international development partnership:</strong> the organization began hosting international learners and supporting community-driven projects in eastern and central Uganda.
              </p>
              <p>
                <strong>2018 — Transition to full Ugandan autonomy:</strong> FOSCOD became an independent, registered Ugandan indigenous NGO (Reg. No. INDR143472008NB), governed by a Ugandan Board of Directors and led by Ugandan staff.
              </p>
              <p>
                <strong>2022 — Strategic pivot introducing CEDP:</strong> The Community Empowerment and Development Program (CEDP) was launched as a structured, multi-sector program anchored in Kalagala Parish, complementing the existing Global Learning Exchange (GLE).
              </p>
              <p>
                <strong>2024 — Rebrand to FOSCOD:</strong> the organization adopted its current name and acronym to reflect its Ugandan identity, governance, and strategic direction.
              </p>
            </div>
          </div>
          <div className="relative">
            <PhotoSlot
              tone="earth"
              ratio="4/5"
              tag="FOSCOD team with community members"
              caption="Our story — team and community in Kalagala Parish"
              className="shadow-[var(--shadow-lg)]"
            />
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="bg-[var(--surface-2)] py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Why we exist</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">Mission, Vision & Values</h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8">
              <h3 className="text-xl font-semibold text-[var(--ink)]">Mission</h3>
              <p className="mt-3 text-[var(--ink-soft)]">
                To empower underserved communities to drive environmental innovation and adopt clean energy through ethical, sustainable development and global knowledge exchange.
              </p>
            </div>
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8">
              <h3 className="text-xl font-semibold text-[var(--ink)]">Vision</h3>
              <p className="mt-3 text-[var(--ink-soft)]">
                A world where local communities champion environmental stewardship and clean energy adoption, strengthened by global partnerships.
              </p>
            </div>
          </div>

          <div className="mt-14">
            <h3 className="text-xl font-semibold text-center text-[var(--ink)]">Core Values</h3>
            <p className="mt-2 text-center text-[var(--ink-soft)]">Each value has a practice benchmark we hold ourselves to.</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6"
                >
                  <h4 className="text-lg font-semibold">{v.title}</h4>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">{v.body}</p>
                  <p className="mt-4 font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.12em] text-[var(--accent-700)]">
                    Benchmark: {v.benchmark}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Governance */}
      <section className="py-16 md:py-24" id="team">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Leadership & Governance</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">Governed by Ugandans, accountable to communities</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              A 6-member Board of Directors provides strategic oversight. The Executive Director leads a secretariat of 10–12 core staff (growing to 20–25 by 2030). A multi-disciplinary Advisory Board contributes technical expertise.
            </p>
          </div>

          <div className="mt-12">
            <TeamPreview
              title="Our leadership"
              intro="Board Chairperson and Executive Director"
              cards={[
                {
                  label: "Mr. Kayemba Patrick",
                  body: "Chairman, Board of Directors. Guides FOSCOD's governance, ethics, and long-term strategy.",
                  href: "/about#board",
                  cta: "View Board",
                  tone: "earth",
                },
                {
                  label: "Mrs. Amanyire Margaret Nassozi",
                  body: "Executive Director. Leads programs, operations, and partnerships from Jinja.",
                  href: "/about#staff",
                  cta: "Meet the Team",
                  tone: "forest",
                },
              ]}
            />
          </div>

          <div className="mt-16">
            <h3 className="text-xl font-semibold text-center text-[var(--ink)]">Secretariat & Advisory Board</h3>
            <p className="mt-2 text-center text-[var(--ink-soft)]">
              Our core team in Jinja works alongside community leaders, host families, and a multi-disciplinary Advisory Board spanning public health, renewable energy, education, and governance.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6">
                <h4 className="text-lg">Staff (10–12 core)</h4>
                <p className="mt-2 text-[var(--ink-soft)]">A multidisciplinary team delivering programs, monitoring learning, managing operations, and supporting community partnerships.</p>
              </div>
              <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6">
                <h4 className="text-lg">Board of Directors (6)</h4>
                <p className="mt-2 text-[var(--ink-soft)]">A six-member Board provides governance oversight, approves strategy, and supports accountability.</p>
              </div>
              <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6">
                <h4 className="text-lg">Advisory Board</h4>
                <p className="mt-2 text-[var(--ink-soft)]">Experts in renewable energy, WASH, public health, education, carbon markets, and NGO governance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Partners — grouped by type */}
      <section className="bg-[var(--surface-2)] py-16 md:py-24" id="partners">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Our partners</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">Collaboration across sectors and borders</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Academic institutions, government agencies, community organizations, and funders who share our commitment to community-led development.
            </p>
          </div>
          <div className="mt-12 space-y-10">
            {Object.entries(partnersByType).map(([type, list]) => (
              <div key={type}>
                <h3 className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.16em] text-[var(--accent-700)]">{type}</h3>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-8 md:gap-16">
                  {list.map((p, i) => (
                    <div
                      key={p.name + i}
                      className="flex items-center grayscale opacity-60 transition-all hover:grayscale-0 hover:opacity-100"
                    >
                      {p.logo_url ? (
                        <img src={p.logo_url} alt={p.name} className="h-10 max-w-[160px] object-contain" loading="lazy" />
                      ) : (
                        <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                          {p.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration & Transparency */}
      <section className="py-16 md:py-24" id="registration">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <Eyebrow>Registration & transparency</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">Accountable to the communities we serve</h2>
            <div className="mt-8 space-y-6">
              <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6">
                <h3 className="text-lg">NGO Registration</h3>
                <p className="mt-2 text-[var(--ink-soft)]">
                  <strong>Registration No:</strong> {site.registration.number}<br />
                  <strong>Authority:</strong> {site.registration.authority}<br />
                  <strong>Legal Name:</strong> {site.legalName}
                </p>
              </div>
              <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6">
                <h3 className="text-lg">Memorandum of Understanding</h3>
                <p className="mt-2 text-[var(--ink-soft)]">
                  <strong>Partner:</strong> {site.mou.partner}<br />
                  <strong>Scope:</strong> {site.mou.description}
                </p>
              </div>
              <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6">
                <h3 className="text-lg">Annual Reports & MEL Summaries</h3>
                <p className="mt-2 text-[var(--ink-soft)]">
                  Audited financial statements, monitoring & evaluation reports, and strategic plan updates are published annually.
                </p>
                <div className="mt-4">
                  <a href="/impact#downloads" className="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-[var(--accent-700)]">
                    Browse downloads →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Want to work with us?"
        body="Whether you're a university, a funder, a community organization, or an individual — there's a path to partnership."
        actions={[
          { href: "/partners", label: "Partner with FOSCOD" },
          { href: "/donate", label: "Support our work", variant: "secondary" },
          { href: "/apply", label: "Apply for a program", variant: "ghost" },
        ]}
      />
    </>
  );
}
