# Personal homepage draft

Local entry: `http://127.0.0.1:8772/home.html`

This is a separate architecture pass. The original `index.html` and `expanded.html`, their scripts, styles and content records are unchanged. No hosting or external services have been added.

## Reading paths

- **Home:** a visible introduction, one deliberately composed study group (object → sketch, plus a related metal note), an independent photograph, and a text-only entry. Five selected records, not an expanding wall of everything.
- **Index:** all 12 sample records. Search titles/text and filter by content type. This is where the collection can grow without moving the existing homepage objects.
- **Entry:** a dedicated reading view with selectable body text, media, gallery controls where relevant, and named, directional relationships. Related entries are links, not a second layer of decorative objects.
- **About:** a fuller introduction and three supplementary records absent from the homepage. `aboutSelection` is independent of `featured`; `aboutEntries()` also excludes featured IDs if the selections change later. The full index intentionally includes all entries, while genuine article relationships may return to a featured record. No invented education, employment, publication, or contact details. `profile.contact: null` produces no contact link.
- **Settings:** language, light/dark, text size, and optional material controls. Not an always-visible material lab.

These are views within one local page, with stable hash links (`#home`, `#archive`, `#about`, `#entry/fold`) and browser-history navigation. They do not require server rewrites. Search/filter state lasts for the current page session; preferences are device-local.

## Presentation rules

The study group is a grid with explicit slots and a single connector between the object photograph and its sketch. The line means “a sketch of the same object”, not a dimension or measured feature. Its endpoints follow the actual object bounds. The metal note uses a textual relationship rather than another crossing line. Independent content has no manufactured connection.

Desktop has a main study group and a quieter side column. Medium widths move the independent records below it. Small widths keep the object, sketch, and note together in reading order, retain modest variation in object widths, and replace the connecting line with the existing textual relationship. Font-size changes reflow text instead of scaling a screenshot. The layout does not randomly scatter items.

Materials reuse the existing images and font assets. The graphite metal note retains the previous brushed-metal image and edge treatment. The tracing sheet uses the original translucent substrate and ink settings, without the earlier artificial diagonal test line or the decorative short rule. Photographs have the existing subtle grain layer; no new fold or edge simulation was added. Dark mode changes the surrounding surface while physical photo and paper substrates remain readable.

## Preferences

The new page reads `ty-home-v1` first. If missing or malformed, it reads the original `ty-material-demo-v1` once. If neither exists, defaults match the supplied screenshot: hand lettering, vellum, grain 40, ink 68, shadow 74, haze 3. It only writes `ty-home-v1`; it never changes the original demo's preferences. “Use original demo settings” explicitly re-imports just the material settings. Language/theme/text-size remain independently selected during that import.

## Filling in real content

The roughness control now extends to 160 (previously 80), with a bounded opacity response to prevent high settings from erasing strokes. The original 0–80 response is unchanged. A separate 0–100 ink-bleed control applies slight expansion and softening to the same title/annotation filter, never to article body text. It defaults to zero so existing saved settings retain their appearance. A live sample in material settings uses the actual lettering and filter.

`dist/home-data.mjs` owns the draft profile, homepage selection, example prose, and bilingual interface labels. Existing record IDs, media and relation data are reused from `collection-data.mjs`, without showing the old demo-explanation body text as personal writing.

1. Replace `profile.introduction` and `profile.about` with approved text, then set `profile.draft` to false.
2. Supply a real contact only if wanted; do not replace null with an invented email.
3. Replace sample images/text with real work. The sample notices must remain until that replacement is complete.
4. Add future records and explicit relationships in the data; select only a few for the homepage. The current five visual slots are authored, not an unlimited automatic layout system. A new homepage composition should be designed if the selection changes substantially.

## Checks and limits

Run `node validate-home.mjs` from this folder for syntax, local references, data relationships, translated labels, preferences and route parsing. The existing validators cover the unchanged demos. These are static and pure-function checks, not browser rendering, keyboard-navigation, real-resize, or visual QA. This draft has not been published.
