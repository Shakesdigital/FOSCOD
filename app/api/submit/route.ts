import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

const ALLOWED = new Set([
  "internship",
  "volunteer",
  "group",
  "partner",
  "donor",
  "contact",
  "alumni",
  "newsletter",
]);

export async function POST(request: Request) {
  let body: { type?: string; payload?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const type = String(body.type ?? "");
  const payload = body.payload ?? {};

  if (!ALLOWED.has(type)) {
    return NextResponse.json({ ok: false, error: "Unknown form type." }, { status: 400 });
  }
  // Minimal honeypot + required-field guard.
  if (typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
  }
  if (JSON.stringify(payload).length > 50_000) {
    return NextResponse.json({ ok: false, error: "Submission is too large." }, { status: 413 });
  }
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "A valid email address is required." }, { status: 400 });
  }
  if ((payload as Record<string, unknown>)["company_website"]) {
    // Honeypot filled → silently accept (likely a bot).
    return NextResponse.json({ ok: true, stored: false });
  }

  if (!isSupabaseConfigured()) {
    // No DB yet — accept so the UX is demonstrable; nothing is persisted.
    return NextResponse.json({ ok: false, error: "Submissions are temporarily unavailable. Please email info@foscod.org." }, { status: 503 });
  }

  const supabase = await createClient();
  const { error } = (await supabase
    ?.from("form_submissions")
    .insert({ type, payload })) ?? { error: { message: "No client" } };

  if (error) {
    return NextResponse.json({ ok: false, error: "Could not save your submission." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, stored: true });
}
