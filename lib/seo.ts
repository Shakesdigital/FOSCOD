import type { Metadata } from "next";

/** Build per-page metadata; title gets the "— FOSCOD" template from layout. */
export function pageMeta(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: { title: `${title} — FOSCOD`, description },
  };
}
