#!/usr/bin/env python3
"""tools/pregen_audio.py - Pre-genera el audio del catalogo en el cache KV.

POR QUE
-------
Los textos de la app son FIJOS (vocabulario, ejemplos, reglas). Cada vez que un
alumno los escucha por primera vez, el Worker paga a OpenAI por generarlos. Con
este script los generamos UNA vez desde aqui: a partir de ahi salen del cache
KV, gratis y al instante, para TODOS los alumnos durante 30 dias (el TTL).

Coste estimado: ~$5 una sola vez. Lo que se ahorra: esa misma factura repetida
por cada alumno nuevo, mas la espera de red en cada primera escucha.

LA CLAVE DEL CACHE TIENE QUE COINCIDIR EXACTO
---------------------------------------------
El Worker cachea por hash(lang + voz + rate + texto). Si pre-generamos con un
`rate` distinto al que usa la app, la clave NO coincide y el cache nunca acierta:
pagariamos dos veces y el alumno seguiria esperando. Por eso los parametros de
abajo replican lo que manda ui/cloud-tts.js, no lo que nos parezca bonito.

USO
---
  python tools/pregen_audio.py --dry-run     # cuenta y estima, NO gasta
  python tools/pregen_audio.py --lang fr     # solo un idioma
  python tools/pregen_audio.py               # todo el catalogo

Necesita la variable de entorno ADMIN_KEY (la misma que pusiste en el Worker)
para saltarse el limite diario de 60 peticiones. Sin ella, el propio rate
limiting nos cortaria a las 60 frases de ~3.600.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
UNITS_DIR = ROOT / "src" / "data" / "units"
WORKER_CFG = ROOT / "src" / "config" / "bymax.js"

# Precio de gpt-4o-mini-tts (oct-2026): $0.015 por 1.000 caracteres.
USD_POR_1K_CHARS = 0.015

# Mismo rate que usa speakButton() en ui/speech.js. Si esto se desincroniza,
# el cache falla en silencio -> ver nota de arriba.
RATE_BOTON = 0.95


def worker_url() -> str:
    """Lee la URL del Worker del config real (no la duplicamos aqui)."""
    txt = WORKER_CFG.read_text(encoding="utf-8")
    m = re.search(r'BYMAX_WORKER_URL\s*=\s*"([^"]+)"', txt)
    if not m:
        sys.exit("No encontre BYMAX_WORKER_URL en src/config/bymax.js")
    return m.group(1).rstrip("/")


def _campo(bloque: str, nombre: str) -> str | None:
    """Saca un campo "nombre": "valor" de un trozo de JS."""
    m = re.search(nombre + r'\s*:\s*"((?:[^"\\]|\\.)*)"', bloque)
    if not m:
        return None
    return m.group(1).replace('\\"', '"').replace("\\'", "'").strip()


def frases_del_catalogo(solo_lang: str | None) -> list[tuple[str, str]]:
    """Devuelve [(texto, lang)] unicos de todo el vocabulario publicado.

    Solo el vocabulario: es lo que el alumno escucha una y otra vez (termino y
    frase de ejemplo). Las reglas de gramatica se leen en espanol y cambian
    menos, asi que no compensan el gasto.
    """
    vistos: set[tuple[str, str]] = set()
    salida: list[tuple[str, str]] = []

    for f in sorted(UNITS_DIR.glob("*.js")):
        if f.name == "index.js":
            continue
        src = f.read_text(encoding="utf-8")
        lang = (re.search(r'language:\s*"(\w+)"', src) or [None, "en"])[1]
        if solo_lang and lang != solo_lang:
            continue

        # Cada item de vocabulario: term (la palabra) + example (la frase).
        for bloque in re.findall(r"\{[^{}]*term\s*:[^{}]*\}", src, re.S):
            for campo in ("term", "example"):
                txt = _campo(bloque, campo)
                if not txt or len(txt) < 2:
                    continue
                # Quita marcas tipo **negrita** que la app no pronuncia.
                txt = re.sub(r"[*_`]", "", txt).strip()
                clave = (txt, lang)
                if clave not in vistos:
                    vistos.add(clave)
                    salida.append(clave)
    return salida


def pedir_audio(base: str, texto: str, lang: str, admin: str | None) -> tuple[bool, bool]:
    """Pide un audio al Worker. Devuelve (ok, venia_del_cache)."""
    cuerpo = json.dumps({"text": texto, "lang": lang, "rate": RATE_BOTON}).encode()
    cab = {"Content-Type": "application/json"}
    if admin:
        cab["X-Admin-Key"] = admin
    req = urllib.request.Request(base + "/tts", data=cuerpo, headers=cab)
    try:
        with urllib.request.urlopen(req, timeout=90) as r:
            d = json.loads(r.read().decode())
            return bool(d.get("audio")), bool(d.get("cached"))
    except urllib.error.HTTPError as e:
        if e.code == 429:
            sys.exit("\nERROR 429: el Worker te esta limitando.\n"
                     "  Define ADMIN_KEY aqui Y en el Worker (Settings > Variables).")
        print(f"  HTTP {e.code} en: {texto[:50]}")
        return False, False
    except Exception as e:  # red, timeout, etc.
        print(f"  fallo: {type(e).__name__} en: {texto[:50]}")
        return False, False


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--lang", help="solo este idioma (en/fr/it/pt)")
    ap.add_argument("--dry-run", action="store_true", help="cuenta y estima, no gasta")
    ap.add_argument("--limite", type=int, help="corta despues de N frases (prueba)")
    args = ap.parse_args()

    frases = frases_del_catalogo(args.lang)
    if args.limite:
        frases = frases[:args.limite]

    chars = sum(len(t) for t, _ in frases)
    coste = chars / 1000 * USD_POR_1K_CHARS

    por_lang: dict[str, int] = {}
    for _, l in frases:
        por_lang[l] = por_lang.get(l, 0) + 1

    print(f"Frases unicas : {len(frases):,}")
    print(f"Caracteres    : {chars:,}")
    print(f"Coste estimado: ${coste:.2f}  (una sola vez)")
    print("Por idioma    : " + ", ".join(f"{k}={v}" for k, v in sorted(por_lang.items())))

    if args.dry_run:
        print("\n--dry-run: no se ha pedido nada al Worker.")
        return

    admin = os.environ.get("ADMIN_KEY")
    if not admin:
        print("\nAVISO: sin ADMIN_KEY el Worker te cortara a las 60 frases.")
        if input("Seguir igual? [s/N] ").strip().lower() != "s":
            return

    base = worker_url()
    print(f"\nWorker: {base}\nGenerando... (Ctrl+C para parar; lo hecho queda cacheado)\n")

    ok = fallos = cacheados = 0
    t0 = time.time()
    for i, (texto, lang) in enumerate(frases, 1):
        bien, del_cache = pedir_audio(base, texto, lang, admin)
        if bien:
            ok += 1
            cacheados += del_cache
        else:
            fallos += 1
        if i % 25 == 0 or i == len(frases):
            seg = time.time() - t0
            resto = (seg / i) * (len(frases) - i)
            print(f"  {i:5}/{len(frases)}  ok={ok} cache={cacheados} fallos={fallos}"
                  f"  faltan ~{resto / 60:.1f} min")

    print(f"\nListo en {(time.time() - t0) / 60:.1f} min")
    print(f"  Generados : {ok - cacheados}")
    print(f"  Ya estaban: {cacheados}")
    print(f"  Fallos    : {fallos}")
    print("\nEl audio vive 30 dias en KV. Vuelve a correr esto si cambias voz o textos.")


if __name__ == "__main__":
    main()
