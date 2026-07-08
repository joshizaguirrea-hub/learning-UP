-- =============================================================================
-- Migracion 001 — Usuarios y perfiles
-- Plataforma de Idiomas (LinguaPath)
--
-- Idempotente: se puede correr varias veces sin romper nada.
-- Ejecutar en el SQL Editor de Supabase.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Tipos (enums)
-- -----------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type user_role as enum ('student', 'teacher', 'admin');
  end if;
  if not exists (select 1 from pg_type where typname = 'cefr_level') then
    create type cefr_level as enum ('A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native');
  end if;
  if not exists (select 1 from pg_type where typname = 'kyc_status') then
    create type kyc_status as enum ('pending', 'approved', 'rejected');
  end if;
end$$;

-- -----------------------------------------------------------------------------
-- profiles: extiende auth.users (Supabase gestiona email/password)
-- -----------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text not null,
  role        user_role not null default 'student',
  created_at  timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- student_profiles
-- -----------------------------------------------------------------------------
create table if not exists public.student_profiles (
  user_id         uuid primary key references public.profiles(id) on delete cascade,
  native_language text,
  target_language text not null default 'en',
  cefr_level      cefr_level,            -- null hasta hacer el examen
  placement_done  boolean not null default false
);

-- -----------------------------------------------------------------------------
-- teacher_profiles
-- -----------------------------------------------------------------------------
create table if not exists public.teacher_profiles (
  user_id             uuid primary key references public.profiles(id) on delete cascade,
  country             text,
  bio                 text,
  teaches_language    text not null default 'en',
  max_cefr_level      cefr_level,        -- se asigna tras el examen de conocimiento
  hourly_rate         numeric(10,2),
  rating_avg          numeric(3,2) not null default 0,
  kyc_status          kyc_status not null default 'pending',
  knowledge_exam_done boolean not null default false
);

-- -----------------------------------------------------------------------------
-- Row Level Security (RLS): cada quien ve/edita solo lo suyo.
-- -----------------------------------------------------------------------------
alter table public.profiles          enable row level security;
alter table public.student_profiles  enable row level security;
alter table public.teacher_profiles  enable row level security;

-- profiles: el dueno puede leer y editar su fila; puede insertarla al registrarse.
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- student_profiles: dueno lee/inserta/edita lo suyo.
drop policy if exists "student_select_own" on public.student_profiles;
create policy "student_select_own" on public.student_profiles
  for select using (auth.uid() = user_id);

drop policy if exists "student_insert_own" on public.student_profiles;
create policy "student_insert_own" on public.student_profiles
  for insert with check (auth.uid() = user_id);

drop policy if exists "student_update_own" on public.student_profiles;
create policy "student_update_own" on public.student_profiles
  for update using (auth.uid() = user_id);

-- teacher_profiles: dueno lee/inserta/edita lo suyo.
-- (En Fase 2, los estudiantes podran LEER perfiles de profesores verificados.)
drop policy if exists "teacher_select_own" on public.teacher_profiles;
create policy "teacher_select_own" on public.teacher_profiles
  for select using (auth.uid() = user_id);

drop policy if exists "teacher_insert_own" on public.teacher_profiles;
create policy "teacher_insert_own" on public.teacher_profiles
  for insert with check (auth.uid() = user_id);

drop policy if exists "teacher_update_own" on public.teacher_profiles;
create policy "teacher_update_own" on public.teacher_profiles
  for update using (auth.uid() = user_id);

-- =============================================================================
-- Fin de la migracion 001
-- =============================================================================
