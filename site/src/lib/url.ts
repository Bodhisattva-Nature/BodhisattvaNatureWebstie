import type { Lang } from "../i18n";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Resolve a root-relative site path against the configured base. */
export function url(path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  if (!path.startsWith("/")) path = "/" + path;
  return base + path;
}

/** Site path for a route in a given language. */
export function href(path: string, lang: Lang = "en"): string {
  if (lang !== "zh") return url(path);
  const p = path.startsWith("/") ? path : "/" + path;
  return url(p === "/" ? "/zh/" : "/zh" + p);
}

/** The same page in the other language, preserving any hash. */
export function oppositeHref(pathname: string, lang: Lang, hash = ""): string {
  let p = pathname;
  if (base && p.startsWith(base)) p = p.slice(base.length) || "/";
  if (!p.startsWith("/")) p = "/" + p;

  const isZhPath = p === "/zh" || p.startsWith("/zh/");
  const rest = isZhPath ? p.replace(/^\/zh/, "") || "/" : p;

  // A 404 has no counterpart to switch to — the English one is /404.html,
  // not a directory — so send the reader to the other language's home page.
  if (/^\/404\/?$/.test(rest)) return url(lang === "zh" ? "/zh/" : "/");

  const target = lang === "zh" ? rest : "/zh" + (rest === "/" ? "/" : rest);
  return url(target) + hash;
}
