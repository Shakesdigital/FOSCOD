-- ============================================================
-- FOSCOD CMS - media library, required alt text, third home CTA
-- ============================================================

alter table public.hero_slides
  add column if not exists cta3_label text,
  add column if not exists cta3_href text,
  add column if not exists image_alt text;

alter table public.programs add column if not exists featured_image_alt text;
alter table public.projects add column if not exists featured_image_alt text;
alter table public.stories add column if not exists featured_image_alt text;
alter table public.team_members add column if not exists photo_alt text;
alter table public.testimonials add column if not exists photo_alt text;
alter table public.partners add column if not exists logo_alt text;
alter table public.sub_programs add column if not exists hero_image_alt text;
alter table public.activities add column if not exists hero_image_alt text;
alter table public.impact_stories add column if not exists hero_image_alt text;

alter table public.hero_slides drop constraint if exists hero_slides_image_alt_required;
alter table public.hero_slides add constraint hero_slides_image_alt_required
  check (image_url is null or nullif(trim(image_alt), '') is not null);
alter table public.programs drop constraint if exists programs_image_alt_required;
alter table public.programs add constraint programs_image_alt_required
  check (featured_image_url is null or nullif(trim(featured_image_alt), '') is not null);
alter table public.projects drop constraint if exists projects_image_alt_required;
alter table public.projects add constraint projects_image_alt_required
  check (featured_image_url is null or nullif(trim(featured_image_alt), '') is not null);
alter table public.stories drop constraint if exists stories_image_alt_required;
alter table public.stories add constraint stories_image_alt_required
  check (featured_image_url is null or nullif(trim(featured_image_alt), '') is not null);
alter table public.team_members drop constraint if exists team_image_alt_required;
alter table public.team_members add constraint team_image_alt_required
  check (photo_url is null or nullif(trim(photo_alt), '') is not null);
alter table public.testimonials drop constraint if exists testimonial_image_alt_required;
alter table public.testimonials add constraint testimonial_image_alt_required
  check (photo_url is null or nullif(trim(photo_alt), '') is not null);
alter table public.partners drop constraint if exists partner_logo_alt_required;
alter table public.partners add constraint partner_logo_alt_required
  check (logo_url is null or nullif(trim(logo_alt), '') is not null);
alter table public.sub_programs drop constraint if exists sub_program_image_alt_required;
alter table public.sub_programs add constraint sub_program_image_alt_required
  check (hero_image_url is null or nullif(trim(hero_image_alt), '') is not null);
alter table public.activities drop constraint if exists activity_image_alt_required;
alter table public.activities add constraint activity_image_alt_required
  check (hero_image_url is null or nullif(trim(hero_image_alt), '') is not null);
alter table public.impact_stories drop constraint if exists impact_story_image_alt_required;
alter table public.impact_stories add constraint impact_story_image_alt_required
  check (hero_image_url is null or nullif(trim(hero_image_alt), '') is not null);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null default 'foscod-media',
  object_path text not null unique,
  public_url text not null,
  alt_text text not null check (length(trim(alt_text)) > 0),
  caption text,
  mime_type text,
  file_size_bytes bigint,
  width int,
  height int,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_media_assets_updated on public.media_assets;
create trigger trg_media_assets_updated before update on public.media_assets
  for each row execute function public.set_updated_at();

alter table public.media_assets enable row level security;
drop policy if exists media_assets_public_read on public.media_assets;
create policy media_assets_public_read on public.media_assets for select using (true);
drop policy if exists media_assets_staff_write on public.media_assets;
create policy media_assets_staff_write on public.media_assets
  for all using (public.is_staff()) with check (public.is_staff());

insert into storage.buckets (id, name, public)
values ('foscod-media', 'foscod-media', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists foscod_media_public_read on storage.objects;
create policy foscod_media_public_read on storage.objects
  for select using (bucket_id = 'foscod-media');
drop policy if exists foscod_media_staff_insert on storage.objects;
create policy foscod_media_staff_insert on storage.objects
  for insert with check (bucket_id = 'foscod-media' and public.is_staff());
drop policy if exists foscod_media_staff_update on storage.objects;
create policy foscod_media_staff_update on storage.objects
  for update using (bucket_id = 'foscod-media' and public.is_staff())
  with check (bucket_id = 'foscod-media' and public.is_staff());
drop policy if exists foscod_media_staff_delete on storage.objects;
create policy foscod_media_staff_delete on storage.objects
  for delete using (bucket_id = 'foscod-media' and public.is_staff());
