"use client";

import { useState } from "react";

export function Newsletter() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [note, setNote] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", payload }),
      });
      const data = await res.json();
      if (data.ok) {
        setState("done");
        setNote(data.demo ? "Database not connected yet — this wasn't saved." : "");
      } else {
        setState("error");
        setNote(data.error ?? "Something went wrong.");
      }
    } catch {
      setState("error");
      setNote("Network error — please try again.");
    }
  }

  return (
    <section className="py-16 md:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-[var(--ink)] px-8 py-12 text-[var(--bg)] md:px-14 md:py-14">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <span className="eyebrow text-[var(--accent-300)] [&::before]:bg-[var(--accent-300)]">
                Stay in the loop
              </span>
              <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)] text-[var(--bg)]">
                Subscribe to our newsletter
              </h2>
              <p className="mt-3 max-w-md leading-relaxed text-[color-mix(in_srgb,var(--bg)_72%,transparent)]">
                Field stories, project updates, and program openings — a few times
                a year, no noise.
              </p>
            </div>

            {state === "done" ? (
              <div className="rounded-[var(--radius-lg)] border border-white/15 bg-white/5 p-6">
                <p className="text-lg text-[var(--bg)]">You&rsquo;re subscribed ✓</p>
                {note && (
                  <p className="mt-2 font-[family-name:var(--font-mono)] text-[0.72rem] text-[var(--gold-500)]">
                    {note}
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-3">
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute left-[-9999px]"
                  aria-hidden
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    name="name"
                    aria-label="Your name"
                    placeholder="Your name"
                    className="w-full rounded-[var(--radius-md)] border border-white/20 bg-white/10 px-3.5 py-2.5 text-[0.95rem] text-[var(--bg)] placeholder:text-white/50 outline-none focus:border-[var(--accent-300)]"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    aria-label="Email"
                    placeholder="Email address"
                    className="w-full rounded-[var(--radius-md)] border border-white/20 bg-white/10 px-3.5 py-2.5 text-[0.95rem] text-[var(--bg)] placeholder:text-white/50 outline-none focus:border-[var(--accent-300)]"
                  />
                </div>
                {state === "error" && (
                  <p className="text-sm text-[var(--accent-300)]">{note}</p>
                )}
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="justify-self-start rounded-[var(--radius-full)] bg-[var(--surface)] px-6 py-3 font-medium text-[var(--ink)] transition-colors hover:bg-[var(--surface-2)] disabled:opacity-60"
                >
                  {state === "loading" ? "Subscribing…" : "Subscribe now"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
