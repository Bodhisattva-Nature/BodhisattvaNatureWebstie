import type { APIRoute } from "astro";
import { routes, zhRoutes } from "../lib/routes";

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL;
  const origin = (site?.href ?? "https://example.github.io/").replace(/\/$/, "");
  const urls = [...routes, ...zhRoutes]
    .map((r) => {
      const loc = origin + base.replace(/\/$/, "") + r;
      return `  <url><loc>${loc}</loc><changefreq>monthly</changefreq></url>`;
    })
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml" } }
  );
};
