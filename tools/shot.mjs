import { createRequire } from "node:module";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const require = createRequire(new URL("../site/package.json", import.meta.url));
const puppeteer = require("puppeteer-core");

const url = process.argv[2] || "http://127.0.0.1:4321/bodhinature/";
const out = process.argv[3] || join(tmpdir(), "bodhinature-shot.png");
const width = Number(process.argv[4] || 1440);
const full = process.argv[5] !== "viewport";

const chromeCandidates = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter((candidate) => Boolean(candidate));

const executablePath = chromeCandidates.find((candidate) => existsSync(candidate));
if (!executablePath) {
  console.error(
    "Chrome was not found. Set CHROME_PATH to a Chrome or Chromium executable and try again."
  );
  process.exit(1);
}

const profile = mkdtempSync(join(tmpdir(), "bodhinature-pptr-"));
let browser;

try {
  browser = await puppeteer.launch({
    executablePath,
    headless: "new",
    args: [
      "--hide-scrollbars",
      "--disable-gpu",
      "--font-render-hinting=none",
      `--user-data-dir=${profile}`,
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

  // Make everything eager, then walk the page so lazy loads and reveals trigger.
  await page.evaluate(async () => {
    document.querySelectorAll("img[loading=lazy]").forEach((image) => {
      image.loading = "eager";
    });
    document.querySelectorAll("[data-reveal]").forEach((element) => {
      element.classList.add("is-in");
    });
    await document.fonts.ready;
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 90));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 250));
  });

  await page.evaluate(() =>
    Promise.all(
      Array.from(document.images)
        .filter((image) => !image.complete)
        .map(
          (image) =>
            new Promise((resolve) => {
              image.onload = image.onerror = resolve;
            })
        )
    )
  );

  await new Promise((resolve) => setTimeout(resolve, 700));
  await page.screenshot({ path: out, fullPage: full });
  console.log("saved", out, "height", await page.evaluate(() => document.documentElement.scrollHeight));
} finally {
  if (browser) await browser.close();
  rmSync(profile, { recursive: true, force: true });
}
