import type { APIRoute } from "astro";
import { getContent, contact } from "../../i18n";
import { activities } from "../../data/activities";

export const GET: APIRoute = () => {
  const { t, programs, branches, connections, quotes, seasonEvents, pastEvents } = getContent("zh");
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const p = (u: string) => base + (u === "/" ? "/zh/" : "/zh" + u);

  const docs = [
    { t: "首页", d: t.site.tagline, u: "/", k: "页面" },
    { t: "关于我们", d: t.about.lede, u: "/about/", k: "页面" },
    { t: "课程", d: t.programsIndex.lede, u: "/programs/", k: "页面" },
    { t: "智慧法语", d: t.wisdom.lede, u: "/wisdom/", k: "页面" },
    { t: "共修", d: t.community.lede, u: "/community/", k: "页面" },
    { t: "近期活动", d: t.events.lede, u: "/events/", k: "页面" },
    { t: "和平步行", d: "12月1日（周二），纽约市。以行走为修行，免费开放。", u: "/events/#walk-for-peace", k: "活动" },
    { t: "空中禅堂 · 欧洲站", d: "每周六、周日，中欧时间 07:00。", u: "/events/#online-meditation-centre", k: "活动" },
    { t: "中文活动", d: "线下共修、禅修课程与每日线上共修。", u: "/activities/", k: "活动" },
    ...activities.regions.map((region) => ({
      t: `${region.name}活动`,
      d: region.intro,
      u: `/activities/${region.slug}/`,
      k: "活动",
    })),
    { t: "义工", d: t.volunteer.lede, u: "/volunteer/", k: "页面" },
    { t: "护持", d: t.donate.lede, u: "/donate/", k: "页面" },
    { t: "来访与联系", d: t.contact.lede, u: "/contact/", k: "页面" },
    ...programs.map((x) => ({ t: x.title, d: x.summary, u: `/programs/${x.slug}/`, k: "课程" })),
    ...quotes.map((q) => ({ t: q.title, d: q.body.slice(0, 90), u: "/wisdom/", k: "法语" })),
    ...[...seasonEvents, ...pastEvents].map((e) => ({ t: e.title, d: `${e.date} · ${e.place}。${e.body}`, u: `/events/#${e.slug}`, k: "活动" })),
    ...branches.map((b) => ({ t: `${b.city} — ${b.country}`, d: [...b.address, b.email].join(" · "), u: `/contact/#${b.slug}`, k: "分会" })),
    ...connections.map((c) => ({ t: [c.country, c.cities].filter(Boolean).join(" · "), d: [c.email, c.phone, c.note].filter(Boolean).join(" · "), u: `/contact/#${c.slug}`, k: "共修团体" })),
  ].map((d) => ({ ...d, u: p(d.u) }));

  return new Response(JSON.stringify({ docs, contact }), {
    headers: { "Content-Type": "application/json" },
  });
};
