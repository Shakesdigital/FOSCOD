-- ============================================================
-- FOSCOD CMS — 0024 Form submission notifications
--
-- Adds:
--   1. form_submission_notifications table — audit trail of emails sent
--      when form submissions are received.
--   2. notification_email setting key — configurable admin recipient
--      (defaults to the primary contact email).
--
-- Email notifications are sent by the `notify-form-submission` Edge Function,
-- which is invoked synchronously from the /api/submit route after a submission
-- is saved. This avoids the complexity of net.http_post from a Postgres
-- trigger and keeps the notification logic in serverless code where
-- Resend API keys and other secrets are available as environment variables.
-- ============================================================

-- ---------- notifications audit table ----------
create table if not exists public.form_submission_notifications (
  id uuid primary key default gen_random_uuid(),
  form_submission_id uuid references public.form_submissions(id) on delete set null,
  form_type text not null,
  subject text,
  recipient_email text,
  status text not null default 'pending',   -- pending | sent | failed
  error_message text,
  created_at timestamptz not null default now(),
  sent_at timestamptz
);

drop trigger if exists trg_notifications_updated on public.form_submission_notifications;
create trigger trg_notifications_updated before update on public.form_submission_notifications
  for each row execute function public.set_updated_at();

alter table public.form_submission_notifications enable row level security;
drop policy if exists notifications_staff_read on public.form_submission_notifications;
create policy notifications_staff_read
  on public.form_submission_notifications
  for select using (public.is_staff());
drop policy if exists notifications_admin_write on public.form_submission_notifications;
create policy notifications_admin_write
  on public.form_submission_notifications
  for all using (public.is_admin()) with check (public.is_admin());

create index if not exists idx_notifications_submission on public.form_submission_notifications (form_submission_id);
create index if not exists idx_notifications_created on public.form_submission_notifications (created_at desc);

-- ---------- notification email setting ----------
-- Determines where form-submission notification emails are sent.
-- Staff can update this from the CMS admin panel (settings table is staff-writable).
insert into public.settings (key, value, "group") values
  ('notification_email', '{"email":"info@foscod.org"}', 'contact')
on conflict (key) do update
  set value = excluded.value;

-- ---------- notes ----------
-- The notify-form-submission Edge Function lives at:
--   supabase/functions/notify-form-submission/index.ts
--
-- The /api/submit route (app/api/submit/route.ts) calls this function
-- after saving a submission to form_submissions, passing the submission
-- record as { record: { id, type, payload, created_at } }.
--
-- Required Edge Function secrets (set via `supabase functions serve` or
-- Supabase project settings):
--   - RESEND_API_KEY
--   - SUPABASE_URL (auto-injected by Supabase)
--   - SUPABASE_SERVICE_ROLE_KEY (auto-injected by Supabase)
