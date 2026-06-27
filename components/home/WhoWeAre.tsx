import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export function WhoWeAre() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-page grid items-start gap-10 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">
            A Ugandan NGO, rooted in the communities we serve
          </h2>
        </div>
        <div>
          <p className="max-w-[var(--measure)] text-lg leading-relaxed text-[var(--ink-soft)]">
            FOSCOD is a registered Ugandan indigenous NGO advancing sustainable,
            community-led development in rural and underserved communities. We pair
            local innovation with global learning — so communities, students,
            researchers, and partners can co-create solutions that last across
            clean energy, environment, WASH, livelihoods, health, and inclusion.
          </p>
          <div className="mt-7">
            <Button href="/about" variant="secondary" size="md">
              Learn more about FOSCOD
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
