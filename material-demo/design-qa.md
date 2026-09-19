# Desk demo — current design and interaction QA

Current status: targeted design corrections implemented; content, credential evidence, and final material assets remain incomplete. Functional test results below are NOT a blanket design approval.

## Independent review and iteration — 2026-09-14

See `DESIGN-REVIEW-2026-09-14.md` for current screenshots, reasoning and remaining issues. This review supersedes the earlier claims below that there were no actionable design issues.

- Fixed evidenced source/context separation: at 390 × 900, selecting PolyU formerly scrolled 769px and hid the source badge. The panel now follows the selected grid row; the final same-scenario capture has no additional scroll and shows source plus record heading.
- Current study leads; other study records use a named disclosure. Opening survives language/filter rerender. This is not deleting exchange or incomplete-study history.
- Added a page-level text index, reflowed into ordinary content on mobile, and moved record filters into the record area. Credential jump opens the actual disclosure and focuses its summary.
- Split memberships from professional certification and explicitly left public evidence unset. No institutional logo or generic issuer page is treated as identity verification.
- Added one generated paper folder to the existing home experience link. Source pins, typography, grain/ink preferences, inline player and original `home.*` demo remain unchanged. Folder is true-alpha PNG, not CSS artwork or a checkerboard imitation.
- Fresh targeted checks: `desk-audit-check.mjs` passes 12 checks; `desk-organisations-check.mjs` passes 19; `validate-desk.mjs` passes 158 assertions. Paired `final/home-comparison.png` and `final/selection-comparison.png` opened and inspected, plus revised mobile/dark/large snapshots.
- A full regression run initially timed out loading the external preview. A standalone fresh browser subsequently played it, and a retry confirmed the 29.976961-second preview plays/pauses across navigation. The next test exposed an outdated expectation that hidden study details yield visible innerText; updated the test to open the actual study disclosure. Final complete `desk-browser-check.mjs` run passed all 20 checks, including actual preview play/pause, retry after a deliberately failed request, PDF navigation, search, and 360–1672px route checks. No playback test was skipped or replaced with simulated audio.
- Still open: homepage content mostly concerns making this site; several experience details are skeletal; public credential evidence missing; mixed source/generated mark finishes. No user-study, independent credential validation or real Safari/foldable QA claim.

## Latest organisation/current-role extension — 2026-09-12

The sections below this extension retain the prior desk/player QA history. The current background page now defaults to organisations rather than a flat experience list.

- Latest implementation: `desk-organisations-review/1672-overview.png`, 1672 × 2144 pixels; CSS viewport 1672 × 941, density 1. Previous visual baseline: `desk-review/wide-experiences.png`, captured at 1672px CSS width. `desk-organisations-review/before-and-after.png` compares their first 941 pixels together at the same width. The user explicitly requested the different content order, so this is an evolution, not a pixel clone.
- Focused evidence: `desk-organisations-review/focused-comparison.png` for typography, marks and spacing. Also opened full mobile organisation view, expanded PolyU records, and English/dark/130% view. Hover/focus labels and their non-shifting geometry were checked in the browser.
- Source facts: user-supplied `huang_tin_yeh_master_cv_rebuilt.pdf`, text read and page 3 rendered/opened. Government and student roles are represented by their specific CV titles. Current summaries are explicitly CV-declared terms, not independently verified employment or appointments. No private contact details imported.
- Current model: 12 unique organisations and 16 canonical experience/service records. Current-role IDs reference five of those records; education references the existing three study entries. Joint hosts share one internship record. Reviewing is a service record, not an employer; memberships/certification remain separate.
- Interactions: organisation hover and keyboard focus reveal names, activation expands grouped records, Escape/Close restores source-button focus. Touch names are visible by default. Multi-category filters operate on shared records; university views can include study, office work and student representation together.
- Five fidelity surfaces: (1) existing WenKai/Caveat and body fonts retained; small labels checked at 130%; (2) education → current involvement → organisation/record browsing, with no overlapping grid entries; (3) existing warm/dark tokens retained; low-contrast source marks in dark mode received a restrained brightness/edge lift; (4) real logo files/two generated pins preserved, four missing-badge organisations use explicit text entries, no fabricated seals; (5) role-specific wording avoids presenting every affiliation as employment.
- [P2 fixed] Dark source marks, especially the dark Royal Plaza monogram, were hard to distinguish from the tabletop. Added a dark-theme-only contrast treatment to the existing source images, then reran screenshots and responsive checks. This is not a new metallic asset.
- [Evidence correction] An early full-page capture raced pending scroll restoration, showing a displaced skip link. Waiting for render/scroll frames before capture removed the artefact; the actual keyboard skip link remains intact. Revised 390px capture opened.
- Fresh verification: `validate-desk.mjs` passed 158 assertions; `desk-browser-check.mjs` passed 20 checks; `desk-organisations-check.mjs` passed 19 checks. No uncaught errors or failed production asset requests. Organisation filters tested at 360, 390, 540, 650, 768, 1024 and 1672px, plus touch and English/dark/130%. Music and PDF regression checks still pass.
- No remaining actionable P0/P1/P2 issues in this local structural demo scope. Remaining limitations: four missing finished badges, provisional multi-angle modeling, CV/user approval of role terms, and no real Safari/iOS/foldable hardware test. No publication or external account connection performed.

