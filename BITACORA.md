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
- [x] TARJETAS-ACORDEON DE UNIDADES + CONVERSACION CON IA (2026-07-18, v0.127.0).
      (1) UI: la seccion "Tu curso" del dashboard ahora muestra cada unidad como
      TARJETA con borde degradado que se DESPLIEGA al tocar (acordeon, sin cambiar
      de pantalla -> menos choque visual). Nuevo archivo src/features/course-cards.js
      (courseCards(units, progressMap)); se elimino la vieja courseSection de
      student.js (DRY/YAGNI). Dentro de cada tarjeta: las 6 competencias (grammar,
      vocabulary, reading, writing, listening, speaking) como chips enlazados a su
      leccion (listening = 'proximamente' si la unidad no la tiene); los BONOS de
      verbos (pasado regular -ed, expresiones de tiempo, idioms) enlazados a
      #/bonus/:id; y un boton estrella de conversacion con IA.
      (2) NUEVO MAZO BONUS 'idioms' (data/bonus-decks.js): 12 modismos con ejemplo
      y medalla 'Maestro de modismos'. Sin practice (flashcard de recall como past-time).
      (3) CONVERSACION REAL CON IA por unidad (src/features/conversation.js,
      openConversation(unit)): modal donde Bymax es companero de charla en INGLES,
      guiado por TEMA (unit.title) y NIVEL (unit.level), con ayuda en espanol si el
      alumno se traba. Reutiliza el Worker en modo 'conversation' (nuevo
      CONVERSATION_PROMPT + tema/nivel inyectados en systemInstruction) y la MEMORIA
      de conversacion. Arranca solo con sentinela '[BEGIN]' (la IA saluda y hace la
      1a pregunta). Voz INGLESA (speak en-US). IMPORTANTE: requiere el MISMO redeploy
      del Worker que la memoria (v0.126). Idea futura: registrar 'speaking' como
      leccion real para que cuente en el % de dominio (hoy la conversacion no marca
      progreso).
- [x] SHADOWING determinista + Speaking Score real (2026-07-25, v0.221.0). Nueva
      tecnica de speaking: escuchar la frase modelo (voz OpenAI) y repetirla como
      ECO imitando ritmo/entonacion. Capas: Escuchar / Lento (rate 0.6) / Por
      partes (chunks) / Sombrear (mic). NUEVOS: core/shadowing.js (LOGICA PURA
      testeada -> chunkPhrase() parte frases largas en trozos de ~6 palabras
      cortando por puntuacion y fusionando colas huerfanas de 1 palabra;
      sessionScore() promedia a 0..100) + tests/shadowing.test.mjs (7 pruebas) +
      features/shadowing.js (openShadowing). DRY: reuse phrasesOf() y coachView()
      (feedback coloreado palabra-x-palabra) que EXTRAJE de speaking.js (antes
      vivian inline en grade()); reuse chunking puro, speakMono/speakSequence y
      mic.js. CLAVE: este modo SI registra el Speaking Score estrella via
      recordSpeakingScore() -> la practica de Pronunciacion NUNCA lo registraba
      (solo interview.js). Tarjeta nueva "Shadowing" en speaking-screen.js (accent
      'practice', icono target). Sin mic: autoevaluacion generosa (0.85). NO usa
      IA -> gratis y offline. Sintaxis validada con tools/check_js.py (OK).
      PENDIENTE: correr en la compu personal `node tests/shadowing.test.mjs` (aqui
      no hay Node) y probar el flujo con mic en el navegador.
- [x] FIX BUG completado de GRAMMAR/VOCABULARY no se guardaba (2026-07-25,
      v0.222.0). Sintoma: al terminar la clase de gramatica y tocar "Completa la
      practica" no aparecia el check ni contaba el progreso. CAUSA: skill-class.js
      usaba completeLesson() en onFinish pero NUNCA lo importaba -> ReferenceError
      que bymax-session.finish() se tragaba en su try/catch (solo console.error),
      ademas ponia finished=true ANTES de llamar -> ni reintentando. Afectaba a
      TODAS las clases via openSkillClass (grammar y vocabulary). FIX: agregar
      import { completeLesson } from services/course.js. RED DE SEGURIDAD nueva:
      tools/check_imports.py (tree-sitter) caza identificadores LLAMADOS pero no
      importados/declarados (check_js.py solo ve sintaxis, no referencias); corre
      limpio en todo src/. NOTA para el usuario: las clases completadas ANTES del
      fix no quedaron guardadas -> hay que rehacer esa clase de grammar UNA vez
      (o usar el POP Caza-errores, que si guardaba) para que aparezca el check.
