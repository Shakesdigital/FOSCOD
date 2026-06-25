import { createClient } from "@/lib/supabase/server";
import { SettingsEditor } from "@/components/admin/SettingsEditor";

export default async function AdminSettings() {
  const supabase = await createClient();
  const { data } = (await supabase
    ?.from("settings")
    .select("key,value,group")
    .order("group")) ?? { data: [] };

  const rows = (data ?? []).map((r) => ({
    key: r.key,
    value: r.value,
    group: (r as { group: string }).group,
  }));

  return (
    <div>
      <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.16em] text-[var(--accent-700)]">
        Configuration
      </p>
      <h1 className="mt-3 text-3xl">Settings</h1>
      <p className="mt-2 max-w-xl text-[var(--muted)]">
        Branding colors flow into the site's design tokens — changing an accent here
        re-skins the public site. Secrets (email, integrations) live in environment
        variables, not here.
      </p>

      <div className="mt-8">
        {rows.length ? (
          <SettingsEditor initial={rows} />
        ) : (
          <p className="rounded-[var(--radius-lg)] border border-dashed border-[var(--border-strong)] p-10 text-center text-[var(--muted)]">
            No settings yet. Run <code>supabase/seed.sql</code> to populate them.
          </p>
        )}
      </div>
    </div>
  );
}
