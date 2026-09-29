# Tin-Yeh Huang — personal website

Active static output: `material-demo/dist/site/`. Historical experiments remain separate. Current local preview: http://127.0.0.1:4173/index.html . This is not a deployment.

## Publishing

The repository root contains the sources, but the real website root is `material-demo/dist/site/`. `vercel.json` builds and serves that directory, so the Vercel domain can open `/` and direct page URLs. The GitHub Actions workflow builds and publishes the same directory to GitHub Pages. In the repository's **Settings → Pages**, choose **GitHub Actions** as the build and deployment source. Until that setting is changed, the repository-root `index.html` redirects visitors to the preferred `tyhuang.hk` domain and declares it canonical; it is only a compatibility entrance and keeps the query/hash when JavaScript is available. The generated output includes `.nojekyll`.

The custom domain is currently served by Vercel; GitHub Pages should keep its `github.io` address. DNS and the Vercel project's domain attachment are separate from these repository files. After publishing, check `/`, `/en/about.html`, the image assets, and one original PDF on each host. Do not copy the site files into another nested folder or set Vercel's dashboard Root Directory to `website/`.

## Build and check

```sh
node website/build.mjs
node website/check.mjs
python3 material-demo/serve-demo.py
```

## Architecture

Six primary destinations: Home, Work, Notes, News, About, and Experience. Home places an identity introduction and the unchanged five-paragraph self-note directly below the harbour photograph, then continues to selected work and Notes. About starts with the Astra / GLM conversation reader; its sidebar and model selector choose the same unchanged, attributed text. A separate music shelf, illustrated drinks shelf, city-memory map and compact tools section follow. Experience now owns the sole full set of education, work/service, honours, credentials and peer-review records. Old About record and personal-note anchors are routed to their new pages.

The city map is a collection of places supplied by the owner, not a reconstructed itinerary. Every location has its own pin; there are no cluster/count markers, venue-address pins or connecting travel routes. Country/province labels remain explicit for the UK and Fujian. Beijing contains the exchange chapter and the owner-confirmed 三杯酒 / Boundary venues. Missing stories are deliberately brief unfinished pages. City selection opens a paper note; reduced-motion preferences suppress its blur. Notes and the city index continue to work without map tiles.

The drinks shelf displays six illustrations directly, with accessible invisible button surfaces on the glasses. A native drawer shows one drink at a time. The four reference recipes have visible source links and are distinct from the owner's unrecorded variations. Peaty Manhattan and Absinthe Martini retain the owner's names without invented proportions. `about-cabinet.mjs` owns the favourites and recipes; `places.mjs` owns personal place notes. The artwork is a generated editorial illustration, not a photograph of the owner's drinks.

Work contains seven publication records and two practice records. Editorial SVG covers are symbolic and never presented as research figures or project screenshots. Notes contains one unpublished industrial-design/modernization draft awaiting the owner's revision. Two practice pages have separate URLs and open directly from Work. Three original PDF readers are embedded within the site using a locally hosted, visually adapted official Mozilla PDF.js viewer. PDF source files are copied without modification. No extracted-page image output or per-page HTML reader exists. Paper records without supplied full text retain source links and accurate status.

All documents exist in three editions: zh-Hans, English, and Traditional Chinese (`/tw/`). The tw edition is generated at build time by converting the zh render with opencc-js; `tw/site.mjs` is a converted copy whose asset imports are rewritten to `../assets/`. `build.mjs` also prunes stale asset files from the committed dist tree and fingerprints `site.css`, `site.mjs`, and the hero photo into a `?v=` cache key. Normal HTML URLs work directly, including a subdirectory deployment. Same-language navigation retains the optional audio player and browser history, and refreshes the header language switcher. Contact opens options in place through a native popover. Same-page section links preserve normal scrolling without opening unrelated records. Theme and text size preferences are stored locally. The A+ control now changes the root type variable used by all component text, with the smaller 13px setting (15px in A+ mode) as default. Music does not autoplay. Native scrolling, native dialog keyboard behaviour, and reduced-motion support remain available.

