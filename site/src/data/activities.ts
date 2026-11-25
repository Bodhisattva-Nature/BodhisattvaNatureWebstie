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

export interface ActivityType {
  title: string;
  items: string[];
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
  note: string;
}

export const activities = {
  title: "中文活动",
  eyebrow: "活动",
  lede: "以中文共修的活动一览：线下相聚、禅修与课程，以及每日线上共修。",
  facts: ["线下共修", "禅修课程", "每日线上"],

  explorerEyebrow: "线下活动",
  explorerTitle: "选择地区",
  explorerNote: "将鼠标移到地区上，查看当地道场与共修点。",
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
      eventSlugs: ["journey-11", "walk-for-peace", "wisdom-practicing", "bodhi-class"],
      centers: [{ name: "纽约" }, { name: "洛杉矶" }, { name: "西雅图" }],
    },
    {
      slug: "europe",
      name: "欧洲",
      note: "线上共修与小型当地共修团体，详见联系页。",
      intro: "空中禅堂每周末与欧洲各地共修；法国与瑞典亦有小型当地共修团体（详见联系页）。",
      eventSlugs: ["online-meditation-centre"],
      centers: [{ name: "法国" }, { name: "瑞典" }],
    },
    {
      slug: "asia",
      name: "亚洲",
      note: "各地共修团体与联络人。",
      intro: "亚洲多地设有共修团体与联络人；泰国、马来西亚等地曾举办禅修与亲子营。",
      eventSlugs: ["thailand-2024", "malaysia-camp"],
      centers: [
        { name: "日本" },
        { name: "新加坡" },
        { name: "泰国" },
        { name: "马来西亚" },
        { name: "中国台湾" },
        { name: "韩国" },
        { name: "印度尼西亚" },
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
      items: ["半日禅、一日禅", "止观禅修（三、五、七日）", "忏悔禅修", "二十一日精进禅修", "短期闭关"],
    },
    {
      title: "身心与生活",
      items: ["禅茶", "中医养生", "情绪管理", "正念太极", "正念颂钵", "正念书法", "正念徒步（和平步行）", "临终关怀"],
    },
    {
      title: "家庭与少年",
      items: ["智慧父母", "亲子营", "少儿功夫", "论语共学", "宠物皈依"],
    },
  ] as ActivityType[],

  galleryEyebrow: "往期活动回顾",
  galleryTitle: "历次活动",
  galleryNote: "三张活动图片待上传。",
  galleryPlaceholders: ["活动图片待上传 01", "活动图片待上传 02", "活动图片待上传 03"],

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
    { label: "美西课表", note: "课表图片待上传" },
    { label: "美东课表", note: "课表图片待上传" },
  ] as ActivitySchedule[],
};

export const activityRoutes = [
  "/activities/",
  ...activities.regions.map((region) => `/activities/${region.slug}/`),
];
