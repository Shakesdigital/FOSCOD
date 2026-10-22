-- ============================================================
-- FOSCOD CMS — 0026: backfill unique constraints
--
-- Migration 0015/0016/0020 added unique() constraints inside
-- CREATE TABLE and changed an index to CREATE UNIQUE INDEX.
-- On a FRESH database these work fine. On an EXISTING database
-- that was already migrated with the old schema,
-- CREATE TABLE IF NOT EXISTS skips the new constraints entirely.
--
-- This migration back-fills those missing constraints using
-- ALTER TABLE / DROP+CREATE INDEX so the seed.sql ON CONFLICT
-- clauses work regardless of database state.
--
-- The check is column-based (via pg_get_constraintdef) rather than
-- name-based, because CREATE TABLE auto-generates constraint names
-- that differ from the names we'd use here. This avoids duplicates
-- on fresh databases while still back-filling on existing ones.
-- ============================================================

-- ---------- project_activities: unique(project_slug, title) ----------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint c
    JOIN pg_class r ON r.oid = c.conrelid
    JOIN pg_namespace n ON n.oid = r.relnamespace
    WHERE c.contype = 'u'
      AND r.relname = 'project_activities'
      AND n.nspname = 'public'
      AND replace(replace(pg_get_constraintdef(c.oid), 'UNIQUE (', ''), ')', '') = 'project_slug, title'
  ) THEN
    ALTER TABLE public.project_activities
      ADD CONSTRAINT project_activities_slug_title_key
      UNIQUE (project_slug, title);
  END IF;
END $$;

-- ---------- project_impacts: unique(project_slug, title) ----------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint c
    JOIN pg_class r ON r.oid = c.conrelid
    JOIN pg_namespace n ON n.oid = r.relnamespace
    WHERE c.contype = 'u'
      AND r.relname = 'project_impacts'
      AND n.nspname = 'public'
      AND Replace(Replace(pg_get_constraintdef(c.oid), 'UNIQUE (', ''), ')', '') = 'project_slug, title'
  ) THEN
    ALTER TABLE public.project_impacts
      ADD CONSTRAINT project_impacts_slug_title_key
      UNIQUE (project_slug, title);
  END IF;
END $$;

-- ---------- cedp_area_projects: unique(area_id, project_id) ----------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint c
    JOIN pg_class r ON r.oid = c.conrelid
    JOIN pg_namespace n ON n.oid = r.relnamespace
    WHERE c.contype = 'u'
      AND r.relname = 'cedp_area_projects'
      AND n.nspname = 'public'
      AND Replace(Replace(pg_get_constraintdef(c.oid), 'UNIQUE (', ''), ')', '') = 'area_id, project_id'
  ) THEN
    ALTER TABLE public.cedp_area_projects
      ADD CONSTRAINT cedp_area_projects_area_id_project_id_key
      UNIQUE (area_id, project_id);
  END IF;
END $$;

-- ---------- cedp_area_impacts: unique(area_id, title) ----------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint c
    JOIN pg_class r ON r.oid = c.conrelid
    JOIN pg_namespace n ON n.oid = r.relnamespace
    WHERE c.contype = 'u'
      AND r.relname = 'cedp_area_impacts'
      AND n.nspname = 'public'
      AND Replace(Replace(pg_get_constraintdef(c.oid), 'UNIQUE (', ''), ')', '') = 'area_id, title'
  ) THEN
    ALTER TABLE public.cedp_area_impacts
      ADD CONSTRAINT cedp_area_impacts_area_id_title_key
      UNIQUE (area_id, title);
  END IF;
END $$;

-- ---------- cedp_areas_of_focus: unique index on slug ----------
-- The old migration created a non-unique index on (slug, visible).
-- DROP+CREATE ensures a unique index on (slug) regardless of prior state.
DROP INDEX IF EXISTS idx_cedp_areas_of_focus_slug;
CREATE UNIQUE INDEX IF NOT EXISTS idx_cedp_areas_of_focus_slug
  ON public.cedp_areas_of_focus (slug);
