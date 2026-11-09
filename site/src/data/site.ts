export const site = {
  name: "Bodhisattva Nature Foundation",
  shortName: "Bodhisattva Nature",
  tagline: "Peace. Freedom. Truth.",
  description:
    "A registered non-profit sharing the Buddha's teachings on wisdom, compassion and the nature of mind — through daily classes, retreats, hospice care education and volunteer service.",
  email: "peace@bodhinature.com",
  phone: "+1 587 890 8888",
  phoneHref: "+15878908888",
  donateEmail: "bodhinature.f@gmail.com",
  volunteerForm: "https://forms.gle/vu8sDNMc44ABsQij6",
  youtube: "https://www.youtube.com/@bodhinature",
} as const;

export const nav = [
  { label: "About", href: "/about/" },
  { label: "Programs", href: "/programs/" },
  { label: "Wisdom", href: "/wisdom/" },
  { label: "Community", href: "/community/" },
  { label: "Events", href: "/events/" },
  { label: "Visit", href: "/contact/" },
];

export const stats = [
  { value: "100+", label: "Dharma talks a year" },
  { value: "324", label: "Group classes a year" },
  { value: "365", label: "Daily classes a year" },
  { value: "54+", label: "Retreats a year" },
];

export const pillars = [
  {
    title: "Oneness",
    subtitle: "Peace",
    body:
      "For thousands of years, sages have reminded us that no one is isolated — that people of every country, race and skin colour are like hands and feet. We cooperate, we support, we do not compete.",
    image: "peace",
  },
  {
    title: "Environment",
    subtitle: "Balance",
    body:
      "The Buddha saw the environment as a condition for the happiness of all sentient beings. Protecting it is a kind of practice: to meet nature with an open mind, and abandon the desire to possess it.",
    image: "aurora",
  },
  {
    title: "Enlightenment",
    subtitle: "Truth",
    body:
      "Buddha means “the awakened one” — not a deity. Anyone who realises the truth may attain it. Buddhism is not exclusive; it is a way of seeing the world as it is, and being freed by that seeing.",
    image: "practicing",
  },
];

export const path = [
  {
    step: "01",
    title: "Learning",
    body: "Through studying the truth you come to know what to practise and what to avoid.",
  },
  {
    step: "02",
    title: "Reflecting",
    body: "Repeated logical thinking verifies and strengthens your awareness of the truth, until the method integrates into daily life.",
  },
  {
    step: "03",
    title: "Practising",
    body: "Progress step by step — giving, volunteering, sharing, meditating. Moral conduct, mental discipline and wisdom, practised together.",
  },
];

export const teachers = [
  {
    name: "Venerable Zhenjue",
    role: "Founder",
    image: "teacher-zhenjue",
    paras: [
      "Bodhisattva Nature Foundation is a registered charity initiated by a group of compassionate individuals.",
      "Venerable Zhenjue learnt from Venerable Master Renze. The teaching integrates the practice of Tibetan Buddhism and Chinese Buddhism on the Stages of the Path to Enlightenment.",
      "After years of practice, Venerable Zhenjue saw that disasters, disease, a chaotic world and every kind of suffering arise from wrong concepts and from not knowing the truth. That compassion is what drives the passing on of wisdom to more people.",
    ],
  },
  {
    name: "Venerable Deyang",
    role: "Teacher",
    image: "teacher-deyang",
    paras: [
      "Venerable Deyang was ordained under the guidance of Ven. Renze. From his first encounter with the Buddha dharma he was moved by the wisdom of the teachings, and by the compassionate guidance and encouragement of virtuous teachers.",
      "He chose monastic life not only for personal liberation but with the vow to benefit sentient beings — to uphold pure precepts, cultivate concentration and wisdom, and to spread the Dharma so that it may long remain in the world.",
    ],
  },
];

