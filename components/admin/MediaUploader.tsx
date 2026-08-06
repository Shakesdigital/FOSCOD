"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function safeName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "");
}

export function MediaUploader() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function upload(formData: FormData) {
    setBusy(true);
    setMessage("");
    const file = formData.get("file");
    const altText = String(formData.get("alt_text") ?? "").trim();
    const caption = String(formData.get("caption") ?? "").trim();

    if (!(file instanceof File) || !file.size || !altText) {
      setMessage("Choose an image and add meaningful alt text.");
      setBusy(false);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setMessage("The media library currently accepts image files only.");
      setBusy(false);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setMessage("Please use an image smaller than 10 MB.");
      setBusy(false);
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setMessage("Connect Supabase before uploading media.");
      setBusy(false);
      return;
    }

    const objectPath = `media/${Date.now()}-${safeName(file.name)}`;
    const { error: uploadError } = await supabase.storage.from("foscod-media").upload(objectPath, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false,
    });
    if (uploadError) {
      setMessage(uploadError.message);
      setBusy(false);
      return;
    }

    const { data: publicData } = supabase.storage.from("foscod-media").getPublicUrl(objectPath);
    const { data: userData } = await supabase.auth.getUser();
    const { error: recordError } = await supabase.from("media_assets").insert({
      bucket: "foscod-media",
      object_path: objectPath,
      public_url: publicData.publicUrl,
      alt_text: altText,
      caption: caption || null,
      mime_type: file.type,
      file_size_bytes: file.size,
      uploaded_by: userData.user?.id ?? null,
    });
    if (recordError) {
      await supabase.storage.from("foscod-media").remove([objectPath]);
      setMessage(recordError.message);
      setBusy(false);
      return;
    }

    setMessage("Image uploaded and added to the media library.");
    setBusy(false);
    router.refresh();
  }

  return (
    <form action={upload} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6">
      <h2 className="text-xl">Upload an image</h2>
      <p className="mt-2 text-sm text-[var(--muted)]">JPEG, PNG, WebP, GIF, or SVG; maximum 10 MB. Alt text is required.</p>
      <div className="mt-5 grid gap-4">
        <label className="text-sm font-medium">Image<input name="file" type="file" accept="image/*" required className="mt-2 block w-full rounded-[var(--radius-md)] border border-[var(--border)] p-3 text-sm" /></label>
        <label className="text-sm font-medium">Alt text<span className="ml-1 text-[var(--accent-700)]">*</span><input name="alt_text" required placeholder="Describe the image for someone who cannot see it" className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm" /></label>
        <label className="text-sm font-medium">Caption<textarea name="caption" rows={3} className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm" /></label>
      </div>
      {message ? <p className="mt-4 text-sm text-[var(--ink-soft)]" role="status">{message}</p> : null}
      <button disabled={busy} type="submit" className="mt-5 rounded-full bg-[var(--accent-600)] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60">{busy ? "Uploading..." : "Upload image"}</button>
    </form>
  );
}
