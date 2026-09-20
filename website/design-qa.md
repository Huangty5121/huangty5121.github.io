# Personal website review — 20 September 2026

## Current build

- Home keeps the selected material composition, now as a transparent cutout on light and dark backgrounds. It has a compact introduction, two Work entrances, Notes, and a Hong Kong clock.
- Work has nine records with transparent abstract covers. Its two practice details now include the same visual identity and explicit returns to Work. Notes remains separate; its single essay is marked as an unpublished draft. The essay heading and body share the same page edge.
- About begins with the introduction. Its Natural Earth regional coastline and city points place Beijing and the Pearl River Delta geographically. An enlarged inset separates Shenzhen from Hong Kong. A fourth text group keeps institutions with no recorded city visible. City selection filters institutions; institution selection reveals one shared record set. The city display is not a travel history.
- Contact opens in place. The short music preview persists between same-language pages. The original PDFs remain embedded in a local PDF.js reader with page, search, and zoom controls.
- Original PDF readers now open with the preview occupying the first viewport and a compact factual sidebar at desktop widths; phones show the preview before the sidebar. Page-fit makes the first PDF page visible in full on initial load. The site palette now includes warm paper, blue, grey-green and clay across the background, map, work covers and Notes symbol; map and Home motion remain subtle and follow reduced-motion preference.

## Verification performed

- `node website/build.mjs`, `node website/check.mjs`, and JavaScript syntax checks pass. The static check covers 78 generated HTML documents and 496 local references, with no failures. All three hosted PDFs are byte-identical to their supplied originals.
- Browser checks covered Home, Work, Notes, About, writing, both practice pages, and a paper reader in Chinese and English at effective widths of approximately 320, 389, and 433 CSS pixels: 48 route-width combinations. None showed horizontal overflow, overlapping header regions, or broken completed images.
- Clicking Beijing selected Tsinghua and IGSNRR. Opening Tsinghua displayed its two existing records, without creating duplicate entries. Direct Work disclosure opened its factual details and original-PDF entrance. The original PDF rendered in the local reader, showing native page controls and document content.
- On the narrow About review, selecting Beijing filtered to two institutions; opening Tsinghua showed its two records as a dedicated mobile scene; its explicit Institutions button returned to the same Beijing list without changing the city filter.
- The former invented land silhouette was replaced with clipped Natural Earth 1:50m/1:10m land geometry and city points. Beijing, Shenzhen, and Hong Kong pins selected their matching institution groups. The 320px English About preview reported no overflow or broken images; 390px light/dark and desktop map layouts were inspected visually. Natural Earth source, representative-city-centre limitation, and regeneration steps are recorded in `references/geography.md`.
- The updated 320px and 433px browser checks for Home, Work, Notes and About passed in both languages with no horizontal overflow or missing images. The English heatwave, crypto-ncRNA and Olympic readers loaded the original PDFs with 13, 11 and 18 pages respectively. At desktop size the first PDF page and the summary are visible in the initial viewport; at 320px the preview is first and the page does not overflow. Light/dark Home and the recoloured About map were inspected visually.
- The Notes essay's heading and first paragraph were measured at the same horizontal coordinate. A short Notes page placed its footer at the viewport edge. Light and dark cover, Work list, About map, Notes, writing, and practice detail layouts were inspected visually in the browser.

## Limits

This is a local build. Physical-device testing, full accessibility audit, publishing, and the owner's final aesthetic acceptance are not claimed. Institutional city labels refer to institutions, not to exact personal work sites. The note is still a draft awaiting the owner's revision; final publisher texts and unpublished project demonstration files were not supplied. Music depends on the external official preview remaining available.

## Typography pass — 20 September 2026 (afternoon)

A whole-site typography review completed the page-by-page pass that was cut short earlier the same day. Changes, all in `site.css` as a final layer:

- Display headings (page, publication, blog, Notes feature) use `text-wrap:balance`, so long Chinese titles no longer leave a single orphan character on the last line. The blog title and Notes feature title were also capped (44→40px, 31→26px) so the current essay title sits on one calm line at desktop widths.
- The home identity name grew from 31px to 36px (40px above 1440px) and the clock row moved up, giving the landing a steadier hierarchy without new decoration.
- The About introduction grid uses a narrower fixed left column (min 190px, max 250px) instead of 32%, removing the dead band between the seal block and the copy.
- The delta inset heading no longer wraps; the Work list label column widened 90→104px so labels like “实践 2024 —” keep one line at desktop widths.
- On viewports up to 700px the Pearl River Delta pins render as dots only (labels hidden, hit area kept), because the 40px-tall labels overlapped at the small inset size; the city list below still names each city.

Verification: `node website/build.mjs` and `node website/check.mjs` pass (78 documents, no failures). Desktop light screenshots were retaken for Home, Work, About, Notes, the essay, a paper reader, both practice pages and the publication redirect target at full page height; dark Home/About/Work/Notes/essay and 390px About were rechecked the same way. Clicking Beijing → Tsinghua still filters and reveals the shared record set. English Home and essay were inspected after the heading changes. The asset query string is bumped to `v=20260920-typo1`; both Vercel and GitHub Pages rebuild from source, so no dist-only action is needed. Not verified on physical devices; not pushed.

## Second pass — 20 September 2026 (evening): org data, map, type scale, background

Owner-directed changes:

