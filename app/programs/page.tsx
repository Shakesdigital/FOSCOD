import { HeroSlider } from "@/components/site/HeroSlider";
import { ProgramsSection, FeatureRow, CTABand } from "@/components/site/blocks";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides, getPrograms } from "@/lib/content";

export const metadata = pageMeta(
  "Our Programs",
  "FOSCOD works through two pillars: Community Empowerment and Development (CEDP) and Global Learning and Exchange (internships, volunteering, research)."
);

export default async function ProgramsPage() {
  const [heroSlides, programs] = await Promise.all([
    getHeroSlides("programs"),
    getPrograms(),
  ]);

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* Two programs in one row, from the CMS */}
      <ProgramsSection
        eyebrow="About our programs"
        title="Choose the path that fits you"
        intro="Every FOSCOD program is rooted in the same belief: communities lead, and we build alongside them. Come to learn, or invest in the work."
        items={programs}
      />

      {/* Theory of Change visual */}
      <FeatureRow
        eyebrow="How it works"
        title="Theory of Change: Inputs → Activities → Outputs → Outcomes → Impact"
        reverse
        tone="earth"
        imageCaption="Theory of Change diagram — add via CMS"
        body={
          <>
            <p className="mb-4">
              FOSCOD's Theory of Change connects our two pillars through a shared logic: community priorities drive every input, and every activity is measured against community-owned outcomes.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-[var(--accent-700)]">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent-50)] border border-[var(--accent-200)]">
                <span className="font-[family-name:var(--font-mono)] text-[0.65rem]">1</span> Inputs
              </span>
              <span aria-hidden>→</span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent-50)] border border-[var(--accent-200)]">
                <span className="font-[family-name:var(--font-mono)] text-[0.65rem]">2</span> Activities
              </span>
              <span aria-hidden>→</span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent-50)] border border-[var(--accent-200)]">
                <span className="font-[family-name:var(--font-mono)] text-[0.65rem]">3</span> Outputs
              </span>
              <span aria-hidden>→</span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent-50)] border border-[var(--accent-200)]">
                <span className="font-[family-name:var(--font-mono)] text-[0.65rem]">4</span> Outcomes
              </span>
              <span aria-hidden>→</span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent-600)] text-white">
                <span className="font-[family-name:var(--font-mono)] text-[0.65rem]">5</span> Impact
              </span>
            </div>
            <p className="mt-4 text-[var(--ink-soft)]">
              Community situation analyses and asset mapping set the <strong>Inputs</strong>. GLE participants and CEDP field teams co-deliver <strong>Activities</strong> (training, construction, enterprise support, research). Tangible <strong>Outputs</strong> (protected springs, solar systems, trained cooperatives, published studies) lead to measurable <strong>Outcomes</strong> (income growth, health improvement, carbon sequestration, policy change). The ultimate <strong>Impact</strong> is communities that sustain and replicate solutions independently.
            </p>
          </>
        }
      />

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