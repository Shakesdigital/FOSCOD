import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/blocks";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { pageMeta } from "@/lib/seo";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata = pageMeta(
  "Meet the team",
  "The board, staff, advisors, and field coordinators behind FOSCOD's community-led development and global learning programs."
);

type Member = { name: string; role: string; category: string };

const categories = [
  { key: "board", label: "Board of Directors" },
  { key: "staff", label: "Staff & Program Team" },
  { key: "advisor", label: "Advisors & Technical Experts" },
  { key: "field", label: "Field Coordinators" },
];

const fallback: Member[] = [
  { name: "Board Member", role: "Chairperson", category: "board" },
  { name: "Board Member", role: "Treasurer", category: "board" },
  { name: "Staff Member", role: "Executive Director", category: "staff" },
  { name: "Staff Member", role: "Programs Manager", category: "staff" },
  { name: "Advisor", role: "Climate & MRV Advisor", category: "advisor" },
  { name: "Field Coordinator", role: "Kalagala Parish", category: "field" },
];

async function getTeam(): Promise<Member[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = (await supabase
      ?.from("team_members")
      .select("name,role,category")
      .eq("visible", true)
      .order("order_column")) ?? { data: null };
    if (data && data.length) return data as Member[];
  }
  return fallback;
}

export default async function TeamPage() {
  const team = await getTeam();
  return (
    <>
      <PageHero
        eyebrow="Governance & people"
        title="Meet the people behind FOSCOD"
        intro="Board, staff, advisors, and the field coordinators who make community-led work possible. Add real bios and photos in the CMS."
      />

      {categories.map((cat) => {
        const members = team.filter((m) => m.category === cat.key);
        if (!members.length) return null;
        return (
          <section key={cat.key} className="container-page py-12 first:pt-16">
            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">{cat.label}</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {members.map((m, i) => (
                <li key={`${m.name}-${i}`}>
                  <PhotoSlot
                    tone={i % 2 ? "water" : "forest"}
                    ratio="1/1"
                    caption="Team portrait"
                  />
                  <p className="mt-3 font-medium text-[var(--ink)]">{m.name}</p>
                  <p className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.1em] text-[var(--muted)]">
                    {m.role}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

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
