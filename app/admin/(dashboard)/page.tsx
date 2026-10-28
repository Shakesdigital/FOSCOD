import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function count(table: string) {
  const supabase = await createClient();
  const { count: value } = (await supabase
    ?.from(table)
    .select("*", { count: "exact", head: true })) ?? { count: 0 };
  return value ?? 0;
}

const sections = [
  { href: "/admin/pages", label: "Pages", description: "Every landing page, edited as one unit — sections top-to-bottom." },
  { href: "/admin/articles", label: "Articles", description: "Stories and impact stories in categories." },
  { href: "/admin/components", label: "Components", description: "Reusable page sections: heroes, cards, carousels." },
  { href: "/admin/settings", label: "Website settings", description: "Colors, fonts, logos, menus, technical config." },
  { href: "/admin/forms", label: "Forms", description: "Application, donation, partnership and newsletter forms with submissions." },
];

export default async function AdminDashboard() {
  const [pages, stories, impactStories, submissions, subscribers] = await Promise.all([
    count("pages"),
    count("stories"),
    count("impact_stories"),
    count("form_submissions"),
    count("newsletter_subscribers"),
  ]);

  const cards = [
    { label: "Landing pages", value: pages, href: "/admin/pages" },
    { label: "Blog stories", value: stories, href: "/admin/content/stories" },
    { label: "Impact stories", value: impactStories, href: "/admin/content/impact-stories" },
    { label: "Form submissions", value: submissions, href: "/admin/forms" },
    { label: "Newsletter subscribers", value: subscribers, href: "/admin/forms/newsletter" },
  ];

  return (
    <div>
      <p className="font-[family-name:var(--font-text)] text-[0.7rem] uppercase tracking-[0.16em] text-[var(--accent-700)]">
        Overview
      </p>
      <h1 className="mt-3 text-3xl">FOSCOD CMS</h1>
      <p className="mt-2 text-[var(--muted)]">Manage the website: pages, articles, components, settings, and forms.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--ink)]"
          >
            <p className="font-[family-name:var(--font-text)] text-4xl text-[var(--ink)]">{c.value}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--ink)]"
          >
            <p className="text-lg font-medium">{s.label}</p>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">{s.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
