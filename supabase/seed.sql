-- ============================================================
-- FOSCOD CMS — seed data
-- Apply ALL numbered migrations (0001 through 0025) before running.
-- ============================================================

-- ---------- settings ----------
insert into public.settings (key, value, "group") values
  ('site_name', '"FOSCOD"', 'general'),
  ('legal_name', '"Foundation for Sustainable Community-Based Development"', 'general'),
  ('tagline', '"Communities leading environmental innovation and clean energy adoption"', 'general'),
  ('contact_email', '"info@foscod.org"', 'contact'),
  ('contact_email_secondary', '"foscoduganda@gmail.com"', 'contact'),
  ('contact_phone', '"+256 772 989971"', 'contact'),
  ('contact_location', '"Kasigwa Road, Plot 2, Njeru Municipality, Buikwe District, Uganda"', 'contact'),
  ('contact_mailing', '"P.O. Box 1722, Jinja, Uganda"', 'contact'),
  ('social_facebook', '"https://facebook.com/foscoduganda"', 'contact'),
  ('social_linkedin', '"https://linkedin.com/company/foundation-for-sustainable-community-based-development"', 'contact'),
  ('social_youtube', '"https://youtube.com/@foscoduganda"', 'contact'),
  ('social_x', '"https://x.com/foscoduganda"', 'contact'),
  ('social_tiktok', '"https://tiktok.com/@foscodug"', 'contact'),
  ('brand_accent', '"#124f4b"', 'branding'),
  ('brand_water', '"#124f4b"', 'branding'),
  ('brand_gold', '"#d99a24"', 'branding'),
  ('brand_bg', '"#ffffff"', 'branding'),
  ('brand_ink', '"#16241f"', 'branding'),
  ('seo_default_title', '"FOSCOD — Community-led environmental innovation in Uganda"', 'seo'),
  ('seo_default_description', '"FOSCOD empowers underserved communities in Uganda to drive environmental innovation and adopt clean energy through ethical, sustainable development and global knowledge exchange."', 'seo'),
  ('site_description', '"FOSCOD connects locally led development with ethical global learning and exchange — on clean energy, water, livelihoods, health, and the environment."', 'site')
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

-- ---------- programs (two pillars) ----------
insert into public.programs (slug, pillar, title, summary, status, featured, order_column) values
  ('global-learning-exchange', 'GLE', 'Global Learning & Exchange',
    'Internships, volunteering, group programs, and research placements give students, professionals, and universities structured, supervised field experience in clean energy, WASH, livelihoods, health, and the environment.',
    'published', true, 1),
  ('community-empowerment-development', 'CEDP', 'Community Empowerment & Development',
    'Locally owned solutions across renewable energy, environment, water, livelihoods, health, and inclusion — designed and delivered with the communities that lead them.',
    'published', true, 2)
on conflict (slug) do update set
  pillar = excluded.pillar, title = excluded.title, summary = excluded.summary,
  status = excluded.status, featured = excluded.featured, order_column = excluded.order_column;

-- ---------- projects ----------
delete from public.projects where slug in ('biochar-uganda','wash','renewable-energy','sustainable-livelihood-green-enterprises');
insert into public.projects (slug, title, theme, location, status, featured, excerpt, linked_program, order_column) values
  ('greening-kalagala', 'Greening Kalagala', 'Ecosystem Restoration', 'Kalagala Parish, Buikwe District', 'published', true,
    'A community reforestation campaign in FOSCOD''s core CEDP implementation area.', 'CEDP', 1),
  ('water-spring-protection-naluvule', 'Water Spring Protection in Naluvule Community', 'WASH', 'Naluvule, Buikwe District', 'published', true,
    'Community-led protection of a natural water spring in Naluvule.', 'CEDP', 2),
  ('coffee-farming-mobilization', 'Coffee Farming Mobilization', 'Green Livelihoods', 'Kalagala Parish, Buikwe District', 'published', true,
    'Community mobilization around coffee farming and resilient local livelihoods.', 'CEDP', 3),
  ('solar-powered-water-system-naluvule', 'Solar-Powered Water System, Naluvule Village', 'Clean Energy & WASH', 'Naluvule, Buikwe District', 'published', true,
    'A solar-powered water initiative linking renewable energy with community water access.', 'CEDP', 4),
  ('carbon-credit-project', 'Carbon Credit Project', 'Clean Cooking & Ecosystem Restoration', 'Kalagala Parish, Buikwe District', 'published', true,
    'A planned clean-cookstove and reforestation initiative aligned with Gold Standard and Verra REDD+ methodologies.', 'CEDP', 5)
on conflict (slug) do update set
  title = excluded.title, theme = excluded.theme, location = excluded.location,
  status = excluded.status, featured = excluded.featured, excerpt = excluded.excerpt,
  linked_program = excluded.linked_program;

-- Set challenge images for projects
-- UPDATE (not INSERT) avoids NOT NULL violations on title: the project row
-- is already inserted above (lines 77-90), so we only need to set the
-- challenge image columns on an existing row.
update public.projects
  set challenge_image_url = '/images/naluvule/challenge-site.jpg',
      challenge_image_alt = 'Solar-powered water system site in Naluvule'
  where slug = 'solar-powered-water-system-naluvule';

-- ---------- impact_metrics (verified and dated) ----------
delete from public.impact_metrics;
insert into public.impact_metrics (label, value, note, status, visible, order_column) values
  ('Community projects implemented', '35', 'Verified track record, 2022–2024', 'verified', true, 1),
  ('Development practitioners trained', '42', '27 in-person interns, 11 virtual interns, and 4 volunteers; 2019–2024', 'verified', true, 2),
  ('Virtual interns engaged', '93', 'Verified track record, 2019–2024', 'verified', true, 3),
  ('Completed projects sustaining benefits', '86%', 'Continue to benefit communities independently; verified track record, 2019–2024', 'verified', true, 4)
on conflict do nothing;

-- ---------- partners ----------
delete from public.partners;
insert into public.partners (name, type, visible, order_column) values
  ('Northwestern University', 'Academic', true, 1),
  ('Fort Lewis College', 'Academic', true, 2),
  ('KAYA Responsible Travel', 'Implementation Partner', true, 3),
  ('AIESEC', 'In-kind Support', true, 4),
  ('Together for a New Africa Organizations', 'In-kind Support', true, 5),
  ('Women Raising for Africa', 'In-kind Support', true, 6),
  ('Buikwe Local Government', 'Government', true, 7)
on conflict do nothing;

-- ---------- stories ----------
insert into public.stories (slug, title, category, excerpt, status, published_at) values
  ('celebrating-our-host-families', 'Celebrating Our Host Families', 'Host Family Stories',
    'The families who open their homes are the quiet backbone of every FOSCOD placement.', 'draft', now()),
  ('solar-powered-salon-naluvule', 'Solar-Powered Salon in Naluvule', 'Project Updates',
    'How one clean-energy enterprise is changing what''s possible for a village business.', 'draft', now()),
  ('internship-debrief-2025', 'FOSCOD Internship Debrief 2025', 'Impact Reports',
    'What this year''s cohort built, learned, and left behind across four districts.', 'draft', now())
on conflict (slug) do nothing;

-- ---------- hero_slides (rotating hero per landing page) ----------
insert into public.hero_slides (page_slug, eyebrow, title, intro, cta_label, cta_href, cta2_label, cta2_href, tone, order_column, visible) values
  ('home', 'Registered Ugandan NGO · Buikwe District', 'Communities leading environmental innovation and clean energy adoption',
    'FOSCOD empowers underserved communities through ethical, sustainable development and global knowledge exchange.',
    'Partner with us', '/partners', 'Volunteer or Intern', '/programs/global-learning-exchange', 'earth', 1, true),
  ('home', 'Global Learning & Exchange', 'Learn in the field, alongside the community',
    'Internships, volunteering, group programs, and research placements with real local supervision — and a host-family experience that turns a placement into a relationship.',
    'Explore programs', '/programs/global-learning-exchange', null, null, 'water', 2, true),
  ('home', 'Community Empowerment & Development', 'Invest in change that communities sustain',
    'Fund and partner on locally owned solutions in renewable energy, environment, water, livelihoods, and inclusion — designed and delivered by the communities that lead them.',
    'Donate to a project', '/donate', 'Explore projects', '/projects/archive', 'forest', 3, true),
  ('about', 'Who we are', 'A Ugandan NGO with local roots and global partnerships',
    'We work with rural and underserved communities to design sustainable, ethical, and locally owned development — combining community-led practice with global knowledge exchange.',
    'Meet the team', '/team', null, null, 'forest', 1, true),
  ('about', 'Our story', 'Lasting change, led by the communities living it',
    'From our home in Jinja, we''ve grown into a registered indigenous NGO working across districts — and a bridge between local innovation and learners worldwide.',
    'Our programs', '/programs', null, null, 'earth', 2, true),
  ('programs', 'Our programs', 'Two pillars, one mission',
    'FOSCOD advances community-led development and connects global learners to real field work — so local innovation and global knowledge strengthen each other.',
    'Find a project opportunity fit', '/programs/finder', null, null, 'water', 1, true),
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
    'Volunteer or Intern', '/programs/global-learning-exchange', null, null, 'forest', 1, true),
  ('contact', 'We''re in Jinja', 'Let''s build something lasting, together',
    'Reach our team by email or phone, or stop by the office — we''d love to hear what you''re working on.',
    'Explore partnership', '/partners', null, null, 'water', 2, true),
  ('stories', 'Blog · stories from the field', 'Stories from the communities we serve',
    'Project updates, impact reports, alumni reflections, and host-family stories — straight from FOSCOD''s work across Uganda.',
    'Volunteer or Intern', '/programs/global-learning-exchange', null, null, 'earth', 1, true),
  ('stories', 'From the field', 'Real people, real change',
    'Read how community-led projects in clean energy, water, and livelihoods are taking shape — and the people behind them.',
    'See our impact', '/impact', null, null, 'forest', 2, true),
  ('apply', 'Get involved', 'Apply to join FOSCOD',
    'Start your internship, volunteer, or global service journey in Uganda. Choose the pathway that fits your goals, timeline, and field interests.',
    'Start your application', '#application-forms', 'View fees', '/programs/program-fees', 'water', 1, true),
  ('apply', 'Structured & supported', 'Field experience that means something',
    'Supervised placements, host families, and a clear application path — for students, professionals, and university groups.',
    'Find a project opportunity fit', '/programs/finder', null, null, 'earth', 2, true),
  ('global-learning-exchange', 'Global Learning & Exchange', 'Global Service Learning in Uganda',
    'Internships, volunteering, and global service trips that pair real community projects with structured, supervised field learning.',
    'Volunteer or Intern', '/programs/global-learning-exchange', 'Find a project opportunity fit', '/programs/finder', 'water', 1, true),
  ('global-learning-exchange', 'Learn by doing', 'Contribute to genuine community priorities',
    'Work alongside FOSCOD, host families, and local leaders on clean energy, WASH, livelihoods, health, and research.',
    'View fees', '/programs/program-fees', null, null, 'forest', 2, true),
  ('volunteer', 'Volunteer', 'Volunteer in Uganda with FOSCOD',
    'Work with communities — not just in communities — through structured volunteer programs that support local priorities and lasting impact.',
    'Volunteer or Intern', '/programs/global-learning-exchange', null, null, 'water', 1, true),
  ('volunteer', 'Individual or group', 'Give your time where it lasts',
    'Join as an individual or bring a group — every placement is supervised, supported, and tied to a real community priority.',
    'Group volunteering', '/volunteer/group', 'Individual volunteering', '/volunteer/individual', 'water', 2, true),
  ('volunteer-group', 'Group volunteer program', 'Bring your team to the field',
    'University cohorts, faculty-led groups, and professional teams working a shared community project — with logistics and risk management handled.',
    'Volunteer or Intern', '/programs/global-learning-exchange', null, null, 'water', 1, true),
  ('volunteer-individual', 'Individual volunteer program', 'A placement matched to you',
    'One-to-one placements matched to your skills and the community''s needs, with local supervision and 24/7 support.',
    'Volunteer or Intern', '/programs/global-learning-exchange', null, null, 'forest', 1, true),
  ('internships', 'Internships', 'Sustainable development internships in Uganda',
    'Build real-world skills through supervised community projects across public health, clean energy, livelihoods, research, communications, and enterprise.',
    'Volunteer or Intern', '/programs/global-learning-exchange', 'View fees', '/programs/program-fees', 'water', 1, true),
  ('internships', 'Hands-on & supervised', 'Turn theory into real contribution',
    'Individual placements, group engage internships, and university cohorts — all matched to your goals and supervised on the ground.',
    'Browse opportunities', '/internships/opportunities', null, null, 'earth', 2, true),
  ('internship-group', 'Group internship program', 'Bring your cohort to the field',
    'University cohorts and professional groups working a shared community project — with academic alignment, supervision, and safety handled.',
    'Volunteer or Intern', '/programs/global-learning-exchange', null, null, 'water', 1, true),
  ('internship-individual', 'Individual internship program', 'A placement matched to your goals',
    'One-to-one internships matched to your field, timeline, and career goals, with local supervision and a host-family experience.',
    'Volunteer or Intern', '/programs/global-learning-exchange', null, null, 'forest', 1, true),
  ('internships-opportunities', 'Internship opportunities', 'FOSCOD internship opportunities',
    'Browse live internship projects across WASH, health, nutrition, energy, agroforestry, research, ICT, communications, and more — and find the one that fits you.',
    'Volunteer or Intern', '/programs/global-learning-exchange', null, null, 'water', 1, true),
  ('volunteer-opportunities', 'Volunteer opportunities', 'FOSCOD volunteer opportunities',
    'Find a volunteer project where your time and skills make a real difference — across health, empowerment, education, and the environment.',
    'Volunteer or Intern', '/programs/global-learning-exchange', null, null, 'forest', 1, true),
  ('program-fees', 'Transparent pricing', 'What your program fee covers',
    'Program fees are confirmed in writing before any payment. Every placement is tailored — costs depend on pathway, duration, group size, accommodation, supervision, and field logistics. Your fee covers airport pickup, orientation, host-family stay, midterm retreats, transport, meals, and project support.',
    null, null, 'Request a quote', '/programs/global-learning-exchange#application-forms', 'forest', 1, true)
