"use client";

import { useState } from "react";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  options?: string[];
  required?: boolean;
  full?: boolean;
};

export function SubmitForm({
  formType,
  fields,
  submitLabel = "Submit",
  successTitle = "Thank you — we've received your message.",
  successBody = "Our team replies within two working days.",
}: {
  formType: string;
  fields: Field[];
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
}) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: formType, payload }),
      });
      const data = await res.json();
      if (data.ok) {
        setState("done");
        setMessage(data.demo ? "Note: the database isn't connected yet, so this wasn't saved." : "");
      } else {
        setState("error");
        setMessage(data.error ?? "Something went wrong.");
      }
    } catch {
      setState("error");
      setMessage("Network error — please try again.");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
        <p className="text-2xl text-[var(--forest-700)]">✓</p>
        <h3 className="mt-3 text-xl">{successTitle}</h3>
        <p className="mt-2 text-[var(--muted)]">{successBody}</p>
        {message && (
          <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.72rem] text-[var(--gold-700)]">
            {message}
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8"
    >
      {/* honeypot */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px]"
        aria-hidden
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
            <label
              htmlFor={f.name}
              className="block text-sm font-medium text-[var(--ink)]"
            >
              {f.label}
              {f.required && <span className="ml-0.5 text-[var(--accent-600)]">*</span>}
            </label>
            {f.type === "textarea" ? (
              <textarea
                id={f.name}
                name={f.name}
                required={f.required}
                rows={5}
                className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--bg)] px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-[var(--accent-600)]"
              />
            ) : f.type === "select" ? (
              <select
                id={f.name}
                name={f.name}
                required={f.required}
                defaultValue=""
                className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--bg)] px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-[var(--accent-600)]"
              >
                <option value="" disabled>
                  Select…
                </option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={f.name}
                name={f.name}
                type={f.type ?? "text"}
                required={f.required}
                className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--bg)] px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-[var(--accent-600)]"
              />
            )}
          </div>
        ))}
      </div>

      {state === "error" && (
        <p className="mt-4 text-sm text-[var(--error)]">{message}</p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="mt-6 inline-flex items-center justify-center rounded-[var(--radius-full)] bg-[var(--accent-600)] px-7 py-3 font-medium text-[var(--accent-fg)] transition-colors hover:bg-[var(--accent-700)] disabled:opacity-60"
      >
        {state === "loading" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
