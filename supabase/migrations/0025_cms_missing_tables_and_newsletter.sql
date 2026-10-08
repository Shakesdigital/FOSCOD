-- ============================================================
-- FOSCOD CMS — 0025: missing tables + newsletter subscribers
-- Adds tables that were referenced in lib/content.ts and
-- lib/cms-collections.ts but had no migration yet:
--   1. impact_story_details — full-detail impact story pages with
--      hero, story body blocks, stats, video, and testimonials.
--   2. general_impact_pages — program-level impact landing pages
--      (CEDP / GLE) with hero, story cards, explore carousel, and
--      get-involved cards.
--   3. newsletter_subscribers — email list signups (name, email,
--      source, status) replacing the old frontend-only Newsletter form.
-- ============================================================

-- ---------- impact_story_details ----------
create table if not exists public.impact_story_details (
  slug text primary key,
  title text not null,
  eyebrow text,
  hero_image_url text,
  hero_image_alt text,
  hero_intro text,
  tone text not null default 'forest' check (tone in ('earth','water','forest')),
  hero_cta_label text,
  hero_cta_href text,
  story_body jsonb not null default '[]'::jsonb,
  stats_eyebrow text,
  stats_title text,
  stats_intro text,
  stats_items jsonb not null default '[]'::jsonb,
  video_eyebrow text,
  video_title text,
  video_description text,
  video_url text,
  video_thumbnail_url text,
  video_thumbnail_alt text,
  testimonials_eyebrow text,
  testimonials_title text,
  testimonials_intro text,
  testimonials jsonb not null default '[]'::jsonb,
  meta_title text,
  meta_description text,
  meta_image_url text,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_impact_story_details_updated on public.impact_story_details;
create trigger trg_impact_story_details_updated before update on public.impact_story_details
  for each row execute function public.set_updated_at();

alter table public.impact_story_details enable row level security;
drop policy if exists impact_story_details_read on public.impact_story_details;
create policy impact_story_details_read on public.impact_story_details
  for select using (status = 'published' or public.is_staff());
drop policy if exists impact_story_details_write on public.impact_story_details;
create policy impact_story_details_write on public.impact_story_details
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_impact_story_details_slug on public.impact_story_details (slug);

-- ---------- general_impact_pages ----------
create table if not exists public.general_impact_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  program text not null check (program in ('CEDP','GLE')),
  title text not null,
  eyebrow text,
  hero_image_url text,
  hero_image_alt text,
  tone text not null default 'forest' check (tone in ('earth','water','forest')),
  hero_cta_label text,
  hero_cta_href text,
  hero_cta2_label text,
  hero_cta2_href text,
  hero_cta3_label text,
  hero_cta3_href text,
  description_title text,
  description_body text,
  cd_stories_eyebrow text,
  cd_stories_title text,
  cd_stories_intro text,
  cd_story_cards jsonb not null default '[]'::jsonb,
  gle_stories_eyebrow text,
  gle_stories_title text,
  gle_stories_intro text,
  gle_story_cards jsonb not null default '[]'::jsonb,
  explore_eyebrow text,
  explore_title text,
  explore_intro text,
  explore_testimonials jsonb not null default '[]'::jsonb,
  explore_testimonials_cta_label text default 'Discover more stories',
  explore_testimonials_cta_href text,
  explore_videos jsonb not null default '[]'::jsonb,
  explore_videos_cta_label text default 'Watch more videos',
  explore_videos_cta_href text,
  get_involved_eyebrow text,
  get_involved_title text,
  get_involved_intro text,
  get_involved_cards jsonb not null default '[]'::jsonb,
  meta_title text,
  meta_description text,
  meta_image_url text,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_general_impact_pages_updated on public.general_impact_pages;
create trigger trg_general_impact_pages_updated before update on public.general_impact_pages
  for each row execute function public.set_updated_at();

alter table public.general_impact_pages enable row level security;
drop policy if exists general_impact_pages_read on public.general_impact_pages;
create policy general_impact_pages_read on public.general_impact_pages
  for select using (visible or public.is_staff());
drop policy if exists general_impact_pages_write on public.general_impact_pages;
create policy general_impact_pages_write on public.general_impact_pages
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_general_impact_pages_slug on public.general_impact_pages (slug);

-- ---------- newsletter_subscribers ----------
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  source text,
  status text not null default 'subscribed' check (status in ('subscribed','unsubscribed','bounced')),
  consent_given boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_newsletter_subscribers_updated on public.newsletter_subscribers;
create trigger trg_newsletter_subscribers_updated before update on public.newsletter_subscribers
  for each row execute function public.set_updated_at();

alter table public.newsletter_subscribers enable row level security;
drop policy if exists newsletter_subscribers_read on public.newsletter_subscribers;
create policy newsletter_subscribers_read on public.newsletter_subscribers
  for select using (public.is_staff());
drop policy if exists newsletter_subscribers_write on public.newsletter_subscribers;
create policy newsletter_subscribers_write on public.newsletter_subscribers
  for insert with check (true);
drop policy if exists newsletter_subscribers_admin_update on public.newsletter_subscribers;
create policy newsletter_subscribers_admin_update on public.newsletter_subscribers
  for update using (public.is_staff()) with check (public.is_staff());
drop policy if exists newsletter_subscribers_admin_delete on public.newsletter_subscribers;
create policy newsletter_subscribers_admin_delete on public.newsletter_subscribers
  for delete using (public.is_staff());