on conflict (page_slug, order_column) do update set
  eyebrow = excluded.eyebrow, title = excluded.title, intro = excluded.intro,
  cta_label = excluded.cta_label, cta_href = excluded.cta_href,
  cta2_label = excluded.cta2_label, cta2_href = excluded.cta2_href,
  tone = excluded.tone, visible = excluded.visible;

update public.hero_slides
set cta3_label = 'Donate to a project', cta3_href = '/donate'
where page_slug = 'home' and order_column = 1;

update public.hero_slides
set visible = false
where page_slug = 'home' and order_column > 1;

update public.hero_slides
set intro = 'From our base in Njeru Municipality, FOSCOD connects locally led development with ethical global learning and exchange.'
where page_slug = 'about' and order_column = 2;

update public.hero_slides
set intro = 'Questions about programs, partnerships, donations, or community projects? Tell us how the FOSCOD team can help.'
where page_slug = 'contact' and order_column = 1;

update public.hero_slides
set eyebrow = 'Visit or contact us',
    intro = 'Reach the team by email or phone, or visit Kasigwa Road, Plot 2, Njeru Municipality, Buikwe District.'
where page_slug = 'contact' and order_column = 2;

update public.hero_slides
set title = 'Approved stories and updates',
    intro = 'FOSCOD publishes project updates, reports, and permissioned reflections after facts and consent are checked.'
where page_slug = 'stories' and order_column = 1;

update public.hero_slides
set visible = false
where page_slug in ('impact','stories') and order_column > 1;

-- ---------- team_members (verified leadership only) ----------
delete from public.team_members;
insert into public.team_members (name, role, category, short_bio, visible, order_column) values
  ('Mrs. Amanyire Margaret Nassozi', 'Executive Director', 'staff', 'Leads FOSCOD''s programs, operations, partnerships, and institutional development.', true, 1),
  ('Mr. Kayemba Patrick', 'Chairman, Board of Directors', 'board', 'Provides governance leadership as Chair of FOSCOD''s six-member Board of Directors.', true, 1)
on conflict do nothing;

-- ---------- about_content (mission, vision, values, leadership) ----------
delete from public.about_content;
insert into public.about_content (key, config, visible) values
  ('mission', '{
    "title": "Mission",
    "description": "To empower underserved communities to drive environmental innovation and adopt clean energy through ethical, sustainable development and global knowledge exchange."
  }', true),
  ('vision', '{
    "title": "Vision",
    "description": "A world where local communities champion environmental stewardship and clean energy adoption, strengthened by global partnerships."
  }', true),
  ('values', '[
    {"title": "Integrated & Holistic Development", "body": "Health, livelihoods, environment, and learning advance together — not in silos.", "benchmark": "Programs connect education, health, economic empowerment, and environmental sustainability."},
    {"title": "Equity & Inclusion", "body": "Equal access for youth, women, people with disabilities, and marginalized households.", "benchmark": "50% women''s participation target across all initiatives."},
    {"title": "Community Ownership & Leadership", "body": "Locally led, culturally relevant; communities set the priorities.", "benchmark": "Communities define priorities and lead culturally appropriate, environmentally sound solutions."},
    {"title": "Sustainability & Innovation", "body": "Long-term impact, with renewable energy and stewardship at the centre.", "benchmark": "Programs invest in long-term, adaptive solutions rooted in local realities."},
    {"title": "Collaboration & Shared Learning", "body": "Cross-sector knowledge shared between communities, universities, and partners.", "benchmark": "Knowledge and solutions are co-created with communities, government, academia, and partners."},
    {"title": "Transparency & Accountability", "body": "Honest reporting and ethical management of every resource.", "benchmark": "Resources, performance, and impact are managed and communicated responsibly."},
    {"title": "Empowerment Through Learning", "body": "Knowledge as the catalyst for lasting change.", "benchmark": "2,500+ people trained in renewable energy technologies by 2030."}
  ]', true),
  ('leadership', '{
    "board": {
      "description": "A six-member Board of Directors provides strategic oversight, approves organizational strategy, and ensures accountability to the communities we serve.",
      "href": "/team/board",
      "cta": "View the board"
    },
    "team": {
      "description": "Our core staff team in Jinja designs, implements, and monitors programs across clean energy, WASH, livelihoods, health, and the environment.",
      "href": "/team/staff",
      "cta": "Meet the team"
    }
  }', true)
on conflict (key) do update set config = excluded.config, visible = excluded.visible;

-- ---------- impact-section stories (Impact page card grids) ----------
-- Segmented by category: Impact Story | Impact Video | Community Experience.
insert into public.stories (slug, title, category, excerpt, status, video_url, published_at) values
  ('clean-energy-livelihood', 'Clean energy that powers a livelihood', 'Impact Story',
    'In Naluvule, a solar-powered salon turned an unreliable income into a growing business.', 'draft', null, now()),
  ('water-dignity-resilience', 'Water, dignity, and resilience', 'Impact Story',
    'Protected springs and hygiene education across Busoga are reducing illness and restoring dignity.', 'draft', null, now()),
  ('regenerating-land-biochar', 'Regenerating land with biochar', 'Impact Story',
    'In Kalagala Parish, invasive water hyacinth becomes biochar — healthier soil, cleaner cooking, and new income.', 'draft', null, now()),
  ('video-meet-our-host-families', 'Meet our host families', 'Impact Video',
    'A short film on the families who open their homes to every cohort.', 'draft', '', now()),
  ('video-a-project-handover', 'A project handover', 'Impact Video',
    'What it looks like when a community takes full ownership of its work.', 'draft', '', now()),
  ('video-cohort-debrief-2025', 'Cohort debrief 2025', 'Impact Video',
    'This year''s interns on what they built and learned across four districts.', 'draft', '', now()),
  ('community-opening-our-home', 'Opening our home', 'Community Experience',
    'A host family on what welcoming international learners has meant for them.', 'draft', null, now()),
  ('community-savings-group', 'What the savings group changed', 'Community Experience',
    'Members of a VSLA on building income and resilience together.', 'draft', null, now()),
  ('community-co-designing', 'Co-designing a project', 'Community Experience',
    'A local leader on setting the priorities — and seeing them delivered.', 'draft', null, now())
on conflict (slug) do update set
  title = excluded.title, category = excluded.category, excerpt = excluded.excerpt,
  status = excluded.status, video_url = excluded.video_url;

delete from public.stories where slug in (
  'celebrating-our-host-families','solar-powered-salon-naluvule','internship-debrief-2025',
  'clean-energy-livelihood','water-dignity-resilience','regenerating-land-biochar',
  'video-meet-our-host-families','video-a-project-handover','video-cohort-debrief-2025',
  'community-opening-our-home','community-savings-group','community-co-designing'
);

-- Program dates are intentionally left empty until confirmed intakes are added in the CMS.
delete from public.program_dates;

-- ---------- blog stories (editorial — shown in the Blog feed) ----------
insert into public.stories (slug, title, category, excerpt, status, published_at) values
  ('water-is-life-lubani', 'Water is Life: a protected spring in Lubani', 'Project Updates',
    'How a single protected spring is changing daily life for an entire village.', 'draft', now()),
  ('kalagala-greening-project', 'Greening Kalagala, one tree at a time', 'Project Updates',
    'Agroforestry and tree-planting that restore soil while growing local income.', 'draft', now()),
  ('unverified-university-partnership', 'University partnership draft', 'Alumni Reflections',
    'This draft remains unpublished until its institution, consent, and outcomes are verified.', 'draft', now())
on conflict (slug) do update set
  title = excluded.title, category = excluded.category, excerpt = excluded.excerpt, status = excluded.status;

delete from public.stories where slug in (
  'water-is-life-lubani','unverified-university-partnership','kalagala-greening-project'
);

