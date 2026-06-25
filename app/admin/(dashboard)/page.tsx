import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function count(table: string) {
  const supabase = await createClient();
  const { count } = (await supabase
    ?.from(table)
    .select("*", { count: "exact", head: true })) ?? { count: 0 };
  return count ?? 0;
}

export default async function AdminDashboard() {
  const [projects, stories, submissions, partners] = await Promise.all([
    count("projects"),
    count("stories"),
    count("form_submissions"),
    count("partners"),
  ]);

  const cards = [
    { label: "Projects", value: projects, href: "/admin/projects" },
    { label: "Stories", value: stories, href: "/admin/projects" },
    { label: "Submissions", value: submissions, href: "/admin/submissions" },
    { label: "Partners", value: partners, href: "/admin/settings" },
  ];

  return (
    <div>
      <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.16em] text-[var(--accent-700)]">
        Overview
      </p>
      <h1 className="mt-3 text-3xl">Dashboard</h1>
      <p className="mt-2 text-[var(--muted)]">Manage FOSCOD content, submissions, and settings.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--ink)]"
          >
            <p className="font-[family-name:var(--font-display)] text-4xl text-[var(--ink)]">{c.value}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-2)] p-6">
        <h2 className="text-lg">Next steps</h2>
        <ul className="mt-3 list-inside list-disc space-y-1 text-[0.95rem] text-[var(--ink-soft)]">
          <li>Add real impact metrics and switch their status to <strong>verified</strong>.</li>
          <li>Upload field photography to the media library and attach to projects/stories.</li>
          <li>Invite editors and assign roles in the profiles table.</li>
        </ul>
      </div>
    </div>
  );
}