export type Program = {
  slug: string;
  no: string;
  title: string;
  kicker: string;
  summary: string;
  image: string;
  hero: string;
  gallery?: { image: string; caption: string; ratio?: string }[];
  bookGrid?: boolean;
  intro: string[];
  highlights: { title: string; body: string }[];
  list?: { title: string; items: string[] };
  truths?: { title: string; body: string }[];
  links?: { label: string; href: string }[];
  cta: string;
};

export const programs: Program[] = [
  {
    slug: "dharma-study",
    no: "01",
    title: "Dharma Study",
    kicker: "Study",
    summary:
      "The Four Noble Truths, impermanence, karma and the nature of mind — the Buddha's own analysis of suffering and its ending, studied plainly.",
    image: "program-dharma",
    hero: "dharma-hero",
    intro: [
      "Buddhism traces its origins to Siddhartha Gautama, born in ancient India around the sixth century BCE, who renounced a life of luxury to seek enlightenment and became known as the Buddha — the awakened one.",
      "At the centre of the teaching are the Four Noble Truths and the Noble Eightfold Path: ethical conduct, mental discipline and wisdom, guiding the practitioner toward liberation from suffering.",
    ],
    highlights: [
      {
        title: "The Four Noble Truths",
        body:
          "Suffering; its cause; its cessation; and the path that leads to its end. The foundation on which everything else rests.",
      },
      {
        title: "The Three Types of Suffering",
        body:
          "“All conditioned things are suffering” is one of the Four Seals. Yet we clearly experience happiness when desire is satisfied — so what did the Buddha mean?",
      },
      {
        title: "Buddhist Astronomy",
        body:
          "The Buddha's account of time and space, of life and death, and of the limits of ordinary cognition.",
      },
      {
        title: "All Conditioned Things Are Impermanent",
        body:
          "“Among all footprints, the elephant's is most distinguished; among all perspectives, impermanence is most distinguished.”",
      },
      {
        title: "The Law of Cause and Effect",
        body:
          "Karma, habit and the inertia of free will — the law of dependent arising across five aspects.",
      },
      {
        title: "The Mirror of Causality",
        body:
          "Nagarjuna, the Buddha and the Sixth Patriarch on fortune, misfortune, and where they actually come from.",
      },
    ],
    truths: [
      {
        title: "The truth of suffering",
        body:
          "Birth is suffering; ageing is suffering; sickness is suffering; death is suffering; separation from the loved is suffering; association with the unloved is suffering; not getting what is liked is suffering; sorrow, pain and lamentation is suffering; the five aggregates afflicted by clinging are suffering.",
      },
      {
        title: "The truth of the cause",
        body:
          "Craving is the origin of suffering — the lust, passion, hunger and thirst for forms, feelings, perceptions, volitional formations and consciousness.",
      },
      {
        title: "The truth of the end",
        body:
          "The remnant-free, residue-free cessation of that craving for forms, feelings, perceptions, volitional formations and consciousness is the cessation of suffering.",
      },
      {
        title: "The truth of the path",
        body:
          "The only path that leads to the absolute elimination of that craving is the Noble Eightfold Path — ethical conduct, mental discipline and wisdom.",
      },
    ],
    links: [
      {
        label: "Buddhist Astronomy — video series",
        href: "https://youtube.com/playlist?list=PLdph_MCVJGB2PCZWsXqSkt4_eMRDXndJW",
      },
      {
        label: "All Conditioned Things Are Impermanent",
        href: "https://youtube.com/playlist?list=PLdph_MCVJGB3BTeeCdLbCXoWC_qrfELfa",
      },
      {
        label: "The Law of Cause and Effect",
        href: "https://youtube.com/playlist?list=PLdph_MCVJGB3choe9t5kKWyguvtzkQEJ-",
      },
      {
        label: "The Mirror of Causality",
        href: "https://youtube.com/playlist?list=PLdph_MCVJGB0ZR9jw6wbsPrsp3Gqlwi9v",
      },
    ],
    cta: "Ask for course materials",
  },
  {
    slug: "mindfulness",
    no: "02",
    title: "Mindfulness",
    kicker: "Practice",
    summary:
      "Present-moment awareness, taught in the old way — posture, breath, stretching, and a mind that watches without judging.",
    image: "program-mindfulness",
    hero: "mindfulness-hero",
    gallery: [
      { image: "mindfulness-hero", caption: "Before sitting: a quiet room, an upright spine, a settled breath" },
      { image: "peace", caption: "Guidance in the seven-point posture of Vairochana" },
    ],
    intro: [
      "Mindfulness retreats and classes cultivate present-moment awareness: through guided meditation, mindful movement and walking, and teachings from experienced instructors, you learn to observe thoughts and sensations without judgement.",
      "The benefits extend past the cushion — improved concentration, greater resilience, and a way of meeting stress that carries into ordinary days.",
    ],
    highlights: [
      {
        title: "Preparation",
        body:
          "A quiet place, a comfortable seat with the spine upright, a consistent time, distractions switched off, loose clothing, a few deep breaths, a clear intention — and a short beginning.",
      },
      {
        title: "Stretching & dynamic practice",
        body:
          "Simple yoga and gentle movement before sitting relax the body, increase flexibility and make a deeper state of mindfulness easier to enter.",
      },
      {
        title: "The Seven-Point Posture of Vairochana",
        body:
          "Full or half vajra position; back straight; hands in the meditation seal; arms slightly open; chin tucked; eyes gently open, gaze at the tip of the nose; tongue touching the upper palate.",
      },
      {
        title: "Guided meditation",
        body:
          "Relaxation of body and mind, relaxing the heart chakra, lying-down meditation, and chanting.",
      },
    ],
    links: [
      {
        label: "Guided meditation — practice more",
        href: "https://www.youtube.com/watch?v=_6s-uy47WSc&list=PLdph_MCVJGB0GXdmta5qbT96ShikZek2g",
      },
      {
        label: "Mindfulness in Plain — video series",
        href: "https://youtube.com/playlist?list=PLdph_MCVJGB050U1T9cLdb1o3psnFad-m",
      },
      {
        label: "Chanting",
        href: "https://youtube.com/playlist?list=PLp-bkW_-IYjOeAg3lo9hEoVNLuMS58fQr",
      },
      {
        label: "A look back at our past events",
        href: "https://youtube.com/playlist?list=PLp-bkW_-IYjNlppT0ucOQAd-ISRkoK9qN",
      },
    ],
    cta: "Join a mindfulness class",
  },
  {
    slug: "tai-chi",
    no: "03",
    title: "Tai Chi & Movement",
    kicker: "Body",
    summary:
      "Slow, graceful movement that stretches, strengthens and settles the mind — traditional Chinese exercise as spiritual practice.",
    image: "program-taichi",
    hero: "taichi-hero",
    gallery: [
      { image: "taichi-alt", caption: "Lianhua Sheng Dashigong — lotus movements, practised slowly" },
      { image: "feather", caption: "The aim is not exertion. It is balance." },
    ],
    intro: [
      "Tai Chi takes the dialectical concept of Taiji and Yin-Yang as its core idea, joining the changes of the I Ching, the meridians of traditional Chinese medicine, ancient Daoyin and Tuna breathing.",
      "With slow and graceful movements it helps you stretch, breathe and find balance — calming the body and emotions, and reducing stress, anxiety and depression. Long-term practice opens the Qi channels, strengthening the body and steadying temperament.",
    ],
    highlights: [
      {
        title: "Lianhua Sheng Dashigong",
        body:
          "Traditional Chinese exercise rooted in martial arts and qigong: coordinated movement, controlled breathing and mental concentration.",
      },
      {
        title: "What it builds",
        body:
          "Flexibility, muscle strength, cardiovascular function and vitality — and beyond the body, a calm mind and emotional balance.",
      },
      {
        title: "Free weekly classes",
        body:
          "We hold two free Tai Chi classes every Friday, morning and afternoon, in Richmond. Everyone is welcome.",
      },
      {
        title: "Mindfulness Tai Chi",
        body:
          "The 16:30 session in our daily schedule, joining movement with the same awareness cultivated in sitting practice.",
      },
    ],
    cta: "Register for a Friday class",
  },
  {
    slug: "hospice-care",
    no: "04",
    title: "Hospice Care",
    kicker: "Care",
    summary:
      "Buddhist end-of-life care — how to help someone die with a clear, peaceful mind, and how to hold a family through it.",
    image: "program-hospice",
    hero: "hospice-hero",
    gallery: [
      { image: "tibetan-book", caption: "The Tibetan Book of Living and Dying — a video series is available", ratio: "2/3" },
    ],
    intro: [
      "Buddhism holds a profound understanding of life and death, and sees the mentality of the dying as crucial for what follows. Hospice care is therefore the final and most important help we can offer.",
      "End-of-life care is approached with deep compassion and mindfulness: easing the transition with dignity and spiritual preparedness, cultivating acceptance of impermanence and letting go of attachments.",
    ],
    highlights: [
      {
        title: "Tie the loose ends",
        body:
          "A critical point is conversation: “You are about to move on — do you have concerns still bothering you?” Let them make arrangements, and take care of them.",
      },
      {
        title: "Sustain a positive mind",
        body:
          "Avoid expressing grievance in front of them. Repeatedly remind them to let go of worldly attachments. Help them enter death with righteous thoughts — humble respect, love and compassion.",
      },
      {
        title: "Attitude",
        body:
          "Always express with great love. Be kind and patient. Don't rush anything, and don't make it too serious.",
      },
      {
        title: "Liberation Through Hearing",
        body:
          "A month or two before transition, begin listening to the recording of Liberation Through Hearing During the Intermediate State, alternating with chanting of the Buddha's name.",
      },
    ],
    links: [
      {
        label: "Liberation Through Hearing — recording",
        href: "https://youtu.be/IJS4SFlJumM",
      },
      {
        label: "The Tibetan Book of Living and Dying — video series",
        href: "https://www.youtube.com/playlist?list=PLp-bkW_-IYjPTN39-gAa8GosM7m9V-f95",
      },
    ],
    cta: "Talk to us about hospice care",
  },
  {
    slug: "happiness-and-freedom",
    no: "05",
    title: "Happiness & Freedom",
    kicker: "Inquiry",
    summary:
      "A fifteen-part series on what happiness and freedom actually are — and why pursuing them as external gain keeps missing.",
    image: "program-happiness",
    hero: "happiness-hero",
    bookGrid: true,
    intro: [
      "The myriad beings hustle through life striving for happiness and freedom. Yet our understanding of them is often one-sided, narrow and even mistaken — and much of the interpersonal and psychological difficulty in society grows from that misdirected search.",
      "We equate satisfying desire with happiness, and so pursue the external relentlessly: success brings joy, failure brings sorrow. Wise voices remind us of deeper forms, unaffected by external change — and assure us that reaching them is within our grasp.",
    ],
    highlights: [
      {
        title: "The Essence of Happiness & True Freedom",
        body:
          "Fifteen short episodes that unpack the question from a deeper perspective than the usual answer.",
      },
      {
        title: "Four languages",
        body:
          "A text version of the series is translated into four languages, free to download and share.",
      },
    ],
    links: [
      {
        label: "Watch the video series",
        href: "https://bodhinature.com/happiness-and-freedom/",
      },
    ],
    cta: "Watch the series",
  },
];

