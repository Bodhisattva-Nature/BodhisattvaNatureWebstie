# Repository review protocol

## Chinese and Buddhist review gate

Do not launch the dedicated Chinese-language and Buddhist-studies reviewer automatically. Run this review only when the user explicitly asks for it. When invoked, it applies to minor copy edits as well as new pages, navigation and layout changes, and must happen before the change is committed or pushed.

The reviewer checks the full diff against the base commit, not only the rendered page:

- Simplified Chinese grammar, punctuation, line breaks and mainland Chinese conventions.
- Buddhist terminology, names and honorifics; 汉传/藏传 usage must match the site’s existing glossary.
- Consistency with the foundation’s established Chinese name, 大同之光, and its terminology.
- English/Chinese parity where both editions exist; no invented teachings, dates, links, QR codes or registration details.
- Header, navigation, footer and page copy in context, including mobile widths.
- Every new or changed route, link, fragment and language alternate.
- A production build and the site’s link check.

The reviewer reports findings by severity with file, line and exact suggested wording. Do not commit a change with unresolved critical or major findings.