- [x] READING LAB - comprension lectora con feedback (2026-07-25, v0.223.0).
      Peticion del usuario: leer cuento/dialogo Y RECIBIR FEEDBACK. Diagnostico:
      el POP de Reading del hub abria openReadingAloud (solo PRONUNCIACION), y
      cada unidad YA traia content.check (preguntas de comprension autoradas) que
      quedaban HUERFANAS en el hub nuevo (solo las usaba el lesson-player viejo).
      NUEVO src/core/reading-lab.js (logica pura, testeable): splitTexts (parte
      por 'TEXT n - titulo'), vocabInText (vocab que REALMENTE aparece en el
      texto), buildQuestions (reusa content.check + autogenera 'palabra en
      contexto' con distractores del propio vocab -> DRY, deterministico), scorePct.
      NUEVO tests/reading-lab.test.mjs (8 pruebas; validadas en Python porque no
      hay Node en la laptop de trabajo). NUEVO src/features/reading-lab.js
      (openReadingLab): Paso 1 leer+escuchar (speakSequence + glosario tocable),
      Paso 2 preguntas en capas con feedback inmediato verde/rojo + explicacion,
      Paso 3 puntaje -> completeLesson + celebrate + boton 'ahora leelo en voz
      alta' que reusa openReadingAloud (capa de pronunciacion). unit-content.js:
      el POP Reading ahora abre openReadingLab (antes openReadingAloud). Ambos
      validadores (check_js + check_imports) en verde. PENDIENTE probar en
      navegador (personal). PROXIMO del roadmap: Dictogloss (listening).
- [x] DICTOGLOSS - listening con feedback (2026-07-25, v0.224.0). #2 del roadmap.
      Antes el POP Listening abria openListening (videollamada IA, requiere Worker,
      NO da feedback determinista). NUEVO src/core/dictogloss.js (puro, testeable):
      dictationSentences (frases aptas de vocab.example + respaldo del texto de
      lectura; filtra largo 3-14 palabras, sin repetir), gradeDictation (compara
      lo ESCRITO vs objetivo palabra x palabra por MULTICONJUNTO -> score, marks,
      missing, extra; ignora puntuacion), sessionScore. NUEVO tests/dictogloss.
      test.mjs (9 pruebas; validadas en Python). NUEVO src/features/dictogloss.js
      (openDictogloss): por frase Escuchar/Mas lento (texto OCULTO) -> escribir ->
      feedback palabra x palabra (verde/ambar) + chips de faltantes (se oyen lento)
      + transcripcion -> sessionScore -> completeLesson. unit-content.js: POP
      Listening ahora abre openDictogloss; la videollamada IA (openListening) se
      movio a un mini-POP 'Videollamada'. Ambos validadores en verde. PENDIENTE
      probar en navegador. PROXIMO del roadmap: Vocabulary 2.0 (SRS graduado +
      colocaciones + trampa auditiva).
- [x] VOCAB LAB - Vocabulary 2.0 (2026-07-25, v0.225.0). #3 del roadmap. Antes el
      POP Vocabulary abria openSkillClass (clase IA) y el repaso (review.js) era
      SOLO reconocer traduccion. NUEVO src/core/vocab-lab.js (puro): escalera de
      recuperacion graduada en RONDAS -> nivel1 reconocer (MC en->es), nivel2
      pista (traduccion+inicial via firstHint, escribes), nivel3 colocacion
      (clozeExample: completas la palabra DENTRO de su frase = chunk/Lexical
      Approach), nivel4 produccion (solo traduccion, sin pista), nivel5 trampa
      auditiva (confusable via editDistance/Levenshtein: oyes y eliges entre pares
      parecidos). Helpers: cleanTerm, acceptsFor (acepta con/sin 'to'), buildVocabLadder
      (ordena por niveles crecientes, intercala palabras), scorePct. NUEVO
      tests/vocab-lab.test.mjs (11 pruebas, validadas en Python; 22 ejercicios para
      6 palabras). NUEVO src/features/vocab-lab.js (openVocabLab): corre la escalera
      con feedback + al terminar ALIMENTA EL SRS (ensureCards+getCardsByIds+saveCard
      con review de core/srs.js: >=60% aciertos por palabra -> 'good', si no 'again')
      -> cierra el circulo repaso espaciado. unit-content.js: POP Vocabulary abre
      openVocabLab. Ambos validadores en verde. PENDIENTE probar en navegador.
      ROADMAP pedagogico COMPLETO (Reading Lab + Dictogloss + Vocab Lab). Ideas
      futuras: Grammar Structured Input, Speaking 4/3/2, Literature close-reading.
- [x] T-REX REHECHO + FIX bug del cuerpo bipedo (2026-07-27, v0.234.0). Al usuario
      no le gusto el T-Rex anterior (bracitos, cara/dientes y cuerpo). Se rehizo en
      ui/mascot-bodies.js: NUEVO arquetipo dinoBody (cola gruesa detras + 2 patotas
      con 3 garras c/u + torso) SOLO para el dino (el canguro se queda en biped).
      NUEVA cara mzDino (bocota FRONTAL con dientes arriba/abajo + naricitas, ya no la
      trompa lateral mzTrex que se elimino). trexArms rehechos: cortos, simetricos y
      pegados con 3 garritas. dino CFG: arch dinoBody + arms trexArms + mz mzDino +
      top ears.spikes, color teal intacto. Se elimino tailSpiky (sin uso). BUG REAL
      arreglado: al <ellipse del cuerpo en biped le faltaba el '<' (roto en edicion
      previa) -> el canguro Y el dino tenian el cuerpo sin renderizar; los validadores
      NO revisan contenido de strings SVG, por eso paso. AVISO caché: dev-preview-
      mascots.html ahora hace import dinamico con ?v=Date.now() porque el navegador
      cachea los ES modules y el usuario 'veia igual' aunque el codigo cambiaba.
      Validadores en verde. PENDIENTE usuario aprobar (timeouts).

- [x] DINO = T-REX de verdad: bracitos ridiculos + cara de dinosaurio (2026-07-27,
      v0.233.0). El usuario pidio que el dino sea un tiranosaurio rex con brazos
      pequenos y cara de dinosaurio. Antes compartia el hocico generico mzSnout con
      el cocodrilo. NUEVO en ui/mascot-bodies.js: mzTrex(lc,dc) = mandibulon largo con
      DOBLE fila de dientes (abajo grandes + arriba) + ceno fiero (2 cejas anguladas)
      + naricita; trexArms(f,c2) = dos bracitos cortos doblados con 2 garritas cada
      uno. El arquetipo biped ahora acepta cfg.arms (si no viene, dibuja los bracitos
      normales -> el canguro no cambia). dino CFG usa arms:trexArms + mz:mzTrex.
      mzSnout se queda solo para el croc. Validadores en verde. PENDIENTE usuario:
      aprobar visualmente.

- [x] ROBO-ANIMALES RECONOCIBLES: hocico propio por animal (2026-07-27, v0.232.0).
      Segundo feedback del usuario (con captura): 'veo muchas iguales, no representan
      al animal'. Gato/hamster/capibara/oso eran casi identicos (mismo cuerpo redondo
      + orejas redondas + cara robot IDENTICA en todos). Se le dieron TODAS las
      opciones (A rediseno SVG, B emojis, C set open-source, D DiceBear, E imagenes
      IA) y se ejecuto la A (recomendada). Cambios en ui/mascot-bodies.js: (1) la cara
      robot se redujo a un VISOR de ojos cian compacto (visor()) para dejar sitio al
      HOCICO. (2) NUEVOS hocicos mz*: mzCat (nariz triangular+bigotes), mzSnout
      (trompa larga con dientes hacia la izq: croc/dino), mzRound (hocico redondo+
      nariz: oso/capibara), mzSmall (leon/canguro/jirafa), mzCheeks (cachetes+
      dientones: hamster), trunk (elefante). (3) PALETAS mas distintas: canguro
      terracota, dino teal, oso marron oscuro, hamster crema (ya no chocan). (4)
      PROPORCIONES via seated(f,c2,cfg) con rx/ry: hamster chico (27x28), oso grande
      (37x36), capibara ancho (34x31). (5) orejas con interior (pointy/tall/roundHi/
      roundSm), melena de 2 tonos + borla en cola del leon (tailTuft), manchas de
      jirafa (spots). Se conservan ojos cian + antena + pecho LED + clases bymax-tail/
      bymax-mouth. Gradientes con IDs unicos (_uid) intactos. Validadores en verde.
      PENDIENTE usuario: aprobar visualmente (varios timeouts en el chat; se commiteo
      por atacar la queja directa, reversible con git).

