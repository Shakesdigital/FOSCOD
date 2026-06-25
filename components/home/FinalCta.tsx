import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section className="container-page pb-24 pt-4">
      <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] px-8 py-14 text-center md:px-16 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(80% 120% at 50% -20%, var(--accent-50), transparent 60%)",
          }}
          aria-hidden
        />
        <p className="eyebrow justify-center">Start your journey in Uganda</p>
        <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(2rem,4vw,3rem)]">
          Ready to learn, build, or invest?
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[var(--ink-soft)]">
          Apply for an internship or volunteer placement, request a group
          program, or fund a community-led project. Our team replies within two
          working days.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/apply" variant="primary" size="lg">
            Apply now
          </Button>
          <Button href="/programs/program-fees" variant="secondary" size="lg">
            View program fees
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            Request info
          </Button>
        </div>
      </div>
    </section>
  );
}
