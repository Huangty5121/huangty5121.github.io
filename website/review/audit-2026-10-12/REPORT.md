# 12 October audit and next revision plan

This pass is inspection and planning only. It does not mark the redesign accepted. The working tree includes concurrent Notes/content changes; no source or generated site files were edited by this audit. Screenshots and results reflect the locally served site during this pass, not a pinned release.

## Observed results

- Previous matrix completed 864 combinations: 849 passed the measured checks; 15 About cases timed out waiting for the full load event. All failures in that matrix are navigation timeouts, not measured horizontal overflow. The matrix covers the original 18 route types, not the three newly added article routes.
- Retried 33 interaction scenarios using DOMContentLoaded for About, rather than waiting for all external map tiles. All 33 passed. This establishes interaction availability, not a resolution of the 15 load timeouts.
- Additional mobile Chrome probes: navigating from the menu to the current page closed the menu; album keyboard End selected the final album with zero document scroll displacement; one native horizontal touch gesture did not change the selected album.
- At 320 x 568 the menu has 658px of content; it scrolls vertically, has no horizontal overflow, and its last language option remains reachable. Background body scrolling is locked.
- Simulated indefinitely pending tile requests: 12 pins visible, status empty, city-text fallback hidden. Explicit network-error fallback passes, but delayed requests have no visible state or independent city entrance.
- Font cmap inspection found missing CJK glyphs in the newly added writing-moon, writing-knowing and writing-understanding pages, plus two characters in Home and Notes per Chinese edition. About did not have missing CJK glyphs in this check. Font corpus currently reads top-level JS and legacy factual data, not Markdown article bodies.

## Content and visual findings

1. Hong Kong has a working 2:1 composition and owner photographs, but its side paragraph only describes photo authorship. The requested independent text about the owner's relationship to Hong Kong is not complete. Do not fill the column with invented sentiment or duplicate the frozen homepage self-note.
2. About still uses repeated large section intervals even when only a short paragraph accompanies small objects. Establish the relationship between friends, bars, cabinet and records before choosing each transition's spacing.
3. The music section still spends three separate vertical bands on controls, selected metadata and collection statistics. Consolidate controls/count with the shelf edge; keep title/artist/source immediately below, without changing overlap geometry on selection.
4. Menu is now operable and grouped, but repeats Contact as both a section label and the action label. Make action wording specific (contact methods versus contact card). Preserve current language, 44px targets and scrollable short-screen behavior.
5. English Experience remains a long, predominantly left-aligned sequence with dates at the far right. The right portion is underused. A desktop role/date/description grid should reduce unnecessary vertical length while preserving all entries and the compact toggle. Mobile keeps sequential date, identity, summary.
6. Short vertical labels should identify a place or period; generic labels such as About or People & company do not need rotation just to add decoration.

## Ordered revision plan

### A. Reliable typography and resource states

- Generate CJK subsets from final rendered text across all three editions, including Markdown articles; retain SC/TC distinction. Add a cmap coverage check so new article text cannot silently introduce fallback glyphs.
- Keep 15px normal / 17px large body, DM Sans for English narrative, Plex Mono for selected navigation/metadata only, and WenKai limited to existing personal prose.
- Make the 12 city text entrances always available in a compact auxiliary row. Add loading, delayed (after 5 seconds), partially loaded and failed basemap states; a successful tile must not erase unrelated failure state. Clean up timers when leaving the page.
- Verify document readiness and basemap readiness separately. Test delayed, partial, failed and recovered tile requests.

### B. Complete About content, then tune its proportions

- Recover specific owner-authored Hong Kong statements from the earlier conversation materials, distinguishing pasted AI text from owner text. Record source and proposed public phrasing privately; do not publish private chat excerpts or manufacture memories.
- Replace the photo-authorship paragraph with supported independent narrative. If source recovery remains unsuccessful, explicitly keep this as an unfinished content item; do not certify the Hong Kong section complete.
- Fit the existing left spanning composition and right photo/text stack to actual paragraph lengths. Keep captions for attribution, not as narrative substitutes. Phone order remains main text/photo, gallery, short narrative.
- Reduce redundant gallery labels. Use place/year where it supplies context. Maintain different spans for campus and friends photographs without duplicating a mirrored template.

### C. Refine navigation and media controls

- Remove duplicated Contact wording, retain a clear contact-method action and card action.
- Combine record previous/next/count and collection statistics into one shelf-related strip. Keep album title/artist/source below; no margin animation or document-level scrollIntoView.
- Extend touch checks to drag ending over a cover, pointer cancellation, rapid selection, last cover visibility, keyboard focus and restored-page state. Verify gallery lightbox previous/next, endpoints and return position.

### D. Broaden visual review without another wholesale rewrite

- Inspect Home first screen and the complete river/star scene at actual phone size; retain side-by-side name/portrait and frozen prose.
- Prototype one representative desktop Experience research row and one education row with the real longest English titles, then apply the shared grid if readable at 768/1440 and large text.
- Keep Work's primary/secondary/index hierarchy and long-form reading measures. Do not extend About's photo-grid treatment into papers or articles.
- Add the three new article routes to regression coverage, then capture continuous desktop/mobile views of Home, About, Work, Experience and the new Notes pages. Record aesthetic findings separately from functional results.

## Boundaries

No push or deployment. No new backend. No wholesale rollback. Preserve current Student introduction and historical Student Representative service. Preserve original PDFs and frozen personal/impression text. WeChat QR remains unsupplied. Actual-device Safari/iOS verification has not been performed; Chrome touch emulation is not equivalent.

## Added typography pass (owner's explicit follow-up)

Measured 96 page/mode combinations: eight representative routes, three editions, 390/1440 widths, normal/large text. Raw computed size, weight, line-height, declared font stack and width are in typography.json. Declared font-family is not proof of actual per-glyph font use; cmap coverage was checked separately.

Phone normal-mode examples: Home name 24px; Experience name 22.5px with English secondary name 18.75px; card name 30px; Work primary title 21px; ordinary Work/News item titles 18.75px; Notes item titles 16.875px. Body is generally 15px, but line heights range from 25.5px to 29.25px. These are observed differences, not all defects: the card identity may legitimately be larger. Review reading role and neighboring content rather than equating HTML heading level with visual size.

Next typography decisions: keep body 15/17px; set ordinary list-item titles to one restrained role near 17px while preserving genuinely featured titles near 20–21px; keep chapter headings near 19px and distinguish quiet section labels at 13–14px. Check the oversized secondary English name in Experience. Review body line-height by genre (short factual descriptions around 1.7; sustained Chinese prose around 1.85–1.95) and remove redundant surrounding space rather than compressing every paragraph. Maintain 44px hit areas independently of text size. Review nested spans (notably the Hong Kong title), controls, labels and modal text explicitly in the subsequent exhaustive pass: this 96-case sample is not complete font-size coverage.