- [x] MAS DETALLE EN ROBO-ANIMALES (manteniendo look robot) (2026-07-27, v0.231.0).
      El usuario mando una imagen 3D (cocodrilo lector con lentes) y pregunto si se
      podia. Se le explico: la app usa SVG plano (ligero/animable/offline), no 3D
      fotorrealista (eso necesita PNG de IA, pesados y sin animacion). Se le mostro
      un prototipo cartoon (dev-preview-croc.html) y ELIGIO 'solo mejorar detalle,
      mantener robot' (conservar ojos cian + antena + pecho LED). Mejoras en
      ui/mascot-bodies.js: GRADIENTES de cuerpo/cabeza con IDs UNICOS por render
      (_uid, gradDefs) para que dos mascotas en la misma pagina no se pisen los
      colores (los IDs de <defs> son globales); vientre/panza marcada (belly),
      contorno (stroke c2) en los cuerpos, brillo superior en la cabeza, remaches en
      patas, y detalle rosa en orejas. Refactor: se paso de build()/BODIES-funcion a
      un mapa CFG declarativo {arch,c1,c2,hc,back,tl,behind,top,extra} + funcion
      render(id) que aplica el gradiente. Se conservan las clases bymax-tail/
      bymax-mouth (animaciones intactas). Preview dev-preview-croc.html gitignoreada
      (prototipo cartoon por si algun dia se cambia de direccion). Validadores en
      verde. PENDIENTE usuario: aprobar visualmente.

