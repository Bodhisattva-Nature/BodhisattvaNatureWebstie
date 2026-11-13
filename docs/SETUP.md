# Setup

Get the site running locally. Ten minutes, most of it `npm install`.

## What you need

| | Version | Why |
| --- | --- | --- |
| Node.js | 22.x (tested on 22.23.2) | Astro 5 needs 22+. Astro 7 needs 22.23.4, so it is pinned out. |
| npm | 10.x | Ships with Node. |
| Python | 3.11+ | Only for `tools/` (re-harvesting). The site itself does not need it. |

Check with `node -v && npm -v && python3 -V`.

## Install the site

```bash
cd site
npm install
npm run dev
```

Open <http://localhost:4321/bodhinature/>. The Chinese edition is at the same URL plus `/zh/`.

`npm install` pulls Astro and `puppeteer-core` (used only by `tools/shot.mjs` for screenshots; it drives the
Chrome already on the machine rather than downloading one).

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload at `:4321`, served under `/bodhinature/` |
| `npm run build` | Static build into `site/dist` |
| `npm run preview` | Serves the built output on localhost |
| `npm run preview:lan` | Same, bound to `0.0.0.0`, for phones and other machines on the network |

## Install the pipeline (optional)

Only needed if you want to re-scrape the source site or regenerate images. Everything the site needs is
already committed except the media derivatives, which are committed too.

```bash
cd /path/to/bodhinature-modern
python3 -m venv .venv
./.venv/bin/pip install -r tools/requirements.txt
```

That installs `requests`, `beautifulsoup4`, `lxml` and `pillow`.

## Configuration

`site/astro.config.mjs` reads two environment variables, both optional:

```js
const base = process.env.BASE_PATH ?? "/bodhinature/";
const site = process.env.SITE_URL ?? "https://example.github.io";
```

`BASE_PATH` is the sub-path the site is served from. Locally it stays `/bodhinature/` so the dev server matches
production. Building for a root domain (`https://example.com/`) means `BASE_PATH=/`. There is no `.env` file;
set them inline or let the GitHub Actions workflow derive them.

## Common problems

**`npm install` fails on Node 22.23.2 with an engine warning.** Astro 7 was installed. Run
`npm install astro@^5` to pin back down.

**Pages load without styles.** `BASE_PATH` does not match how you are serving the site. If you open
`http://localhost:4321/` you get a 404 because the site lives at `/bodhinature/`; if you built with
`BASE_PATH=/` and opened `/bodhinature/`, assets will 404.

**`preview` is not reachable from another device.** It binds to localhost by default. Use `npm run preview:lan`.

**Fonts render as a fallback serif, or Chinese text looks like a sans.** Expected fallbacks: the site loads
Fraunces, Inter and their latin subsets. Chinese falls back to Songti/Source Han where the OS has them, which
macOS does and Linux servers may not.
