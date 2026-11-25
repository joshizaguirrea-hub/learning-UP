# Roadmap de Japones — Learning UP

> Plan completo para llevar el japones de "unidades con kana y romaji
> mezclados" a un metodo pensado de verdad para un idioma con TRES sistemas
> de escritura. Ver ADR-008 en `docs/DECISIONS.md` para el por que.
> Metodo: vertical slice (una pieza excelente, validar, escalar) -- igual
> que el resto del curso (`docs/PEDAGOGIA.md`, seccion 7).

---

## El problema de fondo

Italiano/Portugues/Frances comparten alfabeto con el espanol: la dificultad
es vocabulario y gramatica. Japones agrega un obstaculo PREVIO e
independiente: **tres sistemas de escritura** (hiragana, katakana, kanji).
Mezclar "aprender a hablar" con "aprender a leer/escribir" desde el dia uno
hace las dos cosas mas lentas y menos divertidas.

**Principio del rediseno:** separar en DOS caminos que avanzan en paralelo,
a ritmos distintos:

```
Camino 1 - HABLA Y VOCABULARIO (las 8 unidades tematicas, romaji primero)
Camino 2 - ESCRITURA (hiragana -> katakana -> kanji basico, a tu ritmo)
```

---

## Fase 0 — HECHO (2026-11-23)

- [x] `core/ja-script.js`: separador kana/romaji puro y testeado.
- [x] `ui/bilingual-term.js`: romaji grande + kana chiquito al lado, para
      cualquier componente que lo necesite (sin tocar los demas idiomas).
- [x] Conectado en: panel de Gramatica (grammar-sidebar.js), tarjetas de
      ejemplo con IA (example-card.js) y la Clase de Vocabulario completa
      (vocab-class.js: banner, ejemplo, audio).
- [x] `core/vocab-lab.js`: la escalera de practica ya no le pide al alumno
      TECLEAR kana (no tiene sentido en un silabario) -- solo opcion
      multiple (reconocer + trampa auditiva) para japones.
- [x] Bug de audio arreglado: la voz japonesa ya no intenta leer el romaji
      pegado al kana (`speakSource` siempre manda solo kana).
- [x] Saludo de la Clase de Vocabulario en japones de verdad (antes caia a
      ingles por falta de entrada en el diccionario de saludos).
- [x] NUEVO segmento "Escritura japonesa" (`/escritura`, 4ta puerta del hub
      SOLO si el idioma activo es japones): ciclo Aprende -> Quiz -> SRS.
- [x] **Familiarizacion antes de memorizar** (pedido explicito de Joshua): la
      pantalla principal abre con 3 tarjetas de "nivel basico" ANTES de la
      practica -- (1) que es hiragana/katakana/kanji y para que sirve cada
      uno, (2) la tabla COMPLETA del gojuon (46 sonidos, `GOJUON_TABLE` en
      data/kana-hiragana.js) marcando que filas ya se pueden practicar (toca
      el caracter) vs "Proximamente", (3) un ejemplo real desglosado
      (こんにちは = ko+n+ni+chi+wa) mostrando como las silabas se INTEGRAN
      sin espacios para formar una palabra.
- [x] **Fix de tema claro** (2026-11-24): `text-rose-100` y `text-white` no
      tienen correccion de contraste para tema claro (ver `styles/app.css`)
      -- los caracteres del gojuon y de las flashcards quedaban invisibles.
      Cambiados a `text-rose-200`/`text-slate-100`, el mismo patron
      theme-safe que usa el resto del curso.
