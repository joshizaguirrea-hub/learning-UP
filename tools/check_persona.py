#!/usr/bin/env python
"""tools/check_persona.py - Caza menciones a "Bymax" VISIBLES para el alumno.

Por que existe: "Bymax" es el nombre INTERNO del motor (archivos, variables,
config). Para el alumno los profes se llaman Megan (cursos), Mathias (speaking)
y Lucien (entrevistas). Si "Bymax" se filtra a un texto en pantalla o a un prompt
del Worker, se rompe la ilusion: Mathias se presenta como otro.

Este script distingue lo legitimo de lo que no:
  OK    nombres de archivo, imports, variables, comentarios, claves de config
  MAL   cadenas de texto que terminan en pantalla, y prompts que definen
        la identidad del profe ("Eres Bymax")

Uso:
    python tools/check_persona.py
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TARGETS = [ROOT / "src", ROOT / "worker", ROOT / "index.html"]

# Identificadores legitimos: asi se llama el motor por dentro.
ALLOWED_TOKENS = re.compile(
    r"""(?ix)
    bymax(-ai|-chat|-session|-worker|-mascot|-evolution|-prefs)?\.js
  | BYMAX_(WORKER_URL|MULTILINGUAL|STAGES)
  | bymaxAiEnabled | bymaxEmote | bymaxMascot | bymaxEvolution
  | setBymaxTalking | askBymax | openBymaxChat | openBymaxSession
  | config/bymax | services/bymax | features/bymax | core/bymax | ui/bymax
  | \[bymax[\w-]*\]            # prefijos de console.log
  | \[teacher3d\][^"']*        # idem
  | bymax-ia\.                 # subdominio del worker
  | bymax-(alive|tail|mouth|happy|sad|think|blink|eye|body|aura)[\w-]*  # clases CSS
  | \.bymax-[\w-]+             # selectores CSS
  | "bymax-"                   # prefijo de clase que se concatena
    """
)

# Excepciones deliberadas: "Bymax" SI es correcto ahi.
# El avatar robot se llama Bymax; es una opcion de apariencia que el alumno
# elige en Ajustes, no el nombre con el que se presenta el profe.
ALLOWED_LINES = {
    ("src/ui/robot.js", "Robot Bymax"),
}

# Texto que el alumno LEE (cadenas) y prompts de identidad.
STRING_LITERAL = re.compile(r"""(['"`])((?:(?!\1)[^\\]|\\.)*)\1""")
IDENTITY = re.compile(r"""(?i)\b(eres|you\s+are|soy|i\s+am)\b[^.\n]{0,20}bymax""")


def strip_allowed(text: str) -> str:
    return ALLOWED_TOKENS.sub("", text)


def is_comment(line: str) -> bool:
    s = line.strip()
    return s.startswith(("//", "*", "/*", "<!--"))


def scan(path: Path):
    rel = path.relative_to(ROOT).as_posix()
    hits = []
    for num, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        clean = strip_allowed(line)
        if "bymax" not in clean.lower():
            continue

        # Un prompt que define QUIEN es el profe: critico aunque sea comentario.
        if IDENTITY.search(clean):
            hits.append((num, "IDENTIDAD", line.strip()[:100]))
            continue

        if is_comment(line):
            continue  # comentario interno: no lo ve nadie

        for _, body in STRING_LITERAL.findall(clean):
            if "bymax" not in body.lower():
                continue
            if (rel, body.strip()) in ALLOWED_LINES:
                break  # excepcion deliberada y documentada
            hits.append((num, "TEXTO VISIBLE", body.strip()[:100]))
            break
    return hits


def main() -> int:
    total = 0
    for target in TARGETS:
        files = [target] if target.is_file() else sorted(target.rglob("*.js"))
        for f in files:
            hits = scan(f)
            if not hits:
                continue
            print(f"\n{f.relative_to(ROOT)}")
            for num, kind, text in hits:
                print(f"  L{num:<5} [{kind}] {text}")
                total += 1

    print()
    if total:
        print(f"ERROR: {total} mencion(es) a Bymax que el alumno podria ver.")
        print("Los profes se llaman Megan (cursos), Mathias (speaking), Lucien (entrevistas).")
        return 1
    print("OK: ninguna mencion visible a Bymax (el nombre interno si puede quedarse)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