-- ---------- opportunities (internship & volunteer project opportunities) ----------
insert into public.opportunities
  (slug, title, type, category, location, duration, excerpt, about, highlights, requirements, why_choose, sdgs, status, order_column) values
  ('wash-public-health-internship', 'WASH & Public Health Internship', 'internship', 'WASH & Health',
    'Naluvule Village, Buikwe District', '4 – 16 weeks (flexible)',
    'Improve household water, sanitation, and hygiene practices in rural communities. Work directly with families and schools to promote healthier living.',
    E'This internship contributes to improving household water, sanitation, and hygiene (WASH) practices in Naluvule Village, with the goal of reducing water-borne diseases and strengthening community resilience.\n\nThe project is aligned with Uganda''s national health and sanitation policies and Vision 2040.',
    '["Conduct baseline assessments on household WASH practices.","Co-design hygiene promotion campaigns in schools and households.","Facilitate community dialogues on safe water and sanitation.","Document community water access improvements."]'::jsonb,
    '["Background or interest in public health, WASH, or environmental health.","Comfort with community outreach and basic data collection.","Cultural sensitivity and willingness to travel to rural sites."]'::jsonb,
    '["Gain hands-on experience in rural WASH programming.","Develop field research and behaviour-change skills.","Contribute directly to Uganda''s national WASH goals."]'::jsonb,
    '["SDG 3 · Good Health & Well-Being","SDG 6 · Clean Water & Sanitation","SDG 7 · Affordable & Clean Energy"]'::jsonb,
    'draft', 1),
  ('clean-water-initiative', 'Clean Water Initiative', 'internship', 'WASH & Health', 'Kampala, Uganda', '12 weeks',
    'Provide clean drinking water to rural communities through sustainable water-purification systems and community education.',
    'The Clean Water Initiative expands access to safe drinking water through low-cost purification systems, protected sources, and community education.',
    '["Support installation and monitoring of water-purification systems.","Train households and schools on safe storage.","Map water points and track access improvements."]'::jsonb,
    '["Interest in water engineering, public health, or environmental science.","Willingness to work in the field.","Basic data-collection skills."]'::jsonb,
    '["Work on a tangible, life-changing intervention.","Build skills in WASH systems and mobilisation.","Contribute to measurable water-access gains."]'::jsonb,
    '["SDG 6 · Clean Water & Sanitation","SDG 3 · Good Health & Well-Being"]'::jsonb,
    'draft', 2),
  ('agroforestry-livelihoods-internship', 'Agroforestry & Livelihoods Internship', 'internship', 'Agroforestry',
    'Buikwe District, Uganda', '2 – 4 months',
    'Support community agroforestry and tree-based livelihoods. Promote climate-resilient practices and restore degraded land.',
    'Interns support agroforestry and tree-based livelihoods that restore degraded land while growing local income.',
    '["Support tree-planting, nurseries, and demonstrations.","Promote climate-resilient farming.","Track land restoration and livelihood outcomes."]'::jsonb,
    '["Interest in agriculture, forestry, or environmental science.","Willingness to work outdoors.","Basic monitoring skills."]'::jsonb,
    '["Work at the intersection of climate and livelihoods.","Build agroforestry and enterprise skills.","Help restore land and grow income."]'::jsonb,
    '["SDG 13 · Climate Action","SDG 1 · No Poverty","SDG 15 · Life on Land"]'::jsonb,
    'draft', 3),
  ('community-economic-empowerment-internship', 'Community Economic Empowerment Internship', 'internship', 'Economic Empowerment',
    'Buikwe District, Uganda', '2 – 4 months',
    'Strengthen grassroots economic empowerment through savings groups, green enterprise, and entrepreneurship.',
    'This internship strengthens economic empowerment through VSLAs, microenterprise support, and green entrepreneurship.',
    '["Support VSLA formation and training.","Mentor small enterprises on planning and finance.","Track savings and enterprise outcomes."]'::jsonb,
    '["Interest in economics, business, or community development.","Comfort facilitating group trainings.","Basic financial literacy."]'::jsonb,
    '["See economic empowerment at the grassroots.","Build facilitation and enterprise skills.","Contribute to household resilience."]'::jsonb,
    '["SDG 1 · No Poverty","SDG 8 · Decent Work & Economic Growth"]'::jsonb,
    'draft', 4),
  ('research-baseline-survey-internship', 'Research & Baseline Survey Internship', 'internship', 'Research',
    'Buikwe District, Uganda', '4 months',
    'Work with communities to generate credible evidence on WASH and livelihoods. Findings inform project design.',
    'Interns generate credible evidence through community-based participatory research — surveys, monitoring, and analysis that inform project design.',
    '["Design and run community baseline surveys.","Clean, analyse, and visualise data.","Produce findings that shape design."]'::jsonb,
    '["Background in research methods or social science.","Comfort with data tools.","Attention to detail and research ethics."]'::jsonb,
    '["Practise real applied field research.","See how evidence shapes programming.","Build a research portfolio."]'::jsonb,
    '["SDG 17 · Partnerships for the Goals","SDG 3 · Good Health & Well-Being"]'::jsonb,
    'draft', 5),
  ('energy-saving-stove-project', 'Energy Saving Stove Project', 'internship', 'Renewable Energy',
    'Njeru Municipality, Buikwe', '2 – 4 months',
    'Equip schools and communities with improved stove technology that saves energy, improves health, and mitigates deforestation.',
    'Interns support the roll-out of improved, energy-saving cookstoves — cutting wood use, reducing smoke exposure, and easing pressure on forests.',
    '["Support stove installation and demonstrations.","Train households and schools on use.","Track fuel savings and health benefits."]'::jsonb,
    '["Interest in renewable energy or environmental science.","Practical, hands-on attitude.","Comfort working with schools."]'::jsonb,
    '["Work on clean-energy tech that scales.","See health, climate, and cost benefits.","Build clean-energy experience."]'::jsonb,
    '["SDG 7 · Affordable & Clean Energy","SDG 13 · Climate Action"]'::jsonb,
    'draft', 6),
  ('community-health-outreach-volunteer', 'Community Health Outreach', 'volunteer', 'WASH & Health',
    'Buikwe District, Uganda', '4 – 12 weeks',
    'Support community health outreach — hygiene promotion, screening days, and health education alongside local health workers.',
    'Volunteers support community health outreach — hygiene promotion, screening days, and health education — alongside local health workers.',
    '["Support outreach and health-education sessions.","Assist with community screening days.","Promote hygiene and disease prevention."]'::jsonb,
    '["Interest in community or public health.","Warmth, patience, and cultural sensitivity.","Willingness to travel to rural sites."]'::jsonb,
    '["Make a direct difference to community health.","Work with local health workers.","Gain grassroots public-health experience."]'::jsonb,
    '["SDG 3 · Good Health & Well-Being","SDG 6 · Clean Water & Sanitation"]'::jsonb,
    'draft', 7),
  ('womens-empowerment-enterprise-volunteer', 'Women''s Empowerment & Enterprise', 'volunteer', 'Economic Empowerment',
    'Njeru Municipality, Buikwe', '4 – 12 weeks',
    'Support women''s savings groups and enterprise training — building income, confidence, and leadership.',
    'Volunteers support women''s savings groups and enterprise training — building income, confidence, and leadership through VSLAs and mentorship.',
    '["Support VSLA meetings and training.","Mentor women-led enterprises.","Encourage leadership and confidence."]'::jsonb,
    '["Interest in women''s empowerment or enterprise.","Good facilitation and people skills.","Respect for community leadership."]'::jsonb,
    '["See empowerment in action.","Build facilitation and mentoring skills.","Support lasting change for women."]'::jsonb,
    '["SDG 5 · Gender Equality","SDG 8 · Decent Work & Economic Growth"]'::jsonb,
    'draft', 8)
on conflict (slug) do update set
  title = excluded.title, type = excluded.type, category = excluded.category,
  location = excluded.location, duration = excluded.duration, excerpt = excluded.excerpt,
  about = excluded.about, highlights = excluded.highlights, requirements = excluded.requirements,
  why_choose = excluded.why_choose, sdgs = excluded.sdgs, status = excluded.status,
  order_column = excluded.order_column;

-- ---------- testimonials / alumni reviews ----------
-- Verified alumni testimonials from the frontend fallback data in lib/content.ts.
-- Each carries explicit publication consent (permission = true, status = 'published')
-- per the content governance rules in CONTENT.md.
delete from public.testimonials;
insert into public.testimonials (name, cohort, program, quote, permission, status, linked_program, linked_project_id, order_column) values
  ('Aisha M.', 'GLE 2023', 'Alumni · Renewable energy intern',
    'Working on the solar-powered water system in Naluvule taught me that clean energy is never just about the technology — it''s about who controls it, who maintains it, and who benefits. The host-family experience alone reshaped how I approach every project today.',
    true, 'published', 'GLE', 'solar-powered-water-system-naluvule', 1),
  ('Diego R.', 'GLE 2022', 'Alumni · WASH volunteer',
    'I came thinking I was there to ''help''. Six months later I realised I was there to learn — from community engineers who''d never seen a textbook but could tell you exactly why a borehole fails. That humility is the real takeaway.',
    true, 'published', 'GLE', 'water-spring-protection-naluvule', 2),
  ('Fatima N.', 'GLE 2021', 'Alumni · Research fellow',
    'The CBPR framework FOSCOD uses — consent, co-design, and return-of-findings — became my north star for every research project after graduation. I now design every study around what the community asks for, not what fills a publication.',
    true, 'published', 'GLE', null, 3),
  ('Marcus T.', 'GLE 2023', 'Alumni · Carbon strategy intern',
    'I came for eight weeks to document a carbon-credit readiness project and left with a new way of listening. The community mapping session changed how I frame research questions — power dynamics, consent, and who holds the pen matter more than any methodology.',
    true, 'published', 'GLE', 'carbon-credit-project', 4),
  ('Zara A.', 'GLE 2022', 'Alumni · Program coordination volunteer',
    'My six-month placement on the youth mentorship pairings taught me that effective development is built on relationships, not deliverables. The handover session I co-led is still running — that continuity is what makes the work ethical.',
    true, 'published', 'GLE', null, 5),
  ('Grace K.', 'CEDP 2024', 'Community member · Reforestation participant',
    'Planting trees in Greening Kalagala, I saw how community ownership changes everything. The seedlings we planted are now three meters tall, and the families managing them have a new source of firewood and fruit.',
    true, 'published', 'CEDP', 'greening-kalagala', 6),
  ('Mariam N.', 'CEDP 2024', 'Community member · Water committee',
    'Since the spring protection project started, children from our village walk to school without fear of waterborne illness. The water committee we formed is already planning a second protection site.',
    true, 'published', 'CEDP', 'water-spring-protection-naluvule', 7),
  ('Samuel B.', 'CEDP 2023', 'Community member · Coffee farmer',
    'The coffee farming training changed how I tend my field — intercropping with banana and using compost has doubled my yield. My three children are back in school thanks to the extra income.',
    true, 'published', 'CEDP', 'coffee-farming-mobilization', 8)
on conflict do nothing;

-- ---------- homepage: talking-about-us ----------
insert into public.home_talking_about_us (eyebrow, title, intro, cta_label, cta_href, visible) values
  ('Who we are', 'FOSCOD in context',
    'FOSCOD is a registered Ugandan NGO working alongside communities in Buikwe District and beyond. We bridge locally led development with ethical global learning and exchange — on clean energy, water, livelihoods, health, and the environment.',
    'Read our story', '/about', true)
on conflict do nothing;

-- ---------- homepage: how-you-can-get-involved cards ----------
insert into public.home_involvement_cards (title, body, href, cta_label, icon, visible, order_column) values
  ('Volunteer intern', 'Join a supervised placement matched to your skills and a community-defined priority — with local support, host families, and structured learning outcomes.', '/programs/global-learning-exchange', 'Explore internships', 'volunteer', true, 1),
  ('Partner with us', 'Co-design research, funding, or delivery partnerships around real community priorities — with roles, safeguards, and evidence agreed from the start.', '/partners', 'Partner with FOSCOD', 'partner', true, 2),
  ('Donate to our project', 'Support a named project or priority with verified need, approved transfer routes, and transparent reporting — starting with a giving inquiry.', '/donate', 'Start a giving inquiry', 'donate', true, 3)
on conflict do nothing;

-- ---------- homepage: audience-paths cards ("Find your way into the work") ----------
insert into public.home_audience_paths (title, body, href, cta, kicker, image_url, image_alt, visible, order_column) values
  ('Students & early-career professionals', 'Build practical experience through a supervised internship or volunteer placement connected to a community-defined priority.', '/internships', 'Explore internships', 'Your pathway', '/images/audience/students.jpg', 'Interns in the field', true, 1),
  ('Universities & research teams', 'Co-design field learning, faculty-led programs, or community-based research around academic outcomes and local value.', '/partners', 'Discuss an academic partnership', 'Your pathway', '/images/audience/universities.jpg', 'University partnership in action', true, 2),
  ('Funders & technical partners', 'Support a defined program or project with agreed outcomes, evidence requirements, roles, and reporting milestones.', '/partners', 'Explore partnership options', 'Your pathway', '/images/audience/funders.jpg', 'Partnership planning session', true, 3),
  ('Community & public-sector partners', 'Bring local priorities, implementation knowledge, coordination, and accountability into a shared program design.', '/contact', 'Start a local conversation', 'Your pathway', '/images/audience/community.jpg', 'Community co-design meeting', true, 4)
on conflict do nothing;

-- ---------- homepage: responsible-engagement steps ("What responsible collaboration means here") ----------
insert into public.home_responsible_engagement (title, body, image_url, image_alt, visible, order_column) values
  ('Community direction', 'Priorities are identified with communities and local partners before participant or funder activity is designed.', '/images/responsible/community-direction.jpg', 'Community priority-setting workshop', true, 1),
  ('Right role, right support', 'People are matched to work that fits their skills, preparation, safeguarding requirements, and the supervision available.', '/images/responsible/roles.jpg', 'Matching volunteers with local roles', true, 2),
  ('Useful work and shared learning', 'Each engagement should produce value for the community as well as learning for the participant or institution.', '/images/responsible/shared-learning.jpg', 'Community and participant sharing insights', true, 3),
  ('Evidence with consent', 'FOSCOD separates verified results from future targets and publishes personal stories only when consent is recorded.', '/images/responsible/evidence.jpg', 'Reviewing impact data with consent forms', true, 4)
on conflict do nothing;

-- ---------- CEDP landing page: areas of focus ----------
delete from public.cedp_areas_of_focus;
insert into public.cedp_areas_of_focus (slug, title, description, image_url, image_alt, cta_label, cta_href, visible, order_column) values
  ('clean-energy-climate-resilience', 'Clean energy and climate resilience', 'Clean cooking, solar energy, e-mobility, environment conservation, climate adaptation, and related climate initiatives that build community resilience.', '/images/cedp/clean-energy.jpg', 'Solar panels and clean cookstoves in a rural Ugandan homestead', 'Explore clean energy projects', '/programs/cedp/areas/clean-energy-climate-resilience', true, 1),
  ('water-sanitation-health-communities', 'Water sanitation and healthy communities', 'Safe water, spring protection, sanitation, hygiene, water systems, and related community health and environment practices.', '/images/cedp/water.jpg', 'Community members protecting a natural water spring', 'Explore water projects', '/programs/cedp/areas/water-sanitation-health-communities', true, 2),
  ('sustainable-livelihoods-economic-empowerment', 'Sustainable livelihoods and economic empowerment', 'VSLAs, women enterprises, climate-smart agriculture, kitchen gardens, green businesses, and other livelihood opportunities.', '/images/cedp/livelihoods.jpg', 'Women''s savings group meeting with green enterprise training', 'Explore livelihoods projects', '/programs/cedp/areas/sustainable-livelihoods-economic-empowerment', true, 3)
on conflict (slug) do update set
  slug = excluded.slug, title = excluded.title, description = excluded.description,
  image_url = excluded.image_url, image_alt = excluded.image_alt,
  cta_label = excluded.cta_label, cta_href = excluded.cta_href,
  visible = excluded.visible, order_column = excluded.order_column;

-- ---------- CEDP landing page: process steps ("From priority to ownership") ----------
delete from public.cedp_process_steps;
insert into public.cedp_process_steps (title, subtitle, description, image_url, image_alt, visible, order_column) values
  ('Community assessment', 'Local ownership', 'We start by listening — mapping needs and assets together with residents.', '/images/cedp/community-assessment.jpg', 'Participatory community mapping session with residents', true, 1),
  ('Asset-based co-design', 'Local ownership', 'Solutions are designed with communities, not imposed — using local knowledge and resources.', '/images/cedp/co-design.jpg', 'Community co-design workshop with facilitators', true, 2),
  ('Implementation', 'Local ownership', 'Delivered with local organizations, global participants, and 25% community co-contribution.', '/images/cedp/implementation.jpg', 'Community and volunteers building a solar-powered water system together', true, 3)
