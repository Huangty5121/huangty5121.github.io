# Tin-Yeh Huang — personal website

Active static output: `material-demo/dist/site/`. Historical experiments remain separate. Local preview: http://127.0.0.1:8772/site/index.html . This is not a deployment.

## Publishing

The repository root contains the sources, but the real website root is `material-demo/dist/site/`. `vercel.json` builds and serves that directory, so the Vercel domain can open `/` and direct page URLs. The GitHub Actions workflow builds and publishes the same directory to GitHub Pages. In the repository's **Settings → Pages**, choose **GitHub Actions** as the build and deployment source. Until that setting is changed, the repository-root `index.html` sends visitors from the GitHub Pages root to the existing nested site; it is only a compatibility entrance and keeps the query/hash when JavaScript is available. The generated output includes `.nojekyll`.

The custom domain is currently served by Vercel; GitHub Pages should keep its `github.io` address. DNS and the Vercel project's domain attachment are separate from these repository files. After publishing, check `/`, `/en/about.html`, the image assets, and one original PDF on each host. Do not copy the site files into another nested folder or set Vercel's dashboard Root Directory to `website/`.

## Build and check

```sh
node website/build.mjs
node website/check.mjs
python3 material-demo/serve-demo.py
```

## Architecture

Four primary destinations: Home, Work, Notes, and About. Home uses the material cover as an introduction, with direct Work and Notes entrances, a Hong Kong clock, two compact work previews, and a separate Notes entrance below. The repeated About section has been removed. Work uses a consistent illustrated directory; Notes has its own listing and reading page. About starts with the introduction, then a data-derived geographic locator for Beijing and the Pearl River Delta. Shenzhen and Hong Kong have a separate enlarged view because their city-centre points nearly overlap on the regional scale. A city filters the institutions; selecting one reveals the single canonical set of study and experience records. Institutions whose city is not recorded remain in a separate text group. Honours and credentials remain distinct. Map provenance and limits are in [`references/geography.md`](references/geography.md).

Work contains seven publication records and two practice records. Notes contains one unpublished discussion draft awaiting the owner's revision. Two substantive practice pages have separate URLs and can be reached from their Work disclosures. Three original PDF readers are embedded within the site using a locally hosted, visually adapted official Mozilla PDF.js viewer. PDF source files are copied without modification. No extracted-page image output or per-page HTML reader exists. Paper records without supplied full text retain source links and accurate status.

All documents have Chinese and English versions. Normal HTML URLs work directly, including a subdirectory deployment. Same-language navigation retains the optional audio player and browser history. Contact opens options in place through a native popover. Same-page section links preserve normal scrolling without opening unrelated records. Theme and text size preferences are stored locally. Music does not autoplay. Native scrolling, native dialog keyboard behaviour, and reduced-motion support remain available.

The reader opens with an original PDF occupying the main viewport and a compact paper summary beside it on wide screens. Its initial PDF.js zoom is page-fit, so the first page is visible without scrolling the outer website; readers can still zoom, search, and change pages. On phones the PDF comes before the summary. The site palette draws from the material cover: restrained blue for navigation, grey-green for geographic surfaces, and warm clay for notes and accent markers. The background has a soft material wash and a slow ambient shift; reduced-motion preferences stop the movement.

## Sources

- `build.mjs`: bilingual documents, shared navigation, original PDFs, viewer skin, compatibility redirects.
- `views.mjs`: authored home composition, content index, combined about/background, project workspaces, readers.
- `content.mjs`: faithful public CV contributions layered over historical source records.
- `entries.mjs` / `cover-art.mjs`: shared entry records and abstract transparent SVG editorial illustrations; these are not research figures or photographs of personal work.
- `site.css` / `site.mjs`: responsive composition, local typography, browsing and disclosure, bounded GSAP motion, preferences, audio continuity.
- `vendor/pdfjs`: official Mozilla prebuilt 6.3.289 with its Apache 2.0 licence.
- `vendor/gsap`: GSAP 3.14.2 / ScrollTrigger distributions. Original file headers retain attribution and the official licence link.
- `assets`: locally hosted DM Sans (OFL), institution marks, generated cover source and compressed web asset.
- `check.mjs`: local links/fragments, exclusions, absence of extracted PDF markup, original PDF SHA-256 equality. Vendor viewer markup is excluded from the site's one-H1 rule.

No private conversations, invented portraits, testimonials, metrics, dropped Management minor, or form-foundations artwork are presented as portfolio content. The generated cover is a site surface, not personal work. Some final publisher texts and project demonstration files were not supplied.

The persistent music corner opens in place with playback, seeking, and volume controls. It uses the existing official Apple Music preview (approximately 30 seconds), with no autoplay. The equalizer and record animation follow playback, and reduced-motion preferences suppress animation. Dark mode uses neutral charcoal. The Home material scene is a transparent cutout so it sits on both themes without an opaque rectangular background. The two practice detail pages use their abstract editorial covers alongside factual content.

Design decisions, examined display sites, and cover prompt: `reconstruction.md`. Current verification: `design-qa.md` and `review/quiet-home/`. `review/navigation/` retains earlier About/Contact/reader checks. `review/editorial/` and `review/reconstruction/` show superseded homepage layouts.

Project-local guidance: [`../AGENTS.md`](../AGENTS.md) points future site work to [`skills/personal-site-editor/SKILL.md`](skills/personal-site-editor/SKILL.md), with short references for page ownership and Notes editing. The current personal note remains a draft in the existing data source; a Markdown source should become canonical when the owner approves a revision or new piece.
