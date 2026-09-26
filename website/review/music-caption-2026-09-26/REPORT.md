# Music corner: caption, spacing and future editing

2026-09-26. Local generated site, not deployed. About personal prose and release order are unchanged.

## Changes

- One compact caption is anchored above the selected sleeve, with title, artist/year, selected album track when supplied, and an explicit Apple Music link. Removed the old detached paragraph below the shelf.
- The six covers remain a continuous overlapping shelf and spread on hover/focus. Its line fits the actual stack rather than keeping a 660px empty tail when collapsed.
- Cover buttons select on mouse movement, keyboard focus or tap. Arrow keys/Home/End move between covers; touch selection stays on the page. The external source action is a separate native link.
- A real-motion check caught selection changing when expanding covers moved under a stationary mouse. Selection now follows actual pointer movement; caption position still follows the animation.
- Caption space is reserved once above the shelf, so switching between two and three lines does not move the next section. It is bottom-aligned near the cover. Removed obsolete bottom-caption spacing. The next section retains sole ownership of the following margin.

## Actual spacing

Light theme, normal 13px root, selected 《夢想家》 with its third line 〈回留〉:

| Width | Heading bottom → caption top | Caption bottom → selected cover | Shelf bottom → next divider |
| --- | --- | --- | --- |
| 320px | 11.70px | 12px | 36px |
| 390px | 11.70px | 12px | 36px |
| 1440px | 11.70px | 12px | 44px |

The latter includes 4px scroller padding and the next section's 32/40px margin. Music section height remains unchanged during selection: 267.09px mobile / 281.09px desktop at normal text size. Shorter captions occupy less of the reserved area above but retain the same distance to the cover.

## Verification

- Build and static check: 126 pages, 1482 local references, no failures; all three original PDFs remain byte-identical.
- `verification.json`: three languages × 320/390/1440px × six records = 54 selection states, dark theme and A+. Caption text/link matched the selected record, stayed within the stage and above the cover; no page overflow or script errors. End-key selection passed.
- `interactions.json`: light theme, normal text and normal animation at 320/390/1440px. Real touch selection on mobile, mouse hover on desktop, scroll-out hides caption / scroll-back restores it, constant section height, and navigation away/back followed by selection passed. Mobile navigation used the real menu.
- Inspected desktop and narrow screenshots in both themes, including the three-line album/track caption. These are browser checks, not physical-device testing or subjective user acceptance.
- Collection helper checked against storefront duplicates, an album-selected track, empty input, incomplete metadata and unavailable play data. Skill frontmatter validation passed.

## Evidence

- [Desktop, collapsed](light-1440-idle.png)
- [Desktop, selected album with track](light-1440-selected.png)
- [320px, selected album](light-320-selected.png)
- [Dark/A+, 390px](tw-390-record-4.png)

## Music workflow

Added the project-local [listening-notes skill](../../skills/listening-notes/SKILL.md), routed from the existing music editing guide, and a deterministic helper that reads the public shelf. [Initial analysis](../../references/listening-analysis.md) contains counts, primary sources, qualified style observations and the boundary for owner-supplied feelings. It is outside public output. Actual listening-history statistics await such records; no feelings or play counts were invented and no background automation was installed.
