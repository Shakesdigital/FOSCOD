import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";

export function SupportCause() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-page grid items-center gap-10 md:grid-cols-2">
        <PhotoSlot
          tone="earth"
          ratio="4/3"
          tag="Kalagala Parish"
          caption="Community-led project in progress"
          className="shadow-[var(--shadow-md)]"
        />
        <div>
          <Eyebrow>Driving sustainable change</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.9rem,3.5vw,2.6rem)]">
            Driving sustainable change in Uganda
          </h2>
          <p className="mt-5 max-w-[var(--measure)] text-lg leading-relaxed text-[var(--ink-soft)]">
            Every clean-energy enterprise, protected spring, and savings group is
            funded by people who believe rural communities should lead their own
            development. Your support turns local priorities into lasting projects.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/donate" variant="primary" size="lg">
              Support our cause
            </Button>
            <Button href="/partners" variant="ghost" size="lg">
              Partner with us →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