export const schedule = [
  { time: "06:00", label: "Prostration & Meditation" },
  { time: "08:45", label: "Morning Class" },
  { time: "14:30", label: "Afternoon Class" },
  { time: "17:00", label: "Prostration" },
  { time: "19:00", label: "Evening Class & Meditation" },
];

export const retreat = {
  title: "Weekend Retreat",
  image: "clouds",
  goal:
    "Learning, reflecting and practising — the same threefold path that runs through every course we offer.",
  content: [
    "Prayers",
    "Breathing exercise",
    "Dharma study",
    "Meditation guidance",
    "Tai Chi practice",
    "Lotus movements",
  ],
};

export const volunteerRoles = [
  {
    title: "Dubbing",
    meta: "Audiobooks · Videos",
    image: "vol-dubbing",
    body:
      "We are adding English voices to dharma videos, meditations and books so more people can understand them — Happiness and Freedom, Wisdom Quotes from Ven. Renze, the Four Seals, and meditation guidance.",
  },
  {
    title: "Editor",
    meta: "Books · Videos · Documents",
    image: "vol-editor",
    body:
      "Thousands of books, videos and documents need editing by people with good English who have taken some basic classes with the foundation.",
  },
  {
    title: "Translator",
    meta: "Chinese → English",
    image: "vol-translate",
    body:
      "All of Master Renze's English books and videos are translated and edited by volunteers around the world. We are looking for people fluent in both languages, ready to grow, willing to help.",
  },
  {
    title: "Coordinator",
    meta: "Events · Retreats · Community",
    image: "vol-coordinate",
    body:
      "We run online classes, local retreats and local events regularly. We need volunteers who communicate well and love meditation, Tai Chi and dharma.",
  },
  {
    title: "Others",
    meta: "Whatever you can offer",
    image: "lilac",
    body:
      "There are more opportunities than these — tell us what you're good at and we'll find the place for it.",
  },
];

