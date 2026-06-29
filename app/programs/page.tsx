import { HeroSlider } from "@/components/site/HeroSlider";
import { SupportOurCause, CTABand } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides } from "@/lib/content";

export const metadata = pageMeta(
  "Our Programs",
  "FOSCOD works through two pillars: Community Empowerment and Development (CEDP) and Global Learning and Exchange (internships, volunteering, research)."
);

const programs = [
  {
    eyebrow: "Pillar 01 · Global Learning & Exchange",
    title: "Global Service Learning",
    tone: "water" as const,
    caption: "Interns in the field — add photo via CMS",
    body: "Internships, volunteering, group programs, and research placements give students, professionals, and universities structured, supervised field experience in Uganda — across clean energy, WASH, livelihoods, health, and the environment. You'll work on real projects with real local supervision, and a host-family experience that turns a placement into a relationship.",
    cta: { href: "/programs/global-learning-exchange", label: "Learn more" },
  },
  {
    eyebrow: "Pillar 02 · Community Empowerment & Development",
    title: "Community Mobilization & Empowerment",
    tone: "forest" as const,
    caption: "Community project — add photo via CMS",
    body: "Locally owned solutions across clean energy, environment, water, livelihoods, health, and inclusion — designed and delivered with the communities that lead them. This is where partners and donors invest in change that communities sustain long after a project ends.",
    cta: { href: "/programs/community-empowerment-development", label: "Learn more" },
  },
];

export default async function ProgramsPage() {
  const heroSlides = await getHeroSlides("programs");
  return (
    <>
      <HeroSlider slides={heroSlides} />

      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>About our programs</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Choose the path that fits you</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Every FOSCOD program is rooted in the same belief: communities lead,
              and we build alongside them. Come to learn, or invest in the work.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {programs.map((p) => (
              <div
                key={p.title}
                className="flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
              >
                <PhotoSlot tone={p.tone} ratio="16/9" caption={p.caption} />
                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <Eyebrow>{p.eyebrow}</Eyebrow>
                  <h3 className="mt-3 text-[clamp(1.4rem,2.4vw,1.9rem)]">{p.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-[var(--ink-soft)]">{p.body}</p>
                  <div className="mt-6">
                    <Button href={p.cta.href} variant="secondary" size="md">
                      {p.cta.label}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SupportOurCause />

      <CTABand
        title="Find the right program for you"
        actions={[
          { href: "/programs/finder", label: "Open the program finder" },
          { href: "/programs/program-fees", label: "View fees", variant: "secondary" },
        ]}
      />
    </>
  );
}
