"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser Supabase client. Returns null only when the URL or key is truly
 * missing (not set at all). Lets the real client surface auth errors so the
 * login page can guide the admin rather than blocking with a config message.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  // Guard placeholders (e.g. PASTE_YOUR_PROJECT_URL_HERE) — an invalid URL
  // would throw inside createBrowserClient and 500 the whole login page.
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
  } catch {
    return null;
  }
  return createBrowserClient(url, key);
}
