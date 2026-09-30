import { HeroSlider } from "@/components/site/HeroSlider";
import { CTABand } from "@/components/site/blocks";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides, getTeam } from "@/lib/content";

export const metadata = pageMeta(
  "Staff & Program Team",
  "The core staff team delivering programs across clean energy, WASH, livelihoods, health, and the environment."
);

type Member = { name: string; role: string; category: string; bio?: string };

export default async function StaffPage() {
  const staff = await getTeam("staff");
  const heroSlides = await getHeroSlides("team");
  return (
    <>
      <HeroSlider slides={heroSlides} />

      <section className="container-page py-12 first:pt-16">
        <div className="text-center">
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">Staff & Program Team</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {staff.map((m, i) => (
            <li key={`${m.name}-${i}`}>
              <PhotoSlot
                tone={i % 2 ? "water" : "forest"}
                ratio="1/1"
                caption="Portrait"
              />
              <p className="mt-3 font-medium text-[var(--ink)]">{m.name}</p>
              <p className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.1em] text-[var(--muted)]">
                {m.role}
              </p>
              {m.bio && <p className="mt-2 text-sm text-[var(--ink-soft)]">{m.bio}</p>}
            </li>
          ))}
          </ul>
          </div>
          </section>

      <CTABand
        title="Join the work"
        actions={[
          { href: "/apply", label: "Apply to a program" },
          { href: "/partners", label: "Partner with us", variant: "secondary" },
        ]}
      />
    </>
  );
}
