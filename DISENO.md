#  Plataforma de Aprendizaje de Idiomas — Documento de Diseño

> **Versión:** 0.3 (diseño de negocio cerrado)
> **Fecha:** 2026-07-06
> **Autor:** Johsua Izaguirre + Horus 
> **Alcance del MVP:** Inglés primero (arquitectura lista para multi-idioma)
> **Nombre provisional del producto:** _(por definir — ideas al final)_

---

## 0. Índice

1. [Visión y objetivo](#1-visión-y-objetivo)
2. [Análisis de mercado y competencia](#2-análisis-de-mercado-y-competencia)
3. [Metodología pedagógica](#3-metodología-pedagógica)
4. [Roles y actores del sistema](#4-roles-y-actores-del-sistema)
5. [Funcionalidades por rol](#5-funcionalidades-por-rol)
6. [El examen de ubicación (MCER/CEFR)](#6-el-examen-de-ubicación-mcercefr)
7. [El plan de estudio personalizado](#7-el-plan-de-estudio-personalizado)
8. [El marketplace de profesores](#8-el-marketplace-de-profesores)
9. [Modelo de negocio y monetización](#9-modelo-de-negocio-y-monetización)
10. [Políticas, legal y seguridad](#10-políticas-legal-y-seguridad)
11. [Modelo de datos (entidades)](#11-modelo-de-datos-entidades)
12. [Arquitectura técnica](#12-arquitectura-técnica)
13. [Roadmap por fases](#13-roadmap-por-fases)
14. [Riesgos y mitigaciones](#14-riesgos-y-mitigaciones)
15. [Decisiones tomadas](#15-decisiones-tomadas)
16. [Decisiones aún pendientes](#16-decisiones-aún-pendientes)

---

## 1. Visión y objetivo

**Objetivo único y medible:** _Que el estudiante realmente aprenda el idioma_ (medido por
avance de nivel MCER, no por horas consumidas).

**Propuesta de valor diferencial:**

> Un **plan de estudio único basado en examen de ubicación (MCER)** que persiste entre
> profesores gracias a una **bitácora compartida** + una **IA asistente** que rellena los
> huecos. El estudiante nunca "empieza de cero" al cambiar de profesor y siempre sabe
> exactamente dónde está y qué sigue.

Modalidades de aprendizaje que combina la plataforma:

-  **Online (PC y celular)** — responsive / PWA.
-  **Libros online** interactivos por nivel.
-  **Audios** (listening, pronunciación, podcasts nivelados).
-  **Prácticas** auto-corregibles (gramática, vocabulario, SRS).
-  **Exámenes** de nivel y de progreso.
-  **IA asistente** (tutor 24/7, corrección de writing/speaking).
-  **Profesor humano** (clases 1-a-1 por video, opcional y de pago).

---

## 2. Análisis de mercado y competencia

**Tamaño de mercado:** EdTech de idiomas ≈ **$60 mil millones/año**, en crecimiento
sostenido. Hay pastel de sobra.

| Plataforma | Fortaleza | Debilidad (nuestra oportunidad) |
|---|---|---|
| **Preply / italki** | Marketplace de profes, agenda, ranking | Sin currículo propio ni examen serio ni IA guía |
| **Duolingo** | Gamificación, IA (Max) | Sin profesores humanos ni certificación seria |
| **Busuu** | Cursos MCER + corrección comunidad | Profesores limitados, no es marketplace |
| **Cambly** | Conversación con nativos on-demand | Sin plan estructurado ni examen formal |
| **Babbel** | Cursos estructurados por nivel | Sin profesores ni marketplace |
| **Lingoda** | Currículo + certificado MCER | Precios fijos, sin IA potente |

**Posicionamiento:** somos "**italki/Preply + Busuu + Duolingo Max**" en un solo lugar,
unidos por el plan MCER persistente + IA. Nadie clava esa combinación hoy.

---

## 3. Metodología pedagógica

### Estándar de niveles (obligatorio)
- **MCER / CEFR:** A1, A2, B1, B2, C1, C2 — estándar internacional, sirve para todos los idiomas.
- **Japonés:** además mapear a **JLPT** (N5→N1).

### Metodologías con evidencia científica
1. **Communicative Language Teaching (CLT)** — aprender usando el idioma.
2. **Task-Based Learning (TBL)** — tareas reales (reservar hotel, escribir email).
3. **Comprehensible Input (Krashen, i+1)** — contenido un pelín arriba del nivel actual.
4. **Spaced Repetition (SRS)** — repaso espaciado (tipo Anki) para vocabulario → aquí brilla la IA.
5. **4 competencias siempre balanceadas:** Listening, Speaking, Reading, Writing.
   - Speaking es donde fallan las apps → lo cubren la IA + los profesores humanos.

### Principio rector
Todo contenido y todo examen se **etiqueta con un nivel MCER y una competencia**, para que
el plan adaptativo y la IA puedan razonar sobre el progreso del estudiante.

---

## 4. Roles y actores del sistema

| Rol | Descripción |
|---|---|
| **Estudiante** | Se registra, hace examen de ubicación, sigue plan, opcionalmente contrata profe |
| **Profesor** | Se registra + KYC, hace examen de conocimiento, recibe nivel máximo que puede enseñar, gestiona agenda y cobros |
| **Administrador** | Modera contenido, verifica documentos de profesores, gestiona políticas, techos de cobro, disputas |
| **IA Asistente** | Tutor virtual: guía el plan, corrige writing/speaking, responde dudas 24/7 |

---

## 5. Funcionalidades por rol

###  Estudiante
- Registro / login / perfil.
- **Examen de ubicación** adaptativo → nivel MCER.
- **Plan de estudio** auto-generado y personalizado.
- Acceso a contenido: libros online, audios, prácticas, exámenes.
- **IA asistente** para estudiar solo.
- **Buscar y reservar profesor** (ver disponibilidad, costo, rating).
- **Bitácora / progreso** personal (visible y compartible con profes).
- Calificar al profesor tras la sesión.
- Gestión de suscripción y pagos.

###  Profesor
- Registro + **KYC**: subir títulos universitarios, foto, identidad, país, edad.
- **Examen de conocimiento** → asigna nivel máximo que puede enseñar.
  - Ej.: si saca "principiante" solo enseña A1-A2; si saca "nativo/C2" enseña a cualquiera.
- Definir **disponibilidad (agenda)** y **tarifa** (bajo el techo permitido).
- Recibir **solicitudes de clase**.
- Acceder al **plan de trabajo y bitácora** del estudiante para retomar donde quedó.
- Registrar **bitácora de la sesión** al terminar (para continuidad entre profes).
- Ver ranking / calificaciones propias.
- Gestión de cobros y **payouts**.

###  Administrador
- Verificar documentos KYC de profesores.
- Moderar contenido y clases (anti-acoso).
- Configurar **techos de cobro** por nivel.
- Gestionar disputas y reembolsos.
- Panel de métricas del negocio.

---

## 6. El examen de ubicación (MCER/CEFR)

**Requisitos:** fácil de entender + norma internacional + preciso.

- **Adaptativo (CAT — Computerized Adaptive Testing):** si aciertas sube dificultad, si
  fallas baja. Menos preguntas, más precisión, menos fatiga.
- Evalúa las **4 competencias**:
  - Reading / Listening / Grammar-Vocab → auto-corregible (opción múltiple, drag&drop).
  - Writing / Speaking → corrección por **IA** (+ validación opcional de profesor).
- **Resultado:** nivel MCER (A1-C2) + desglose por competencia + **plan auto-generado**.

> **Nota:** el MISMO motor de examen sirve para el examen de conocimiento del profesor
> (con un umbral más alto y una prueba de didáctica adicional).

---

## 7. El plan de estudio personalizado

A partir del resultado del examen:

1. Se determina el **nivel de entrada** y las competencias más débiles.
2. Se genera una **secuencia de módulos** (lecciones, audios, prácticas, exámenes de
   progreso) ordenados por el principio i+1.
3. El plan es **persistente y trackeable**: cada actividad completada actualiza el progreso.
4. El estudiante decide **cómo avanzar** en cada tramo:
   - Solo (autoaprendizaje).
   - Con la **IA asistente**.
   - Con un **profesor humano** (reserva puntual o recurrente).
5. La **bitácora** registra todo lo hecho, sin importar la vía → cualquier profe puede
   retomar "en tiempo y forma".

---

## 8. El marketplace de profesores

Flujo de reserva:
1. Estudiante ve profesores **elegibles para su nivel** (filtro por nivel máximo del profe).
2. Ve **disponibilidad (agenda)**, **costo** (bajo el techo) y **rating**.
3. Agenda cita → al profesor le llega la **solicitud**.
4. El profesor accede al **plan + bitácora + historial de clases** del estudiante.
5. Se realiza la clase (video).
6. El profesor llena la **bitácora de la sesión**.
7. El estudiante **califica** al profesor.

**Libertad del estudiante:** puede tomar clases con el profesor que guste en cualquier
momento — la bitácora garantiza la continuidad.

###  Recomendación sobre el "techo de cobro"
Un techo duro y único ahuyenta a los mejores profes (se van a italki). Mejor:
- **Techo escalonado por nivel del profesor + rating** (un C2 con 5⭐ puede cobrar más).
- El techo evita abusos pero premia la calidad y retiene talento.

---

## 9. Modelo de negocio y monetización

**Fuentes de ingreso:**
1. **Suscripción de estudiante** (contenido + IA + material) → ingreso recurrente predecible.
2. **Comisión (fee) del marketplace** por cada clase con profesor → el músculo del negocio.
3. **Certificados de nivel** (mucha gente paga por el papel).
4. **B2B / planes empresariales** y clases grupales (futuro).

** Riesgo #1: el problema del huevo y la gallina.** Sin profes no llegan alumnos y
viceversa. Estrategia de arranque: **sembrar** con un puñado de profesores curados
(quizás pagados/con fee reducido al inicio) en 1 solo idioma y 1 nicho.

**Rentabilidad de referencia:** Preply (+$120M levantados), italki (rentable), Duolingo
(en bolsa). El modelo funciona; la ejecución es lo difícil.

---

## 10. Políticas, legal y seguridad

| Área | Requisito mínimo |
|---|---|
| **Anti-acoso** | Grabación de clases 1-a-1, botón de reporte/pánico, moderación, expulsión |
| **Pagos** | Escrow / retención hasta completar clase; reembolsos; payouts internacionales (Stripe Connect) |
| **Legal** | Términos y condiciones, contrato profesor-plataforma, cumplimiento fiscal por país |
| **Edad** |  Menores <18 activan COPPA/GDPR-K → consentimiento parental, grabación obligatoria, controles extra. **Decisión clave: ¿aceptamos menores en el MVP?** |
| **Protección de datos** | GDPR / privacidad, cifrado de documentos KYC, borrado a solicitud |
| **KYC profesores** | Validación de títulos + video-entrevista (los PDFs se falsifican fácil) |

---

## 11. Modelo de datos (entidades)

```
User            (id, email, password_hash, role, created_at, ...)
 ├─ StudentProfile (user_id, native_lang, target_langs, cefr_level, plan_id)
 └─ TeacherProfile (user_id, bio, country, birthdate, max_cefr_level,
                    hourly_rate, rating_avg, kyc_status, verified)

KycDocument     (id, teacher_id, doc_type, file_url, status)

Language        (id, code, name)                # en, pt, de, ja, fr
CefrLevel       (id, code)                       # A1..C2 (+ JLPT map)

Exam            (id, type, language_id)          # placement | knowledge | progress
Question        (id, exam_id, skill, cefr_level, type, payload, answer_key)
ExamAttempt     (id, user_id, exam_id, score, cefr_result, taken_at)

StudyPlan       (id, student_id, language_id, current_cefr, created_at)
PlanModule      (id, plan_id, order, title, skill, cefr_level, status)
ContentItem     (id, type, cefr_level, skill, language_id, url/body)
                # type: book | audio | practice | exam

Booking         (id, student_id, teacher_id, scheduled_at, status,
                 price, plan_module_id)
SessionLog      (id, booking_id, notes, topics_covered, next_steps)  # bitácora
Availability    (id, teacher_id, weekday, start, end)

Review          (id, booking_id, student_id, teacher_id, rating, comment)
Subscription    (id, user_id, plan_type, status, period_end)
Payment         (id, user_id, amount, type, status, provider_ref)
```

---

## 12. Arquitectura técnica

```
┌─ Estudiante ──────────┐   ┌─ Profesor ────────────┐
│ Registro/Login        │   │ Registro + KYC docs   │
│ Examen ubicación      │   │ Examen conocimiento   │
│ Plan personalizado    │   │ Nivel asignado        │
│ Contenido/audios      │   │ Agenda/disponibilidad │
│ IA asistente          │   │ Ver plan del alumno   │
│ Reservar profesor     │   │ Bitácora de sesión    │
│ Bitácora/progreso     │   │ Cobros/payouts        │
└───────────┬───────────┘   └───────────┬───────────┘
            └──────── MARKETPLACE ───────┘
       (agenda · pagos · ranking · video · políticas)
```

**Stack propuesto (MVP):**
- **Backend:** Python + **FastAPI** (ideal para lógica de matching + APIs de IA).
- **Frontend:** **HTMX + Tailwind** (responsive/PWA); migrable a React si crece.
- **DB:** **SQLite** para prototipo → **PostgreSQL** en producción.
- **Auth:** sesiones/JWT + hashing seguro de contraseñas.
- **Video:** integrar proveedor externo (no reinventar Zoom).
- **Pagos:** **Stripe Connect** (soporta payouts a profesores internacionales).
- **IA:** **AI Innovation Lab / AI Launchpad** de Walmart para los LLMs.
- **Accesibilidad:** WCAG 2.2 AA obligatorio.

---

## 13. Roadmap por fases

###  Fase 1 — MVP (inglés, A1–B1)
- Registro/login estudiante + profesor.
- Examen de ubicación adaptativo (banco de preguntas inicial).
- Generación de plan personalizado.
- Dashboard por rol.
- Contenido básico (lecciones + audios + prácticas) para A1-B1.

###  Fase 2 — Marketplace
- Perfil de profesor + KYC + examen de conocimiento.
- Agenda/disponibilidad + reservas + bitácora + reviews.
- Pagos (Stripe Connect) + techo de cobro escalonado.
- Video-clase integrada.

###  Fase 3 — IA + escala
- IA asistente (tutor, corrección writing/speaking, SRS).
- Certificados de nivel.
- Multi-idioma (pt, de, ja, fr).
- App móvil / PWA pulida, B2B, analítica.

---

## 14. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Huevo y la gallina (2-sided market) | Sembrar profesores curados, empezar en 1 nicho |
| Fuga de mejores profes por techo de cobro | Techo escalonado por nivel + rating |
| Falsificación de títulos | KYC real + video-entrevista |
| Legal por menores | Definir política de edad en MVP; grabación + consentimiento |
| Producir contenido de 5 idiomas × 6 niveles | Empezar SOLO inglés A1-B1 |
| Costos de IA | Usar AI Launchpad; cachear; SRS reduce llamadas |
| Seguridad en video 1-a-1 | Grabación + moderación + botón de pánico |

---

## 15. Decisiones tomadas

1. **Menores de edad:** MVP = **solo 18+** (registro confirma mayoría de edad).
   - Justificación: el riesgo legal real está en la interacción humana 1-a-1 por video
     con menores (COPPA / GDPR-K / protección infantil). Patrón de la industria:
     italki/Preply exigen 18+; Open English separó un producto aparte (**Open English
     Junior**) para niños, con registro/pago del tutor y ambiente cerrado.
   - **Fase futura:** posible producto "Junior" separado (copiar playbook de Open English
     Junior) cuando haya tracción y presupuesto legal. El freemium con IA (sin profe
     humano) podría abrirse antes a menores con cuenta creada por el tutor.

2. **Modelo de suscripción:** **Freemium + mensual de pago**, en 3 tiers:
   - **Free:** plan de estudio + contenido + IA **con límite** (ej. X mensajes/correcciones
     por día/mes). **Sin certificado.**
   - **Premium mensual:** IA ilimitada + **certificados** + **acceso a profesores**.
   - **(Futuro) Pro / Empresas:** packs de clases, reportes, grupos.
   - **Certificados/títulos = solo de pago** (gancho de conversión).
   - **Pendiente menor:** ¿clases con profe incluidas en el mensual o pagadas aparte?
     Recomendación: **aparte** al inicio (más simple + más margen); packs incluidos luego.
   - **Ojo:** limitar la IA en el free para que el costo de IA no se coma el margen.

3. **Techo de cobro:** **ESCALONADO por nivel del profesor + bonus por rating.**

   | Nivel del profesor | Techo base/hora | Con rating alto (4.7+) |
   |---|---|---|
   | A1-A2 (Principiante) | $8 | $10 |
   | B1-B2 (Intermedio) | $14 | $18 |
   | C1-C2 (Avanzado) | $22 | $28 |
   | Nativo / Certificado | $30 | $40 |

   _(Números ilustrativos, ajustables.)_ Protege al alumno, retiene a los buenos profes,
   e incentiva subir nivel + rating para ganar más.

4. **Corrección de speaking/writing:** la realiza la **IA** (en examen de ubicación y en
   prácticas). Un profe puede validar opcionalmente en clase, pero la corrección base es IA.

5. **Clases con profe:** se pagan **aparte** (no incluidas en la mensualidad).

6. **Precios de suscripción:**
   - **Mensual simbólico** para mantener plan + contenido + IA.
   - **Anual con 50% de descuento** frente a pagar mes a mes (incentiva permanencia y
     mejora el cash-flow / reduce churn).

7. **Video de clases:** **video web embebido** (proveedor tipo **Daily.co / Whereby
   Embedded**), NO Zoom/Teams. Razones: se queda dentro de la plataforma, sin apps ni
   cuentas externas, y **grabación integrada** (requisito de la política anti-acoso).
   NO construir WebRTC desde cero. En el MVP inicial puede ir un placeholder de "link de
   clase" y el video embebido real entra en Fase 2.

8. **Certificados:** **MVP = certificado propio alineado a MCER** con página de
   verificación pública + QR/código único. **Alianza oficial** (Cambridge, Pearson,
   LanguageCert, etc.) se persigue en **Fase 3**, con volumen y tracción para negociar
   mejor. Pasos de alianza: definir tipo (partner de preparación / licenciar motor de
   evaluación / centro examinador) → empresa constituida → plataforma con tracción →
   contactar Partnerships/B2B → NDA → requisitos técnicos/seguridad → integración →
   revenue share.

---

## 16. Decisiones aún pendientes

1. **Nombre del producto** — (el jefe lo piensa luego). Ideas: _LinguaPath, PolyglotPro,
   NivelaR, IdiomaFlow, FluentPath_.
2. Proveedor concreto de video embebido (Daily.co vs Whereby vs LiveKit) — se decide en Fase 2.
3. Aliado de certificación concreto — se decide en Fase 3.

---

_Documento vivo. Se actualiza conforme tomamos decisiones. _
