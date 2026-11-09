# Source archive

What was pulled off bodhinature.com, where it lives, and what is missing from it.

Harvested 9 November 2026. The site runs WordPress 7.1.4 on nginx, with the Divi theme, WooCommerce 11.2.1,
Give 4.19.1 and All in One SEO 5.0.4.

## What came down

| Endpoint | Records | File |
| --- | --- | --- |
| `/wp/v2/pages` | 52 | `api/pages.json` |
| `/wp/v2/posts` | 4 | `api/posts.json` |
| `/wp/v2/media` | 811 | `api/media.json` (16 MB) |
| `/wp/v2/categories` | 5 | `api/categories.json` |
| `/wp/v2/tags` | 35 | `api/tags.json` |
| `/wp/v2/users` | 2 | `api/users.json` |
| `/wp/v2/give_forms` | 1 | `api/give_forms.json` |
| `/wp/v2/dlm_download` | 5 | `api/dlm_download.json` |
| `/wp/v2/comments` | 2 | `api/comments.json` |
| `/wc/store/v1/products` | 1 | `api/products.json` (a $0 "Donation" product) |
| testimonial pages | 5 | `api/testimonials.json` (scraped from the sitemap) |

Plus `api/root.json`, the 1.8 MB REST index listing 1099 routes and 28 namespaces, and `api/types.json` /
`api/taxonomies.json` describing the content model.

Sitemaps gave 105 URLs across 9 sub-sitemaps: 49 pages, 4 posts, 5 testimonials, 5 downloads, 35 tags, 4
categories, 1 product, 1 give form, 1 post archive. That is the whole public surface.

## Files on disk

```
api/         raw JSON, exactly as returned (23 MB)
raw/         homepage HTML + urls.txt from the sitemaps
content/     extracted content, one JSON per page (plus content/text/*.txt flat text)
media/       818 downloaded uploads, original filenames preserved (468 MB)
```

`content/pages/*.json` and `content/posts/*.json` hold an ordered block list per page: headings, paragraphs,
lists, quotes, buttons and images, with the page's SEO title and description. `content/index.json` has word
and block counts for all 49 non-empty pages.

## How the extraction works

Divi renders real HTML into `content.rendered`, not bare shortcodes, so the pages parse cleanly. Two
exceptions: `top-course` and the `weekend-retreat` post return unrendered shortcode text, and both were
rebuilt by hand from their AIOSEO description and rendered siblings.

`scripts/extract.py` walks the rendered HTML in document order, keeps block-level elements, drops anything
inside `nav`/`footer`/`header`/`form`, unescapes entities, collapses whitespace and removes exact duplicate
blocks. Divi repeats sections constantly — "ABOUT US" appears twice on one page — so deduplication matters
more than it sounds.

Every page carries the same footer block (email, three cities, twelve spiritual connection points). It was
stripped from page content and rebuilt once as site-wide data.

## What is missing

- **Menus.** `/wp/v2/menus` and `/wp/v2/menu-items` return 401 for anonymous requests. Navigation was
  reconstructed from the rendered `<ul id="menu-...">` in the homepage HTML instead.
- **Settings.** `/wp/v2/settings` is 401 as well. Nothing needed it.
- **Drafts, revisions, private and trashed content.** Not public, not fetched.
- **Media.** 811 of 817 attachments are listed; the API reports 817 in `X-WP-Total` and 6 records are
  filtered out of the public collection. Every URL the API does return is on disk: 818 files, including the
  four non-image uploads (`recite.zip`, `SINGAPORE.zip`, `条状装饰.zip`, a 32 MB `.mov`).
- **Text inside images.** Several pages carry their content only in poster graphics (the Tibetan Book of
  Living and Dying page is 62 images and 31 words). That text is not recoverable without OCR and was left
  out of the rebuild.
- **WooCommerce checkout, cart and account pages.** They render empty shells to anonymous visitors.

## Re-running

```bash
cd /Users/pavan/temp/bodhinature-modern
python3 -m venv .venv && ./.venv/bin/pip install beautifulsoup4 lxml requests pillow
./.venv/bin/python scripts/harvest.py          # REST endpoints → api/
./.venv/bin/python scripts/extract.py          # Divi HTML → content/
./.venv/bin/python scripts/download_media.py   # uploads → media/
./.venv/bin/python scripts/process_images.py   # curated → site/public/media + manifest
```

`harvest.py` paginates with `per_page=100`, reads `X-WP-TotalPages`, and retries on 5xx with a 240-second
timeout; the pages endpoint alone returns 5 MB when `_embed=1` is set and takes 19 seconds.

`process_images.py` takes 30 files straight out of `media/`: the hero banner, the five programme
illustrations, the oneness photographs, the branch banners, the volunteer photos. It emits WebP at
480/900/1600/2200 px into `site/public/media`, writing `site/src/data/images.json` for the `<Img>` component.
Transparency is preserved (the programme icons are PNGs with alpha), and two source files needed repair:
`bodhisattva.png` ships with a baked-in white background, which is flood-filled to transparent from the border.
