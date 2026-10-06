import { createClient } from "jsr:@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@4.0.0";

/**
 * notify-form-submission
 *
 * Supabase Edge Function invoked from the /api/submit route after a form
 * submission is saved to the database. Sends an HTML email notification
 * to the admin email configured in the `settings` table.
 *
 * Required secrets (set via `supabase functions serve` or Supabase project settings):
 *   - SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY  (server-side only; used to read settings)
 *   - RESEND_API_KEY
 *
 * @param body — { record: { id, type, payload, created_at } }
 */

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  { db: { schema: "public" } },
);

const resend = new Resend(Deno.env.get("RESEND_API_KEY") ?? "");

Deno.serve(async (req) => {
  // Allow CORS for local development
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  let body: { record?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const record = body.record;
  if (!record) {
    return new Response(JSON.stringify({ error: "Missing 'record' in body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { type, payload: submissionPayload, created_at } = record;

  // --- Resolve admin notification email from settings ---
  let adminEmail = "info@foscod.org";
  const { data: settingsRow } = await supabaseAdmin
    .from("settings")
    .select("value")
    .eq("key", "notification_email")
    .single();

  if (settingsRow?.value) {
    try {
      const parsed = typeof settingsRow.value === "string"
        ? JSON.parse(settingsRow.value)
        : settingsRow.value;
      if (parsed && parsed.email) adminEmail = parsed.email;
    } catch {
      // value may be a plain string
      if (typeof settingsRow.value === "string" && settingsRow.value.includes("@")) {
        adminEmail = settingsRow.value.replace(/^"|"$/g, "");
      }
    }
  }

  // --- Build a readable summary of the submission ---
  const submittedAt = new Date(
    typeof created_at === "string" ? created_at : Date.now(),
  ).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const formTypeLabel: Record<string, string> = {
    application: "Application",
    internship: "Internship inquiry",
    volunteer: "Volunteer inquiry",
    group: "Group service trip inquiry",
    partner: "Partnership proposal",
    donor: "Donation inquiry",
    contact: "Contact form",
    alumni: "Alumni form",
    newsletter: "Newsletter signup",
  };
  const formTypeDisplay = formTypeLabel[String(type)] ?? String(type);

  // Render payload fields as table rows
  let payloadFields = "";
  if (submissionPayload && typeof submissionPayload === "object" && !Array.isArray(submissionPayload)) {
    payloadFields = Object.entries(submissionPayload)
      .filter(([, v]) => v !== undefined && v !== null && v !== "")
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 12px 4px 0;font-family:system-ui,sans-serif;font-size:14px;color:#555;">${String(k).replace(/_/g, " ")}</td><td style="padding:4px 0 4px 12px;font-family:system-ui,sans-serif;font-size:14px;color:#111;">${String(v)}</td></tr>`,
      )
      .join("");
  } else {
    payloadFields = `<tr><td style="padding:4px 12px 4px 0;font-family:system-ui,sans-serif;font-size:14px;color:#555;">payload</td><td style="padding:4px 0 4px 12px;font-family:system-ui,sans-serif;font-size:14px;color:#111;"><pre style="white-space:pre-wrap;">${JSON.stringify(submissionPayload, null, 2)}</pre></td></tr>`;
  }

  const submitterName =
    (submissionPayload &&
      typeof submissionPayload === "object" &&
      ((submissionPayload as Record<string, unknown>).name ||
        (submissionPayload as Record<string, unknown>).firstName)) ||
    "FOSCOD website visitor";

  const subject = `New ${formTypeDisplay} submission — ${String(submitterName)}`;

  const html = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${subject}</title>
  </head>
  <body style="margin:0;padding:32px 24px;background:#f7f7f7;font-family:system-ui,sans-serif;color:#333;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;border-radius:8px;padding:32px;">
      <h1 style="margin:0 0 16px;font-size:22px;color:#124f4b;">New form submission received</h1>

      <table style="margin-bottom:20px;">
        <tr><td style="font-family:system-ui,sans-serif;font-size:14px;color:#777;padding:2px 8px 2px 0;">Form type:</td><td style="font-family:system-ui,sans-serif;font-size:14px;color:#111;">${formTypeDisplay}</td></tr>
        <tr><td style="font-family:system-ui,sans-serif;font-size:14px;color:#777;padding:2px 8px 2px 0;">Submitted:</td><td style="font-family:system-ui,sans-serif;font-size:14px;color:#111;">${submittedAt}</td></tr>
      </table>

      <table style="border-collapse:collapse;width:100%;margin-bottom:24px;">
        ${payloadFields}
      </table>

      <p style="font-family:system-ui,sans-serif;font-size:13px;color:#999;margin-top:24px;">
        This notification was sent automatically from the FOSCOD website when a user
        submitted the ${formTypeDisplay} form. Review and follow up in the admin panel.
      </p>
    </div>
  </body>
</html>`;

  // --- Send the email ---
  const { error, data: emailData } = await resend.emails.send({
    from: "FOSCOD Website <onboarding@resend.dev>",
    to: [adminEmail],
    subject,
    html,
  });

  if (error) {
    console.error("Failed to send notification email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Record the notification for audit trail
  if (record.id) {
    const { error: notifyError } = await supabaseAdmin
      .from("form_submission_notifications")
      .insert({
        form_submission_id: record.id,
        form_type: String(type),
        subject,
        recipient_email: adminEmail,
        status: "sent",
      });

    if (notifyError) {
      console.warn("Failed to record notification:", notifyError.message);
    }
  }

  return new Response(
    JSON.stringify({ success: true, sentTo: adminEmail, messageId: emailData?.id }),
    { headers: { "Content-Type": "application/json" } },
  );
});
