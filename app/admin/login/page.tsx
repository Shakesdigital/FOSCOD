"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!supabase) {
      setError("Supabase is not configured yet. Add your env vars to enable login.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6">
      <div className="w-full max-w-sm">
        <div className="flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--ink)]">
            FOSCOD
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.18em] text-[var(--muted)]">
            CMS
          </span>
        </div>
        <h1 className="mt-6 text-2xl">Sign in</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Staff access only. Create the first admin user in the Supabase dashboard,
          then set their role to <code>super_admin</code> in the profiles table.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              id="email" type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--surface)] px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-[var(--accent-600)]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              id="password" type="password" required value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--surface)] px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-[var(--accent-600)]"
            />
          </div>
          {error && <p className="text-sm text-[var(--error)]">{error}</p>}
          <button
            type="submit" disabled={loading}
            className="w-full rounded-[var(--radius-full)] bg-[var(--accent-600)] px-6 py-3 font-medium text-[var(--accent-fg)] transition-colors hover:bg-[var(--accent-700)] disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
