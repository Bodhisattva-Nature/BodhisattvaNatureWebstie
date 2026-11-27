import type { APIRoute } from "astro";
import { programs, branches, connections, site } from "../data/site";
import { seasonEvents, pastEvents } from "../data/events";
import quotes from "../data/quotes.json";

type Doc = { t: string; d: string; u: string; k: string };

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

const pages: Doc[] = [
  { t: "Home", d: "Peace. Freedom. Truth.", u: "/", k: "page" },
  { t: "About", d: "What is Light of Oneness? Our mission, path and teachers.", u: "/about/", k: "page" },
  { t: "Programs", d: "Five ways in — study, mindfulness, movement, care and inquiry.", u: "/programs/", k: "page" },
  { t: "Wisdom Words", d: "Fourteen short teachings on practice and the nature of mind.", u: "/wisdom/", k: "page" },
  { t: "Community", d: "Daily schedule, retreats, Tai Chi in Richmond, hospice care.", u: "/community/", k: "page" },
  { t: "What's on", d: "Mindfulness retreat Wednesday and Saturday, online meditation centre for Europe.", u: "/events/", k: "page" },
  { t: "Walk for Peace", d: "Tuesday 1 December 2026, New York City. A walking practice, free and open to all.", u: "/events/#walk-for-peace", k: "event" },
  { t: "Online Meditation Centre", d: "Saturday and Sunday, 07:00 CET / 06:00 UK, about two hours.", u: "/events/#online-meditation-centre", k: "event" },
  { t: "Volunteer", d: "Dubbing, editing, translating, coordinating.", u: "/volunteer/", k: "page" },
  { t: "Donate", d: "Ways to give, and what your contribution carries.", u: "/donate/", k: "page" },
  { t: "Visit", d: "Branches, addresses and spiritual connection points.", u: "/contact/", k: "page" },
];

const progDocs: Doc[] = programs.map((p) => ({ t: p.title, d: p.summary, u: `/programs/${p.slug}/`, k: "program" }));
const quoteDocs: Doc[] = quotes.map((q) => ({ t: q.title, d: q.body.slice(0, 180), u: "/wisdom/", k: "teaching" }));
const eventDocs: Doc[] = [...seasonEvents, ...pastEvents].map((e) => ({
  t: e.title,
  d: `${e.date} · ${e.place}. ${e.body}`,
  u: `/events/#${e.slug}`,
  k: "event",
}));

const branchDocs: Doc[] = branches.map((b) => ({
  t: `${b.city} — ${b.country}`,
  d: [...b.address, b.email].join(" · "),
  u: `/contact/#${b.slug}`,
  k: "branch",
}));

export const GET: APIRoute = () => {
  const connDocs: Doc[] = connections.map((c) => ({
  t: [c.country, c.cities].filter(Boolean).join(" · "),
  d: [c.email, c.phone, c.note].filter(Boolean).join(" · "),
  u: `/contact/#${c.slug}`,
  k: "connection",
}));

const docs = [...pages, ...eventDocs, ...progDocs, ...quoteDocs, ...branchDocs, ...connDocs].map((d) => ({ ...d, u: base + d.u }));
  return new Response(
    JSON.stringify({ docs, contact: { email: site.email, phone: site.phone } }),
    { headers: { "Content-Type": "application/json" } }
  );
};
