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
| images referenced across all 105 URLs | 360 unique | `raw/image_refs.json` |

Plus `api/root.json`, the 1.8 MB REST index listing 1099 routes and 28 namespaces, and `api/types.json` /
`api/taxonomies.json` describing the content model.

Sitemaps gave 105 URLs across 9 sub-sitemaps: 49 pages, 4 posts, 5 testimonials, 5 downloads, 35 tags, 4
categories, 1 product, 1 give form, 1 post archive. That is the whole public surface.

## Files on disk

```
api/         raw JSON, exactly as returned (23 MB)
raw/         homepage HTML + urls.txt from the sitemaps
content/     extracted content, one JSON per page (plus content/text/*.txt flat text)
media/       844 files: the media library, the Smart Slider cache, theme assets (516 MB)
```

`content/pages/*.json` and `content/posts/*.json` hold an ordered block list per page: headings, paragraphs,
lists, quotes, buttons and images, with the page's SEO title and description. `content/index.json` has word
and block counts for all 49 non-empty pages.


## The authenticated harvest (25 November 2026)

The public API hides a layer the foundation can see. Signed in as `YiFan` in the browser, the same endpoints
return more, and two of them return at all:

| Endpoint | Public | Authenticated | File |
| --- | --- | --- | --- |
| `/wp/v2/pages` | 52 | **58** (6 drafts) | `api/admin_pages.json` |
| `/wp/v2/posts` | 4 | **7** (3 drafts) | `api/admin_posts.json` |
| `/wp/v2/media` | 811 | **817** | `api/admin_media.json` |
| `/wp/v2/menus` | 401 | **2** — "primary menu", "contact us 菜单" | `api/admin_menus.json` |

REST cookie authentication needs the `X-WP-Nonce` from `wpApiSettings` on any wp-admin page; without it every
request answers 401 even with a valid login cookie.

**The six extra media records are documents, not pictures.** The 817 files break down as 798 images, 9 PDFs,
5 MP4, 1 MOV and 3 ZIPs. The PDFs are the four translated books of *The Essence of Happiness and True
Freedom*: English, French, German and Dutch, plus duplicates the download-manager plugin keeps under
`dlm_uploads/`. All were already on disk from the original crawl; the only genuinely missing file was a
75×75 avatar-sized PNG.

`media-index.csv` lists all 817 with date, MIME type, title, path, size and source URL.

The XML export (`wp-admin/export.php`) was not usable: the endpoint answers 202 to a scripted POST, and
submitting the form in-browser returns no file. The REST dump above covers the same ground: every post,
page, media record and menu, including the drafts the export would add.


## The complete XML export (25 November 2026)

`wp-admin/export.php` answers 202 to a scripted POST, so the first attempts failed. It works through a real
browser download: `Page.setDownloadBehavior` on the automation Chrome, then submitting the form in page
context. Result: `bodhinaturefoundation.WordPress.2026-11-25.xml`, 9.0 MB, 1,138 items, saved as
`raw/bodhinature-export.xml` (gitignored).

| Item type | Count |
| --- | --- |
| attachment | 817 |
| give_payment | 131 |
| et_pb_layout (Divi) | 80 |
| page | 58 |
| nav_menu_item | 23 |
| post | 7 |
| dlm_download + versions | 5 + 5 |
| testimonial | 5 |
| frm_form_actions, frm_styles, tss-sc | 2 + 1 + 1 |
| product, give_forms, custom_css | 1 each |

Plus 5,148 `postmeta` rows and 25 terms.

**Treat this file as confidential.** The 131 `give_payment` entries are donation records, and the export also
carries donor and form-submission metadata. It is excluded from git by `/raw/` and must not be published,
committed or shared outside the foundation.

What the export adds over the REST harvest: the Divi layout library, the Formidable form definitions behind
the old contact and volunteer forms, the menu structure (HOME, PROGRAM, ABOUT, COMMUNITY, CONTACT, VOLUNTEER,
DONATE, CN/中文), the download-manager entries for the four books, and every custom field.

## Server access

No shell on the host. Ports 22 and 2222 refuse connections; FTP (21) and MySQL (3306) are open but no
credentials exist for either, and guessing them is not something to do. Everything above was obtained through
the WordPress admin session instead, which is why the export above matters: it is the closest thing to a
dump available without the host's login.

## How the extraction works

Divi renders real HTML into `content.rendered`, not bare shortcodes, so the pages parse cleanly. Two
exceptions: `top-course` and the `weekend-retreat` post return unrendered shortcode text, and both were
rebuilt by hand from their AIOSEO description and rendered siblings.

`tools/extract.py` walks the rendered HTML in document order, keeps block-level elements, drops anything
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

Run these from the repository root.

```bash
# macOS / Linux
python3 -m venv .venv && source .venv/bin/activate
# Windows PowerShell
py -m venv .venv; .\.venv\Scripts\Activate.ps1

pip install -r tools/requirements.txt
python tools/harvest.py          # REST endpoints → api/
python tools/extract.py          # Divi HTML → content/
python tools/download_media.py   # uploads → media/
python tools/process_images.py   # curated → site/public/media + manifest
```

`harvest.py` paginates with `per_page=100`, reads `X-WP-TotalPages`, and retries on 5xx with a 240-second
timeout; the pages endpoint alone returns 5 MB when `_embed=1` is set and takes 19 seconds.

The page crawl (`tools/crawl.py`) fetches all 105 URLs, walks every `<img>`, `srcset`, inline `background-image`
and `<link>`, and records 360 unique image URLs. That is how the Smart Slider cache and the theme assets were
found: they are not in the media library, and 22 homepage slides plus a Divi preloader only show up in rendered
HTML.

`process_images.py` takes 50 files straight out of `media/`: the hero banner, the five programme
illustrations, the oneness photographs, the branch banners, the volunteer photos. It emits WebP at
480/900/1600/2200 px into `site/public/media`, writing `site/src/data/images.json` for the `<Img>` component.
Transparency is preserved (the programme icons are PNGs with alpha), and two source files needed repair:
`bodhisattva.png` ships with a baked-in white background, which is flood-filled to transparent from the border.
