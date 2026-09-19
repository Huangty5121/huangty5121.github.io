# Personal site reconstruction — 18 September 2026

The previous design was rejected: changing the palette did not change its CV-led structure, oversize headings, passive lists, or PDF experience. This version replaces that structure.

## Decisions and their consequences

- Home is a composed introduction, not a shortened CV. Research, tooling, a personal draft, and social innovation coexist at different scales. The home composition is authored independently of the index filters.
- The user confirmed that the material image should remain a restrained cover. No hotspots or project categories are attached to the material sheets. The generated image is a site surface, not a claimed personal artwork.
- The Index contains seven paper records, two practice records, and one writing draft. Search and filters help retrieval, without deciding the home layout. Short records stay here rather than creating thin detail pages.
- About combines identity, studies, institutions, appointments, public service, honours, and credentials. Institution buttons show the relevant studies and records beside the same stable grid. Qiyuan and Iluvatar lead to the same joint-training record. Studies and appointments remain factually distinct.
- Two substantive practice pages have their own URLs. The NineToothed page switches between three actual contribution areas. No fabricated screenshots, demos, or code are presented as personal work.
- Each of the three available papers has a site reader using the original PDF through Mozilla's official viewer. Original files remain byte-for-byte unchanged. No extracted-page images or per-page HTML are produced. The reader retains text selection, find, page navigation, zoom, outline, and save.
- Small clear interface typography and restrained headings take priority over the giant display typography seen in some references. DM Sans is hosted locally; Chinese uses system fonts. Image-led home surfaces use limited serif contrast, not arbitrary font mixing.
- Native vertical scrolling remains intact. GSAP moves only the cover image and illustrative kernel cells; institution choices, navigation, and links are not hover-translated. Reduced-motion preferences disable these effects.
- Same-language navigation replaces only page content while preserving ordinary HTML URLs, browser history, and the audio element. Music starts only after a user action. Language switches retain ordinary document navigation.

## References examined and what was selected

These are evidence of design possibilities, not copied proprietary assets or proof that this site has won an award.

- [Aristide Benoist](https://aristidebenoist.com/folio-v1): coherent project browsing with a main visual and secondary index. Keep the relationship, avoid copying giant project typography.
- [Thierry Chopain](https://thierrychopain.com/): imagery creates personal recognition before a résumé. Keep image priority; avoid giant type.
- [Unseen](https://unseen.co/): a consistent visual language across scenes. Avoid an entrance gate or unsolicited audio.
- [GSAP Showcase](https://gsap.com/showcase/): actual authored motion systems and navigable websites, rather than a list of effects. Local GSAP 3.14.2 / ScrollTrigger power bounded effects.
- [Codrops Grid to Slideshow](https://tympanus.net/Development/GridToSlider/): tested a thumbnail opening into a focused view. Useful for a future media collection when authentic media exists; not a reason to turn sparse records into a slideshow.
- [Codrops Sticky Grid Scroll](https://tympanus.net/Tutorials/StickyGridScroll/): progressive image relationships within a scrolling layout. Avoid requiring pinned scrolling for basic content access.
- [Aceternity Tabs](https://ui.aceternity.com/components/tabs): tested real content switching. Applied the fixed-control / changing-content relationship to the project workspace.
- [Aceternity Expandable Cards](https://ui.aceternity.com/components/expandable-card) and [Apple Cards Carousel](https://ui.aceternity.com/components/apple-cards-carousel): useful retrieval and disclosure patterns. Institution selection uses the relationship without importing promotional card styling or the React dependency tree.
- [Motion Primitives](https://motion-primitives.com/): examined the object-detail dialog and compact view controls. Keep coherent transitions and small interface typography.
- [React Bits](https://reactbits.dev/): examined creative navigation and its component catalogue. Decorative backgrounds and magnetic controls do not solve this site's content problem.
- [Mozilla PDF.js](https://mozilla.github.io/pdf.js/getting_started/): official prebuilt viewer 6.3.289, locally hosted and visually adapted.

## Generated cover and prompt

Tool: built-in imagegen. Original file: `assets/folio-scene-v3.png`; web asset: `assets/folio-scene-v3.webp` (1536 × 1024, about 101 kB).

Direction used for generation: a quiet editorial studio composition of four thin upright overlapping material surfaces — warm white fibrous paper, dark brushed metal with a fine machined edge, a translucent smoke-blue polycarbonate sheet, and a smaller taupe textile surface — on a warm grey seamless floor with natural side light, fine contact shadows, asymmetrical spacing, and a small area of negative space. No text, logos, UI, portrait, product claims, or fabricated personal artwork.

This is an illustrative site identity. It is not a research result or one of the user's form-foundations works.

## Verification boundary

Record live browser checks in `design-qa.md`. Static references and unchanged PDF checks do not establish aesthetic acceptance, real visitor outcomes, deployment, or Safari/iOS compatibility.