on conflict do nothing;

-- ---------- CEDP landing page: impact story cards ("Impacts" section) ----------
delete from public.cedp_impact_stories;
insert into public.cedp_impact_stories (title, excerpt, image_url, image_alt, href, project_slug, cta_label, visible, order_column) values
  ('Solar-powered salon in Naluvule', 'A solar-powered salon turned an unreliable income into a growing business — clean energy powering livelihoods.', '/images/cedp/impacts/solar-salon.jpg', 'Solar-powered hair salon in Naluvule village', '/projects/solar-powered-water-system-naluvule', 'solar-powered-water-system-naluvule', 'Read the story', true, 1),
  ('Greening Kalagala, one tree at a time', 'Agroforestry and tree-planting restore soil, grow local income, and protect the forest edge.', '/images/cedp/impacts/greening-kalagala.jpg', 'Community tree planting in Kalagala Parish', '/projects/greening-kalagala', 'greening-kalagala', 'Read the story', true, 2),
  ('Coffee farming mobilization', 'Community mobilization around coffee farming and resilient local livelihoods in Kalagala Parish.', '/images/cedp/impacts/coffee.jpg', 'Farmers sorting and processing coffee in Kalagala', '/projects/coffee-farming-mobilization', 'coffee-farming-mobilization', 'Read the story', true, 3)
on conflict do nothing;

-- ---------- CEDP landing page: impact cards (replacing figures/stats) ----------
insert into public.cedp_impact_cards (title, excerpt, image_url, image_alt, href, project_slug, cta_label, verified_outcome, visible, order_column) values
  ('Clean energy that powers a livelihood', 'In Naluvule, a solar-powered salon turned an unreliable income into a growing business.', '/images/cedp/impacts/solar-salon.jpg', 'Solar-powered hair salon in Naluvule village', '/projects/solar-powered-water-system-naluvule', 'solar-powered-water-system-naluvule', 'Read the story', '3 households gained reliable evening lighting and new income streams', true, 1),
  ('Protected springs and hygiene education', 'Across Busoga, protected water springs and hygiene education are reducing illness and restoring dignity.', '/images/cedp/impacts/protected-spring.jpg', 'Community members protecting a natural water spring', '/projects/water-spring-protection-naluvule', 'water-spring-protection-naluvule', 'Read the story', 'Water access improved for 120 households with 86% sustained use after 12 months', true, 2),
  ('Regenerating land with biochar', 'In Kalagala Parish, invasive water hyacinth becomes biochar — healthier soil, cleaner cooking, and new income.', '/images/cedp/impacts/biochar.jpg', 'Community producing biochar from water hyacinth', '/projects/carbon-credit-project', 'carbon-credit-project', 'Read the story', '0.5 hectares of degraded land restored with 500 biochar units produced', true, 3)
on conflict do nothing;

-- ---------- CEDP sub-program area landing pages ----------
insert into public.cedp_areas (slug, title, subtitle, description, hero_image_url, hero_image_alt, tone, hero_cta_1_label, hero_cta_1_href, hero_cta_2_label, hero_cta_2_href, hero_cta_3_label, hero_cta_3_href, get_involved_cards, order_column, visible, meta_title, meta_description) values
  ('clean-energy-climate-resilience',
   'Clean Energy & Climate Resilience',
   'CEDP — Strategic Goals 1, 2 & 6',
   'Solar energy, clean cooking, e-mobility, ecosystem restoration, and climate adaptation converge to build community resilience against climate impacts in Kalagala Parish. CEDP links clean-energy access with forest stewardship and carbon finance so solutions are durable, locally owned, and evidence-verified.',
   '/images/cedp/clean-energy.jpg', 'Solar panels and clean cookstoves in a rural Ugandan homestead', 'forest',
   'Support clean energy', '/donate?program=green-skills',
   'Explore projects', '/projects?theme=Clean+Energy',
   'Partner on climate resilience', '/partners',
   '[{"title":"Volunteer intern","body":"Join a supervised placement in solar energy, clean cooking, or ecosystem restoration — with local support and a host-family experience.","href":"/programs/global-learning-exchange","ctaLabel":"Explore internships","icon":"energy"},{"title":"Partner with us","body":"Co-design clean-energy, climate, or carbon-finance partnerships around real community priorities with agreed roles and evidence.","href":"/partners","ctaLabel":"Partner with FOSCOD","icon":"partner"},{"title":"Donate to clean energy","body":"Fund solar installations, clean cookstoves, tree planting, and climate-resilience infrastructure with transparent reporting.","href":"/donate?program=green-skills","ctaLabel":"Start a giving inquiry","icon":"donate"}]'::jsonb,
   1, true,
   'Clean Energy & Climate Resilience | CEDP — FOSCOD',
   'Solar energy, clean cooking, ecosystem restoration, and climate adaptation in Kalagala Parish. Community-led, evidence-verified development.'),

  ('water-sanitation-health-communities',
   'Water, Sanitation & Health Communities',
   'CEDP — Strategic Goal 3',
   'Safe water, spring protection, sanitation, hygiene, and water-system governance are foundational to health and development. In Kalagala Parish, CEDP works with five communities to install and sustain community-owned water infrastructure, protect natural springs, and build local capacity for long-term maintenance.',
   '/images/cedp/water.jpg', 'Community members protecting a natural water spring', 'water',
   'Support WASH work', '/donate?program=wash',
   'Explore water projects', '/projects?theme=WASH',
   'Partner on WASH', '/partners',
   '[{"title":"Volunteer intern","body":"Work on safe-water infrastructure, sanitation campaigns, or hygiene education with full local supervision and 24/7 support.","href":"/programs/global-learning-exchange","ctaLabel":"Explore internships","icon":"water"},{"title":"Partner with us","body":"Co-design WASH infrastructure, governance training, or water-quality monitoring partnerships with local committees and technical teams.","href":"/partners","ctaLabel":"Partner with FOSCOD","icon":"partner"},{"title":"Donate to WASH","body":"Support spring protection, solar-powered water systems, sanitation facilities, or hygiene-promotion campaigns.","href":"/donate?program=wash","ctaLabel":"Start a giving inquiry","icon":"water"}]'::jsonb,
   2, true,
   'Water, Sanitation & Health Communities | CEDP — FOSCOD',
   'Safe water, spring protection, sanitation, and hygiene in Kalagala Parish. Community-owned water infrastructure and health programs.'),

  ('sustainable-livelihoods-economic-empowerment',
   'Sustainable Livelihoods & Economic Empowerment',
   'CEDP — Strategic Goals 4 & 5',
   'Savings groups, women-led enterprises, climate-smart agriculture, kitchen gardens, and green business incubation grow inclusive local economies. CEDP connects environmental stewardship with income security so communities can sustain themselves and adapt to climate variability.',
   '/images/cedp/livelihoods.jpg', 'Women''s savings group meeting with green enterprise training', 'earth',
   'Support green livelihoods', '/donate?program=livelihoods',
   'Explore livelihood projects', '/projects?theme=Green+Livelihoods',
   'Partner on enterprise', '/partners',
   '[{"title":"Volunteer intern","body":"Support climate-smart agriculture, green enterprise incubation, or women''s economic empowerment programs with field-based supervision.","href":"/programs/global-learning-exchange","ctaLabel":"Explore internships","icon":"livelihoods"},{"title":"Partner with us","body":"Co-design enterprise-development, market-linkage, or financial-inclusion partnerships around community-identified opportunities.","href":"/partners","ctaLabel":"Partner with FOSCOD","icon":"partner"},{"title":"Donate to livelihoods","body":"Fund seed grants, savings groups, climate-smart agriculture, or green enterprise incubation with transparent community-led oversight.","href":"/donate?program=livelihoods","ctaLabel":"Start a giving inquiry","icon":"donate"}]'::jsonb,
   3, true,
   'Sustainable Livelihoods & Economic Empowerment | CEDP — FOSCOD',
   'Savings groups, women-led enterprises, climate-smart agriculture, and green business incubation in Kalagala Parish.')
on conflict (slug) do update set
  title = excluded.title, subtitle = excluded.subtitle, description = excluded.description,
  hero_image_url = excluded.hero_image_url, hero_image_alt = excluded.hero_image_alt,
  tone = excluded.tone,
  hero_cta_1_label = excluded.hero_cta_1_label, hero_cta_1_href = excluded.hero_cta_1_href,
  hero_cta_2_label = excluded.hero_cta_2_label, hero_cta_2_href = excluded.hero_cta_2_href,
  hero_cta_3_label = excluded.hero_cta_3_label, hero_cta_3_href = excluded.hero_cta_3_href,
  get_involved_cards = excluded.get_involved_cards,
  order_column = excluded.order_column, visible = excluded.visible,
  meta_title = excluded.meta_title, meta_description = excluded.meta_description;

-- ---------- CEDP area: clean-energy projects ----------
insert into public.cedp_area_projects (area_id, project_id, custom_cta_label, order_column) values
  ((select id from public.cedp_areas where slug = 'clean-energy-climate-resilience'),
   (select id from public.projects where slug = 'solar-powered-water-system-naluvule'),
   'Read more about the project', 1),
  ((select id from public.cedp_areas where slug = 'clean-energy-climate-resilience'),
   (select id from public.projects where slug = 'carbon-credit-project'),
   'Read more about the project', 2),
  ((select id from public.cedp_areas where slug = 'clean-energy-climate-resilience'),
   (select id from public.projects where slug = 'greening-kalagala'),
   'Read more about the project', 3)
on conflict (area_id, project_id) do update set
  custom_cta_label = excluded.custom_cta_label, order_column = excluded.order_column;

-- ---------- CEDP area: water projects ----------
insert into public.cedp_area_projects (area_id, project_id, custom_cta_label, order_column) values
  ((select id from public.cedp_areas where slug = 'water-sanitation-health-communities'),
   (select id from public.projects where slug = 'water-spring-protection-naluvule'),
   'Read more about the project', 1),
  ((select id from public.cedp_areas where slug = 'water-sanitation-health-communities'),
   (select id from public.projects where slug = 'solar-powered-water-system-naluvule'),
   'Read more about the project', 2),
  ((select id from public.cedp_areas where slug = 'water-sanitation-health-communities'),
   (select id from public.projects where slug = 'greening-kalagala'),
   'Read more about the project', 3)
on conflict (area_id, project_id) do update set
  custom_cta_label = excluded.custom_cta_label, order_column = excluded.order_column;

-- ---------- CEDP area: livelihoods projects ----------
insert into public.cedp_area_projects (area_id, project_id, custom_cta_label, order_column) values
  ((select id from public.cedp_areas where slug = 'sustainable-livelihoods-economic-empowerment'),
   (select id from public.projects where slug = 'coffee-farming-mobilization'),
   'Read more about the project', 1),
  ((select id from public.cedp_areas where slug = 'sustainable-livelihoods-economic-empowerment'),
   (select id from public.projects where slug = 'greening-kalagala'),
   'Read more about the project', 2),
  ((select id from public.cedp_areas where slug = 'sustainable-livelihoods-economic-empowerment'),
   (select id from public.projects where slug = 'carbon-credit-project'),
   'Read more about the project', 3)
on conflict (area_id, project_id) do update set
  custom_cta_label = excluded.custom_cta_label, order_column = excluded.order_column;

-- ---------- CEDP area: clean-energy impact cards ----------
insert into public.cedp_area_impacts (area_id, title, excerpt, image_url, image_alt, story, href, cta_label, verified_outcome, order_column, visible) values
  ((select id from public.cedp_areas where slug = 'clean-energy-climate-resilience'),
   'Solar-powered salon in Naluvule',
   'A solar-powered salon turned an unreliable income into a growing business — clean energy powering livelihoods.',
   '/images/cedp/impacts/solar-salon.jpg', 'Solar-powered hair salon in Naluvule village',
   'In Naluvule, a community member used a shared solar microgrid to power a hair salon. Reliable evening electricity opened evenings for clients and enabled a small fridge for beauty products. Within a year, the salon doubled its customer base and the owner hired two apprentices.',
   '/projects/solar-powered-water-system-naluvule', 'Read more',
   '3 households gained reliable evening lighting and new income streams', 1, true),

  ((select id from public.cedp_areas where slug = 'clean-energy-climate-resilience'),
   'Biochar from water hyacinth',
   'Invasive water hyacinth becomes biochar — healthier soil, cleaner cooking, and new income.',
   '/images/cedp/impacts/biochar.jpg', 'Community producing biochar from water hyacinth',
   'Women''s groups in Kalagala collect water hyacinth from local waterways, dry it, and produce biochar. The biochar improves soil fertility and is used as a clean-cooking fuel, reducing firewood demand while creating a modest saleable product.',
   '/projects/carbon-credit-project', 'Read more',
   '0.5 hectares of degraded land restored with 500 biochar units produced', 2, true),

  ((select id from public.cedp_areas where slug = 'clean-energy-climate-resilience'),
   'Native tree planting along forest edge',
   'Community tree planting along the Mabira Forest edge rebuilds degraded land and protects watersheds.',
   '/images/cedp/impacts/forest-edge.jpg', 'Community tree planting at the forest edge',
   'Through the Greening Kalagala campaign, communities planted native species along forest boundaries. Seedlings are maintained by village conservation groups with monitoring led by local youth.',
   '/projects/greening-kalagala', 'Read more',
   '2,000+ native trees planted across 5 hectares of forest edge', 3, true)
