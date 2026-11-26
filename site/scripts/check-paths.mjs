import { readdirSync, readFileSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const self = fileURLToPath(import.meta.url);
const skipDirs = new Set([
  ".git",
  ".venv",
  ".astro",
  "node_modules",
  "dist",
  "api",
  "media",
  "content",
  "raw",
  "backups",
  "review",
  "deliverables",
  "deck-build",
]);
const textExtensions = new Set([
  ".md",
  ".mjs",
  ".js",
  ".ts",
  ".astro",
  ".py",
  ".yml",
  ".yaml",
  ".json",
  ".csv",
  ".txt",
  ".css",
  ".html",
  ".sh",
  ".ps1",
]);

const rules = [
  ["macOS user path", /(?:^|[\s"'`(=])\/Users\/[^\s"'`)]+/],
  ["Unix home path", /(?:^|[\s"'`(=])\/home\/[^\s"'`)]+/],
  ["Unix temp path", /(?:^|[\s"'`(=])\/tmp\/[^\s"'`)]+/],
  ["mounted volume path", /(?:^|[\s"'`(=])\/(?:Volumes|private|mnt)\/[^\s"'`)]+/],
  ["macOS Applications path", /\/Applications\/(?!Google Chrome\.app\/Contents\/MacOS\/Google Chrome)[^\s"'`)]+/],
  ["Windows user path", /\b[A-Za-z]:[\\/]Users[\\/][^\s"'`)]+/i],
  ["personal path", /\bpavan\b/i],
  ["machine hostname", /\bAir-2(?:\.local)?\b/i],
  ["private LAN IP", /\b(?:10\.\d{1,3}|192\.168|172\.(?:1[6-9]|2\d|3[01]))\.\d{1,3}\.\d{1,3}\b/],
  ["file URL", /\bfile:\/\//i],
  ["absolute node_modules import", /(?:from|import)\s*\(?["'`]\/[^"'`]*node_modules/],
];

const findings = [];
let scanned = 0;

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!skipDirs.has(entry.name)) walk(join(directory, entry.name));
      continue;
    }

    const path = join(directory, entry.name);
    if (path === self || !textExtensions.has(extname(entry.name).toLowerCase())) continue;

    scanned += 1;
    const lines = readFileSync(path, "utf8").split(/\r?\n/);
    for (const [index, line] of lines.entries()) {
      for (const [name, pattern] of rules) {
        if (pattern.test(line)) {
          findings.push({
            path: relative(root, path).replaceAll("\\", "/"),
            line: index + 1,
            name,
            text: line.trim(),
          });
        }
      }
    }
  }
}

walk(root);

if (findings.length > 0) {
  for (const finding of findings) {
    console.error(`${finding.path}:${finding.line}: ${finding.name}`);
    console.error(`  ${finding.text}`);
  }
  console.error(`\n${findings.length} machine-specific path(s) found.`);
  process.exit(1);
}

console.log(`path check: clean (${scanned} text files scanned)`);
