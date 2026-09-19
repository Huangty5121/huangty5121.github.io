# Personal website review — 19 September 2026

## Current build

- Home keeps the selected material composition, now as a transparent cutout on light and dark backgrounds. It has a compact introduction, two Work entrances, Notes, and a Hong Kong clock.
- Work has nine records with transparent abstract covers. Its two practice details now include the same visual identity and explicit returns to Work. Notes remains separate; its single essay is marked as an unpublished draft. The essay heading and body share the same page edge.
- About begins with the introduction. Its schematic institution-city overview covers Beijing, Shenzhen, and Hong Kong. A fourth group keeps institutions with no recorded city visible. City selection filters institutions; institution selection reveals one shared record set. The city display is not a travel history.
- Contact opens in place. The short music preview persists between same-language pages. The original PDFs remain embedded in a local PDF.js reader with page, search, and zoom controls.

## Verification performed

- `node website/build.mjs`, `node website/check.mjs`, and JavaScript syntax checks pass. The static check covers 78 generated HTML documents and 496 local references, with no failures. All three hosted PDFs are byte-identical to their supplied originals.
- Browser checks covered Home, Work, Notes, About, writing, both practice pages, and a paper reader in Chinese and English at effective widths of approximately 320, 389, and 433 CSS pixels: 48 route-width combinations. None showed horizontal overflow, overlapping header regions, or broken completed images.
- Clicking Beijing selected Tsinghua and IGSNRR. Opening Tsinghua displayed its two existing records, without creating duplicate entries. Direct Work disclosure opened its factual details and original-PDF entrance. The original PDF rendered in the local reader, showing native page controls and document content.
- The Notes essay's heading and first paragraph were measured at the same horizontal coordinate. A short Notes page placed its footer at the viewport edge. Light and dark cover, Work list, About map, Notes, writing, and practice detail layouts were inspected visually in the browser.

## Limits

This is a local build. Physical-device testing, full accessibility audit, publishing, and the owner's final aesthetic acceptance are not claimed. Institutional city labels refer to institutions, not to exact personal work sites. The note is still a draft awaiting the owner's revision; final publisher texts and unpublished project demonstration files were not supplied. Music depends on the external official preview remaining available.
