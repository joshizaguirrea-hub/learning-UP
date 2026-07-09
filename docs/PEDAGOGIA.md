# Diseno Curricular — LinguaPath

> Como construimos un CURSO de verdad, no lecciones sueltas. Basado en metodos
> con evidencia cientifica y en estandares profesionales (MCER/CEFR).

---

## 1. Principios pedagogicos (el "por que")

1. **Organizar por TEMAS, no por competencias sueltas.** Cada unidad gira en
   torno a una situacion real (viajes, trabajo, salud) e integra gramatica,
   vocabulario, lectura, listening, writing y speaking.
2. **Objetivos "can-do" (MCER).** Cada unidad declara que podras HACER:
   ej. "Puedo pedir comida en un restaurante y preguntar por ingredientes."
3. **Task-Based Learning.** El corazon de cada unidad es una tarea real.
4. **Ciclo de leccion PPP:** Presentacion (input con contexto) -> Practica
   (controlada, con feedback) -> Produccion (uso libre / tarea).
5. **Repeticion espaciada (SRS)** para vocabulario y estructuras clave.
6. **Recuperacion activa e interleaving:** ejercicios que obligan a recordar y
   mezclan temas (no bloques monotonos).
7. **Feedback inmediato y explicado:** el porque de cada respuesta.
8. **Progreso por maestria:** se avanza al demostrar dominio, no por click.
9. **Micro-learning:** lecciones de 5-10 min con una meta clara.

---

## 2. Arquitectura del contenido

```
Idioma (en)
 └─ Nivel MCER (A1..C2)
     └─ Unidad tematica  (ej. "B1 - Travel & Plans")
         ├─ Objetivos can-do  ["Puedo reservar un hotel", ...]
         ├─ Vocabulario clave (entra al SRS)
         ├─ Puntos de gramatica
         └─ Lecciones (ciclo PPP)
             └─ Actividades (variadas, ver seccion 3)
         └─ Tarea final (TBL) + mini-examen de unidad (maestria)
```

Una **unidad** es la unidad de valor real. Un curso de nivel = 8-12 unidades.

---

## 3. Tipos de actividad (mas alla de la opcion multiple)

Todas auto-corregibles y GRATIS de construir (sin IA):

| Tipo | Que hace | Habilidad |
|---|---|---|
| **Flashcard SRS** | Tarjeta palabra<->significado con repaso espaciado | Recordar vocab |
| **Cloze (rellenar hueco)** | Completar la palabra que falta en una frase | Produccion guiada |
| **Word bank** | Ordenar palabras para formar una frase correcta | Sintaxis |
| **Matching** | Emparejar palabra-definicion o inicio-fin de frase | Asociacion |
| **Opcion multiple** | Elegir la correcta (con feedback explicado) | Reconocer |
| **Dictado/Listening** | Escribir lo que oyes (requiere audio) | Listening* |
| **Traduccion** | ES<->EN en ambas direcciones | Produccion |
| **Speaking / Writing** | Producir lengua (correccion por IA) | Produccion* |

*Listening/Speaking se activan en fase con audio/IA (patrocinio). El resto ya.

---

## 4. Repeticion espaciada (SRS) — la joya innovadora

Cada palabra/estructura aprendida entra a un sistema tipo Anki (algoritmo SM-2
simplificado):

- Cada item tiene: `ease`, `interval` (dias), `due_date`, `repetitions`.
- Al repasar, el estudiante califica su recuerdo (Otra vez / Dificil / Bien / Facil).
- El sistema reprograma el proximo repaso. Los que fallas vuelven pronto; los
  que dominas se espacian (dias -> semanas -> meses).
- Un panel "Repasar hoy" muestra los items `due`. Esto es lo que hace que el
  conocimiento PERDURE (y da un habito diario, tipo racha).

Se implementa 100% gratis: logica pura en `core/srs.js` + tabla en Supabase.

---

## 5. Gamificacion y motivacion (atada a maestria real)

- **XP** por actividad completada; **racha** diaria (repaso SRS).
- **Maestria de unidad:** barra que sube al aprobar el mini-examen (>=80%).
- **Objetivos can-do** que se van "desbloqueando" (sensacion de logro real).
- Sin trucos vacios: la gamificacion refuerza el habito, no lo reemplaza.

---

## 6. Modelo de datos (Supabase) — propuesto