The reader opens with an original PDF occupying the main viewport and a compact paper summary beside it on wide screens. Its initial PDF.js zoom is page-fit, so the first page is visible without scrolling the outer website; readers can still zoom, search, and change pages. On phones the PDF comes before the summary. The site palette draws from the material cover: restrained teal for interaction, green geographic surfaces, and warm clay for notes and accent markers. The page background is neutral; reduced-motion preferences stop interface motion.

## Sources

- `build.mjs`: trilingual documents, shared navigation, original PDFs, viewer skin, tw conversion, asset pruning, cache fingerprinting, compatibility redirects.
- `views.mjs`: authored home composition, content index, personal About and separate experience archive, project workspaces, readers.
- `content.mjs`: faithful public CV contributions layered over historical source records.
- `about-content.mjs`: paired About copy, personal reflection and real album metadata; Traditional Chinese is generated from the Chinese entries.
- `entries.mjs` / `cover-art.mjs`: shared entry records and abstract transparent SVG editorial illustrations; these are not research figures or photographs of personal work.
- `site.css` / `site.mjs`: responsive composition, local typography, browsing and disclosure, preferences, audio continuity, Leaflet map behaviour.
- `vendor/pdfjs`: official Mozilla prebuilt 6.3.289 with its Apache 2.0 licence.
- `assets`: locally hosted DM Sans and WenKai fonts (OFL), real album covers, hero photograph, and explicitly editorial cover images.
- `check.mjs`: local links/fragments, exclusions, absence of extracted PDF markup, original PDF SHA-256 equality, html lang codes, empty titles, tw simplified-character leaks, icon file presence, exact-case link resolution. Also checks paired content across source records, unique IDs, heading rank progression inside main, and typography/spacing token use including font shorthands. Vendor viewer markup is excluded from the site's one-H1 rule.

No private conversations, invented portraits, testimonials, metrics, dropped Management minor, or form-foundations artwork are presented as portfolio content. The generated cover is a site surface, not personal work. Some final publisher texts and project demonstration files were not supplied.

The persistent music corner opens in place with playback, seeking, and volume controls. It uses the existing official Apple Music preview (approximately 30 seconds), with no autoplay. The equalizer and record animation follow playback, and reduced-motion preferences suppress animation. Dark mode uses neutral charcoal; the map keeps a consistent light cartographic palette. The two practice detail pages use their abstract editorial covers alongside factual content.

Design decisions, examined display sites, and cover prompt: `reconstruction.md`. Current verification: `design-qa.md`, [layout spacing follow-up](review/layout-spacing-2026-09-26/REPORT.md), and [text/content audit](review/unification-2026-09-26/REPORT.md). `review/quiet-home/` records the earlier home inspection. `review/navigation/` retains earlier About/Contact/reader checks. `review/editorial/` and `review/reconstruction/` show superseded homepage layouts.

Project-local guidance: [`../AGENTS.md`](../AGENTS.md) points future site work to [`skills/personal-site-editor/SKILL.md`](skills/personal-site-editor/SKILL.md), with short references for page ownership and Notes editing. The current Notes article remains a draft in `industrial-note.mjs`; a Markdown source should become canonical when the owner approves a revision or new piece.

## Search and map, 25 September 2026

`tyhuang.hk` is the preferred public domain. Each live page generates a self-referencing canonical URL, reciprocal language links, a page title and description, and a shared SVG icon. Each URL serves its own language without a first-visit redirect. Redirect and 404 pages are `noindex`; `sitemap.xml` lists the primary pages in all three languages. The generated `robots.txt` points to the sitemap. Search engines may retain older snippets until they recrawl.

The September 25 institution-map and workbench composition has been superseded by the September 29 personal chapters above. The real album shelf, official preview, independent Work categories and source-based News remain. Read `skills/personal-site-editor/references/music.md` for music updates. Current geography and privacy boundaries are recorded in `references/geography.md`.

Shared layout, typography, language and file ownership rules: [`architecture.md`](architecture.md).
