# Updating the listening corner

Use this workflow for a request such as “add Gareth.T's pale pink” or “add this song and what it means to me”. This is an agent editing workflow for this repository, not a runtime LLM or a scheduled automation.

## Ownership

- `website/about-content.mjs`: `aboutAlbums` is the ordered release list. Required fields: `title`, `artist`, `year`, `url`, `cover`. Optional `kind: 'single'` distinguishes singles; `track` identifies a requested song inside an album. Existing album objects must be reused when adding another song from the same release rather than duplicating its cover. Extend `track` to a tracks array and update its renderer if multiple selected tracks are needed.
- `website/assets/albums/`: square official artwork. Save a stable local filename. Record the release source URL in the data. Never use generated substitutes for actual covers.
- `website/views.mjs`: renders one continuous shelf with a shared selected-release caption. Do not divide releases into rows of three or repeat a catalogue under the covers. Keep metadata out of this template.
- `website/site.css`: shelf overlap, hover/focus reveal and shared typography roles. Additional songs should not require per-item CSS.
- Current single-track preview configuration lives in `material-demo/dist/desk-config.mjs`; controls live in `website/build.mjs` and `website/site.mjs`. Album source links and the persistent preview are different actions. Only change the preview when requested and an official preview URL is verified; never claim full playback.

## Update

Resolve artist, release title, edition and year against the artist/label or an official music service. A requested song can be on an album: 回留 / Revisited belongs to 梦想家 / The Dreamer (2024). 浅粉红 / pale pink (2026) is a single release. 黑马 / The Dark Horse (2024) is an album. Do not silently call every song an album. If there are genuinely multiple matches, ask for the link while proceeding with resolved items.

Use official square artwork (for Apple artwork use its square rendition, not the wide social-share image). Check the downloaded image visually. Add/update one data entry, retaining existing order unless the owner requests another order. Show the requested song under its album title when applicable.

Listening notes are first-person content: use the owner's supplied prompt/chat as the basis. Do not infer what they feel, how often they listen, or what a record means to them from music-service editorial descriptions. Keep paired Simplified Chinese and English copy in `about-content.mjs`; Traditional Chinese is generated. The left side of the music section can accommodate a short supplied reflection. If none is provided, keep the neutral existing introduction.

## Verify

Run `node website/build.mjs` and `node website/check.mjs`. Inspect real desktop and 320–390px browser views with the new item count. Check every cover, source link, shared title caption, hover expansion, keyboard focus and touch-accessible cover links. A seventh entry extends the same horizontally scrollable shelf without overflowing the page. Check dark mode and A+ after layout changes. Report changes locally; publishing requires an explicit publishing request.
