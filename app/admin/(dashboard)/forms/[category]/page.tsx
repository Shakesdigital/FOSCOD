import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateSubmissionStatus } from "../actions";

const CATEGORY_INFO: Record<string, { title: string; description: string }> = {
  application: {
    title: "Application forms",
    description: "Applications, internships, volunteer placements and group bookings.",
  },
  donation: {
    title: "Donation forms",
    description: "Donation enquiries and support-a-cause submissions.",
  },
  partnership: {
    title: "Partnership & collaboration forms",
    description: "Partner applications, collaboration proposals and contact enquiries.",
  },
  newsletter: {
    title: "Newsletter forms",
    description: "Newsletter signups and the subscriber list.",
  },
};

const STATUSES = ["new", "reviewing", "actioned", "archived"] as const;

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ status?: string }>;
};

export default async function FormCategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const query = await searchParams;
  const info = CATEGORY_INFO[category];
  if (!info) notFound();

  const statusFilter = STATUSES.includes((query.status ?? "") as (typeof STATUSES)[number])
    ? query.status
    : undefined;

  const supabase = await createClient();
  let builder = supabase?.from("form_submissions").select("*").eq("form_category", category);
  if (builder && statusFilter) builder = builder.eq("status", statusFilter);
  const { data: submissions } = (await builder?.order("created_at", { ascending: false }).limit(200)) ?? { data: [] };

  // Newsletter category also manages the subscriber list.
  const subscribers = category === "newsletter"
    ? (await supabase?.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }).limit(200))?.data ?? []
    : [];

  const statusClass: Record<string, string> = {
    new: "bg-blue-50 text-blue-800 border-blue-200",
    reviewing: "bg-amber-50 text-amber-800 border-amber-200",
    actioned: "bg-green-50 text-green-800 border-green-200",
    archived: "bg-[var(--surface-2)] text-[var(--muted)] border-[var(--border)]",
  };

  return (
    <div>
      <Link href="/admin/forms" className="text-sm text-[var(--accent-700)] hover:underline">← All forms</Link>
      <h1 className="mt-3 text-3xl">{info.title}</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">{info.description}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href={`/admin/forms/${category}`}
          className={`rounded-full border px-3.5 py-1.5 text-xs ${!statusFilter ? "border-[var(--ink)] bg-[var(--surface-2)]" : "border-[var(--border)]"}`}
        >
          All
        </Link>
        {STATUSES.map((status) => (
          <Link
            key={status}
            href={`/admin/forms/${category}?status=${status}`}
            className={`rounded-full border px-3.5 py-1.5 text-xs capitalize ${statusFilter === status ? "border-[var(--ink)] bg-[var(--surface-2)]" : "border-[var(--border)]"}`}
          >
            {status}
          </Link>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {(submissions ?? []).map((submission) => {
          const payload = (submission.payload ?? {}) as Record<string, unknown>;
          const entries = Object.entries(payload).filter(([key]) => key !== "company_website");
          return (
            <details key={submission.id} className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)]">
              <summary className="flex cursor-pointer flex-wrap items-center gap-3 px-4 py-3 text-sm">
                <span className={`rounded-full border px-2.5 py-0.5 text-[0.65rem] uppercase tracking-[0.08em] ${statusClass[submission.status] ?? ""}`}>
                  {submission.status}
                </span>
                <span className="font-medium">{String(submission.type).replaceAll("_", " ")}</span>
                <span className="truncate text-[var(--muted)]">
                  {String(payload.fullName ?? payload.name ?? payload.email ?? "")}
                </span>
                <span className="ml-auto shrink-0 text-xs text-[var(--muted)]">
                  {submission.created_at ? new Date(String(submission.created_at)).toLocaleString() : ""}
                </span>
              </summary>
              <div className="border-t border-[var(--border)] p-4">
                <dl className="grid gap-2 sm:grid-cols-2">
                  {entries.map(([key, value]) => (
                    <div key={key} className="min-w-0">
                      <dt className="font-[family-name:var(--font-text)] text-[0.6rem] uppercase tracking-[0.1em] text-[var(--muted)]">
                        {key.replaceAll("_", " ")}
                      </dt>
                      <dd className="mt-0.5 break-words text-sm text-[var(--ink)]">{String(value ?? "—")}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-4">
                  <span className="text-xs text-[var(--muted)]">Move to:</span>
                  {STATUSES.filter((status) => status !== submission.status).map((status) => (
                    <form key={status} action={updateSubmissionStatus}>
                      <input type="hidden" name="id" value={String(submission.id)} />
                      <input type="hidden" name="status" value={status} />
                      <input type="hidden" name="category" value={category} />
                      <button type="submit" className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs capitalize hover:border-[var(--ink)]">
                        {status}
                      </button>
                    </form>
                  ))}
                </div>
              </div>
            </details>
          );
        })}
        {!submissions?.length ? (
          <p className="px-1 py-6 text-sm text-[var(--muted)]">No submissions in this category yet.</p>
        ) : null}
      </div>

      {category === "newsletter" ? (
        <section className="mt-10">
          <h2 className="text-lg">Newsletter subscribers</h2>
          <div className="mt-4 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
            <table className="w-full text-sm">
              <thead className="border-b border-[var(--border)] text-left text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Signed up</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id}>
                    <td className="px-4 py-3">{subscriber.email}</td>
                    <td className="px-4 py-3">{subscriber.name ?? "—"}</td>
                    <td className="px-4 py-3">{subscriber.status}</td>
                    <td className="px-4 py-3 text-[var(--muted)]">
                      {subscriber.created_at ? new Date(String(subscriber.created_at)).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                ))}
                {!subscribers.length ? (
                  <tr><td colSpan={4} className="px-4 py-6 text-center text-[var(--muted)]">No subscribers yet.</td></tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </div>
  );
}
