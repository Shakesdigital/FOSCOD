-- ============================================================
-- FOSCOD CMS — seed data
-- Safe to re-run (upserts). Run after 0001 + 0002 migrations.
-- ============================================================

-- ---------- settings ----------
insert into public.settings (key, value, "group") values
  ('site_name', '"FOSCOD"', 'general'),
  ('legal_name', '"Foundation for Sustainable Community Based Development"', 'general'),
  ('tagline', '"Bridge global learning with local innovation"', 'general'),
  ('contact_email', '"info@foscod.org"', 'contact'),
  ('contact_phone', '"+256 753 449 450"', 'contact'),
  ('contact_location', '"Jinja, Uganda"', 'contact'),
  ('social_facebook', '"https://facebook.com/foscod"', 'contact'),
  ('social_instagram', '"https://instagram.com/foscod"', 'contact'),
  ('social_linkedin', '"https://linkedin.com/company/foscod"', 'contact'),
  ('brand_accent', '"#10474c"', 'branding'),
  ('brand_water', '"#10474c"', 'branding'),
  ('brand_gold', '"#d99a24"', 'branding'),
  ('brand_bg', '"#ffffff"', 'branding'),
  ('brand_ink', '"#16241f"', 'branding'),
  ('seo_default_title', '"FOSCOD — Bridge global learning with local innovation"', 'seo'),
  ('seo_default_description', '"FOSCOD empowers rural and underserved communities in Uganda through community-led development, clean energy, environmental sustainability, and hands-on global learning programs."', 'seo')
on conflict (key) do update set value = excluded.value, "group" = excluded."group";

-- ---------- redirects (old WordPress URLs → new structure) ----------
insert into public.redirects (source, destination, status_code) values
  ('/about-us', '/about', 301),
  ('/global-learning-and-exchange', '/programs/global-learning-exchange', 301),
  ('/apply-now', '/apply', 301),
  ('/new-apply', '/apply', 301),
  ('/program-fees', '/programs/program-fees', 301),
  ('/refund-policy', '/programs/refund-policy', 301),
  ('/ced-program', '/programs/community-empowerment-development', 301),
  ('/foscod-projects', '/projects', 301),
  ('/wash-project', '/projects/wash', 301),
  ('/renewable-energy', '/projects/renewable-energy', 301),
  ('/biochar-uganda', '/projects/biochar-uganda', 301),
  ('/sustainable-livelihood-green-enterprises', '/projects/sustainable-livelihood-green-enterprises', 301),
  ('/social-inclusion-and-empowerment', '/focus/social-inclusion-empowerment', 301),
  ('/health-and-well-being', '/focus/health-wellbeing', 301),
  ('/partner-with-foscod', '/partners', 301),
  ('/partner-with-us', '/partners', 301),
  ('/meet-the-team', '/team', 301),
  ('/board-of-directors', '/team', 301),
  ('/our-staff', '/team', 301),
  ('/alumni-network', '/alumni', 301),
  ('/alumni-forum', '/alumni', 301),
  ('/alumni-reviews', '/alumni', 301),
  ('/contact-us', '/contact', 301),
  ('/blog', '/stories', 301),
  ('/home', '/', 301),
  ('/home-one', '/', 301),
  ('/internship', '/internships', 301),
  ('/solar-project', '/projects/renewable-energy', 301),
  ('/sample-page', '/', 410)
on conflict (source) do update set destination = excluded.destination, status_code = excluded.status_code;

-- ---------- projects ----------
insert into public.projects (slug, title, theme, location, status, featured, excerpt, order_column) values
  ('biochar-uganda', 'Biochar Uganda', 'Climate & Soil', 'Kalagala Parish, Buikwe', 'published', true,
    'Turning invasive water hyacinth into biochar for healthier soil, clean cooking, and verifiable carbon removal.', 1),
  ('wash', 'WASH & Public Health', 'Water & Health', 'Busoga region', 'published', true,
    'Protected springs, rainwater harvesting, and hygiene education that restore dignity and resilience.', 2),
  ('renewable-energy', 'Renewable Energy', 'Clean Energy', 'Greater Mukono', 'published', true,
    'Solar enterprises, home systems, and efficient cookstoves that power livelihoods and protect forests.', 3),
  ('sustainable-livelihood-green-enterprises', 'Sustainable Livelihoods', 'Green Enterprise', 'Buikwe & Mukono', 'published', true,
    'Agroforestry, VSLA savings groups, and climate-smart enterprise that grow income while restoring land.', 4)
