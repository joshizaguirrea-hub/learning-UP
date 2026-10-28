#!/usr/bin/env python3
"""tools/check_onboarding.py - La guia de bienvenida NO puede mentir.

POR QUE ESTE GUARDIAN
---------------------
welcome-guide.js le promete al alumno unas reglas concretas: 60% por leccion,
70% por unidad, tres fases, bonos opcionales. Esos numeros viven en OTROS
archivos. El dia que alguien suba el umbral a 75 y no toque el tutorial, la
app estara diciendo una cifra falsa a cada alumno nuevo, sin lanzar ningun
error.

Un tutorial que miente es peor que no tener tutorial: destruye la confianza
justo cuando el alumno mas la necesita. Este guardian ata el texto al codigo.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GUIA = ROOT / "src" / "features" / "welcome-guide.js"
REPORT = ROOT / "src" / "core" / "unit-report.js"
PLAYER = ROOT / "src" / "features" / "lesson-player.js"
UNITS = ROOT / "src" / "data" / "units"


def main() -> int:
    fallos: list[str] = []

    if not GUIA.exists():
        print("FALTA src/features/welcome-guide.js")
        return 1
    guia = GUIA.read_text(encoding="utf-8")

    # 1) Umbral de UNIDAD (PASS en core/unit-report.js)
    m = re.search(r"export const PASS = (\d+)", REPORT.read_text(encoding="utf-8"))
    if not m:
        fallos.append("No encuentro PASS en core/unit-report.js")
    else:
        pass_unidad = m.group(1)
        if f"{pass_unidad}%" not in guia:
            fallos.append(
                f"La unidad se aprueba con {pass_unidad}% (core/unit-report.js) "
                f"pero la guia no dice '{pass_unidad}%'.")
        print(f"  Umbral de unidad : {pass_unidad}%  (citado en la guia)")

    # 2) Umbral de LECCION (ratio en lesson-player.js)
    m2 = re.search(r"const passed = ratio >= 0\.(\d+)", PLAYER.read_text(encoding="utf-8"))
    if not m2:
        fallos.append("No encuentro el umbral por leccion en lesson-player.js")
    else:
        pct = int(m2.group(1)) * 10 if len(m2.group(1)) == 1 else int(m2.group(1))
        if f"{pct}%" not in guia:
            fallos.append(
                f"Una leccion se aprueba con {pct}% (lesson-player.js) pero la "
                f"guia no dice '{pct}%'.")
        print(f"  Umbral de leccion: {pct}%  (citado en la guia)")

    # 3) Las fases que existen en el contenido deben estar explicadas.
    #    OJO: son learn / practice / produce. NO hay fase "test": el examen se
    #    anade aparte con withTest(). El primer borrador de la guia se invento
    #    una fase "test" y este guardian lo cazo.
    fases_reales: set[str] = set()
    for f in UNITS.glob("*.js"):
        if f.name == "index.js":
            continue
        fases_reales.update(re.findall(r'phase:\s*"(\w+)"', f.read_text(encoding="utf-8")))
    print(f"  Fases en el contenido: {', '.join(sorted(fases_reales))}")

    ETIQUETAS = {"learn": "Aprender", "practice": "Practicar", "produce": "Producir"}
    for fase in sorted(fases_reales):
        etiqueta = ETIQUETAS.get(fase)
        if not etiqueta:
            fallos.append(f"Fase '{fase}' en el contenido sin etiqueta conocida: "
                          f"anadela a ETIQUETAS y explicala en la guia.")
        elif etiqueta.lower() not in guia.lower():
            fallos.append(f"Existe la fase '{fase}' pero la guia no la explica "
                          f"(buscaba '{etiqueta}').")

    # Y al reves: que la guia no PRESENTE al alumno una fase que no existe.
    # Solo se mira el texto VISIBLE (entre comillas), no los comentarios: el
    # encabezado del modulo explica justamente que la fase test no existe, y
    # penalizar esa aclaracion seria absurdo.
    visible = " ".join(re.findall(r'"([^"\\]{4,})"', guia))
    if "test" not in fases_reales and re.search(r"fase\s+test", visible, re.I):
        fallos.append("La guia presenta una 'fase test' que no existe en el "
                      "campo `phase`. El examen se anade con withTest().")

    # 4) Debe mostrarse UNA vez y poder reabrirse.
    if "hasSeenWelcome" not in guia or "setWelcomeSeen" not in guia:
        fallos.append("La guia no expone hasSeenWelcome/setWelcomeSeen: no hay "
                      "forma de mostrarla una sola vez ni de reabrirla.")

    # 5) Los bonos son OPCIONALES: que el texto no los venda como obligatorios.
    if "opcional" not in guia.lower():
        fallos.append("La guia no aclara que los bonos son OPCIONALES. Un alumno "
                      "puede creer que debe completarlos para avanzar.")

    if fallos:
        print("\nFALLOS:")
        for f in fallos:
            print("  - " + f)
        return 1

    print("\nOK: la guia de bienvenida coincide con las reglas reales")
    return 0


if __name__ == "__main__":
    sys.exit(main())
