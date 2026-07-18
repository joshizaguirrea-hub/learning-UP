#  Bitácora del Proyecto — Learning UP

> Registro de todo lo hecho, para que nunca se te olvide cómo montaste esto.
> Autor: **Johsua Izaguirre** · Repo: https://github.com/joshizaguirrea-hub/learning-UP

---

##  ¿Qué es Learning UP?

App web **gratuita** para aprender inglés. Vanilla JavaScript (ES Modules) +
Supabase + PWA, con tema oscuro. Sin frameworks, sin bundlers.

---

##  Arquitectura (en capas, respetada al 100%)

| Carpeta | Rol | Regla |
|---------|-----|-------|
| `src/data/` | Datos puros (verbos, unidades, CEFR) | No importa de otras capas |
| `src/core/` | Lógica pura (SRS, práctica, tips, gamificación) | Solo importa de core/ o data/ |
| `src/services/` | I/O con Supabase y APIs | No importa de ui/ ni features/ |
| `src/ui/` | Presentación pura (DOM, iconos, router) | No importa de services/ ni features/ |
| `src/features/` | Vistas que orquestan todo | Puede importar cualquier capa |

**Auditoría de arquitectura:**  capas limpias, sin ciclos, archivos < 600 líneas.

---

##  Herramientas instaladas en la compu personal

| Herramienta | Para qué | Cómo verificar |
|-------------|----------|----------------|
| **Node.js** (v24) | Correr JavaScript fuera del navegador (tests, npm) | `node -v` |
| **Git** (v2.55) | Control de versiones + subir a GitHub | `git --version` |
| **Gemini CLI** (v0.50) | IA en la terminal (gratis, con cuenta Google) | `gemini.cmd --version` |
| **Python** | Servidor local para ver la app | `python --version` |

---

## ⌨ Chuleta de comandos (los que SÍ necesitas)

```powershell
# 1. Entrar al proyecto
cd $env:USERPROFILE\Documents\learning-UP

# 2. Ver qué hay en la carpeta
dir

# 3. Prender la app (déjala corriendo en su ventana)
python -m http.server 5500
#    Luego abre: http://127.0.0.1:5500/index.html   (¡OJO: http, sin la "s"!)

# 4. Llamar a la IA (en otra ventana de PowerShell)
gemini.cmd

# 5. Correr un test
node tests/verb-tips.test.mjs
```

### Guardar cambios en GitHub (tu respaldo en la nube)
```powershell
git add -A
git commit -m "describe lo que hiciste"
git push
```

### Traer cambios desde GitHub
```powershell
git pull
```

>  Con Gemini CLI no tienes que memorizar comandos: le hablas en español
> ("corre las pruebas", "guarda los cambios en git") y él los ejecuta.
> Cuando pida permiso para correr algo, responde con `2` (allow for this session).

---

##  Estado del proyecto (lo que quedó listo)

-  **Accesibilidad:** letra grande y responsiva (crece en monitores anchos),
  alto contraste, autoplay de audio.
-  **Verbos:** ejemplos B1-B2 reales, audio en cada forma (base/pasado/participio),
  "pops" de tips estilo iPhone (colapsables), generador de ejemplos y prácticas.
-  **Diccionario/traductor flotante** ES↔EN disponible en toda la app.
-  **Navegación** Siguiente/Devolverse; se marca "Aprendido" al completar prácticas.
-  **Tests de `core/` completos** y en verde (10 archivos en `tests/`).
-  **Todo respaldado en GitHub.**
-  **Repo hecho público** + **GitHub Pages activado**.

---

##  Publicación (GitHub Pages)

- Repo **público** en GitHub.
- **Pages** activado: rama `main`, carpeta `/ (root)`, HTTPS forzado.
- **Link público:**
  ```
  https://joshizaguirrea-hub.github.io/learning-UP/
  ```

###  Login en el link público —  RESUELTO (2026-07-12)
En **Supabase → Authentication → URL Configuration** quedó así:
- **Site URL:** `https://joshizaguirrea-hub.github.io/learning-UP/`
- **Redirect URLs** (2):
  ```
  https://joshizaguirrea-hub.github.io/learning-UP/
  http://127.0.0.1:5500/**   (comodín para pruebas locales)
  ```
**Verificado:** login funciona en el link público (perfil + XP + racha visibles).

---

##  Nota de seguridad

- La única llave en el código es la **anon/publishable key** de Supabase
  (`sb_publishable_...`) → **es pública y segura** para el navegador.
- **NUNCA** subas la `service_role` key al frontend.
- La seguridad real depende de tener **Row Level Security (RLS)** activo en
  las tablas de Supabase. →  CONFIRMADO: RLS habilitado + policies
  (`select/insert/update _own`) en las 9 tablas. Verificado en código y en
  la práctica (el usuario solo ve sus propios datos).

---

##  Pendientes / próximos pasos

