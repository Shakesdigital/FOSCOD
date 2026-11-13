-- ============================================================
-- FOSCOD CMS - 0031 GLE experience model
-- Restructures the Global Learning Exchange Program (GLE) to the
-- approved five experience types and the four selection dimensions:
--   Step 1  Program type          -> gle_pathways (re-seeded, 5 rows)
--   Step 2  Thematic interests    -> gle_development_sectors (+category)
--   Step 3  Engagement approach   -> gle_engagement_approaches (new)
--   Step 4  Participation format  -> gle_participation_formats (new)
--
-- Copy is grounded in the director's approved GLE description
-- (Nov 2026 information request) and the budget brief. Internship /
-- volunteering remain classifications on opportunities and the
-- application flow, not top-level programs.
--
-- RLS mirrors the 0019 pattern: public read where visible,
-- staff write via public.is_staff().
-- ============================================================

-- ---------- Step 2 taxonomy: sector category (cedp | partner) ----------
alter table public.gle_development_sectors
  add column if not exists category text not null default 'partner';

delete from public.gle_development_sectors;
insert into public.gle_development_sectors (slug, title, description, category, icon, order_column, visible) values
  ('clean-energy-climate-resilience', 'Clean Energy & Climate Resilience', 'Clean energy, climate adaptation, afforestation, ecosystem restoration and sustainable environmental practices.', 'cedp', 'energy', 1, true),
  ('water-sanitation-community-health', 'Water, Sanitation & Community Health', 'Access to safe water, sanitation and hygiene, community health awareness, disease prevention and appropriate referrals.', 'cedp', 'water', 2, true),
  ('sustainable-livelihoods-skills-economic-empowerment', 'Sustainable Livelihoods, Skills & Economic Empowerment', 'Skills development, agroecology, agroforestry, food security, savings, entrepreneurship and income generation.', 'cedp', 'enterprise', 3, true),
  ('womens-empowerment-gender-equality', 'Women''s Empowerment & Gender Equality', null, 'partner', 'partner', 4, true),
  ('health', 'Health', null, 'partner', 'health', 5, true),
  ('ict', 'Information & Communication Technology (ICT)', null, 'partner', 'energy', 6, true),
  ('microenterprise-microfinance', 'Microenterprise & Microfinance', null, 'partner', 'enterprise', 7, true),
  ('environment-conservation', 'Environment & Conservation', null, 'partner', 'forest', 8, true),
  ('community-development', 'Community Development', null, 'partner', 'earth', 9, true),
  ('human-rights', 'Human Rights', null, 'partner', 'partner', 10, true),
  ('education-youth-development', 'Education & Youth Development', null, 'partner', 'earth', 11, true),
  ('art-history-culture', 'Art, History & Culture — Visual and Performing Arts', null, 'partner', 'culture', 12, true),
  ('engineering', 'Engineering — Civil, Solar Energy and Water Systems', null, 'partner', 'energy', 13, true)
on conflict (slug) do update set
  title = excluded.title, description = excluded.description,
  category = excluded.category, icon = excluded.icon,
  order_column = excluded.order_column, visible = excluded.visible;

alter table public.gle_pathways
  add column if not exists tone text,
  add column if not exists tag text;

-- ---------- Step 1 taxonomy: the five experience types ----------
delete from public.gle_pathways;
insert into public.gle_pathways (title, body, href, cta, kicker, tag, order_column, visible) values
  ('Individual Internship or Volunteer Placement',
   'A structured placement for students, graduates, professionals and volunteers seeking practical experience in community-based development. Participants engage in locally defined projects or research with FOSCOD or its partner organizations, supported by professional supervision, guided reflection and cultural learning. Placements may also fulfil academic requirements through agreed learning objectives and assessments.',
   '/opportunities', 'Browse placements', 'Individuals & graduates', 'Internship or volunteering', 1, true),
  ('Group Project Placement',
   'A collaborative placement where participants from the same university or institution work together with a host organization on a shared community development project or research initiative. The program promotes teamwork, experiential learning and collective contributions to locally identified community priorities.',
   '/apply?type=group-project', 'Enquire as a group', 'University & institution groups', 'One shared project', 2, true),
  ('Coordinated Group Placement',
   'A structured program for groups from the same university or institution, with participants placed across different local partner organizations according to their academic interests, skills and learning objectives. Individual placements are complemented by coordinated learning activities, cultural engagement and shared reflection.',
   '/apply?type=coordinated-group', 'Enquire as a group', 'University & institution groups', 'Placements across hosts', 3, true),
  ('Service-Learning Trip',
   'A short-term program, typically lasting 1–4 weeks, that integrates meaningful community engagement with structured learning, guided reflection and cultural immersion. Designed for student and professional groups, it combines educational objectives with locally identified community priorities to promote mutual learning, social responsibility and sustainable community benefits.',
   '/apply?type=service-learning-trip', 'Plan a trip', 'Student & professional groups', '1–4 weeks', 4, true),
  ('Study Tour Program',
   'A customized educational experience for schools and university groups, lasting at least eight days. Developed collaboratively with participating institutions, study tours combine lectures, community engagement, organizational visits, discussions, guided reflection and cultural excursions to deepen understanding of sustainable community-based development in Uganda.',
   '/apply?type=study-tour', 'Plan a study tour', 'Schools & universities', '8+ days', 5, true);

