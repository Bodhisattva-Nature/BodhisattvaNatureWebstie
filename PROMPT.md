# Build prompt: Bodhisattva Nature Foundation, modern rebuild

Copy everything below into a fresh AI session. It is written to be given as-is.

---

## The task

Check **https://bodhinature.com** and get **all** of its data. It is a WordPress site. Build a modern,
GitHub Pages–ready version of it, a demo that looks designed rather than templated, using the same content
and the same imagery. You may use sub-agents to parallelise the work.

Two hard rules from the start:

1. **Use the foundation's own images everywhere.** No stock photos, no generated art, no substitutes. The
   hero must be `https://bodhinature.com/wp-content/uploads/2022/06/Bodhi-Nature-Meditation-Courses.jpg`.
   Everywhere else, use the images that the corresponding page on the original site uses.
2. **If you cannot find an image through the API, go and get it another way**: crawl the rendered HTML,
   read the sitemap, walk the uploads directory. Do not leave a page without its pictures.

## 1. Harvest the entire site before designing anything

The site runs WordPress 7.1.4, the Divi builder, WooCommerce 11.2.1 and GiveWP 4.19.1. The REST API is
open to anonymous requests. Use it, then go beyond it.

**REST endpoints to pull** (paginate with `per_page=100`, read `X-WP-TotalPages`, retry on 5xx with a long
timeout; the pages endpoint alone returns 5 MB with `_embed=1` and takes ~19 seconds):

`/wp-json/` (index, 1099 routes), `/wp/v2/pages` (52), `/wp/v2/posts` (4), `/wp/v2/media` (811),
`/wp/v2/categories`, `/wp/v2/tags`, `/wp/v2/users`, `/wp/v2/give_forms`, `/wp/v2/dlm_download`,
`/wp/v2/comments`, `/wc/store/v1/products`.

**Then crawl.** Fetch all 105 URLs from `sitemap.xml` and its 9 child sitemaps, save the HTML, and extract
every image reference: `<img src>`, `srcset`, `data-src`, inline `style` background-images and `<link>` tags.
This is how you find the things the media library does not expose: the **22 Smart Slider cache images**
behind the homepage slideshow, and theme/plugin assets. Download all of them.

**Known access limits, so you don't waste time:**
- `/wp/v2/menus`, `/wp/v2/menu-items` and `/wp/v2/settings` return **401** anonymously. Rebuild navigation
  from the rendered `<ul id="menu-…">` markup instead.
- 6 media records of the reported 817 are filtered out of the public collection. Everything the API does
  return must end up on disk, including the non-image uploads (`recite.zip`, `SINGAPORE.zip`, a 32 MB `.mov`).
- Divi renders real HTML into `content.rendered`, except two pages (`top-course`, and the
  `weekend-retreat` post) which come back as raw shortcodes. Handle those by hand.

Write a `DATA.md` recording counts, method and gaps.

## 2. Turn Divi into content

Parse each page's HTML into an **ordered block list**: h1–h6, paragraphs, lists, quotes, images, buttons.
Drop anything inside `nav`/`footer`/`header`/`form`. Unescape entities, collapse whitespace, and
**deduplicate**: Divi repeats whole sections, so the same heading often appears twice on one page.

Strip the boilerplate footer block (email, three cities, twelve connection points) that every page carries,
and rebuild it once as global data.

Then re-edit the prose into a structured content model: programmes, teachers, testimonials, quotes,
schedule, branches, volunteer roles, donation methods, events. Do not dump pages; write the site's copy.

## 3. Imagery, the part most rebuilds get wrong

- **Hero:** the golden-Buddha forest banner named above. It is 2000×715 and centred on the figure, so a
  full-bleed background with text over it ruins it. Give it its own panel: a gilded temple arch on the
  right, type on parchment at the left.
- **Programme cards:** their five illustrated icons (reading monk, flower figure, Tai Chi pair, hospice
  house, fish spiral). They are 1080×1080 transparent PNGs. Keep the alpha and place them on a tinted tile.
- **Branches:** their illustrated country-map banners. Thailand, Malaysia, Sweden and France have no banner, so use a
  mandala-and-lotus tile rather than a borrowed photo.
- **Events:** their posters where they exist. Where you are given a photo, crop the phone watermark off the
  bottom and reframe to the card ratio.
- **Favicon:** `https://bodhinature.com/favicon.ico`, a 32×32 pixel-art bodhi tree. Ship it byte for byte
  (verify the SHA), plus nearest-neighbour 180/192/512 PNGs so it stays crisp.
- **Processing:** WebP at 480/900/1600 (the header logo 180/360), per-slot width caps so a 250 px card does
  not ship a 1600 px file, `srcset` + `sizes`, and `loading="lazy"` except the hero. `bodhisattva.png` ships
  with a baked-in white background, so flood-fill it to transparent from the border and it floats on the page.

## 4. Design language

Buddhist, but restrained. Not a temple clip-art page.

- **Palette:** parchment `#F6EFDF`, ink `#1B1410`, saffron `#BF6A1E`, maroon `#3A0C16`, gold `#D9AB54`,
  jade `#26443A`.
- **Type:** Fraunces for display, Inter for text, both self-hosted (latin subsets, preloaded). Chinese gets
  a Songti/Source Han serif for headings and PingFang for body.
- **Bands:** dark sections are robe maroon with gold numerals and a 1px gilded rule on the top edge. One
  jade band carries the numbers. The retreat band is a *light* blush `#F2E3D2` with ink text, not another
  dark block.
- **Ornament:** a five-colour prayer-flag strip along the top of the page; a lotus divider between major
  sections; a low-opacity mandala etched into the maroon bands and the hero corner. All inline SVG, no
  ornament images.
