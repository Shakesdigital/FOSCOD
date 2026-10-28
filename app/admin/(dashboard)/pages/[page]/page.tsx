import Link from "next/link";
import { notFound } from "next/navigation";
import type { CmsCollection } from "@/lib/cms-collections";
import { cmsPageMap, sectionCollection, type PageSection } from "@/lib/cms-pages";
import { createClient } from "@/lib/supabase/server";
import { deleteContent } from "@/app/admin/(dashboard)/content/actions";
import { ContentForm } from "@/app/admin/(dashboard)/content/ContentForm";

type Props = {
  params: Promise<{ page: string }>;
  searchParams: Promise<{ error?: string; saved?: string; deleted?: string }>;
};

export default async function PageEditor({ params, searchParams }: Props) {
  const { page: key } = await params;
  const query = await searchParams;
  const page = cmsPageMap[key];
  if (!page) notFound();

  const returnTo = `/admin/pages/${page.key}`;
  const supabase = await createClient();

  // Fetch rows for every records section up front.
  type LoadedSection = {
    section: Extract<PageSection, { kind: "records" }>;
    collection: CmsCollection;
    rows: Record<string, unknown>[];
  };
  const loaded: LoadedSection[] = [];
  for (const section of page.sections) {
    if (section.kind !== "records") continue;
    const collection = sectionCollection(section);
    if (!collection) continue;
    let builder = supabase?.from(collection.table).select("*");
    if (builder && section.filter) builder = builder.eq(section.filter.column, section.filter.value);
    const sort = section.sort ?? { column: "created_at", ascending: false };
    if (builder) builder = builder.order(sort.column, { ascending: sort.ascending });
    const { data } = (await builder?.limit(section.single ? 1 : (section.max ?? 100))) ?? { data: [] };
    loaded.push({ section, collection, rows: (data ?? []) as Record<string, unknown>[] });
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href="/admin/pages" className="text-sm text-[var(--accent-700)] hover:underline">← All pages</Link>
          <h1 className="mt-3 text-3xl">{page.title}</h1>
          <p className="mt-2 max-w-2xl text-[var(--muted)]">{page.description}</p>
          <p className="mt-1 font-[family-name:var(--font-text)] text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)]">
            Live at {page.path}
          </p>
        </div>
        <Link
          href={page.path}
          className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm hover:border-[var(--ink)]"
        >
          View page ↗
        </Link>
      </div>

      {query.error ? <div className="mt-6 rounded-[var(--radius-md)] border border-red-300 bg-red-50 p-4 text-sm text-red-800">{query.error}</div> : null}
      {query.saved ? <div className="mt-6 rounded-[var(--radius-md)] border border-green-300 bg-green-50 p-4 text-sm text-green-800">Saved successfully.</div> : null}
      {query.deleted ? <div className="mt-6 rounded-[var(--radius-md)] border border-green-300 bg-green-50 p-4 text-sm text-green-800">Deleted successfully.</div> : null}

      {/* Section anchor rail — jump straight to the section you need. */}
      <nav className="mt-8 flex flex-wrap gap-2">
        {page.sections.map((section) => (
          <a
            key={section.key}
            href={`#section-${section.key}`}
            className="rounded-full border border-[var(--border)] px-3.5 py-1.5 text-xs text-[var(--ink-soft)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
          >
            {section.label}
          </a>
        ))}
      </nav>

      <div className="mt-8 space-y-8">
        {page.sections.map((section) => {
          if (section.kind === "link") {
            return (
              <section
                key={section.key}
                id={`section-${section.key}`}
                className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-2)] p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg">{section.label}</h2>
                    <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">{section.description}</p>
                  </div>
                  <Link href={section.href} className="rounded-full bg-[var(--accent-600)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--accent-700)]">
                    {section.linkLabel}
                  </Link>
                </div>
              </section>
            );
          }

          const loadedSection = loaded.find((s) => s.section.key === section.key);
          if (!loadedSection) return null;
          const { collection, rows } = loadedSection;

          return (
            <section
              key={section.key}
              id={`section-${section.key}`}
              className="scroll-mt-6 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl">{section.label}</h2>
                  {section.description ? (
                    <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">{section.description}</p>
                  ) : null}
                  {section.filter ? (
                    <p className="mt-2 inline-block rounded-full bg-[var(--surface-2)] px-2.5 py-1 font-[family-name:var(--font-text)] text-[0.6rem] uppercase tracking-[0.1em] text-[var(--muted)]">
                      {section.filter.column}: {section.filter.value}
                    </p>
                  ) : null}
                </div>
              </div>

              {section.single ? (
                <div className="mt-6 max-w-2xl">
                  <ContentForm
                    collection={collection}
                    collectionKey={collection.key}
                    current={rows[0]}
                    returnTo={returnTo}
                  />
                </div>
              ) : (
                <div className="mt-6 space-y-3">
                  <details className="rounded-[var(--radius-md)] border border-[var(--border)]">
                    <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
                      + Add {collection.singular}
                    </summary>
                    <div className="border-t border-[var(--border)] p-4">
                      <ContentForm
                        collection={collection}
                        collectionKey={collection.key}
                        presets={section.presets}
                        returnTo={returnTo}
                      />
                    </div>
                  </details>

                  {rows.map((row) => (
                    <details key={String(row.id)} className="rounded-[var(--radius-md)] border border-[var(--border)]">
                      <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3 text-sm">
                        <span className="min-w-0 truncate font-medium">
                          {String(row[collection.titleField] ?? "Untitled")}
                        </span>
                        <span className="shrink-0 font-[family-name:var(--font-text)] text-[0.6rem] uppercase tracking-[0.1em] text-[var(--muted)]">
                          {String(row.status ?? (row.visible === false ? "hidden" : "visible"))}
                        </span>
                      </summary>
                      <div className="border-t border-[var(--border)] p-4">
                        <ContentForm
                          collection={collection}
                          collectionKey={collection.key}
                          current={row}
                          returnTo={returnTo}
                        />
                        <form action={deleteContent} className="mt-4 border-t border-[var(--border)] pt-4">
                          <input type="hidden" name="collection" value={collection.key} />
                          <input type="hidden" name="id" value={String(row.id)} />
                          <input type="hidden" name="returnTo" value={returnTo} />
                          <button type="submit" className="rounded-full border border-red-200 px-3.5 py-1.5 text-xs text-red-700 hover:bg-red-50">
                            Delete
                          </button>
                        </form>
                      </div>
                    </details>
                  ))}

                  {!rows.length ? (
                    <p className="px-1 py-4 text-sm text-[var(--muted)]">Nothing here yet — add the first one above.</p>
                  ) : null}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
