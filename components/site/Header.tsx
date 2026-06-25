"use client";

import Link from "next/link";
import { useState } from "react";
import { primaryNav, site } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
        {/* Wordmark — swap for logo asset via CMS branding settings */}
        <Link href="/" className="flex items-baseline gap-2" aria-label="FOSCOD home">
          <span className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--ink)]">
            FOSCOD
          </span>
          <span className="hidden font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.18em] text-[var(--muted)] sm:inline">
            Uganda
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenGroup(item.label)}
              onMouseLeave={() => setOpenGroup(null)}
            >
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 rounded-[var(--radius-md)] px-3 py-2 text-[0.95rem] text-[var(--ink-soft)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--ink)]"
                aria-haspopup={item.children ? "true" : undefined}
                aria-expanded={item.children ? openGroup === item.label : undefined}
              >
                {item.label}
                {item.children && (
                  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="opacity-50">
                    <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                )}
              </Link>
              {item.children && openGroup === item.label && (
                <div className="absolute left-0 top-full w-64 pt-2">
                  <ul className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] py-2 shadow-[var(--shadow-md)]">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2 text-[0.9rem] text-[var(--ink-soft)] transition-colors hover:bg-[var(--accent-50)] hover:text-[var(--accent-700)]"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/donate" variant="secondary" size="md">
            Donate
          </Button>
          <Button href="/apply" variant="primary" size="md">
            Apply
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] text-[var(--ink)] lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="sr-only">Menu</span>
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--bg)] lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
            {primaryNav.map((item) => (
              <div key={item.label} className="py-1">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-base font-medium text-[var(--ink)]"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="ml-3 border-l border-[var(--border)] pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="block py-1.5 text-[0.9rem] text-[var(--muted)]"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="mt-3 flex gap-3">
              <Button href="/donate" variant="secondary" size="md">
                Donate
              </Button>
              <Button href="/apply" variant="primary" size="md">
                Apply
              </Button>
            </div>
            <p className="mt-4 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
              {site.contact.location}
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
