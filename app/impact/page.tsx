import { HeroSlider } from "@/components/site/HeroSlider";
import { CardGrid, QuoteGrid, CTABand } from "@/components/site/blocks";
import { ImpactFilter } from "@/components/site/ImpactFilter";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getAlumniExperiences, getCommunityExperiences, getDownloads, getFeaturedProjects, getHeroSlides, getImpactStats, getImpactStories, getImpactVideos, getSubPrograms } from "@/lib/content";

export default async function ImpactPage() {
  const [slides, stats, stories, alumni, videos, community, projects, subPrograms, downloads] = await Promise.all([
    getHeroSlides("impact"), getImpactStats(), getImpactStories(12), getAlumniExperiences(),
    getImpactVideos(), getCommunityExperiences(), getFeaturedProjects(), getSubPrograms(), getDownloads(),
  ]);

  return <>
    <HeroSlider slides={slides} />
    <section className="bg-[var(--surface-2)] py-12 md:py-16"><div className="container-page max-w-4xl"><Eyebrow>Evidence-led impact</Eyebrow><h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">Impact we can stand behind</h2><p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">Every published figure has a date and source. Personal stories and quotations are published only after consent is recorded.</p></div></section>
    <ImpactFilter stats={stats} subPrograms={subPrograms} />

    <section className="py-16 md:py-24"><div className="container-page"><div className="mx-auto max-w-2xl text-center"><Eyebrow>Geography</Eyebrow><h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Five communities in FOSCOD's 2030 geographic target</h2><p className="mt-4 text-lg text-[var(--ink-soft)]">Kalagala, Kyambogo, Naluvule, Wabusanke, and Byabuku form the approved focus geography in the strategic plan.</p></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{["Kalagala", "Kyambogo", "Naluvule", "Wabusanke", "Byabuku"].map((name) => { const count = projects.filter((project) => project.location.toLowerCase().includes(name.toLowerCase())).length; return <div key={name} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 text-center"><h3 className="font-semibold">{name}</h3><p className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--accent-700)]">{count}</p><p className="text-xs text-[var(--muted)]">named {count === 1 ? "project" : "projects"} in current records</p></div>; })}</div></div></section>

    {stories.length ? <CardGrid eyebrow="Impact stories" title="Verified change on the ground" intro="Stories are published with evidence and consent." items={stories.map((story) => ({ title: story.title, excerpt: story.quote || story.narrative?.slice(0, 140) || "Verified community project record.", href: `/impact/stories/${story.slug}`, tone: story.linked_program === "GLE" ? "water" : "forest", media: true }))} more={{ href: "/impact/stories", label: "Read more stories" }} surface /> : null}
    {alumni.length ? <QuoteGrid eyebrow="Alumni experiences" title="In their words" intro="Permissioned reflections from former participants." items={alumni} more={{ href: "/alumni", label: "Meet our alumni" }} /> : null}
    {videos.length ? <CardGrid eyebrow="Impact videos" title="Short films from the field" items={videos.map((item) => ({ ...item, media: true, video: true }))} surface /> : null}
    {community.length ? <CardGrid eyebrow="Community experiences" title="From the people we work with" items={community.map((item) => ({ ...item, media: true }))} /> : null}
    <CardGrid eyebrow="Named projects" title="Community-led projects" intro="Approved project records from FOSCOD's current source material." items={projects.map((project, index) => ({ title: project.title, excerpt: project.summary, href: project.href, tone: (["forest", "water", "earth"] as const)[index % 3], media: true }))} more={{ href: "/projects", label: "View all projects" }} surface />

    {downloads.length ? <section id="downloads" className="bg-[var(--surface-2)] py-16 md:py-24"><div className="container-page"><div className="mx-auto max-w-2xl text-center"><Eyebrow>Downloads</Eyebrow><h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Reports, evidence, and project briefs</h2></div><div className="mt-10 grid gap-6 md:grid-cols-3">{downloads.map((item) => <a key={item.file_url} href={item.file_url} className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6"><p className="text-xs uppercase tracking-wider text-[var(--accent-700)]">{item.category.replaceAll("_", " ")}</p><h3 className="mt-2 text-lg">{item.title}</h3>{item.description ? <p className="mt-2 flex-1 text-sm text-[var(--muted)]">{item.description}</p> : null}<span className="mt-4 text-sm font-medium text-[var(--accent-700)]">Open {item.file_type.toUpperCase()} →</span></a>)}</div></div></section> : null}
    <CTABand title="Help FOSCOD grow verified impact" actions={[{ href: "/donate", label: "Support the work" }, { href: "/partners", label: "Partner with FOSCOD", variant: "secondary" }]} />
  </>;
}
