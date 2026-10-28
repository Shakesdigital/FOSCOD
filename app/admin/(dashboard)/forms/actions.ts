"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const STATUSES = ["new", "reviewing", "actioned", "archived"];

export async function updateSubmissionStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const category = String(formData.get("category") ?? "application");
  if (!id || !STATUSES.includes(status)) return;

  const supabase = await createClient();
  if (!supabase) return;
  await supabase.from("form_submissions").update({ status }).eq("id", id);

  revalidatePath(`/admin/forms/${category}`);
  revalidatePath("/admin/forms");
}