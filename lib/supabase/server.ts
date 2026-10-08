import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/** True only when the env holds a real https Supabase URL + a key. Guards
 *  against blank values AND placeholder/typo'd values (which would otherwise
 *  crash createClient with "Invalid supabaseUrl"). */
export function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && /^https?:\/\/.+/i.test(url) && key && key.length > 20);
}

/**
 * Server Supabase client (RSC / route handlers). Returns null when env is not
 * configured, so server components can fall back to built-in default content.
 */
export async function createClient() {
  if (!isSupabaseConfigured()) return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  try {
    const cookieStore = await cookies();
    return createServerClient(url, key, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — safe to ignore; middleware refreshes.
          }
        },
      },
    });
  } catch {
    // cookies() not available during static generation — return null so content
    // functions fall back to built-in defaults.
    return null;
  }
}