-- ---------- Step 3 taxonomy: engagement approaches ----------
create table if not exists public.gle_engagement_approaches (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.gle_engagement_approaches enable row level security;

drop trigger if exists trg_gle_engagement_approaches_updated on public.gle_engagement_approaches;
create trigger trg_gle_engagement_approaches_updated before update on public.gle_engagement_approaches
  for each row execute function public.set_updated_at();

drop policy if exists gle_engagement_approaches_public_read on public.gle_engagement_approaches;
create policy gle_engagement_approaches_public_read on public.gle_engagement_approaches
  for select using (visible or public.is_staff());
drop policy if exists gle_engagement_approaches_staff_write on public.gle_engagement_approaches;
create policy gle_engagement_approaches_staff_write on public.gle_engagement_approaches
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_gle_engagement_approaches_order on public.gle_engagement_approaches (order_column);

insert into public.gle_engagement_approaches (slug, title, description, order_column, visible) values
  ('community-based-development-projects', 'Community-Based Development Projects',
   'Participants collaborate with communities and local partners to identify priorities, plan, implement and monitor development initiatives. The approach emphasizes practical engagement, locally driven solutions and experiential learning. Participatory inquiry, monitoring and reflection may be incorporated to inform project decisions and improve outcomes.', 1, true),
  ('community-based-participatory-research', 'Community-Based Participatory Research (CBPR)',
   'Participants work collaboratively with communities and local partners to investigate locally identified issues, generate relevant knowledge and explore evidence-informed solutions. The approach develops applied research competencies while supporting community decision-making, development practice and policy. Research findings are shared with community partners to inform practical action and continuing development.', 2, true),
  ('integrated-development-and-research', 'Integrated Community Development & Participatory Research',
   'This approach combines participatory research and practical development activities within a coordinated learning experience. Participants collaborate with communities and partners to understand development challenges, generate evidence, implement or strengthen appropriate interventions, and assess emerging results. It promotes continuous learning, allowing research to inform development action while practical experience generates knowledge for future improvements.', 3, true)
on conflict (slug) do update set
  title = excluded.title, description = excluded.description,
  order_column = excluded.order_column, visible = excluded.visible;

-- ---------- Step 4 taxonomy: participation formats ----------
create table if not exists public.gle_participation_formats (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.gle_participation_formats enable row level security;

drop trigger if exists trg_gle_participation_formats_updated on public.gle_participation_formats;
create trigger trg_gle_participation_formats_updated before update on public.gle_participation_formats
  for each row execute function public.set_updated_at();

drop policy if exists gle_participation_formats_public_read on public.gle_participation_formats;
create policy gle_participation_formats_public_read on public.gle_participation_formats
  for select using (visible or public.is_staff());
drop policy if exists gle_participation_formats_staff_write on public.gle_participation_formats;
create policy gle_participation_formats_staff_write on public.gle_participation_formats
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_gle_participation_formats_order on public.gle_participation_formats (order_column);

insert into public.gle_participation_formats (slug, title, description, order_column, visible) values
  ('in-person-uganda', 'In-Person Participation — Uganda',
   'Participants engage directly with FOSCOD, local partner organizations and communities through structured placements and learning activities in Uganda. In-person participation combines practical experience, professional supervision, community engagement, cultural immersion and guided reflection. Available across GLE program types, subject to placement arrangements.', 1, true),
  ('virtual-remote', 'Virtual Participation — Remote',
   'Participants engage remotely through structured online placements, supervised projects, collaborative research and other agreed activities. Virtual participation provides opportunities to develop professional competencies, exchange knowledge and contribute meaningfully to community development without travelling to Uganda. It is considered for suitable individual and group internships or volunteer placements; service-learning trips and study tours are primarily in-person programs, with alternative arrangements considered separately.', 2, true)
on conflict (slug) do update set
  title = excluded.title, description = excluded.description,
  order_column = excluded.order_column, visible = excluded.visible;

-- ---------- Introduction: director's approved description ----------
delete from public.gle_introduction;
insert into public.gle_introduction (title, eyebrow, body, cta_label, cta_href, visible) values
  ('Learning together. Creating lasting community impact.',
   'Global Learning Exchange Program (GLE)',
   'Global Learning Exchange Program (GLE) is FOSCOD''s community-engaged learning program that designs and facilitates internships, volunteering, research, service learning and study tours in collaboration with local communities and partner organizations. Through locally defined initiatives, practical engagement, cultural immersion and mutual knowledge exchange, GLE strengthens participants'' professional and intercultural competencies while promoting ethical community-based development and lasting community benefits. GLE is a structured learning and training program in doing ethical, sustainable community-based development — participants contribute within locally defined priorities, guided by supervision, reflection and reciprocity.',
   'Explore GLE opportunities', '/opportunities', true);

-- ---------- Apply section: director's closing CTA ----------
delete from public.gle_apply_section;
insert into public.gle_apply_section (title, eyebrow, body, cta_label, cta_href, visible) values
  ('Begin your GLE journey',
   'Take part',
   'Explore opportunities that match your interests and learning objectives while contributing to meaningful community-led development in Uganda. Not sure which program, thematic area or engagement approach suits you? FOSCOD provides guidance before you apply. Submitting an application starts a matching process — it does not guarantee acceptance or a particular host organization.',
   'Start your GLE application', '/apply', true);
