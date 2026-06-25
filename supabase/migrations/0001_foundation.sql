-- ============================================================
-- FOSCOD CMS — 0001 foundation
-- Profiles + roles, settings, navigation, redirects, RLS helpers.
-- ============================================================

create extension if not exists pgcrypto;

-- ---------- updated_at trigger ----------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

-- ---------- profiles + roles ----------
do $$ begin
  create type public.app_role as enum ('super_admin','admin','editor','viewer');
exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role public.app_role not null default 'viewer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_profiles_updated on public.profiles;
create trigger trg_profiles_updated before update on public.profiles
  for each row execute function public.set_updated_at();

-- New auth users get a profile automatically (viewer by default).
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email))
  on conflict (id) do nothing;
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Authorization helpers (security definer → safe to call inside RLS).
create or replace function public.current_role()
returns public.app_role language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.current_role() in ('super_admin','admin','editor'), false);
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.current_role() in ('super_admin','admin'), false);
$$;

alter table public.profiles enable row level security;
drop policy if exists profiles_self_read on public.profiles;
create policy profiles_self_read on public.profiles
  for select using (id = auth.uid() or public.is_staff());
drop policy if exists profiles_self_update on public.profiles;
create policy profiles_self_update on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());
drop policy if exists profiles_admin_all on public.profiles;
create policy profiles_admin_all on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- settings ----------
create table if not exists public.settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  "group" text not null default 'general',
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_settings_updated on public.settings;
create trigger trg_settings_updated before update on public.settings
  for each row execute function public.set_updated_at();

alter table public.settings enable row level security;
-- Public groups are readable by anyone; secrets (email/integrations/system) are staff-only.
drop policy if exists settings_public_read on public.settings;
create policy settings_public_read on public.settings
  for select using ("group" in ('general','contact','branding','seo') or public.is_staff());
drop policy if exists settings_admin_write on public.settings;
create policy settings_admin_write on public.settings
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- navigation ----------
create table if not exists public.navigation (
  id uuid primary key default gen_random_uuid(),
  location text not null default 'header', -- header | footer | mobile
  label text not null,
  href text not null,
  parent_id uuid references public.navigation(id) on delete cascade,
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.navigation enable row level security;
drop policy if exists navigation_public_read on public.navigation;
create policy navigation_public_read on public.navigation
  for select using (visible or public.is_staff());
drop policy if exists navigation_admin_write on public.navigation;
create policy navigation_admin_write on public.navigation
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- redirects (old WordPress URLs → new structure) ----------
create table if not exists public.redirects (
  id uuid primary key default gen_random_uuid(),
  source text not null unique,
  destination text not null,
  status_code int not null default 301,
  created_at timestamptz not null default now()
);
alter table public.redirects enable row level security;
drop policy if exists redirects_public_read on public.redirects;
create policy redirects_public_read on public.redirects for select using (true);
drop policy if exists redirects_admin_write on public.redirects;
create policy redirects_admin_write on public.redirects
  for all using (public.is_admin()) with check (public.is_admin());
