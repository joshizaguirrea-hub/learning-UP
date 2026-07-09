-- =============================================================================
-- Migracion 003 — Progreso del curso (unidades/lecciones) y tarjetas SRS
-- Plataforma de Idiomas (LinguaPath)
-- Idempotente. Ejecutar en el SQL Editor de Supabase DESPUES de 002.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- course_progress: estado de cada leccion del curso por estudiante.
-- lesson_id es TEXTO (ids del catalogo en src/data/units, ej. 'wc-l1').
-- -----------------------------------------------------------------------------
create table if not exists public.course_progress (
  user_id      uuid not null references public.profiles(id) on delete cascade,
  lesson_id    text not null,
  status       text not null default 'pending',  -- pending | done
  score        int,
  completed_at timestamptz,
  primary key (user_id, lesson_id)
);

-- -----------------------------------------------------------------------------
-- srs_cards: una tarjeta de repaso espaciado por (usuario, vocab).
-- vocab_id es TEXTO (ids del catalogo, ej. 'wc-1').
-- -----------------------------------------------------------------------------
create table if not exists public.srs_cards (
  user_id    uuid not null references public.profiles(id) on delete cascade,
  vocab_id   text not null,
  ease       numeric(4,2) not null default 2.5,
  interval   int not null default 0,
  reps       int not null default 0,
  due        date not null default current_date,
  created_at timestamptz not null default now(),
  primary key (user_id, vocab_id)
);
create index if not exists idx_srs_due on public.srs_cards(user_id, due);

-- -----------------------------------------------------------------------------
-- Row Level Security: cada estudiante gestiona solo lo suyo.
-- -----------------------------------------------------------------------------
alter table public.course_progress enable row level security;
alter table public.srs_cards       enable row level security;

drop policy if exists "cp_select_own" on public.course_progress;
create policy "cp_select_own" on public.course_progress
  for select using (auth.uid() = user_id);
drop policy if exists "cp_insert_own" on public.course_progress;
create policy "cp_insert_own" on public.course_progress
  for insert with check (auth.uid() = user_id);
drop policy if exists "cp_update_own" on public.course_progress;
create policy "cp_update_own" on public.course_progress
  for update using (auth.uid() = user_id);

drop policy if exists "srs_select_own" on public.srs_cards;
create policy "srs_select_own" on public.srs_cards
  for select using (auth.uid() = user_id);
drop policy if exists "srs_insert_own" on public.srs_cards;
create policy "srs_insert_own" on public.srs_cards
  for insert with check (auth.uid() = user_id);
drop policy if exists "srs_update_own" on public.srs_cards;
create policy "srs_update_own" on public.srs_cards
  for update using (auth.uid() = user_id);

-- =============================================================================
-- Fin de la migracion 003
-- =============================================================================
