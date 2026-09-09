
CREATE TYPE public.app_role AS ENUM ('investigator');
CREATE TYPE public.environment_type AS ENUM ('staging', 'prod');
CREATE TYPE public.source_type AS ENUM ('github_actions', 'kubernetes');
CREATE TYPE public.incident_status AS ENUM ('open', 'investigating', 'resolved');
CREATE TYPE public.investigation_method AS ENUM ('eacp', 'manual');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  display_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_roles_select_own" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data ->> 'display_name', split_part(NEW.email, '@', 1)))
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'investigator')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  environment public.environment_type NOT NULL DEFAULT 'staging',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "services_all_auth" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.evidence_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  source_type public.source_type NOT NULL,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.evidence_sources TO authenticated;
GRANT ALL ON public.evidence_sources TO service_role;
ALTER TABLE public.evidence_sources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "evidence_sources_all_auth" ON public.evidence_sources FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  evidence_source_id uuid REFERENCES public.evidence_sources(id) ON DELETE SET NULL,
  source_type public.source_type NOT NULL,
  event_type text NOT NULL,
  raw_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  ingested_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX events_service_occurred_idx ON public.events (service_id, occurred_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.events TO authenticated;
GRANT ALL ON public.events TO service_role;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "events_all_auth" ON public.events FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status public.incident_status NOT NULL DEFAULT 'open',
  started_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.incidents TO authenticated;
GRANT ALL ON public.incidents TO service_role;
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "incidents_all_auth" ON public.incidents FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.incident_timelines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_id uuid NOT NULL REFERENCES public.incidents(id) ON DELETE CASCADE,
  event_id uuid REFERENCES public.events(id) ON DELETE SET NULL,
  sequence_order integer NOT NULL DEFAULT 0,
  correlation_confidence double precision,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.incident_timelines TO authenticated;
GRANT ALL ON public.incident_timelines TO service_role;
ALTER TABLE public.incident_timelines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "incident_timelines_all_auth" ON public.incident_timelines FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.investigation_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_id uuid NOT NULL REFERENCES public.incidents(id) ON DELETE CASCADE,
  method public.investigation_method NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  time_to_reconstruct_minutes double precision,
  evidence_items_found integer NOT NULL DEFAULT 0,
  unresolved_connections integer NOT NULL DEFAULT 0,
  setup_effort_notes text,
  maintenance_effort_notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.investigation_runs TO authenticated;
GRANT ALL ON public.investigation_runs TO service_role;
ALTER TABLE public.investigation_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "investigation_runs_all_auth" ON public.investigation_runs FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO public.services (name, description, environment)
VALUES ('payments-api', 'Core payment processing service for the pilot evaluation.', 'staging');
