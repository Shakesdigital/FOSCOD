import { createClient } from "@/lib/supabase/server";

export default async function AdminSubmissions() {
  const supabase = await createClient();
  const { data: submissions } = (await supabase
    ?.from("form_submissions")
    .select("id,type,payload,status,created_at")
    .order("created_at", { ascending: false })
    .limit(100)) ?? { data: [] };

  return (
    <div>
      <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.16em] text-[var(--accent-700)]">
        Forms
      </p>
      <h1 className="mt-3 text-3xl">Submissions</h1>
      <p className="mt-2 text-[var(--muted)]">
        Applications, partner and donor inquiries, and contact messages.
      </p>

      <div className="mt-8 space-y-4">
        {(submissions ?? []).map((s) => {
          const payload = (s.payload ?? {}) as Record<string, unknown>;
          const name =
            payload.name ??
            `${payload.first_name ?? ""} ${payload.last_name ?? ""}`.trim() ??
            payload.org_name ??
            "—";
          return (
            <div key={s.id} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[var(--accent-50)] px-2.5 py-0.5 text-xs text-[var(--accent-700)]">
                    {s.type}
                  </span>
                  <span className="font-medium text-[var(--ink)]">{String(name) || "—"}</span>
                </div>
                <span className="font-[family-name:var(--font-mono)] text-[0.7rem] text-[var(--muted)]">
                  {new Date(s.created_at).toLocaleString()} · {s.status}
                </span>
              </div>
              <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                {Object.entries(payload)
                  .filter(([k]) => k !== "company_website")
                  .map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <dt className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.08em] text-[var(--muted)]">
                        {k}
                      </dt>
                      <dd className="text-[var(--ink-soft)]">{String(v)}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          );
        })}
        {(!submissions || submissions.length === 0) && (
          <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--border-strong)] p-10 text-center text-[var(--muted)]">
            No submissions yet.
          </div>
        )}
      </div>
    </div>
  );
}