- **HKCC + CPCE merged** into one organisation (CPCE · HKCC) holding the HKCC study record plus both service records; 3 records under one card. The "Location not listed" city group is gone: Qiyuan and Iluvatar (Beijing, per owner) go to Beijing, PolySmart (PolyU group) goes to Hong Kong. Academic peer review is no longer city-bound and shows under whichever city is selected.
- **Logos completed**: Qiyuan now uses the owner-supplied glyph mark (cropped from the brand banner, black→alpha) and HKSAR uses the owner-supplied regional emblem; both converted to transparent PNGs in `desk-assets/pins/`. Qiyuan's name is annotated 启元实验室（国家实验室）in the org list, the selected header, and the experience record name.
- **Map rework**: pins are uniform (dot left, label right in a translucent pill; the old Beijing/HK reversed layout is gone), pins counter-scale while zooming (map scales, pin size stays constant via `--pin-scale`), and the overview map lost the red delta dot/pulse/callout clutter (the inset panel already covers the delta). On phones the delta pins are dots (labels previously collided) and the inset zoom controls moved to the top so they never cover pins.
- **Type scale**: global floors — nothing below 10px (was 8–9px in a dozen places), small descriptive text 11–12px, secondary reading text 13px. Home landing is the size reference; nothing reads larger than before.
- **Background**: drafting-paper grid (1px lines every 88px at 2.5% ink) over the ambient washes; wash opacity raised .44→.56. Reduced-motion unaffected.

Verification: `node website/build.mjs` + `node website/check.mjs` pass in both source trees (this repo and the Codex workspace mirror, which received the same source/asset changes). Browser: About Beijing shows 4 institutions and opens Qiyuan with the annotated name; Hong Kong shows 5 (emblem, CPCE·HKCC with 3 records); zoomed overview keeps pin size constant; dark About and 390px About (delta controls at top, dot pins) inspected; Work list rechecked at desktop after size bumps. Asset version bumped to `v=20260920-typo4`. Not verified on physical devices; not pushed.

## Map refactor — 20 September 2026 (night)

The About map was rebuilt on Leaflet 1.9.4 (vendored locally) with Esri gray canvas tiles (light/dark variants swap with the theme; no API key). The two-panel hand-drawn SVG (overview + delta inset) and all of its hand-rolled pan/zoom/clamp code are removed. One real map now: markers at Natural Earth city coordinates with permanent tooltip labels; list↔map two-way binding (list click flies the map; marker click selects the city and opens the institution grid); scroll-wheel zoom stays off so the page scrolls normally; attribution shown. Also this round: PolySmart merged into the PolyU card (owner: the group is PolyU-based; 5 records now), leaving 10 organisations in three city groups — Beijing 4 (Tsinghua, IGSNRR, Iluvatar, Qiyuan), Shenzhen 2 (SMART, X-Institute), Hong Kong 4 (PolyU, CPCE·HKCC, HKSAR Government, Royal Plaza).

Verification: build + static checks pass in both source trees. Browser: initial fitBounds view, list→fly (Hong Kong at zoom 9.5 separates Shenzhen/Hong Kong), marker→filter (Beijing marker click pressed the Beijing list entry), theme toggle swaps tiles, dark map inspected, 390px view has no horizontal overflow and shows all three labelled markers. One transient "Map data not yet available" tile state observed on Esri's side during rapid automated reloads; it self-resolved on reload and normal browsing loads tiles normally. Offline the map shows the themed base colour with markers still drawn. Asset version `v=20260920-map1`. Not pushed; physical devices untested.

## Polish round — 20 September 2026 (night, second)

Owner feedback round: 

- **Colourful basemap**: light theme now uses Esri World_Topo_Map (colour terrain/street tiles); dark keeps Esri dark gray canvas. CARTO Voyager/POSITRON were tested first but the free tier now stamps "API key required" into tiles; OSM wiki tiles block scripted access. The first Topo rollout 404'd because the service lives outside the `Canvas/` path — fixed.
- **Tile speed**: `<link rel="preconnect">` to the tile host, and a hidden "warm" pane prefetches the opposite theme's tiles 2.5s after page load, so theme switches render instantly (measured ~150ms to first dark tile after toggle, vs multi-second gaps before). Tiles also come from browser cache on repeat visits.
- **City list**: the organisation names under each city were removed — three plain rows now.
- **Background**: the drafting grid added earlier this afternoon is removed (owner didn't like it); back to the plain soft ambient washes, Apple-style.
- **Mobile interaction**: opening/closing an institution on phones now smooth-scrolls instead of jumping the viewport.
- **Academic reviewing surfaced**: the reviewing entry moved out of the hidden institution panel and sits directly under the map/city list at all times; selecting it opens the reviewing record without requiring a city.

Verification: build + checks pass in both source trees. Browser: light Topo tiles 12/12 loaded; reviewing opens and closes without a city; Hong Kong flow re-run; dark theme tile swap measured; 390px About renders all three labelled markers with no horizontal overflow; Home re-checked with the grid removed. Not pushed.

Live pre-fix diagnosis on 20 September: both `https://tyhuang.hk/` (Vercel) and `https://huangty5121.github.io/` (GitHub Pages) returned HTTP 404, while `/material-demo/dist/site/index.html` returned HTTP 200 on both hosts. The copy pushed to the GitHub repository had no root `index.html`, `vercel.json`, or Pages workflow. Publishing configuration is now prepared; a new public deployment must be checked after the changes are pushed and the Pages source is set to GitHub Actions.
