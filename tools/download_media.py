#!/usr/bin/env python3
"""Download every image referenced in content (and remaining uploads) into media/, preserving original names."""
import json, os, re, sys, glob, hashlib, urllib.parse
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
MEDIA = os.path.join(ROOT, "media")
os.makedirs(MEDIA, exist_ok=True)
S = requests.Session()
S.headers.update({"User-Agent": "Mozilla/5.0 (Macintosh) archive/1.0", "Referer": "https://bodhinature.com/"})


def safe(url):
    p = urllib.parse.urlparse(url)
    path = urllib.parse.unquote(p.path)
    m = re.search(r"/wp-content/uploads/(.+)$", path)
    rel = m.group(1) if m else hashlib.md5(url.encode()).hexdigest() + os.path.splitext(path)[1]
    rel = rel.replace("..", "_")
    return rel


def collect():
    urls = set()
    for f in glob.glob(os.path.join(ROOT, "content", "*", "*.json")):
        if f.endswith("index.json"):
            continue
        d = json.load(open(f))
        urls.update(d.get("images", []))
    for f in ["api/media.json", "api/products.json"]:
        p = os.path.join(ROOT, f)
        if not os.path.exists(p):
            continue
        for m in json.load(open(p)):
            if "source_url" in m and m["source_url"]:
                urls.add(m["source_url"])
            for im in m.get("images", []) or []:
                if isinstance(im, dict) and im.get("src"):
                    urls.add(im["src"])
    return sorted(u for u in urls if re.search(r"\.(jpe?g|png|gif|webp|avif|svg|mp4|pdf)$", u.split("?")[0], re.I))


def dl(url):
    rel = safe(url)
    dest = os.path.join(MEDIA, rel)
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        return url, "skip", 0
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    try:
        r = S.get(url, timeout=90)
        if r.status_code != 200:
            return url, f"HTTP{r.status_code}", 0
        with open(dest, "wb") as f:
            f.write(r.content)
        return url, "ok", len(r.content)
    except Exception as e:
        return url, f"ERR {type(e).__name__}", 0


if __name__ == "__main__":
    urls = collect()
    print(f"{len(urls)} media urls")
    open(os.path.join(ROOT, "media", "_urls.txt"), "w").write("\n".join(urls))
    ok = err = skip = 0
    total = 0
    with ThreadPoolExecutor(max_workers=8) as ex:
        futs = [ex.submit(dl, u) for u in urls]
        for i, f in enumerate(as_completed(futs), 1):
            u, st, n = f.result()
            total += n
            if st == "ok": ok += 1
            elif st == "skip": skip += 1
            else:
                err += 1
                print("  FAIL", st, u)
            if i % 50 == 0:
                print(f"  {i}/{len(urls)} ok={ok} skip={skip} err={err} {total/1e6:.1f}MB")
    print(f"DONE ok={ok} skip={skip} err={err} bytes={total/1e6:.1f}MB")
