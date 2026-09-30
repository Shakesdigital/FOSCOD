import type { ReactNode } from "react";

/** Eyebrow — a clean, uppercase label used above section headings sitewide.
 *  Replaces the prior dash-delimited "signature mark" style across the site. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`eyebrow ${className}`}>{children}</span>;
}