- [x] **Fix en el WORKER** (2026-11-24): la pantalla "Ejemplos IA" del Vocab
      Lab (vocab-class.js, pestana "2. Ejemplos IA") generaba frases en
      KANJI PURO, sin romaji -- la regla "romaji SIEMPRE" del Worker solo
      vivia dentro del bloque `freeMode` (Clase/Conversacion/Cuento...), y
      esa pantalla manda `mode:"chat"` + `examplesInTargetLang:true`, que no
      pasa por ahi. Se extrajo la regla a una funcion compartida
      (`jaRomajiRule()`) y se aplica tambien en el bloque de
      `examplesInTargetLang`. **IMPORTANTE: este fix vive en
      `worker/bymax-worker.js`, que NO se despliega solo con git push** --
      hace falta copiar el codigo a Cloudflare a mano (ver
      `desplegar-worker.html`, ya regenerado con `tools/gen_worker_page.py`)
      para que el alumno lo vea reflejado. **Desplegado y confirmado por
      Joshua el 2026-11-24 (version b4117ce7, activa).**
- [x] **Reading Lab con traduccion real** (2026-11-24, pedido URGENTE de un
      alumno: "no hago nada leyendo japones sin saber que es"). El Paso 1
      ("Lee y escucha") mostraba kana + romaji en bucle pero CERO espanol --
      el alumno veia japones repetido en dos escrituras sin enterarse del
      significado. Se agrego `content.readingEs` (traduccion linea por linea,
      mismo orden que produce `core/ja-script.js: zipJaReading()`) a las 8
      unidades de japones, y el Paso 1 ahora pinta cada linea con: romaji
      GRANDE (igual que las demas competencias), kana chiquito de referencia,
      y la traduccion al espanol SIEMPRE visible debajo. De paso se arreglo
      el glosario (antes la traduccion solo vivia en el `title` -- un tooltip
      que en celular nunca se ve -- ahora es texto visible en cada chip, para
      TODOS los idiomas, no solo japones).
- [x] **Escucha ESCALONADA** (2026-11-24): la POP "Escucha" de la rueda de
      competencias abria directo el Listening generico (historia de IA de
      90-140 palabras + 8 preguntas) -- EXAMINA, no ENSENA; imposible para
      alguien que nunca oyo japones. Nuevo `core/listening-ja.js` +
      `features/listening-lab-ja.js`: escalera de 2 rondas con vocabulario YA
      visto en la unidad -- (A) oyes la palabra sola, eliges su significado;
      (B) oyes la frase de ejemplo, reconoces que palabra (en romaji, no es
      prueba de oido a ciegas). La historia con IA sigue disponible como
      "Reto avanzado" opcional al final. Pendiente (roadmap, no urgente): un
      Nivel 3 de dialogo corto reusando `content.reading` con audio oculto,
      como puente entre la escalera y la historia libre.

## Fase 1 — Completar HIRAGANA — HECHO (2026-11-24)

- [x] Las **46 sonidos base del gojuon** ya tienen practica interactiva
      completa (mnemotecnia + ejemplo + quiz + SRS). Se agregaron las 8
      filas que faltaban: た(ta) な(na) は(ha) ま(ma) や(ya) ら(ra) わ(wa) +
      ん(n), mismo molde exacto que las 3 primeras (vocales/か/さ).
- [x] El motor (`core/kana-lab.js`) y la UI (`features/kana-lab.js`) no
      necesitaron NINGUN cambio de logica -- leen `HIRAGANA` de forma
      generica, tal como se diseno desde el vertical slice. Solo se
      agregaron datos + las etiquetas de fila (`ROW_LABEL`).
- [x] 11 lotes practicables en total; el selector de lotes ahora usa
      `sm:grid-cols-3 lg:grid-cols-4` para acomodarlos.

### Pendiente de esta fase

- [ ] Dakuten/handakuten (が ざ だ ば ぱ y familias): se leen como su fila
      base + sonido sucio/semi-sucio -- mismo molde, filas nuevas.
- [ ] Yoon (きゃ しゃ ちゃ...): combinaciones con や/ゆ/よ chicos -- mismo
      molde, agrupadas por consonante base.
- [ ] Vista "Progreso de Hiragana" en el hub/perfil: cuantos de los 46
      caracteres ya estan en SRS con `reps >= 1` (reusa el patron de
      `srsStats` en `services/srs.js`).

## Fase 2 — Katakana