- [x] ~~Ajustar URLs en Supabase (para el login en el link público).~~  (2026-07-12)
- [x] ~~Confirmar que RLS está activo en las tablas de Supabase.~~  (2026-07-12)
- [x] Tests E2E con Playwright: LISTOS Y EN VERDE (6/6, 2026-07-12) en `tests-e2e/`.
      Suite de flujos SIN login (home, login, registro, diccionario, guardia
      de rutas). FALTA correrlos en la compu personal (aqui no hay Node):
        npm install
        npm run e2e:install
        npm run test:e2e         (contra el sitio publico)
      Ver `tests-e2e/README.md`. Pendiente a futuro: tests CON login (cuenta
      de prueba de Supabase) y flujo de completar verbo.
      NOTA: la primera corrida cazó un BUG real (2026-07-12): los <label> de
      login/registro se descartaban por pasarse como attrs a el() -> formularios
      sin etiquetas (falla WCAG). Arreglado en src/ui/dom.js (el() tolerante) y
      src/features/auth-ui.js (call sites con {}). SW v0.25.1. Regla: SIEMPRE
      pasar {} como 2do arg de el() aunque no haya atributos.
- [ ] Enganchar medallas al perfil.
- [x] Enganchar medallas al perfil: vitrina de Medallas Bonus en /perfil (2026-07-12);
      logica pura bonusMedals() extraida a core/gamification (DRY). Logros quitados
      del dashboard (viven en /perfil). SW v0.26.1.
- [~] CURRICULO robusto A1 -> B1 (certificacion CEFR). Plan disenado en
      docs/PLAN-DE-ESTUDIO.md (60+ unidades). Produccion por lotes, cada unidad
      pasa el auditor (/calidad). **A1 (8), A2 (8), B1 (12), B2 (10), C1 (10)** =
      48 unidades. TODAS en el MODELO DESACOPLADO POR COMPETENCIA: 1 leccion =
      1 competencia (Reading/Vocabulary/Grammar/Writing) con contenido UNICO ->
      el % de dominio por competencia es independiente y real. Listening/Speaking
      quedan bloqueadas hasta audio/IA. Reproductor (lesson-player) muestra
      lectura/gramatica/glosario tambien en lecciones de practica (helpers DRY).
      Convencion de ids por unidad: prefijo corto por tema. Camino A1->C1 CERRADO.
      Falta a futuro: C2. SW v0.39.0.
- [~] CONTENIDO ENRIQUECIDO (peticion del usuario 2026-07): cada unidad pasa de
      ~16 a ~30 actividades, con 2 lecturas + 6 preguntas, 12 vocab + 8 ejercicios,
      gramatica ampliada + 8, y escritura guiada de 8 pasos. Estandar: work-career-b1.js.
      Progreso enriquecido: A1 8/8, A2 8/8, B1 12/12. Falta enriquecer B2, C1, y
      construir+enriquecer C2 (3/8). SW v0.51.0.
- [x] ARBOL CEFR CERRADO Y ENRIQUECIDO (2026-07): 56 unidades (A1 8, A2 8, B1 12,
      B2 10, C1 10, C2 8), TODAS enriquecidas a ~30 actividades y sin errores en el
      auditor. C2 nuevas: Critical analysis (do enfatico), Professional communication,
      Culture/humor & subtext (understatement), Debate mastery (concesion+refutacion),
      Capstone (repaso integrador). Curriculo A1->C2 100% completo y rico. SW v0.59.0.
- [ ] Más mazos de verbos (phrasal verbs, preposiciones).
- [ ] Diccionario offline (fallback sin red).
- [x] MEMORIA DE CONVERSACION en el chat de Bymax (2026-07-18, v0.126.0). Antes
      cada pregunta iba aislada (amnesia). Ahora el cliente (bymax-chat.js) guarda
      un array `history` [{role:'user'|'model', text}] y manda los turnos previos
      al Worker. El contexto de la leccion solo viaja en el 1er turno (ya vive en
      el historial despues -> ahorra tokens). Cap: 10 turnos (5 intercambios) en
      cliente; el Worker (handleChat) reconstruye `contents` multi-turno con
      guardrails: max 10 turnos, ~6000 chars totales (suelta los mas viejos),
      recorta textos a 1200 chars y asegura que empiece con turno 'user' (Gemini
      lo exige). RETROCOMPATIBLE: Worker viejo ignora `history` -> sigue funcionando
      sin memoria. IMPORTANTE: hay que REDESPLEGAR el Worker en Cloudflare
      (Edit code -> pegar bymax-worker.js -> Deploy) para que la memoria funcione.

---

##  Recap del día épico

De no saber qué era Node a tener:
Node + Git + Gemini CLI instalados · proyecto clonado y conectado a GitHub ·
tests completos y en verde · app corriendo en local · repo público · Pages activado.

**¡Gran trabajo, jefe!** 
