#!/usr/bin/env python3
"""Harvest all public WordPress data from bodhinature.com into api/*.json"""
import json, os, sys, time, urllib.request, urllib.error, urllib.parse, gzip

BASE = "https://bodhinature.com/wp-json"
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUT = os.path.join(ROOT, "api")
os.makedirs(OUT, exist_ok=True)
UA = {"User-Agent": "Mozilla/5.0 (Macintosh) archive/1.0", "Accept-Encoding": "gzip"}


def fetch(url, tries=5):
    last = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=240) as r:
                body = r.read()
                if r.headers.get("Content-Encoding") == "gzip":
                    body = gzip.decompress(body)
                return body, {k.lower(): v for k, v in r.headers.items()}
        except urllib.error.HTTPError as e:
            if e.code in (400, 401, 403, 404):
                raise
            last = e
        except Exception as e:
            last = e
        time.sleep(2 + i * 3)
    raise last


def api(path, params=None, per_page=100, max_pages=80):
    items, page = [], 1
    while page <= max_pages:
        q = {"per_page": per_page, "page": page}
        if params:
            q.update(params)
        url = f"{BASE}{path}?{urllib.parse.urlencode(q)}"
        try:
            body, hdr = fetch(url)
        except urllib.error.HTTPError as e:
            if e.code == 400:
                break
            raise
        data = json.loads(body)
        if not isinstance(data, list) or not data:
            break
        items.extend(data)
        total = int(hdr.get("x-wp-totalpages") or 1)
        print(f"  {path} p{page}/{total} +{len(data)} (total {hdr.get('x-wp-total')})")
        if page >= total:
            break
        page += 1
        time.sleep(0.3)
    return items


TARGETS = [
    ("pages", "/wp/v2/pages", {"status": "publish", "_embed": 1}),
    ("posts", "/wp/v2/posts", {"status": "publish", "_embed": 1}),
    ("media", "/wp/v2/media", {"_embed": 1}),
    ("categories", "/wp/v2/categories", None),
    ("tags", "/wp/v2/tags", None),
    ("menus", "/wp/v2/menus", None),
    ("users", "/wp/v2/users", None),
    ("give_forms", "/wp/v2/give_forms", None),
    ("product_cat", "/wp/v2/product_cat", None),
    ("product_tag", "/wp/v2/product_tag", None),
]

summary = {}
for name, path, params in TARGETS:
    print(f"[{name}]")
    try:
        items = api(path, params)
    except Exception as e:
        print(f"  !! {type(e).__name__}: {e}", file=sys.stderr)
        summary[name] = {"error": f"{type(e).__name__}: {e}"}
        continue
    json.dump(items, open(os.path.join(OUT, f"{name}.json"), "w"), indent=1, ensure_ascii=False)
    summary[name] = len(items)

print("[menu_items]")
try:
    items = api("/wp/v2/menu-items")
    json.dump(items, open(os.path.join(OUT, "menu_items.json"), "w"), indent=1, ensure_ascii=False)
    summary["menu_items"] = len(items)
except Exception as e:
    print(f"  !! {e}", file=sys.stderr)
    summary["menu_items"] = {"error": str(e)}

print("[products]")
try:
    items = api("/wc/store/v1/products")
    json.dump(items, open(os.path.join(OUT, "products.json"), "w"), indent=1, ensure_ascii=False)
    summary["products"] = len(items)
except Exception as e:
    print(f"  products: {e}", file=sys.stderr)
    summary["products"] = {"error": str(e)}

for nm, path in [("types", "/wp/v2/types"), ("taxonomies", "/wp/v2/taxonomies")]:
    try:
        body, _ = fetch(BASE + path)
        json.dump(json.loads(body), open(os.path.join(OUT, f"{nm}.json"), "w"), indent=1)
        print(f"[{nm}] ok")
    except Exception as e:
        print(f"[{nm}] {e}", file=sys.stderr)

print(json.dumps(summary, indent=1))
json.dump(summary, open(os.path.join(OUT, "_summary.json"), "w"), indent=1)
