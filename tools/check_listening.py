#!/usr/bin/env python
"""tools/check_listening.py - El listening generado entrena el OIDO, no la suerte.

Por que existe: data/listening-gen.js crea la leccion de comprension auditiva
de cada unidad a partir del vocabulario (termino + ejemplo). El alumno oye la
frase con el texto oculto y elige la palabra clave.

El generador nacio para INGLES y en fr/it producia basura silenciosa: el
glosario de esos idiomas guarda el genero en el termino ("la mere", "il pane"),
que es CORRECTO para aprender, pero `mainWord()` se quedaba con el articulo.
Resultado: 11 unidades preguntaban "que palabra oiste" con las opciones "le",
"la" y "les". Eso no entrena el oido, entrena a adivinar. Nadie lo noto porque
la leccion EXISTIA y el test pasaba.

Este guardian replica el algoritmo y comprueba, sin navegador, que:
  1. Ninguna clave de respuesta sea un articulo o particula.
  2. Toda unidad con vocabulario suficiente reciba su leccion.
  3. El audio NO este fijado a ingles (una frase francesa con voz inglesa es
     inservible para entrenar el oido).

Uso:
    python tools/check_listening.py
"""
import glob
import re
import sys

RE_VOCAB = re.compile(
    r'term:\s*"([^"]+)",\s*translation:\s*"[^"]*",\s*example:\s*"([^"]*)"')

# Debe coincidir con PARTICULAS de src/data/listening-gen.js
PARTICULAS = {
    "to", "the", "a", "an",
    "le", "la", "les", "un", "une", "des", "du", "au", "aux",
    "il", "lo", "gli", "i", "uno", "una", "dei", "degli",
    "o", "os", "as", "um", "uma", "uns", "umas",
    "el", "los", "las", "unos", "unas",
    "se", "si", "me", "te", "nos", "vos",
}
MIN_USABLES = 3  # el generador exige 3 para crear la leccion


def main_word(term):
    """Replica mainWord() de src/data/listening-gen.js."""
    raw = str(term or "")
    paren = re.search(r"\(([^)]+)\)", raw)       # "to go (went)" -> "went"
    if paren and paren.group(1).strip():
        return paren.group(1).strip().split()[0]
    t = raw.split("/")[0].strip()                 # "le fils / la fille"
    partes = [p for p in t.split() if p]
    while len(partes) > 1 and partes[0].lower() in PARTICULAS:
        partes.pop(0)
    t = " ".join(partes)
    t = re.sub(r"^[a-z]['\u2019]", "", t, flags=re.I)   # l'eau -> eau
    w = t.split()[0] if t.split() else ""
    return w if w and w.lower() not in PARTICULAS else ""


def es_usable(term, ejemplo):
    w = main_word(term)
    return bool(w) and bool(re.search(r"\b" + re.escape(w), ejemplo, re.I))


def main():
    fallos = []
    con_articulo = sin_leccion = ok = a_mano = 0

    gen = open("src/data/listening-gen.js", encoding="utf-8").read()

    # --- Comprobaciones sobre el GENERADOR REAL -----------------------------
    # OJO: mas abajo este script REPLICA mainWord() en Python. Esa replica NO
    # prueba el JS: si alguien rompe listening-gen.js, la replica sigue dando
    # el resultado bueno y el guardian pasa en verde (me paso al escribirlo,
    # verificado reintroduciendo el bug). Por eso aqui se mira el ARCHIVO.
    if not re.search(r"const PARTICULAS = new Set\(\[", gen):
        fallos.append(
            "listening-gen.js no define `const PARTICULAS = new Set([...])`: "
            "las claves de respuesta en fr/it volverian a ser articulos.")
    if "partes.shift()" not in gen:
        fallos.append(
            "listening-gen.js ya no descarta las particulas iniciales del "
            "termino: 'la mere' daria 'la' como palabra clave.")
    # El idioma del audio tiene que venir de la unidad. Se comprueba que la
    # linea `lang:` del payload use ttsLang, no que la palabra aparezca en
    # cualquier parte del archivo (eso lo cumplia hasta el codigo roto).
    m_lang = re.search(r"lang:\s*([^,\n]+),", gen)
    if not m_lang or "ttsLang" not in m_lang.group(1):
        fallos.append(
            "listening-gen.js no usa el idioma de la unidad en el payload "
            "(`lang: ttsLang || ...`): una frase francesa sonaria con voz "
            "inglesa, que es inservible para entrenar el oido.")

    # Las PARTICULAS del JS y las de este script deben coincidir, o la replica
    # estaria midiendo algo distinto de lo que corre en produccion.
    bloque = re.search(r"const PARTICULAS = new Set\(\[(.*?)\]\)", gen, re.S)
    if bloque:
        en_js = set(re.findall(r'"([^"]+)"', bloque.group(1)))
        if en_js != PARTICULAS:
            faltan = sorted(en_js - PARTICULAS)
            sobran = sorted(PARTICULAS - en_js)
            fallos.append(
                "PARTICULAS de check_listening.py no coincide con la de "
                f"listening-gen.js (faltan aqui: {faltan or '-'}, "
                f"sobran aqui: {sobran or '-'}). Sincronizalas.")

    # --- Simulacion unidad por unidad ---------------------------------------
    for f in sorted(glob.glob("src/data/units/*.js")):
        if "index" in f:
            continue
        s = open(f, encoding="utf-8").read()
        m = re.search(r'id:\s*"([\w-]+)"', s)
        uid = m.group(1) if m else f
        lang = re.search(r'language:\s*"(\w+)"', s)
        lang = lang.group(1) if lang else "en"

        if re.search(r'skills:\s*\[\s*"listening"', s):
            a_mano += 1
            continue

        usables = [(t, e) for t, e in RE_VOCAB.findall(s) if es_usable(t, e)]
        if len(usables) < MIN_USABLES:
            sin_leccion += 1
            fallos.append(
                f"[{lang}] {uid}: sin leccion de listening "
                f"(solo {len(usables)} terminos usables, hacen falta {MIN_USABLES}). "
                "Revisa que los `example` contengan la palabra del `term`.")
            continue

        claves = [main_word(t) for t, _ in usables[:6]]
        malas = [c for c in claves if c.lower() in PARTICULAS]
        if malas:
            con_articulo += 1
            fallos.append(
                f"[{lang}] {uid}: la respuesta correcta seria un articulo "
                f"({', '.join(malas)}). El alumno elegiria entre particulas.")
        else:
            ok += 1

    print(f"Lecciones generadas OK:   {ok}")
    print(f"Escritas a mano:          {a_mano}")
    if con_articulo:
        print(f"Con articulo como clave:  {con_articulo}")
    if sin_leccion:
        print(f"Unidades sin leccion:     {sin_leccion}")

    if fallos:
        print()
        for f in fallos:
            print("ERROR: " + f)
        return 1

    print("\nOK: todas las unidades tienen listening con clave audible")
    return 0


if __name__ == "__main__":
    sys.exit(main())
