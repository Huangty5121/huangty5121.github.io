---
name: listening-notes
description: Use when adding music to this personal website, discussing the style of selected records, requesting collection or listening statistics, or turning the owner's listening reflections into public notes.
---

# Listening notes

This skill belongs to the personal website in this repository. Use it when the owner adds songs, asks what connects their music choices, wants a small listening summary, or supplies a listening reflection. Read `../../architecture.md` for the active site and `../personal-site-editor/references/music.md` for shelf implementation. This is an editing workflow executed by the assistant when prompted; the site does not run an LLM or observe private listening history.

## Sources and boundaries

- `../../about-content.mjs` → `aboutAlbums`: authoritative public shelf. It contains releases, not a complete list of played songs. `track` identifies a chosen song inside a release; it does not add another album.
- `../../references/listening-analysis.md`: dated evidence and working analysis, outside the generated public site. Keep source facts, interpretation and owner-supplied feelings visibly distinct here.
- `../../assets/albums/`: genuine cover images. Reuse the release entry when adding another song from that release.
- Private listening exports stay outside published site assets. Summarize only the fields needed; publish an aggregate when the owner requests it, not the raw history.

## When songs are added

Resolve the exact artist, release, song, version and year using artist/label or official service pages. Watch for albums and singles with the same title, storefront duplicates and live/remastered versions. Read the result before updating data. Keep unresolved details pending rather than assigning a genre or version from the cover.

Update the shelf and recompute the collection summary with:

```sh
node website/skills/listening-notes/scripts/summarize.mjs
```

The helper reads the current shelf each time. It deduplicates Apple release IDs across storefronts and labels counts as **collection entries**. Run it after additions instead of manually maintaining totals. `kind` omitted means album under the current shelf schema. Report release-year distribution as release years, never years in which the owner listened.

## Style analysis

Work from specific records, not the artist's whole reputation. Identify a few supported relationships: voice, arrangement, rhythm, lyrical perspective, language, era or contrast between selected songs. Link the primary sources beside those observations. Storefront categories are broad metadata; they do not establish that every track sounds alike. Do not infer a listener's personality, emotional needs or preferred mood from genre, lyrics or the About prose.

For a small shelf, use a short connected paragraph with examples. If giving tag counts, specify the denominator and whether tags overlap; unknown tags stay unknown. Distinguish “the current shelf contains” from “you listen most to.” Do not manufacture audio features, BPM, listening frequency or percentages from cover art or search snippets. Audio-specific judgments require actually hearing the relevant material or a cited musical description.

## Small statistics

With only shelf data, show useful modest totals: releases, artists, albums/singles, release years and any explicitly selected tracks. Do not expand albums into assumed listened-to songs.

With an owner-provided listening export, inspect its actual schema first. Agree or use the requested period and time zone; distinguish play events, completed plays and duration when those fields exist. Deduplicate according to event IDs or export semantics, not title alone. Missing duration stays missing, never zero. Explain the count unit beside any published statistic. A play-count ranking requires play records.

## Feelings and public wording

Use the owner's words about the music as the material. Private examples offered to help you understand them are not automatically public sentences. If no listening feeling has been supplied, finish metadata and collection analysis, then ask one concrete question only if a personal note is needed (for example, which moment or line they want to keep). Do not fill the space with generic “healing,” nostalgia, or imagined late-night listening.

Keep public notes paired in Simplified Chinese / English in `about-content.mjs`, generating Traditional Chinese normally. Add an optional paired `listeningNote` only when there is real material to put there; include the source wording/context in the working analysis. If rendering that new field, check the above-cover caption height and longer text rather than assuming the current metadata-only label accommodates a paragraph. An overall listening reflection may live beside the shelf when supplied. Avoid turning the corner into an analytics dashboard or a personality profile.

## Completion

For a music request, carry through the relevant steps: data → sources → analysis/statistics → public note when supported → build and visual inspection. Return the actual changes and any remaining personal input; do not report skill installation as if analysis or writing has happened. Keep the compact spreading shelf, anchored above-cover caption, native keyboard focus, touch selection and explicit source link. Verify first/last covers, longer metadata, new item count, light/dark, small/large text and 320px. Run `node website/build.mjs`, `node website/check.mjs`, and `git diff --check` after site changes.
