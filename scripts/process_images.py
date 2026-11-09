#!/usr/bin/env python3
"""Curate + optimize site imagery into webp at multiple widths."""
import json, os
from PIL import Image, ImageOps, ImageEnhance
Image.MAX_IMAGE_PIXELS = None

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SRC = os.path.join(ROOT, "media")
OUT = os.path.join(ROOT, "site", "public", "media")
os.makedirs(OUT, exist_ok=True)

MANIFEST = {
    "hero":            "2022/08/2000-local-activity.jpg",
    "monk-beach":      "2022/07/900-106.jpg",
    "meditate":        "2022/07/900-2.jpg",
    "book":            "2022/07/900-105.jpg",
    "forest-rays":     "2022/07/900-11.jpg",
    "still-water":     "2022/08/2000-program-2.jpg",
    "ocean":           "2022/07/900-114.jpg",
    "dawn-bench":      "2022/07/900-31.jpg",
    "lone-tree":       "2022/07/900-35.jpg",
    "meadow":          "2022/07/900-37.jpg",
    "heart-hands":     "2022/07/900-29.jpg",
    "walkers":         "2022/07/900-20.jpg",
    "sunflowers":      "2022/07/900-55.jpg",
    "shore":           "2022/07/900-26.jpg",
    "stones":          "2022/07/900-6.jpg",
    "valley":          "2022/07/900-62.jpg",
    "field":           "2022/05/Mindfulness-and-Meditation.jpg",
    "group":           "2022/07/900-58.jpg",
    "taichi":          "2022/08/TAI-CHI-2000.jpg",
    "teacher-zhenjue": "2022/07/zhenjue-shifu-photo-5.png",
    "teacher-deyang":  "2026/01/WechatIMG3426.jpg",
}
WIDTHS = [480, 900, 1600, 2200]
# name: (contrast, colour, brightness)
ENHANCE = {
    "taichi": (1.32, 1.15, 0.94),
    "hero": (1.05, 1.05, 1.0),
}
result = {}

for name, rel in MANIFEST.items():
    src = os.path.join(SRC, rel)
    if not os.path.exists(src):
        print("MISSING", name, rel); continue
    im = Image.open(src)
    im = ImageOps.exif_transpose(im)
    if im.mode in ("RGBA", "LA", "P"):
        bg = Image.new("RGB", im.size, (247, 243, 236))
        im = im.convert("RGBA")
        bg.paste(im, mask=im.split()[-1]); im = bg
    else:
        im = im.convert("RGB")
    if name in ENHANCE:
        c, col, br = ENHANCE[name]
        im = ImageEnhance.Contrast(im).enhance(c)
        im = ImageEnhance.Color(im).enhance(col)
        im = ImageEnhance.Brightness(im).enhance(br)
    w0, h0 = im.size
    variants = []
    for w in WIDTHS:
        if w > w0 * 1.15:
            continue
        h = round(h0 * (w / w0))
        r = im.resize((w, h), Image.LANCZOS)
        fn = f"{name}-{w}.webp"
        r.save(os.path.join(OUT, fn), "WEBP", quality=82, method=6)
        variants.append({"w": w, "h": h, "file": fn})
    if not variants:
        r = im.resize((min(w0, 1600), round(h0 * min(w0, 1600) / w0)), Image.LANCZOS)
        fn = f"{name}-{r.width}.webp"
        r.save(os.path.join(OUT, fn), "WEBP", quality=82, method=6)
        variants.append({"w": r.width, "h": r.height, "file": fn})
    result[name] = {"w": w0, "h": h0, "variants": variants}
    print(f"{name:18} {w0}x{h0} -> {[v['w'] for v in variants]}")

json.dump(result, open(os.path.join(ROOT, "site", "src", "data", "images.json"), "w"), indent=1)
print("total files", len(os.listdir(OUT)))
