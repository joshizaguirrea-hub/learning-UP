"""Verifica las reglas de content-audit.js sobre las unidades fr, sin Node.

Replica activityError() de src/core/content-audit.js para los tipos que usamos:
word_bank (words y answer deben coincidir como multiconjunto), multiple_choice
(indice valido) y cloze (respuesta no vacia). Tambien avisa de ids repetidos.

Existe porque esta maquina no tiene Node y `npm test` no corre. No reemplaza a
los tests: es una red de seguridad para el contenido nuevo.
"""
import json
import re
import sys
from collections import Counter
from pathlib import Path

ACTIVITY_RE = re.compile(
    r'id:\s*"(?P<id>[^"]+)",\s*type:\s*"(?P<type>[^"]+)"', re.S)


def bloques(texto, inicio):
    """Devuelve el texto balanceado en llaves/corchetes desde `inicio`."""
    pares = {"{": "}", "[": "]"}
    abre = texto[inicio]
    cierra = pares[abre]
    nivel = 0
    for i in range(inicio, len(texto)):
        c = texto[i]
        if c == abre:
            nivel += 1
        elif c == cierra:
            nivel -= 1
            if nivel == 0:
                return texto[inicio:i + 1]
    return ""


def lista_js(texto):
    """Convierte un array JS de strings simples en lista Python."""
    return re.findall(r'"((?:[^"\\]|\\.)*)"', texto)


def revisar(ruta):
    src = ruta.read_text(encoding="utf-8")
    fallos = []
    vistos = Counter()

    for m in ACTIVITY_RE.finditer(src):
        act_id, tipo = m.group("id"), m.group("type")
        vistos[act_id] += 1

        pos = src.find("payload:", m.end())
        if pos < 0:
            fallos.append(f"{act_id}: sin payload")
            continue
        llave = src.find("{", pos)
        payload = bloques(src, llave)

        if tipo == "word_bank":
            mw = re.search(r"words:\s*\[", payload)
            ma = re.search(r"answer:\s*\[", payload)
            if not mw or not ma:
                fallos.append(f"{act_id}: faltan words/answer")
                continue
            words = lista_js(bloques(payload, mw.end() - 1))
            answer = lista_js(bloques(payload, ma.end() - 1))
            if Counter(words) != Counter(answer):
                fallos.append(
                    f"{act_id}: words y answer no coinciden\n"
                    f"      words : {words}\n"
                    f"      answer: {answer}")

        elif tipo == "multiple_choice":
            mc = re.search(r"choices:\s*\[", payload)
            man = re.search(r"answer:\s*(\d+)", payload)
            if not mc or not man:
                fallos.append(f"{act_id}: faltan choices/answer")
                continue
            choices = lista_js(bloques(payload, mc.end() - 1))
            idx = int(man.group(1))
            if len(choices) < 2:
                fallos.append(f"{act_id}: opciones insuficientes")
            elif not 0 <= idx < len(choices):
                fallos.append(f"{act_id}: indice {idx} fuera de rango")

        elif tipo == "cloze":
            man = re.search(r'answer:\s*"([^"]*)"', payload)
            if not man or not man.group(1).strip():
                fallos.append(f"{act_id}: falta la respuesta")

        elif tipo == "matching":
            pares = len(re.findall(r"\bleft:", payload))
            if pares < 2:
                fallos.append(f"{act_id}: pares insuficientes")

    for act_id, n in vistos.items():
        if n > 1:
            fallos.append(f"{act_id}: id repetido ({n} veces)")

    # Chequeos de unidad (los mismos que pide content-audit).
    for etiqueta, patron, minimo in (
        ("vocab", r"\bid:\s*\"[^\"]+\",\s*term:", 5),
        ("cando", r'^\s{4}"Puedo ', 1),
    ):
        n = len(re.findall(patron, src, re.M))
        if n < minimo:
            fallos.append(f"unidad: {etiqueta} insuficiente ({n} < {minimo})")

    fases = {f for f in ("learn", "practice", "produce")
             if re.search(rf'phase:\s*"{f}"', src)}
    if faltan := {"learn", "practice", "produce"} - fases:
        fallos.append(f"unidad: faltan fases {sorted(faltan)}")

    n_act = len(ACTIVITY_RE.findall(src))
    if n_act < 6:
        fallos.append(f"unidad: pocas actividades ({n_act} < 6)")

    return fallos, n_act


def main(rutas):
    total = 0
    for nombre in rutas:
        ruta = Path(nombre)
        fallos, n_act = revisar(ruta)
        total += len(fallos)
        if fallos:
            print(f"\n{ruta.name}: {len(fallos)} PROBLEMA(S)")
            for f in fallos:
                print(f"  - {f}")
        else:
            print(f"{ruta.name}: OK ({n_act} actividades)")
    print()
    if total:
        print(f"FALLO: {total} problema(s)")
        return 1
    print("OK: contenido sin errores de integridad")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
