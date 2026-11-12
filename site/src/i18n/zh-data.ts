/** 中文内容数据：与 src/data/site.ts、events.ts、quotes.json 对应。 */

export const stats = [
  { value: "100+", label: "每年佛法讲座" },
  { value: "324", label: "每年团体课程" },
  { value: "365", label: "每年每日课程" },
  { value: "54+", label: "每年禅修营" },
];

export const pillars = [
  {
    title: "同体",
    subtitle: "安乐",
    body:
      "数千年来，圣者一再示导：无人孤立。国族、种族、肤色各异的人，如同手足。当相扶相成，而非相争相害。",
    image: "peace",
  },
  {
    title: "环境",
    subtitle: "和谐",
    body:
      "佛陀视环境为众生安乐之所依。护持环境即是修行：以开阔之心面对自然，舍离占有之欲。",
    image: "aurora",
  },
  {
    title: "觉悟",
    subtitle: "真谛",
    body:
      "「佛陀」意为觉者，非神。任何人证得真理，皆可成佛。佛法并不排他；它是如实观照世间，并因这份观照而得自在。",
    image: "practicing",
  },
];

export const path = [
  {
    step: "01",
    title: "闻",
    body: "透过听闻真理，你知道该修什么、该止什么。",
  },
  {
    step: "02",
    title: "思",
    body: "反复以理思维，验证并加深对真理的认解，直到方法融入日常。",
  },
  {
    step: "03",
    title: "修",
    body: "一步一步前进——布施、做义工、分享、禅修。戒、定、慧三者，一起修。",
  },
];

export const teachers = [
  {
    name: "真觉法师",
    role: "创办人",
    image: "teacher-zhenjue",
    paras: [
      "菩提自性基金会由一群发心的善友共同发起，是注册慈善机构。",
      "真觉法师依止仁泽法师修学。教法融汇藏传与汉传佛教的《菩提道次第》修持。",
      "多年修行之后，真觉法师看到：灾难、疾病、纷乱的世间与种种痛苦，皆源于错误的观念与对真理的无知。正是这份悲心，推动着法师将智慧传递给更多人。",
    ],
  },
  {
    name: "德阳法师",
    role: "法师",
    image: "teacher-deyang",
    paras: [
      "德阳法师在仁泽法师座下披剃。初遇佛法，即为教法中的智慧所感动，也因善知识慈悲的指引、教导与鼓励，生起对菩提道的真诚愿心。",
      "他选择出家，不只为自己解脱，更以利益众生为愿——严持净戒，修习定慧，弘扬佛法，令正法久住世间。",
    ],
  },
];

