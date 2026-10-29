#!/usr/bin/env python3
"""tools/check_prompt_budget.py - El texto del usuario tiene que LLEGAR entera.

POR QUE ESTE GUARDIAN
---------------------
El Worker recortaba `question` a 800 caracteres. Un CV real son miles, asi que
de un prompt de 7.400 chars llegaba el 11%: la IA veia la estructura pedida
pero NUNCA los datos del candidato. Hacia lo unico que podia -- devolver una
plantilla con [Job Title] y [Skill 1]. El usuario subia su CV para nada.

Y no habia ningun error: HTTP 200, respuesta bien formada, factura pagada. El
peor tipo de fallo.

Este guardian comprueba que ninguna capa corte antes que la siguiente:
  extractor de archivos  ->  textarea  ->  tope del Worker
y que el peor caso posible quepa con margen.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
COACH = ROOT / "src" / "features" / "cv-coach.js"
FILETEXT = ROOT / "src" / "ui" / "file-text.js"
WORKER = ROOT / "worker" / "bymax-worker.js"

# Tamano de la parte fija del prompt del CV (mision + estructura + reglas).
# Se mide de verdad mas abajo; esto es solo el minimo que esperamos.
ESTRUCTURA_MIN = 1000


def num(patron: str, texto: str, grupo: int = 1) -> int:
    m = re.search(patron, texto)
    return int(m.group(grupo)) if m else 0


def main() -> int:
    coach = COACH.read_text(encoding="utf-8")
    ftext = FILETEXT.read_text(encoding="utf-8")
    worker = WORKER.read_text(encoding="utf-8")

    max_file = num(r"const MAX_CHARS = (\d+)", ftext)
    max_textarea = num(r'rows: "8", maxlength: "(\d+)"', coach)
    tope_cv = num(r"const TOPE_PREGUNTA = esCv \? (\d+)", worker)
    tope_chat = num(r"const TOPE_PREGUNTA = esCv \? \d+ : (\d+)", worker)
    tokens = num(r"isCv \? (\d+) : 800", worker)

    # Tamano real de la parte fija: lo que buildPro concatena sin el CV.
    i = coach.find("function buildPro")
    cuerpo = coach[i:coach.find("\n}", i)]
    estructura = sum(len(s) for s in re.findall(r'"((?:[^"\\]|\\.)*)"', cuerpo))

    print("TOPES DE CADA CAPA")
    print(f"  Extractor de archivos : {max_file:,}")
    print(f"  Textarea del CV       : {max_textarea:,}")
    print(f"  Worker (CV)           : {tope_cv:,}")
    print(f"  Worker (chat normal)  : {tope_chat:,}")
    print(f"  Tokens de salida (CV) : {tokens:,}")
    print(f"\n  Parte fija del prompt : ~{estructura:,} chars")

    peor = estructura + max_file
    print(f"  Peor caso (fija + CV) : {peor:,} chars")

    fallos: list[str] = []

    if not tope_cv:
        fallos.append("El Worker no distingue el CV: `const TOPE_PREGUNTA = esCv ? ...` "
                      "no aparece. Volveria a cortar el CV a la medida del chat.")
    elif tope_cv < peor:
        fallos.append(f"El Worker corta a {tope_cv:,} pero el peor caso son "
                      f"{peor:,} chars: se perderia parte del CV del usuario.")

    if max_textarea and max_file and max_textarea < max_file:
        fallos.append(f"El textarea ({max_textarea:,}) corta mas que el extractor "
                      f"({max_file:,}): un CV subido se truncaria al pegarse.")

    if estructura < ESTRUCTURA_MIN:
        fallos.append(f"La parte fija del prompt parece muy corta ({estructura:,}): "
                      f"revisa que buildPro() siga completo.")

    if tokens and tokens < 4000:
        fallos.append(f"Solo {tokens:,} tokens de salida para un CV completo: "
                      f"la respuesta se cortaria a la mitad.")

    if fallos:
        print("\nFALLOS (el usuario subiria su CV para nada):")
        for f in fallos:
            print("  - " + f)
        return 1

    print(f"\nOK: el CV del usuario llega entero (margen de {tope_cv - peor:,} chars)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
