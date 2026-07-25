"""tools/check_imports.py - Caza identificadores LLAMADOS pero nunca importados
ni declarados en el archivo (ej. usar completeLesson() sin su import).

check_js.py valida SINTAXIS; esto valida REFERENCIAS de funciones. Heuristico y
conservador: solo revisa callees (foo() y new Foo()) que son identificadores
simples (no obj.metodo()). Sobre-aproxima los nombres ligados (cualquier binding
en el archivo cuenta como en-alcance) para evitar falsos positivos. Sin Node.
"""
import glob
import sys
from tree_sitter import Parser, Language
import tree_sitter_javascript as tsjs

LANG = Language(tsjs.language())
parser = Parser(LANG)

# Globals del navegador/JS que no requieren import.
GLOBALS = {
    "console", "window", "document", "Math", "JSON", "Object", "Array", "String",
    "Number", "Boolean", "Date", "Set", "Map", "WeakMap", "WeakSet", "Promise",
    "RegExp", "Error", "TypeError", "RangeError", "SyntaxError", "setTimeout",
    "setInterval", "clearTimeout", "clearInterval", "requestAnimationFrame",
    "cancelAnimationFrame", "fetch", "localStorage", "sessionStorage", "alert",
    "confirm", "prompt", "parseInt", "parseFloat", "isNaN", "isFinite",
    "encodeURIComponent", "decodeURIComponent", "structuredClone", "queueMicrotask",
    "CustomEvent", "Event", "URL", "URLSearchParams", "FormData", "Blob", "File",
    "FileReader", "Audio", "Image", "SpeechSynthesisUtterance", "AbortController",
    "IntersectionObserver", "MutationObserver", "ResizeObserver", "crypto",
    "navigator", "location", "history", "atob", "btoa", "Intl", "Symbol", "BigInt",
    "Proxy", "Reflect", "globalThis", "performance", "speechSynthesis", "screen",
    "matchMedia", "getComputedStyle", "DOMParser", "TextEncoder", "TextDecoder",
    "Notification", "WebSocket", "Worker", "Function", "Map", "Array", "eval",
    "SpeechRecognition", "webkitSpeechRecognition", "AudioContext", "webkitAudioContext",
    "Uint8Array", "Uint16Array", "Int8Array", "Float32Array", "Float64Array",
    "ArrayBuffer", "DataView", "Headers", "Request", "Response", "Path2D",
}

BIND_LEAF = {"identifier", "shorthand_property_identifier_pattern"}


def text(node, src):
    return src[node.start_byte:node.end_byte].decode("utf-8", "replace")


def add_pattern_ids(node, src, out):
    """Agrega todo nombre ligado dentro de un patron (destructuring/params)."""
    for d in walk(node):
        if d.type in BIND_LEAF:
            out.add(text(d, src))


def collect_bound(node, src, out):
    """Nombres ligados (imports, funciones, vars, params...) - sobre-aproximado."""
    t = node.type
    if t in ("import_specifier", "namespace_import", "import_clause"):
        for ch in node.children:
            if ch.type == "identifier":
                out.add(text(ch, src))
    elif t in ("function_declaration", "generator_function_declaration", "class_declaration"):
        nm = node.child_by_field_name("name")
        if nm:
            out.add(text(nm, src))
    elif t == "variable_declarator":
        nm = node.child_by_field_name("name")
        if nm and nm.type == "identifier":
            out.add(text(nm, src))
        elif nm:  # object_pattern / array_pattern -> destructuring
            add_pattern_ids(nm, src, out)
    # Params y patrones: todo nombre ligado (incl. shorthand) cuenta.
    if t in ("formal_parameters", "object_pattern", "array_pattern", "catch_clause"):
        add_pattern_ids(node, src, out)
    for ch in node.children:
        collect_bound(ch, src, out)


def walk(node):
    yield node
    for ch in node.children:
        yield from walk(ch)


def find_calls(node, src, out):
    """Callees de foo() y new Foo() que son identificadores simples."""
    if node.type in ("call_expression", "new_expression"):
        fn = node.child_by_field_name("function") or node.child_by_field_name("constructor")
        if fn and fn.type == "identifier":
            out.append((fn.start_point[0] + 1, text(fn, src)))
    for ch in node.children:
        find_calls(ch, src, out)


def main():
    fails = 0
    for f in sorted(glob.glob("src/**/*.js", recursive=True)):
        src = open(f, "rb").read()
        root = parser.parse(src).root_node
        bound = set()
        collect_bound(root, src, bound)
        calls = []
        find_calls(root, src, calls)
        bad = [(ln, nm) for ln, nm in calls
               if nm not in bound and nm not in GLOBALS]
        # dedup por nombre (reporta 1a linea)
        seen = {}
        for ln, nm in bad:
            seen.setdefault(nm, ln)
        if seen:
            fails += 1
            for nm, ln in sorted(seen.items(), key=lambda x: x[1]):
                print(f"{f}:{ln} usa '{nm}()' pero no esta importado ni declarado")
    print("OK: sin referencias sin importar" if not fails else f"\n{fails} archivo(s) con posibles referencias sin importar")
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
