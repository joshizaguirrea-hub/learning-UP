#!/usr/bin/env python3
"""tools/check_induction.py - La induccion de entrada no puede mentir.

POR QUE ESTE GUARDIAN
----------------------
features/induction.js (#/induccion) le promete al alumno nuevo un catalogo
concreto: clases con 6 competencias, un tutor de IA, profesores humanos
"muy pronto", entrenamiento de entrevistas y reestructuracion de CV. Cada una
de esas frases depende de OTRO archivo. El dia que el marketplace de
profesores se lance de verdad y nadie toque el texto, la app seguira
diciendole a cada alumno nuevo "muy pronto" sobre algo que ya existe (o peor:
al reves, prometiendolo como listo cuando todavia es un placeholder).

Un primer contacto que miente es el peor momento para mentir: es la unica
vez que el alumno lee todo con atencion. Este guardian ata el texto al
codigo real, igual que check_onboarding.py hace con welcome-guide.js.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDUCCION = ROOT / "src" / "features" / "induction.js"
TEACHERS = ROOT / "src" / "features" / "teachers.js"
CV_COACH = ROOT / "src" / "features" / "cv-coach.js"
INTERVIEW = ROOT / "src" / "features" / "interview.js"
MAIN = ROOT / "src" / "main.js"
SKILL_META = ROOT / "src" / "data" / "skill-meta.js"


def main() -> int:
    fallos: list[str] = []

    if not INDUCCION.exists():
        print("FALTA src/features/induction.js")
        return 1
    guia = INDUCCION.read_text(encoding="utf-8")

    # 1) Debe mostrarse UNA vez y poder reabrirse (mismo patron que welcome-guide.js).
    if "hasSeenInduction" not in guia or "setInductionSeen" not in guia:
        fallos.append("induction.js no expone hasSeenInduction/setInductionSeen: "
                      "no hay forma de mostrarla una sola vez ni de reabrirla.")

    # 2) Las competencias que promete deben salir de skill-meta.js, no a mano.
    #    Si alguien hardcodea la lista de competencias aqui, el dia que cambien
    #    en skill-meta.js esta pantalla se queda citando una lista vieja.
    if "SKILL_META" not in guia or "skillLabel" not in guia:
        fallos.append("induction.js no importa SKILL_META/skillLabel de "
                      "data/skill-meta.js: la lista de competencias puede "
                      "quedar hardcodeada y desincronizarse.")

    # 3) El marketplace de profesores: lo que diga la induccion tiene que
    #    coincidir con si teachers.js todavia es un placeholder (comingSoon)
    #    o si ya es el marketplace real.
    teachers_src = TEACHERS.read_text(encoding="utf-8")
    es_coming_soon = "comingSoon(" in teachers_src
    promete_pronto = re.search(r"muy pronto", guia, re.I) is not None
    if es_coming_soon and not promete_pronto:
        fallos.append("teachers.js sigue siendo un placeholder (comingSoon) "
                      "pero induction.js no avisa que el marketplace de "
                      "profesores esta 'muy pronto': prometeria algo que no "
                      "existe todavia.")
    if not es_coming_soon and promete_pronto:
        fallos.append("teachers.js YA NO es un placeholder (se quito "
                      "comingSoon), pero induction.js sigue diciendo 'muy "
                      "pronto' sobre los profesores humanos. Actualiza el "
                      "texto: ya se puede prometer el marketplace real.")

    # 4) Las rutas de entrevista y CV que la induccion vende deben existir en
    #    el router. Prometer una pantalla sin ruta seria un boton que no lleva
    #    a ningun lado el dia que alguien la haga clicable.
    main_src = MAIN.read_text(encoding="utf-8")
    for ruta, feature in [('"/coach"', "entrenamiento de entrevistas"),
                           ('"/cv"', "CV Coach")]:
        if ruta not in main_src:
            fallos.append(f"induction.js promete {feature} pero main.js no "
                          f"registra la ruta {ruta}.")

    # 5) Evidencia minima de que lo prometido vive de verdad en el feature real
    #    (no solo que la ruta exista, que el modulo cumpla lo basico).
    interview_src = INTERVIEW.read_text(encoding="utf-8")
    if "Speaking Score" not in interview_src and "recordSpeakingScore" not in interview_src:
        fallos.append("induction.js promete un Speaking Score en el "
                      "entrenamiento de entrevistas, pero interview.js no lo "
                      "registra (recordSpeakingScore).")

    cv_src = CV_COACH.read_text(encoding="utf-8")
    if "ATS" not in cv_src:
        fallos.append("induction.js promete optimizacion para ATS en el CV, "
                      "pero cv-coach.js ya no la menciona.")
    if "efimero" not in guia.lower() and "efimero" not in cv_src.lower():
        fallos.append("induction.js dice que el CV es efimero (no se guarda), "
                      "pero ni la induccion ni cv-coach.js lo confirman.")

    if fallos:
        print("FALLOS:")
        for f in fallos:
            print("  - " + f)
        return 1

    print("OK: la induccion de entrada coincide con el catalogo real")
    return 0


if __name__ == "__main__":
    sys.exit(main())
