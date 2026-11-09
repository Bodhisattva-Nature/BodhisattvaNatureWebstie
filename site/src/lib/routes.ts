import { programs } from "../data/site";

export const routes: string[] = [
  "/",
  "/about/",
  "/programs/",
  ...programs.map((p) => `/programs/${p.slug}/`),
  "/wisdom/",
  "/community/",
  "/events/",
  "/volunteer/",
  "/donate/",
  "/contact/",
];

/** Chinese counterparts, served under /zh/. */
export const zhRoutes: string[] = routes.map((r) => (r === "/" ? "/zh/" : "/zh" + r));
