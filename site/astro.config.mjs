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
});