export const programs = [
  {
    slug: "dharma-study",
    no: "01",
    title: "佛法研习",
    kicker: "闻思",
    summary: "四圣谛、无常、因果与心性——佛陀对苦及其止息的亲身分析，平实地研读。",
    image: "program-dharma",
    hero: "dharma-hero",
    intro: [
      "佛教是世界主要宗教之一，源自悉达多·乔达摩的教法。他生于约公元前六世纪的古印度，舍弃王族的优渥生活，为求解脱而修行，终于在菩提伽耶的菩提树下觉悟，被尊为「佛陀」——觉者。",
      "教法以四圣谛与八正道为核心：戒、定、慧三者相资，引导修行者从苦与轮回中解脱。",
    ],
    highlights: [
      { title: "四圣谛", body: "苦、集、灭、道。一切修行的基础。" },
      {
        title: "三苦",
        body: "「诸行皆苦」是四法印之一。然而欲望满足时，我们明明感到快乐——佛陀究竟在说什么？",
      },
      { title: "佛教宇宙观", body: "佛陀关于时间与空间、生死与认知界限的说明。" },
      {
        title: "诸行无常",
        body: "「一切足迹中，象迹最胜；一切观照中，无常观最胜。」",
      },
      { title: "因果法则", body: "业、习气与自由意志的惯性——缘起法的五个面向。" },
      { title: "因果之镜", body: "龙树、佛陀与六祖，谈祸福究竟从何而来。" },
    ],
    truths: [
      {
        title: "苦谛",
        body: "生是苦，老是苦，病是苦，死是苦；爱别离苦，怨憎会苦，求不得苦；忧悲苦恼，五取蕴皆是苦。",
      },
      {
        title: "集谛",
        body: "渴爱是苦的根源——对色、受、想、行、识的贪欲、热恼与渴求。",
      },
      {
        title: "灭谛",
        body: "于色、受、想、行、识之渴爱，无余、断尽、舍离、寂灭，即是苦的止息。",
      },
      {
        title: "道谛",
        body: "能究竟断除渴爱的唯一道路，是八正道——戒、定、慧。",
      },
    ],
    links: [
      { label: "佛教宇宙观 — 影片系列", href: "https://youtube.com/playlist?list=PLdph_MCVJGB2PCZWsXqSkt4_eMRDXndJW" },
      { label: "诸行无常", href: "https://youtube.com/playlist?list=PLdph_MCVJGB3BTeeCdLbCXoWC_qrfELfa" },
      { label: "因果法则", href: "https://youtube.com/playlist?list=PLdph_MCVJGB3choe9t5kKWyguvtzkQEJ-" },
      { label: "因果之镜", href: "https://youtube.com/playlist?list=PLdph_MCVJGB0ZR9jw6wbsPrsp3Gqlwi9v" },
    ],
    cta: "索取课程资料",
  },
  {
    slug: "mindfulness",
    no: "02",
    title: "正念",
    kicker: "修持",
    summary: "当下的觉知，以古法教授——调身、调息、拉伸，以及一颗不加评判、只是照见的心。",
    image: "program-mindfulness",
    hero: "mindfulness-hero",
    gallery: [
      { image: "mindfulness-hero", caption: "入座之前：安静的空间、端正的脊背、安定的呼吸" },
      { image: "peace", caption: "毗卢七支坐的引导" },
    ],
    intro: [
      "正念禅修与课程培养当下的觉知：透过引导禅修、动中禅与经行，以及有经验的老师指导，学习不加评判地观照念头与感受。",
      "利益不止于蒲团——专注力提升、韧性增强，面对压力的方式也会带进日常。",
    ],
    highlights: [
      {
        title: "禅修前的准备",
        body: "安静的空间、端正的坐姿、固定的时段、关掉干扰、宽松的衣物、几次深呼吸、清楚的发心——然后从短时间开始。",
      },
      {
        title: "拉伸与动功",
        body: "简单的瑜伽与柔和动作，让身体放松、筋骨柔软，更容易进入较深的觉知。",
      },
      {
        title: "毗卢七支坐",
        body: "双盘或单盘；脊背挺直；双手结定印；两臂微张；下颌微收；双目微开、垂视鼻端；舌抵上腭。",
      },
      { title: "引导禅修", body: "身心放松、心轮放松、卧禅与诵念。" },
    ],
    links: [
      { label: "引导禅修 — 继续练习", href: "https://www.youtube.com/watch?v=_6s-uy47WSc&list=PLdph_MCVJGB0GXdmta5qbT96ShikZek2g" },
      { label: "正念生活 — 影片系列", href: "https://youtube.com/playlist?list=PLdph_MCVJGB050U1T9cLdb1o3psnFad-m" },
      { label: "诵念", href: "https://youtube.com/playlist?list=PLp-bkW_-IYjOeAg3lo9hEoVNLuMS58fQr" },
      { label: "往期活动回顾", href: "https://youtube.com/playlist?list=PLp-bkW_-IYjNlppT0ucOQAd-ISRkoK9qN" },
    ],
    cta: "参加正念课程",
  },
  {
    slug: "tai-chi",
    no: "03",
    title: "太极与身体",
    kicker: "身体",
    summary: "缓慢优雅的动作，伸展、强健并安定身心——把传统的中国养生功夫当作修行。",
    image: "program-taichi",
    hero: "taichi-hero",
    gallery: [
      { image: "taichi-alt", caption: "莲花生动功——缓慢练习的动中禅" },
      { image: "feather", caption: "要的不是用力，而是平衡。" },
    ],
    intro: [
      "太极以太极阴阳的辩证思想为核心，融汇《易经》阴阳五行之变、中医经络、古代导引与吐纳之法。",
      "动作缓慢圆活，帮助伸展、呼吸与平衡；长期练习能安定身心，减轻压力、焦虑与抑郁，开通气脉，强身养性。",
    ],
    highlights: [
      { title: "莲花生动功", body: "源于武术与气功的传统功法：动作、呼吸与意念三者相合。" },
      { title: "它能带来什么", body: "柔软度、肌力、心肺功能与精力——以及身体之外的平静与情绪平衡。" },
      { title: "每周免费课程", body: "每周五上午与下午各一堂，地点在列治文。欢迎任何人。" },
      { title: "正念太极", body: "作息表上 16:30 的那一堂，把动与坐中的觉知连成一片。" },
    ],
    cta: "报名周五课程",
  },
  {
    slug: "hospice-care",
    no: "04",
    title: "临终关怀",
    kicker: "关怀",
    summary: "佛教的临终关怀——如何帮助一个人带着清明、安详的心离去，以及如何陪伴一个家庭走过。",
    image: "program-hospice",
    hero: "hospice-hero",
    gallery: [
      { image: "tibetan-book", caption: "《西藏生死书》——另有影片系列", ratio: "2/3" },
    ],
    intro: [
      "佛教对生死有深刻而透彻的理解，认为临终者的心念对来世至关重要。因此，临终关怀是能给予的最后、也最关键的一份帮助。",
      "以深切的慈悲与正念面对临终：让这一段路保有尊严与心灵准备，练习接受无常、放下执著。",
    ],
    highlights: [
      {
        title: "了结心事",
        body: "关键在交谈：「你即将远行，还有什么放不下的事吗？」让他安排，并替他照看。",
      },
      {
        title: "保持正念",
        body: "不在他面前流露怨恼。反复提醒放下世间执著。帮助他以善念、恭敬与慈爱之心面对死亡。",
      },
      { title: "态度", body: "始终以慈爱表达。和善、有耐性。不急，也不要把气氛弄得太沉重。" },
      {
        title: "闻解脱",
        body: "临终前一两个月，开始播放《中阴闻教得度》，与佛号诵念交替。",
      },
    ],
    links: [
      { label: "中阴闻教得度 — 录音", href: "https://youtu.be/IJS4SFlJumM" },
      { label: "《西藏生死书》— 影片系列", href: "https://www.youtube.com/playlist?list=PLp-bkW_-IYjPTN39-gAa8GosM7m9V-f95" },
    ],
    cta: "与我们谈临终关怀",
  },
  {
    slug: "happiness-and-freedom",
    no: "05",
    title: "幸福与自由",
    kicker: "探问",
    summary: "十五集的系列，谈幸福与自由究竟是什么——以及为什么把它当作外在的追求，总是落空。",
    image: "program-happiness",
    hero: "happiness-hero",
    bookGrid: true,
    intro: [
      "众生忙碌奔波，都为求幸福与自由。然而我们对幸福与自由的理解，往往片面、狭窄，甚至错误，许多人因此走错了方向。",
      "我们把满足欲望当作幸福，于是不断向外追求：成功则喜，失败则忧。智者提醒我们还有更深的幸福与自由——不受外境牵动——而且确实可以企及。",
    ],
    highlights: [
      { title: "幸福与自由的本质", body: "十五个短片，从更深的层面拆解这个问题。" },
      { title: "四种语言", body: "系列的文字版译为四种语言，欢迎免费下载分享。" },
    ],
    links: [{ label: "观看影片系列", href: "https://bodhinature.com/happiness-and-freedom/" }],
    cta: "观看系列",
  },
];