- **Hero:** the image masked into a 46%/20% elliptical arch with a 1px gold outline offset behind it.
- **Motion:** fade-and-rise on scroll, slow brightness drift on the hero, a marquee of programme and city
  names. Everything off under `prefers-reduced-motion`.
- **No cards-with-shadows look.** Hairline rules, generous space, big serif type, photography over graphics.

## 5. Pages and the exact home order

15 routes in each language: home, about, programmes index, five programme pages, wisdom, community, events,
volunteer, donate, visit/contact, 404.

Home, in this order:

1. Hero
2. Marquee (programmes + cities)
3. Intro: "An old path, walked together"
4. **What we offer**: five programmes as an editorial index with hover peeks
5. **What's on**: two event cards
6. **Weekend Retreat**: light band with practice chips and the daily schedule
7. **100+ dharma talks a year**: jade band of four numbers
8. **Volunteer**: cream callout with a saffron spine and a clear "Volunteer with us" button
9. **What we stand for**: three commitments with images
10. **Wisdom words**: quote rotator
11. **What changed**: testimonial rail with portraits
12. **Support**: donation band
13. Footer: brand, Explore, Contact, Branches (9), "All locations, worldwide"

Content to carry across: 5 programmes (Dharma Study, Mindfulness, Tai Chi & Movement, Hospice Care,
Happiness & Freedom), 14 wisdom sayings, 9 branches (Canada, United States, Australia, Japan, Singapore,
Thailand, Malaysia, Sweden, France), 5 testimonials with names and roles, the daily schedule
(06:00 prostration & meditation, 08:45 morning class, 14:30 afternoon class, 17:00 prostration,
19:00 evening class), the four-language book covers on the Happiness page, PayPal + both QR codes on donate,
their CONTACT US banner and whale-earth illustration on the contact page.

Events: **Walk for Peace** (Sunday 15 November, New York City, photo supplied, no start time, so omit the
time row) and **Online Meditation Centre** (Sat/Sun, 07:00 CET / 06:00 UK, 1.5–2 hours, four themes).

## 6. Two languages, properly

English at `/`, Simplified Chinese at `/zh/`, with a globe button in the header that swaps to the same page
(the hash preserved). Reciprocal `hreflang`, per-language search index, `<html lang>`.

**The Chinese must be written, not translated.** Word-for-word renders read wrong to a native ear. Examples
of the standard expected:

| English | Bad | Good |
|---|---|---|
| Peace · Freedom · Truth | 和平 · 自由 · 真理 | 安乐 · 自在 · 真谛 |
| The path: learn, reflect, practise | 学习 · 反思 · 实践 | 闻 · 思 · 修 |
| Oneness | 一体 | 同体 (同体大悲) |
| Donate | 捐赠 | 护持 |
| What changed (testimonials) | 有什么改变了 | 学员心得 |
| Volunteer | 志愿者 | 义工 |

Typography: no synthetic italics on CJK, accent words take the saffron colour instead. Set
`line-break: strict` and avoid em-dashes that orphan a character on wrap.

## 7. Technical constraints

- **Astro 5**, static output. Pin below Astro 7 if the machine runs Node 22.23.2, since Astro 7 needs 22.23.4.
- `base: /bodhinature/`, overridable with `BASE_PATH`; `SITE_URL` for canonicals and the sitemap.
- GitHub Actions workflow that builds on push to `main` and deploys to Pages, deriving `BASE_PATH` from the
  repo name.
- **No client framework.** The only JS: header state, mobile drawer, search palette, quote rotator. Target
  ~3 KB inline per page, zero JS bundles.
- **Search:** ⌘K command palette over a JSON index built at build time. No service, no key.
- **Structure:** one view component per page taking a `lang` prop; routes are three-line wrappers, so the
  markup exists once and the two languages diverge only in content.
- Content in dictionaries: `src/i18n/en.ts` and `zh.ts` for interface copy, `src/data/*.ts` and
  `src/i18n/zh-data.ts` for collections.
- Ship `.nojekyll`, `robots.txt` and a sitemap that lists both language trees.

## 8. Quality bar

- Every route returns 200 in both languages, with no console errors and no broken internal links. Check
  them programmatically, not by eye.
- Home page transfers under 1 MB; whole build under 8 MB.
- Screenshot at 1440, 1180, 900 and 390 px and fix what breaks. Things that will break: the stats strip at
  4 columns on mobile, the header when the logo and the language toggle are added, the hero arch when it
  stacks.
- Do not invent facts. If a date, time, address or phone number is unknown, omit the row or write "to be
  announced" rather than filling the gap with something plausible.
- Document honestly: `README.md` for how to run and deploy, `DATA.md` for what was harvested and what
  could not be.

## 9. Pitfalls, check these early

- `_embed=1` with a malformed query string fails silently as an empty list. Test one URL by hand first.
- The media library is not the full image set. The homepage slider lives in
  `wp-content/uploads/slider/cache/…` and only shows up in rendered HTML.
- Divi duplicates sections; without deduplication the page copy triples.
- A CSS custom property referencing itself (`--x: var(--x)`) makes the declaration invalid and renders
  nothing. Silent again.
- Astro's preview server reads `allowedHosts` from `server`, **not** `preview`. Without it Vite answers
  403 to every request that arrives by hostname, even though the IP works.
- A 32×32 favicon upscaled with smooth resampling turns to mush. Use nearest-neighbour.
- Chinese text needs its own line-height (1.7–1.8) and font stack; the Latin serif falls back to a sans
  with no warning.
