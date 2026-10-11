# Personal site source map and design rules

## Targeted correction — 11 October 2026

The broad editorial trial was rejected and restored. The subsequent owner request targets mobile navigation, oversized typography, the star/river illustration, and the current Student label. Current body is 15px / 17px A+, metadata 13px and small text 14px at normal size. The self-note uses the body size without an extra enlargement. At widths up to 1100px, the existing theme, size and language controls move into the menu; the phone header stays one row. A single control group retains its listeners and state across navigation and resize. Mobile current identities use aligned role/institution columns. `currentRole` supplies Student for the PolyU current identity without rewriting historical representative records. The river artwork uses its original transparent asset, with the figure, meteor and reflection shown together in the margin; no replacement image or prose was created. Evidence is in `review/mobile-fix-2026-10-11/`.

## Active composition — 10 October 2026

This section supersedes all older layout/type directions below. The source and factual boundaries remain in force. Implementation and limits: `review/redesign-2026-10-10/REPORT.md`; reference inspection: `references/redesign-2026-10.md`.

Owner requirements: neutral near-white / dark grey; compact editorial typography; left name and right transparent line portrait; varied grid proportions and selective vertical marginal labels. Personal social links replace Work/Notes beneath the name. About starts with home/Hong Kong and develops through places, people, drinks and music; both modest photographs and words are present. Drink cabinet stays small. No duplicate photograph captions or generic “another photo” commentary. All original personal prose and attributed impressions stay exact. Experience records remain visible in their original categories, with the current section order preserved.

Implementation choices: body 16px / A+ 18px, local Noto SC/TC interface fonts, DM Sans Latin, WenKai original self-note. Maximum content width 1440px with fluid desktop gutters and 20px narrow gutters; long prose keeps a narrower measure. Cobalt is an accent; lavender/yellow only carry specific sections. Short marginal place labels turn vertically at desktop sizes and return horizontally on mobile. Home and Work share three selected IDs. Current roles share Experience data. Identity labels are 14 explicit data items with equal type within each language and question marks.

About uses `personal-editorial.mjs` for sourced opening and exchange excerpts. Paired photos share a strip, scroll on narrow screens and open in a native dialog. Music uses click/keyboard selection, static caption below the shelf and small selected-cover expansion. Leaflet has 12 separate pins and explicit keyboard activation; initialization fits bounds before accessing marker elements. Missing Leaflet/tiles retain text entrances. Photo loading transitions follow the reference timings, without scroll replay; no separate LQIP assets yet.

Experience order: current profile → education → research/internships/projects → public/campus service → honours → peer review → capabilities/languages → credentials. All records appear in their categories. Sticky in-page links provide direct access and a compact toggle hides descriptions, never record identity/date. Extra sources and explanations stay in native details. Old anchors auto-open details. Print omits secondary experience and controls.

Contact remains an accessible popover plus shareable `card.html`, with existing public accounts and an authorized click-only WhatsApp action. This avoids printing the number but is not privacy protection. WeChat QR is pending supply. No backend, framework, database, push or deployment added.

Verification: 864 responsive combinations, 33 interaction scenarios and 36 accessibility scans passed on the local Chrome build. Static check: 138 HTML files / 1,731 local references / three byte-identical original PDFs. Visual review is separate from user aesthetic acceptance; actual screenshots and unresolved evidence are in the report.

## Historical design notes (superseded where inconsistent)


The published site is generated. Edit `website/`, then run `node website/build.mjs`. The build writes `material-demo/dist/site/` in Simplified Chinese, `en/`, and `tw/`. Do not hand-edit generated HTML, CSS, or JavaScript.

Latest layout revision (2026-10-09): Experience renders as one reading column, not the earlier two-column education/record spread. Name and current appointments open the page; capabilities are labelled rows; education, research, service, peer review, honours and credentials follow as separate sections. There is no empty portrait frame. The degree is stated once, on the PolyU education record. Page measure is 1120px. Page-level jump bars stay removed. Home opens on `assets/face-now.png` as the background, not a side portrait; the name sits in the dark field. Current appointments stay one horizontal band above the wall. One question, 「但是，我是谁」, then the identity field at display size, then the unchanged self-note. No second question and no rule between them. The thirteen recorded identity words stay until the owner marks which are wrong and which to add. The degree stays off Home. Work groups put the category in a left column and the entries to its right. News gives the document crop a real column. Experience records put institution, role and date on one grid, with topic and supervisor on the next lines. This supersedes the 8 October two-column description and the 29 September home order below where they conflict; source and factual rules still apply.