export const schedule = [
  { time: "06:00", label: "礼拜与禅修" },
  { time: "08:45", label: "早课" },
  { time: "14:30", label: "午课" },
  { time: "17:00", label: "礼拜" },
  { time: "19:00", label: "晚课与禅修" },
];

export const retreat = {
  title: "周末禅修",
  image: "clouds",
  goal: "闻、思、修——贯穿我们每一堂课的三重道路。",
  content: ["诵经", "呼吸练习", "佛法研读", "禅修引导", "太极练习", "莲花动功"],
};

export const volunteerRoles = [
  {
    title: "配音",
    meta: "有声书 · 影片",
    image: "vol-dubbing",
    body:
      "我们正在为佛法影片、禅修引导与书籍加上英语配音，让更多人能够理解——《幸福与自由》《仁泽法师法语》《四法印》以及禅修引导等。",
  },
  {
    title: "编辑",
    meta: "书籍 · 影片 · 文件",
    image: "vol-editor",
    body: "数千册书籍、影片与文件需要编辑，欢迎英语良好、上过基金会基础课程的朋友加入。",
  },
  {
    title: "翻译",
    meta: "中文 → 英文",
    image: "vol-translate",
    body:
      "仁泽法师的英文书籍与影片，皆由世界各地的义工翻译与编辑。我们需要中英俱佳、愿意成长、愿意助人的朋友。",
  },
  {
    title: "协调",
    meta: "活动 · 禅修营 · 社群",
    image: "vol-coordinate",
    body: "我们定期举办线上课程、各地禅修营与活动，需要擅长沟通、喜爱禅修、太极与佛法的义工。",
  },
  {
    title: "其他",
    meta: "你能给的任何一件事",
    image: "lilac",
    body: "机会不止这些——告诉我们你擅长什么，我们会为它找到位置。",
  },
];

