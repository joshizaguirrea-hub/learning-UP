#!/usr/bin/env python
"""tools/check_placement_lang.py - El examen de ubicacion no mezcla idiomas.

Por que existe: el banco de `data/placement-questions.js` es 100% ingles y el
motor NO lo filtraba. Al publicar frances (v0.313.0) aparecio el bug: un alumno
que elige "Intermedio" en frances acababa respondiendo "___ name is Ana" para
ubicarse en FRANCES. El nivel que salia de ahi no media nada.

Este guardian comprueba dos cosas, sin necesidad de Node:
  1. features/placement.js filtra el banco por idioma (no pasa el banco crudo).
  2. Todo idioma PUBLICADO (enabled, sin draft) o tiene banco suficiente, o cae
     por la rama "sin examen". Nunca se le examina con preguntas de otro idioma.

Uso:
    python tools/check_placement_lang.py
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MIN_PREGUNTAS = 6  # mismo umbral que canTestLanguage()


def lee(rel: str) -> str:
    return (ROOT / rel).read_text(encoding="utf-8")


def idiomas_publicados() -> list:
    """Codigos de idioma con enabled: true (los que un alumno puede elegir)."""
    texto = lee("src/data/languages.js")
    out = []
    for m in re.finditer(r'code:\s*"(\w+)"(.*?)\}', texto, re.S):
        code, resto = m.group(1), m.group(2)
        if "enabled: true" in resto:
            out.append(code)
    return out


def preguntas_por_idioma() -> dict:
    """Cuenta preguntas del banco por idioma. Sin `lang` = ingles (asi nacio)."""
    texto = lee("src/data/placement-questions.js")
    conteo = {}
    # Cada pregunta es un objeto que empieza por `{ id: "..."`.
    for bloque in re.finditer(r'\{\s*id:\s*"[^"]+"(.*?)\},', texto, re.S):
        cuerpo = bloque.group(1)
        m = re.search(r'lang:\s*"(\w+)"', cuerpo)
        code = m.group(1) if m else "en"
        conteo[code] = conteo.get(code, 0) + 1
    return conteo


def main() -> int:
    fallos = []

    # 1. La vista NO debe pasar el banco crudo al motor.
    vista = lee("src/features/placement.js")
    if re.search(r"createSession\(\s*PLACEMENT_QUESTIONS", vista):
        fallos.append(
            "features/placement.js pasa PLACEMENT_QUESTIONS SIN filtrar a "
            "createSession(). Usa bankForLanguage(PLACEMENT_QUESTIONS, lang)."
        )
    if "canTestLanguage" not in vista:
        fallos.append(
            "features/placement.js no comprueba canTestLanguage(): un idioma "
            "sin banco acabara examinando en ingles."
        )

    # 2. Cada idioma publicado: o tiene banco, o se salta el examen.
    conteo = preguntas_por_idioma()
    publicados = idiomas_publicados()
    sin_banco = [c for c in publicados if conteo.get(c, 0) < MIN_PREGUNTAS]

    print("Preguntas por idioma: " +
          ", ".join(f"{k}={v}" for k, v in sorted(conteo.items())))
    print("Idiomas publicados:   " + ", ".join(publicados))
    if sin_banco:
        print("Sin examen propio (-> se saltan la prueba): " + ", ".join(sin_banco))

    if fallos:
        print()
        for f in fallos:
            print("ERROR: " + f)
        return 1

    print("\nOK: el examen de ubicacion nunca mezcla idiomas")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
