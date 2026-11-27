# Repository instructions

Applies to every branch and every agent working in this repository (Codex, Claude Code, Cursor, and anything
else that reads `AGENTS.md`). Read it before changing anything.

This is the only agent-instruction file. Change it by pull request like code; do not fork a copy per branch and
do not keep a second one under another name (`CLAUDE.md` should be a symlink to this file if it exists at all).

## Environment

- Node 22.23.x, npm 10. Astro 5 is pinned deliberately; Astro 7 requires Node 22.23.4 and is not in use.
- Every command runs from `site/`. There is no root `package.json`.
- `npm run dev` serves <http://localhost:4321/bodhinature/> (English) and `/zh/` (Chinese). The dev server
  binds `::1`, so use `localhost`, never `127.0.0.1`.
- `BASE_PATH` defaults to `/bodhinature/`. A build opened at `/` 404s its own assets.

## Definition of done

Before committing anything that touches `site/`:

```bash
cd site
npm ci
npm run check:paths   # no absolute paths, home directories or machine hostnames
npm run build
npm run check:site    # links, fragments, hreflang pairs, size budgets
```

- A failure that predates your change is reported in the commit or PR body. Never disable a check, lower its
  threshold, delete an assertion or skip a file to get green.
- `check:site` fails when page weight passes 13 MB; about 11 MB of that is the media library. When it trips,
  trim image derivatives or ask — do not raise the ceiling on your own.

## Portability

Anything committed has to run on someone else's machine.

- No absolute paths that name a home directory, a mounted volume or a temp directory, and no machine
  hostnames, in code, scripts or docs. Windows drive paths are rejected the same way.
- `tools/shot.mjs` locates Chrome itself; set `CHROME_PATH` when it cannot.
- LAN previews take `ALLOWED_HOSTS=name.local,...`; never hardcode a host.
- `npm run check:paths` enforces the path half of this and runs in CI.

## Branches, commits and review

- `main` deploys; `new-york` is the integration branch. Push to neither of them: work on your own branch
  (`new-york-2`, `fix/...`) and open a pull request into `new-york`.
- `origin/new-york` moves several times a day. `git fetch && git rebase origin/new-york` before starting work,
  not after finishing.
- No force-pushes to branches you did not create. No unrelated reformatting inside a copy change.
- `.github/workflows/check.yml` runs the checks above on every push and pull request. A red run is a blocker,
  not a suggestion.

## Content integrity

Every sentence is the foundation's, not yours.

- Never invent teachings, dates, phone numbers, addresses, links, QR codes, registration details or prices.
- Chinese is written, not machine-translated: 安乐 · 自在 · 真谛, 汉传 convention, consistent with the
  foundation's established name 大同之光.
- Keep the editions in parity: a new route, link or section exists in both languages, or in neither.

## Chinese and Buddhist review gate

Do not launch the dedicated Chinese/Buddhist reviewer on your own. It is opt-in; the user triggers it. It is
required before merge for any change to Chinese copy, Buddhist terminology, navigation or layout, including
minor copy edits.

- If it was not run, say so plainly in the pull request ("Chinese review not run"). Never describe a change as
  reviewed when it was not.
- When run, it reviews the full diff against the base commit, not only the rendered page: Simplified Chinese
  grammar, punctuation and mainland conventions; Buddhist terminology, names and honorifics; 汉传/藏传 usage
  against the site glossary; English/Chinese parity; and every new route, link, fragment and hreflang
  alternate, at desktop and mobile widths.
- Findings come back by severity with file, line and exact suggested wording. No critical or major finding
  lands unresolved.

## Secrets

Tokens stay in the OS keychain or CI secrets. Never commit a `.env`, paste a token into a file, or put one in
a URL.

_Last verified 2026-11-27 against `d52a0e3`._
