# Extract: how the archive was built

The site you see is the second half of the work. This is the first: getting the content and every image off
the original WordPress install and onto disk in a shape a static site can use.

The archive is not committed (620 MB). Everything below regenerates it into `api/`, `raw/`, `content/` and
`media/` at the repository root.

## Before you start

From the repository root:

```bash
# macOS / Linux
python3 -m venv .venv && source .venv/bin/activate
# Windows PowerShell
py -m venv .venv; .\.venv\Scripts\Activate.ps1

pip install -r tools/requirements.txt
```

The source site is WordPress 7.1.4 with Divi, WooCommerce 11.2.1 and GiveWP 4.19.1, at
<https://bodhinature.com>. Its REST API is open to anonymous requests. Not all of it, though: menus and
settings require authentication, and the media library is not the complete set of images on the site. Both
gaps are handled below.

## Step 1 — REST harvest

```bash
python tools/harvest.py
```

Paginates each collection with `per_page=100`, reads `X-WP-TotalPages`, retries 5xx with backoff and a
240-second timeout, and writes one JSON file per endpoint:

| Endpoint | Records | File |
| --- | --- | --- |
| `/wp/v2/pages` | 52 | `api/pages.json` |
| `/wp/v2/posts` | 4 | `api/posts.json` |
| `/wp/v2/media` | 811 | `api/media.json` (16 MB with `_embed`) |
| `/wp/v2/categories` / `tags` / `users` | 5 / 35 / 2 | `api/*.json` |
| `/wp/v2/give_forms` / `dlm_download` / `comments` | 1 / 5 / 2 | `api/*.json` |
| `/wc/store/v1/products` | 1 | `api/products.json` |

Also saves `api/root.json`, the 1.8 MB REST index (1099 routes, 28 namespaces), useful for discovering
endpoints.

Takes about three minutes. The pages endpoint alone returns 5 MB with `_embed=1` and takes 19 seconds.

**Known limits.** `/wp/v2/menus`, `/wp/v2/menu-items` and `/wp/v2/settings` return 401. Navigation is rebuilt
from the rendered `<ul id="menu-…">` in the homepage HTML instead. Of the 817 media records the API reports,
811 are served; the other 6 are filtered out.

## Step 2 — Crawl the rendered site

```bash
python tools/crawl.py
```

Fetches all 105 URLs from `sitemap.xml` and its 9 child sitemaps into `raw/pages/`, then walks every page
looking for images in `<img src>`, `srcset`, `data-src`, inline `style` background-images and `<link>` tags.
It writes `raw/image_refs.json`: 360 unique image URLs with the pages that reference each one.

**This is why the crawl exists.** The media library is not the full image set. The homepage slideshow is
Smart Slider, and its 22 images live under `wp-content/uploads/slider/cache/…`, which the REST API never
mentions. Theme and plugin assets (a Divi preloader, a slider shadow PNG) only appear in HTML too. Without
this step the hero slideshow and a few decorations would simply be missing.

Expect ~80 MB of HTML.

## Step 3 — Download every image

```bash
python tools/download_media.py
```

Takes the union of content references, media records and crawl references, and writes them to `media/`,
preserving the original `wp-content/uploads/...` path structure. Filenames contain Chinese, so everything is
URL-decoded on the way in.

Resumable: files already on disk are skipped. 8 threads. Ends with around 844 files and 516 MB, including four
non-image uploads (`recite.zip`, `SINGAPORE.zip`, `条状装饰.zip` and a 32 MB `.mov`).

If a few fail with a protocol-relative URL (`//bodhinature.com/...`), normalise to `https:` and retry.

## Step 4 — Turn Divi into content blocks

```bash
python tools/extract.py
```

Divi renders real HTML into `content.rendered`, so this is a parse, not a shortcode parser. For each page it
walks the HTML in document order and keeps headings, paragraphs, lists, quotes, buttons and images as an
ordered block list, dropping anything inside `nav`/`footer`/`header`/`form`, unescaping entities and collapsing
whitespace.

Two things matter more than they sound:

- **Deduplication.** Divi repeats whole sections. Without it, the same heading appears two or three times per
  page and the copy triples.
- **The footer.** Every page carries the same block (email, three cities, twelve connection points). It is
  stripped from page content and rebuilt as global data.

Output: `content/pages/<slug>.json` and `content/posts/<slug>.json`, plus flat text versions in
`content/text/` and an index with word counts.

Two pages (`top-course`, and the `weekend-retreat` post) return raw shortcodes rather than HTML. Those were
rebuilt by hand from their SEO description and rendered siblings.

## Step 5 — Optimise the images the site actually uses

```bash
python tools/process_images.py
```

The site does not use all 844 files. `process_images.py` holds a manifest of 62 curated sources, each named for
its role (`hero`, `program-dharma`, `branch-canada`, `teacher-zhenjue`, …). For each it writes WebP at
480/900/1600 px (the logo at 180/360, avatars at 75) into `site/public/media/`, and regenerates
`site/src/data/images.json`, which the `<Img>` component reads for `srcset` and intrinsic dimensions.

Three details worth knowing:

- **Alpha is preserved.** The five programme icons are transparent PNGs and must stay transparent.
- **One white background is keyed out.** `bodhisattva.png` ships with its white matte baked in; a flood fill
  from the border makes it transparent so the emblem floats on the page.
- **Per-slot width caps.** A 250 px book cover should not ship a 1600 px file. `WIDTH_OVERRIDES` caps it.

Run this after adding any new image, or the manifest and the `public/media` folder drift.

## Step 6 — Verify

```bash
ls api content/pages media | head
cat api/_summary.json
du -sh api media content raw
```

Expected: 52 page files, 4 post files, ~844 media files, and about 620 MB total.

## Re-running the whole thing

The pipeline is ordered and idempotent except for `harvest.py`, which overwrites its JSON:

```bash
python tools/harvest.py
python tools/crawl.py
python tools/download_media.py
python tools/extract.py
python tools/process_images.py
```

Then rebuild the site (`cd site && npm run build`). If you re-run `extract.py` after the source site changed,
diff `content/pages/*.json` before trusting the output: the copy in `src/i18n/` and `src/data/` is hand-edited
from these blocks, and is not regenerated automatically.

## What the extraction cannot give you

- **Text inside images.** Several pages carry their content only in poster graphics; the Tibetan Book page is
  62 images and 31 words. That text needs OCR, and was left out.
- **Menus and settings**, 401 as above.
- **Six media records** the API will not serve.
- **The homepage slider copy.** The 22 slides are images; any text is baked into the artwork.

These are recorded in [`../DATA.md`](../DATA.md).
