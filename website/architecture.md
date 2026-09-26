# Personal site source map and design rules

The published site is generated. Edit `website/`, then run `node website/build.mjs`. The build writes `material-demo/dist/site/` in Simplified Chinese, `en/`, and `tw/`. Do not hand-edit generated HTML, CSS, or JavaScript.

## Where a change belongs

| Concern | Source | Rule |
| --- | --- | --- |
| Page structure, route sections, short interface labels | `views.mjs` | Use the shared page builders and semantic HTML. Keep one visible record set for About experience. |
| About's personal voice, personal reflection, album metadata | `about-content.mjs` | Edit the paired `zh` and `en` values together. Do not put long personal copy back into HTML templates. |
| Verified work and experience descriptions | `content.mjs` over `material-demo/dist/desk-data.mjs` | Keep the public fact boundary and original record identity. |
| Work order and card metadata | `entries.mjs` | Keep Work categories separate from About's personal material. |
| Layout, colours, type, responsive rules | `site.css` | Change shared tokens and component rules rather than appending a page-specific correction to the end. |
| Theme, text-size button, navigation, map, music | `site.mjs` | Reinitialise page-specific behavior in `initialiseView` so same-language navigation works. |
| Language pages, asset copies, redirects, cache keys | `build.mjs` | The `tw` edition is generated from the Chinese render with opencc-js. |
| Links, locale completeness, generated-page integrity | `check.mjs` | Run it after every build. It checks paired data across About, work, experience, News and the essay, unique record IDs, shared type/spacing usage, and the generated heading outline. |

`skills/personal-site-editor/references/site-map.md` records routes and the map's factual boundaries. `design-qa.md` is a dated verification log; an older screenshot result is not evidence for a new layout.

## Shared visual controls

The first `:root` rule in `site.css` is the single typography control. Default root is **13px**, A+ is **15px**. Six semantic roles define ordinary text: `--text-meta` (11px), `--text-small` (12px), `--text-body` (13px), `--text-subheading` (15px), `--text-section` (18px), `--text-title` (26px). These sizes are derived from rem and all scale with A+. Use roles, never introduce an independent component font size. Ordinary page titles use `--text-page`, currently an alias of the smaller `--text-section` (18px). The identity, clock and share-card display have separately named tokens because they function as identity artwork or a display. Both `font-size` and the `font` shorthand must refer to shared roles, except deliberate zero-size icon-only text. The interface font stack is `--font-ui`; WenKai is reserved for the personal note and name artwork, and monospace for the workbench status. DM Sans ships 400/500/600; do not request an intermediate weight such as 550 and depend on browser font matching. Root preference lives on `<html>`, persists in `tyh-large-text`, and is applied before paint.

Page width is 1120px. Gutters are 56/32/20px at desktop/tablet/mobile. `.wrap` is the alignment boundary. About keeps the latest note and workbench composition, with its margin drawings. Music occupies an independent continuous shelf, not a third column in that grid. Section borders and spacing belong to their owning rules; do not append corrective overrides. Body copy uses 1.7–2 line height and restrained headings. Theme colours inherit the existing tokens.

## Text purpose and heading structure

Heading rank describes containment, while its type role describes visual emphasis. Choose the rank before choosing the style; do not change an `h2` to `h3` just to make it smaller. Dates, publication venues, status, source names and control labels remain `time`, `p`, `small`, `span`, links or buttons according to their purpose.

| Purpose | Markup / relationship | Shared type role |
| --- | --- | --- |
| Ordinary page title | One `h1` inside `main` | `--text-page` (18px) |
| Main section / Work category / essay section | `h2` below the page title | `--text-section` (18px) |
| Work entry within a category / contribution within a case note | `h3` below its section | `--text-subheading` (15px) |
| News entry directly under the page title | `h2`, since there is no category heading | `--text-subheading` (15px), matching entry titles |
| Home selected-work section label | `h2.eyebrow`; its entries are `h3` | `--text-meta` (11px); deliberately quiet section label |
| Home note teaser / study record | Semantic heading retained, compact context | `--text-body` (13px) |
| Main prose / case introduction / personal note | Paragraphs | `--text-body` (13px) |
| Summaries, descriptions, supporting copy, actions | Paragraphs or real controls | `--text-small` (12px) |
| Dates, category labels, source metadata, captions | `time`, `small`, `.eyebrow`, caption | `--text-meta` (11px); a venue may use `--text-small` where the full name needs reading |
| PDF toolbar and its adjacent overview | `h1` and `h2` in the compact reading interface | `--text-subheading` (15px) |
| Name card / hero identity / clock | Identity or time display | Named display tokens; not a new content-heading scale |

