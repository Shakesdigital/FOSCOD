"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

/** InlineImageUpload — a tiny file picker that uploads an image to the
 *  `foscod-media` bucket and writes the public URL into the named form field.
 *  Shows a preview thumbnail once uploaded. */
export function InlineImageUpload({
  fieldName,
  initialValue = "",
  onUpload,
}: {
  fieldName: string;
  initialValue?: string;
  onUpload?: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(initialValue);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const targetId = `field-${fieldName}`;

  async function handleFiles(files: FileList | null) {
    if (!files || !files[0]) return;
    const file = files[0];

    // basic validation
    if (!file.type.startsWith("image/")) {
      setError("Only image files (JPEG, PNG, WebP, GIF, SVG) are accepted.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Please use an image smaller than 10 MB.");
      return;
    }

    setUploading(true);
    setError("");

    const supabase = createClient();
    if (!supabase) {
      setError("Connect Supabase before uploading.");
      setUploading(false);
      return;
    }

    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "");
    const objectPath = `media/inline-${Date.now()}-${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from("foscod-media")
      .upload(objectPath, file, {
        cacheControl: "3600",
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data: publicData } = supabase.storage.from("foscod-media").getPublicUrl(objectPath);
    const publicUrl = publicData.publicUrl;

    // write the URL into the visible form input that the form will submit
    setPreview(publicUrl);
    const input = document.getElementById(targetId) as HTMLInputElement | null;
    if (input) input.value = publicUrl;
    // Notify the parent so the controlled input value (and FormData on save)
    // captures the uploaded URL instead of losing it.
    onUpload?.(publicUrl);

    setUploading(false);
  }

  return (
    <div className="mt-2">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 text-xs text-[var(--ink)] hover:bg-[var(--accent-100)] disabled:opacity-60"
        >
          {uploading ? "Uploading…" : "Upload from device"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          aria-label={`Upload image for ${fieldName}`}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error ? <p className="mt-1.5 text-xs text-red-600" role="alert">{error}</p> : null}

      {preview ? (
        <div className="mt-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Upload preview" className="h-16 w-16 rounded-[var(--radius-md)] object-cover ring-1 ring-[var(--border)]" />
          <p className="mt-1 font-[family-name:var(--font-text)] text-xs text-[var(--muted)] break-all">{preview}</p>
        </div>
      ) : null}
    </div>
  );
}
