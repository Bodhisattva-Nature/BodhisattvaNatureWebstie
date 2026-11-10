import { defineConfig } from "astro/config";

// GitHub Pages project sites live under /<repo>/. Override with BASE_PATH at build time.
const base = process.env.BASE_PATH ?? "/bodhinature/";
const site = process.env.SITE_URL ?? "https://example.github.io";

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "auto" },
  compressHTML: true,
  // serving on the LAN: `npm run preview -- --host 0.0.0.0`
  // Astro's preview server reads allowedHosts from `server` (not `preview`),
  // so this is what lets phones reach the site by Bonjour name.
  server: { allowedHosts: ["Air-2.local", "air-2.local", ".local"] },
});
