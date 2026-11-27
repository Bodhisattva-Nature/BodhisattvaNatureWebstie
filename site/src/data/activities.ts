export interface ActivityCenter {
  name: string;
}

export interface ActivityRegion {
  slug: string;
  name: string;
  note: string;
  intro: string;
  eventSlugs: string[];
  centers: ActivityCenter[];
}

export interface ActivityItem {
  name: string;
  description: string;
}

export interface ActivityType {
  title: string;
  items: ActivityItem[];
}

export interface ActivityPoster {
  image: string;
  alt: string;
  caption: string;
}

export interface ActivityVideo {
  label: string;
  id: string;
}

export interface ActivitySchedule {
  label: string;
  image: string;
}

export const activities = {
  title: "中文活动",
  eyebrow: "活动",
  lede: "以中文共修的活动一览：线下相聚、禅修与课程，以及每日线上共修。",
  facts: ["线下共修", "禅修课程", "每日线上"],

  explorerEyebrow: "线下活动",
  explorerTitle: "线下道场",
  defaultPosterNote: "最新活动",
  defaultCenterNote: "各地最新活动",

  latestPosters: [
    {
      image: "event-new-york-weekend",
      alt: "纽约周末活动海报",
      caption: "纽约周末 · 11/27–11/29",
    },
    {
      image: "event-dawn",
      alt: "憬醒 I 禅修营海报",
      caption: "憬醒 I · 温哥华",
    },
  ] as ActivityPoster[],

  centerPoster: {
    image: "event-new-york-weekend",
    alt: "纽约周末活动海报",
    caption: "纽约周末 · 11/27–11/29",
  } as ActivityPoster,

  regions: [
    {
      slug: "canada",
      name: "加拿大",
      note: "定期课程、周末禅修与共修相聚。",
      intro:
        "温哥华（兰里）、卡尔加里与多伦多设有分会与共修团体；温哥华地区道场每日共修，卡尔加里定期举办禅修营。具体安排请来信询问。",
      eventSlugs: ["dawn-1", "awakening-2", "wisdom-practicing", "bodhi-class", "journey-calgary", "journey-calgary-10"],
      centers: [{ name: "温哥华（兰里）" }, { name: "卡尔加里" }, { name: "多伦多" }],
    },
    {
      slug: "united-states",
      name: "美国",
      note: "当地共修、步行与法师来访活动。",
      intro: "美国东西两岸的禅修营、系统课程与城市步行。纽约、洛杉矶与西雅图各有当地共修团体。",
      eventSlugs: ["journey-11", "wisdom-practicing", "bodhi-class"],
      centers: [{ name: "纽约" }, { name: "洛杉矶" }, { name: "西雅图" }],
    },
    {
      slug: "europe",
      name: "欧洲",
      note: "欧洲的小型当地共修团体，详见联系页。",
      intro: "法国与瑞典设有小型当地共修团体（详见联系页）。",
      eventSlugs: [],
      centers: [{ name: "法国" }, { name: "瑞典" }],
    },
    {
      slug: "asia",
      name: "亚洲",
      note: "各地共修团体与联络人。",
      intro: "泰国、马来西亚与韩国设有共修团体与联络人；泰国与马来西亚曾举办禅修与亲子营。",
      eventSlugs: ["thailand-2024", "malaysia-camp"],
      centers: [
        { name: "泰国" },
        { name: "马来西亚" },
        { name: "韩国" },
      ],
    },
    {
      slug: "australia",
      name: "澳大利亚",
      note: "当地共修团体。",
      intro: "悉尼设有共修团体。欢迎来信，我们为你联系当地联络人。",
      eventSlugs: [],
      centers: [{ name: "悉尼" }],
    },
  ] as ActivityRegion[],

  typesEyebrow: "活动类型",
  typesTitle: "总有一门，契合当下",
  types: [
    {
      title: "禅修与闭关",
      items: [
        { name: "半日禅、一日禅", description: "适合初次接触禅修，或想在半天、一天中收摄身心的人；提供坐姿与呼吸的基础引导。" },
        { name: "止观禅修（三、五、七日）", description: "以止观为核心的系统禅修，按三日、五日、七日循序渐进，练习安住与观照。" },
        { name: "忏悔禅修", description: "通过礼拜、忏悔与发愿，清理身心负担，重新检视自己的身口意。" },
        { name: "二十一日精进禅修", description: "较长周期的密集用功，适合已有禅修基础、希望深入者。" },
        { name: "短期闭关", description: "数日至数周的封闭式修持，减少外缘，专一念佛、持咒或观修。" },
      ],
    },
    {
      title: "身心与生活",
      items: [
        { name: "禅茶", description: "在泡茶、奉茶与品茶中练习专注与觉知，让日常的一盏茶成为修行。" },
        { name: "中医养生", description: "从饮食、作息与经络理解身心调养，学习顺应四时的养护方法。" },
        { name: "情绪管理", description: "以正念觉察情绪的生灭，学习看见、接纳而不被情绪带走。" },
        { name: "正念太极", description: "以缓慢动作训练身体觉察与呼吸相随，在动中保持安定。" },
        { name: "正念颂钵", description: "透过颂钵的音声与振动，帮助身心放松，回到当下的感受。" },
        { name: "正念书法", description: "在一笔一画中收摄心念，练习专注、耐心与当下。" },
        { name: "正念徒步（和平步行）", description: "把每一步交给觉知，在行走中培养和平、慈悲与相互连接。" },
        { name: "临终关怀", description: "陪伴临终者与家属，学习面对生死、表达关怀与告别的智慧。" },
      ],
    },
    {
      title: "家庭与少年",
      items: [
        { name: "智慧父母", description: "以佛法与心理学的视角，练习亲子沟通、情绪陪伴与界限。" },
        { name: "亲子营", description: "父母与孩子共同参与的体验式营队，在游戏与相处中学习觉察。" },
        { name: "少儿功夫", description: "以武术基本功培养专注、纪律与身体协调，也学习尊师重道。" },
        { name: "论语共学", description: "共读《论语》，将传统智慧落实于日常待人处世与自我反省。" },
        { name: "宠物皈依", description: "为宠物授三皈依，种下解脱善根，并学习尊重、护念一切生命。" },
      ],
    },
  ] as ActivityType[],

  galleryEyebrow: "往期活动回顾",
  galleryTitle: "历次活动",
  galleryNote: "共修、供花与道场的片刻。",
  gallery: [
    { image: "activity-gallery-retreat", alt: "周末共修，林间佛像", caption: "周末共修" },
    { image: "activity-gallery-flowers", alt: "铜盘中的供花与清水", caption: "供花与发愿" },
    { image: "activity-gallery-manjushri", alt: "林间文殊师利像", caption: "道场一隅" },
    { image: "activity-gallery-taichi", alt: "水墨山水中的正念太极", caption: "正念太极" },
    { image: "activity-gallery-spring", alt: "春日花开的共修场景", caption: "春日共修" },
    { image: "activity-gallery-clouds", alt: "云海之上的云水共修", caption: "云水之间" },
    { image: "activity-gallery-lake", alt: "群山环抱的静心湖畔", caption: "静心湖畔" },
    { image: "activity-gallery-lilac", alt: "春日花开的共学场景", caption: "春华共学" },
    { image: "activity-gallery-leaf", alt: "一枝绿叶，一叶知心", caption: "一叶知心" },
  ] as ActivityPoster[],

  videosEyebrow: "往期活动",
  videosTitle: "YouTube 视频",
  videosNote: "从基金会频道观看往期活动。",
  videos: [
    { label: "往期活动视频 01", id: "t99U65QDaas" },
    { label: "往期活动视频 02", id: "vAFh0j_nsC4" },
  ] as ActivityVideo[],

  onlineEyebrow: "Zoom",
  onlineTitle: "线上每日共修",
  onlineBody: "加西与加东，每日共修。免费参加，无需报名，来信索取 Zoom 链接。",
  onlineCta: "来信索取 Zoom 链接",
  schedules: [
    { label: "美西课表", image: "activity-schedule-west" },
    { label: "美东课表", image: "activity-schedule-east" },
  ] as ActivitySchedule[],
};

export const activityRoutes = [
  "/activities/",
  ...activities.regions.map((region) => `/activities/${region.slug}/`),
];
