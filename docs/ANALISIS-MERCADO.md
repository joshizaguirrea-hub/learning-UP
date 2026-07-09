# Analisis de Mercado — Apps de Aprendizaje de Idiomas

> Investigacion competitiva para LinguaPath: que hacen las mejores apps y QUE
> podemos adaptar (priorizando lo GRATIS de construir en nuestro stack).
>
> **Aviso:** elaborado con conocimiento del mercado (hasta ~2024-2025), sin
> scraping en vivo (firewall). Verificar precios/features actuales en las webs
> oficiales antes de decisiones finales. Nunca copiar contenido con derechos:
> nos inspiramos en MECANICAS y UX, no en material propietario.

---

## 1. Panorama del mercado (segmentos)

| Segmento | Que resuelve | Ejemplos |
|----------|--------------|----------|
| Gamificado masivo | Habito diario, autoaprendizaje | Duolingo, Memrise, Mondly |
| Basado en curriculo | Estructura seria, dialogos utiles | Babbel, Busuu, LingoDeer |
| Inmersion | "Piensa en el idioma" | Rosetta Stone |
| Audio-first | Escucha/habla en el camino | Pimsleur, Language Transfer |
| Tutores humanos (marketplace) | Practica real 1a1 | italki, Preply, Cambly, Lingoda |
| SRS / vocabulario | Retencion de palabras | Anki, Memrise, Drops, Clozemaster |
| Intercambio / social | Hablar con nativos | Tandem, HelloTalk |
| IA de conversacion (nuevo) | Practicar hablar sin verguenza | Speak, ELSA, Falou, Duolingo Max |
| Lectura graduada | Input comprensible | Beelinguapp, LingQ, Readlang |

---

## 2. Analisis por app (fortaleza + feature estrella + que adaptar)

### Duolingo (lider gamificado)
- **Fortaleza:** habito diario, onboarding adictivo, marca.
- **Feature estrella:** rachas (streak), XP, ligas/leaderboards, "corazones",
  arbol/camino de lecciones, notificaciones inteligentes.
