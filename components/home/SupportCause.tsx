import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";

export function SupportCause() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <Eyebrow>Driving sustainable change</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.4rem)]">
              Driving sustainable change in Uganda
            </h2>
            <p className="mt-5 max-w-[var(--measure)] leading-relaxed text-[var(--ink-soft)]">
              Every clean-energy enterprise, protected spring, and savings group
              is backed by people who believe rural communities should lead their
              own development. Your support turns local priorities into projects
              that last.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {(["earth", "water", "forest"] as const).map((tone, i) => (
              <PhotoSlot
                key={tone}
                tone={tone}
                ratio="3/4"
                caption={["Solar", "WASH", "Biochar"][i]}
              />
            ))}
          </div>
        </div>

        <Link
          href="/donate"
          className="mt-12 flex items-center justify-center rounded-[var(--radius-lg)] border-2 border-[var(--accent-600)] px-8 py-5 text-center text-lg font-medium text-[var(--accent-700)] transition-colors hover:bg-[var(--accent-600)] hover:text-[var(--accent-fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-700)]"
        >
          Support our cause
        </Link>
      </div>
    </section>
  );
}