export const donateMethods = [
  {
    title: "线上捐款",
    body: "透过安全的捐款页面以信用卡护持。单次或定期皆可——定期捐款让我们得以规划一整年。",
    action: { label: "线上捐款", href: "https://bodhinature.com/donate/" },
  },
  {
    title: "电子转账",
    body: "将电子转账寄到我们的捐款信箱。",
    action: { label: "bodhinature.f@gmail.com", href: "mailto:bodhinature.f@gmail.com" },
  },
  {
    title: "银行转账与支票",
    body: "来信索取完整的银行转账资讯。",
    action: { label: "索取资讯", href: "mailto:peace@bodhinature.com" },
  },
  {
    title: "二维码",
    body: "用手机的相机或二维码扫描器扫描，输入金额即可完成护持。",
    action: { label: "索取二维码", href: "mailto:peace@bodhinature.com" },
  },
  {
    title: "遗产规划",
    body: "关于护持的任何方面，包括遗产规划，都欢迎来信商量。",
    action: { label: "peace@bodhinature.com", href: "mailto:peace@bodhinature.com" },
  },
];

export const branches = [
  {
    slug: "canada",
    city: "列治文 / 卡尔加里",
    country: "加拿大",
    flag: "CA",
    address: ["卑诗省列治文", "亚伯达省卡尔加里"],
    phone: "+1 587 890 8888",
    email: "peace@bodhinature.com",
    image: "branch-canada",
    note: "我们的基地。每日课程、列治文每周太极班，以及各地禅修营。",
  },
  {
    slug: "united-states",
    city: "钻石吧",
    country: "美国",
    flag: "US",
    address: ["21030 Blossom Way", "Diamond Bar, CA 91765"],
    phone: "(626) 232-8143",
    email: "usa@yimingpureland.org",
    image: "branch-us",
  },
  {
    slug: "australia",
    city: "悉尼",
    country: "澳大利亚",
    flag: "AU",
    address: ["13 Genders Ave", "Burwood NSW 2134"],
    phone: "+61 493 725 853",
    email: "lightofpractice@gmail.com",
    image: "branch-australia",
  },
  {
    slug: "japan",
    city: "大阪",
    country: "日本",
    flag: "JP",
    address: ["〒550-0024", "大阪府大阪市西区 境川 1丁目 6-26"],
    phone: "+81 80-5088-1594",
    email: "jy-519@outlook.com",
    image: "branch-japan",
    note: "联系人：嘉阳",
  },
  {
    slug: "singapore",
    city: "新加坡",
    country: "新加坡",
    flag: "SG",
    address: ["新加坡"],
    email: "peace@bodhinature.com",
    image: "branch-singapore",
  },
  {
    slug: "thailand",
    city: "曼谷",
    country: "泰国",
    flag: "TH",
    address: ["曼谷 · 清迈 · 普吉"],
    email: "peace@bodhinature.com",
    note: "共修地点请来信询问。",
  },
  {
    slug: "malaysia",
    city: "吉隆坡",
    country: "马来西亚",
    flag: "MY",
    address: ["吉隆坡 · 马六甲"],
    email: "peace@bodhinature.com",
    note: "共修地点请来信询问。",
  },
  {
    slug: "sweden",
    city: "瑞典",
    country: "瑞典",
    flag: "SE",
    address: [],
    email: "peace@bodhinature.com",
    note: "共修地点请来信询问。",
  },
];