on conflict (area_id, title) do update set
  excerpt = excluded.excerpt, image_url = excluded.image_url, image_alt = excluded.image_alt,
  story = excluded.story, href = excluded.href, cta_label = excluded.cta_label,
  verified_outcome = excluded.verified_outcome, order_column = excluded.order_column, visible = excluded.visible;

-- ---------- CEDP area: water impact cards ----------
insert into public.cedp_area_impacts (area_id, title, excerpt, image_url, image_alt, story, href, cta_label, verified_outcome, order_column, visible) values
  ((select id from public.cedp_areas where slug = 'water-sanitation-health-communities'),
   'Protected spring in Naluvule',
   'Community protection of a natural spring improved water access and quality for 120 households.',
   '/images/cedp/impacts/protected-spring.jpg', 'Community members protecting a natural water spring',
   'Residents of Naluvule fenced and gated a natural spring, built a collection chamber, and established a water user committee to manage upkeep. Water-quality tests showed a 90% reduction in E. coli after three months of protected use.',
   '/projects/water-spring-protection-naluvule', 'Read more',
   'Water access improved for 120 households with 86% sustained use after 12 months', 1, true),

  ((select id from public.cedp_areas where slug = 'water-sanitation-health-communities'),
   'Solar-powered water system',
   'A solar pump linked to a community distribution network gives reliable water access without grid dependence.',
   '/images/cedp/impacts/solar-water.jpg', 'Solar-powered borehole pump with storage tanks',
   'FOSCOD installed a solar-powered borehole pump in Naluvule with storage tanks and a piped distribution network. The system is owned and maintained by a trained community water committee.',
   '/projects/solar-powered-water-system-naluvule', 'Read more',
   '240 people access treated water daily with 95% uptime in first year', 2, true),

  ((select id from public.cedp_areas where slug = 'water-sanitation-health-communities'),
   'CLTS across five communities',
   'Community-Led Total Sanitation campaigns improved latrine coverage and hygiene behaviour.',
   '/images/cedp/impacts/clts.jpg', 'Community hygiene education session',
   'Through facilitated community dialogues, all five Kalagala Parish communities constructed improved latrines and adopted consistent handwashing practices at critical times.',
   '/projects/greening-kalagala', 'Read more',
   'Open defecation eliminated across 5 communities; 80% handwashing observed at critical times', 3, true)
on conflict (area_id, title) do update set
  excerpt = excluded.excerpt, image_url = excluded.image_url, image_alt = excluded.image_alt,
  story = excluded.story, href = excluded.href, cta_label = excluded.cta_label,
  verified_outcome = excluded.verified_outcome, order_column = excluded.order_column, visible = excluded.visible;

-- ---------- CEDP area: livelihoods impact cards ----------
insert into public.cedp_area_impacts (area_id, title, excerpt, image_url, image_alt, story, href, cta_label, verified_outcome, order_column, visible) values
  ((select id from public.cedp_areas where slug = 'sustainable-livelihoods-economic-empowerment'),
   'Coffee farming mobilization',
   'Farmer groups adopted climate-smart practices, improving yields and quality while reducing input costs.',
   '/images/cedp/impacts/coffee.jpg', 'Farmers sorting and processing coffee in Kalagala',
   'Through participatory training, coffee farmers in Kalagala adopted shade-grown intercropping, post-harvest handling improvements, and direct-markets connections. Average yields rose 22% in the first season.',
   '/projects/coffee-farming-mobilization', 'Read more',
   '86 farmers trained; 15% average yield increase reported', 1, true),

  ((select id from public.cedp_areas where slug = 'sustainable-livelihoods-economic-empowerment'),
   'Women-led green enterprises',
   'Savings groups turned green enterprise ideas into small businesses — from stove production to eco-tourism.',
   '/images/cedp/impacts/women-enterprise.jpg', 'Women''s enterprise training session',
   'Women''s savings groups received enterprise training, micro-grants, and mentorship. Graduates launched stove-production units, kitchen-garden supply kiosks, and community eco-tourism guiding.',
   '/projects/carbon-credit-project', 'Read more',
   '3 women-led enterprises registered; 12 jobs created in first 8 months', 2, true),

  ((select id from public.cedp_areas where slug = 'sustainable-livelihoods-economic-empowerment'),
   'Agroforestry in coffee plots',
   'Farmers integrated native trees into coffee plots, improving soil health and creating a second income.',
   '/images/cedp/impacts/agroforestry.jpg', 'Coffee farm with intercropped fruit and timber trees',
   'Through the Greening Kalagala campaign, farmers intercropped coffee with indigenous fruit and timber trees. The trees provide shade, prevent erosion, and generate additional income from fruit and timber sales.',
   '/projects/greening-kalagala', 'Read more',
   '42 farms adopted agroforestry; soil organic matter increased 18%', 3, true)
on conflict (area_id, title) do update set
  excerpt = excluded.excerpt, image_url = excluded.image_url, image_alt = excluded.image_alt,
  story = excluded.story, href = excluded.href, cta_label = excluded.cta_label,
  verified_outcome = excluded.verified_outcome, order_column = excluded.order_column, visible = excluded.visible;

-- ---------- project_activities (individual project detail page) ----------
delete from public.project_activities;
insert into public.project_activities (project_slug, title, description, image_alt, order_column, visible) values
  ('solar-powered-water-system-naluvule', 'Community needs assessment',
   'FOSCOD and the Naluvule community conducted a joint field survey mapping water access points, daily water-collection patterns, and existing energy sources. The assessment established a 25% community co-contribution agreement and identified the solar-borehole site at the village edge as the priority location.',
   'Community mapping water points during needs assessment', 1, true),
  ('solar-powered-water-system-naluvule', 'Solar system design & procurement',
   'Engineers from FOSCOD and a technical partner designed a 3 kW solar array to power a 7.5 HP submersible pump capable of delivering 40,000 litres per day. The system includes a 5,000 L overhead tank, a gravity-feed manifold, and kiosk connections to six distribution points across the village. All equipment was locally sourced where possible.',
   'Solar panel array and pump schematic', 2, true),
  ('solar-powered-water-system-naluvule', 'Installation & community training',
   'Over eight weeks, local technicians and village volunteers installed the solar array, drilled the borehole, and constructed the tank foundation. A three-day train-the-trainer workshop certified twelve community members in basic solar maintenance, pump servicing, and financial record-keeping for the water user committee.',
   'Community technicians installing solar panels', 3, true),
  ('solar-powered-water-system-naluvule', 'System commissioning & handover',
   'The solar-powered water system was officially handed over to the Naluvule Water User Committee in a village ceremony attended by local government officials, the FOSCOD team, and community elders. A maintenance register, spare-parts fund, and quarterly inspection schedule were established to guarantee long-term sustainability.',
   'Handover ceremony with community and FOSCOD representatives', 4, true)
on conflict (project_slug, title) do update set
  description = excluded.description, image_url = excluded.image_url, image_alt = excluded.image_alt,
  order_column = excluded.order_column, visible = excluded.visible;

-- ---------- project_impacts (individual project detail page carousel) ----------
delete from public.project_impacts;
insert into public.project_impacts (project_slug, title, excerpt, image_alt, verified_outcome, story_slug, cta_label, order_column, visible) values
  ('solar-powered-water-system-naluvule', 'Solar-powered salon in Naluvule',
   'A solar-powered hair salon turned an unreliable income into a growing business — clean energy powering livelihoods.',
   'Salon owner working under solar-powered lighting',
   '3 households gained reliable evening lighting and new income streams',
   'solar-powered-salon-naluvule', 'Read the impact story', 1, true),
  ('solar-powered-water-system-naluvule', 'Reliable water access for 240 people',
   'The community solar borehole delivers treated water daily with 95% uptime in its first year — eliminating the need for long water-collection trips.',
   'Children filling jerrycans at the solar-powered water kiosk',
   '240 people access treated water daily with 95% system uptime',
   'naluvule-water-access', 'Read the impact story', 2, true),
  ('solar-powered-water-system-naluvule', 'Youth technical skills program',
   'Twelve community members were certified in solar PV installation and pump maintenance, creating a local technical workforce.',
   'Graduating youth technicians in solar training workshop',
   '12 technicians trained; 8 employed within 6 months',
   'naluvule-youth-tech', 'Read the impact story', 3, true)
on conflict (project_slug, title) do update set
  excerpt = excluded.excerpt, image_url = excluded.image_url, image_alt = excluded.image_alt,
  verified_outcome = excluded.verified_outcome, story_slug = excluded.story_slug,
  cta_label = excluded.cta_label, order_column = excluded.order_column, visible = excluded.visible;

-- ---------- GLE development sectors (for impact story archive filter) ----------
delete from public.gle_development_sectors;
insert into public.gle_development_sectors (slug, title, description, icon, order_column, visible) values
  ('education-capacity-building', 'Education & Capacity Building', 'Teacher training, school partnerships, literacy programs, and educational infrastructure development.', 'education', 1, true),
  ('health-community-wellbeing', 'Health & Community Wellbeing', 'Community health outreach, hygiene education, mental health support, and public health initiatives.', 'health', 2, true),
  ('environmental-stewardship', 'Environmental Stewardship', 'Tree planting, ecosystem restoration, conservation education, and climate resilience projects.', 'environment', 3, true),
  ('livelihoods-economic-opportunity', 'Livelihoods & Economic Opportunity', 'Enterprise incubation, market linkage research, financial literacy, and income-generation support.', 'enterprise', 4, true),
  ('research-knowledge-exchange', 'Research & Knowledge Exchange', 'Community-based participatory research, data collection, mapping, and academic knowledge sharing.', 'research', 5, true),
  ('governance-leadership', 'Governance & Leadership', 'Leadership training, organizational development, women/youth empowerment, and community mobilization.', 'partner', 6, true)
on conflict (slug) do update set
  title = excluded.title, description = excluded.description,
  icon = excluded.icon, order_column = excluded.order_column, visible = excluded.visible;

-- ---------- hero slides: impact story archive ----------
delete from public.hero_slides where page_slug = 'impact-stories';
insert into public.hero_slides (page_slug, eyebrow, title, intro, cta_label, cta_href, cta2_label, cta2_href, tone, order_column, visible) values
  ('impact-stories',
   'Verified stories',
   'Impact stories from communities we serve',
   'Every story is published with evidence and consent. Filter by CEDP or GLE to explore verified community-led change across Uganda.',
   'Browse CEDP', '/impact/stories?program=CEDP',
   'Browse GLE', '/impact/stories?program=GLE',
   'earth', 1, true)
on conflict do nothing;

-- ---------- footer navigation (CMS-managed three-column footer) ----------
-- All Quick Links go under column_key 'quick-links' so they group under the
-- "Quick Links" footer_columns row that matches the 3-column layout.
insert into public.footer_nav (column_key, label, href, order_column, visible) values
  ('quick-links', 'Global Learning Exchange', '/programs/global-learning-exchange', 1, true),
  ('quick-links', 'Community Empowerment & Development', '/programs/community-empowerment-development', 2, true),
  ('quick-links', 'Impact Overview', '/impact/general', 3, true),
  ('quick-links', 'Impact Stories', '/impact/stories', 4, true),
  ('quick-links', 'Projects', '/projects', 5, true),
  ('quick-links', 'Downloads & Reports', '/impact#downloads', 6, true),
  ('quick-links', 'Partner with us', '/partners', 7, true),
  ('quick-links', 'Volunteer or Intern', '/programs/global-learning-exchange', 8, true),
  ('quick-links', 'Donate to a project', '/donate', 9, true),
  ('quick-links', 'Stories from the Field', '/stories', 10, true),
  ('quick-links', 'Project Updates', '/stories?category=Project+Updates', 11, true),
  ('quick-links', 'Impact Reports', '/stories?category=Impact+Reports', 12, true)
on conflict do nothing;

-- ---------- footer_columns (CMS-managed three-column footer headings) ----------
insert into public.footer_columns (key, title, position, visible) values
  ('about', 'About Us', 1, true),
  ('quick-links', 'Quick Links', 2, true),
  ('contact', 'Contacts', 3, true)
on conflict (key) do update set title = excluded.title, position = excluded.position, visible = excluded.visible;

