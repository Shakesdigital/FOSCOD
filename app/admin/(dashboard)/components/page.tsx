import Link from "next/link";
import { cmsCollectionMap } from "@/lib/cms-collections";

const groups = [
  {
    heading: "Page sections in use",
    description: "The building blocks currently placed on pages — hero banners, card grids, editorial blocks.",
    keys: ["hero-slides", "home-talking-about-us", "home-audience-paths", "home-responsible-engagement", "home-involvement-cards"],
  },
  {
    heading: "Reusable components",
    description: "Standalone component types that can be attached to any page region.",
    keys: ["modules", "page-modules", "testimonials", "faqs"],
  },
  {
    heading: "Media",
    description: "The shared image and file library used across the site.",
    keys: [],
  },
];

export default async function AdminComponentsIndex() {
  return (
    <div>
      <p className="font-[family-name:var(--font-text)] text-[0.7rem] uppercase tracking-[0.16em] text-[var(--accent-700)]">
        Content workspace
      </p>
      <h1 className="mt-3 text-3xl">Components</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        Reusable building blocks — hero banners, carousels, card grids, editorial
        sections. Edit them here, or open a page in Pages and edit each section in
        place where it appears.
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
              {!group.keys.length ? (
                <Link
                  href="/admin/media"
                  className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--ink)]"
                >
                  <p className="text-lg font-medium">Media library</p>
                  <p className="mt-2 text-sm text-[var(--ink-soft)]">Upload images and files, and copy their URLs into any section.</p>
                </Link>
              ) : null}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
