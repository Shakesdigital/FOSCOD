import { PageHero } from "@/components/site/PageHero";
import { SplitSection, Prose, CTABand } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { pageMeta } from "@/lib/seo";
import { getActivitiesBySubProgram, getSubPrograms, getFeaturedProjects, type Activity } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // We'll need to search across all sub-programs for this activity
  const subPrograms = await getSubPrograms();
  let activity = null;
  for (const sp of subPrograms) {
    const activities = await getActivitiesBySubProgram(sp.slug);
    activity = activities.find((a) => a.slug === slug);
    if (activity) break;
  }
  if (!activity) return { title: "Activity not found" };
  return pageMeta(activity.title, activity.summary || `FOSCOD Activity: ${activity.title}`);
}

export default async function ActivityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Search across all sub-programs for this activity
  const subPrograms = await getSubPrograms();
  let activity: Activity | null = null;
  let parentSubProgram: (typeof subPrograms)[0] | null = null;

  for (const sp of subPrograms) {
    const activities = await getActivitiesBySubProgram(sp.slug);
    const found = activities.find((a) => a.slug === slug);
    if (found) {
      activity = found;
      parentSubProgram = sp;
      break;
    }
  }

  if (!activity) notFound();

  const relatedProjects = (await getFeaturedProjects()).filter((p) =>
    ["greening-kalagala", "water-spring-protection-naluvule", "coffee-farming-mobilization", "solar-powered-water-system-naluvule", "carbon-credit-project"].includes(p.slug)
  ).slice(0, 2);

  const statusLabels: Record<string, { label: string; color: string }> = {
    planned: { label: "Planned", color: "var(--gold-700)" },
    ongoing: { label: "Ongoing", color: "var(--accent-700)" },
    completed: { label: "Completed", color: "var(--forest-700)" },
  };

  const statusInfo = statusLabels[activity.status] || { label: activity.status, color: "var(--muted)" };

  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow={parentSubProgram ? `${parentSubProgram.name} — Activity` : "Activity"}
        title={activity.title}
        intro={activity.summary || activity.description?.slice(0, 200) || "Community-driven activity under FOSCOD's CEDP program."}
        imageUrl={activity.hero_image_url}
      />

      {/* WHAT THIS ACTIVITY INVOLVES + WHO IT REACHES */}
      <section className="py-16 md:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Eyebrow>What this activity involves</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">{activity.title}</h2>
            <div className="mt-6 max-w-[var(--measure)] space-y-4 text-[1.05rem] leading-relaxed text-[var(--ink-soft)]">
              {activity.description ? (
                activity.description.split("\n\n").map((para, i) => <p key={i}>{para}</p>)
              ) : (
                <p>{activity.summary || "Detailed description coming soon. This activity is part of FOSCOD's community-driven development approach in Kalagala Parish."}</p>
              )}
            </div>

            {activity.start_date && (
              <div className="mt-8 p-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
                <Eyebrow>Timeline & Status</Eyebrow>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div>
                    <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)]">Status</p>
                    <p className="font-medium" style={{ color: statusInfo.color }}>{statusInfo.label}</p>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)]">Start Date</p>
                    <p className="font-medium">{new Date(activity.start_date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                  </div>
                  {activity.end_date && (
                    <div>
                      <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)]">End Date</p>
                      <p className="font-medium">{new Date(activity.end_date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                    </div>
                  )}
                  <div>
                    <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)]">Parent Program</p>
                    <p className="font-medium">{parentSubProgram?.name || "CEDP"}</p>
                  </div>
                </div>
              </div>
            )}

            {/* WHO IT REACHES */}
            <div className="mt-8">
              <Eyebrow>Who it reaches</Eyebrow>
              <p className="mt-4 text-[var(--ink-soft)]">
                This activity serves communities in <strong>Kalagala Parish, Njeru Municipality, Buikwe District</strong> — specifically the five communities of Kalagala, Kyambogo, Naluvule, Wabusanke, and Byabuku. Target groups include women, youth, smallholder farmers, and community-based organizations.
              </p>
            </div>
          </div>

          {/* IMAGE GALLERY */}
          <div className="space-y-4">
            <PhotoSlot
              tone={parentSubProgram ? (parentSubProgram.strategic_goal <= 2 ? "forest" : parentSubProgram.strategic_goal <= 4 ? "water" : "earth") : "forest"}
              ratio="4/3"
              imageUrl={activity.hero_image_url}
              caption={activity.title}
              className="shadow-[var(--shadow-lg)]"
            />
            {activity.gallery && activity.gallery.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {activity.gallery.slice(0, 3).map((img, i) => (
                  <PhotoSlot
                    key={i}
                    tone="earth"
                    ratio="4/3"
                    imageUrl={img.url}
                    caption={img.caption || img.alt || `${activity.title} — gallery ${i + 1}`}
                    className="shadow-[var(--shadow-sm)]"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* LINKED PROJECTS */}
      {relatedProjects.length > 0 && (
        <section className="bg-[var(--surface-2)] py-16 md:py-24">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Linked projects</Eyebrow>
              <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Projects this activity contributes to</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {relatedProjects.map((p, i) => (
                <Link
                  key={p.slug}
                  href={p.href}
                  className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
                >
                  <PhotoSlot tone={["forest", "water", "earth"][i % 3] as "forest" | "water" | "earth"} ratio="16/9" tag={p.theme} caption={p.title} />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
                      {p.theme}
                    </p>
                    <h3 className="mt-2 text-lg leading-snug">{p.title}</h3>
                    <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-[var(--muted)]">{p.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-[var(--accent-700)]">
                      View project →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BREADCRUMB BACK TO PARENT */}
      <section className="py-12">
        <div className="container-page">
          <nav className="flex items-center gap-2 text-sm text-[var(--muted)]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--ink)]">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/programs/community-empowerment-development" className="hover:text-[var(--ink)]">CEDP</Link>
            {parentSubProgram && (
              <>
                <span aria-hidden>/</span>
                <Link href={`/programs/cedp/${parentSubProgram.slug}`} className="hover:text-[var(--ink)]">{parentSubProgram.name}</Link>
              </>
            )}
            <span aria-hidden>/</span>
            <span className="text-[var(--ink)]" aria-current="page">{activity.title}</span>
          </nav>
        </div>
      </section>

      <CTABand
        title="Want to support this work?"
        body="Partner with FOSCOD, fund a project, or join as a volunteer to help activities like this reach more communities."
        actions={[
          { href: "/partners", label: "Partner with us" },
          { href: "/donate", label: "Support our work", variant: "secondary" },
          { href: "/apply", label: "Volunteer with us", variant: "ghost" },
        ]}
      />
    </>
  );
}
