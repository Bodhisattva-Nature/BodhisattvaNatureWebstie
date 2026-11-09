const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Resolve a root-relative site path against the configured base. */
export function url(path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  if (!path.startsWith("/")) path = "/" + path;
  return base + path;
}
