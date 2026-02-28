-- ============================================================
-- Togurt – Supabase schema (profiles, job_postings, applications, application_files)
-- Run this entire file once in Supabase SQL Editor.
-- Re-running will DROP and recreate objects (data will be lost).
-- ============================================================

-- Drop existing objects (reverse dependency order)
-- PostgreSQL does not support "CREATE TYPE IF NOT EXISTS", so we drop first.
DROP TABLE IF EXISTS public.application_files CASCADE;
DROP TABLE IF EXISTS public.applications CASCADE;
DROP TABLE IF EXISTS public.job_postings CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TYPE IF EXISTS public.application_file_type CASCADE;
DROP TYPE IF EXISTS public.profile_category CASCADE;

-- ============================================================
-- Enums
-- ============================================================

CREATE TYPE public.profile_category AS ENUM (
  'director',
  'performer',
  'writer',
  'crew'
);

CREATE TYPE public.application_file_type AS ENUM (
  'resume_pdf',
  'video_resume',
  'portfolio_link'
);

-- ============================================================
-- Profiles (one row per auth user)
-- ============================================================

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  category public.profile_category NOT NULL,
  CONSTRAINT profiles_auth_fk
    FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE PROCEDURE public.set_updated_at();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_delete_own" ON public.profiles
  FOR DELETE TO authenticated USING (auth.uid() = id);

-- ============================================================
-- Job postings
-- ============================================================

CREATE TABLE public.job_postings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  creator_id uuid NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  area text,
  category public.profile_category NOT NULL,
  short_description text,
  description text,
  pay_range text,
  is_active boolean NOT NULL DEFAULT true
);

CREATE TRIGGER set_job_postings_updated_at
  BEFORE UPDATE ON public.job_postings
  FOR EACH ROW
  EXECUTE PROCEDURE public.set_updated_at();

ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "jobs_select_active" ON public.job_postings
  FOR SELECT TO authenticated USING (is_active = true);

CREATE POLICY "jobs_insert_own" ON public.job_postings
  FOR INSERT TO authenticated WITH CHECK (creator_id = auth.uid());

CREATE POLICY "jobs_update_own" ON public.job_postings
  FOR UPDATE TO authenticated USING (creator_id = auth.uid()) WITH CHECK (creator_id = auth.uid());

CREATE POLICY "jobs_delete_own" ON public.job_postings
  FOR DELETE TO authenticated USING (creator_id = auth.uid());

-- ============================================================
-- Applications (one per applicant per job)
-- ============================================================

CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  applicant_id uuid NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  job_id uuid NOT NULL REFERENCES public.job_postings (id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'submitted',
  CONSTRAINT applications_unique_applicant_job UNIQUE (applicant_id, job_id)
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "applications_applicant_all" ON public.applications
  FOR ALL TO authenticated
  USING (applicant_id = auth.uid())
  WITH CHECK (applicant_id = auth.uid());

CREATE POLICY "applications_job_owner_select" ON public.applications
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.job_postings jp
      WHERE jp.id = applications.job_id AND jp.creator_id = auth.uid()
    )
  );

-- ============================================================
-- Application files (resume, video, portfolio per application)
-- ============================================================

CREATE TABLE public.application_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  application_id uuid NOT NULL REFERENCES public.applications (id) ON DELETE CASCADE,
  file_type public.application_file_type NOT NULL,
  storage_path text NOT NULL,
  original_filename text,
  mime_type text,
  file_size_bytes bigint
);

ALTER TABLE public.application_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "app_files_applicant_all" ON public.application_files
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.applications a
      WHERE a.id = application_files.application_id AND a.applicant_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.applications a
      WHERE a.id = application_files.application_id AND a.applicant_id = auth.uid()
    )
  );

CREATE POLICY "app_files_job_owner_select" ON public.application_files
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.applications a
      JOIN public.job_postings jp ON jp.id = a.job_id
      WHERE a.id = application_files.application_id AND jp.creator_id = auth.uid()
    )
  );

-- ============================================================
-- Optional: auto-create profile on signup (run after Auth is set up)
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, category)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', 'User'),
    'crew'
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
