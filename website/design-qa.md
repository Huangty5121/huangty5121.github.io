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

Live pre-fix diagnosis on 20 September: both `https://tyhuang.hk/` (Vercel) and `https://huangty5121.github.io/` (GitHub Pages) returned HTTP 404, while `/material-demo/dist/site/index.html` returned HTTP 200 on both hosts. The copy pushed to the GitHub repository had no root `index.html`, `vercel.json`, or Pages workflow. Publishing configuration is now prepared; a new public deployment must be checked after the changes are pushed and the Pages source is set to GitHub Actions.
