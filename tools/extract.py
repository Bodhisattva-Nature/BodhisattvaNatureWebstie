#!/usr/bin/env python3
"""Turn Divi page HTML into clean ordered content blocks."""
import json, os, re, sys, html
from bs4 import BeautifulSoup, NavigableString, Tag

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
API = os.path.join(ROOT, "api")
OUT = os.path.join(ROOT, "content")
os.makedirs(OUT, exist_ok=True)

HDR = re.compile(r"^h([1-6])$")
SKIP_TAGS = {"script", "style", "noscript", "nav", "footer", "header", "form", "iframe"}
BLOCK_TEXT = {"p", "li", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6", "figcaption", "td"}


def norm(t):
    t = html.unescape(t or "")
    t = t.replace("\xa0", " ")
    t = re.sub(r"\s+", " ", t).strip()
    t = re.sub(r"^[\*\u2022\-\u2013]\s*", "", t) if len(t) < 120 and re.match(r"^[\*\u2022]\s", t) else t
    return t


def clean_title(t):
    t = norm(re.sub(r"<[^>]+>", "", t))
    return t


def img_ok(src, alt):
    if not src or src.startswith("data:"):
        return False
    if re.search(r"(spacer|placeholder|blank|transparent|1x1|pixel)", src, re.I):
        return False
    if src.endswith(".svg") and not alt:
        return False
    return True


def extract(raw_html):
    soup = BeautifulSoup(raw_html, "lxml")
    for t in soup.find_all(list(SKIP_TAGS)):
        t.decompose()
    # drop Divi icon-only / hidden modules
    blocks = []
    seen_text = {}
    for el in soup.descendants:
        if not isinstance(el, Tag):
            continue
        name = el.name
        if name == "img":
            src = el.get("src") or el.get("data-src") or ""
            src = src.split("?")[0]
            alt = norm(el.get("alt", ""))
            if img_ok(src, alt):
                blocks.append({"type": "image", "src": src, "alt": alt})
            continue
        if name == "a":
            cls = " ".join(el.get("class", []))
            if "et_pb_button" in cls or el.get("data-icon") is not None:
                txt = norm(el.get_text())
                href = el.get("href", "")
                if txt:
                    blocks.append({"type": "button", "text": txt, "href": href})
            continue
        if name not in BLOCK_TEXT:
            continue
        # skip if an ancestor already captured this text (nested p in li etc.)
        if el.find_parent(["p", "li", "blockquote"]):
            continue
        txt = norm(el.get_text(" "))
        if not txt or len(txt) < 2:
            continue
        if re.fullmatch(r"[\W_]+", txt):
            continue
        if HDR.match(name):
            lvl = int(name[1])
            key = ("h", txt.lower())
            if key in seen_text:
                continue
            seen_text[key] = 1
            blocks.append({"type": "heading", "level": lvl, "text": txt})
        elif name == "blockquote":
            blocks.append({"type": "quote", "text": txt})
        elif name == "li":
            # collect all li text individually
            blocks.append({"type": "listitem", "text": txt})
        else:
            key = ("p", txt)
            if key in seen_text:
                continue
            seen_text[key] = 1
            blocks.append({"type": "paragraph", "text": txt})
    # collapse consecutive identical
    out = []
    for b in blocks:
        if out and b.get("text") and out[-1].get("text") == b.get("text") and out[-1]["type"] == b["type"]:
            continue
        out.append(b)
    # group listitems
    grouped = []
    for b in out:
        if b["type"] == "listitem" and grouped and grouped[-1]["type"] == "list":
            grouped[-1]["items"].append(b["text"])
        elif b["type"] == "listitem":
            grouped.append({"type": "list", "items": [b["text"]]})
        else:
            grouped.append(b)
    return grouped


def main():
    index = []
    for kind, fn in [("page", "pages.json"), ("post", "posts.json")]:
        data = json.load(open(os.path.join(API, fn)))
        for p in data:
            blocks = extract(p["content"]["rendered"])
            if not blocks:
                continue
            imgs = [b["src"] for b in blocks if b["type"] == "image"]
            title = clean_title(p["title"]["rendered"])
            seo = p.get("aioseo_head_json") or {}
            doc = {
                "id": p["id"],
                "kind": kind,
                "slug": p["slug"],
                "title": title,
                "link": p["link"],
                "date": p["date"][:10],
                "modified": p["modified"][:10],
                "excerpt": norm(re.sub(r"<[^>]+>", "", (p.get("excerpt") or {}).get("rendered", ""))).replace("[…]", "").strip(),
                "seo_title": seo.get("title"),
                "seo_description": seo.get("description"),
                "images": list(dict.fromkeys(imgs)),
                "blocks": blocks,
            }
            outdir = os.path.join(OUT, kind + "s")
            os.makedirs(outdir, exist_ok=True)
            json.dump(doc, open(os.path.join(outdir, p["slug"] + ".json"), "w"), indent=1, ensure_ascii=False)
            index.append({"kind": kind, "slug": p["slug"], "title": title, "blocks": len(blocks), "images": len(doc["images"]), "words": sum(len(b.get("text", "").split()) + sum(len(i.split()) for i in b.get("items", [])) for b in blocks)})
    json.dump(index, open(os.path.join(OUT, "index.json"), "w"), indent=1, ensure_ascii=False)
    index.sort(key=lambda x: -x["words"])
    print(f"{'kind':6} {'words':>6} {'blocks':>6} {'imgs':>5}  slug")
    for i in index:
        print(f"{i['kind']:6} {i['words']:6} {i['blocks']:6} {i['images']:5}  {i['slug']}")
    print("TOTAL", len(index))


if __name__ == "__main__":
    main()
