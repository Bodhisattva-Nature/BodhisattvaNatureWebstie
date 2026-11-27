# Light of Oneness, rebuilt

A static, GitHub Pages–ready rebuild of [bodhinature.com](https://bodhinature.com), in English and Simplified
Chinese. Same foundation, same teachings, same imagery; a new interface.

Everything public on the original site was harvested first: 52 pages, 4 posts, 811 media items, 5
testimonials. Then it was re-edited into a structured content model and designed around, rather than scraped
into a template.

![Home page](docs/preview-home.jpg)

## Quick start

```bash
git clone <this repo> && cd BodhisattvaNatureWebstie/site
npm install
npm run dev            # http://localhost:4321/bodhinature/   (English)
                       # http://localhost:4321/bodhinature/zh/ (中文)
```

Requires Node 22+. Astro 5 is pinned below 7 because Astro 7 needs Node 22.23.4 and this project was built on
22.23.2.

To build and serve the real output:

```bash
npm run build          # → site/dist
npm run preview        # localhost only
npm run preview:lan    # bound to 0.0.0.0, shareable on the local network
npm run check:site     # verify every link, fragment, hreflang pair and budget in dist
npm run check:paths    # reject machine-specific paths and hostnames
npm run shot -- <url> <output>  # screenshot a running page
```

## Documentation

| | |
| --- | --- |
| [`docs/SETUP.md`](docs/SETUP.md) | Prerequisites, install, first run |
| [`docs/EXTRACT.md`](docs/EXTRACT.md) | The harvesting pipeline: how the archive was built, step by step |
| [`docs/BUILD.md`](docs/BUILD.md) | Build, base paths, deploy to GitHub Pages, LAN preview, troubleshooting |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | How the code is organised: routes, i18n, data model, images, CSS |
| [`DATA.md`](DATA.md) | What was harvested, what could not be, and why |

## Repository layout

```
.
├── site/                  the Astro app, this is what gets deployed
│   ├── src/
│   │   ├── i18n/          interface copy (en.ts, zh.ts) and the Chinese collections
│   │   ├── data/          content model: programmes, teachers, branches, quotes, events
│   │   ├── views/         one component per page, each taking a `lang` prop
│   │   ├── pages/         thin route wrappers: the / and /zh/ trees
│   │   ├── components/    Header, Footer, Img, Search, Lotus, Divider
│   │   ├── layouts/       Base.astro, head, metadata, reveal + drawer scripts
│   │   └── styles/        global.css, the whole design system
│   ├── public/
│   │   ├── media/         optimised WebP derivatives (generated)
│   │   └── fonts/         Fraunces + Inter, latin subsets, self-hosted
│   └── astro.config.mjs
├── tools/                 the data pipeline (Python, plus one Node script)
│   ├── harvest.py         WordPress REST → api/
│   ├── crawl.py           all 105 URLs → raw/pages + image reference map
│   ├── extract.py         Divi HTML → ordered content blocks → content/
│   ├── download_media.py  every upload → media/
│   ├── process_images.py  curated sources → site/public/media + images.json
│   ├── shot.mjs           screenshot helper (puppeteer-core)
│   └── requirements.txt
├── docs/                  documentation and preview images
├── .github/workflows/     Pages deployment
├── DATA.md                archive inventory and method
└── README.md
```

The scraped archive (`api/`, `media/`, `content/`, `raw/`) is **not** committed. It is 620 MB and can be
rebuilt with `tools/`; see [`docs/EXTRACT.md`](docs/EXTRACT.md).

## What is in the archive

| | |
| --- | --- |
| Pages / posts | 52 / 4 |
| Media records | 811 (844 files on disk, including the slider cache and theme assets) |
| Sitemap coverage | 105 URLs across 9 sub-sitemaps |
| Wisdom quotes | 14 |
| Testimonials | 5 |
| Branches | 9 |
| Event listings | 2 weekly + 4 season retreats + 3 past |
| Archive size | 620 MB (`api` 23, `media` 516, `raw` 81, `content` 0.6) |

## The site

36 pages across both editions: home, about, programmes index, five programme pages, wisdom, community, events,
volunteer, donate, visit, 404, plus the Chinese activities and regional pages. English at `/`, Chinese under
`/zh/`.

![Programmes](docs/preview-programs.jpg)

**Design.** Parchment and ink with monk-robe saffron, temple maroon, gilded gold and jade. Fraunces for
display, Inter for text, both self-hosted so the page makes no third-party requests. The hero image sits in a
gilded temple arch, prayer flags run along the top of the page, a lotus divides sections and a faint mandala is
etched into the maroon bands. All ornament is inline SVG, never an image.

**Imagery.** All of it is the foundation's own: their golden-Buddha banner, their five illustrated programme
icons, their country-map banners, the bodhi-leaf emblem, the four translated book covers, the real PayPal mark
and both donation QR codes. Nothing was substituted from stock. 62 source images become 127 WebP derivatives.

**Two languages.** Every page is one view component taking a `lang` prop, so the markup exists once and the two
editions differ only in content. The Chinese is written rather than translated: 安乐 · 自在 · 真谛, not
和平 · 自由 · 真理, with 汉传 terminology and CJK-specific typography. See
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

**Performance.** No client framework. About 3 KB of inline script per page for the header, drawer, search
palette and quote rotator. 31.9 MB in `dist`, mostly images, and 412 KB of fonts.

![Events](docs/preview-events.jpg)

## Deploy

`.github/workflows/deploy.yml` builds and publishes on every push to `main` for the custom domain:

| Variable | Purpose | Deploy value |
| --- | --- | --- |
| `BASE_PATH` | Sub-path the site is served from | `/` |
| `SITE_URL` | Origin for canonical URLs and the sitemap | `https://onenesslight.org` |

The custom domain itself is recorded in `site/public/CNAME`, so every deployment keeps it attached. Enable
Pages once in **Settings → Pages → Build and deployment → Source: GitHub Actions**, set the custom domain to
`onenesslight.org`, and enable HTTPS after GitHub issues the certificate. Full detail is in
[`docs/BUILD.md`](docs/BUILD.md).

## Provenance and limits

Every sentence comes from the original pages. Programme copy, the Four Noble Truths, the seven-point posture,
the daily schedule, volunteer roles, donation methods, phone numbers and addresses are transcribed from
bodhinature.com. Nothing was invented: where the source was vague, the copy is vague or the line is omitted.

Left behind: the Divi layout, the Smart Slider carousels, the WooCommerce cart (its only product is a
donation), and the AIOSEO/GiveWP plumbing.

Known gaps, recorded in [`DATA.md`](DATA.md): six media records are filtered out of the public API, some pages
carry their content only inside poster images, and a few branch details (Thailand, Malaysia, Sweden) were never
published.
