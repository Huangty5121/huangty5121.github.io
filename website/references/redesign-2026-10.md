# Source and design notes — 10 October 2026

The owner's continuing messages override the original large-type / saturated-color proposal. Current preference: compact editorial type, white/neutral dark ground, purposeful grid proportions, image-led color, a left-name/right-transparent-face opening. The full redesign remains in scope; later requests refine it.

## Visual references

- https://order.design/project/domaine — grey core with restrained accents; grid proportion changes; short text against broad imagery. Reference screenshots supplied by owner. Do not copy the Domaine symbol or proprietary type artwork.
- Order's image loading was inspected in Chrome on 10 October: `.loadanim` uses `filter .75s` and `opacity .5s`, starts at `blur(10px)`, with a small LQIP underneath. This site uses those transition timings on pending image loads, without artificial scroll replay. It does not yet ship separate LQIP assets. Reduced-motion users receive sharp images without transitions.
- https://www.nngroup.com/articles/in-page-links/ — orientation and shortcuts within long documents.
- https://design-system.service.gov.uk/components/accordion/ — don't hide essential scanning content unnecessarily. Experience now exposes all records in their categories, with a sticky contents index and optional compact presentation. Only extra record detail is disclosed.

## Documentary images

Owner explicitly directed use of their Exchange Learning Report, section III, Figures 8 and 10. Four images extracted/copied unchanged: `life/xinya-courtyard.png`, `life/tsinghua-snow.png`, `life/beijing-friends.jpg`, `life/beijing-company.png`. Associations follow the report. No other people's names inferred. The student-ID illustration in the PDF is not used. English excerpts come from section III; Chinese text translates those excerpts. Shared gallery labels replace repeated descriptive captions.

`face-now.png` is the owner-supplied transparent PNG from Downloads, copied unchanged. All other drawings retain their pre-existing provenance in about-illustrations.md. No new image generation was used in this redesign.

## Fonts

Noto Sans SC and TC variable fonts: Google Fonts repository `ofl/notosanssc` and `ofl/notosanstc`; SIL OFL in `assets/OFL-NotoSansCJK.txt`. Subsets are created with fontTools `pyftsubset`, all layout features retained, WOFF2 output. Run `node website/tools/font-corpus.mjs /tmp/site-font-chars.txt` after public-text edits, then subset both upstream TTF files using `--text-file=/tmp/site-font-chars.txt --flavor=woff2 --layout-features='*'`. Original full TTFs are build inputs, not published. DM Sans and WenKai retain their own licenses.

## Contact

Existing public email, LinkedIn, GitHub and Scholar reused. Owner explicitly authorized the HK number starting 9449 for WhatsApp. Click-only URL construction avoids printing it in page text, HTML anchors or structured data; the client code and destination remain discoverable. It is not secrecy or bot protection. Official format: https://faq.whatsapp.com/5913398998672934/ . WeChat QR is pending owner supply; no invented ID or nonfunctional button is published.

Brand SVGs: GitHub and Google Scholar from Simple Icons current package; LinkedIn from Simple Icons 11 (CC0). Email outline follows Lucide Mail (ISC). Text substitutes GH/S/@ removed.
