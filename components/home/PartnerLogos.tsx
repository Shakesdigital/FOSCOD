import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Partner } from "@/lib/content";

/** PartnerLogos — horizontally scrolling logo loop from the CMS partners collection.
 *  Grayscale logos with hover color reveal, animated infinite scroll.
 *  Falls back to a static text strip when no logos are present. */
export function PartnerLogos({
  partners,
  eyebrow = "Our partners",
  title = "Working with institutions and public partners",
}: {
  partners: Partner[];
  eyebrow?: string;
  title?: string;
}) {
  // Duplicate partners so the animation can scroll seamlessly
  const allPartners = partners.length > 0 ? [...partners, ...partners] : [];
  const fallbackNames = ["University Partner", "Community CBO", "Local NGO", "Climate Funder", "Research Institute", "District Government"];
  const displaySet = partners.length > 0 ? partners : fallbackNames;

  return (
    <section className="bg-[var(--surface-2)] py-14 md:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">{title}</h2>
        </div>

        {/* Auto-scrolling logo loop */}
        <div className="mt-12 overflow-hidden">
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @media (prefers-reduced-motion: no-preference) {
                  .partner-scroll {
                    animation: scroll-left 30s linear infinite;
                  }
                }
                @keyframes scroll-left {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
              `,
            }}
          />
          <div
            className={`flex items-center gap-10 whitespace-nowrap ${
              partners.length > 0 ? "partner-scroll md:gap-16" : "animate-none"
            }`}
            aria-label="Partner logos"
          >
            {partners.length > 0
              ? allPartners.map((p, i) => (
                  <div
                    key={`${p.name}-${i}`}
                    className="flex items-center grayscale opacity-65 transition-all hover:grayscale-0 hover:opacity-100"
                  >
                    {p.logo_url ? (
                      <img
                        src={p.logo_url}
                        alt={p.logo_alt || p.name}
                        className="h-10 max-w-[160px] object-contain"
                        loading={i < 10 ? "eager" : "lazy"}
                        width={160}
                        height={40}
                      />
                    ) : (
                      <span className="font-[family-name:var(--font-text)] text-[0.7rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                        {p.name}
                      </span>
                    )}
                  </div>
                ))
              : (displaySet as string[]).map((name, i) => (
                  <span
                    key={i}
                    className="font-[family-name:var(--font-text)] text-[0.7rem] uppercase tracking-[0.16em] text-[var(--muted)]"
                  >
                    {name}
                  </span>
                ))
            }
          </div>
        </div>
      </div>
    </section>
  );
}
