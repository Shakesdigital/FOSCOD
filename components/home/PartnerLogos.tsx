import { Eyebrow } from "@/components/ui/Eyebrow";

type PartnerLogo = { name: string; src: string; /** Optional background — light logos keep their original white card so they read on the pale section. */ bg?: string };

/** Curated partner logos (sourced from each partner's official site, white
 *  backgrounds removed, trimmed to equal visual weight). Kept static so the
 *  strip always renders complete — CMS partners rows carry no logos. */
const partnerLogos: PartnerLogo[] = [
  { name: "AIESEC", src: "/images/partners/aiesec.svg" },
  { name: "The Community-Based Global Learning Collaborative", src: "/images/partners/cbglc.png" },
  { name: "Fort Lewis College", src: "/images/partners/fortlewis.svg" },
  { name: "IDIWA — Integrated Disabled Women Activities", src: "/images/partners/idiwa.png" },
  { name: "Kaya Responsible Travel", src: "/images/partners/kaya.svg" },
  { name: "Myriad Canada", src: "/images/partners/myriad.svg" },
  { name: "Northwestern University", src: "/images/partners/northwestern.svg" },
  { name: "ROOTS Internships", src: "/images/partners/roots.png" },
  { name: "St. Francis Health Care Services", src: "/images/partners/stfrancis.png", bg: "#ffffff" },
  { name: "SustainMe", src: "/images/partners/sustainme.png", bg: "#ffffff" },
  { name: "Together for a New Africa", src: "/images/partners/together.png", bg: "#ffffff" },
];

/** PartnerLogos — horizontally scrolling logo loop. Equal-size cells, uniform
 *  gaps, grayscale with hover color reveal. Marquee animation unchanged. */
export function PartnerLogos({
  eyebrow = "Our partners",
  title = "Working with institutions and public partners",
}: {
  eyebrow?: string;
  title?: string;
}) {
  // Duplicate the set so the animation can scroll seamlessly
  const allPartners = [...partnerLogos, ...partnerLogos];

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
                    animation: scroll-left 40s linear infinite;
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
            className="partner-scroll flex items-center gap-10 whitespace-nowrap md:gap-16"
            aria-label="Partner logos"
          >
            {allPartners.map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                className={`flex h-16 w-40 shrink-0 items-center justify-center transition-transform hover:scale-105 ${p.bg ? "p-2" : ""}`}
                style={p.bg ? { backgroundColor: p.bg } : undefined}
              >
                <img
                  src={p.src}
                  alt={p.name}
                  className="max-h-full max-w-full object-contain"
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
