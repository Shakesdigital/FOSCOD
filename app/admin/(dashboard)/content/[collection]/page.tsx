import Link from "next/link";
import { notFound } from "next/navigation";
import { cmsCollectionMap } from "@/lib/cms-collections";
import { createClient } from "@/lib/supabase/server";
import { deleteContent } from "../actions";
import { ContentForm } from "../ContentForm";

export default async function CollectionPage({ params, searchParams }: { params: Promise<{ collection: string }>; searchParams: Promise<{ edit?: string; error?: string; saved?: string; deleted?: string }> }) {
  const { collection: key } = await params;
  const query = await searchParams;
  const collection = cmsCollectionMap[key];
  if (!collection) notFound();

  const supabase = await createClient();
  const { data: rows } = (await supabase?.from(collection.table).select("*").order("created_at", { ascending: false }).limit(100)) ?? { data: [] };
  const current = query.edit ? rows?.find((row) => row.id === query.edit) : undefined;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href="/admin/content" className="text-sm text-[var(--accent-700)] hover:underline">← All collections</Link>
          <h1 className="mt-3 text-3xl">{collection.label}</h1>
          <p className="mt-2 max-w-2xl text-[var(--muted)]">{collection.description}</p>
        </div>
        <Link href={`/admin/content/${key}`} className="rounded-full bg-[var(--accent-600)] px-5 py-2.5 text-sm font-medium text-white">Add {collection.singular}</Link>
      </div>

      {query.error ? <div className="mt-6 rounded-[var(--radius-md)] border border-red-300 bg-red-50 p-4 text-sm text-red-800">{query.error}</div> : null}
      {query.saved ? <div className="mt-6 rounded-[var(--radius-md)] border border-green-300 bg-green-50 p-4 text-sm text-green-800">Saved successfully.</div> : null}
      {query.deleted ? <div className="mt-6 rounded-[var(--radius-md)] border border-green-300 bg-green-50 p-4 text-sm text-green-800">Deleted successfully.</div> : null}

      <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.75fr)]">
        <section className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
          <div className="border-b border-[var(--border)] px-5 py-4"><h2 className="text-lg">Existing records</h2></div>
          <ul className="divide-y divide-[var(--border)]">
            {(rows ?? []).map((row) => (
              <li key={row.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0"><p className="truncate font-medium">{String(row[collection.titleField] ?? "Untitled")}</p><p className="mt-1 truncate font-[family-name:var(--font-text)] text-xs text-[var(--muted)]">{row.status ?? (row.visible === false ? "hidden" : "visible")} · {row.slug ?? row.id}</p></div>
                <div className="flex shrink-0 gap-2">
                  <Link href={`/admin/content/${key}?edit=${row.id}`} className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs hover:border-[var(--ink)]">Edit</Link>
                  <form action={deleteContent}><input type="hidden" name="collection" value={key} /><input type="hidden" name="id" value={row.id} /><button type="submit" className="rounded-full border border-red-200 px-3 py-1.5 text-xs text-red-700 hover:bg-red-50">Delete</button></form>
                </div>
              </li>
            ))}
            {!rows?.length ? <li className="px-5 py-10 text-center text-sm text-[var(--muted)]">No records yet.</li> : null}
          </ul>
        </section>

        <section className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 xl:sticky xl:top-8 xl:self-start">
          <h2 className="text-xl">{current ? `Edit ${collection.singular}` : `Add ${collection.singular}`}</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Fields marked * are required. Save as draft until facts, consent, images, and evidence are ready.</p>
          <ContentForm collection={collection} current={current ?? undefined} collectionKey={key} />
        </section>
      </div>
    </div>
  );
}
