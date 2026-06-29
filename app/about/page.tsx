import { HeroSlider } from "@/components/site/HeroSlider";
import { SplitSection, Prose, FeatureGrid, FeatureRow, HowWeWork, TeamPreview, CTABand } from "@/components/site/blocks";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides } from "@/lib/content";

export const metadata = pageMeta(
  "About FOSCOD",
  "FOSCOD is a Ugandan indigenous NGO working with rural and underserved communities to design sustainable, ethical, and locally owned development solutions."
);

const values = [
  { title: "Holistic development", body: "Health, livelihoods, environment, and learning advance together, not in silos." },
  { title: "Equity & inclusion", body: "Equal access for youth, women, people with disabilities, and marginalized households." },
  { title: "Community-driven solutions", body: "Locally led and culturally relevant — communities set the priorities." },
  { title: "Sustainability & innovation", body: "Long-term impact, with renewable energy and stewardship at the centre." },
  { title: "Collaboration & partnership", body: "Knowledge shared between communities, universities, and partners." },
  { title: "Transparency & accountability", body: "Honest reporting and ethical management of every resource." },
];

export default async function AboutPage() {
  const heroSlides = await getHeroSlides("about");
  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* Our story */}
      <SplitSection eyebrow="Our story" title="Where we started, where we're headed">
        <Prose>
          <p>
            FOSCOD began with a simple conviction: lasting change in rural Uganda
            has to be led by the communities living it. From our home in Jinja,
            we&rsquo;ve grown into a registered indigenous NGO working across
            districts on clean energy, water, the environment, and livelihoods.
          </p>
          <p>
            We&rsquo;ve also become a bridge — connecting local innovation with
            students, researchers, and partners worldwide. Today our work runs on
            two pillars: <strong>Community Empowerment &amp; Development</strong>{" "}
            and <strong>Global Learning &amp; Exchange</strong>.
          </p>
        </Prose>
      </SplitSection>

      {/* Our team — mint */}
      <TeamPreview
        surface
        title="The people behind the work"
        intro="Behind every project is a team of Ugandan practitioners, a committed board, and the host families and community leaders who make the work possible."
        cards={[
          {
            label: "Staff",
            body: "A small, dedicated field and program team based in Jinja, running our work day to day.",
            href: "/team",
            cta: "Meet the team",
            tone: "water",
          },
          {
            label: "Board of Directors",
            body: "Experienced leaders guiding our governance, ethics, and long-term strategy.",
            href: "/team",
            cta: "Meet the board",
            tone: "forest",
          },
        ]}
      />

      {/* Our mission + vision — white */}
      <SplitSection eyebrow="Our mission" title="Why we exist">
        <Prose>
          <p>
            <strong>Mission.</strong> Empower rural communities through innovative
            environmental solutions, ethical sustainable development, and global
            knowledge exchange.
          </p>
          <p>
            <strong>Vision.</strong> A world where rural communities lead in
            environmental sustainability and clean energy, supported by strong
            local and global partnerships.
          </p>
        </Prose>
      </SplitSection>

      {/* What we value — mint */}
      <section className="bg-[var(--surface-2)] py-16 md:py-20">
        <div className="container-page">
          <h2 className="max-w-xl text-[clamp(1.7rem,3vw,2.3rem)]">What we value</h2>
          <div className="mt-10">
            <FeatureGrid items={values} columns={3} />
          </div>
        </div>
      </section>

      {/* Our approach */}
      <FeatureRow
        eyebrow="Our approach"
        title="Community-led, asset-based, locally owned"
        tone="forest"
        imageCaption="Community planning session — add photo via CMS"
        body="We start by listening. Through community assessment and asset-based co-design, communities set the priorities and lead delivery — we bring the global knowledge, supervision, and partnerships that make solutions last."
        cta={{ href: "/programs/community-empowerment-development", label: "See our model" }}
      />

      {/* How we work — mint */}
      <HowWeWork
        surface
        title="How we work"
        steps={[
          "Conduct a community situation analysis",
          "Build partnerships with local leaders",
          "Co-design solutions with the community",
          "Implement with local supervision",
          "Monitor, report, and hand over ownership",
        ]}
      />

      <CTABand
        title="Work with FOSCOD"
        body="Meet the team behind the work, explore a partnership, or get in touch."
        actions={[
          { href: "/team", label: "Meet the team" },
          { href: "/partners", label: "Partner with us", variant: "secondary" },
          { href: "/contact", label: "Contact", variant: "ghost" },
        ]}
      />
    </>
  );
}
