# Batch exploration QA — 2026-09-15

final result: passed

Scope: three local concept demos, not production acceptance or real-time 3D. Passed means the defined comparison flows and source-scene fidelity checks have no outstanding P0/P1/P2 issues. User aesthetic acceptance remains open.

## Visual truth and captures

- Source scene plates: `assets/bench.jpg`, `assets/drawer.jpg`, `assets/editorial.jpg`; original ImageGen assets and references documented in `../../EXPLORATIONS-DESIGN.md`.
- Implementation: `http://127.0.0.1:8772/explorations/?view={bench|drawer|editorial}#home`.
- Source has no typography. Live introduction, link labels, navigation and interior layouts are intentionally authored UI; they are not claimed as pixel-matched to an absent full UI mockup.
- Final normal viewport screenshots: `../../exploration-review/{bench,drawer,editorial}-home-viewport.png`, with copies under `assets/review-*.png` for the comparison page.
- Combined side-by-side evidence: `../../exploration-review/comparison-top.png` and `comparison-lower.png`, captured from `qa.html`. Both were opened and judged together in the browser.
- Comparison uses a 1280 px wide render, removes the 70 px native header, and compares the same top 650 px of each scene. The images are presented at the same CSS scale. Source bench dimensions are 1487×1058; native display uses approximately the same 1.404 ratio.
- Browser viewport override and full-page screenshot capture had inconsistent scaling after switching tabs. The older `*-home.png` and `source-render-comparison.png` full-page images are NOT valid fidelity evidence; no passing claim relies on them. Normal screenshots show correct scale. Mobile checks explicitly confirm `innerWidth`, not just the requested override value.
- Focused checks: native 1280×720 browser shots were inspected for introduction text, labels and their objects; 390 px screenshots inspected for mobile introduction, notes reading and entry controls. No generated object was replaced by CSS/SVG art.

## Comparison history and fixes

1. First pass: the PDF iframe rendered an empty dark area in the actual in-app browser (P1). Replaced it with 42 page images rendered from the three real PDFs, page selector, bounded previous/next controls and original-PDF links. Verified heatwave page 13 visibly renders and disables next-page control.
2. Found stale/unverified Chinese display-name copy in the draft (P2). Removed it; retained the existing English name rather than guessing Chinese characters.
3. Editorial music label was too far from the MP3 (P2). Moved to the right edge beside the actual player. Rechecked in `comparison-lower.png`.
4. Mobile object links were 41 px high (P2). Minimum height is now 44 px; music button itself has a 44 px target. Editorial mobile name reduced from 54 to 46 px.
5. Mobile interior hid the scene's player control (P1 when music is running). Added a page-header pause control only while playback is active. Verified at actual 390 px: playing after navigation, pause visible, pause action succeeds.
6. Skip link initially conflicted with the hash router (P2). Prevented route navigation and focused the main landmark instead.
7. Homepage bottom repeated collection links rather than adding information (P2). Changed it to a small current note and two specific content records.
8. Final source/render comparison: scene crops, object positions, palette and texture are retained. Native labels occupy small readable surfaces and do not obscure all of an object's identity. Fullpage-capture artifact was excluded and replaced with normalized viewport comparisons.

## Required fidelity surfaces

- Typography: system sans for editable UI, no arbitrary font mixing; desktop body 14–15 px, mobile narrative 15 px, secondary metadata 10–12 px. Name is distinct from reading titles. No hand-lettered font is claimed in this batch.
- Layout rhythm: three home compositions and distinct interior arrangements. Study records first; organisation variant allows multiple opened containers. Long text flows outside perspective imagery. Scene lower portions naturally require scrolling on a short desktop viewport.
- Colors: bench green-grey/rust, drawer charcoal/burgundy, editorial cool white/cobalt. Reader tints match the direction, not random paper overlays. No uncontrolled text blur or texture shader on long reading text.
- Image fidelity: exact generated scene assets in each direction; genuine source logos only in organisation rows. Source diagrams are props explicitly marked as generated, not user research figures. PDF pages are actual rendered documents.
- Copy/content: existing 8 works, 16 unique experiences, 3 study records, 2 draft notes and 4 credentials retained. No material gallery, invented portrait, newly claimed award, or unverified credential badge. Shared internship can be reached through two organisations without becoming two unique experiences.

## Functional evidence

- `node material-demo/exploration-check.mjs`: passed. Verifies counts, organisation relationships, PDF/thumb/logo files, all 42 preview pages, generated scenes, draft labels and no material-gallery route.
- `node --check material-demo/dist/explorations/lab.mjs`: passed.
- In-app browser: bench service filter returns 7 records; drawer has 2 organisations and a record open at once; editorial heatwave search returns 1 result and its inline body expands.
- PDF: visible last page, next button disabled, original PDF links retained. Image preview is explicitly not a selectable-text reader.
- Music: official 29.976961-second preview plays following a click. Replayed and navigated across a route while still playing; paused from the interface. Mobile header pause separately verified. No autoplay.
- 390 px: home, background, works and note routes in all three variants have document width 390; English drawer background also width 390.
- Final 360/540/768 px checks on all three background layouts: actual inner widths equal requested widths and no horizontal overflow.
- Browser error log in the exercised final flows: empty. Earlier timed-out pause test occurred after the preview had naturally ended; rerun confirmed navigation/play/pause behavior.

## Remaining boundaries / P3 and direction questions

- Scene hotspots are labels over an image, not separately modelled movable objects. The visual depth is photographic; no claim of physical simulation.
- Mobile retains the same picture but moves labels below it; a future object-based scene would need an authored mobile composition.
- Drawer aesthetic is arguably too nostalgic. Bench inner pages are intentionally plainer than the scene. Editorial navigation is efficient but less immersive. These are comparison variables for user evaluation, not objective bugs that more polish can automatically resolve.
- Search/expanded states are not restored after every navigation; production history/state retention is out of this batch.
- Dark theme, font-size preferences and final hand-written/material typography are not part of this concept comparison build.

## Handoff checklist

- [x] Three independent scenes, shared factual data, distinct navigation/reading tests.
- [x] Existing table/desk demos left untouched.
- [x] Actual browser interaction and responsive checks.
- [x] Source/render comparisons normalized and visually inspected.
- [x] Local comparison page ready; no external deployment.