```
units            (id, language, level, order, title, cando[])
vocab_items      (id, unit_id, term, translation, example)
lessons          (id, unit_id, order, title, phase)         # phase: present|practice|produce
activities       (id, lesson_id, order, type, payload jsonb) # payload segun tipo
user_progress    (user_id, activity_id, status, score)
srs_cards        (user_id, vocab_item_id, ease, interval, due_date, reps)
```

El contenido (units/lessons/activities/vocab) vive versionado en `src/data/`
como catalogo, y el PROGRESO del usuario en Supabase.

---

## 7. Estrategia de construccion: "vertical slice"

No autoramos 12 unidades de golpe. El metodo profesional:

1. **Construir UNA unidad completa y excelente** (ej. "B1 - Travel & Plans")
   con su ciclo PPP, 4-5 tipos de actividad, vocab en SRS y tarea final.
2. Validar la experiencia y el patron tecnico.
3. **Escalar**: replicar el patron para las demas unidades (solo agregar datos).

Asi definimos el "estandar de calidad" con una unidad y luego producimos rapido.

---

## 8. Roadmap de contenido

- **Paso A:** motor SRS (`core/srs.js`) + tipos de actividad (`core/activities.js`).
- **Paso B:** una unidad vertical completa (datos + UI del ciclo PPP).
- **Paso C:** panel "Repasar hoy" (SRS) + XP/racha.
- **Paso D:** escalar unidades por nivel; luego listening/speaking con patrocinio.

_Ultima actualizacion: 2026-07-06 · Autor: Horus (doctor en idiomas honorario)_

---

## 9. UN SOLO viaje (fusion de "plan" y "curso")

**Problema detectado:** conviven dos sistemas paralelos y confusos:
- "Tu plan de estudio" (modulos por competencia: Gramatica-B1, Vocabulario-B1...).
- "Tu curso" (unidades tematicas).

**Decision:** hay UN solo camino. La **unidad tematica** es la unidad de aprendizaje.
El viejo "plan por competencias" se **absorbe**: cada unidad ya cubre las 6
competencias en su ciclo. El dashboard muestra un unico "Mi ruta": la secuencia
de unidades del nivel, con progreso y maestria. El plan por modulos sueltos se
retira (o se degrada a un "mapa de nivel" de solo lectura).

```
Examen -> nivel MCER -> RUTA = [Unidad 1, Unidad 2, ... Unidad N]
  cada Unidad: Aprende -> Practica -> Produce -> Repasa (SRS) -> Examen de maestria
  al dominar todas las unidades del nivel -> subes de nivel (+ certificado)
```

## 10. El modelo de contenido que ENSENA (fase "Aprende")

Hoy tenemos Practica/Produce/Repasa, pero falta lo que de verdad ENSENA: el
**input comprensible**. Cada leccion de tipo "present" (o una fase "learn" nueva)
debe entregar material para consumir ANTES de practicar:

- **Explicacion clara** con ejemplos (ya existe, se enriquece).
- **Lectura o dialogo nivelado** (comprensible input, i+1) con glosario.
- **Presentacion de vocabulario** (termino + traduccion + ejemplo + [audio]).
- **Nota cultural / de uso** (cuando aplica).
- (Con patrocinio) **audio** del dialogo y **video** corto.

Estructura de datos propuesta para la fase Aprende:
```
lesson.phase = "learn"
lesson.content = {
  reading: "texto nivelado...",
  glossary: [{term, translation}],
  keyPhrases: ["..."],
  note: "nota de uso/cultural"
}
```

## 11. Como se CAPTA/produce el contenido a escala

1. **Ahora (gratis):** autoria manual con plantilla de alta calidad (1 unidad
   excelente = molde). Recursos educativos abiertos (OER/dominio publico) para
   lecturas. NUNCA scrapear competidores.
2. **Con patrocinio:** generacion asistida por **IA** (lecciones, lecturas,
   ejemplos, audio TTS) + curaduria humana. Este es el gran acelerador de escala.
3. **Comunidad:** profesores verificados aportan y curan contenido.

## 12. El diferenciador (agregado unico)

Nadie junta en un solo lugar y gratis:
- Curriculo real MCER + **input comprensible** rico, +
- **SRS** (repaso espaciado, retencion real), +
- **Maestria** (avanzas al dominar), +
- **Plan persistente** que te sigue entre **profesores humanos** con bitacora
  compartida (esto casi nadie lo hace bien), +
- Gratis primero, pago solo para profesores/certificado.

> Posicionamiento: "un tutor completo + Anki + Busuu + profesores humanos, en uno".

_Ultima actualizacion (v2): 2026-07-06 · Autor: Horus_
