-- =============================================================================
-- Migracion 002 — Examenes de ubicacion y planes de estudio
-- Plataforma de Idiomas (LinguaPath)
-- Idempotente. Ejecutar en el SQL Editor de Supabase DESPUES de 001.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- placement_attempts: cada intento de examen de ubicacion de un estudiante.
-- -----------------------------------------------------------------------------
create table if not exists public.placement_attempts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  cefr_result cefr_level not null,
  correct     int not null default 0,
  total       int not null default 0,
  details     jsonb,                     -- desglose por nivel/competencia
  created_at  timestamptz not null default now()
);
create index if not exists idx_placement_user on public.placement_attempts(user_id);

-- -----------------------------------------------------------------------------
-- study_plans: el plan vigente del estudiante (uno activo a la vez).
-- -----------------------------------------------------------------------------
create table if not exists public.study_plans (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  from_level   cefr_level not null,
  target_level cefr_level not null,
  created_at   timestamptz not null default now()
);
create index if not exists idx_plan_user on public.study_plans(user_id);

-- -----------------------------------------------------------------------------
-- plan_modules: los modulos que componen un plan.
-- -----------------------------------------------------------------------------
create table if not exists public.plan_modules (
  id          uuid primary key default gen_random_uuid(),
  plan_id     uuid not null references public.study_plans(id) on delete cascade,
  order_no    int not null,
  level       cefr_level not null,
  skill       text not null,
  title       text not null,
  status      text not null default 'pending',  -- pending | in_progress | done
  created_at  timestamptz not null default now()
);
create index if not exists idx_module_plan on public.plan_modules(plan_id);

-- -----------------------------------------------------------------------------
-- Row Level Security: cada estudiante ve/gestiona solo lo suyo.
-- -----------------------------------------------------------------------------
alter table public.placement_attempts enable row level security;
alter table public.study_plans        enable row level security;
alter table public.plan_modules       enable row level security;

-- placement_attempts
drop policy if exists "attempts_select_own" on public.placement_attempts;
create policy "attempts_select_own" on public.placement_attempts
  for select using (auth.uid() = user_id);
drop policy if exists "attempts_insert_own" on public.placement_attempts;
create policy "attempts_insert_own" on public.placement_attempts
  for insert with check (auth.uid() = user_id);

-- study_plans
drop policy if exists "plans_select_own" on public.study_plans;
create policy "plans_select_own" on public.study_plans
  for select using (auth.uid() = user_id);
drop policy if exists "plans_insert_own" on public.study_plans;
create policy "plans_insert_own" on public.study_plans
  for insert with check (auth.uid() = user_id);
drop policy if exists "plans_delete_own" on public.study_plans;
create policy "plans_delete_own" on public.study_plans
  for delete using (auth.uid() = user_id);

-- plan_modules: se accede a traves del plan del dueno.
drop policy if exists "modules_select_own" on public.plan_modules;
create policy "modules_select_own" on public.plan_modules
  for select using (
    exists (select 1 from public.study_plans p
            where p.id = plan_id and p.user_id = auth.uid())
  );
drop policy if exists "modules_insert_own" on public.plan_modules;
create policy "modules_insert_own" on public.plan_modules
  for insert with check (
    exists (select 1 from public.study_plans p
            where p.id = plan_id and p.user_id = auth.uid())
  );
drop policy if exists "modules_update_own" on public.plan_modules;
create policy "modules_update_own" on public.plan_modules
  for update using (
    exists (select 1 from public.study_plans p
            where p.id = plan_id and p.user_id = auth.uid())
  );

-- =============================================================================
-- Fin de la migracion 002
-- =============================================================================
