"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Setting = { key: string; value: unknown; group: string };

export function SettingsEditor({ initial }: { initial: Setting[] }) {
  const supabase = createClient();
  const [rows, setRows] = useState<Setting[]>(initial);
  const [saving, setSaving] = useState(false);
  const [savedKey, setSavedKey] = useState<string | null>(null);

  const groups = Array.from(new Set(rows.map((r) => r.group)));

  function update(key: string, value: string) {
    setRows((rs) => rs.map((r) => (r.key === key ? { ...r, value } : r)));
  }

  async function save(key: string) {
    if (!supabase) return;
    setSaving(true);
    const row = rows.find((r) => r.key === key);
    await supabase.from("settings").update({ value: row?.value }).eq("key", key);
    setSaving(false);
    setSavedKey(key);
    setTimeout(() => setSavedKey((k) => (k === key ? null : k)), 1500);
  }

  return (
    <div className="space-y-10">
      {groups.map((g) => (
        <section key={g}>
          <h2 className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
            {g}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {rows
              .filter((r) => r.group === g)
              .map((r) => {
                const str = typeof r.value === "string" ? r.value : JSON.stringify(r.value);
                const isColor = g === "branding" && str.startsWith("#");
                return (
                  <div key={r.key} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4">
                    <label className="block font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.08em] text-[var(--muted)]">
                      {r.key}
                    </label>
                    <div className="mt-2 flex items-center gap-2">
                      {isColor && (
                        <input
                          type="color"
                          value={str}
                          onChange={(e) => update(r.key, e.target.value)}
                          className="h-9 w-9 shrink-0 rounded border border-[var(--border-strong)]"
                          aria-label={`${r.key} color`}
                        />
                      )}
                      <input
                        type="text"
                        value={str}
                        onChange={(e) => update(r.key, e.target.value)}
                        className="w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--bg)] px-3 py-2 text-sm outline-none focus:border-[var(--accent-600)]"
                      />
                      <button
                        onClick={() => save(r.key)}
                        disabled={saving}
                        className="shrink-0 rounded-[var(--radius-full)] bg-[var(--ink)] px-3.5 py-2 text-xs font-medium text-[var(--bg)] disabled:opacity-60"
                      >
                        {savedKey === r.key ? "Saved ✓" : "Save"}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}