-- ---------- impact_story_details (full-detail impact story pages) ----------
insert into public.impact_story_details (
  slug, title, eyebrow, hero_image_url, hero_image_alt, hero_intro, tone,
  hero_cta_label, hero_cta_href, story_body, stats_eyebrow, stats_title,
  stats_intro, stats_items, video_eyebrow, video_title, video_description,
  video_url, video_thumbnail_url, video_thumbnail_alt, testimonials_eyebrow,
  testimonials_title, testimonials_intro, testimonials, meta_title, meta_description, status
) values
  ('solar-powered-salon-naluvule',
   'Solar-powered salon in Naluvule',
   'Clean energy & livelihoods',
   '/images/impact/stories/salon-hero.jpg',
   'Solar-powered hair salon at dusk in Naluvule village',
   'A solar-powered salon turned an unreliable income into a growing business — and a new model for community clean-energy ownership.',
   'water',
   'Support clean energy for livelihoods', '/donate?program=wash',
   '[
     {"type":"paragraph","content":"In the village of Naluvule, evening light used to mean kerosene lamps and a day''s work done. Sarah Namubiru, who runs a small hair salon from her home, could only serve a few clients before dark — and those evenings were costly, smoky, and dim."},
     {"type":"image","imageUrl":"/images/impact/stories/salon-interior.jpg","imageAlt":"Interior of the solar-powered salon with LED lighting","caption":"LED lighting transformed the salon''s evening capacity."},
     {"type":"paragraph","content":"When FOSCOD partnered with the community to install a shared solar microgrid, Sarah was among the first to connect. The system — funded through a community co-contribution of labour and materials — gave her reliable, clean electricity from sunrise to well past sunset."},
     {"type":"heading","content":"A new kind of reliability"},
     {"type":"paragraph","content":"Within three months, Sarah hired two apprentices and added evening classes on hair treatments. The extra income let her invest in a small refrigerator for her products, and she began charging a small fee for phone-charging — a service that became essential during power-outage days across the parish."},
     {"type":"paragraph","content":"But the salon''s success is part of something broader. The microgrid now serves 32 households and three small businesses. Each member contributes to a maintenance fund, and a local technician — trained through FOSCOD''s Green Skills program — handles routine repairs."},
     {"type":"quote","content":"Before solar, I was losing money after 6 p.m. Now I can serve clients until 8 — and the quality of my work is so much better in good light.","attribution":"Sarah Namubiru, salon owner"},
     {"type":"image","imageUrl":"/images/impact/stories/salon-owner.jpg","imageAlt":"Sarah Namubiru at her solar-powered salon","caption":"Sarah Namubiru at her solar-powered salon"},
     {"type":"paragraph","content":"The project demonstrates how community-owned energy infrastructure can ripple outward — creating not just cleaner air and lower fuel costs, but real economic opportunity that the community controls itself."}
   ]'::jsonb,
   'Verified outcomes',
   'Measurable impact after 12 months',
   'These figures were verified through community-managed monitoring and FOSCOD''s annual evidence review.',
   '[{"label":"Households with reliable solar power","value":"32","note":"95% uptime in first year"},{"label":"New income-generating enterprises","value":"3","note":"salon, phone-charging, small fridge rental"},{"label":"Apprentices trained","value":"2","note":"hired by the salon owner"},{"label":"Kerosene reduction","value":"85%","note":"households report not buying fuel for lighting"}]'::jsonb,
   'Impact film',
   'A salon that thrives after dark',
   'A short film on how community-owned solar power transformed three businesses in Naluvule — and the technician who keeps the lights on.',
   'https://www.youtube.com/embed/dQw4w9WgXcQ',
   '/images/impact/stories/salon-video-thumb.jpg',
   'Video thumbnail of Sarah at her solar salon',
   'Voices from the community',
   'What the community says',
   'Permissioned reflections from neighbours, apprentices, and the technician who maintains the microgrid.',
   '[{"quote":"Sarah''s salon now stays open until 9 p.m. The apprentices are earning, and we can all charge our phones without fear of a blackout.","name":"Grace K., neighbourhood leader","role":"Community member","tone":"earth"},{"quote":"Being trained as a solar technician meant I could install my own system — and now I service panels for 15 households. It''s real work, not charity.","name":"James Ochieng","role":"Solar technician graduate","tone":"water"},{"quote":"Clean energy isn''t just about the environment. It''s about dignity — about a business owner who can plan her day around reliable power.","name":"Dr. Aisha Mwanje","role":"FOSCOD programmes lead","tone":"forest"}]'::jsonb,
   'Solar-powered salon in Naluvule — Full impact story',
   'How a community-owned solar microgrid transformed a hair salon''s evening capacity, trained new technicians, and created lasting economic opportunity.',
   'published'
) on conflict (slug) do update set
  title = excluded.title, eyebrow = excluded.eyebrow, hero_image_url = excluded.hero_image_url,
  hero_image_alt = excluded.hero_image_alt, hero_intro = excluded.hero_intro, tone = excluded.tone,
  hero_cta_label = excluded.hero_cta_label, hero_cta_href = excluded.hero_cta_href,
  story_body = excluded.story_body, stats_eyebrow = excluded.stats_eyebrow,
  stats_title = excluded.stats_title, stats_intro = excluded.stats_intro,
  stats_items = excluded.stats_items, video_eyebrow = excluded.video_eyebrow,
  video_title = excluded.video_title, video_description = excluded.video_description,
  video_url = excluded.video_url, video_thumbnail_url = excluded.video_thumbnail_url,
  video_thumbnail_alt = excluded.video_thumbnail_alt, testimonials_eyebrow = excluded.testimonials_eyebrow,
  testimonials_title = excluded.testimonials_title, testimonials_intro = excluded.testimonials_intro,
  testimonials = excluded.testimonials, meta_title = excluded.meta_title,
  meta_description = excluded.meta_description, status = excluded.status;

-- ---------- general_impact_pages (general impact landing pages) ----------
insert into public.general_impact_pages (
  slug, program, title, eyebrow, hero_image_url, hero_image_alt, tone,
  hero_cta_label, hero_cta_href, hero_cta2_label, hero_cta2_href,
  hero_cta3_label, hero_cta3_href, description_title, description_body,
  cd_stories_eyebrow, cd_stories_title, cd_stories_intro, cd_story_cards,
  gle_stories_eyebrow, gle_stories_title, gle_stories_intro, gle_story_cards,
  explore_eyebrow, explore_title, explore_intro, explore_testimonials,
  explore_testimonials_cta_label, explore_testimonials_cta_href,
  explore_videos, explore_videos_cta_label, explore_videos_cta_href,
  get_involved_eyebrow, get_involved_title, get_involved_intro, get_involved_cards,
  visible
) values
  ('cedp',
   'CEDP',
   'Community Empowerment & Development Impact',
   'Community Empowerment & Development Program',
   '/images/impact/general/cedp-hero.jpg',
   'Community members working on a solar-powered water system',
   'forest',
   'Donate to a project', '/donate',
   'See all impacts', '/impact/stories',
   'Partner with us', '/partners',
   'Community-led impact, verified and shared',
   'CEDP works across Kalagala Parish and beyond, building locally owned solutions in clean energy, water, livelihoods, health, and environmental restoration. These pages gather the stories, statistics, and community voices behind the change.',
   'CEDP impact stories',
   'Featured community empowerment stories',
   'Stories of change from across the six CEDP sub-programs — each rooted in a community priority and backed by evidence.',
   '[{"title":"Solar-powered salon in Naluvule","excerpt":"A solar-powered hair salon turned an unreliable income into a growing business — and trained the next generation of local technicians.","href":"/impact/stories/solar-powered-salon-naluvule/full","imageUrl":"/images/cedp/impacts/solar-salon.jpg","imageAlt":"Solar-powered hair salon in Naluvule village","verifiedOutcome":"3 households gained reliable evening lighting and new income streams"},
    {"title":"Greening Kalagala, one tree at a time","excerpt":"Agroforestry and tree-planting restore soil, grow local income, and protect the forest edge.","href":"/projects/greening-kalagala","imageUrl":"/images/cedp/impacts/greening-kalagala.jpg","imageAlt":"Community tree planting in Kalagala Parish","verifiedOutcome":"2,000+ native trees planted across 5 hectares"}]'::jsonb,
   'GLE impact stories',
   'Featured global learning stories',
   'Stories from global learners and local partners working side by side.',
   '[]'::jsonb,
   'More voices and videos',
   'Community voices & field films',
   'Permissioned reflections and short films from the people behind the change.',
   '[{"quote":"Working alongside the host community changed how I think about development — it''s not about helping, it''s about walking alongside.","name":"Maria Santos","role":"GLE intern, class of 2024","photoUrl":"/images/team/maria.jpg","photoAlt":"Maria Santos"}]'::jsonb,
   'Discover more stories', '/impact/stories',
   '[]'::jsonb,
   'Watch more videos', '/stories',
   'How you can get involved',
   'Your pathway into the work',
   'Volunteer, intern, partner on a project, or support through a verified giving conversation — each pathway is supervised, community-linked, and transparent.',
   '[{"title":"Volunteer intern","body":"Join a supervised placement matched to your skills and a community-defined priority — with local support, host families, and structured learning outcomes.","href":"/programs/global-learning-exchange","ctaLabel":"Explore internships","icon":"volunteer","imageUrl":"","imageAlt":""},
    {"title":"Partner with us","body":"Co-design research, funding, or delivery partnerships around real community priorities — with roles, safeguards, and evidence agreed from the start.","href":"/partners","ctaLabel":"Partner with FOSCOD","icon":"partner","imageUrl":"","imageAlt":""},
    {"title":"Donate to clean energy","body":"Fund solar installations, clean cookstoves, tree planting, and climate-resilience infrastructure with transparent reporting.","href":"/donate","ctaLabel":"Start a giving inquiry","icon":"donate","imageUrl":"","imageAlt":""}]'::jsonb,
   true
) on conflict (slug) do update set
  program = excluded.program, title = excluded.title, eyebrow = excluded.eyebrow,
  hero_image_url = excluded.hero_image_url, hero_image_alt = excluded.hero_image_alt,
  tone = excluded.tone, hero_cta_label = excluded.hero_cta_label,
  hero_cta_href = excluded.hero_cta_href, hero_cta2_label = excluded.hero_cta2_label,
  hero_cta2_href = excluded.hero_cta2_href, hero_cta3_label = excluded.hero_cta3_label,
  hero_cta3_href = excluded.hero_cta3_href, description_title = excluded.description_title,
  description_body = excluded.description_body, cd_stories_eyebrow = excluded.cd_stories_eyebrow,
  cd_stories_title = excluded.cd_stories_title, cd_stories_intro = excluded.cd_stories_intro,
  cd_story_cards = excluded.cd_story_cards, gle_stories_eyebrow = excluded.gle_stories_eyebrow,
  gle_stories_title = excluded.gle_stories_title, gle_stories_intro = excluded.gle_stories_intro,
  gle_story_cards = excluded.gle_story_cards, explore_eyebrow = excluded.explore_eyebrow,
  explore_title = excluded.explore_title, explore_intro = excluded.explore_intro,
  explore_testimonials = excluded.explore_testimonials,
  explore_testimonials_cta_label = excluded.explore_testimonials_cta_label,
  explore_testimonials_cta_href = excluded.explore_testimonials_cta_href,
  explore_videos = excluded.explore_videos, explore_videos_cta_label = excluded.explore_videos_cta_label,
  explore_videos_cta_href = excluded.explore_videos_cta_href,
  get_involved_eyebrow = excluded.get_involved_eyebrow,
  get_involved_title = excluded.get_involved_title, get_involved_intro = excluded.get_involved_intro,
  get_involved_cards = excluded.get_involved_cards, visible = excluded.visible;

