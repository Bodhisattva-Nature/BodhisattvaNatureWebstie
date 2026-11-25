export type Event = {
  slug: string;
  title: string;
  titleCn?: string;
  cadence?: string;
  time?: string;
  place?: string;
  image?: string;
  oneOff?: boolean;
  notes?: string[];
  themes?: string[];
  cta: string;
};

/**
 * The weekly online sitting comes from the poster on bodhinature.com/upcomingevents/.
 * Walk for Peace is a one-off: Tuesday 1 December 2026, New York City. No time was given,
 * so the views omit the time row.
 */
export const events: Event[] = [
  {
    slug: "walk-for-peace",
    title: "Walk for Peace",
    titleCn: "和平步行",
    cadence: "Tuesday 1 December",
    place: "New York City",
    image: "event-walk",
    oneOff: true,
    notes: ["A walking practice — no charge, no registration"],
    cta: "Ask for the meeting point",
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

/** A dated retreat or course, read from the posters in the homepage slider. */
export type Listing = {
  slug: string;
  title: string;
  titleCn?: string;
  kicker: string;
  date: string;
  place: string;
  body: string;
  image: string;
  /** landscape posters need "contain" so their text is not cropped */
  fit?: "cover" | "contain";
};

export const seasonEvents: Listing[] = [
  {
    slug: "dawn-1",
    title: "The Dawn I",
    titleCn: "憬醒 I",
    kicker: "Retreat · 憬醒 I",
    date: "27–30 November 2026",
    place: "Vancouver, Canada",
    body: "Delve into the dance of self and world. Touch the soul, reshape life.",
    image: "event-dawn",
  },
  {
    slug: "journey-11",
    title: "Journey to Mindfulness",
    titleCn: "正念之旅 · 第十一期",
    kicker: "Retreat · 11th edition",
    date: "16–20 December 2026",
    place: "Los Angeles, United States",
    body: "Follow the wisdom of the sages, and rediscover your original aspiration.",
    image: "event-journey",
  },
  {
    slug: "awakening-2",
    title: "Awakening 2",
    titleCn: "憬醒 2",
    kicker: "Retreat · 憬醒 2",
    date: "30 December 2026 – 4 January 2027",
    place: "Vancouver, Canada",
    body: "The second stage of the Dawn programme: self and world, seen again.",
    image: "event-awakening",
  },
  {
    slug: "wisdom-practicing",
    title: "Wisdom Practicing",
    titleCn: "智慧修习",
    kicker: "Course · ongoing · free of charge",
    date: "Ongoing",
    place: "Zoom · Vancouver, Calgary, Toronto, Los Angeles, Seattle, Buffalo, New York",
    body: "Pursue awakening systematically: flexible timing, live tutoring, one-to-one guidance and offline group practice.",
    image: "event-wisdom-practice",
    fit: "contain",
  },
  {
    slug: "bodhi-class",
    title: "Bodhi Class",
    titleCn: "菩提班 · 第十五期",
    kicker: "Course · 15th cohort · tuition-free",
    date: "Ongoing",
    place: "Zoom · Vancouver, Toronto, Calgary, Los Angeles, New York, Seattle, North Carolina",
    body: "Systematic study, flexible timing, personal guidance, group practice and practice in daily life.",
    image: "event-bodhi",
  },
];

export const pastEvents: Listing[] = [
  {
    slug: "journey-calgary",
    title: "Journey to Mindfulness",
    titleCn: "正念之旅 · 卡尔加里",
    kicker: "Retreat · Canada",
    date: "29 January – 2 February 2026",
    place: "Calgary, Canada",
    body: "Five days on the Analects, the Book of Changes and meditation. Tuition-free; the venue was sponsored by alumni.",
    image: "past-journey",
  },
  {
    slug: "journey-calgary-10",
    title: "Journey to Mindfulness",
    titleCn: "正念之旅 · 第十期",
    kicker: "Retreat · 10th edition",
    date: "5–9 November 2026",
    place: "Calgary, Canada",
    body: "The tenth edition, five days in Calgary: the sages' teaching, the original aspiration.",
    image: "past-journey-calgary",
    fit: "contain",
  },
  {
    slug: "thailand-2024",
    title: "Activities in Thailand",
    titleCn: "泰国活动",
    kicker: "Retreats · 2024",
    date: "2024",
    place: "Thailand",
    body: "Recent retreats and gatherings in Thailand.",
    image: "past-thailand",
  },
  {
    slug: "malaysia-camp",
    title: "Family camp",
    titleCn: "亲子营",
    kicker: "Malaysia",
    date: "Past event",
    place: "Malaysia",
    body: "A family camp for parents and their children.",
    image: "past-malaysia",
  },
];
