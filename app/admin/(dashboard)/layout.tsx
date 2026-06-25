import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/admin/SignOutButton";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/submissions", label: "Submissions" },
  { href: "/admin/settings", label: "Settings" },
];

function NotConfigured() {
  return (
    <main className="container-page flex min-h-screen flex-col justify-center py-24">
      <div className="max-w-xl">
        <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.16em] text-[var(--accent-700)]">
          CMS · not connected
        </p>
        <h1 className="mt-4 text-3xl">Connect Supabase to enable the CMS</h1>
        <p className="mt-4 text-[var(--ink-soft)]">
          The admin dashboard is built and ready. Add your Supabase credentials to
          <code className="mx-1 rounded bg-[var(--surface-2)] px-1.5 py-0.5">.env.local</code>
          and run the migrations in <code className="rounded bg-[var(--surface-2)] px-1.5 py-0.5">supabase/migrations</code>,
          then reload. See the README for the full setup.
        </p>
        <Link href="/" className="mt-8 inline-block text-[var(--accent-700)] hover:underline">
          ← Back to site
        </Link>
      </div>
    </main>
  );
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) return <NotConfigured />;

  const supabase = await createClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
  if (!user) redirect("/admin/login");

  const { data: profile } = (await supabase
    ?.from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single()) ?? { data: null };

  const staffRoles = ["super_admin", "admin", "editor"];
  if (!profile || !staffRoles.includes(profile.role)) {
    redirect("/admin/login?denied=1");
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] md:flex-row">
      <aside className="border-b border-[var(--border)] bg-[var(--surface)] md:w-60 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between p-5">
          <Link href="/admin" className="flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-display)] text-xl font-semibold">FOSCOD</span>
            <span className="font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.16em] text-[var(--muted)]">CMS</span>
          </Link>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:gap-0.5">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="whitespace-nowrap rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--ink-soft)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--ink)]"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden border-t border-[var(--border)] p-5 md:block">
          <p className="text-sm font-medium text-[var(--ink)]">{profile.full_name ?? "Staff"}</p>
          <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.12em] text-[var(--muted)]">
            {profile.role}
          </p>
          <div className="mt-3"><SignOutButton /></div>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
