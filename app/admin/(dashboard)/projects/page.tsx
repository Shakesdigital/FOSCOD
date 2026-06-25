import { createClient } from "@/lib/supabase/server";

export default async function AdminProjects() {
  const supabase = await createClient();
  const { data: projects } = (await supabase
    ?.from("projects")
    .select("id,title,theme,status,featured,location,order_column")
    .order("order_column")) ?? { data: [] };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.16em] text-[var(--accent-700)]">
            Content
          </p>
          <h1 className="mt-3 text-3xl">Projects</h1>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--border)] bg-[var(--surface-2)] text-[var(--muted)]">
            <tr>
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Theme</th>
              <th className="px-5 py-3 font-medium">Location</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Featured</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {(projects ?? []).map((p) => (
              <tr key={p.id} className="hover:bg-[var(--surface-2)]">
                <td className="px-5 py-3 font-medium text-[var(--ink)]">{p.title}</td>
                <td className="px-5 py-3 text-[var(--muted)]">{p.theme}</td>
                <td className="px-5 py-3 text-[var(--muted)]">{p.location}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs ${
                    p.status === "published"
                      ? "bg-[var(--accent-50)] text-[var(--accent-700)]"
                      : "bg-[var(--surface-2)] text-[var(--muted)]"
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-[var(--muted)]">{p.featured ? "★" : "—"}</td>
              </tr>
            ))}
            {(!projects || projects.length === 0) && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-[var(--muted)]">
                  No projects yet. Run the seed, or add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 font-[family-name:var(--font-mono)] text-[0.72rem] text-[var(--muted)]">
        Full create/edit forms (rich text, gallery, SEO, ordering) extend from this
        list — the schema and RLS are already in place.
      </p>
    </div>
  );
}