on conflict (slug) do update set
  title = excluded.title, theme = excluded.theme, location = excluded.location,
  status = excluded.status, featured = excluded.featured, excerpt = excluded.excerpt;

-- ---------- impact_metrics (drafts — never show zeros) ----------
insert into public.impact_metrics (label, value, note, status, visible, order_column) values
  ('Communities served', '—', 'Impact data being updated', 'draft', true, 1),
  ('Projects implemented', '—', 'Impact data being updated', 'draft', true, 2),
  ('Alumni worldwide', '—', 'Impact data being updated', 'draft', true, 3),
  ('Active partners', '—', 'Impact data being updated', 'draft', true, 4)
on conflict do nothing;

-- ---------- partners ----------
insert into public.partners (name, type, visible, order_column) values
  ('University Partner', 'Academic', true, 1),
  ('Community CBO', 'Community', true, 2),
  ('Local NGO', 'NGO', true, 3),
  ('Climate Funder', 'Funder', true, 4),
  ('Research Institute', 'Research', true, 5),
  ('District Government', 'Government', true, 6)
on conflict do nothing;

-- ---------- stories ----------
insert into public.stories (slug, title, category, excerpt, status, published_at) values
  ('celebrating-our-host-families', 'Celebrating Our Host Families', 'Host Family Stories',
    'The families who open their homes are the quiet backbone of every FOSCOD placement.', 'published', now()),
  ('solar-powered-salon-naluvule', 'Solar-Powered Salon in Naluvule', 'Project Updates',
    'How one clean-energy enterprise is changing what''s possible for a village business.', 'published', now()),
  ('internship-debrief-2025', 'FOSCOD Internship Debrief 2025', 'Impact Reports',
    'What this year''s cohort built, learned, and left behind across four districts.', 'published', now())
on conflict (slug) do nothing;

-- ---------- hero_slides (rotating hero per landing page) ----------
insert into public.hero_slides (page_slug, eyebrow, title, intro, cta_label, cta_href, cta2_label, cta2_href, tone, order_column, visible) values
  ('home', 'Registered Ugandan NGO · Jinja', 'Bridging global learning with local innovation',
    'Community-led development across rural Uganda — clean energy, water, the environment, and livelihoods — paired with hands-on learning for students, researchers, and partners.',
    'Apply for a program', '/apply', 'Partner with FOSCOD', '/partners', 'earth', 1, true),
  ('home', 'Global Learning & Exchange', 'Learn in the field, alongside the community',
    'Internships, volunteering, group programs, and research placements with real local supervision — and a host-family experience that turns a placement into a relationship.',
    'Explore programs', '/programs/global-learning-exchange', null, null, 'water', 2, true),
  ('home', 'Community Empowerment & Development', 'Invest in change that communities sustain',
    'Fund and partner on locally owned solutions in renewable energy, environment, water, livelihoods, and inclusion — designed and delivered by the communities that lead them.',
    'Support our work', '/donate', 'Explore projects', '/projects', 'forest', 3, true),
  ('about', 'Who we are', 'A Ugandan NGO with local roots and global partnerships',
    'We work with rural and underserved communities to design sustainable, ethical, and locally owned development — combining community-led practice with global knowledge exchange.',
    'Meet the team', '/team', null, null, 'forest', 1, true),
  ('about', 'Our story', 'Lasting change, led by the communities living it',
    'From our home in Jinja, we''ve grown into a registered indigenous NGO working across districts — and a bridge between local innovation and learners worldwide.',
    'Our programs', '/programs', null, null, 'earth', 2, true),
  ('programs', 'Our programs', 'Two pillars, one mission',
    'FOSCOD advances community-led development and connects global learners to real field work — so local innovation and global knowledge strengthen each other.',
    'Find your program', '/programs/finder', null, null, 'water', 1, true),
  ('programs', 'Global Service Learning', 'Structured, supervised field experience in Uganda',
    'Internships, volunteering, group programs, and research across clean energy, WASH, livelihoods, health, and the environment.',
    'Learn more', '/programs/global-learning-exchange', null, null, 'forest', 2, true),
  ('impact', 'Field report · impact', 'Impact we can stand behind',
    'We publish verified numbers only. Where figures are still being confirmed in the field, we show them as drafts — we never display zeros.',
    'Read field stories', '/stories', null, null, 'earth', 1, true),
  ('impact', 'On the ground', 'Real change, measured honestly',
    'Clean energy that powers a livelihood, water that restores dignity, land regenerated with biochar — and the people behind every number.',
    'Grow verified impact', '/donate', null, null, 'water', 2, true),
  ('contact', 'Contact', 'Get in touch with FOSCOD',
    'Questions about programs, partnerships, donations, or community projects? Tell us a little about you and we''ll reply soon.',
    'Apply now', '/apply', 'Partner with us', '/partners', 'forest', 1, true)