## Experience edit — 7 October 2026

Experience is a selected public CV, not an exhaustive timeline. The owner requested stronger selection, visible supervisors and an existing-logo treatment. Sections: Education → Research & internships → Research programmes → Service → Honours → Memberships & certification → Skills & languages. Keep the four main research/internship records and two X-Institute records open; older employment, earlier campus/event service and additional scholarships use native disclosure. Incoming record anchors open their containing disclosure.

`cv-content.mjs` owns selected education and skills from the supplied master CV, with the later removal of the Management minor preserved. `content.mjs` owns concise appointments and supervisors; the owner confirmed the Supervisor label for these relationships. Existing institutional logos form a quiet static column beside records. About no longer duplicates skills; its old `#tools` link routes to Experience. Research outputs remain on Work. This supersedes older tools-reel and single-timeline descriptions below.

## Current composition — 29 September 2026

This composition supersedes the older About map/IDE descriptions retained below as design history. The user's latest instructions preserve the self-note and both model-impression texts verbatim.

- Home: name and a cropped harbour picture, current appointments, the identity wall, then 「但是，我是谁呢」 and the original self-note, then selected work and Notes. The existing transparent river/glass margin scene accompanies the note. The degree is not repeated here.
- About: two attributed impressions in a Codex-like reader → music → drinks → places → tools. The reader renders as a Mac-style window: a `desk-window-bar` with traffic lights, the centred title and the right-aligned 对话札记 indicator, above the sidebar/reading grid. `data-impression-tab` retains independent reading positions; the sidebar chat list is the only switcher (the model `<select>` footer was removed on 2026-09-30). The scroll surface opts out of scroll anchoring. The original Astra/GLM signatures and dates remain.
- The drink artwork is one transparent six-glass strip displayed through six CSS windows. The visible composition is glasses on a pale shelf with small captions, not action cards. Native buttons retain keyboard and screen-reader access. A native `dialog` slides from the side on desktop and from below on mobile; Escape/backdrop/close returns focus to its glass. Sources and personal variations are separate in `about-cabinet.mjs`.
- `places.mjs` supplies owner-named cities and regions. Every place retains its own pin at overview and detail scales. Hover/focus labels avoid permanently piling up names. Clicking a pin preserves the zoom level and opens its paper beside the map; clicking empty map ground or the in-map 「总览」 control returns to the overview, which frames the home cluster (the UK and Singapore stay one pan away). Neither presents an exact personal location or itinerary. City notes and their entries are independent of the external tile provider. A photo may be added only with a confirmed association. The former city-button strip above the map was removed on 2026-09-30.
- `experience.html` owns all canonical education, experience, honours, credential and reviewing records. Records are ordered reverse-chronologically by start date with hairline year markers (`.archive-year`); organisation aliases navigate to their existing records. Previous `about.html#record-*`, `#study-*`, `#org-*` and section bookmarks remain compatible; the old self-note links resolve to Home. `writing.html` redirects to Home's personal note.
- All additions are authored in zh/en; tw is generated as before. Shared type and spacing roles still apply. The former `--text-introduction` display token was removed on 2026-09-30. The Home 「我是谁？」 line stays a compact WenKai question. The full degree string is not on that line; it stays on the PolyU education record and the PolyU note in `places.mjs`.
- Desktop navigation order: 首页 · 工作 · 文字 · 动态 · 经历 · 关于我 — 关于我 closes the bar, 经历 sits second from the end.

## Where a change belongs

