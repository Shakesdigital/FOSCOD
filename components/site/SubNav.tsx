"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** SubNav — the sticky on-page anchor strip under the main header.
 *  Tracks the section currently in view and highlights the matching link,
 *  so the menu always reflects the sections that actually exist on the page. */
export function SubNav({
  items,
  label = "On this page",
}: {
  items: { href: string; label: string }[];
  label?: string;
}) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const ids = items
      .map((item) => item.href.replace(/^#/, ""))
      .filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label={label}
      className="sticky top-16 z-40 border-b border-[var(--border-strong)] bg-[var(--surface)]/95 backdrop-blur-sm shadow-[var(--shadow-sm)] md:top-20"
    >
      <div className="container-page flex gap-1.5 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const isActive = active === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "true" : undefined}
              className={`whitespace-nowrap rounded-[var(--radius-full)] px-4 py-2.5 font-[family-name:var(--font-text)] text-[0.8rem] font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-600)] ${
                isActive
                  ? "bg-[var(--accent-100)] text-[var(--accent-700)]"
                  : "text-[var(--ink-soft)] hover:bg-[var(--accent-100)] hover:text-[var(--accent-700)]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}