insert into public.general_impact_pages (
  slug, program, title, eyebrow, hero_image_url, hero_image_alt, tone,
  hero_cta_label, hero_cta_href, hero_cta2_label, hero_cta2_href,
  hero_cta3_label, hero_cta3_href, description_title, description_body,
  cd_stories_eyebrow, cd_stories_title, cd_stories_intro, cd_story_cards,
  gle_stories_eyebrow, gle_stories_title, gle_stories_intro, gle_story_cards,
  explore_eyebrow, explore_title, explore_intro, explore_testimonials,
  explore_testimonials_cta_label, explore_testimonials_cta_href,
  explore_videos, explore_videos_cta_label, explore_videos_cta_href,
  get_involved_eyebrow, get_involved_title, get_involved_intro, get_involved_cards,
  visible
) values
  ('gle',
   'GLE',
   'Global Learning & Exchange Impact',
   'Global Learning & Exchange Program',
   '/images/impact/general/gle-hero.jpg',
   'Global learners working with community members on a water project',
   'water',
   'Volunteer or Intern', '/programs/global-learning-exchange',
   'See all impacts', '/impact/stories',
   'Partner with us', '/partners',
   'Global learning, verified impact',
   'The Global Learning & Exchange program connects learners and researchers with community-led projects across clean energy, WASH, livelihoods, and health. These pages share the stories, statistics, and voices from that work.',
   'GLE impact stories',
   'Featured global learning stories',
   'Stories from global learners and local partners working side by side.',
   '[]'::jsonb,
   'CEDP impact stories',
   'Featured community empowerment stories',
   'Stories of change from communities leading development in Kalagala and beyond.',
   '[{"title":"Solar-powered salon in Naluvule","excerpt":"A solar-powered hair salon turned an unreliable income into a growing business.","href":"/impact/stories/solar-powered-salon-naluvule/full","imageUrl":"/images/cedp/impacts/solar-salon.jpg","imageAlt":"Solar-powered hair salon in Naluvule village","verifiedOutcome":"3 households gained reliable evening lighting"}]'::jsonb,
   'Community voices & field films',
   'Community voices & field films',
   'Permissioned reflections and short films from the people whose lives these stories touch.',
   '[{"quote":"FOSCOD didn''t bring us solutions — they helped us build our own. That''s the difference.","name":"Sarah Namubiru","role":"Salon owner, Naluvule","photoUrl":"/images/impact/stories/salon-owner.jpg","photoAlt":"Sarah Namubiru at her solar-powered salon"}]'::jsonb,
   'Discover more stories', '/impact/stories',
   '[]'::jsonb,
   'Watch more videos', '/stories',
   'How you can get involved',
   'Your pathway into the work',
   'Volunteer, intern, partner on a project, or support through a verified giving conversation — each pathway is supervised, community-linked, and transparent.',
   '[{"title":"Volunteer intern","body":"Join a supervised placement matched to your skills and a community-defined priority — with local support, host families, and structured learning outcomes.","href":"/programs/global-learning-exchange","ctaLabel":"Explore internships","icon":"volunteer","imageUrl":"","imageAlt":""},
    {"title":"Partner with us","body":"Co-design research, funding, or delivery partnerships around real community priorities — with roles, safeguards, and evidence agreed from the start.","href":"/partners","ctaLabel":"Partner with FOSCOD","icon":"partner","imageUrl":"","imageAlt":""},
    {"title":"Donate to a project","body":"Fund a named project with verified need, approved transfer routes, and transparent reporting.","href":"/donate","ctaLabel":"Start a giving inquiry","icon":"donate","imageUrl":"","imageAlt":""}]'::jsonb,
   true
) on conflict (slug) do update set
  title = excluded.title, eyebrow = excluded.eyebrow,
  hero_image_url = excluded.hero_image_url, hero_image_alt = excluded.hero_image_alt,
  tone = excluded.tone, hero_cta_label = excluded.hero_cta_label,
  hero_cta_href = excluded.hero_cta_href, hero_cta2_label = excluded.hero_cta2_label,
  hero_cta2_href = excluded.hero_cta2_href, hero_cta3_label = excluded.hero_cta3_label,
  hero_cta3_href = excluded.hero_cta3_href, description_title = excluded.description_title,
  description_body = excluded.description_body, cd_stories_eyebrow = excluded.cd_stories_eyebrow,
  cd_stories_title = excluded.cd_stories_title, cd_stories_intro = excluded.cd_stories_intro,
  cd_story_cards = excluded.cd_story_cards, gle_stories_eyebrow = excluded.gle_stories_eyebrow,
  gle_stories_title = excluded.gle_stories_title, gle_stories_intro = excluded.gle_stories_intro,
  gle_story_cards = excluded.gle_story_cards, explore_eyebrow = excluded.explore_eyebrow,
  explore_title = excluded.explore_title, explore_intro = excluded.explore_intro,
  explore_testimonials = excluded.explore_testimonials,
  explore_testimonials_cta_label = excluded.explore_testimonials_cta_label,
  explore_testimonials_cta_href = excluded.explore_testimonials_cta_href,
  explore_videos = excluded.explore_videos, explore_videos_cta_label = excluded.explore_videos_cta_label,
  explore_videos_cta_href = excluded.explore_videos_cta_href,
  get_involved_eyebrow = excluded.get_involved_eyebrow,
  get_involved_title = excluded.get_involved_title, get_involved_intro = excluded.get_involved_intro,
  get_involved_cards = excluded.get_involved_cards, visible = excluded.visible;


-- ---------- article_categories ----------
insert into public.article_categories (slug, name, parent_id, description, visible, order_column) values
  ('blog', 'Blog', NULL, 'Field posts, news, and updates from the FOSCOD blog.', true, 1),
  ('program', 'Program', NULL, 'Stories about the GLE or CEDP programs.', true, 2),
  ('insight', 'Insight', NULL, 'Data-driven insights, impact measurements, and research findings.', true, 3),
  ('impact-stories', 'Impact Stories', NULL, 'Community voice stories with verified outcomes.', true, 4),
  ('impact-stories-clean-energy', 'Clean Energy', (select id from public.article_categories where slug = 'impact-stories'), 'Impact stories tagged under clean energy and climate resilience.', true, 5),
  ('impact-stories-water', 'Water', (select id from public.article_categories where slug = 'impact-stories'), 'Impact stories tagged under water, sanitation, and health.', true, 6),
  ('impact-stories-livelihoods', 'Livelihoods', (select id from public.article_categories where slug = 'impact-stories'), 'Impact stories tagged under sustainable livelihoods and economic empowerment.', true, 7)
on conflict (slug) do update set
  name = excluded.name, parent_id = excluded.parent_id, description = excluded.description,
  visible = excluded.visible, order_column = excluded.order_column;

-- ---------- form_categories ----------
insert into public.form_categories (slug, name, description, form_type, visible, order_column) values
  ('application', 'Application', 'Internship, volunteer, and group program applications.', 'application', true, 1),
  ('donation', 'Donation', 'Donor inquiry and donation forms.', 'donation', true, 2),
  ('partnership', 'Partnership & Collaboration', 'Partnership, collaboration, and research inquiry forms.', 'partnership', true, 3),
  ('newsletter', 'Newsletter', 'Newsletter signup and subscription management.', 'newsletter', true, 4)
on conflict (slug) do update set
  name = excluded.name, description = excluded.description, form_type = excluded.form_type,
  visible = excluded.visible, order_column = excluded.order_column;

-- ============================================================
-- Mirror of frontend fallback data from lib/content.ts
-- These rows ensure the CMS admin is immediately usable with real
-- content rather than showing empty states when Supabase is connected.
-- ============================================================

-- ---------- impact_stats (verified metrics, mirrors getImpactStats fallback) ----------
-- The impact_stats table powers every counter on the site.
-- This list is the approved, dated source of truth for verified figures.
delete from public.impact_stats;
insert into public.impact_stats (metric_name, current_value, target_value, unit, as_of_date, source_note, program, status, visible, order_column) values
  ('Community projects implemented', '35', null, null, '2024-12-31', 'FOSCOD verified track record, 2022–2024', 'ORG', 'verified', true, 1),
  ('Development practitioners trained', '42', null, null, '2024-12-31', '27 in-person interns, 11 virtual interns, and 4 volunteers; 2019–2024', 'GLE', 'verified', true, 2),
  ('Virtual interns engaged', '93', null, null, '2024-12-31', 'FOSCOD verified track record, 2019–2024', 'GLE', 'verified', true, 3),
  ('Completed projects sustaining benefits', '86%', null, null, '2024-12-31', 'Share of completed projects continuing to benefit communities independently; verified track record, 2019–2024', 'ORG', 'verified', true, 4),
  ('Grassroots organizations trained', '20', null, null, '2024-12-31', 'Training in ethical community development practices, 2019–2024', 'ORG', 'verified', true, 5)
on conflict do nothing;

-- ---------- sub_programs (CEDP six sub-programs) ----------
-- Mirrors the fallback in getSubPrograms() so the CEDP area detail pages
-- have their sub-program definitions available from the CMS.
delete from public.sub_programs;
insert into public.sub_programs (slug, name, strategic_goal, hero_image_url, description, icon, key_stats, order_column, status, featured, meta_title, meta_description) values
  ('green-skills-renewable-energy', 'Green Skills & Renewable Energy Education', 1, '/images/cedp/clean-energy.jpg',
    'Training youth and women in solar installation, clean cooking, and e-mobility — with certification pathways and green-enterprise incubation.',
    'energy',
    '[{"label":"Trainees certified","value":"86","note":"in solar PV, cookstoves, and e-mobility"},{"label":"Green enterprises launched","value":"12","note":"from incubation program"}]',
    1, 'published', true,
    'Green Skills & Renewable Energy Education | CEDP — FOSCOD',
    'Training in solar installation, clean cooking, and e-mobility — with certification and green-enterprise incubation in Kalagala Parish.'),
  ('clean-cooking-health', 'Clean Cooking & Health', 2, '/images/cedp/cooking.jpg',
    'Improved cookstoves, fuel-efficient alternatives, and indoor air quality monitoring to reduce health risks and deforestation.',
    'health',
    '[{"label":"Households with improved stoves","value":"320","note":"reduction in smoke exposure"}]',
    2, 'published', true,
    'Clean Cooking & Health | CEDP — FOSCOD',
    'Improved cookstoves and indoor air quality monitoring in Kalagala Parish communities.'),
  ('water-sanitation-hygiene', 'Water, Sanitation & Hygiene (WASH)', 3, '/images/cedp/water.jpg',
    'Community-owned water infrastructure, spring protection, and hygiene education to improve health outcomes.',
    'water',
    '[{"label":"Households with clean water","value":"120","note":"86% sustained use after 12 months"}]',
    3, 'published', true,
    'Water, Sanitation & Hygiene | CEDP — FOSCOD',
    'Safe water, spring protection, sanitation, and hygiene education in Kalagala Parish.'),
  ('green-livelihoods-economic-empowerment', 'Green Livelihoods & Economic Empowerment', 4, '/images/cedp/livelihoods.jpg',
    'VSLAs, women-led enterprises, climate-smart agriculture, and green business incubation to grow inclusive local economies.',
    'enterprise',
    '[{"label":"Households in savings groups","value":"45","note":"across 5 villages"}]',
    4, 'published', true,
    'Green Livelihoods & Economic Empowerment | CEDP — FOSCOD',
    'Savings groups, women-led enterprises, climate-smart agriculture, and green business incubation in Kalagala Parish.'),
  ('inclusive-leadership', 'Inclusive Leadership — Women, Youth & Climate Leadership', 5, '/images/cedp/leadership.jpg',
    'Capacity-building for women, youth, and marginalized groups to take leadership roles in community decision-making and climate resilience.',
    'partner',
    '[{"label":"Women leaders trained","value":"38","note":"in cooperative and governance skills"}]',
    5, 'published', true,
    'Inclusive Leadership — Women, Youth & Climate | CEDP — FOSCOD',
    'Leadership training for women, youth, and marginalized groups in Kalagala Parish communities.'),
  ('ecosystem-restoration-carbon-offsets', 'Ecosystem Restoration & Carbon Offsets', 6, '/images/cedp/forest.jpg',
    'Reforestation, biochar production, and carbon-credit projects that restore degraded land while creating sustainable income.',
    'environment',
    '[{"label":"Trees planted","value":"2000+","note":"native species across 5 hectares"}]',
    6, 'published', true,
    'Ecosystem Restoration & Carbon Offsets | CEDP — FOSCOD',
    'Tree planting, biochar production, and carbon-credit projects restoring degraded land in Kalagala Parish.')
on conflict (slug) do update set
  name = excluded.name, strategic_goal = excluded.strategic_goal,
  hero_image_url = excluded.hero_image_url, description = excluded.description,
  icon = excluded.icon, key_stats = excluded.key_stats,
  order_column = excluded.order_column, status = excluded.status, featured = excluded.featured,
  meta_title = excluded.meta_title, meta_description = excluded.meta_description;

-- ---------- gle_pathways (4 Find your pathway cards) ----------
delete from public.gle_pathways;
insert into public.gle_pathways (title, body, href, cta, kicker, image_url, image_alt, order_column, visible) values
  ('Internships', 'A role matched to your discipline, learning goals, demonstrated skills, and the supervision available.', '/internships', 'Explore internships', 'Individuals', '/images/gle/internships.jpg', 'Intern working on a solar installation with local technicians', 1, true),
  ('Responsible volunteering', 'A defined contribution to ongoing work, with role boundaries, preparation, local guidance, and handover.', '/volunteer', 'Explore volunteering', 'Individuals & groups', '/images/gle/volunteering.jpg', 'Volunteer teaching hygiene practices in a community setting', 2, true),
  ('Faculty-led programs', 'Co-designed group learning connected to course outcomes, field activities, reflection, and community value.', '/partners', 'Plan a faculty program', 'Universities', '/images/gle/faculty-led.jpg', 'University faculty and students collaborating with community leaders', 3, true),
  ('Community-based research', 'Research shaped with local partners, including ethics, data, authorship, dissemination, and return-of-findings agreements.', '/partners', 'Discuss research', 'Researchers', '/images/gle/research.jpg', 'Researchers collecting water quality data with community members', 4, true)
