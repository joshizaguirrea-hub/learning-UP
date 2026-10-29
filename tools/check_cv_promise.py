#!/usr/bin/env python3
"""tools/check_cv_promise.py - El CV completo cumple lo que la pantalla promete.

POR QUE ESTE GUARDIAN
---------------------
La pantalla del CV Coach dice ahora: "El CV completo ya incluye los 10 puntos
de abajo". Esa frase es una promesa al usuario, y se mide contra el prompt
real de buildPro().

Cuando lo audite por primera vez, el prompt cubria 8 de 10: "Cambio de
carrera" y "Auditoria de CV" no aparecian por ningun lado. Prometerlos habria
sido publicidad falsa -- el usuario esperaria que le quitaran las frases
vagas y nadie se las quitaria.

Este guardian falla si alguien anade un modo nuevo a CV_MODES sin reflejarlo
en el prompt, o si alguien recorta el prompt y deja la promesa colgando.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
COACH = ROOT / "src" / "features" / "cv-coach.js"

# Que palabras demuestran que el prompt cubre cada modo. Si un modo nuevo no
# esta aqui, el guardian avisa: hay que decidir si se cubre o no se promete.
#
# Las pistas son INSTRUCCIONES del prompt, no palabras sueltas. "vagas" a
# secas no sirve: aparece tambien en la linea de Notas, asi que al borrar la
# instruccion de auditoria el guardian seguia dando verde (comprobado con un
# sabotaje real). Cada pista tiene que ser una orden concreta al modelo.
EVIDENCIA = {
    "summary": ["professional summary"],
    "achievements": ["metricas", "[x%]"],
    "ats": ["reglas ats"],
    "pivot": ["habilidades transferibles"],
    "audit": ["auditoria: elimina"],
    "format": ["una sola columna"],
    "align": ["puesto objetivo"],
    "skills": ["core skills"],
    "headline": ["headline"],
    "recruiter": ["reclutador senior"],
}


def main() -> int:
    src = COACH.read_text(encoding="utf-8")

    modos = re.findall(r'id:\s*"([\w-]+)",\s*title:\s*"([^"]+)"', src)
    if not modos:
        print("No encontre CV_MODES en cv-coach.js")
        return 1

    i = src.find("function buildPro")
    if i < 0:
        print("No encontre buildPro() en cv-coach.js")
        return 1
    # El cierre de buildPro es el primer "\n}" tras su apertura. Acotar bien
    # importa: en la primera version buscaba las pistas en TODO el archivo y
    # el sabotaje no se detectaba, porque palabras como "vagas" tambien salen
    # en el texto de la promesa que se muestra al usuario. Un guardian que
    # mira el sitio equivocado da verde siempre: peor que no tenerlo.
    fin = src.find("\n}", i)
    prompt = src[i:fin].lower()
    if len(prompt) < 400:
        print(f"buildPro() parece truncado ({len(prompt)} chars): revisa el parseo")
        return 1

    promete = "ya incluye los" in src

    print(f"Modos en la lista : {len(modos)}")
    print(f"La pantalla promete cubrirlos todos: {'SI' if promete else 'no'}\n")

    fallos: list[str] = []
    for mid, titulo in modos:
        pistas = EVIDENCIA.get(mid)
        if pistas is None:
            fallos.append(f"Modo nuevo '{mid}' ({titulo}) sin evidencia "
                          f"definida. Anadelo a EVIDENCIA y asegurate de que "
                          f"buildPro() lo cubra, o no lo prometas.")
            continue
        hits = [p for p in pistas if p in prompt]
        print(f"  {'OK ' if hits else 'NO '} {titulo}")
        if not hits and promete:
            fallos.append(f"La pantalla promete '{titulo}' pero buildPro() no "
                          f"lo menciona (buscaba: {', '.join(pistas)}).")

    if fallos:
        print("\nFALLOS (la pantalla prometeria algo que no se hace):")
        for f in fallos:
            print("  - " + f)
        return 1

    print(f"\nOK: el CV completo cubre los {len(modos)} puntos que promete")
    return 0


if __name__ == "__main__":
    sys.exit(main())
