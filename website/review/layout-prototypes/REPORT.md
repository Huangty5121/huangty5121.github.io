# Layout prototypes — 8 October 2026

## Delivered

- Three independently selectable Experience variants in Simplified Chinese, Traditional Chinese and English.
- A shared-layout preview of the six main pages and existing article, project, publication, PDF-reader and card routes.
- Entry point: `http://127.0.0.1:4180/preview.html`.
- Source and reproduction instructions: `website/prototypes/README.md`.
- No production template, stylesheet, content record or generated production page was replaced during this prototype implementation. Existing uncommitted site work predates this prototype delivery.

The latest owner correction is implemented: **institutions lead every experience record**, with roles, topics and supervisors visible without disclosure. All variants use one renderer, identical records and reverse start-date ordering. Six current appointments remain visible. Nine research/internship/programme records and eight service records are individually visible; peer review, education, seven honours/scholarships and three credentials remain separate factual categories. All record rows share 12px vertical padding and common logo/title alignment and supporting dates. Missing portraits are explicitly labelled placeholders.

## Verified

`node website/prototypes/build.mjs` completed successfully and checked the generated production-file fingerprints before and after the build.

Browser verification completed with **156 cases and zero failures**:

- 90 Experience cases: three variants × three locales × five widths (320, 390, 768, 1440, 1920px) × normal/light and large/dark.
- 66 shared-page cases: eleven routes × three locales × desktop/mobile.
- Assertions cover overflow, header collisions, local resource failures, visible record/current-role counts, institution titles, visible supervisors, chronology, aligned record starts, consistent row padding, and no added motion in Experience controls.
- Two disclosures can remain open together without overflow. Keyboard disclosure and workspace controls, workspace behavior after soft navigation, variant-preserving language changes, old record URLs and the former About skills link passed.
- About's impression switcher and drinks drawer passed their interaction checks. Home's personal prose and both About impressions match their baseline text in all three locales.

A final shared-CSS correction confines the 32px gutter to 701–900px and uses the existing menu on tablet widths. **27 additional English/A+ boundary cases passed**, using Experience A, About and Work at 600, 650, 700, 701, 768, 900, 901, 1100 and 1101px. Observed gutters are 20px up to 700px, 32px through 900px and 48px above. No overflow or header-control collision was found. Final availability checks returned HTTP 200 for the comparison page, all three variants and About.

Manual screenshot review covered the three desktop openings, the institution-first research list, the mobile profile, narrow English/dark/large text, Home and About. JavaScript syntax checks and `git diff --check` passed.

## Evidence and limits

- `verification.json`: full browser measurements.
- `breakpoints.json`: final responsive-boundary checks.
- `preview-availability.json`: final preview URLs.
- `screenshots/`: desktop/mobile/English-large captures, comparison page and institution-first record section.
- `baseline-hashes.json`: production-file baseline.

The compact revision replaces the four-column records with one connected reading block. Institution and role share the first line; topic, supervisor, result link and disclosure share the next line when space permits. Only section boundaries retain rules. Short ledgers use inline title/context instead of separate columns. Capability A uses three compact labelled rows. Current appointments sit beside the desktop profile and stack at narrow widths.

The 156-case suite passed during this revision. After the final inline metadata adjustment, five additional rendered checks passed at 320, 390, 768, 1440 and 1920px, including English large text, record/current-role completeness and keyboard disclosure. Final Traditional Chinese A heights are 3053px at 1440px and 4874px at 390px. These are measurements, not a claim of user acceptance. Desktop research records and desktop/mobile/English-large openings were visually inspected.

External source availability, audio-provider delivery, PDF-internal interactions and a production deployment are outside these checks. The portrait and choice of A/B/C remain the owner-facing next decisions; integration into the formal website has intentionally not occurred.

## Reading-order correction

Dates now follow institution/role rather than sitting at the far page edge. Representative result links share the heading line; topic and Supervisor remain on the following line. Mobile portrait and name share a row, while qualifications retain the full available width. Ledger links follow their related text. The 156-case suite passed after the profile and record changes; the final ledger-link adjustment was additionally inspected in a rendered lower-page screenshot. Desktop research, mobile opening, English enlarged opening and dark/enlarged expanded content were visually reviewed. Production remains unchanged.
