-- ============================================================
-- FOSCOD CMS — about page content (mission, vision, values, leadership)
-- A key/config table so editors can manage all About Us page text
-- and images from the CMS. Uses the same visible-based RLS pattern
-- as team_members / partners / hero_slides.
-- ============================================================

create table if not exists public.about_content (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,                -- 'mission' | 'vision' | 'values' | 'leadership'
  config jsonb not null default '{}'::jsonb, -- structured content for the key
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_about_content_key on public.about_content (key);

-- ---------- updated_at trigger (function defined in 0001) ----------
drop trigger if exists trg_about_content_updated on public.about_content;
create trigger trg_about_content_updated before update on public.about_content
  for each row execute function public.set_updated_at();

-- ---------- RLS ----------
alter table public.about_content enable row level security;
drop policy if exists about_content_public_read on public.about_content;
create policy about_content_public_read on public.about_content
  for select using (visible or public.is_staff());
drop policy if exists about_content_staff_write on public.about_content;
create policy about_content_staff_write on public.about_content
  for all using (public.is_staff()) with check (public.is_staff());
