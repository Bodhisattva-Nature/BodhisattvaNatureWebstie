# Bodhisattva Nature Foundation, rebuilt

A static, GitHub Pages–ready rebuild of [bodhinature.com](https://bodhinature.com), built from the site's own
content rather than from its layout. Same foundation, same teachings, same contact details; new interface.

The original is WordPress 7.1.4 with the Divi builder, WooCommerce and GiveWP. Everything public on it was
harvested first (52 pages, 4 posts, 811 media items, 5 testimonials; see `DATA.md`), then the prose was
re-edited into a structured content model and a new front end was designed around it.

![Home page](docs/preview-home.jpg)

---

## Run it

```bash
cd site
npm install
npm run dev      # http://localhost:4321/bodhinature/
npm run build    # static output in site/dist
npm run preview
```

Node 22+ required. Astro 5 (pinned below 7 because this machine runs 22.23.2, and Astro 7 wants 22.23.4).

## Deploy to GitHub Pages

`.github/workflows/deploy.yml` builds and publishes on every push to `main`. Two environment variables drive
the paths:

| Variable | Purpose | Default |
| --- | --- | --- |
| `BASE_PATH` | Sub-path the site is served from | `/bodhinature/` |
| `SITE_URL` | Origin used for canonical URLs and the sitemap | `https://example.github.io` |

The workflow derives both from the repository, so a project page at `https://user.github.io/repo/` works with
no edits. For a user or organisation page (`https://user.github.io/`), set `BASE_PATH=/`.

In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

To publish by hand instead:

```bash
cd site
BASE_PATH=/bodhinature/ SITE_URL=https://user.github.io npm run build
npx gh-pages -d dist
```

## Structure

```
site/
  src/
    data/site.ts        all page copy: programs, teachers, branches, schedule, testimonials
    data/quotes.json    14 short teachings, extracted from the original wisdom-words page
    data/images.json    generated image manifest (widths + variants)
    components/         Header, Footer, Img, Search
    layouts/Base.astro  head, metadata, reveal + drawer scripts
    pages/              one file per route; programs/[slug] generates the five programme pages
    styles/global.css   the whole design system
  public/
    media/              optimised WebP derivatives
    fonts/              Fraunces + Inter, latin subsets, self-hosted
```

14 routes: home, about, programmes index, five programme pages, wisdom, community, volunteer, donate, visit,
404. The original's 52 pages collapse into those 14. Most of the old pages were duplicate Divi layouts for the
same five programmes and five branch addresses.

![Programmes index](docs/preview-programs.jpg)

## Design notes

Paper and ink, one saffron accent, nothing else. Fraunces for display, Inter for text, both self-hosted so the
site has no third-party requests at runtime.

- **Type does the work.** The hero is three words at 7rem. Sections are separated by rules and space rather
  than boxes and shadows.
- **Motion is restrained.** Fade-and-rise on scroll, a slow Ken Burns on the hero image, a marquee of
  programme and city names. All of it disabled under `prefers-reduced-motion`.
- **The foundation's own imagery, throughout.** 30 files drawn from `media/`. The hero is their golden-Buddha banner, the five programme
  cards are their illustrated icons (monk, flower figure, Tai Chi pair, hospice house, fish spiral), the
  branches use their map banners, and the About page uses the bodhi-leaf emblem and the oneness photographs.
  Nothing was substituted from stock; the only processing is WebP conversion and, for the emblem, keying its
  white background to transparent.
- **Search is local.** ⌘K opens a command palette over a JSON index built at compile time. No service, no
  key, no network.

## Accessibility and performance

- Semantic landmarks, skip-free linear heading order, `aria-current` on the active nav item.
- Every image carries alt text; decorative images are marked empty.
- Keyboard: ⌘K or the header button opens search, arrows move, Enter follows, Esc closes.
- Two variable fonts, latin and latin-ext subsets, 412 KB total, `font-display: swap`, preloaded.
- No client framework. The only JavaScript is the header, the drawer, the search palette and a quote
  rotator: about 3 KB of inline script per page, zero JS bundles.
- `site/dist` is 5.1 MB: 4.4 MB of WebP across 74 files, 412 KB of fonts, one 20 KB stylesheet, and 14 HTML
  files. The source archive is 431 MB across 812 original uploads.

## Content provenance

Every sentence on the site comes from the original pages. Programme copy, the Four Noble Truths, the
seven-point posture, the daily schedule, the volunteer roles, the donation methods, phone numbers and
addresses are all transcribed from bodhinature.com. Testimonials are the five published accounts, unedited
apart from trimming.

What was **not** carried over: the Divi layout, the Smart Slider carousels, the WooCommerce cart (the only
product is a donation), and the AIOSEO/GiveWP plumbing. Nothing was invented to fill a gap. Where the source
was vague, the copy is vague or the line is omitted.

## Re-harvesting

`scripts/` holds the Python used to build the archive: `harvest.py` (WP REST), `extract.py` (Divi HTML →
content blocks), `download_media.py`, `process_images.py`, plus `shot.mjs` for screenshots. They need the
`.venv` in the project root and are documented in `DATA.md`.
