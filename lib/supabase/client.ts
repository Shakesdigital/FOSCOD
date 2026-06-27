"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser Supabase client. Returns null when env is not configured so the
 * public site can render with built-in defaults during early development.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !/^https?:\/\/.+/i.test(url) || !key || key.length <= 20) return null;
  return createBrowserClient(url, key);
}
