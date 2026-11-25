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

    # page-level imagery from the original pages
    "programs-banner": "2024/08/programs-new.jpg",
    "dharma-hero": "2024/08/Study-dharma.jpg",
    "mindfulness-hero": "2024/08/background-mindfulness.jpg",
    "taichi-hero": "2024/06/Taichi-Und2.png",
    "taichi-alt": "2024/06/Taichi-Und3.png",
    "hospice-hero": "2024/07/hospice-5.jpg",
    "happiness-hero": "2022/09/happy-face-2.jpg",
    "volunteer-hero": "2022/06/Depositphotos_187138182_DS-scaled.jpg",
    "donate-hero": "2024/08/donate.jpg",
    "whale-earth": "2026/01/鲸鱼地球.jpg",

    # the book in four languages + donation assets
    "book-en": "2024/05/195913178.jpeg",
    "book-de": "2024/05/Germany-scaled.jpeg",
    "book-fr": "2024/05/fr-scaled.jpeg",
    "book-nl": "2024/05/e24236a03f760b5-scaled.jpeg",
    "tibetan-book": "2024/07/Tibetan-.png",
    "paypal": "2022/10/paypal.png",
    "qr-1": "2026/05/微信图片_20260515194017_1303_23.jpg",
    "qr-2": "2026/05/微信图片_20260515194019_1304_23.jpg",

    # testimonial portraits
    "avatar-1": "2022/05/75x75_auto.png",
    "avatar-2": "2022/05/75x75_auto8.png",
    "avatar-3": "2022/05/75x75_auto6.png",
    "avatar-4": "2022/05/75x75_auto7.png",
    "avatar-5": "2022/05/75x75_auto1.png",

    # upcoming-events posters
    "event-walk": "2026/11/walk-for-peace.jpg",
    "about-bodhisattva": "2022/06/bodhisattva-forest.jpg",
    "buddha-radiant": "2022/07/buddha-radiant.jpg",
    "environment": "2024/04/stefan-kunze-w4dMKHulKDg-unsplash-scaled.jpg",
    "event-wisdom-practice": "2026/10/微信图片_20261019200148-scaled.png",
    "past-journey-calgary": "2026/10/微信图片_20261019200154-scaled.png",
    # season + past events (posters from wp-content/uploads/2026/10)
    "event-dawn": "2026/10/微信图片_2026-10-20_173844_916-scaled.png",
    "event-journey": "2026/10/微信图片_2026-10-20_175047_944-scaled.png",
    "event-awakening": "2026/10/微信图片_2026-10-20_173856_361.png",
    "event-bodhi": "2026/10/微信图片_2026-10-20_182225_695.png",
    "past-journey": "2024/09/Journey-正方形.jpg",
    "past-thailand": "2024/07/recent-activities-in-Thailand-2024.png",
    "past-malaysia": "2024/04/malaysia-family-camp.png",

    "event-retreat": "2024/04/3-1.png",
    "event-online": "2024/04/4-1.png",
    "event-wisdom": "2024/04/2-1.png",
    "event-mindfulness": "2024/04/1-1.png",

    # the foundation's logo (header)
    "logo": "2022/05/logo-1.png",

    # teachers
    "teacher-zhenjue": "2022/07/zhenjue-shifu-photo-5.png",
    "teacher-deyang": "2026/01/WechatIMG3426.jpg",
}

WIDTHS = [480, 900, 1600]

# per-image width caps so small display slots don't ship 1600px files
WIDTH_OVERRIDES = {
    "book-en": [480, 760],
    "book-de": [480, 760],
    "book-fr": [480, 760],
    "book-nl": [480, 760],
    "qr-1": [480, 640],
    "qr-2": [480, 640],
    "paypal": [480],
    "whale-earth": [480, 900],
    "donate-hero": [480, 760],
    "avatar-1": [75],
    "avatar-2": [75],
    "avatar-3": [75],
    "avatar-4": [75],
    "avatar-5": [75],
    "teacher-zhenjue": [392, 600],
    "teacher-deyang": [371, 560],
    "hero": [480, 900, 1600],
    "logo": [180, 360],
    "event-retreat": [480, 900, 1400],
    "event-walk": [480, 900, 1400],
    "about-bodhisattva": [900, 1600],
    "buddha-radiant": [480, 900],
    "environment": [480, 900, 1400],
    "event-wisdom-practice": [480, 900, 1400],
    "past-journey-calgary": [480, 900, 1400],
    "event-dawn": [360, 720],
    "event-journey": [360, 720],
    "event-awakening": [360, 720],
    "event-bodhi": [360, 720],
    "past-journey": [300],
    "past-thailand": [360, 720],
    "past-malaysia": [360, 720],
    "event-online": [480, 900, 1400],
    "programs-banner": [480, 900, 1600],
    "contact-hero": [480, 900, 1600],
    "community-ill": [480, 900, 1600],
    "branch-canada": [480, 900, 1600],
    "branch-us": [480, 900, 1600],
    "branch-australia": [480, 900, 1600],
    "branch-japan": [480, 900, 1600],
}

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
    for w in WIDTH_OVERRIDES.get(name, WIDTHS):
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
