/**
 * config/supabase.js — Cliente unico de Supabase.
 *
 * Este es el UNICO lugar donde viven las llaves publicas y se crea el cliente.
 * Solo se usa la ANON KEY (publica, segura para el navegador). La service_role
 * key JAMAS debe ponerse aqui ni en ningun archivo del frontend.
 *
 * Pasos para configurar (ver README.md):
 *   1. Crea un proyecto gratis en https://supabase.com
 *   2. Corre sql/001_users_profiles.sql en el SQL Editor.
 *   3. En Project Settings -> API copia la URL y la anon key.
 *   4. Pegalas abajo (o cargalas desde un config no versionado).
 */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// TODO: reemplazar por tus valores reales de Supabase.
export const SUPABASE_URL = "https://TU-PROYECTO.supabase.co";
export const SUPABASE_ANON_KEY = "TU-ANON-KEY-PUBLICA";

/** True si las credenciales ya fueron configuradas (para avisar en la UI). */
export const isConfigured =
  !SUPABASE_URL.includes("TU-PROYECTO") && !SUPABASE_ANON_KEY.includes("TU-ANON");

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
