import Link from "next/link";
import { cmsCollectionMap } from "@/lib/cms-collections";

const groups = [
  {
    heading: "Brand & appearance",
    description: "Colors, fonts, logos, and everything visual about the website.",
    keys: ["settings"],
  },
  {
    heading: "Navigation",
    description: "Header, footer and mobile menus, plus footer columns and quick links.",
    keys: ["navigation", "footer-columns", "footer-nav"],
  },
  {
    heading: "Technical",
    description: "Legacy redirects and the shared media records behind uploaded images.",
    keys: ["redirects", "media-assets"],
  },
];

export default async function AdminSettingsIndex() {
  return (
    <div>
      <p className="font-[family-name:var(--font-text)] text-[0.7rem] uppercase tracking-[0.16em] text-[var(--accent-700)]">
        Content workspace
      </p>
      <h1 className="mt-3 text-3xl">Website settings</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        Everything global: brand colors, fonts, logos, image settings, menus, and
        technical configuration.
      </p>

      <div className="mt-8 space-y-10">
        {groups.map((group) => (
          <section key={group.heading}>
            <h2 className="text-lg">{group.heading}</h2>
            <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">{group.description}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {group.keys.map((key) => {
                const collection = cmsCollectionMap[key];
                if (!collection) return null;
                return (
                  <Link
                    key={key}
                    href={`/admin/content/${key}`}
                    className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--ink)]"
                  >
                    <p className="text-lg font-medium">{collection.label}</p>
                    <p className="mt-2 text-sm text-[var(--ink-soft)]">{collection.description}</p>
                  </Link>
                );
              })}
              {group.heading === "Brand & appearance" ? (
                <Link
                  href="/admin/media"
                  className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--ink)]"
                >
                  <p className="text-lg font-medium">Media library</p>
                  <p className="mt-2 text-sm text-[var(--ink-soft)]">Upload and organize the images used across the site.</p>
                </Link>
              ) : null}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
