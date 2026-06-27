import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export function WhoWeAre() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-page flex flex-col items-center text-center">
        <Eyebrow>Who we are</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-[clamp(1.8rem,3.2vw,2.5rem)]">
          A Ugandan NGO, rooted in the communities we serve
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
          FOSCOD is a registered Ugandan indigenous NGO advancing sustainable,
          community-led development in rural and underserved communities. We pair
          local innovation with global learning so communities, students,
          researchers, and partners can co-create solutions that last.
        </p>
        <div className="mt-8">
          <Button href="/about" variant="secondary" size="md">
            Learn more
          </Button>
        </div>
      </div>
    </section>
  );
}
