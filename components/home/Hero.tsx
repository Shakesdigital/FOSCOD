import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* warm ambient wash */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 85% -10%, var(--accent-50), transparent 55%), radial-gradient(90% 70% at -10% 10%, color-mix(in srgb, var(--water) 12%, transparent), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="container-page grid items-center gap-12 pb-16 pt-14 md:pb-24 md:pt-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Eyebrow>Registered Ugandan NGO · Jinja</Eyebrow>
          <h1 className="mt-6 text-[clamp(2.6rem,6vw,3.85rem)] font-medium leading-[1.04]">
            Bridge{" "}
            <span className="text-[var(--accent-700)]">global learning</span>{" "}
            with{" "}
            <span className="text-[var(--clay-700)]">local innovation</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
            FOSCOD empowers rural and underserved communities in Uganda through
            community-led development — clean energy, environmental
            sustainability, WASH, and livelihoods — alongside hands-on global
            learning programs for students, researchers, and partners.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/apply" variant="primary" size="lg">
              Apply for a program
            </Button>
            <Button href="/partners" variant="secondary" size="lg">
              Partner with FOSCOD
            </Button>
            <Button href="/projects" variant="ghost" size="lg">
              Explore projects →
            </Button>
          </div>
        </div>

        <div className="relative">
          <PhotoSlot
            tone="earth"
            ratio="4/5"
            tag="Kalagala Parish"
            caption="Hero: community at work in the field — solar, WASH, or tree-planting"
            className="shadow-[var(--shadow-lg)]"
          />
          {/* the "bridge" — a small connective field tag overlapping the frame */}
          <div className="absolute -bottom-5 -left-5 hidden w-48 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-md)] sm:block">
            <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--muted)]">
              Two pillars
            </p>
            <p className="mt-1.5 text-sm leading-snug text-[var(--ink)]">
              Community Empowerment{" "}
              <span className="text-[var(--muted)]">+</span> Global Learning &
              Exchange
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