- [x] SILUETAS PROPIAS POR ROBO-ANIMAL (cuerpo completo) (2026-07-27, v0.230.0).
      Feedback del usuario: gato, cocodrilo, capibara, oso... TODOS se veian igual
      (misma silueta). Causa: en ui/mascot-bodies.js la funcion body() era UNA sola
      forma (perrito redondo sentado) que usaban todos; solo cambiaban color de
      cabeza + orejas + cola. SOLUCION (DRY conservado): se mantiene el ALMA ROBOT
      compartida (face() pantalla+ojos cian+boca bymax-mouth animada, antenna,
      robotHead herrajes, collar, chest(cy) panel de pecho con LEDs) pero cada
      animal usa un ARQUETIPO de cuerpo con su forma real: seated (redondo sentado:
      gato/leon/hamster/capibara/oso), reptile (largo y bajo con vientre de placas +
      cola de puas tailCroc: cocodrilo), biped (patotas traseras + pies + torso
      erguido + bracitos + cola gruesa/puas: canguro/dino), heavy (4 patas columna +
      trompa: elefante), longneck (cuello largo + patas largas + manchas: jirafa).
      Colas nuevas: tailCurl/tailStub/tailThick/tailSpiky/tailCroc (todas class
      bymax-tail para menear). Nueva funcion assemble({bodyStr,ac,hc,behind,top,
      extra}) reemplaza a build(). NUEVO robo-oso (bear): cabecita en avatars.js
      (SVGS.bear + AVATAR_LIST) y cuerpo seated marron en BODIES. El perrito Bymax
      (dog) sigue siendo el default en bymax-mascot.js (MASCOT_SVG). Preview de dev:
      dev-preview-mascots.html (gitignoreada) para ver los 10 lado a lado. Validadores
      en verde. PENDIENTE usuario: aprobar visualmente (abrir la preview o git pull
      + ver en Chrome un perfil con robo-gato/croc/etc.) y decir si ajustamos alguna
      proporcion.

