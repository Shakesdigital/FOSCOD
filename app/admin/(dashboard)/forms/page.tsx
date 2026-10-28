import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const CATEGORIES = [
  {
    slug: "application",
    title: "Application forms",
    description: "Program applications, internship and volunteer applications, and group bookings.",
    forms: ["Apply form (/apply/form)", "Internship form (/internships)", "Volunteer form (/volunteer)", "Group form (/volunteer/group)"],
  },
  {
    slug: "donation",
    title: "Donation forms",
    description: "Donation enquiries and support-a-cause submissions.",
    forms: ["Donate form (/donate)"],
  },
  {
    slug: "partnership",
    title: "Partnership & collaboration forms",
    description: "Partner applications, collaboration proposals, and general contact enquiries.",
    forms: ["Partner form (/partners)", "Contact form (/contact)"],
  },
  {
    slug: "newsletter",
    title: "Newsletter forms",
    description: "Newsletter signups from the homepage, footer and articles.",
    forms: ["Newsletter signup (site-wide footer)"],
  },
] as const;

export default async function AdminFormsIndex() {
  const supabase = await createClient();
  const counts = await Promise.all(
    CATEGORIES.map(async (category) => {
      const { count } = (await supabase
        ?.from("form_submissions")
        .select("*", { count: "exact", head: true })
        .eq("form_category", category.slug)) ?? { count: 0 };
      return { slug: category.slug, count: count ?? 0 };
    }),
  );
  const countMap = Object.fromEntries(counts.map((c) => [c.slug, c.count]));

  return (
    <div>
      <p className="font-[family-name:var(--font-text)] text-[0.7rem] uppercase tracking-[0.16em] text-[var(--accent-700)]">
        Content workspace
      </p>
      <h1 className="mt-3 text-3xl">Forms</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        All public forms in four categories, and every submission they receive.
        Open a category to review submissions and move them through your workflow.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/admin/forms/${category.slug}`}
            className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--ink)]"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-lg font-medium">{category.title}</p>
              <span className="rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs text-[var(--muted)]">
                {countMap[category.slug] ?? 0} submission{(countMap[category.slug] ?? 0) === 1 ? "" : "s"}
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">{category.description}</p>
            <ul className="mt-3 space-y-1 text-xs text-[var(--muted)]">
              {category.forms.map((form) => <li key={form}>· {form}</li>)}
            </ul>
          </Link>
        ))}
      </div>
    </div>
  );
}