export const connections = [
  { region: "澳大利亚", places: "悉尼" },
  { region: "美洲", places: "洛杉矶 · 罗利 · 纽约 · 西雅图 · 水牛城" },
  { region: "日本", places: "奈良" },
  { region: "新加坡", places: "" },
  { region: "韩国", places: "" },
  { region: "中国台湾", places: "" },
];

export const testimonials = [
  {
    quote:
      "你也许觉得可笑——我当了十五年老师，所知道的世界只是中国、亚洲、非洲与欧洲的图片；再大一些是地球、月球与火星，再远是银河。上完课，我才明白所谓世界，指的是时间与空间。那一刻，我感到自己多么渺小，也觉得人类自以为知道很多，是多么可笑。",
    name: "清居",
    role: "中学教师",
    title: "我感到自己多么渺小",
    avatar: "avatar-1",
  },
  {
    quote:
      "老师们唤醒了我对父母的爱。父母养育之恩难以回报，我们怎能怪罪他们！明白这一点时，我深深懊悔。老师们也化解了我和母亲之间的怨结——我们现在更亲近了。",
    name: "孔元",
    role: "陶艺工作者",
    title: "对父母的爱被唤醒了",
    avatar: "avatar-2",
  },
  {
    quote:
      "这真是一次唤醒。这些年我做过什么？什么对社会有价值？多少时间被浪费了？剩下的日子里，我想醒来，在每一个当下感受并活着；让生命唤醒生命，让更多生命一起站起来。",
    name: "雷军",
    role: "摄影师",
    title: "爱与善意",
    avatar: "avatar-3",
  },
  {
    quote:
      "若不是他们，我仍活在混沌的自我里，不知人身难得，不知所处世界的虚幻，也从不去想生命的真正意义。从这一刻起，我觉得自己重生了——我要以善意对待他人与一切众生，服务社会，以求真理为究竟。",
    name: "孔阳",
    role: "心灵辅导者",
    title: "我觉得自己重生了",
    avatar: "avatar-4",
  },
  {
    quote:
      "我们必须面对的问题之一是：该如何生活。我一直随波逐流，没有清楚的目标。今天的课揭示了生命的真相——三苦与无常。生命，是修心的过程。",
    name: "王坤",
    role: "画家",
    title: "我该如何生活？",
    avatar: "avatar-5",
  },
];

export const books = [
  { image: "book-en", lang: "English", title: "The Essence of Happiness and True Freedom" },
  { image: "book-de", lang: "Deutsch", title: "Die Essenz von Glück und wahrer Freiheit" },
  { image: "book-fr", lang: "Français", title: "L'essence du bonheur et de la vraie liberté" },
  { image: "book-nl", lang: "Nederlands", title: "De Essentie van Geluk en Ware Vrijheid" },
];

export const events = [
  {
    slug: "walk-for-peace",
    title: "和平步行",
    titleCn: "Walk for Peace",
    notes: ["以行走为修行——免费，无须报名"],
    cta: "询问日期",
  },
  {
    slug: "online-meditation-centre",
    title: "空中禅堂（欧洲站）",
    titleCn: "Online Meditation Centre",
    cadence: "每周六、周日",
    time: "中欧时间 07:00 · 英国时间 06:00",
    place: "线上视讯",
    image: "event-online",
    notes: ["每次约一个半至两个小时", "透过群组加入——来信索取连结"],
    themes: ["情绪管理", "慈心冥想", "放松疗愈", "滋养身心"],
    cta: "索取加入连结",
  },
];

export const eventPosters = [
  { image: "event-mindfulness", caption: "正念禅修" },
  { image: "event-wisdom", caption: "关于幸福生活的法语" },
];

