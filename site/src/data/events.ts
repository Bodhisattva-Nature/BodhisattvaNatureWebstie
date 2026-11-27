export type Event = {
  slug: string;
  title: string;
  titleCn?: string;
  cadence?: string;
  time?: string;
  place?: string;
  image?: string;
  oneOff?: boolean;
  fit?: "cover" | "poster" | "tall";
  notes?: string[];
  themes?: string[];
  cta: string;
};

export const events: Event[] = [
  {
    slug: "safe-and-strong",
    title: "Safe & Strong",
    titleCn: "功夫自卫体验课",
    cadence: "Saturdays",
    time: "1:30–2:30 PM",
    place: "Lenox Hill Neighborhood House, Gym · 331 East 70th Street, NYC",
    image: "event-safe-strong",
    fit: "poster",
    notes: ["Free introductory class", "Gentle movement and practical self-defence", "Volunteers welcome"],
    cta: "Ask about the class",
  },
  {
    slug: "mindful-staff",
    title: "Mindful Staff",
    titleCn: "觉知",
    cadence: "Free introductory class",
    place: "Washington Square Park, New York",
    image: "event-mindful-staff",
    oneOff: true,
    fit: "poster",
    notes: ["The four foundations of mindfulness", "Movement, stillness and balance", "Focus and peace in daily life"],
    cta: "Ask about the class",
  },
  {
    slug: "st-johns-guest-lecture",
    title: "Guest Lecture at St. John's University",
    titleCn: "圣约翰大学客座讲座",
    cadence: "Guest lecture",
    place: "St. John's University, New York",
    image: "event-stjohns-lecture",
    oneOff: true,
    notes: ["A talk and guided meditation with students", "Relaxation and mindful awareness"],
    cta: "Ask about the talk",
  },
  {
    slug: "tai-chi-apex",
    title: "Tai Chi in Apex, NC",
    titleCn: "北卡阿佩克斯太极",
    cadence: "Ongoing",
    place: "Apex, North Carolina",
    image: "event-tai-chi-apex",
    oneOff: true,
    fit: "tall",
    notes: ["Mindfulness with Tai Chi", "Indoor and outdoor practice", "All are welcome"],
    cta: "Ask about the class",
  },
  {
    slug: "mindful-zen-tea-jersey-city",
    title: "Mindful Zen Tea in Jersey City",
    titleCn: "泽西市正念禅茶",
    cadence: "Ongoing",
    place: "Jersey City, New Jersey",
    image: "event-zen-tea-jersey-city",
    oneOff: true,
    fit: "poster",
    notes: ["A mindful tea gathering", "Tea, silence and conversation", "All are welcome"],
    cta: "Ask about the gathering",
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
  fit?: "cover" | "contain" | "poster";
};

export const seasonEvents: Listing[] = [
  {
    slug: "dawn-1",
    title: "The Dawn I",
    titleCn: "憬醒 I",
    kicker: "Retreat · 憬醒 I",
    date: "4–7 December 2026",
    place: "Buffalo, New York",
    body: "Delve into the dance of self and world. Touch the soul, reshape life.",
    image: "event-dawn",
    fit: "poster",
  },
  {
    slug: "three-day-shamatha-vipashyana",
    title: "Three-Day Shamatha and Vipashyana Retreat",
    titleCn: "三日止观禅修",
    kicker: "Retreat · Three days · Buffalo",
    date: "8–11 December 2026",
    place: "Buffalo Manjushri Peaceful Mind Hall, Buffalo, New York",
    body: "Three days of silent shamatha and vipashyana practice with experienced practitioners. Free, with meals and lodging provided. For those with some meditation experience; check-in 8 December at 18:30.",
    image: "event-3day-shamatha",
    fit: "poster",
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
    slug: "28-day-intensive",
    title: "28-Day Intensive",
    titleCn: "28天精进班",
    kicker: "Course · 28 days · Buffalo",
    date: "8 January – 5 February 2027",
    place: "Buffalo, New York",
    body: "A 28-day practice intensive to close the year: an opening meeting on 8 January at 18:30, then practice together through 5 February.",
    image: "event-28-day",
    fit: "poster",
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
    titleCn: "菩提班 · 第十六期",
    kicker: "Course · 16th cohort · tuition-free",
    date: "Ongoing",
    place: "Zoom · Vancouver, Toronto, Calgary, Los Angeles, New York, Seattle, North Carolina",
    body: "Systematic study, flexible timing, personal guidance, group practice and practice in daily life.",
    image: "event-bodhi",
  },
];

export const pastEvents: Listing[] = [
  {
    slug: "dawn-1-november",
    title: "The Dawn I",
    titleCn: "憬醒 I",
    kicker: "Retreat · 憬醒 I",
    date: "27–30 November 2026",
    place: "Vancouver, Canada",
    body: "Delve into the dance of self and world. Touch the soul, reshape life.",
    image: "event-dawn-nov",
    fit: "poster",
  },
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

/**
 * The fifteen-part series on the Happiness & Freedom page of the old site.
 * Thumbnails are cached locally in public/series so the page loads no
 * third-party requests until a visitor actually presses play.
 */
export const happinessSeries: string[] = [
  "cYlQKwvJli4", "uPD00y08_UE", "DlYPPhcQ_LI", "BrV3rfYv3Pc", "oEODC7LuOA4",
  "DUZPxI3JkAg", "scKUYEYtCgQ", "zrYqCDTx5aQ", "GgFXEB39zWU", "vfo5VYlFKPs",
  "ald1oGQu9j0", "2SqMiAMAWDs", "u72Asz7TSE0", "SU66ffWBJOw", "mjUuNM9EHYs",
];
