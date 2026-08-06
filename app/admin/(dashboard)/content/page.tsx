import Link from "next/link";
import { cmsCollections } from "@/lib/cms-collections";
import { createClient } from "@/lib/supabase/server";

export default async function ContentHub() {
  const supabase = await createClient();
  const counts = await Promise.all(cmsCollections.map(async (collection) => {
    const { count } = (await supabase?.from(collection.table).select("*", { count: "exact", head: true })) ?? { count: 0 };
    return [collection.key, count ?? 0] as const;
  }));
  const countMap = Object.fromEntries(counts);

  return (
    <div>
      <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.16em] text-[var(--accent-700)]">Website structure</p>
      <h1 className="mt-3 text-3xl">Content collections</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">The CMS mirrors the public website, so editors can move from programs to activities, projects, evidence, stories, people, and resources without translating between systems.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cmsCollections.map((collection) => (
          <Link key={collection.key} href={`/admin/content/${collection.key}`} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:-translate-y-0.5 hover:border-[var(--accent-600)] hover:shadow-[var(--shadow-md)]">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl">{collection.label}</h2>
              <span className="rounded-full bg-[var(--surface-2)] px-3 py-1 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">{countMap[collection.key]}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{collection.description}</p>
            <span className="mt-5 inline-flex text-sm font-medium text-[var(--accent-700)]">Manage {collection.label.toLowerCase()} →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