on conflict (page_slug, order_column) do update set
  eyebrow = excluded.eyebrow, title = excluded.title, intro = excluded.intro,
  cta_label = excluded.cta_label, cta_href = excluded.cta_href,
  cta2_label = excluded.cta2_label, cta2_href = excluded.cta2_href,
  tone = excluded.tone, visible = excluded.visible;

-- ---------- team_members (staff + board placeholders) ----------
insert into public.team_members (name, role, category, short_bio, visible, order_column) values
  ('Programs & Operations Lead', 'Staff', 'staff', 'Coordinates FOSCOD programs and field operations from Jinja.', true, 1),
  ('Global Learning Coordinator', 'Staff', 'staff', 'Supports interns, volunteers, and university cohorts on the ground.', true, 2),
  ('Community Engagement Officer', 'Staff', 'staff', 'Works with local leaders and host families across our districts.', true, 3),
  ('Board Chairperson', 'Board of Directors', 'board', 'Guides FOSCOD''s governance, ethics, and long-term strategy.', true, 1),
  ('Board Member — Finance', 'Board of Directors', 'board', 'Oversees transparency and accountability in financial reporting.', true, 2),
  ('Board Member — Partnerships', 'Board of Directors', 'board', 'Strengthens FOSCOD''s academic and funding partnerships.', true, 3)
on conflict do nothing;

-- ---------- impact-section stories (Impact page card grids) ----------
-- Segmented by category: Impact Story | Impact Video | Community Experience.
insert into public.stories (slug, title, category, excerpt, status, video_url, published_at) values
  ('clean-energy-livelihood', 'Clean energy that powers a livelihood', 'Impact Story',
    'In Naluvule, a solar-powered salon turned an unreliable income into a growing business.', 'published', null, now()),
  ('water-dignity-resilience', 'Water, dignity, and resilience', 'Impact Story',
    'Protected springs and hygiene education across Busoga are reducing illness and restoring dignity.', 'published', null, now()),
  ('regenerating-land-biochar', 'Regenerating land with biochar', 'Impact Story',
    'In Kalagala Parish, invasive water hyacinth becomes biochar — healthier soil, cleaner cooking, and new income.', 'published', null, now()),
  ('video-meet-our-host-families', 'Meet our host families', 'Impact Video',
    'A short film on the families who open their homes to every cohort.', 'published', '', now()),
  ('video-a-project-handover', 'A project handover', 'Impact Video',
    'What it looks like when a community takes full ownership of its work.', 'published', '', now()),
  ('video-cohort-debrief-2025', 'Cohort debrief 2025', 'Impact Video',
    'This year''s interns on what they built and learned across four districts.', 'published', '', now()),
  ('community-opening-our-home', 'Opening our home', 'Community Experience',
    'A host family on what welcoming international learners has meant for them.', 'published', null, now()),
  ('community-savings-group', 'What the savings group changed', 'Community Experience',
    'Members of a VSLA on building income and resilience together.', 'published', null, now()),
  ('community-co-designing', 'Co-designing a project', 'Community Experience',
    'A local leader on setting the priorities — and seeing them delivered.', 'published', null, now())
on conflict (slug) do update set
  title = excluded.title, category = excluded.category, excerpt = excluded.excerpt,
  status = excluded.status, video_url = excluded.video_url;

-- ---------- testimonials / alumni reviews (illustrative; role-based attribution) ----------
insert into public.testimonials (name, cohort, program, quote, permission, status, order_column) values
  ('WASH intern', 'Cohort 2025', 'WASH Internship',
    'I learned more about ethical development in eight weeks with FOSCOD than in a year of coursework. The community led, and we followed.', true, 'published', 1),
  ('Renewable energy volunteer', 'Cohort 2024', 'Renewable Energy Volunteer',
    'The placement was structured, safe, and genuinely useful to the community. I left with skills and friendships I still carry.', true, 'published', 2),
  ('University group lead', 'Group Program 2025', 'University Cohort',
    'Our university group worked on a real menstrual-health project with full local supervision — exactly the academic value we needed.', true, 'published', 3)
on conflict do nothing;
