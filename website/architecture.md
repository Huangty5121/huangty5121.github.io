# Personal site source map and design rules

The published site is generated. Edit `website/`, then run `node website/build.mjs`. The build writes `material-demo/dist/site/` in Simplified Chinese, `en/`, and `tw/`. Do not hand-edit generated HTML, CSS, or JavaScript.

## Where a change belongs

| Concern | Source | Rule |
| --- | --- | --- |
| Page structure, route sections, short interface labels | `views.mjs` | Use the shared page builders and semantic HTML. Keep one visible record set for About experience. |
| About's personal voice, personal reflection, discipline names, album metadata | `about-content.mjs` | Edit the paired `zh` and `en` values together. Do not put long personal copy back into HTML templates. |
| Verified work and experience descriptions | `content.mjs` over `material-demo/dist/desk-data.mjs` | Keep the public fact boundary and original record identity. |
| Work order and card metadata | `entries.mjs` | Keep Work categories separate from About's personal material. |
| Layout, colours, type, responsive rules | `site.css` | Change shared tokens and component rules rather than appending a page-specific correction to the end. |
| Theme, text-size button, navigation, map, network drawing, music | `site.mjs` | Reinitialise page-specific behavior in `initialiseView` so same-language navigation works. |
| Language pages, asset copies, redirects, cache keys | `build.mjs` | The `tw` edition is generated from the Chinese render with opencc-js. |
| Links, locale completeness, generated-page integrity | `check.mjs` | Run it after every build. It checks both language values in `about-content.mjs`. |

`skills/personal-site-editor/references/site-map.md` records routes and the map's factual boundaries. `design-qa.md` is a dated verification log; an older screenshot result is not evidence for a new layout.

## Shared visual controls

The first `:root` rule in `site.css` is the single typography control. Default root is **13px**, A+ is **15px**. Six semantic roles define ordinary text: `--text-meta` (11px), `--text-small` (12px), `--text-body` (13px), `--text-subheading` (15px), `--text-section` (18px), `--text-title` (26px). These sizes are derived from rem and all scale with A+. Use roles, never introduce an independent component font size. The identity and share-card display have separately named tokens because they function as name artwork. All font-size declarations refer to tokens except deliberate zero-size icon-only text. Root preference lives on `<html>`, persists in `tyh-large-text`, and is applied before paint.

Page width is 1120px. Gutters are 56/32/20px at desktop/tablet/mobile. `.wrap` is the alignment boundary. About uses a shared 1:1.6 editorial grid with a 9% gap for narrative, workbench and music, collapsing at 700px. Section borders and spacing belong to their owning rules; do not append corrective overrides. Body copy uses 1.7–2 line height and restrained headings. Theme colours inherit the existing tokens.

## About architecture and interactions

- `#personal`: one continuous personal note combining learning, uncertainty, vulnerability and the owner's tentative “怪人” thought. Emotions are examples, not classified panels. `#feelings` remains a compatible anchor inside this note.
- `#workbench`: a small software-style window with real tabs for tools/code, research/reading and interviews/prototypes. Long paired copy lives in `aboutWorkbench` in `about-content.mjs`. Tab arrows/Home/End and focus work; each panel links to verifiable work. The window is not labelled About and decorative traffic lights are not fake buttons.
- `#listening`: an independent music section. `aboutAlbums` supplies real covers and sources. All releases occupy one continuous overlapping shelf with horizontal scrolling on narrow screens. Hover/focus reveals the selected release in a shared caption below. There are no numbered catalog rows or fixed groups of three. Each cover is a labelled keyboard-focusable direct link. The preview button explicitly names the one available preview, pale pink. Do not imply that selecting any cover plays that album locally.
- `#records`: canonical study, experience, honours and reviewing records.

About's local navigation scrolls smoothly, respecting reduced motion. Sitewide navigation still changes pages. Every normal generated page has a footer link to `#top`. Historical experiments under `material-demo/` do not own active page behavior.

For future music requests read [the music update workflow](skills/personal-site-editor/references/music.md). It distinguishes release metadata from personal listening notes, and defines how this shelf scales. A listening reflection may be added beside the shelves when the owner provides it; no taste or emotional response is invented from album metadata.

## Language and content workflow

- Write Simplified Chinese and English as one pair. Build generates Traditional Chinese from Chinese; do not create a third manually maintained copy.
- Keep personal claims, dates, titles, affiliations, and emotions in their source data. Keep small control labels in the relevant page renderer. Escape owner-facing text when inserting it into markup.
- When changing a route or anchor, update `build.mjs` redirects and `check.mjs` expectations. The retired `writing.html` route points to `about.html#personal-title`.
- For an About change, inspect `about.html` in all three languages at desktop and 320–430px widths. Check light/dark, A+ mode, all album links, the network, and the experience/map entry point.

## Design references for the record shelf

The [album-shelf source](https://github.com/adrienjoly/album-shelf) keeps record data separate from its HTML. We follow that separation in `about-content.mjs`. The overlapping sleeve motion is a small CSS treatment in `site.css`; it reveals an album title on hover or keyboard focus. On touch widths the adjacent text links make every record directly reachable. Luke Dorny's [vinyl CSS example](https://codepen.io/lukedorny/pen/mddZjKP) and [MDN's carousel guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overflow/Carousels) were reviewed during exploration, but the oversized vinyl stage and selector were rejected after the owner's visual feedback.

## Why the About visuals differ

Earlier captures and archived builds in `website/review/` and Git revisions `a1691c0` and `6a33fe9` show the decisions behind this page. The early 1280px About was strong as a résumé, with large identity text and factual sections, but left little room for the owner's uncertain, personal voice. The later compact Markdown window and three-cover stack introduced a private desk corner. A later map-first composition moved that corner after factual records. The oversized vinyl stage and the brown shelf scene tried to make the record component more prominent; the owner rejected both and explicitly pointed back to the compact white shelf with its spreading motion. These are observations from the rendered versions and the owner's corrections, not claims that the current treatment has final approval.

The latest sequence merges the personal prose, follows it with the flowing network, and gives the interactive workbench and music separate sections before the factual records. Do not turn the examples of emotion into eight cards, labels or photo assignments. Revisit the actual screenshots and the owner's supplied shelf image when revising this composition.

## Personal sketchbook imagery and voice

The current selected drawings are transparent isolated margin objects in `assets/about/`: pencil-knot, open-notebook and wonky-chair. Earlier complete watercolor scenes were rejected and are not used. `references/about-illustrations.md` records the selected prompts. The first two drawings accompany the note and workbench; the chair uses the wide-screen music margin. No image gallery, emotion categories or narrative room scenes. Preserve alpha and inspect both themes at actual display size.

The standalone network, discipline labels and floating particles were removed after the owner's correction. About now has four anchors: personal, workbench, listening, records. Copy describes the owner's conflicting ways of thinking, actions and values without turning them into strengths or resolving them in an uplifting ending. It must not ask readers to recognize sincerity, effort or care: these belong in how the site is made, not appeals in the copy. Leave room for lightness; the owner is not a uniformly solemn character.
