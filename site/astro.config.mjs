import { defineConfig } from "astro/config";

// GitHub Pages project sites live under /<repo>/. Override with BASE_PATH at build time.
const base = process.env.BASE_PATH ?? "/bodhinature/";
const site = process.env.SITE_URL ?? "https://example.github.io";

// `.local` covers Bonjour hostnames. Add extra LAN names with
// ALLOWED_HOSTS=my-laptop.local,other-name.local npm run preview:lan.
const allowedHosts = (process.env.ALLOWED_HOSTS ?? ".local")
  .split(",")
  .map((host) => host.trim())
  .filter(Boolean);

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "auto" },
  compressHTML: true,
  // Astro's preview server reads allowedHosts from `server` (not `preview`),
  // so this is what lets phones reach the site by Bonjour name.
  server: { allowedHosts },
});
