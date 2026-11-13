#!/usr/bin/env python3
"""Crawl every public URL, save HTML, and extract every image reference it uses."""
import json, os, re, sys, time, urllib.parse
import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
RAW = os.path.join(ROOT, "raw", "pages")
os.makedirs(RAW, exist_ok=True)
S = requests.Session()
S.headers.update({"User-Agent": "Mozilla/5.0 (Macintosh) archive/1.0", "Referer": "https://bodhinature.com/"})

urls = []
for line in open(os.path.join(ROOT, "raw", "urls.txt")):
    if "\t" in line:
        kind, u = line.strip().split("\t", 1)
        urls.append((kind, u.strip()))

def slug(u):
    p = urllib.parse.urlparse(u)
    s = p.path.strip("/").replace("/", "__") or "home"
    if p.query: s += "_" + re.sub(r"\W+", "", p.query)[:20]
    return s

def grab(item):
    kind, u = item
    fn = os.path.join(RAW, slug(u) + ".html")
    if os.path.exists(fn) and os.path.getsize(fn) > 500:
        return u, fn, "cached"
    try:
        r = S.get(u, timeout=90)
        open(fn, "w", encoding="utf-8").write(r.text)
        return u, fn, r.status_code
    except Exception as e:
        return u, fn, f"ERR {e}"

with ThreadPoolExecutor(max_workers=6) as ex:
    for u, fn, st in ex.map(grab, urls):
        print(st, u)

# extract images from every saved page
IMG_ATTRS = ("src", "data-src", "data-lazy-src", "data-thumb")
refs = {}
def add(u, page):
    u = u.strip()
    if not u or u.startswith("data:"): return
    full = urllib.parse.urljoin(page, u).split("?")[0].split("#")[0]
    if "bodhinature.com" not in full: return
    if not re.search(r"\.(jpe?g|png|gif|webp|avif|svg|mp4|mov|pdf)$", full, re.I): return
    refs.setdefault(full, set()).add(page)

for fn in sorted(os.listdir(RAW)):
    page = "https://bodhinature.com/" + (fn.replace("__", "/").replace(".html", "").rstrip(".home") + "/" if fn != "home.html" else "")
    soup = BeautifulSoup(open(os.path.join(RAW, fn), encoding="utf-8", errors="replace").read(), "lxml")
    for img in soup.find_all("img"):
        for a in IMG_ATTRS:
            if img.get(a): add(img[a], fn)
        if img.get("srcset"):
            for part in img["srcset"].split(","):
                add(part.strip().split(" ")[0], fn)
    for tag in soup.find_all(style=True):
        for m in re.findall(r"url\((['\"]?)([^)'\"]+)\1\)", tag["style"]):
            add(m[1], fn)
    for tag in soup.find_all(["source", "link"]):
        for a in ("src", "href"):
            if tag.get(a): add(tag[a], fn)
    for m in re.findall(r'url\((["\']?)([^)"\']+\.(?:jpe?g|png|gif|webp|svg))\1\)', str(soup)):
        add(m[1], fn)
    for meta in soup.find_all("meta", property="og:image"):
        if meta.get("content"): add(meta["content"], fn)

out = {k: sorted(v) for k, v in refs.items()}
json.dump(out, open(os.path.join(ROOT, "raw", "image_refs.json"), "w"), indent=1)
print("unique image refs:", len(out))
