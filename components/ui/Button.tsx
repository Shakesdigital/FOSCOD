import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "on-dark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-[var(--radius-full)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const sizes: Record<Size, string> = {
  md: "text-[0.95rem] px-5 py-2.5",
  lg: "text-base px-7 py-3.5",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--accent-600)] text-[var(--accent-fg)] hover:bg-[var(--accent-700)] focus-visible:outline-[var(--accent-700)]",
  secondary:
    "bg-transparent text-[var(--ink)] border border-[var(--border-strong)] hover:border-[var(--ink)] hover:bg-[var(--surface)] focus-visible:outline-[var(--ink)]",
  ghost:
    "bg-transparent text-[var(--accent-700)] hover:bg-[var(--accent-50)] focus-visible:outline-[var(--accent-700)]",
  "on-dark":
    "bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--surface-2)] focus-visible:outline-white",
};

type ButtonAsLink = {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className">;

export function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  ...rest
}: ButtonAsLink) {
  return (
    <Link href={href} className={`${base} ${sizes[size]} ${variants[variant]}`} {...rest}>
      {children}
    </Link>
  );
}
