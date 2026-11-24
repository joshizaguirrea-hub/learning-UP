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

## Fase 0 — HECHO (este corte, 2026-11-23)

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
      Vertical slice: **15 caracteres** (vocales + fila か + fila さ).
- [x] **Familiarizacion antes de memorizar** (pedido explicito de Joshua): la
      pantalla principal ahora abre con 3 tarjetas de "nivel basico" ANTES de
      la practica -- (1) que es hiragana/katakana/kanji y para que sirve cada
      uno, (2) la tabla COMPLETA del gojuon (46 sonidos, `GOJUON_TABLE` en
      data/kana-hiragana.js) marcando que filas ya se pueden practicar (toca
      el caracter) vs "Proximamente", (3) un ejemplo real desglosado
      (こんにちは = ko+n+ni+chi+wa) mostrando como las silabas
      se INTEGRAN sin espacios para formar una palabra.

### Pendiente menor de esta misma fase (no bloquea nada, bajo riesgo)

- [ ] `features/reading-lab.js` (Paso 1 "Lee y escucha") pinta el texto de la
      leccion de Reading tal cual viene de la unidad (parrafo por parrafo).
      Para japones esto YA muestra kana y romaji (vienen como lineas
      separadas en `content.reading`) -- el romaji NO se perdio, solo falta
      el mismo tratamiento visual (romaji destacado) que ya tiene
      Vocabulario/Gramatica. `core/ja-script.js` ya trae `splitJaBlock()`
      listo para esto; falta conectarlo aqui.

## Fase 1 — Completar HIRAGANA (siguiente paso natural)

- [ ] Agregar a `data/kana-hiragana.js` las filas que faltan: た な は ま
      や ら わ + ん (31 caracteres mas, mismo molde: kana, romaji,
      mnemotecnia, ejemplo). Es SOLO agregar datos -- el motor
      (`core/kana-lab.js`) y la UI (`features/kana-lab.js`) ya funcionan.
- [ ] Dakuten/handakuten (が ざ だ ば ぱ y familias): se leen como su base
      + sonido sucio/semi-sucio -- mismo molde, filas nuevas.
- [ ] Yoon (きゃ しゃ ちゃ...): combinaciones con や/ゆ/よ chicos -- mismo
      molde, agrupadas por consonante base.
- [ ] Vista "Progreso de Hiragana" en el hub/perfil: cuantos caracteres ya
      estan en SRS con `reps >= 1` (reusa `srsStats`-like, ya existe el
      patron en `services/srs.js`).

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
      unidad) ya NO abre el hub genérico de ensayos libres (`features/
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
2. **Hiragana completo antes que Katakana**: hiragana es la base de TODA
   gramatica japonesa (particulas, conjugaciones); katakana es mas acotado
   (prestamos, nombres extranjeros).
3. **Reconocer antes que escribir**: leer se aprende mas rapido que escribir
   y desbloquea mucho contenido (carteles, menus, subtitulos) antes de poder
   trazar un solo caracter.
4. **Kanji al final**: es lo mas pesado y lo que mas se beneficia de ya tener
   hiragana/katakana solidos (las lecturas furigana dejan de hacer falta).

_Ultima actualizacion: 2026-11-23 · Autor: Horus_
