# Build and deploy

How to build the site, serve it locally or on a network, and publish it to GitHub Pages.

## Build

```bash
cd site
npm install
npm run build
```

Output lands in `site/dist`: 36 HTML pages plus CSS, inline scripts, fonts and media. Expect about 31.9 MB,
mostly images. A full build takes a few seconds.

The build is fully static. There is no server, no database and no API call at runtime, so `dist` can be served
by anything that serves files.

## The two path variables

Everything that makes the build relocatable lives in `site/astro.config.mjs`:

```js
const base = process.env.BASE_PATH ?? "/bodhinature/";
const site = process.env.SITE_URL ?? "https://example.github.io";
```

| Variable | Controls | Wrong value causes |
| --- | --- | --- |
| `BASE_PATH` | The sub-path every URL and asset reference is built against, including the `/zh/` tree | Unstyled pages, broken images, 404s on every link |
| `SITE_URL` | Canonical URLs, `og:` metadata, the sitemap, `robots.txt` | Search engines indexing the wrong origin |

The default `/bodhinature/` matches a GitHub project page. For a root domain, a user site
(`user.github.io`), or a custom domain, build with `BASE_PATH=/`.

```bash
# project page (replace user with your GitHub account)
BASE_PATH=/bodhinature/ SITE_URL=https://user.github.io npm run build

# root domain
BASE_PATH=/ SITE_URL=https://bodhinature.com npm run build
```

`trailingSlash: "always"` means every route is a directory with an `index.html`, so `/about/` works on any
static host without rewrite rules.

## Run locally

| Command | Binds to | Use |
| --- | --- | --- |
| `npm run dev` | localhost | Editing, hot reload |
| `npm run preview` | localhost | Checking the real build |
| `npm run preview:lan` | `0.0.0.0` | Phones and other machines on the same network |

`preview:lan` prints the addresses, for example:

```
Local    http://localhost:4321/bodhinature/
Network  http://YOUR-LAN-IP:4321/bodhinature/
```

Both the IP and the machine's Bonjour name (`http://YOUR-HOSTNAME.local:4321/bodhinature/`) work. The name
works because `astro.config.mjs` sets `server.allowedHosts` to `.local` by default; add extra names with
`ALLOWED_HOSTS=name.local,other-name.local`. Astro's preview server reads that key from `server` rather than
`preview`, and without it Vite answers 403 to any request carrying an unknown `Host` header.

This is a dev tool, not a deployment: it dies with the terminal, and it is not hardened. Use it for a demo on
the same Wi-Fi, and Pages for anything longer lived.

## Deploy to GitHub Pages

The workflow at `.github/workflows/deploy.yml` runs on every push to `main`:

1. checkout
2. Node 22 with npm cache
3. `npm ci` in `site/`
4. `npm run build` with `BASE_PATH=/` and `SITE_URL=https://onenesslight.org`
5. upload `site/dist` as a Pages artefact
6. deploy

The build includes `site/public/CNAME`, which keeps `onenesslight.org` attached to the Pages site.

Enable it once per repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Set the Pages custom domain to `onenesslight.org` under **Settings → Pages → Custom domain**. The build uses
`BASE_PATH=/`, so the site expects to be served from the domain root. After DNS verification, enable
**Enforce HTTPS**; the repository already includes the apex A/AAAA records and the `www` CNAME.

### Publishing by hand

```bash
cd site
BASE_PATH=/ SITE_URL=https://onenesslight.org npm run build
npx gh-pages -d dist
```

### Custom domain

This repository is configured for `onenesslight.org`. Build with `BASE_PATH=/` and
`SITE_URL=https://onenesslight.org`, keep `site/public/CNAME` at the domain name, and add the domain under
**Settings → Pages → Custom domain**. With a root base, the site expects to be served from `/`; the project
URL redirects to the custom domain once Pages accepts it.

## What ships

| Item | Detail |
| --- | --- |
| Pages | 36 HTML files across the English and Chinese editions |
| Build time | ~2 s, about 31.9 MB total |
| CSS | One stylesheet, inlined when small enough |
| JS | 2.7 KB inline on a median page, 3.2 KB at most; no bundles, no framework |
| Fonts | Fraunces and Inter, latin subsets, 412 KB, self-hosted in `public/fonts` |
| Media | 127 WebP derivatives from 62 sources, with `srcset`, in `public/media` |
| Extras | `.nojekyll`, `robots.txt`, `sitemap.xml` listing both trees |

No third-party requests: no analytics, no font CDN, no embeds.

`npm run check:site` verifies the build without a server: it walks `dist/`, resolves every internal
`href`/`src`/`srcset`, confirms every `#fragment` exists on its target page, checks `<html lang>` and
reciprocal `hreflang`, and enforces the size budgets. It reads the base path off the output, so it works for
`/bodhinature/` and `/BodhisattvaNatureWebstie/` alike. Run it after every build.

## Troubleshooting

**Every link 404s but the homepage loads.** `BASE_PATH` does not match where the site is served. Check the
`<base>`-relative URLs in `dist/index.html`: if they start `/bodhinature/` but you are serving from the repo
root, rebuild with `BASE_PATH=/`.

**Styles missing entirely.** The CSS is referenced through the base path. Same cause as above.

**Pages deploy succeeds but the site is blank.** Pages is set to "Deploy from a branch" instead of "GitHub
Actions", so it is publishing the repository root rather than `dist`. Change the source setting.

**Chinese pages 404 in production but work locally.** The `/zh/` tree was not copied because `dist` was built
before the routes were added. Rebuild; confirm with
`find site/dist -name index.html | wc -l` returning 36.

**`preview:lan` reachable on the machine but not from a phone.** The phone is on a guest network or the router
has AP isolation on. The server is fine, the network is not.

**Server starts but the port is taken.** Another preview is running. Find it with
`lsof -nP -iTCP:4321 -sTCP:LISTEN` on macOS/Linux or `netstat -ano | findstr :4321` on Windows, stop it, or run
`npm run preview -- --port 4322`.

## Rebuilding after a content change

Content is not generated from the archive at build time; it lives in hand-edited files. So:

| Change | Edit | Rebuild needed |
| --- | --- | --- |
| Copy, headings, any English text | `src/i18n/en.ts`, `src/data/*.ts` | dev only |
| Chinese text | `src/i18n/zh.ts`, `src/i18n/zh-data.ts` | dev only |
| A new image | add the source, register it in `tools/process_images.py`, run that script | yes |
| A new page | a view in `src/views/`, two wrappers in `src/pages/`, a route in `src/lib/routes.ts` | yes |
| Contact details | `contact` in `src/i18n/index.ts` | dev only |
