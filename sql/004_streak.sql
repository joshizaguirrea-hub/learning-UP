-- =============================================================================
-- Migracion 004 — Racha diaria (habito) en el perfil del estudiante
-- LinguaPath. Idempotente. Ejecutar en el SQL Editor de Supabase.
-- =============================================================================

alter table public.student_profiles
  add column if not exists streak int not null default 0;

alter table public.student_profiles
  add column if not exists last_active date;

-- Nota: las politicas RLS existentes de student_profiles ya permiten al dueno
-- leer/actualizar su fila, asi que no se requieren politicas nuevas.

-- =============================================================================
-- Fin de la migracion 004
-- =============================================================================
