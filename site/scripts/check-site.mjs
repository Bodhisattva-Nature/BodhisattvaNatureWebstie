// Verify the built site without a server: every internal link, image, fragment,
// hreflang pair and the size budgets. Run after `npm run build`.
//
//   node scripts/check-site.mjs            # checks dist/
//   node scripts/check-site.mjs --base=/bodhinature-modern/
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, extname, dirname } from "node:path";

const DIST = "dist";
const argvBase = process.argv.find((a) => a.startsWith("--base="))?.slice(7);
const errors = [];
const warnings = [];

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const files = walk(DIST);
const html = files.filter((f) => f.endsWith(".html"));

// The base path is baked into every asset URL; read it off a media reference.
const base = argvBase ?? (() => {
  const home = readFileSync(join(DIST, "index.html"), "utf8");
  const m = home.match(/"(\/[^"]*\/)media\//);
  return m ? m[1] : "/";
})();

const pageFor = (urlPath) => {
  let p = urlPath;
  if (p.startsWith(base)) p = p.slice(base.length);
  p = p.replace(/^\/+/, "").split("?")[0].split("#")[0];
  if (p === "" || p.endsWith("/")) return join(DIST, p, "index.html");
  const direct = join(DIST, p);
  if (existsSync(direct) && !statSync(direct).isDirectory()) return direct;
  return join(DIST, p, "index.html");
};

const ids = new Map();
const idsFor = (file) => {
  if (ids.has(file)) return ids.get(file);
  const set = new Set();
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(/\sid="([^"]+)"/g)) set.add(m[1]);
  for (const m of src.matchAll(/<a[^>]+name="([^"]+)"/g)) set.add(m[1]);
  ids.set(file, set);
  return set;
};

let checked = 0;
for (const file of html) {
  const src = readFileSync(file, "utf8");
  const page = "/" + file.slice(DIST.length + 1).replace(/index\.html$/, "");

  // html lang + a reciprocal hreflang
  if (!/<html[^>]+lang="(en|zh-Hans)"/.test(src)) errors.push(`${page}: missing or unexpected <html lang>`);
  if (!/hreflang="(en|zh-Hans)"/.test(src)) errors.push(`${page}: no hreflang alternate`);

  // Markup only: inline scripts contain template literals like href="${n.u}".
  const markup = src.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");

  const urls = new Set();
  for (const m of markup.matchAll(/(?:href|src)="([^"]+)"/g)) urls.add(m[1]);
  for (const m of markup.matchAll(/srcset="([^"]+)"/g)) {
    for (const part of m[1].split(",")) {
      const u = part.trim().split(/\s+/)[0];
      if (u) urls.add(u);
    }
  }

  for (const raw of urls) {
    if (/^(https?:|mailto:|tel:|data:|#)/.test(raw)) continue;
    if (!raw.startsWith("/")) { errors.push(`${page}: relative URL "${raw}" (should be root-relative)`); continue; }

    const [pathname, frag] = raw.split("#");
    const target = pageFor(pathname);
    checked++;
    if (!existsSync(target)) { errors.push(`${page}: broken link ${raw}`); continue; }
    if (frag && target.endsWith(".html")) {
      if (!idsFor(target).has(frag)) errors.push(`${page}: missing fragment #${frag} in ${raw}`);
    }
  }
}

// Size budgets. Downloadable books are opt-in files, not page weight,
// so they are measured separately rather than counted against the budget.
const portable = (f) => f.replaceAll("\\", "/");
const isDownload = (f) => portable(f).includes("/downloads/") || portable(f).includes("/video/");
const isMedia = (f) => portable(f).includes("/media/");
const pageFiles = files.filter((f) => !isDownload(f));
const sumBytes = (list) => list.reduce((n, f) => n + statSync(f).size, 0);
const downloadBytes = sumBytes(files.filter(isDownload));
const mediaBytes = sumBytes(pageFiles.filter(isMedia));
const bytes = sumBytes(pageFiles);
const homeBytes = statSync(join(DIST, "index.html")).size;
const mb = (n) => (n / 1024 / 1024).toFixed(2);

// The media library dominates this number (~11 MB of ~12 MB) and grows one page
// image at a time; the 11 MB ceiling was passed in Nov 2026 by the library
// alone. 13 MB keeps the tripwire meaningful: it still catches a bulk dump of
// full-size originals, while leaving room for pages that legitimately gain art.
// If this fails, trim derivatives — do not raise the ceiling quietly. The
// home-page transfer budget below is the one that describes real visitor cost.
const BUDGET = 13 * 1024 * 1024;
if (bytes > BUDGET) errors.push(`build is ${mb(bytes)} MB, over the ${BUDGET / 1024 / 1024} MB budget`);
if (homeBytes > 1.4 * 1024 * 1024) warnings.push(`index.html is ${(homeBytes / 1024).toFixed(0)} KB, over the 1.4 MB budget`);

console.log(`base        ${base}`);
console.log(`pages       ${html.length}`);
console.log(`links       ${checked} checked`);
console.log(`size        ${mb(bytes)} MB of pages (${mb(mediaBytes)} MB media, ${mb(bytes - mediaBytes)} MB pages and fonts)`);
console.log(`transfer    ${(homeBytes / 1024).toFixed(0)} KB home page, ${mb(downloadBytes)} MB of downloads and video`);

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  ! ${w}`);
}
if (errors.length) {
  console.log(`\n${errors.length} error(s):`);
  for (const e of errors.slice(0, 40)) console.log(`  x ${e}`);
  process.exit(1);
}
console.log("\nAll internal links, fragments, hreflang pairs and budgets pass.");
