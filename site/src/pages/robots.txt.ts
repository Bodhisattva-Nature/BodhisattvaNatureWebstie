import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL;
  const origin = (site?.href ?? "https://example.github.io/").replace(/\/$/, "");
  const body = `User-agent: *
Allow: /

Sitemap: ${origin}${base}sitemap.xml
`;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
};