- **Negocio:** freemium + Super (sin anuncios) + Duolingo Max (IA: "Explain my
  answer", "Roleplay").
- **QUE ADAPTAR (gratis):** el **camino/mapa** (ya lo tenemos), **rachas
  diarias**, **XP y ligas semanales**, feedback "explica mi respuesta" (ya lo
  hicimos con `explain`). Debilidad suya: poca profundidad gramatical y poco
  "hablar real" -> ahi ganamos con profesores + gramatica seria.

### Babbel (curriculo practico)
- **Fortaleza:** dialogos utiles para la vida real, explicaciones claras,
  nivelado por CEFR.
- **Feature estrella:** lecciones cortas tematicas + repaso; notas culturales;
  reconocimiento de voz para pronunciacion.
- **Negocio:** suscripcion (sin free tier grande).
- **QUE ADAPTAR:** dialogos situacionales realistas, **notas culturales** (ya
  tenemos "nota de uso"), lecciones de 10-15 min con objetivo claro.

### Busuu (curriculo + social)
- **Fortaleza:** cursos CEFR completos + **correccion por la comunidad** de
  nativos; certificados (McGraw Hill).
- **Feature estrella:** subes tu escritura/audio y NATIVOS te corrigen; plan de
  estudio personalizado; certificados oficiales.
- **QUE ADAPTAR:** **correccion por la comunidad** (encaja con nuestro chat de
  companeros/profesores), **certificado por nivel** (ya en roadmap), plan
  personalizado.

### Memrise
- **Fortaleza:** vocabulario con **videos de nativos reales** diciendo frases.
- **Feature estrella:** "Learn with locals" (clips cortos de nativos), SRS,
  mnemotecnia.
- **QUE ADAPTAR:** clips cortos de nativos (con patrocinio/UGC), mnemotecnia en
  el glosario, SRS (ya lo tenemos).

### Rosetta Stone
- **Fortaleza:** inmersion total (sin traducciones), pronunciacion (TruAccent).
- **QUE ADAPTAR:** modo inmersion opcional (imagen->palabra sin traduccion),
  emparejar palabra-imagen (nuevo tipo de actividad, gratis).

### Pimsleur / Language Transfer
- **Fortaleza:** audio, escucha activa, construccion oral guiada.
- **Feature estrella:** lecciones de audio de ~30 min; recuerdo graduado.
- **QUE ADAPTAR:** lecciones de **audio** (con TTS gratis del navegador),
  dictado, shadowing.

### italki / Preply / Cambly / Lingoda (tutores humanos)
- **Fortaleza:** practica real con profesores; marketplace.
- **Feature estrella:** italki = agenda + reseñas; Preply = matching; Cambly =
  hablar al instante; Lingoda = clases grupales con "sprint" (reto con reembolso).
- **QUE ADAPTAR (nuestro Fase 2):** agenda/reservas, ranking de profesores,
  **bitacora compartida** entre profesores (nuestro diferenciador), clases
  grupales por nivel, "sprint" gamificado.

### Anki / Clozemaster / Drops
- **Fortaleza:** retencion pura. Anki = SRS SM-2; Clozemaster = huecos en frases
  reales; Drops = vocabulario visual con juego de 5 min.
- **QUE ADAPTAR:** ya tenemos SRS (SM-2) y cloze. Sumar **Drops-style**: sesion
  rapida de vocabulario visual con limite de tiempo; **Clozemaster**: huecos con
  frases de corpus real.

### Speak / ELSA / Falou (IA de conversacion y pronunciacion)
- **Fortaleza:** hablar con IA sin verguenza; ELSA puntua tu **pronunciacion**
  fonema a fonema.
- **Feature estrella:** roleplays con IA, feedback de pronunciacion.
- **QUE ADAPTAR (con patrocinio / o gratis parcial):** Speaking con
  reconocimiento de voz del navegador (Web Speech API = GRATIS) para practicar
  hablar; roleplays con IA cuando haya presupuesto.

### Beelinguapp / LingQ / Readlang (lectura graduada)
- **Fortaleza:** leer historias con texto paralelo (bilingue), tocar palabra
  para traducir y guardarla al SRS.
- **QUE ADAPTAR:** **lector graduado**: historias por nivel, tocar palabra para
  ver traduccion y mandarla al SRS. GRATIS de construir y muy potente (input
  comprensible). Encaja perfecto con nuestra fase "Aprende".

### Tandem / HelloTalk (intercambio)
- **Fortaleza:** chatear/llamar con nativos; correccion en el chat.
- **QUE ADAPTAR:** nuestro **Chat** con companeros del mismo nivel + correccion
  inline (ya esta como pagina base).

### Mondly / LingoDeer
- **Mondly:** chatbot, AR/VR, lecciones diarias. **LingoDeer:** excelente para
  idiomas asiaticos (gramatica bien explicada).
- **QUE ADAPTAR:** LingoDeer nos recuerda cuidar la **explicacion gramatical**
  seria (nuestra fortaleza vs Duolingo).

---

## 3. Tendencias clave del mercado (2024-2025)

1. **IA conversacional** (Duolingo Max, Speak): practicar hablar con un tutor IA.
2. **Feedback explicado por IA** ("explain my answer").
3. **Pronunciacion automatica** (ELSA) fonema a fonema.
4. **Video corto de nativos** (Memrise, TikTok-style learning).
5. **Gamificacion profunda** (rachas, ligas, misiones, cofres).
6. **SRS como estandar** para vocabulario.
7. **Lectura/escucha graduada** (input comprensible) en auge.
8. **Certificados** y alineacion CEFR como sello de seriedad.
9. **Marketplaces de tutores** creciendo (practica humana real).

---

## 4. Que YA tenemos vs. el mercado

| Capacidad | Estado en LinguaPath |
|-----------|----------------------|
| Camino/mapa de niveles | LISTO (Mi Plan) |
| SRS (repaso espaciado) | LISTO |
| Actividades variadas (opcion/huecos/ordenar/emparejar) | LISTO |
| Feedback explicado ("por que") | LISTO |
| Gramatica seria + notas de uso | LISTO |
| Nivelado por CEFR + examen de ubicacion | LISTO |
| Plan por competencia segun nivel | LISTO |
| Auditor de calidad de contenido | LISTO (unico, casi nadie lo tiene) |
| Rachas diarias / XP / ligas | PARCIAL (XP si; falta racha/ligas) |
| Lectura graduada (tocar palabra -> SRS) | FALTA (alto valor, gratis) |
| Audio / Listening | FALTA (gratis con TTS) |
| Speaking (voz) | FALTA (gratis con Web Speech API) |
| Emparejar palabra-imagen / modo inmersion | FALTA (gratis) |
| Tutores humanos (agenda, reservas, ranking) | FALTA (Fase 2, base lista) |
| Chat con profesor/companeros | FALTA (base lista) |
| Certificados por nivel | FALTA (roadmap) |
| Correccion por comunidad | FALTA (idea Busuu) |
| IA (roleplay, correccion de escritura/voz) | FALTA (con patrocinio) |

---

## 5. Recomendaciones priorizadas (que adaptar y cuando)

### Quick wins GRATIS (alto impacto, bajo costo) — hacer primero
1. **Rachas diarias + XP visible + metas** (motor de habito, estilo Duolingo).
2. **Listening con TTS del navegador** (Web Speech API): dictado y escucha de
   dialogos. Desbloquea la competencia Listening sin costo.
3. **Speaking con Web Speech API** (reconocimiento de voz): repetir frases y
   comparar. Desbloquea Speaking basico sin costo.
4. **Lector graduado** (estilo Beelinguapp/LingQ): historias por nivel, tocar
   palabra -> traduccion -> guardar al SRS. Potencia la fase "Aprende".
5. **Nuevos tipos de actividad:** emparejar palabra-IMAGEN, y cloze con frases
   reales (Clozemaster-style).

### Medio plazo (base ya existe)
6. **Ligas/leaderboards** semanales (comparacion social, motivacion).
7. **Chat** funcional con companeros del mismo nivel + correccion inline.
8. **Marketplace de profesores** (Fase 2): agenda, reservas, ranking, bitacora.

### Con patrocinio (cuesta dinero: IA/servidores)
9. **Roleplays con IA** y **"explica con IA"** dinamico (Duolingo Max).
10. **Pronunciacion fonema a fonema** (estilo ELSA) con API de voz.
11. **Video de nativos** (Memrise) via UGC de profesores.
12. **Certificados oficiales** por alianza (Cambridge/Pearson).

---

## 6. Nuestro diferenciador (posicionamiento)

Nadie junta TODO esto, gratis primero y en un solo lugar:

- **Curriculo CEFR serio** (como Babbel/Busuu) +
- **SRS** (como Anki) +
- **Input comprensible / lectura graduada** (como LingQ) +
- **Gramatica bien explicada** (como LingoDeer) +
- **Tutores humanos con BITACORA COMPARTIDA** (mejor que italki/Preply: el
  profesor ve tu plan y tu historial, hay continuidad entre profesores) +
- **Auditor de calidad de contenido** (transparencia que nadie ofrece).

> Frase de posicionamiento: "Un tutor completo + Anki + Busuu + profesores
> humanos con memoria compartida, en una sola app, gratis para empezar."

---

## 7. Riesgos y aprendizajes del mercado

- **Duolingo** demuestra que la gamificacion retiene, pero se le critica poca
  profundidad -> nosotros: gamificacion CON profundidad (gramatica + humanos).
- **Marketplaces** sufren el problema del huevo y la gallina (sin profes no hay
  alumnos y viceversa) -> arrancar con contenido self-service fuerte (ya lo
  hacemos) y sumar profes despues.
- **IA** engancha pero cuesta -> activarla con patrocinio; mientras, exprimir lo
  GRATIS del navegador (TTS + reconocimiento de voz).
- **Legal:** jamas copiar frases/lecciones con derechos; usar contenido propio,
  dominio publico u OER.

---

_Ultima actualizacion: 2026-07-06 · Autor: Horus (analisis competitivo)._
_Fuente: conocimiento de mercado; verificar datos vigentes en webs oficiales._
