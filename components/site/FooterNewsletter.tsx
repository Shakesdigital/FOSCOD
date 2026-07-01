"use client";

import { useState } from "react";

/** Compact newsletter signup for the footer column (Name · Email · Sign Up). */
export function FooterNewsletter() {
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

  if (state === "done") {
    return (
      <div className="rounded-[var(--radius-md)] border border-white/20 bg-white/10 p-4 text-center">
        <p className="text-sm font-medium text-white">You&rsquo;re subscribed ✓</p>
        {note && <p className="mt-1 text-[0.72rem] text-white/70">{note}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xs space-y-3">
      {/* honeypot */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px]" />
      <input
        name="name"
        aria-label="Your name"
        placeholder="Name"
        className="w-full rounded-[var(--radius-md)] bg-white px-4 py-2.5 text-[0.9rem] text-[var(--ink)] placeholder:text-[var(--muted)] outline-none ring-1 ring-inset ring-white/0 focus:ring-2 focus:ring-[var(--green-cta)]"
      />
      <input
        name="email"
        type="email"
        required
        aria-label="Email address"
        placeholder="Email"
        className="w-full rounded-[var(--radius-md)] bg-white px-4 py-2.5 text-[0.9rem] text-[var(--ink)] placeholder:text-[var(--muted)] outline-none ring-1 ring-inset ring-white/0 focus:ring-2 focus:ring-[var(--green-cta)]"
      />
      {state === "error" && <p className="text-[0.78rem] text-white/90">{note}</p>}
      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full rounded-[var(--radius-md)] bg-[var(--green-cta)] px-4 py-2.5 text-[0.9rem] font-semibold text-white transition-colors hover:bg-[var(--green-cta-hover)] disabled:opacity-60"
      >
        {state === "loading" ? "Signing up…" : "Sign Up"}
      </button>
    </form>
  );
}
