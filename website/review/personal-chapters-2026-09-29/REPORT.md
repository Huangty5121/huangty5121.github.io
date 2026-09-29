# Personal chapters — local preview, 29 September 2026

Implemented in `website/`, built to `material-demo/dist/site/`. Preview is running at `http://127.0.0.1:4173/`. No commit, push or deployment was performed.

## Current result

- Home: identity introduction directly after the harbour photograph, followed by the owner's unchanged five-paragraph note.
- About: unchanged Astra/GLM impressions in a synchronized chat/model reader, followed by listening, the illustrated six-glass cabinet, individual city/region pins and collapsible tools.
- Experience: all original full education, experience, honours, credential and review records on their own page, with compatibility for previous links.
- Cabinet: transparent artwork, not labelled action cards; cups reduced to 86% of their column width with optical centering measured from their opaque bounds. Only names appear below the glasses. Recipes remain in the drawer. No favourite whisky bottle or personal variation was invented.
- Map: twelve individual pins, no aggregation markers, venue-address points or invented routes. The UK and Fujian remain country/province entries. Hong Kong growth, Beijing exchange and Beijing's two named bars follow the owner's messages; unspecified memories are brief unfinished entries.

## Verification

`node website/build.mjs`, `node website/check.mjs` and `git diff --check` pass. Static check covers 126 HTML files and 1,716 local references; all three PDFs are byte-identical to their original files. `about-content.mjs` and `content.mjs` have no changes.

Browser checks in `browser-check.json` verify both impressions and the self-note against their source strings, synchronized tab/select/keyboard behavior and reading-position restoration, all six drawers and Escape/focus return, twelve independent pins, city/event selection and reset, moved record bookmarks, reduced motion, and map-tile failure fallback. Home/About/Experience fit 1440, 390 and 320 px in zh/en/tw with dark theme and A+ (27 layouts). No JavaScript page errors were observed.

A final scoped visual pass checks the revised shelf at desktop and mobile, drawer positions after animations finish, and layout fit at 320, 390, 768 and 1440 px. Desktop drawer is 470 px wide at the right edge; mobile drawer occupies the bottom 85% of the viewport. Final cabinet screenshots supersede the earlier full-page shelf spacing.

Latest visual evidence: `cabinet-desktop.png`, `cabinet-mobile-dark.png`, `recipe-drawer-desktop.png`, `zh-drawer-390-dark.png`, and `zh-map-390-dark.png`. The initial English and Traditional Chinese map/drawer images captured motion in progress; functional checks pass, but those interim images are not evidence of the settled visual state.

## Content still open

The owner's peaty Manhattan / Absinthe Martini proportions, whisky choices, place photographs and additional memory fragments remain unprovided. The four other cocktails explicitly show sourced reference recipes. Generated glasses are editorial illustrations and can later be replaced with illustrations based on the owner's photographs.
