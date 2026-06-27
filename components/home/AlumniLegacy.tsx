import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";

export function AlumniLegacy() {
  return (
    <Section surface>
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Alumni & community</Eyebrow>
        <h2 className="mt-4 text-[clamp(1.9rem,3.5vw,2.6rem)]">
          Showcasing our alumni&rsquo;s legacy in community transformation
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
          Past interns, volunteers, and university cohorts leave more than a
          report behind — they leave working projects and lasting relationships
          with the communities they served.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {(["forest", "water", "earth"] as const).map((tone, i) => (
          <PhotoSlot
            key={tone}
            tone={tone}
            ratio="4/3"
            caption={["Alumni in the field", "Community handover", "Host family"][i]}
          />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button href="/alumni" variant="secondary" size="md">
          Learn more
        </Button>
      </div>
    </Section>
  );
}
