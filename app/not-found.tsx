import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <Eyebrow>Error 404</Eyebrow>
      <h1 className="mt-5 text-[clamp(2.4rem,6vw,4rem)]">This page wandered off the map</h1>
      <p className="mt-4 max-w-md text-lg text-[var(--ink-soft)]">
        The page you're looking for may have moved during our rebuild. Try the
        homepage, or explore programs and projects.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/" variant="primary" size="lg">Back to home</Button>
        <Button href="/projects" variant="secondary" size="lg">Explore projects</Button>
      </div>
    </section>
  );
}