| Concern | Source | Rule |
| --- | --- | --- |
| Page structure, route sections, short interface labels | `views.mjs` | Use the shared page builders and semantic HTML. Keep one canonical full record set on Experience. |
| About's personal voice, personal reflection, album metadata | `about-content.mjs` | Edit the paired `zh` and `en` values together. Do not put long personal copy back into HTML templates. |
| City memories | `places.mjs` | Owner-supplied places and personal fragments; region-level pins, no invented itineraries. |
| Drinks and recipes | `about-cabinet.mjs` | Owner-named favourites; attributed references separate from personal recipes. |
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

## Breakpoint roles and expression conventions (2026-10-05)

Three documented tiers plus named component exceptions; any other width needs a note here before it is introduced.

| Tier | Width | Owns |
| --- | --- | --- |
| Desktop base | >900px | Full layouts; gutters 56px; impression sidebar 208px |
| Tablet | 701–900px | Gutters 32px; impression sidebar 180px; entry-overview prompt track 60px; cabinet glass 132px |
| Mobile | ≤700px | Single-column stacking; gutters 20px; the impression reader becomes a horizontal file strip; archive sections and the personal note stack |
| Phone refinements | ≤600px (650/540/480/360 where content demands) | Header 65px; desktop nav hidden in favour of the menu dialog; study-record year column 72px |

Component-owned exceptions: work-group columns at 790px, music layout at 1100/800px, share-card actions at 540px, ledger at 480px, contact edge case at 360px, brand span hidden at 1000px. When a rule must not leak below 700px, use a range query (`min-width:701px) and (max-width:900px`) — the precedent is the cabinet-glass block. The ≤700px blocks live at the **end** of `site.css`, after the 2026-09-30 restoration block, and must stay last: `check.mjs` fails when a later base rule overrides a ≤700px declaration, when braces are unbalanced, or when generated HTML carries inline layout styles (custom-property registration such as `--r` is the only allowed inline style).

Expression conventions: calendar ranges use spaced em dashes (`2025 — 2027`), month points use `YYYY.MM`, and compact academic years keep the en dash (`2025–26`) as the single documented exception. Fact-pair meta lines use ` · `; slashes are reserved for slug-style eyebrows (`01 / EDUCATION`) and brand marks. `↗` is external targets only; internal links use `→` or no arrow; back links are `← 返回工作成果`. zh quotation marks are corner brackets 「」. The honours ledger lives in `content.mjs` as paired zh/en tuples and is covered by `check.mjs`.

Verification must capture the actual transitions (personal→workbench, workbench→music, music→records, map→honours), not only the top viewport or paragraph spacing. Compare the measured gap above the line and below it separately at desktop and narrow widths, inspect both themes, and check captions/doodles for overlap. Latest spacing evidence: [layout-spacing-2026-09-26](review/layout-spacing-2026-09-26/REPORT.md).

## Earlier About architecture and interactions (superseded where noted above)

- `#personal`: one continuous personal note combining learning, uncertainty, vulnerability and the owner's tentative “怪人” thought. Emotions are examples, not classified panels. `#feelings` remains a compatible anchor inside this note.
- `#workbench`: one full-width VS Code-inspired reading window. The initial `impression.md` file renders `aboutPerspective` from `about-content.mjs`, explicitly authored by GPT-6 Astra and dated 2026.09.26. Three further files render the factual `aboutWorkbench` skill categories. All four files share the existing tab controller, active filename, arrow/Home/End keyboard behavior and one visible panel. The explorer stacks vertically on desktop and scrolls horizontally on phones; the prose follows normal page scrolling. This attributed AI impression is separate from the owner’s first-person self-description.
- `#listening`: an independent music section. `aboutAlbums` supplies real covers and sources. All releases occupy one continuous overlapping shelf with horizontal scrolling on narrow screens. Hover/focus/tap selects a release; one caption follows above its cover, clamped within the shelf width. Covers are labelled buttons with pressed state and arrow/Home/End navigation. The caption provides an explicit Apple Music source link. There are no numbered catalog rows or fixed groups of three. The preview button explicitly names the one available preview, 葉子 (Ye Zi, the 《薔薇之戀》 OST version; configured in `material-demo/dist/desk-config.mjs`). Do not imply that selecting any cover plays that album locally.
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
