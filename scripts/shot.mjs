import puppeteer from "/Users/pavan/temp/bodhinature-modern/site/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js";

const url = process.argv[2] || "http://127.0.0.1:4321/bodhinature/";
const out = process.argv[3] || "/tmp/shot.png";
const width = +(process.argv[4] || 1440);
const full = process.argv[5] !== "viewport";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--hide-scrollbars", "--disable-gpu", "--font-render-hinting=none", "--user-data-dir=/tmp/pptr-profile"],
});
const page = await browser.newPage();
await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

// make everything eager, then walk the page so lazy loads + reveals trigger
await page.evaluate(async () => {
  document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager"));
  document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
  await document.fonts.ready;
  const step = window.innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 90));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 250));
});
await page.evaluate(() => Promise.all(Array.from(document.images).filter((i) => !i.complete).map((i) => new Promise((res) => { i.onload = i.onerror = res; }))));
await new Promise((r) => setTimeout(r, 700));
await page.screenshot({ path: out, fullPage: full });
console.log("saved", out, "height", await page.evaluate(() => document.documentElement.scrollHeight));
await browser.close();
