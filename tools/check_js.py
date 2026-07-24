"""tools/check_js.py — Parser JS real (tree-sitter) para cazar errores de sintaxis.

Reporta nodos ERROR y MISSING con linea/columna. Soporta sintaxis moderna
(?., ??, spread, optional catch). Sin Node, sin compilador.
"""
import glob
import sys
from tree_sitter import Parser, Language
import tree_sitter_javascript as tsjs

LANG = Language(tsjs.language())
parser = Parser(LANG)


def errors_in(node, src):
    out = []
    if node.type == "ERROR" or node.is_missing:
        r = node.start_point
        snippet = src[node.start_byte:node.start_byte + 60].decode("utf-8", "replace").replace("\n", " ")
        out.append((r[0] + 1, r[1] + 1, "MISSING" if node.is_missing else "ERROR", snippet))
    for ch in node.children:
        out.extend(errors_in(ch, src))
    return out


def main():
    fails = 0
    for f in sorted(glob.glob("src/**/*.js", recursive=True)):
        src = open(f, "rb").read()
        tree = parser.parse(src)
        errs = errors_in(tree.root_node, src)
        if errs:
            fails += 1
            for ln, col, kind, snip in errs[:5]:
                print(f"{f}:{ln}:{col} {kind} -> {snip!r}")
    print("OK: sin errores de sintaxis" if not fails else f"\n{fails} archivo(s) con errores")
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
