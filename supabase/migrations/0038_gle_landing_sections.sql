-- ============================================================
-- FOSCOD CMS - 0038 GLE landing page restructure
-- The GLE landing page is reorganized into independent sections,
-- each with its own background tint:
--   1. Landing   (hero + introduction + two program cards)
--   2. Target audience
--   3. Program benefits
--   4. Start dates   (existing program_dates table, already CMS-managed)
--   5. Application details (existing gle_apply_section)
-- plus opportunities and testimonials carousels (published rows only).
--
-- New CMS-managed content:
--   gle_program_cards    - the two cards (volunteer / internship program)
--   gle_target_audience  - who GLE is for
--   gle_benefits         - program benefits
--
-- Copy is grounded in the approved GLE program description (0031)
-- and the current FAQ wording. No new facts are introduced.
--
-- RLS mirrors the 0019 pattern: public read where visible,
-- staff write via public.is_staff().
-- ============================================================

-- ---------- Two program cards (volunteer / internship) ----------
create table if not exists public.gle_program_cards (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  body text not null,
  href text not null,
  cta text,
  kicker text,
  tag text,
  image_url text,
  image_alt text,
  icon text,
  tone text,
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.gle_program_cards enable row level security;

drop trigger if exists trg_gle_program_cards_updated on public.gle_program_cards;
create trigger trg_gle_program_cards_updated before update on public.gle_program_cards
  for each row execute function public.set_updated_at();

drop policy if exists gle_program_cards_public_read on public.gle_program_cards;
create policy gle_program_cards_public_read on public.gle_program_cards
  for select using (visible or public.is_staff());
drop policy if exists gle_program_cards_staff_write on public.gle_program_cards;
create policy gle_program_cards_staff_write on public.gle_program_cards
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_gle_program_cards_order on public.gle_program_cards (order_column);

delete from public.gle_program_cards;
insert into public.gle_program_cards (slug, title, body, href, cta, kicker, tag, icon, tone, order_column, visible) values
  ('volunteer-program', 'Volunteer Program',
   'A structured volunteering placement with FOSCOD''s Community Empowerment and Development Program (CEDP) or a local partner organization. You contribute to community-defined priorities under local supervision, with orientation, guided reflection and cultural exchange.',
   '/opportunities?type=volunteer', 'Browse volunteer placements', 'Give your time and skills', 'Volunteering',
   'volunteer', 'forest', 1, true),
  ('internship-program', 'Internship Program',
   'A supervised internship aligned to your learning objectives - a defined role, a named supervisor, regular monitoring and reflection, and a useful handover that strengthens the host organization.',
   '/opportunities?type=internship', 'Browse internships', 'Build career experience', 'Internship',
   'energy', 'water', 2, true);

-- ---------- Target audience ----------
create table if not exists public.gle_target_audience (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  body text not null,
  icon text,
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.gle_target_audience enable row level security;

drop trigger if exists trg_gle_target_audience_updated on public.gle_target_audience;
create trigger trg_gle_target_audience_updated before update on public.gle_target_audience
  for each row execute function public.set_updated_at();

drop policy if exists gle_target_audience_public_read on public.gle_target_audience;
create policy gle_target_audience_public_read on public.gle_target_audience
  for select using (visible or public.is_staff());
drop policy if exists gle_target_audience_staff_write on public.gle_target_audience;
create policy gle_target_audience_staff_write on public.gle_target_audience
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_gle_target_audience_order on public.gle_target_audience (order_column);

delete from public.gle_target_audience;
insert into public.gle_target_audience (slug, title, body, icon, order_column, visible) values
  ('university-college-students', 'University & college students', 'Supervised field learning tied to your studies, from semester placements to short service-learning trips.', 'education', 1, true),
  ('graduates-career-starters', 'Graduates & career starters', 'Practical experience in community-based development that strengthens your CV and professional direction.', 'volunteer', 2, true),
  ('professionals-career-breakers', 'Professionals & career breakers', 'Mid-career contributions - skills-based volunteering, project support or research exposure in a new context.', 'enterprise', 3, true),
  ('researchers-postgraduates', 'Researchers & postgraduates', 'Community-based participatory research (CBPR) designed, carried out and shared with local partners.', 'research', 4, true),
  ('university-institution-groups', 'University & institution groups', 'Faculty-led group projects, coordinated placements, service-learning trips and study tours of eight days or more.', 'partner', 5, true);

-- ---------- Program benefits ----------
create table if not exists public.gle_benefits (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  body text not null,
  icon text,
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.gle_benefits enable row level security;

drop trigger if exists trg_gle_benefits_updated on public.gle_benefits;
create trigger trg_gle_benefits_updated before update on public.gle_benefits
  for each row execute function public.set_updated_at();

drop policy if exists gle_benefits_public_read on public.gle_benefits;
create policy gle_benefits_public_read on public.gle_benefits
  for select using (visible or public.is_staff());
drop policy if exists gle_benefits_staff_write on public.gle_benefits;
create policy gle_benefits_staff_write on public.gle_benefits
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_gle_benefits_order on public.gle_benefits (order_column);

delete from public.gle_benefits;
insert into public.gle_benefits (slug, title, body, icon, order_column, visible) values
  ('community-defined-roles', 'Community-defined roles', 'Work on priorities identified with communities and local partners - not manufactured tasks.', 'volunteer', 1, true),
  ('named-local-supervisor', 'Named local supervisor', 'Orientation, mentorship, practical guidance and monitoring from an experienced local supervisor.', 'partner', 2, true),
  ('arrangements-confirmed-in-writing', 'Arrangements confirmed in writing', 'Accommodation arrangement, local transport and an emergency contact are confirmed for your specific intake before placement.', 'enterprise', 3, true),
  ('host-family-cultural-exchange', 'Host-family cultural exchange', 'Live and learn alongside host families, local leaders and community organizations in genuine two-way exchange.', 'livelihoods', 4, true),
  ('reflection-and-continuity', 'Reflection & continuity', 'Guided reflection, a review of outcomes with community partners, and documented lessons that support continuing development.', 'research', 5, true),
  ('academic-alignment', 'Academic alignment', 'FOSCOD can align activities and evidence of learning with your institution; your home institution remains responsible for approving academic credit.', 'education', 6, true);
