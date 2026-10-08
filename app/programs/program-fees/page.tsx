import { HeroSlider } from "@/components/site/HeroSlider";
import { CheckList, FAQ, CTABand } from "@/components/site/blocks";
import { FeeSelector } from "@/components/programs/FeeSelector";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides } from "@/lib/content";
import { notFound } from "next/navigation";

export const metadata = pageMeta(
  "Program Fees and Costs",
  "Transparent pricing for FOSCOD internship and volunteer programs, with clear inclusions and exclusions."
);

const included = [
  "Airport pickup and drop-off",
  "Program orientation and cultural briefing",
  "Accommodation — host family stay in community",
  "All meals during program days",
  "Transport to work and project sites",
  "Midterm retreats and reflection sessions",
  "Project support seed fund contribution",
  "24/7 emergency support line",
  "Independent monitoring and evaluation",
];

const excluded = [
  "International airfare",
  "Visa fees",
  "Travel insurance",
  "Vaccinations and medical expenses",
  "Personal expenses and souvenirs",
  "Meals outside program activities",
  "Optional trips and excursions",
  "Souvenir purchases",
];

const faqs = [
  { q: "When is a deposit due?", a: "If a deposit is required for your approved program, the current quote and acceptance documents will state the amount, due date, balance schedule, and applicable cancellation terms." },
  { q: "What does the host family stay include?", a: "You'll live with a vetted local family in the community where your project is based. Breakfast and dinner are provided daily, and lunch is arranged with your host during orientation week. Hosts are selected based on safety, hospitality, and proximity to project sites — you'll receive host details before arrival." },
  { q: "What is the refund policy?", a: "See our refund and cancellation policy for full terms and timelines." },
  { q: "What's excluded that I should budget for separately?", a: "Beyond the included items, budget for international flights ($800–$1,400 from North America), a tourist visa ($50–$100 on arrival), and comprehensive travel insurance ($75–$150 for the duration)." },
  { q: "How is group pricing prepared?", a: "University cohorts and faculty-led groups receive a tailored quote based on group size, duration, accommodation, supervision, transport, activities, and responsibilities. Request a group conversation." },
  { q: "Can I customize what's included?", a: "Every quote is tailored to your program, duration, and needs. Additions like solo accommodation upgrades, extra transport, or additional support can be added — all confirmed in writing before payment." },
];

export default async function FeesPage() {
  const heroSlides = await getHeroSlides("program-fees");

  return (
    <>
      <HeroSlider slides={heroSlides} />

      <section className="container-page py-12 md:py-16">
        <FeeSelector />
      </section>

      <section className="container-page grid gap-12 pb-8 md:grid-cols-2">
        <div>
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">What's included in your program fee</h2>
          <p className="mt-4 text-[var(--ink-soft)]">
            Your fee covers everything you need to participate safely and meaningfully — from arrival to departure.
          </p>
          <div className="mt-6"><CheckList items={included} tone="accent" /></div>
        </div>
        <div>
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">Typically arranged separately</h2>
          <p className="mt-4 text-[var(--ink-soft)]">
            These are outside FOSCOD's program scope but you'll receive guidance on arranging them.
          </p>
          <div className="mt-6"><CheckList items={excluded} tone="muted" /></div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="max-w-xl text-[clamp(1.7rem,3vw,2.3rem)]">Financial planning FAQ</h2>
        </div>
        <div className="mt-8 max-w-3xl"><FAQ items={faqs} /></div>
      </section>

      <CTABand
        title="Questions about fees?"
        actions={[
          { href: "/contact", label: "Ask a fees question" },
          { href: "/programs/refund-policy", label: "Refund policy", variant: "ghost" },
          { href: "/impact/stories", label: "See fee examples", variant: "secondary" },
        ]}
      />
    </>
  );
}
