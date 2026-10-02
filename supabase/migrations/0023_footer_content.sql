-- ============================================================
-- FOSCOD CMS — 0023 Footer content model
--
-- Makes the entire footer CMS-manageable: a site description,
-- social-media links with platform keys, footer navigation
-- columns (label, href, order), and contact details.
-- The public footer reads these first and falls back to the
-- built-in defaults in lib/site.ts when not seeded.
-- ============================================================

-- ---------- site settings (free-form key/value within a group) ----------
-- Re-uses the existing public.settings table. The following keys are
-- expected for the footer:
--   group 'site'    → site_description  (text)
--   group 'contact' → already seeded: contact_location, contact_mailing,
--                                          contact_email, contact_secondary_email,
--                                          contact_phone, social_*

-- ---------- footer navigation (replaces static footerNav) ----------
create table if not exists public.footer_nav (
  id uuid primary key default gen_random_uuid(),
  column_key text not null,          -- 'quick-links' (all footer links group here)
  label text not null,
  href text not null,
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_footer_nav_updated on public.footer_nav;
create trigger trg_footer_nav_updated before update on public.footer_nav
  for each row execute function public.set_updated_at();

alter table public.footer_nav enable row level security;
drop policy if exists footer_nav_public_read on public.footer_nav;
create policy footer_nav_public_read on public.footer_nav
  for select using (visible or public.is_staff());
drop policy if exists footer_nav_staff_write on public.footer_nav;
create policy footer_nav_staff_write on public.footer_nav
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_footer_nav_column_order
  on public.footer_nav (column_key, order_column);

-- ---------- footer columns (titles + ordering) ----------
-- Lets the CMS re-order or rename footer column headings.
create table if not exists public.footer_columns (
  key text primary key,                -- 'about' | 'quick-links' | 'contact'
  title text not null,
  position int not null default 0,
  visible boolean not null default true
);

insert into public.footer_columns (key, title, position, visible) values
  ('about',      'About Us',    1, true),
  ('quick-links','Quick Links', 2, true),
  ('contact',    'Contacts',    3, true)
on conflict (key) do update set
  title = excluded.title,
  position = excluded.position,
  visible = excluded.visible;
