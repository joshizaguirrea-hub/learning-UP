-- =============================================================================
-- Migracion 006 — Politicas de BORRADO (DELETE) para reiniciar progreso
-- Plataforma de Idiomas (LinguaPath / Learning UP)
-- Idempotente. Ejecutar en el SQL Editor de Supabase.
--
-- PROBLEMA: course_progress y srs_cards tenian RLS con select/insert/update
-- pero NO delete. Sin politica DELETE, Supabase borra 0 filas EN SILENCIO
-- (sin error) -> el boton "Reiniciar progreso" no reiniciaba nada.
-- SOLUCION: permitir que cada usuario borre SOLO sus propias filas.
-- =============================================================================

drop policy if exists "cp_delete_own" on public.course_progress;
create policy "cp_delete_own" on public.course_progress
  for delete using (auth.uid() = user_id);

drop policy if exists "srs_delete_own" on public.srs_cards;
create policy "srs_delete_own" on public.srs_cards
  for delete using (auth.uid() = user_id);

-- =============================================================================
-- Fin de la migracion 006
-- =============================================================================