## Prior desk/player implementation and QA history

Date: 2026-09-12. Scope: local structural demo with introductory copy, education-first background, inline player and provisional pin assets. Not final imagery, validated CV, true 3D, or public release.

## Evidence and comparison conditions

- Source art direction: `../design-directions/08-site-visuals/01-desktop-home.png` (1672 × 941).
- Previous implementation: `desk-review/desktop-home-final.png` (1672 × 976).
- Current implementation: `desk-objects-review/1672-home.png`, CSS viewport 1672 × 941, density 1; full document 1672 × 1621.
- Full-view paired evidence: `desk-objects-review/reference-and-demo.png` and `before-and-after.png`, each 3344 × 941. Comparison takes the first 941 pixels of the current document; no source or implementation rescaling in the saved comparison.
- Focused paired evidence: `desk-objects-review/focused-comparison.png`, 1300 × 360, source left/current right. Opened together for texture, silhouette, contact shadow, type and image treatment.
- State: Chinese, light, hand lettering, vellum, grain 40, ink 68, relief 74, frost 3, 100% text.
- Current desktop/mobile home, education and experience directories, individual experience, tablet and dark/English/130% screenshots were opened. Evidence is in `desk-objects-review/`.
- The source mock contains a material-study composition, not these personal records. The user explicitly requested the introductory text at left, education first, new music device, pins and a longer desk. These content and proportion changes are intentional, not pixel-clone fidelity claims.

## Findings and iteration history

1. [P2, interaction] Pause initially changed the media state before the button's pressed state updated.
   Fixed by synchronously updating the inline player on pause. Actual Apple preview playback, pause and route persistence then passed.
2. [P2, failure state] A failed media request emitted error followed by pause, overwriting the error message.
   Fixed by retaining the media error in event handling and reloading failed media on retry. A deliberately aborted request now keeps a visible error; retry with the real source plays successfully.
3. [P1, hierarchy, user feedback] The material photograph dominated while the owner's identity was only a small name.
   Fixed by placing the name, current studies and brief personal introduction at top-left, moving the material photograph onto the continued desk. No generated or borrowed portrait used. Revised desktop, 390px and 768px captures inspected.
4. [P2, hierarchy, user feedback] Education appeared after the entire experience list.
   Fixed by moving current studies first, then exchange and prior incomplete study, ahead of internships/research/involvement. Separate labels avoid presenting exchange or incomplete study as awarded qualifications. Revised desktop and mobile directories inspected.
5. [P2, spacing] Introductory study text wrapped Product Engineering into an unnecessarily narrow measure.
   Removed the extra width restriction. Revised first viewport and mobile capture inspected; long English and 130% text also tested.
