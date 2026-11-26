-- ============================================================
-- FOSCOD CMS - 0036 simplified navigation
-- Primary navigation reduced to six items (Home, About Us, Programs,
-- Impact, Blog, Contact Us) and made CMS-editable: the Header reads
-- settings.primary_nav (group 'navigation') with code fallback.
-- Footer quick links refreshed to match the new structure.
-- ============================================================

delete from public.settings where key = 'primary_nav';
insert into public.settings (key, value, "group") values
  ('primary_nav', '[{"label":"Home","href":"/"},{"label":"About Us","href":"/about"},{"label":"Programs","href":"/programs","children":[{"label":"Global Learning Exchange Program (GLE)","href":"/programs/global-learning-exchange"},{"label":"Community Empowerment and Development Program (CEDP)","href":"/programs/community-empowerment-development"}]},{"label":"Impact","href":"/impact"},{"label":"Blog","href":"/stories"},{"label":"Contact Us","href":"/contact"}]', 'navigation');

delete from public.footer_nav where column_key = 'quick-links';
insert into public.footer_nav (column_key, label, href, order_column, visible) values
  ('quick-links', 'Global Learning Exchange Program', '/programs/global-learning-exchange', 1, true),
  ('quick-links', 'Community Empowerment and Development Program', '/programs/community-empowerment-development', 2, true),
  ('quick-links', 'Impact', '/impact', 3, true),
  ('quick-links', 'Blog', '/stories', 4, true),
  ('quick-links', 'Support community work', '/donate', 5, true);
