export type Event = {
  slug: string;
  title: string;
  titleCn?: string;
  cadence: string;
  time: string;
  place: string;
  image: string;
  notes?: string[];
  themes?: string[];
  cta: string;
};

/**
 * Transcribed from the four posters on bodhinature.com/upcomingevents/.
 * Neither poster carries a date — both are standing weekly gatherings.
 */
export const events: Event[] = [
  {
    slug: "mindfulness-retreat",
    title: "Mindfulness Retreat",
    titleCn: "正念禅修",
    cadence: "Wednesday & Saturday",
    time: "10:00 – 16:00",
    place: "Vancouver / Richmond",
    image: "event-retreat",
    notes: ["A free lunch is included", "Six hours, held in a quiet room", "No charge, and nothing to bring"],
    cta: "Register for a session",
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