This table documents current composition, including About's compact music heading. It does not impose the same pixel size on every `h2`. About's repeated records introduction, section heading and selected-institution heading need a separate editorial decision; do not rewrite them while its wording is under analysis. Layout-spacing corrections are authorized by the subsequent screenshot feedback.

## Layout spacing and ownership

Spacing is judged from the end of one visible content block to the start of the next, including both sides of a divider, reserved image space, container padding and grid gaps. Replacing numbers with variables does not by itself make the layout consistent.

The spacing scale is `--sp-{2,4,6,8,10,12,16,20,24,32,40,48,56,64,80}`. Use it in mixed shorthand too (`padding:var(--sp-24) var(--sp-20)`, not `24px 20px`). These roles control actual composition:

| Relationship | Desktop (>700px) | Narrow (≤700px) | Owner |
| --- | --- | --- | --- |
| Previous content → major divider | 40px | 32px | `--section-before`; incoming section's margin, or the outgoing block's padding when its sibling owns the line, never both |
| Divider → section content | 24px | 20px | `--section-after`; incoming section's padding |
| Section heading → its content | 24px | 20px | `--section-heading-gap` |
| Work category → next category | 32px | 24px | `--group-gap`; incoming group margin |
| Last page content → footer | 40px | 32px | `--page-end`; one owner, no additional sibling margin |
| Editorial left/right columns | 24–48px, capped | 20px after stacking | `--layout-column-gap`; personal note, workbench, article header/body |

About's personal wrapper has **zero bottom padding**. The records introduction owns the gap between music and the next divider, avoiding hidden parent padding. Music and honours use the same divider roles. The current workbench is a full-width IDE below its caption; its explorer becomes a horizontal file strip on phones. It has no additional notebook drawing. The Home note has no extra mobile inset or bottom margin beyond its shared page ending.

Root responsive variables own the small-screen spacing changes. The old closing “Section rhythm normalization” override block has been removed; edit the component's existing rule and these root roles. Other historical CSS rules remain and are not claimed to be fully refactored. Border widths, artwork geometry, optical offsets and viewport-based PDF reader heights are separate constraints. A+ changes type size, not the spacing scale; inspect the resulting line wraps rather than assuming the page height stays fixed.

Verification must capture the actual transitions (personal→workbench, workbench→music, music→records, map→honours), not only the top viewport or paragraph spacing. Compare the measured gap above the line and below it separately at desktop and narrow widths, inspect both themes, and check captions/doodles for overlap. Latest spacing evidence: [layout-spacing-2026-09-26](review/layout-spacing-2026-09-26/REPORT.md).

## About architecture and interactions

- `#personal`: one continuous personal note combining learning, uncertainty, vulnerability and the owner's tentative “怪人” thought. Emotions are examples, not classified panels. `#feelings` remains a compatible anchor inside this note.
- `#workbench`: one full-width VS Code-inspired reading window. The initial `impression.md` file renders `aboutPerspective` from `about-content.mjs`, explicitly authored by GPT-6 Astra and dated 2026.09.26. Three further files render the factual `aboutWorkbench` skill categories. All four files share the existing tab controller, active filename, arrow/Home/End keyboard behavior and one visible panel. The explorer stacks vertically on desktop and scrolls horizontally on phones; the prose follows normal page scrolling. This attributed AI impression is separate from the owner’s first-person self-description.
- `#listening`: an independent music section. `aboutAlbums` supplies real covers and sources. All releases occupy one continuous overlapping shelf with horizontal scrolling on narrow screens. Hover/focus/tap selects a release; one caption follows above its cover, clamped within the shelf width. Covers are labelled buttons with pressed state and arrow/Home/End navigation. The caption provides an explicit Apple Music source link. There are no numbered catalog rows or fixed groups of three. The preview button explicitly names the one available preview, pale pink. Do not imply that selecting any cover plays that album locally.
- `#records`: canonical study, experience, honours and reviewing records.

About's local navigation scrolls smoothly, respecting reduced motion. Sitewide navigation still changes pages. Every normal generated page has a footer link to `#top`. Historical experiments under `material-demo/` do not own active page behavior.

For future music requests read [the music update workflow](skills/personal-site-editor/references/music.md). It distinguishes release metadata from personal listening notes, and defines how this shelf scales. A listening reflection may be added beside the shelves when the owner provides it; no taste or emotional response is invented from album metadata.

The project-local [listening-notes skill](skills/listening-notes/SKILL.md) extends that workflow with sourced style analysis, collection statistics and owner-supplied reflections. `listening-summary.mjs` owns unique-release counts; both `views.mjs` and the skill's `scripts/summarize.mjs` use it with `aboutAlbums`, so public counts update on build. `references/listening-analysis.md` stores dated analysis outside the public output. It is prompt-driven editing, with no runtime LLM or background tracking.

