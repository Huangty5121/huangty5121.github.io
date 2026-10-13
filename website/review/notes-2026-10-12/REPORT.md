# Notes draft integration — 12 October 2026

## Editorial status superseded — 13 October 2026

The author rejected all three Chinese drafts as insufficiently developed. They are not an accepted foundation for expansion or translation. The new authorized workflow begins with a private moon materials-and-disagreements discussion, then structure and exploratory prose after that discussion. English bodies remain pending. The local site still displays the previous drafts; no replacement article is claimed. Verification below describes the earlier technical integration, not literary acceptance or a fresh test run.

## Delivered locally

- Three Chinese Markdown drafts: 月亮, 听《知道》, 说到理解. Each contains approximately 1,200–1,300 Han characters before references. These earlier editorial drafts have since been rejected; the former length target no longer governs rewriting.
- Shared register supplies Home, Notes and all three reading routes. Simplified and Traditional Chinese bodies are available. English routes have English metadata and an explicit pending-translation notice with Chinese links; **English bodies are not yet written**, because the requested workflow requires Chinese confirmation first.
- Private provenance and paragraph mapping are in root `.private-notes/2026-10-12/source-audit.md`, excluded from Git and output. Public source references accompany the relevant essays. The third essay's employment example is explicitly hypothetical.
- Original industrial-design draft remains at writing-modernization.html, without Home/index promotion. No new imagery or changes to personal self-description, Work, Experience or original PDFs.

## Verification performed

- `node website/build.mjs` and `node website/check.mjs`: **147 HTML pages, 2,175 local references, zero failures**; all three original PDFs byte-identical.
- Notes checks include source-to-output identity, unique IDs/routes/source paths, register order, actual dates, language routes, return links, sitemap entries, pending-language honesty, raw HTML and dangerous-link handling, and private-provenance exclusion.
- `tools/verify-notes.cjs`: **120 page states, zero failures**. Five affected routes × three editions × two widths (320/1440) × two themes × two text sizes. Verified overflow, one H1, active navigation, body/pending content, runtime errors and local request failures.
- Additional 390px interaction path: Home → moon → Notes → knowing → mobile menu → A+ → theme → English → Traditional Chinese. Preferences persist; same-language navigation preserves the audio element. Passed.
- Inspected real screenshots of the Traditional Chinese Notes index at desktop and the moon article at narrow width. Images are in this directory, ignored by Git.
- Compared protected content sources against the clean starting HEAD: unchanged. Compared every existing generated non-Notes HTML page after normalizing CSS/JS cache hashes and excluding the Home Notes section: **no unrelated content differences**.

## Limits and next step

No author acceptance, English prose, publication, push, physical-device/Safari test or complete accessibility audit is claimed. First discuss the new source material and substantive disagreements with the author, then develop new Chinese prose. Only after Chinese confirmation should English Markdown sources be authored and registered, followed by fresh checks. Technical success does not establish that the drafts match the author's intended voice.

Build prerequisites: npm ci --prefix website --ignore-scripts. GitHub Actions and Vercel's build command include this step; neither service was invoked or deployed.

Local preview started on 127.0.0.1:4175, serving only material-demo/dist/site. The private audit cannot be reached through that server root.
