"use client";

import { useState } from "react";

/** Compact vertical newsletter subscribe form for the footer.
 *  Simplified: name + email + Sign Up only, vertical layout with bordered inputs. */
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
        setNote("");
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
    <section className="py-10">
      <div className="container-page">
        <h2 className="text-xl font-semibold text-white">Sign up to our newsletters</h2>

        {state === "done" ? (
          <p className="mt-6 rounded-[var(--radius-md)] border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white">
            You&rsquo;re subscribed ✓
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4 max-w-sm">
            {/* honeypot */}
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px]" />
            <div>
              <label htmlFor="newsletter-name" className="sr-only">Your name</label>
              <input
                id="newsletter-name"
                name="name"
                aria-label="Your name"
                placeholder="Name"
                className="w-full rounded-[var(--radius-md)] border border-white/30 bg-transparent px-3.5 py-2.5 text-[0.88rem] text-white placeholder:text-white/60 outline-none focus:border-white/60 focus:ring-1 focus:ring-white/30"
              />
            </div>
            <div>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                aria-label="Email address"
                placeholder="Email"
                className="w-full rounded-[var(--radius-md)] border border-white/30 bg-transparent px-3.5 py-2.5 text-[0.88rem] text-white placeholder:text-white/60 outline-none focus:border-white/60 focus:ring-1 focus:ring-white/30"
              />
            </div>
            <button
              type="submit"
              disabled={state === "loading"}
              className="w-full rounded-[var(--radius-md)] bg-[var(--green-cta)] px-5 py-2.5 text-[0.88rem] font-semibold text-white transition-colors hover:bg-[var(--green-cta-hover)] disabled:opacity-60"
            >
              {state === "loading" ? "Signing up…" : "Sign Up"}
            </button>
            {state === "error" && (
              <p className="text-[0.78rem] text-white/85">{note}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
