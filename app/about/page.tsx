import { HeroSlider } from "@/components/site/HeroSlider";
import { Prose, TeamPreview, CTABand } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { PartnerLogos } from "@/components/home/PartnerLogos";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides, getPartners, getAboutContent } from "@/lib/content";

export const metadata = pageMeta(
  "About Us",
  "FOSCOD is a registered Ugandan indigenous NGO advancing sustainable, community-led development in rural and underserved areas."
);

export default async function AboutPage() {
  const [heroSlides, partners, about] = await Promise.all([
    getHeroSlides("about"),
    getPartners(),
    getAboutContent(),
  ]);

  return (
    <>
      {/* Hero */}
      <HeroSlider slides={heroSlides} />

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div className="mx-auto max-w-2xl text-center lg:max-w-none lg:text-left">
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
            {[about.mission, about.vision].map((item) => (
              <div key={item.title} className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8">
                <h3 className="text-xl font-semibold text-[var(--ink)]">{item.title}</h3>
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.image_alt ?? item.title}
                    className="mt-4 h-48 w-full rounded-[var(--radius-lg)] object-cover"
                    loading="lazy"
                  />
                )}
                <p className="mt-4 text-[var(--ink-soft)]">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <h3 className="text-xl font-semibold text-center text-[var(--ink)]">Core Values</h3>
            <p className="mt-2 text-center text-[var(--ink-soft)]">Each value has a practice benchmark we hold ourselves to.</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {about.values.map((v, i) => (
                <div
                  key={v.title}
                  className={`rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 ${i === about.values.length - 1 ? "md:col-start-2 md:col-span-2 lg:col-start-2 lg:col-span-1 justify-self-center" : ""}`}
                >
                  <h4 className="text-lg font-semibold">{v.title}</h4>
                  {v.image_url && (
                    <img
                      src={v.image_url}
                      alt={v.image_alt ?? v.title}
                      className="mt-3 h-32 w-full rounded-[var(--radius-lg)] object-cover"
                      loading="lazy"
                    />
                  )}
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">{v.body}</p>
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

          <div className="mt-8">
            <TeamPreview
              cards={[
                {
                  label: "Board of Directors",
                  body: about.leadership.board.description,
                  href: about.leadership.board.href,
                  cta: about.leadership.board.cta,
                  tone: "earth",
                },
                {
                  label: "Team",
                  body: about.leadership.team.description,
                  href: about.leadership.team.href,
                  cta: about.leadership.team.cta,
                  tone: "forest",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Partners — scrolling carousel */}
      <PartnerLogos partners={partners} eyebrow="Our partners" title="Collaboration across sectors and borders" />

      {/* Want to work with us — CTABand with background and thicker border */}
      <div className="border-2 border-[var(--border-strong)] py-4">
        <CTABand
          title="Want to work with us?"
          body="Whether you're a university, a funder, a community organization, or an individual — there's a path to partnership."
          actions={[
            { href: "/partners", label: "Partner with FOSCOD" },
            { href: "/donate", label: "Support our work", variant: "secondary" },
            { href: "/apply", label: "Apply for a program", variant: "ghost" },
          ]}
        />
      </div>
    </>
  );
}