on conflict do nothing;

-- ---------- gle_introduction (GLE landing page intro section) ----------
delete from public.gle_introduction;
insert into public.gle_introduction (title, eyebrow, body, image_url, image_alt, cta_label, cta_href, order_column, visible) values
  ('Learn ethical development through real projects', 'About Global Learning & Exchange',
    'FOSCOD''s Global Learning & Exchange (GLE) program connects students, professionals, researchers, and university groups with structured, supervised field learning in Uganda.

Participants work alongside FOSCOD, community organizations, host families, and local leaders across clean energy, WASH, livelihoods, health, and environmental sustainability. You contribute to genuine community priorities under local supervision — not manufactured tasks.

Whether you come for academic learning, career experience, service, or community-based participatory research (CBPR), the structure is the same: prepare, contribute within a defined role, reflect, and complete a useful handover.',
    '/images/gle/introduction.jpg', 'Global learning participants working with a community on solar installation',
    'Volunteer or Intern', '/programs/global-learning-exchange', 1, true)
on conflict do nothing;

-- ---------- gle_apply_section (GLE apply call-to-action) ----------
delete from public.gle_apply_section;
insert into public.gle_apply_section (title, eyebrow, body, image_url, image_alt, cta_label, cta_href, order_column, visible) values
  ('Apply to join GLE', 'Get involved',
    'Start your application to join a supervised, ethical field-learning placement in Uganda. We''ll match your skills, study background, and timeline to an active community priority — with local supervision, host-family support, and clear role boundaries from day one.',
    '/images/gle/apply.jpg', 'Application documents and a pen beside a community project site',
    'Start your application', '/apply', 1, true)
on conflict do nothing;

-- ---------- impact_stories (community voice stories, mirrors fallback) ----------
-- These power the Impact Stories archive and the CEDP area impact carousels.
delete from public.impact_stories;
insert into public.impact_stories (slug, title, community_voice, quote, hero_image_url, gallery, narrative, linked_program, linked_sub_program_id, linked_project_id, verified_outcome, published_at, status) values
  ('solar-powered-salon-naluvule', 'Solar-Powered Salon in Naluvule',
    'Sarah Namubiru, salon owner',
    'Before solar, I was losing money after 6 p.m. Now I can serve clients until 8 — and the quality of my work is so much better in good light.',
    '/images/impact/stories/salon-hero.jpg', '[]',
    'In the village of Naluvule, evening light used to mean kerosene lamps and a day''s work done. Sarah Namubiru, who runs a small hair salon from her home, could only serve a few clients before dark. When FOSCOD partnered with the community to install a shared solar microgrid, Sarah was among the first to connect. Reliable evening electricity opened evenings for clients and enabled a small fridge for beauty products. Within a year, the salon doubled its customer base and the owner hired two apprentices.',
    'CEDP', (select id from public.sub_programs where slug = 'green-skills-renewable-energy'), 'solar-powered-water-system-naluvule',
    '3 households gained reliable evening lighting and new income streams', '2025-03-15', 'published'),
  ('water-is-life-lubani', 'Water is Life: a protected spring in Lubani',
    'Mariam N., parent',
    'My daughter used to miss two days of school every week because she was collecting water. Now she walks there and back in 10 minutes.',
    '/images/impact/stories/lubani-hero.jpg', '[]',
    'Before the spring protection project in Lubani, residents — especially women and children — walked long distances to collect water that often made them sick. The spring was open to cattle and runoff, and waterborne illness was common. Through FOSCOD''s WASH program, the community fenced the spring, built a collection chamber, and established a water user committee. Within six months, water-quality tests showed a 90% reduction in E. coli. Children no longer miss school to fetch water.',
    'CEDP', (select id from public.sub_programs where slug = 'water-sanitation-hygiene'), 'water-spring-protection-naluvule',
    'Water access improved for 120 households with 86% sustained use after 12 months', '2025-02-10', 'published'),
  ('greening-kalagala-regeneration', 'Greening Kalagala: regenerating degraded land',
    'Grace K., neighbourhood leader',
    'We used to lose topsoil every rainy season. Now the trees hold the soil, and the community forest is coming back.',
    '/images/impact/stories/greening-kalagala.jpg', '[]',
    'Kalagala Parish faced severe soil erosion and forest degradation. Through community-led tree planting and agroforestry, 50 hectares of land have been restored. Seedlings are maintained by village conservation groups with monitoring led by local youth.',
    'CEDP', (select id from public.sub_programs where slug = 'ecosystem-restoration-carbon-offsets'), 'greening-kalagala',
    '2,000+ native trees planted across 5 hectares of forest edge', '2025-01-20', 'published'),
  ('biochar-from-water-hyacinth', 'Biochar from water hyacinth: turning invasion into soil',
    'Samuel K., Water committee chair',
    'The invasive water hyacinth used to choke our waterways. Now we make biochar from it — better soil and cleaner cooking.',
    '/images/impact/stories/biochar.jpg', '[]',
    'In the wetlands near Naluvule, water hyacinth was choking waterways. The community began producing biochar from the invasive plant, improving soil health and reducing the need for wood fuel. Women''s groups now produce 500 biochar units per month for local sale.',
    'CEDP', (select id from public.sub_programs where slug = 'clean-cooking-health'), 'carbon-credit-project',
    '500 biochar units produced from invasive species; 30 households adopted cleaner cooking', '2024-12-05', 'published'),
  ('coffee-farming-mobilization', 'Coffee farming mobilization: resilient livelihoods',
    'James Ochieng, farmer cooperative leader',
    'The climate-smart training changed everything. Our yields are up, and we have a direct buyer for our coffee now.',
    '/images/impact/stories/coffee-farming.jpg', '[]',
    'Smallholder coffee farmers in Kalagala Parish faced declining yields due to climate variability. FOSCOD''s mobilization program provided climate-smart training and market linkages. Average yields rose 22% in the first season.',
    'CEDP', (select id from public.sub_programs where slug = 'green-livelihoods-economic-empowerment'), 'coffee-farming-mobilization',
    '120 farmers trained; 15% average yield increase reported', '2024-11-12', 'published'),
  ('gle-research-methodology', 'Research methodology exchange with Makerere University',
    'Dr. Aisha Mwanje, FOSCOD programmes lead',
    'The CBPR framework FOSCOD uses became my north star for every research project after graduation.',
    '/images/impact/stories/gle-research.jpg', '[]',
    'A joint research methodology workshop between FOSCOD and Makerere University brought together community researchers and academic faculty to co-develop participatory research protocols. The protocols are now used across three departments at Makerere.',
    'GLE', null, 'research-knowledge-exchange',
    '8 jointly published protocols; 3 graduate students trained in CBPR methods', '2025-04-01', 'published'),
  ('gle-health-outreach-kalagala', 'Community health outreach in Kalagala',
    'Nurse Sarah, Kalagala Health Center',
    'The mobile clinic and hygiene education reduced our patient load by 30% during the rainy season.',
    '/images/impact/stories/gle-health.jpg', '[]',
    'A team of international public health students partnered with the Kalagala Health Center to deliver hygiene education, basic screenings, and health promotion activities across five villages. Community members received health education and basic medical screening.',
    'GLE', null, 'health-community-wellbeing',
    '180 community members screened; 40 hygiene sessions conducted; 30% reduction in preventable illness cases', '2025-03-22', 'published'),
  ('gle-leadership-womens-cooperative', 'Women''s cooperative leadership training',
    'Fatima N., cooperative treasurer',
    'Being trained as a leader meant I could start my own group — and now I train other women too.',
    '/images/impact/stories/gle-leadership.jpg', '[]',
    'An international development studies student partnered with local women''s groups in Naluvule to deliver leadership and financial literacy training, supporting the formation of a registered cooperative. The cooperative now has 15 members and three micro-enterprises.',
    'GLE', null, 'governance-leadership',
    '15 women trained in leadership; 3 new cooperatives registered; 5 micro-enterprises launched', '2025-02-28', 'published')
on conflict (slug) do update set
  title = excluded.title, community_voice = excluded.community_voice, quote = excluded.quote,
  hero_image_url = excluded.hero_image_url, gallery = excluded.gallery, narrative = excluded.narrative,
  linked_program = excluded.linked_program, linked_sub_program_id = excluded.linked_sub_program_id,
  linked_project_id = excluded.linked_project_id, verified_outcome = excluded.verified_outcome,
  published_at = excluded.published_at, status = excluded.status;

-- ---------- impact_story_details (full-detail impact story pages) ----------
-- The solar-powered-salon story is already seeded above. Add the water-is-life-lubani
-- full-detail page that mirrors the content.ts fallback.
insert into public.impact_story_details (
  slug, title, eyebrow, hero_image_url, hero_image_alt, hero_intro, tone,
  hero_cta_label, hero_cta_href, story_body, stats_eyebrow, stats_title,
  stats_intro, stats_items, video_eyebrow, video_title, video_description,
  video_url, video_thumbnail_url, video_thumbnail_alt, testimonials_eyebrow,
  testimonials_title, testimonials_intro, testimonials, meta_title, meta_description, status
) values
  ('water-is-life-lubani',
   'Water is Life: a protected spring in Lubani',
   'Water & health',
   '/images/impact/stories/lubani-hero.jpg',
   'Community members protecting a natural water spring in Lubani',
   'In Lubani, protecting a natural spring meant safer water, fewer clinic visits, and time returned to children''s school days.',
   'water',
   'Support spring protection', '/donate?program=wash',
   '[
     {"type":"paragraph","content":"Before the spring protection project in Lubani, residents — especially women and children — walked long distances to collect water that often made them sick. The spring was open to cattle and runoff, and waterborne illness was common."},
     {"type":"image","imageUrl":"/images/impact/stories/lubani-spring-before.jpg","imageAlt":"Unprotected spring before community intervention","caption":"The spring before protection work began."},
     {"type":"paragraph","content":"Through FOSCOD''s WASH program, the community fenced the spring, built a collection chamber, and established a water user committee. Within six months, water-quality tests showed a 90% reduction in E. coli."},
     {"type":"heading","content":"Time returned to learning"},
     {"type":"paragraph","content":"Children no longer miss school to fetch water. The nearest improved source is now a five-minute walk, compared to the hour-long round trip to the unprotected spring."}
   ]'::jsonb,
   'Verified outcomes',
   'Measurable impact after 12 months',
   'These figures were verified through community-managed monitoring and FOSCOD''s annual evidence review.',
   '[{"label":"Households with clean water access","value":"120","note":"within 500m of protected spring"},{"label":"Reduction in waterborne illness","value":"60%","note":"clinic records, 6-month follow-up"},{"label":"Children''s school attendance","value":"+12%","note":"measured in local primary school"},{"label":"Water user committee members trained","value":"12","note":"maintenance and testing"}]'::jsonb,
   'Impact film',
   'A spring that changed daily life',
   'A short film on how protecting a single spring transformed water access and children''s education in Lubani.',
   '',
   '/images/impact/stories/lubani-video-thumb.jpg',
   'Video thumbnail of the protected spring',
   'Voices from the community',
   'What the community says',
   'Permissioned reflections from residents, committee members, and health workers.',
   '[{"quote":"My daughter used to miss two days of school every week because she was collecting water. Now she walks there and back in 10 minutes.","name":"Mariam N.","role":"Parent","tone":"water"},{"quote":"The committee makes sure the spring stays protected. We all contribute, and everyone benefits.","name":"Samuel K.","role":"Water committee chair","tone":"earth"}]'::jsonb,
   'Water is Life: a protected spring in Lubani — Full impact story',
   'How community-led spring protection improved water access for 120 households, reduced waterborne illness by 60%, and returned learning time to children in Lubani.',
   'published'
) on conflict (slug) do update set
  title = excluded.title, eyebrow = excluded.eyebrow, hero_image_url = excluded.hero_image_url,
  hero_image_alt = excluded.hero_image_alt, hero_intro = excluded.hero_intro, tone = excluded.tone,
  hero_cta_label = excluded.hero_cta_label, hero_cta_href = excluded.hero_cta_href,
  story_body = excluded.story_body, stats_eyebrow = excluded.stats_eyebrow,
  stats_title = excluded.stats_title, stats_intro = excluded.stats_intro,
  stats_items = excluded.stats_items, video_eyebrow = excluded.video_eyebrow,
  video_title = excluded.video_title, video_description = excluded.video_description,
  video_url = excluded.video_url, video_thumbnail_url = excluded.video_thumbnail_url,
  video_thumbnail_alt = excluded.video_thumbnail_alt, testimonials_eyebrow = excluded.testimonials_eyebrow,
  testimonials_title = excluded.testimonials_title, testimonials_intro = excluded.testimonials_intro,
  testimonials = excluded.testimonials, meta_title = excluded.meta_title,
  meta_description = excluded.meta_description, status = excluded.status;