The music corner's `.music-layout` places the shelf beside `.listening-note`, which groups collection totals with the chair drawing. At 800px and below the note becomes a compact line group under the shelf; the chair stays beside that note. Counts refer to shelf releases and artists, and the year span is explicitly labelled as release years. No play counts or owner feelings are inferred. The Dreamer is shown as an album only, per the owner's latest request.

The workbench now presents skill categories, not project-summary prose. `aboutWorkbench` has paired category names and `skills` arrays with paired `name` / `detail` values. Each panel uses a definition list; tabs name the categories. Scope is grounded in `content.mjs`: Python/pandas and reporting from the hotel record; NineToothed/DSL and CUDA/Triton/WebGPU teaching/demo work from the engineering record; literature/writing from existing research; interviews/prototyping/testing/pitching from social innovation. Do not add proficiency ratings or silently infer unrelated software skills.

Music spacing: `.music-room` owns the preceding divider and shared section padding; `.shelf-stage` owns a 16px heading gap and a 4.5rem caption reserve. Caption bottom position depends on `--shelf-height` (118px desktop / 108px mobile), keeping the caption near the selected cover without changing section height. `.album-stack` fits its real contents and spreads on hover/focus. There is no separate caption paragraph below. `.records-intro` owns the following 40px / 32px section margin. Verify the complete music section, including both adjacent dividers, when changing these values.

## Language and content workflow

- Write Simplified Chinese and English as one pair. Build generates Traditional Chinese from Chinese; do not create a third manually maintained copy.
- Keep personal claims, dates, titles, affiliations, and emotions in their source data. Keep small control labels in the relevant page renderer. Escape owner-facing text when inserting it into markup.
- When changing a route or anchor, update `build.mjs` redirects and `check.mjs` expectations. The retired `writing.html` route points to `about.html#personal-title`.
- For an About change, inspect `about.html` in all three languages at desktop and 320–430px widths. Check light/dark, A+ mode, all album links, the workbench tabs, and the experience/map entry point.

## Design references for the record shelf

The [album-shelf source](https://github.com/adrienjoly/album-shelf) keeps record data separate from its HTML. We follow that separation in `about-content.mjs`. The overlapping sleeve motion is a small CSS treatment in `site.css`; it reveals an album title on hover or keyboard focus. On touch widths every sleeve remains a direct link inside the horizontally scrollable shelf; the shared caption identifies the focused release. Luke Dorny's [vinyl CSS example](https://codepen.io/lukedorny/pen/mddZjKP) and [MDN's carousel guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overflow/Carousels) were reviewed during exploration, but the oversized vinyl stage and selector were rejected after the owner's visual feedback.

## Why the About visuals differ

Earlier captures and archived builds in `website/review/` and Git revisions `a1691c0` and `6a33fe9` show the decisions behind this page. The early 1280px About was strong as a résumé, with large identity text and factual sections, but left little room for the owner's uncertain, personal voice. The later compact Markdown window and three-cover stack introduced a private desk corner. A later map-first composition moved that corner after factual records. The oversized vinyl stage and the brown shelf scene tried to make the record component more prominent; the owner rejected both and explicitly pointed back to the compact white shelf with its spreading motion. These are observations from the rendered versions and the owner's corrections, not claims that the current treatment has final approval.

The latest sequence merges the personal prose, then gives the interactive workbench and music separate sections before the factual records. The previously attempted network is removed. Do not turn the examples of emotion into eight cards, labels or photo assignments. Revisit the actual screenshots and the owner's supplied shelf image when revising this composition.

## Personal sketchbook imagery and voice

The current selected drawings are transparent margin assets in `assets/about/`: river-glass and wonky-chair. Earlier complete watercolor scenes were rejected and are not used. `references/about-illustrations.md` records the selected prompts. The wide river-glass composition accompanies the personal note, fading to very low opacity behind the text. The IDE has no notebook illustration. The glass reflects the owner’s explicitly confirmed habit of drinking a little while thinking; do not remove it as an arbitrary symbol. The chair sits beside the collection note. The owner explicitly requested this sparse river-and-meteor scene instead of the pencil; the personal wording remains under discussion. No image gallery, emotion categories or narrative room scenes. Preserve alpha and inspect both themes at actual display size.

The standalone network, discipline labels and floating particles were removed after the owner's correction. About now has four anchors: personal, workbench, listening, records. Copy describes the owner's conflicting ways of thinking, actions and values without turning them into strengths or resolving them in an uplifting ending. It must not ask readers to recognize sincerity, effort or care: these belong in how the site is made, not appeals in the copy. Leave room for lightness; the owner is not a uniformly solemn character.
