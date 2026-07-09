-- =============================================================================
-- Migracion 005 — Perfil enriquecido + registro de dias activos (heatmap)
-- LinguaPath. Idempotente. Ejecutar en el SQL Editor de Supabase.
-- =============================================================================

-- 1) Campos nuevos del perfil de estudiante -----------------------------------
alter table public.student_profiles
  add column if not exists bio text,
  add column if not exists native_language text,
  add column if not exists country text,
  add column if not exists goal_reason text,
  add column if not exists daily_goal int not null default 1,
  add column if not exists target_level text,
  add column if not exists best_streak int not null default 0;

-- 2) Tabla de dias activos (para el mapa de calor de actividad) ----------------
create table if not exists public.activity_days (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null,
  count int not null default 1,
  primary key (user_id, day)
);

alter table public.activity_days enable row level security;

-- Politicas: cada quien ve y escribe SOLO sus propios dias.
drop policy if exists "activity_days_select_own" on public.activity_days;
create policy "activity_days_select_own" on public.activity_days
  for select using (auth.uid() = user_id);

drop policy if exists "activity_days_insert_own" on public.activity_days;
create policy "activity_days_insert_own" on public.activity_days
  for insert with check (auth.uid() = user_id);

drop policy if exists "activity_days_update_own" on public.activity_days;
create policy "activity_days_update_own" on public.activity_days
  for update using (auth.uid() = user_id);

-- =============================================================================
-- Fin de la migracion 005
-- =============================================================================
