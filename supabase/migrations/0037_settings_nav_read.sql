-- ============================================================
-- FOSCOD CMS - 0037 settings navigation read
-- Expose the 'navigation' settings group to public reads so the
-- CMS-managed primary navigation (settings.primary_nav) renders
-- for visitors. Mirrors the existing settings_public_read policy.
-- ============================================================

drop policy if exists settings_public_read on public.settings;
create policy settings_public_read on public.settings
  for select using (
    ("group" = ANY (ARRAY['general'::text, 'contact'::text, 'branding'::text, 'seo'::text, 'navigation'::text]))
    or is_staff()
  );