export const quotes = [
  {
    title: "深信因果的人",
    body:
      "行十善的人，心中常怀善念，对任何众生都不起恼害。无论众生多么愚痴、恶劣，甚至凶暴，他都不怀恶意。这样的人深信因果。当恶念生起时，不论什么理由，都说明自己修行不足。",
  },
  {
    title: "真正的菩萨",
    body:
      "若未修解脱道，行菩萨道只是在菩萨道的名义下，满足自己轮回的习气。真正的菩萨虽在世间做事，却没有自己的欲望与偏好，只是随顺众生的偏好，永远与众生意气相和。",
  },
  {
    title: "开始修行了，却心急，进步不了怎么办？",
    body:
      "初修行时容易着急。烦恼来时急，进步慢时也急。有些事急也没用，需要时间。「慢而稳者胜」，说的就是这个。若觉得慢，就多花时间听闻：别人听一遍，你听十遍；别人听十遍，你听百遍。这样一定赶得上，不可能赶不上。",
  },
  {
    title: "时时观照自心",
    body:
      "我们应当不断检视自己的心。当下的动机若不清净，就要努力修正。唯有纯然为生死、为一切众生觉悟而修，才能走向解脱与圆满的佛道。",
  },
  {
    title: "认清修行的方向",
    body:
      "其实很简单。我们要明白修行的方向，就是突破无明带来的一切迷惑与执著。如此，佛性才能起大妙用。不是什么都不做，而是有大神通、大妙用。在凡夫眼中，佛确实伟大；其实我们也有这份能力，只是被自己的无明、愚痴、烦恼与执著障住了。",
  },
  {
    title: "做事的态度",
    body:
      "做任何事，无论是利益众生还是其他，只要能让人的烦恼减少、法喜增长、护持道心，就是圆满。不必为小事争论——该这样做还是那样做。有话要商量，就好好说。以最谦下的态度一起做，提出让大家都少烦恼的方法，怀着增长法喜、护持道心的心意。",
  },
  {
    title: "等待",
    body:
      "我们应当惭愧。菩萨那样慈悲，我们却依旧心量狭窄，不能体会。然而菩萨举着智慧之灯，在漫长的黑夜里等待，只为照亮我们的路。因为他们的愿，他们像父母等待孩子一样耐心等待，受尽辛苦。为什么？因为不听，就无法勉强人修行。众生需要因缘，所以「等待」如此重要。",
  },
  {
    title: "当别人犯错时",
    body:
      "别人犯错时，应当引导他，或长时等待机会，善巧方便地劝导。时机成熟时也可以呵责，但不应立刻指责，那表示自己缺乏慈悲。",
  },
  {
    title: "请慈悲那个伤害你的人",
    body:
      "伤害你的人，其实是在帮你成就菩萨道。透过他的伤害，你修起了对他的慈悲，也消除了自己瞋恨的恶业种子。他确实在帮你，所以应当感谢他。但也不要因此想：「那好吧，让大家都来伤害我」——那样岂不是在伤害众生？不应有这样的念头。",
  },
  {
    title: "烦恼尽了，智慧自然现前",
    body:
      "智慧不是先减少烦恼，再从外面取得什么变成智慧，不是这样的。智慧本自具足；烦恼一淡，智慧自然显现。减少烦恼，智慧自然生起，不必另求他物。佛教的革命，是为了净化。修行就是这么简单。",
  },
  {
    title: "用这个方法禅修，能快速增长慈悲",
    body:
      "修四无量心，基础在于修出离心。初学时，应主要修平等心，消除对众生的贪与瞋。接着修慈心，再修悲心。慈心是给众生快乐，是一种向外放射的正向能量——把你的正能量给众生。",
  },
  {
    title: "培养正能量",
    body:
      "学佛的人，应当时时处在不断受教的状态。要认识并承认自己的诸多过失，努力忏悔恶业、恶习与恶念，然后让自己常接触正念——现在称为「正能量」。这个词很好用：正能量、正念、正知、正见，都是正确的态度。",
  },
  {
    title: "唯有从早到晚修观，才能真正破除我执",
    body:
      "你听过教法，但你在禅修中可曾真诚地观照？禅修中的观是不同的。必须从早到晚精勤观照，才能真正超越我执。光说没有用；只是说着玩，有什么用？在生活里，有多少人真正在禅修中观无我？很难。观得太少，日常中就找不到无我的痕迹。",
  },
  {
    title: "观苦，必须刹那刹那地观",
    body:
      "观苦，必须刹那刹那地观，不是粗粗地看。修完无常观之后，要刹那刹那地观生灭。要观苦苦如何刹那生灭、坏苦如何刹那生灭。那时不要执著于坏苦，但当坏苦生起时，要透彻地观照是什么在动。",
  },
];
