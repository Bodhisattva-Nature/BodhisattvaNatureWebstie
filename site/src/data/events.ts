export type Event = {
  slug: string;
  title: string;
  titleCn?: string;
  cadence?: string;
  time?: string;
  place?: string;
  image?: string;
  notes?: string[];
  themes?: string[];
  cta: string;
};

/**
 * The weekly online sitting comes from the poster on bodhinature.com/upcomingevents/.
 * Walk for Peace has no published date, place or poster yet, so those fields are
 * left empty and the views render a "details to be announced" state.
 */
export const events: Event[] = [
  {
    slug: "walk-for-peace",
    title: "Walk for Peace",
    titleCn: "和平步行",
    notes: ["A walking practice — no charge, no registration"],
    cta: "Ask for the date",
  },
  {
    slug: "online-meditation-centre",
    title: "Online Meditation Centre",
    titleCn: "空中禅堂 · 欧洲站",
    cadence: "Saturday & Sunday",
    time: "07:00 CET · 06:00 UK",
    place: "Online, by video",
    image: "event-online",
    notes: ["Runs about one and a half to two hours", "Join through the group — write to us for the link"],
    themes: ["Managing emotion", "Loving-kindness meditation", "Relaxation and healing", "Nourishing body and mind"],
    cta: "Ask for the joining link",
  },
];

export const eventPosters = [
  { image: "event-mindfulness", caption: "Mindfulness retreats" },
  { image: "event-wisdom", caption: "Wisdom words about a happy life" },
];
