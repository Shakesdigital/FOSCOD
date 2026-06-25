import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

/** Map of branding setting keys → the CSS custom property they override. */
const BRANDING_TO_VAR: Record<string, string> = {
  brand_accent: "--accent-500",
  brand_water: "--water-500",
  brand_gold: "--gold-500",
  brand_bg: "--bg",
  brand_ink: "--ink",
};

/**
 * Reads branding settings and returns an inline `:root { … }` style string so
 * the CMS can re-skin the public site at runtime. Returns "" when no DB / no
 * overrides, in which case the compile-time tokens in globals.css apply.
 */
export async function getBrandingStyle(): Promise<string> {
  if (!isSupabaseConfigured()) return "";
  const supabase = await createClient();
  const { data } = (await supabase
    ?.from("settings")
    .select("key,value")
    .eq("group", "branding")) ?? { data: null };
  if (!data?.length) return "";

  const decls: string[] = [];
  for (const row of data) {
    const cssVar = BRANDING_TO_VAR[row.key];
    if (!cssVar) continue;
    const value = typeof row.value === "string" ? row.value : "";
    if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) {
      decls.push(`${cssVar}:${value}`);
      if (cssVar === "--accent-500") decls.push(`--accent:${value}`);
    }
  }
  return decls.length ? `:root{${decls.join(";")}}` : "";
}
