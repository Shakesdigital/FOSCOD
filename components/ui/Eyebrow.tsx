import type { ReactNode } from "react";

/** The field-report signature mark: a monospace, ticked label. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`eyebrow ${className}`}>{children}</span>;
}
