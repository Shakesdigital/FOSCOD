import Link from "next/link";
import { cmsCollections, cmsClusters } from "@/lib/cms-collections";
import { createClient } from "@/lib/supabase/server";

export default async function ContentHub() {
  const supabase = await createClient();
  const counts = await Promise.all(cmsCollections.map(async (collection) => {
    const { count } = (await supabase?.from(collection.table).select("*", { count: "exact", head: true })) ?? { count: 0 };
    return [collection.key, count ?? 0] as const;
  }));
  const countMap = Object.fromEntries(counts);

  // Group collections by their cluster for the hub view
  const grouped = Object.entries(cmsClusters).map(([clusterKey, clusterInfo]) => ({
    key: clusterKey,
    label: clusterInfo.label,
    description: clusterInfo.description,
    collections: cmsCollections.filter((c) => c.cluster === clusterKey),
  }));

  return (
    <div>
      <p className="font-[family-name:var(--font-text)] text-[0.7rem] uppercase tracking-[0.16em] text-[var(--accent-700)]">
        Website structure
      </p>
      <h1 className="mt-3 text-3xl">Content collections</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        Content is organized into clusters matching the public website. Editors can move
        from landing pages to programs, projects, stories, people, and resources without
        translating between systems.
      </p>

      <div className="mt-8 space-y-4">
        {grouped.map((group) => {
          if (!group.collections.length) return null;
          const collectionCount = group.collections.length;
          const collapsedByDefault = group.collections.length > 6;
          return (
            <details
              key={group.key}
              className="group"
              {...(collapsedByDefault ? {} : { open: true })}
            >
              <summary className="flex cursor-pointer items-center justify-between rounded-t-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-5 py-4 text-lg font-medium text-[var(--ink)] marker:content-none hover:bg-[var(--surface-2)]">
                <span>{group.label}</span>
                <span className="flex items-center gap-2 text-sm text-[var(--muted)]">
                  <span className="rounded-full bg-[var(--surface-2)] px-2.5 py-0.5 font-[family-name:var(--font-text)]">
                    {collectionCount}
                  </span>
                  <span className="transition-transform duration-200 group-open:rotate-180">
                    ▼
                  </span>
                </span>
              </summary>
              <div className="overflow-hidden border-x border-b border-[var(--border)] bg-[var(--surface)] rounded-b-[var(--radius-lg)]">
                <p className="mt-2 px-5 pt-4 pb-1 text-sm text-[var(--muted)]">{group.description}</p>
                <div className="px-5 pb-4 pt-1 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {group.collections.map((collection) => (
                    <Link
                      key={collection.key}
                      href={`/admin/content/${collection.key}`}
                      className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:-translate-y-0.5 hover:border-[var(--accent-600)] hover:shadow-[var(--shadow-md)]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg">{collection.label}</h3>
                        <span className="rounded-full bg-[var(--surface-2)] px-3 py-1 font-[family-name:var(--font-text)] text-xs text-[var(--muted)]">
                          {countMap[collection.key]}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                        {collection.description}
                      </p>
                      <span className="mt-3 block text-sm font-medium text-[var(--accent-700)]">
                        Manage {collection.label.toLowerCase()} →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
