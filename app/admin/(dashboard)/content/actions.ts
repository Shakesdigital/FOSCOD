"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cmsCollectionMap } from "@/lib/cms-collections";
import { createClient } from "@/lib/supabase/server";

function collectionOrThrow(key: string) {
  const collection = cmsCollectionMap[key];
  if (!collection) throw new Error("Unknown CMS collection");
  return collection;
}

function errorHref(collection: string, message: string, id?: string) {
  const params = new URLSearchParams({ error: message });
  if (id) params.set("edit", id);
  return `/admin/content/${collection}?${params.toString()}`;
}

export async function saveContent(formData: FormData) {
  const collectionKey = String(formData.get("collection") ?? "");
  const id = String(formData.get("id") ?? "");
  const collection = collectionOrThrow(collectionKey);
  const payload: Record<string, unknown> = {};

  for (const field of collection.fields) {
    const raw = formData.get(field.name);
    const text = typeof raw === "string" ? raw.trim() : "";

    if (field.type === "boolean") {
      payload[field.name] = raw === "on" || raw === "true";
      continue;
    }
    if (field.required && !text) redirect(errorHref(collectionKey, `${field.label} is required.`, id || undefined));
    if (!text) {
      payload[field.name] = null;
      continue;
    }
    if (field.type === "number") {
      const value = Number(text);
      if (!Number.isFinite(value)) redirect(errorHref(collectionKey, `${field.label} must be a number.`, id || undefined));
      payload[field.name] = value;
      continue;
    }
    if (field.type === "json") {
      try {
        payload[field.name] = JSON.parse(text);
      } catch {
        redirect(errorHref(collectionKey, `${field.label} contains invalid structured data.`, id || undefined));
      }
      continue;
    }
    if (field.type === "datetime") {
      const date = new Date(text);
      if (Number.isNaN(date.getTime())) redirect(errorHref(collectionKey, `${field.label} is not a valid date.`, id || undefined));
      payload[field.name] = date.toISOString();
      continue;
    }
    payload[field.name] = text;
  }

  const imagePairs = [
    ["featured_image_url", "featured_image_alt"], ["hero_image_url", "hero_image_alt"],
    ["image_url", "image_alt"], ["photo_url", "photo_alt"], ["logo_url", "logo_alt"],
  ];
  for (const [urlField, altField] of imagePairs) {
    if (payload[urlField] && !payload[altField]) redirect(errorHref(collectionKey, "Alt text is required for every image.", id || undefined));
  }

  if (collectionKey === "testimonials" && payload.status === "published" && payload.permission !== true) {
    redirect(errorHref(collectionKey, "Confirm permission before publishing a testimonial.", id || undefined));
  }
  if (collectionKey === "impact-stories" && payload.status === "published" && payload.quote && !["confirmed", "anonymized"].includes(String(payload.consent_status))) {
    redirect(errorHref(collectionKey, "Confirm or anonymize consent before publishing a community quotation.", id || undefined));
  }
  if (collectionKey === "impact-stats" && payload.status === "verified" && (!payload.as_of_date || !payload.source_note)) {
    redirect(errorHref(collectionKey, "Verified statistics require an as-of date and source note.", id || undefined));
  }

  const supabase = await createClient();
  if (!supabase) redirect(errorHref(collectionKey, "Supabase is not connected.", id || undefined));

  const result = id
    ? await supabase.from(collection.table).update(payload).eq("id", id)
    : await supabase.from(collection.table).insert(payload);

  if (result.error) redirect(errorHref(collectionKey, result.error.message, id || undefined));
  revalidatePath(`/admin/content/${collectionKey}`);
  revalidatePath("/", "layout");
  redirect(`/admin/content/${collectionKey}?saved=1`);
}

export async function deleteContent(formData: FormData) {
  const collectionKey = String(formData.get("collection") ?? "");
  const id = String(formData.get("id") ?? "");
  const collection = collectionOrThrow(collectionKey);
  if (!id) redirect(errorHref(collectionKey, "Missing record ID."));

  const supabase = await createClient();
  if (!supabase) redirect(errorHref(collectionKey, "Supabase is not connected."));
  const { error } = await supabase.from(collection.table).delete().eq("id", id);
  if (error) redirect(errorHref(collectionKey, error.message, id));

  revalidatePath(`/admin/content/${collectionKey}`);
  revalidatePath("/", "layout");
  redirect(`/admin/content/${collectionKey}?deleted=1`);
}