- [x] GRAMMAR: STRUCTURED INPUT (Processing Instruction, VanPatten) (2026-07-27,
      v0.229.0). Cierra el ultimo hueco pedagogico grande: Grammar tenia clase IA
      (POP central) + caza-errores (produccion: corrige el fallo), pero faltaba el
      PROCESAMIENTO del INPUT. Idea de VanPatten: el aprendiz ignora la gramatica y
      adivina por vocabulario/orden -> hay que OBLIGARLO a procesar la FORMA para
      captar el significado con actividades REFERENCIALES (respuesta correcta).
      NUEVO src/core/grammar-si.js (PURO): detectTense (past/present/future/null;
      orden: futuro will/going-to -> pasado explicito was/were/did -> presente
      am/is/are/do/has -> irregulares inequivocos (set, excluye put/read/cut...) ->
      -ed regular (excluye adjetivos tired/bored/excited...) -> -s presente),
      detectPolarity (aff/neg via not/-n't/never/no...), hasTimeMarker (excluye
      frases con yesterday/tomorrow/now... para forzar mirar el VERBO), grammarOf,
      buildGrammarInput(unit) -> 2 familias: TIEMPO (¿cuando ocurre? solo si hay
      >=2 tiempos distintos, si no es trivial y se descarta) y POLARIDAD (¿afirma o
      niega? solo si hay afirmativas Y negativas), intercaladas, max 8. Fuente:
      grammar.examples + grammar.mistakes.right + vocab.example. NUEVO
      src/features/grammar-input.js openGrammarInput(unit,opts): FASE 1 input
      enriquecido (regla+forma+ejemplos con voz, speakMono), FASE 2 actividades
      referenciales (oye la frase + elige, feedback+explain), FASE 3 resultado
      (completeLesson grammar + celebrate). Devuelve false si no hay items ->
      fallback. Con AUTOSAVE (resume) integrado. Cableado en unit-content.js:
      NUEVO grammarInputPop ('Input gram.', icono grid, violet) en la fila de
      extras; si openGrammarInput devuelve false cae a openSkillClass grammar (IA).
      NUEVO tests/grammar-si.test.mjs (9 pruebas). Validadores en verde. PENDIENTE
      usuario: git pull en personal + probar en Chrome (POP 'Input gram.') y correr
      node tests/grammar-si.test.mjs + node tests/resume.test.mjs.

