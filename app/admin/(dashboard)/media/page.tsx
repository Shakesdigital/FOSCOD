import Link from "next/link";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { createClient } from "@/lib/supabase/server";

export default async function MediaPage() {
  const supabase = await createClient();
  const { data: assets } = (await supabase?.from("media_assets").select("id,public_url,alt_text,caption,created_at").order("created_at", { ascending: false }).limit(100)) ?? { data: [] };

  return (
    <div>
      <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.16em] text-[var(--accent-700)]">Accessible media</p>
      <h1 className="mt-3 text-3xl">Media library</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">Upload approved FOSCOD field images, record alt text, and copy the public URL into a content record.</p>

      <div className="mt-8 grid gap-8 xl:grid-cols-[380px_minmax(0,1fr)]">
        <MediaUploader />
        <section>
          <div className="flex items-center justify-between gap-4"><h2 className="text-xl">Uploaded images</h2><Link href="/admin/content/media-assets" className="text-sm text-[var(--accent-700)] hover:underline">Edit media records</Link></div>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(assets ?? []).map((asset) => (
              <article key={asset.id} className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset.public_url} alt={asset.alt_text} className="aspect-[4/3] w-full object-cover" />
                <div className="p-4"><p className="text-sm font-medium">{asset.alt_text}</p>{asset.caption ? <p className="mt-1 text-xs text-[var(--muted)]">{asset.caption}</p> : null}<input readOnly value={asset.public_url} aria-label={`URL for ${asset.alt_text}`} className="mt-3 w-full rounded border border-[var(--border)] bg-[var(--surface-2)] px-2 py-1.5 text-xs" /></div>
              </article>
            ))}
            {!assets?.length ? <p className="col-span-full rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] p-10 text-center text-sm text-[var(--muted)]">No images have been uploaded yet.</p> : null}
          </div>
        </section>
      </div>
    </div>
  );
}
