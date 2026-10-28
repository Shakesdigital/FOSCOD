import Link from "next/link";
import { cmsPages } from "@/lib/cms-pages";

export default async function AdminPagesIndex() {
  return (
    <div>
      <p className="font-[family-name:var(--font-text)] text-[0.7rem] uppercase tracking-[0.16em] text-[var(--accent-700)]">
        Content workspace
      </p>
      <h1 className="mt-3 text-3xl">Pages</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        Every landing page on the website, one editor each. Open a page to see all
        of its sections top-to-bottom — hero, sections, cards, carousels — exactly
        in the order visitors see them.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cmsPages.map((page) => (
          <Link
            key={page.key}
            href={`/admin/pages/${page.key}`}
            className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--ink)]"
          >
            <p className="text-lg font-medium">{page.title}</p>
            <p className="mt-1 font-[family-name:var(--font-text)] text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)]">
              {page.path}
            </p>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">{page.description}</p>
            <p className="mt-3 text-xs text-[var(--muted)]">
              {page.sections.length} section{page.sections.length === 1 ? "" : "s"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
