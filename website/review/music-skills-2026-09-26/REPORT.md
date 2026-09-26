# Music collection note and skills workbench

2026-09-26. Local preview only.

## Implemented

- Removed the selected-track field for 回留 / Revisited. The shelf retains the 梦想家 / The Dreamer album entry.
- Added a small collection note between the shelf and chair on wide screens; it moves beneath the shelf on narrow screens. It shows unique release count, artist count, albums/singles and explicitly labelled release-year span, calculated at build time.
- Moved the shared counting function to `website/listening-summary.mjs`. The public renderer and project skill CLI reuse it, avoiding independently maintained totals.
- Workbench tabs now show Code & tools, Research & writing, and Design & collaboration. Each contains three concrete skills/methods with short usage descriptions, sourced from the existing public work/experience records. Removed the project-summary paragraphs, repeated category heading and fake file path. No proficiency scores were added.

## Verification

`verification.json`: three languages × 320/390/1024/1440px × light/normal and dark/large text = 24 browser cases. All three tabs, keyboard tab switching and all six album captions checked in each case. No document overflow, music-note/shelf collision, caption/heading collision or page script errors. No selected-track text remains visible. Public count text contains six records and four artists.

Inspected desktop and phone screenshots of the workbench and music section. Build/check: 126 pages, 1482 local references, zero failures, three unchanged original PDFs. `git diff --check` passed.

## Pending owner discussion

About prose and its personal drawings are unchanged. The owner requested understanding their past conversations and lived contexts before another draft. The proposed conversational draft was rejected as still too arranged. Do not publish it or generate a lonely-person illustration as a settled representation of the owner; meaning, wording and illustration need further calibration.