- [ ] Mismo patron que Hiragana (visualmente parecidos a su contraparte
      hiragana, aprovechar esa asociacion en la mnemotecnia: "katakana ANGULAR,
      hiragana REDONDEADO").
- [ ] Vocabulario de prestamo (`コーヒー`, `テレビ`...) como ejemplos --
      motivador porque se reconocen palabras ya conocidas en otro idioma.

## Fase 3 — Escribir de VERDAD (trazos)

- [ ] Hoy el segmento solo entrena RECONOCER (leer + encontrar). Fase 3 agrega
      PRODUCCION: orden de trazos (stroke order) -- se puede lograr sin
      canvas/dibujo: mostrar la secuencia de trazos numerada y pedir que el
      alumno ordene los pasos (reusa el tipo de actividad `word_bank` ya
      existente, aplicado a pasos de trazo en vez de palabras).
- [ ] (Opcional, mas caro) un canvas real de dibujo con reconocimiento
      aproximado por forma -- evaluar cuando haya patrocinio (igual que
      listening/speaking en los demas idiomas, ver `docs/PEDAGOGIA.md`).

## Fase 4 — Kanji basico (N5)

- [ ] Arrancar con los ~100 kanji de N5 (numeros, dias, personas, lugares
      comunes). Cada kanji: significado, lectura ON/KUN basica, radicales
      visibles, mnemotecnia y 1-2 palabras de ejemplo (reusa vocab ya
      presente en las unidades donde aplique, ej. 日本人 ya aparece como
      "nihonjin" en ja1-konnichiwa).
- [ ] Este es el punto donde el SRS importa MAS: kanji se olvida rapido sin
      repaso espaciado -- ya lo tenemos listo desde la Fase 0.

## Fase 5 — Retirar/adaptar las lecciones "Writing" de las 8 unidades

- [x] **La POP "Escritura" de la rueda de competencias** (dentro de cada
      unidad) ya NO abre el hub generico de ensayos libres (`features/
      writing.js` -- fill-in-blanks, correos, ensayos argumentativos...),
      que asume que el alumno ya TECLEA el idioma meta. Para japones abre un
      puente propio (`features/writing-ja.js`) que explica el por que y manda
      directo al Laboratorio de Hiragana (`/escritura`). Marca la leccion de
      Writing de la unidad como completa al entrar -- la maestria real de
      kana se mide aparte, en el SRS del Laboratorio.

Las lecciones `skills:["writing"]` DENTRO de cada unidad (`ja1k-write`, etc.,
con fichas de KANA puro en sus actividades `word_bank`) siguen existiendo en
los datos pero YA NO SE RENDERIZAN directo (el hub de arriba nunca las leia).
Son candidatas a limpiar del todo mas adelante:

- [ ] Opcion A: borrar esas actividades de los datos (`ja1k-write`, etc.) --
      ya no las usa ninguna pantalla.
- [ ] Opcion B: reusarlas en el futuro Reading Lab/Checkpoint en ROMAJI si
      aparece un buen caso de uso.
- [ ] Decidir cuando se llegue a este punto -- no bloquea nada de lo de
      arriba, las unidades siguen funcionando igual mientras tanto.

---

## Por que este orden

1. **Hablar y entender primero** (Fase 0, ya en produccion): es lo que mas
   rapido te hace sentir que "ya sabes algo" -- motivacion temprana real.
2. **Hiragana completo antes que Katakana** (Fase 1, ya en produccion):
   hiragana es la base de TODA gramatica japonesa (particulas,
   conjugaciones); katakana es mas acotado (prestamos, nombres extranjeros).
3. **Reconocer antes que escribir**: leer se aprende mas rapido que escribir
   y desbloquea mucho contenido (carteles, menus, subtitulos) antes de poder
   trazar un solo caracter.
4. **Kanji al final**: es lo mas pesado y lo que mas se beneficia de ya tener
   hiragana/katakana solidos (las lecturas furigana dejan de hacer falta).

_Ultima actualizacion: 2026-11-24 · Autor: Horus_
