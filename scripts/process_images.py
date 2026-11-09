#!/usr/bin/env python3
"""Curate + optimize the foundation's own imagery into webp at multiple widths.

Every source file here is a file from the site's media library. Keys are the names
the site uses; values are paths under media/ (i.e. wp-content/uploads/...).
Graphics with transparency keep their alpha channel.
"""
import json, os
from PIL import Image, ImageOps, ImageEnhance

Image.MAX_IMAGE_PIXELS = None

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SRC = os.path.join(ROOT, "media")
OUT = os.path.join(ROOT, "site", "public", "media")
os.makedirs(OUT, exist_ok=True)

MANIFEST = {
    # hero + primary banners
    "hero": "2022/06/Bodhi-Nature-Meditation-Courses.jpg",
    "contact-hero": "2026/01/Contact-Us-new.jpg",
    "emblem": "2024/08/bodhisattva.png",

    # program illustrations (transparent PNGs)
    "program-dharma": "2024/08/dharma-.png",
    "program-mindfulness": "2024/08/mindfulness-.png",
    "program-taichi": "2024/08/taijiquan-.png",
    "program-happiness": "2024/08/happy-fish.png",
    "program-wisdom": "2024/08/智慧语录.png",
    "program-hospice": "2024/08/hospice-.png",
    "community-ill": "2024/08/community-bodhinature.jpg",

    # about: the oneness series + the threefold path
    "peace": "2024/08/peace-.jpg",
    "oneness": "2024/08/oneness-.jpg",
    "aurora": "2024/08/oneness-2.jpg",
    "mountain-ill": "2024/08/oneness-3.png",
    "temple": "2024/08/oneness-4.png",
    "learning": "2024/08/Learning.jpg",
    "reflecting": "2024/08/Reflecting.jpg",
    "practicing": "2024/08/Practicing.jpg",

    # retreat / nature
    "feather": "2022/08/retreat-8-900.jpg",
    "clouds": "2022/08/retreat-10-900.jpg",
    "lilac": "2022/08/about-us-900-9.jpg",
    "leaves": "2022/08/900-61.jpg",

    # volunteers at work
    "vol-dubbing": "2022/08/dubbing-900.jpg",
    "vol-editor": "2022/08/editor-900-2.jpg",
    "vol-translate": "2022/08/translate-900-1.jpg",
    "vol-coordinate": "2022/08/coordinate-900-4.jpg",

    # branches
    "branch-canada": "2024/03/3-6.png",
    "branch-us": "2024/03/2-8.png",
    "branch-australia": "2024/03/1-11.png",
    "branch-japan": "2024/04/Japan-.png",
    "branch-singapore": "2024/03/Singapore.jpg",

    # teachers
    "teacher-zhenjue": "2022/07/zhenjue-shifu-photo-5.png",
    "teacher-deyang": "2026/01/WechatIMG3426.jpg",
}

WIDTHS = [480, 900, 1600, 2200]

# flat white backgrounds to key out (the source files ship them baked in)
KEY_OUT_WHITE = {"emblem"}


def key_white(im, thresh=244):
    """Flood-fill near-white from the border and make it transparent."""
    from collections import deque

    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    seen = bytearray(w * h)
    q = deque()
    for x in range(w):
        q.append((x, 0)); q.append((x, h - 1))
    for y in range(h):
        q.append((0, y)); q.append((w - 1, y))
    while q:
        x, y = q.popleft()
        if not (0 <= x < w and 0 <= y < h):
            continue
        i = y * w + x
        if seen[i]:
            continue
        r, g, b, a = px[x, y]
        if r < thresh or g < thresh or b < thresh:
            continue
        seen[i] = 1
        px[x, y] = (r, g, b, 0)
        q.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))
    return im

# name: (contrast, colour, brightness)
ENHANCE = {}

result = {}

for name, rel in MANIFEST.items():
    src = os.path.join(SRC, rel)
    if not os.path.exists(src):
        print("MISSING", name, rel)
        continue

    im = Image.open(src)
    im = ImageOps.exif_transpose(im)

    has_alpha = False
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        lo, _ = im.getchannel("A").getextrema()
        has_alpha = lo < 250

    if not has_alpha:
        if im.mode != "RGB":
            bg = Image.new("RGB", im.size, (245, 240, 230))
            im = im.convert("RGBA")
            bg.paste(im, mask=im.split()[-1])
            im = bg
        else:
            im = im.convert("RGB")

    if name in KEY_OUT_WHITE:
        im = key_white(im)
        has_alpha = True

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
        r.save(os.path.join(OUT, fn), "WEBP", quality=86, method=6)
        variants.append({"w": w, "h": h, "file": fn})
    if not variants:
        w = min(w0, 1600)
        r = im.resize((w, round(h0 * w / w0)), Image.LANCZOS)
        fn = f"{name}-{r.width}.webp"
        r.save(os.path.join(OUT, fn), "WEBP", quality=86, method=6)
        variants.append({"w": r.width, "h": r.height, "file": fn})

    result[name] = {"w": w0, "h": h0, "alpha": has_alpha, "variants": variants}
    print(f"{name:20} {w0}x{h0}{' a' if has_alpha else '  '} -> {[v['w'] for v in variants]}")

json.dump(result, open(os.path.join(ROOT, "site", "src", "data", "images.json"), "w"), indent=1)
print("total files", len(os.listdir(OUT)))
