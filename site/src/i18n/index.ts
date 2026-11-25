import { en } from "./en";
import { zh } from "./zh";
import * as enData from "../data/site";
import { events as enEvents, eventPosters as enPosters, seasonEvents as enSeason, pastEvents as enPast } from "../data/events";
import enQuotes from "../data/quotes.json";
import * as zhData from "./zh-data";

export type Lang = "en" | "zh";
export type Dict = typeof en;

/** Contact constants are language independent. */
export const contact = {
  email: enData.site.email,
  phone: enData.site.phone,
  phoneHref: enData.site.phoneHref,
  donateEmail: enData.site.donateEmail,
  volunteerEmail: enData.site.volunteerEmail,
  youtube: enData.site.youtube,
};

export function getContent(lang: Lang = "en") {
  const isZh = lang === "zh";
  return {
    lang,
    isZh,
    t: (isZh ? zh : en) as Dict,
    stats: isZh ? zhData.stats : enData.stats,
    pillars: isZh ? zhData.pillars : enData.pillars,
    path: isZh ? zhData.path : enData.path,
    teachers: isZh ? zhData.teachers : enData.teachers,
    programs: isZh ? zhData.programs : enData.programs,
    schedule: isZh ? zhData.schedule : enData.schedule,
    retreat: isZh ? zhData.retreat : enData.retreat,
    volunteerRoles: isZh ? zhData.volunteerRoles : enData.volunteerRoles,
    donateMethods: isZh ? zhData.donateMethods : enData.donateMethods,
    branches: isZh ? zhData.branches : enData.branches,
    connections: isZh ? zhData.connections : enData.connections,
    testimonials: isZh ? zhData.testimonials : enData.testimonials,
    books: isZh ? zhData.books : enData.books,
    events: isZh ? zhData.events : enEvents,
    eventPosters: isZh ? zhData.eventPosters : enPosters,
    seasonEvents: isZh ? zhData.seasonEvents : enSeason,
    pastEvents: isZh ? zhData.pastEvents : enPast,
    quotes: isZh ? zhData.quotes : (enQuotes as { title: string; body: string }[]),
  };
}

export type Content = ReturnType<typeof getContent>;
