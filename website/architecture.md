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

The first `:root` rule in `site.css` owns the small default type size (`--site-font-size: 14px`), page width (`--page-width: 1120px`), page gutter (`--page-gutter`), and theme colours. At 900px and 600px, only the gutter token changes to 32px and 20px. Ordinary component font sizes are expressed in `rem`, so the header's A+ button changes the root size to 16px for the whole site. `--fluid-adjust` shifts the fluid middle value of `clamp()` headings along with it. The preference is stored as `tyh-large-text` and applied to `<html>` before the page is painted.

Keep heading hierarchy and reading density; a shared control does not mean every text element has the same size. Avoid new hard-coded `font-size: ...px`, repeated `.wrap` widths, or one-off left edges. Use the gutter and page-width tokens for alignment. If a new component has an intentional exception, document why beside its rule.

About follows four visible chapters: a personal note with a compact record shelf, connected ways of thinking, a continuous personal reflection, then verifiable study, experience and honours. The Markdown-like window holds what the owner can write about learning and methods. The network is an editorial visual rather than a factual scientific diagram. Its Canvas 2D drawing lives in `site.mjs`, stretches beyond the text column, and stops animating outside the viewport or when reduced motion is preferred. The third chapter is prose, not a taxonomy of emotions: the owner used joy, sadness, shame and other moments as examples of a multifaceted person, and described sometimes feeling like a “怪人” as uncertainty rather than a stable label. Preserve the tentative wording.

The three real album covers and direct Apple Music links come from `about-content.mjs`. The shelf follows the owner's 25 September screenshot: compact overlapping covers on a pale line, with the group spreading on pointer hover and one sleeve rising with its title on hover or keyboard focus. The shelf remains an aside beside the note. On narrow screens all three titles get visible direct links; the nearby “Play here” button opens the site's existing music preview. The persistent music corner is separate from these album links.

## Language and content workflow

- Write Simplified Chinese and English as one pair. Build generates Traditional Chinese from Chinese; do not create a third manually maintained copy.
- Keep personal claims, dates, titles, affiliations, and emotions in their source data. Keep small control labels in the relevant page renderer. Escape owner-facing text when inserting it into markup.
- When changing a route or anchor, update `build.mjs` redirects and `check.mjs` expectations. The retired `writing.html` route points to `about.html#personal-title`.
- For an About change, inspect `about.html` in all three languages at desktop and 320–430px widths. Check light/dark, A+ mode, the three album links, the network, and the experience/map entry point.

## Design references for the record shelf

The [album-shelf source](https://github.com/adrienjoly/album-shelf) keeps record data separate from its HTML. We follow that separation in `about-content.mjs`. The overlapping sleeve motion is a small CSS treatment in `site.css`; it reveals an album title on hover or keyboard focus. On touch widths the adjacent text links make every record directly reachable. Luke Dorny's [vinyl CSS example](https://codepen.io/lukedorny/pen/mddZjKP) and [MDN's carousel guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overflow/Carousels) were reviewed during exploration, but the oversized vinyl stage and selector were rejected after the owner's visual feedback.

## Why the About visuals differ

Earlier captures and archived builds in `website/review/` and Git revisions `a1691c0` and `6a33fe9` show the decisions behind this page. The early 1280px About was strong as a résumé, with large identity text and factual sections, but left little room for the owner's uncertain, personal voice. The later compact Markdown window and three-cover stack introduced a private desk corner. A later map-first composition moved that corner after factual records. The oversized vinyl stage and the brown shelf scene tried to make the record component more prominent; the owner rejected both and explicitly pointed back to the compact white shelf with its spreading motion. These are observations from the rendered versions and the owner's corrections, not claims that the current treatment has final approval.

The current sequence assigns a visual job to each chapter: window for describable learning, an open midnight field for connected thinking, unboxed continuous prose for the difficulty of describing oneself, and a map and ledger for checkable records. Do not turn the examples of emotion into eight cards, labels or photo assignments. Revisit the actual screenshots and the owner's supplied shelf image when revising this composition.