export const donateMethods = [
  {
    title: "Online",
    body: "Give by card through our secure donation page. One-time or recurring — recurring gifts are what let us plan the year.",
    action: { label: "Donate online", href: "https://bodhinature.com/donate/" },
  },
  {
    title: "Interac e-Transfer",
    body: "Send an e-transfer to our donations inbox.",
    action: { label: "bodhinature.f@gmail.com", href: "mailto:bodhinature.f@gmail.com" },
  },
  {
    title: "Bank transfer & cheque",
    body: "Write to us and we will send the full bank transfer details.",
    action: { label: "Request details", href: "mailto:peace@bodhinature.com" },
  },
  {
    title: "QR code",
    body: "Scan with your phone's camera or QR scanner, enter an amount and complete the gift.",
    action: { label: "Ask for the QR code", href: "mailto:peace@bodhinature.com" },
  },
  {
    title: "Estate planning",
    body: "Write to us to discuss any aspect of your contribution, however large or small.",
    action: { label: "peace@bodhinature.com", href: "mailto:peace@bodhinature.com" },
  },
];

export type Branch = {
  slug: string;
  city: string;
  country: string;
  flag: string;
  address: string[];
  phone?: string;
  email: string;
  image?: string;
  note?: string;
};

export const branches: Branch[] = [
  {
    slug: "canada",
    city: "Richmond / Calgary",
    country: "Canada",
    flag: "CA",
    address: ["Richmond, British Columbia", "Calgary, Alberta"],
    phone: "+1 587 890 8888",
    email: "peace@bodhinature.com",
    image: "branch-canada",
    note: "Our home base. Daily classes, weekly Tai Chi in Richmond, and local retreats.",
  },
  {
    slug: "united-states",
    city: "Diamond Bar",
    country: "United States",
    flag: "US",
    address: ["21030 Blossom Way", "Diamond Bar, CA 91765"],
    phone: "(626) 232-8143",
    email: "usa@yimingpureland.org",
    image: "branch-us",
  },
  {
    slug: "australia",
    city: "Sydney",
    country: "Australia",
    flag: "AU",
    address: ["13 Genders Ave", "Burwood NSW 2134"],
    phone: "+61 493 725 853",
    email: "lightofpractice@gmail.com",
    image: "branch-australia",
  },
  {
    slug: "japan",
    city: "Osaka",
    country: "Japan",
    flag: "JP",
    address: ["〒550-0024", "大阪府大阪市西区 境川 1丁目 6-26"],
    phone: "+81 80-5088-1594",
    email: "jy-519@outlook.com",
    image: "branch-japan",
    note: "Contact: 嘉阳",
  },
  {
    slug: "singapore",
    city: "Singapore",
    country: "Singapore",
    flag: "SG",
    address: ["Singapore"],
    email: "peace@bodhinature.com",
    image: "branch-singapore",
  },
  {
    slug: "thailand",
    city: "Bangkok",
    country: "Thailand",
    flag: "TH",
    address: ["Bangkok · Chiang Mai · Phuket"],
    email: "peace@bodhinature.com",
    note: "Write to us for the current meeting place.",
  },
  {
    slug: "malaysia",
    city: "Kuala Lumpur",
    country: "Malaysia",
    flag: "MY",
    address: ["Kuala Lumpur · Malacca"],
    email: "peace@bodhinature.com",
    note: "Write to us for the current meeting place.",
  },
  {
    slug: "sweden",
    city: "Sweden",
    country: "Sweden",
    flag: "SE",
    address: [],
    email: "peace@bodhinature.com",
    note: "Contact us for the current meeting place.",
  },
];

