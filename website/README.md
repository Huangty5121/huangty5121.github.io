# Tin-Yeh Huang — personal website

Active static output: `material-demo/dist/site/`. Historical experiments remain separate. Local preview: http://127.0.0.1:8772/site/index.html . This is not a deployment.

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

Five primary destinations: Home, Work, Notes, News, and About. Home opens with a Victoria Harbour night photograph (Unsplash, pourya gohari), the owner's name, a Hong Kong clock, two work previews, and a material cutout beside Notes. Work groups journal/proceedings records, workshop/preprint records, and practice. Its first paper has a larger editorial illustration; the remaining rows keep publication metadata in a separate column. The two practice pages read as case notes rather than tabbed panels. Notes has its own article route. About starts with a short introduction and a full-width map; city choices and visible organisation logos follow it. Selecting an institution reveals the shared study and experience records, with longer experience detail folded away. Honours, credentials, and reviewing remain below. The personal thought appears in a compact browser-window composition beside three real album covers. Map provenance and limits are in [`references/geography.md`](references/geography.md).

Work contains seven publication records and two practice records. Editorial SVG covers are symbolic and never presented as research figures or project screenshots. Notes contains one unpublished industrial-design/modernization draft awaiting the owner's revision; the short reflection on simplicity now lives only in About. Two practice pages have separate URLs and open directly from Work. Three original PDF readers are embedded within the site using a locally hosted, visually adapted official Mozilla PDF.js viewer. PDF source files are copied without modification. No extracted-page image output or per-page HTML reader exists. Paper records without supplied full text retain source links and accurate status.

All documents exist in three editions: zh-Hans, English, and Traditional Chinese (`/tw/`). The tw edition is generated at build time by converting the zh render with opencc-js; `tw/site.mjs` is a converted copy whose asset imports are rewritten to `../assets/`. `build.mjs` also prunes stale asset files from the committed dist tree and fingerprints `site.css`, `site.mjs`, and the hero photo into a `?v=` cache key. Normal HTML URLs work directly, including a subdirectory deployment. Same-language navigation retains the optional audio player and browser history, and refreshes the header language switcher. Contact opens options in place through a native popover. Same-page section links preserve normal scrolling without opening unrelated records. Theme and text size preferences are stored locally. Music does not autoplay. Native scrolling, native dialog keyboard behaviour, and reduced-motion support remain available.

The reader opens with an original PDF occupying the main viewport and a compact paper summary beside it on wide screens. Its initial PDF.js zoom is page-fit, so the first page is visible without scrolling the outer website; readers can still zoom, search, and change pages. On phones the PDF comes before the summary. The site palette draws from the material cover: restrained blue for navigation, grey-green for geographic surfaces, and warm clay for notes and accent markers. The page background is neutral; reduced-motion preferences stop interface motion.

## Sources

- `build.mjs`: trilingual documents, shared navigation, original PDFs, viewer skin, tw conversion, asset pruning, cache fingerprinting, compatibility redirects.
- `views.mjs`: authored home composition, content index, combined about/background, project workspaces, readers.
- `content.mjs`: faithful public CV contributions layered over historical source records.
- `entries.mjs` / `cover-art.mjs`: shared entry records and abstract transparent SVG editorial illustrations; these are not research figures or photographs of personal work.
- `site.css` / `site.mjs`: responsive composition, local typography, browsing and disclosure, preferences, audio continuity, Leaflet map behaviour.
- `vendor/pdfjs`: official Mozilla prebuilt 6.3.289 with its Apache 2.0 licence.
- `assets`: locally hosted DM Sans and WenKai fonts (OFL), real album covers, hero photograph, and explicitly editorial cover images.
- `check.mjs`: local links/fragments, exclusions, absence of extracted PDF markup, original PDF SHA-256 equality, html lang codes, empty titles, tw simplified-character leaks, icon file presence, exact-case link resolution. Vendor viewer markup is excluded from the site's one-H1 rule.

No private conversations, invented portraits, testimonials, metrics, dropped Management minor, or form-foundations artwork are presented as portfolio content. The generated cover is a site surface, not personal work. Some final publisher texts and project demonstration files were not supplied.

The persistent music corner opens in place with playback, seeking, and volume controls. It uses the existing official Apple Music preview (approximately 30 seconds), with no autoplay. The equalizer and record animation follow playback, and reduced-motion preferences suppress animation. Dark mode uses neutral charcoal; the map keeps a consistent light cartographic palette. The two practice detail pages use their abstract editorial covers alongside factual content.

Design decisions, examined display sites, and cover prompt: `reconstruction.md`. Current verification: `design-qa.md` and `review/quiet-home/`. `review/navigation/` retains earlier About/Contact/reader checks. `review/editorial/` and `review/reconstruction/` show superseded homepage layouts.

Project-local guidance: [`../AGENTS.md`](../AGENTS.md) points future site work to [`skills/personal-site-editor/SKILL.md`](skills/personal-site-editor/SKILL.md), with short references for page ownership and Notes editing. The current Notes article remains a draft in `industrial-note.mjs`; a Markdown source should become canonical when the owner approves a revision or new piece.

## Search and map, 25 September 2026

`tyhuang.hk` is the preferred public domain. Each live page generates a self-referencing canonical URL, reciprocal language links, a page title and description, and a shared SVG icon. Each URL serves its own language without a first-visit redirect. Redirect and 404 pages are `noindex`; `sitemap.xml` lists the primary pages in all three languages. The generated `robots.txt` points to the sitemap. Search engines may retain older snippets until they recrawl.

About uses OpenStreetMap tiles with WGS-84 institution pins. The map comes first; city filters and organisation logos follow it, and no record is expanded on entry. The three real album covers form a compact shelf with a small hover lift that does not reflow neighbouring content. The personal note sits in a theme-aware browser-style window. Work has no search or sort controls for its nine records; News no longer lists the site redesign as a personal update.
