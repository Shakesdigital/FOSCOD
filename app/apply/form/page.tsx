import { HeroSlider } from "@/components/site/HeroSlider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides } from "@/lib/content";

import UnifiedApplicationForm from "@/components/forms/UnifiedApplicationForm";

export const metadata = pageMeta(
  "FOSCOD Application Form",
  "One unified application form for volunteering, internships, and group service trips with FOSCOD in Uganda."
);

export default async function ApplyFormPage() {
  const heroSlides = await getHeroSlides("apply");

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* intro */}
      <section className="bg-[var(--surface-2)] py-12 md:py-16">
        <div className="container-page mx-auto max-w-2xl text-center">
          <Eyebrow>Unified application</Eyebrow>
          <h1 className="mt-4 text-[clamp(2rem,4vw,2.8rem)]">Start your application</h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Whether you're interested in volunteering, interning, or leading a
            group service trip, this single form guides you through the process.
            Begin by telling us which program type you're interested in, then
            customize your application based on your goals and background.
          </p>
        </div>
      </section>

      {/* form */}
      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <UnifiedApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}
