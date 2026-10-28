import Link from "next/link";
import { cmsCollectionMap } from "@/lib/cms-collections";

const groups = [
  {
    heading: "Story articles",
    description: "Blog posts, program stories, insights and impact stories — each filed under a category.",
    keys: ["stories", "impact-stories", "impact-story-details"],
  },
  {
    heading: "Categories",
    description: "Every article must fall in a category: Blog, Program, Insight, Impact Stories, or a program-area subcategory.",
    keys: ["article-categories"],
  },
  {
    heading: "Supporting evidence",
    description: "Verified statistics that back the numbers quoted across articles and pages.",
    keys: ["impact-stats"],
  },
];

export default async function AdminArticlesIndex() {
  return (
    <div>
      <p className="font-[family-name:var(--font-text)] text-[0.7rem] uppercase tracking-[0.16em] text-[var(--accent-700)]">
        Content workspace
      </p>
      <h1 className="mt-3 text-3xl">Articles</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        Every article lives in a category. When you add a new article you pick where
        it belongs — a blog post, a program story, an insight, or an impact story in
        one of the program areas.
      </p>

      <div className="mt-8 space-y-10">
        {groups.map((group) => (
          <section key={group.heading}>
            <h2 className="text-lg">{group.heading}</h2>
            <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">{group.description}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {group.keys.map((key) => {
                const collection = cmsCollectionMap[key];
                if (!collection) return null;
                return (
                  <Link
                    key={key}
                    href={`/admin/content/${key}`}
                    className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--ink)]"
                  >
                    <p className="text-lg font-medium">{collection.label}</p>
                    <p className="mt-2 text-sm text-[var(--ink-soft)]">{collection.description}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