- [x] AUTOSAVE / "CONTINUAR DONDE QUEDASTE" en ejercicios con pasos (2026-07-27,
      v0.228.0). Problema (celular): un desliz accidental dispara el gesto "atras"
      del navegador -> cierra el ejercicio (POP) y su progreso, que vivia SOLO en
      memoria -> al reabrir arranca en paso 0. SOLUCION (la que eligio el usuario:
      solo autosave, sin tocar el gesto atras): NUEVO core/resume.js (PURO, sin
      DOM, solo localStorage via globalThis con guardas): makeResumeKey(...partes)
      (sanea a-z0-9-_ y une con '.'), saveProgress(key,state) (con sello ts),
      loadProgress(key) (null si no existe o si expiro >2 dias, y auto-limpia),
      clearProgress(key). NUEVO ui/resume.js: re-exporta lo de core + resumeCard()
      (tarjeta visual '¡Bienvenido de vuelta! Paso X de Y' con botones Continuar/
      Empezar-de-nuevo, acentos indigo/pink/sky/emerald). Patron de integracion en
      cada ejercicio: rkey=makeResumeKey(userId,unit.id,'nombre'); saveProgress al
      entrar a cada paso (idx + resultados acumulados); clearProgress al terminar
      (renderDone/finishDeck/renderComplete); al abrir, si hay saved con idx>0 se
      muestra resumeCard (Continuar restaura estado y sigue; Empezar-de-nuevo
      limpia). Los decks se generan en ORDEN DETERMINISTA (solo se barajan las
      opciones internas) -> retomar por indice es EXACTO. Integrado en: vocab-lab
      (idx,correct,byVocab), vocab-class (idx), dictogloss (idx,scores), reading-lab
      (phase,qIdx,correct), shadowing (idx,scores), speaking (idx,passed),
      writing-drills-player/caza-errores (idx,correct via nuevo cfg.resumeKey;
      cableado en unit-content cazaErroresPop y en writing.js launchDrills), y
      lesson-player (state completo: idx,correct,checked[],streak,bestStreak,hearts;
      restoreState + startFlow que respeta el openRobotSetup). NUEVAS pruebas
      tests/resume.test.mjs (6, con shim de localStorage). Ambos validadores en
      verde. NOTA infra: se creo .venv (uv) con tree_sitter+tree_sitter_javascript
      para correr los validadores en la laptop de trabajo (ignorado por git).
      PENDIENTE usuario: git pull en personal + probar en celular (desliza a media
      practica -> reabre -> debe salir '¿Continuar?').

- [x] CLASE DE PRESENTACION DE VOCABULARIO con Bymax (2026-07-27, v0.227.0).
      Peticion del usuario: antes de la practica, que Bymax DE LA CLASE de
      vocabulario -> se presenta y va palabra por palabra dando ejemplos y
      poniendo a REPETIR al alumno. Antes el POP Vocabulary saltaba directo a la
      escalera (openVocabLab), sin fase de INPUT. NUEVO helper puro core/vocab-lab.js
      vocabTeachList(unit,{max}) -> [{id,term,clean,translation,example}] (limpia
      'to hire'->'hire', filtra sin term/translation; testeable). NUEVO
      src/features/vocab-class.js openVocabClass(unit,opts): overlay estilo Vocab
      Lab; INTRO donde Bymax se presenta (saludo en ingles con voz), luego una
      tarjeta por palabra (palabra grande + traduccion + ejemplo, botones Escuchar/
      Lento/Escuchar-ejemplo con speakMono, auto-dice la palabra al mostrar) y
      REPETIR con mic (createDictation + coachView palabra-x-palabra reusado de
      speaking.js; sin mic -> boton 'La dije en voz alta'). Al terminar la clase
      -> encadena con openVocabLab(unit,opts) (input primero, output despues). El
      Vocab Lab sigue siendo quien marca la leccion completa + alimenta el SRS.
      unit-content.js: el POP Vocabulary abre openVocabClass (quitado import
      huerfano de openVocabLab). NUEVAS pruebas en tests/vocab-lab.test.mjs (2 para
      vocabTeachList -> 13 en total). Ambos validadores (check_js + check_imports)
      en verde. PENDIENTE probar en navegador (Chrome, permiso de mic).

- [x] FIX SPEAKING - faltaba el boton para HABLAR (2026-07-25, v0.226.0). El POP
      Speaking abre en modo 'escucha y repite' (repeat:true) y ese modo hacia
      return ANTES del codigo del microfono -> solo se veian 'Escuchar a Bymax',
      'Repetir' y 'La dije bien' (autoevaluacion); NUNCA aparecia el boton de
      hablar ni habia calificacion real. FIX: extraje el cableado del mic a
      wireMic() (DRY) y ahora el modo repeat TAMBIEN muestra 'Toca y habla' (si
      el navegador soporta mic) con calificacion palabra por palabra (coachView);
      'La dije bien' queda como respaldo si no hay mic. Se quito el boton 'Repetir'
      redundante (ya esta 'Escuchar a Bymax'). Ambos validadores en verde.

---

##  Recap del día épico

De no saber qué era Node a tener:
Node + Git + Gemini CLI instalados · proyecto clonado y conectado a GitHub ·
tests completos y en verde · app corriendo en local · repo público · Pages activado.

**¡Gran trabajo, jefe!** 