export const books = [
  { image: "book-en", lang: "English", title: "The Essence of Happiness and True Freedom" },
  { image: "book-de", lang: "Deutsch", title: "Die Essenz von Glück und wahrer Freiheit" },
  { image: "book-fr", lang: "Français", title: "L'essence du bonheur et de la vraie liberté" },
  { image: "book-nl", lang: "Nederlands", title: "De Essentie van Geluk en Ware Vrijheid" },
];

export const connections = [
  { region: "Australia", places: "Sydney" },
  { region: "America", places: "Los Angeles · Raleigh · New York · Seattle · Buffalo" },
  { region: "Japan", places: "Nara" },
  { region: "Singapore", places: "" },
  { region: "South Korea", places: "" },
  { region: "Taiwan, China", places: "" },
];

export const testimonials = [
  {
    quote:
      "You may think this is ridiculous — I have been a teacher for 15 years, and all I knew about the world was the pictures of China, Asia, Africa and Europe. After the course, I realised that the world refers to time and space. It was then that I felt how tiny I am, and how ridiculous it is for human beings to think they know so much.",
    name: "Qing Ju",
    avatar: "avatar-1",
    role: "High school teacher",
    title: "I feel how tiny I am",
  },
  {
    quote:
      "The teachers awakened my love for my parents. How could we blame our parents when it is not easy to repay them for raising us! When I realised this, I was deeply remorseful. The teachers also resolved the resentments between me and my mum — we are now closer to each other.",
    name: "Kong Yuan",
    avatar: "avatar-2",
    role: "Pottery craftsman",
    title: "My love for parents awakened",
  },
  {
    quote:
      "Truly, an experience that awakened me to what I had done in the years that had passed. What did I do that was of value to society? How much time was wasted? In the time remaining, I want to wake up, to feel and live in every present moment; let life awaken life, and let more lives rise together.",
    name: "Lei Jun",
    avatar: "avatar-3",
    role: "Photographer",
    title: "Love and kindness",
  },
  {
    quote:
      "Without them, I would still be living in a muddled ego, unaware of the preciousness of this human body, unaware of the illusion of the world I live in, never thinking about the true meaning of life. From this moment on I feel reborn — I will live my limited life with kindness to others, in service to society, in pursuit of truth.",
    name: "Kong Yang",
    avatar: "avatar-4",
    role: "Spiritual counsellor",
    title: "I feel reborn",
  },
  {
    quote:
      "One of the questions we must face is how we should live our life. In my own case I had always lived with the flow, without clear goals. Today's lesson reveals the truth about life — the three sufferings and impermanence. Life is the process of cultivating your soul.",
    name: "Wang Kun",
    avatar: "avatar-5",
    role: "Painter",
    title: "How should I live?",
  },
];
