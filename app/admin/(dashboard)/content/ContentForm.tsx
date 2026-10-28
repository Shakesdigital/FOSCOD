"use client";

import { useState } from "react";
import Link from "next/link";
import type { CmsCollection, CmsField } from "@/lib/cms-collections";
import { saveContent } from "./actions";
import { WysiwygEditor } from "@/components/admin/WysiwygEditor";
import { InlineImageUpload } from "@/components/admin/InlineImageUpload";

function fieldValue(value: unknown, type?: CmsField["type"]) {
  if (value === null || value === undefined) return "";
  if (type === "datetime") return new Date(String(value)).toISOString().slice(0, 16);
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}

function Field({ field, value }: { field: CmsField; value: unknown }) {
  const id = `field-${field.name}`;
  const common = "mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent-600)] focus:ring-2 focus:ring-[var(--accent-100)]";

  if (field.type === "image") {
    return (
      <label htmlFor={id} className="block text-sm font-medium text-[var(--ink)]">
        {field.label}{field.required ? <span className="ml-1 text-[var(--accent-700)]">*</span> : null}
        <input id={id} name={field.name} required={field.required} defaultValue={fieldValue(value, field.type)} type="url" placeholder="https://… or paste from Media library" className={common} />
        <p className="mt-1.5 text-xs text-[var(--muted)]">
          Paste an image URL from the <Link href="/admin/media" className="text-[var(--accent-700)] underline">Media library</Link>,
          or upload directly from your device below.
        </p>
        <InlineImageUpload fieldName={field.name} initialValue={fieldValue(value, field.type)} />
        {field.help ? <span className="mt-1.5 block text-xs font-normal leading-relaxed text-[var(--muted)]">{field.help}</span> : null}
      </label>
    );
  }
  if (field.type === "boolean") {
    return <label htmlFor={id} className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm"><input id={id} name={field.name} type="checkbox" defaultChecked={Boolean(value)} className="h-4 w-4" />{field.label}</label>;
  }
  if (field.type === "wysiwyg") {
    return (
      <WysiwygEditor
        name={field.name}
        defaultValue={fieldValue(value, field.type)}
        label={field.label}
        help={field.help}
        required={field.required}
      />
    );
  }
  return (
    <label htmlFor={id} className="block text-sm font-medium text-[var(--ink)]">
      {field.label}{field.required ? <span className="ml-1 text-[var(--accent-700)]">*</span> : null}
      {field.type === "textarea" ? (
        <textarea id={id} name={field.name} required={field.required} defaultValue={fieldValue(value, field.type)} rows={5} className={common} />
      ) : field.type === "json" ? (
        <textarea id={id} name={field.name} required={field.required} defaultValue={typeof value === "object" ? JSON.stringify(value) : fieldValue(value)} rows={8} className={`${common} font-mono`} />
      ) : field.type === "select" ? (
        <select id={id} name={field.name} required={field.required} defaultValue={fieldValue(value, field.type)} className={common}>
          <option value="">Select…</option>
          {field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      ) : (
        <input id={id} name={field.name} required={field.required} defaultValue={fieldValue(value, field.type)} type={field.type === "number" ? "number" : field.type === "date" ? "date" : field.type === "datetime" ? "datetime-local" : field.type === "url" ? "url" : "text"} className={common} />
      )}
      {field.help ? <span className="mt-1.5 block text-xs font-normal leading-relaxed text-[var(--muted)]">{field.help}</span> : null}
    </label>
  );
}

export function ContentForm({
  collection,
  current,
  collectionKey,
  presets,
  returnTo,
}: {
  collection: CmsCollection;
  current?: Record<string, unknown> | undefined;
  collectionKey: string;
  /** Values preset on "Add" — e.g. page_slug so new rows land on this page. */
  presets?: Record<string, string>;
  /** Admin path to return to after save (defaults to the collection page). */
  returnTo?: string;
}) {
  const [isSaving, setIsSaving] = useState(false);

  return (
    <form
      action={saveContent}
      onSubmit={() => setIsSaving(true)}
      className="mt-6 space-y-5"
    >
      {isSaving && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-[var(--border)]">
          <div className="h-full w-2/3 animate-pulse bg-[var(--accent-600)]" />
        </div>
      )}
      <input type="hidden" name="collection" value={collectionKey} />
      <input type="hidden" name="id" value={String(current?.id ?? "")} />
      {returnTo ? <input type="hidden" name="returnTo" value={returnTo} /> : null}
      {collection.fields.map((field) => <Field key={field.name} field={field} value={current?.[field.name] ?? presets?.[field.name]} />)}

      <div className="flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-5">
        <button
          type="submit"
          disabled={isSaving}
          className="relative inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent-600)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--accent-700)] disabled:cursor-wait disabled:opacity-75"
        >
          {isSaving && (
            <svg
              className="-ml-1 animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-label="saving"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {isSaving ? "Saving…" : `Save ${collection.singular}`}
        </button>

        {current ? (
          <Link
            href={`/admin/content/${collectionKey}`}
            className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm"
          >
            Cancel
          </Link>
        ) : null}
      </div>
    </form>
  );
}
