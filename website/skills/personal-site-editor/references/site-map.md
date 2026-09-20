# Active website map

- `website/views.mjs`: bilingual page structures and the relation between Home, Work, Notes, About, practice pages, writing, and PDF reading.
- `website/content.mjs`: website-specific copy over the historical records in `material-demo/dist/desk-data.mjs`.
- `website/entries.mjs`: Work index metadata, order, tags, and cover filenames. The sole current Notes draft is in `website/industrial-note.mjs`.
- `website/cover-art.mjs`: abstract SVG covers. Keep their canvas transparent and check both themes.
- `website/site.css` and `website/site.mjs`: layout, responsive behavior, navigation, city selection, theme, music, and disclosure interactions.
- `website/build.mjs`: generates Chinese and English routes, copies assets and original PDFs, and assembles PDF.js. `website/check.mjs` checks links and PDF identity.
- `website/map-geometry.mjs` and `website/tools/derive-map.py`: static Natural Earth geography for the About city locator. Data provenance and bounds are in [`geography.md`](../../../references/geography.md). Do not redraw a fictional coastline or move city markers by eye.
- `website/assets/folio-scene-cutout.webp`: transparent material composition used as the Home cover. The earlier opaque scene remains as a historical source asset.

Main routes: `index.html`, `collection.html`, `notes.html`, `about.html`; details: `writing-modernization.html`, two practice pages, publication records, and three original-PDF readers. The retired `writing.html` route redirects to About's short reflection. Chinese routes are at `/site/`; English routes at `/site/en/`. Contact is a local popover, not a page jump. The audio player persists across same-language navigation and plays an official short preview only.

Paper reading pages use a viewport-height original-PDF preview with a compact contextual sidebar on desktop; the preview precedes the sidebar on mobile. PDF.js starts at page-fit and retains search, paging, and zoom. The colour system in `site.css` uses blue for interactive paths, green for geographic surfaces, and warm clay for notes/material accents; check both themes and reduced-motion behaviour before changing it.

About groups institutions by *institution city*, not the owner's travel history or exact work site. Current groups: Beijing (Tsinghua, IGSNRR), Shenzhen (SMART, X-Institute), Hong Kong (PolyU, Royal Plaza, HKSAR Government, HKCC, CPCE), and location not recorded (PolySmart, Iluvatar CoreX, Qiyuan). The locator uses Natural Earth city-centre points and coastline, with a Pearl River Delta inset so Shenzhen and Hong Kong remain distinct. Beijing institutional addresses were checked against [Tsinghua's campus handbook](https://is.tsinghua.edu.cn/Campus-Life-Handbook.pdf) and [IGSNRR's contact page](https://english.igsnrr.cas.cn/about/contact/). New groupings require an explicit source or owner confirmation. Changing the map must preserve the single shared experience record set.

The current design is intentionally editable. New images or widgets should clarify a record or action. Check desktop and 320–430px effective widths in both languages, especially the header, expanding records, map, popovers, and PDF reader. Prefer semantic native controls and reduced-motion support. Update `website/README.md` and `website/design-qa.md` when the architecture or verified state changes.
