# Experience and shared layout previews

These are isolated review prototypes, **not a replacement for the live site**. The owner chooses a variant before integration. This directory implements the 8 October plan and its subsequent correction: institution names lead every record; topics and supervisors remain visible.

## Build and view

```sh
node website/prototypes/build.mjs
python3 -m http.server 4180 --bind 127.0.0.1 --directory website/review/layout-prototypes/site
```

Open `http://127.0.0.1:4180/preview.html`. The regular site at port 4173 is separate.

- `experience-a.html`: directly readable capability text.
- `experience-b.html`: identical text with small static line diagrams.
- `experience-c.html`: always-visible capability summaries with an accessible three-panel workspace.
- Every variant has `en/` and generated `tw/` editions. Header language controls retain the variant.
- The normal navigation previews Home, Work, Notes, News, About and all existing detail pages with the shared spacing and typography adjustments. Its Experience destination uses A as the neutral baseline; it does not select a final design.

## Ownership and boundaries

`experience.mjs` imports the existing content, CV, honours and affiliation sources. It only owns prototype presentation labels and composition. All variants share the same records and chronology; there are no primary/secondary record groups. Existing personal prose and attributed impressions are preserved verbatim. The portrait is explicitly a placeholder. Union membership remains represented by the existing service record, avoiding duplication in credentials.

`experience.css` contains the new components. `build.mjs` transforms the owning rules in a **preview copy** of shared CSS and wraps the existing generated pages with comparison controls. It does not append corrective rules to production CSS or modify production templates. Its build output is ignored under `website/review/layout-prototypes/site`; a local symlink reuses published assets read-only. Rebuilding production first is unnecessary unless its source content has changed.

`preview.mjs` adds keyboard and click handling to C's workspace and works with the existing soft navigation. Native details elements own record disclosures. The preview disables CSS motion and uses instant anchor scrolling.

## Verification

The browser checker uses the installed Playwright module and Chrome; it does not install dependencies. If Playwright is not on Node's normal resolution path, set `PLAYWRIGHT_MODULE` to its existing module directory. `CHROME_EXECUTABLE` and `PREVIEW_URL` may override the local defaults.

```sh
node website/prototypes/verify.mjs
```

It checks all three variants in three languages at 320, 390, 768, 1440 and 1920px, with normal/light and large/dark states. It also checks eleven shared page types in three languages at desktop and mobile widths. Assertions cover record completeness, institution headings, visible supervisors, chronology, record-start alignment, padding, overflow, header collisions, local resource failures, native disclosures, keyboard tabs, soft navigation, old links, and frozen prose. Screenshots and JSON evidence are written under `website/review/layout-prototypes/`.

The production-file fingerprint check establishes that building and reviewing these prototypes has not replaced the existing generated website. External sources, audio-provider availability, PDF-internal interactions, and a final production integration are not certified by this preview check.

The compact revision uses a single reading block per record, inline desktop metadata, section-level rules only, and naturally wrapped mobile text. A uses labelled capability rows.
