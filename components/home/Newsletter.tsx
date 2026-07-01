"use client";

import { useState } from "react";

/** Compact, single-row newsletter subscribe strip for the footer.
 *  Heading on the left; name + email + Sign Up inline on one row. */
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

  const input =
    "min-w-0 flex-1 rounded-[var(--radius-md)] bg-white px-3.5 py-2 text-[0.88rem] text-[var(--ink)] placeholder:text-[var(--muted)] outline-none ring-1 ring-inset ring-white/0 focus:ring-2 focus:ring-[var(--green-cta)] md:flex-none md:w-40";

  return (
    <section className="py-10">
      <div className="container-page">
        <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-white">Subscribe to our newsletter</h2>
            <p className="mt-1 text-[0.9rem] text-white/70">
              Field stories and program updates — a few times a year, no noise.
            </p>
          </div>

          {state === "done" ? (
            <p className="rounded-[var(--radius-md)] border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white">
              You&rsquo;re subscribed ✓{note ? <span className="ml-2 text-[0.72rem] font-normal text-white/70">{note}</span> : null}
            </p>
          ) : (
            <div className="w-full md:w-auto">
              <form onSubmit={onSubmit} className="flex items-center gap-2">
                {/* honeypot */}
                <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px]" />
                <input name="name" aria-label="Your name" placeholder="Name" className={input} />
                <input name="email" type="email" required aria-label="Email address" placeholder="Email" className={`${input} md:w-52`} />
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="shrink-0 rounded-[var(--radius-md)] bg-[var(--green-cta)] px-5 py-2 text-[0.88rem] font-semibold text-white transition-colors hover:bg-[var(--green-cta-hover)] disabled:opacity-60"
                >
                  {state === "loading" ? "Signing up…" : "Sign Up"}
                </button>
              </form>
              {state === "error" && <p className="mt-2 text-[0.78rem] text-white/85">{note}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
