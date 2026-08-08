-- ============================================================
-- Data Privacy Platform — Supabase SQL Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ── 1. API Keys ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS api_keys (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        REFERENCES auth.users(id) ON DELETE CASCADE,
  name            TEXT        NOT NULL,
  key_prefix      TEXT        NOT NULL,
  key_hash        TEXT        NOT NULL,
  permissions     JSONB       NOT NULL DEFAULT '{"read":true,"write":false,"admin":false}',
  last_used_at    TIMESTAMPTZ,
  expires_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS api_keys_user_idx ON api_keys(user_id);
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "api_keys_self" ON api_keys;
CREATE POLICY "api_keys_self" ON api_keys FOR ALL USING (auth.uid() = user_id);

-- ── 2. Secrets Vault ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS secrets (
  id                    UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID        REFERENCES auth.users(id) ON DELETE CASCADE,
  name                  TEXT        NOT NULL,
  type                  TEXT        NOT NULL DEFAULT 'generic',
  encrypted_value       TEXT        NOT NULL,
  rotation_reminder_days INT        NOT NULL DEFAULT 90,
  last_rotated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, name)
);
CREATE INDEX IF NOT EXISTS secrets_user_idx ON secrets(user_id);
ALTER TABLE secrets ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "secrets_self" ON secrets;
CREATE POLICY "secrets_self" ON secrets FOR ALL USING (auth.uid() = user_id);

-- ── 3. Webhooks ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS webhooks (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID        REFERENCES auth.users(id) ON DELETE CASCADE,
  url               TEXT        NOT NULL,
  events            TEXT[]      NOT NULL DEFAULT '{}',
  signing_secret    TEXT,
  is_active         BOOLEAN     NOT NULL DEFAULT true,
  last_triggered_at TIMESTAMPTZ,
  last_status_code  INT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS webhooks_user_idx ON webhooks(user_id);
ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "webhooks_self" ON webhooks;
CREATE POLICY "webhooks_self" ON webhooks FOR ALL USING (auth.uid() = user_id);

-- ── 4. Team Members ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS team_members (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_id      UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  email        TEXT        NOT NULL,
  display_name TEXT,
  role         TEXT        NOT NULL DEFAULT 'developer',
  status       TEXT        NOT NULL DEFAULT 'invited',
  invited_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  joined_at    TIMESTAMPTZ,
  UNIQUE(owner_id, email)
);
CREATE INDEX IF NOT EXISTS team_owner_idx ON team_members(owner_id);
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "team_owner_access" ON team_members;
CREATE POLICY "team_owner_access" ON team_members FOR ALL USING (auth.uid() = owner_id);

-- ── 5. Jobs ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS jobs (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  name            TEXT        NOT NULL,
  type            TEXT        NOT NULL DEFAULT 'scan',
  status          TEXT        NOT NULL DEFAULT 'scheduled',
  progress        INT         NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  connection_id   UUID,
  connection_name TEXT,
  selected_tables TEXT[]      DEFAULT '{}',
  rows_processed  INT         NOT NULL DEFAULT 0,
  findings_count  INT         NOT NULL DEFAULT 0,
  duration_ms     INT,
  cron_schedule   TEXT,
  is_paused       BOOLEAN     NOT NULL DEFAULT false,
  error_message   TEXT,
  logs            JSONB       NOT NULL DEFAULT '[]',
  started_at      TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS jobs_user_idx    ON jobs(user_id);
CREATE INDEX IF NOT EXISTS jobs_status_idx  ON jobs(status);
CREATE INDEX IF NOT EXISTS jobs_created_idx ON jobs(created_at DESC);
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "jobs_self" ON jobs;
CREATE POLICY "jobs_self" ON jobs FOR ALL USING (auth.uid() = user_id);

-- ── 6. Compliance States ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS compliance_states (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        REFERENCES auth.users(id) ON DELETE CASCADE,
  framework   TEXT        NOT NULL,
  items       JSONB       NOT NULL DEFAULT '[]',
  score       INT         NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, framework)
);
CREATE INDEX IF NOT EXISTS compliance_user_idx ON compliance_states(user_id);
ALTER TABLE compliance_states ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "compliance_self" ON compliance_states;
CREATE POLICY "compliance_self" ON compliance_states FOR ALL USING (auth.uid() = user_id);

-- ── 7. Platform Settings ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS platform_settings (
  user_id                   UUID    PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  platform_name             TEXT    NOT NULL DEFAULT 'Nexus Data Privacy',
  timezone                  TEXT    NOT NULL DEFAULT 'UTC',
  require_mfa               BOOLEAN NOT NULL DEFAULT false,
  ip_allowlist              TEXT,
  notify_scan_complete      BOOLEAN NOT NULL DEFAULT true,
  notify_critical_findings  BOOLEAN NOT NULL DEFAULT true,
  notify_job_failed         BOOLEAN NOT NULL DEFAULT true,
  data_retention_days       INT     NOT NULL DEFAULT 90,
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "settings_self" ON platform_settings;
CREATE POLICY "settings_self" ON platform_settings FOR ALL USING (auth.uid() = user_id);

-- ── Verify ───────────────────────────────────────────────────
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN (
    'api_keys','secrets','webhooks','team_members',
    'jobs','compliance_states','platform_settings'
  )
ORDER BY table_name;