6. [Test adjustment, not product defect] The previous assertion expected three work rows in the initial viewport. Education-first intentionally changes this. The revised test verifies education order, then scrolls to the work list and verifies multiple complete rows together, rather than a carousel.
7. Final paired visual comparison found no remaining actionable P0/P1/P2 issue in the agreed provisional demo scope. Pin polish and a modeled player remain explicitly deferred, not falsely passed as finished assets.

## Required fidelity surfaces

- Typography: existing local WenKai/Caveat and UI fonts retained. Dry-ink texture remains on selected short labels, not whole-page blur. Name is a restrained handwritten heading; body text and controls stay legible. Checked Chinese and English, default and 130%, including player screen clipping.
- Layout: stable authored positions with bounded perspective. Two rendered pins currently on home; configuration accepts up to four. All nine work/participation rows retain their left marks and remain a scrollable list. Education is a separate leading reading group. Narrow devices retain the same physical objects down a longer desk, not a bottom music bar.
- Colours/tokens: existing material settings and warm background retained. Continuous document grain, dark digital surface and physical object colours remain distinct. Shadow direction is consistent enough for 2.5D composition; no dynamic lighting claim.
- Image quality: real institution marks cropped from sources; two generated pin renders and a generated MP3 housing. No custom SVG logo approximations or fake portrait. X checkerboard removed with local cleanup; minor edge roughness remains a deferred polish item. Other marks remain source logos, not finished metal pins. Paper preview is a real PDF first page. See `PIN-ASSETS.md`.
- Copy: brief owner introduction and study facts, not an invented manifesto or emotional autobiography. Material images and edited notes retain provenance. Current, exchange and incomplete education remain distinct. Formal degree nomenclature and all CV facts still require the user's final review.

## Verification

- `node material-demo/validate-desk.mjs`: 137 assertions passed.
- Syntax checks passed for modified modules.
- `node material-demo/desk-browser-check.mjs`: 20 checks passed, zero uncaught page errors, zero failed production asset responses.
- Browser: isolated Chromium 1223 context, no access to user's browser profile.
- Widths: 360, 390, 540, 650, 768, 1024, 1440, 1672 across home, works, experiences, individual experience, note, paper detail, notes and images. No horizontal overflow. Player target and screen text checked at each size.
- Actual official preview: approximately 29.98 seconds, click-to-start, pause/resume, SPA navigation persistence. No external media/PDF request before interaction, no music dialog/upload controls. Failure and real-source retry both tested.
- Education ordering/status, all nine loaded marks, filtering, work search/empty state, related experience → paper detail → local PDF, keyboard focus, material preference inheritance and dark/language/size persistence tested.
- Original `home.html`, `home.css`, `home.mjs`, `home-data.mjs`, `app.js` hashes match the baseline.

## Accepted deferrals and test limits

- User explicitly prioritised placement/shadows and the working demo over pin cutout perfection, metallic gloss or 3D modeling. The current MP3 is an existing older shell tilted as a flat asset; a more modern genuinely oblique housing is not complete.
- No personal portrait selected; the introduction is text-first. It can later take a user-supplied photo without pretending a stock/generated person is the user.
- No real Safari/iOS/foldable hardware testing, complete screen-reader audit, deployment, public music/brand/redistribution permission confirmation or exhaustive research-claim verification.
- Streaming remains externally dependent. No song account linked or full copyrighted track packaged.
- No Three.js or physics library added; no free rotation, draggable physics or live collision system claimed.

## Checklist

- [x] Identify the owner before the objects.
- [x] Put education before experience while distinguishing qualification status.
- [x] Inline configurable music with real playback, pause, failure and retry.
- [x] Pins at left in readable multi-row directories; same objects on a long mobile desk.
- [x] Open combined source/current comparison and focused evidence.
- [x] Preserve original version and preference data.
- [ ] User chooses portrait, confirms copy and approves final asset/model direction.
