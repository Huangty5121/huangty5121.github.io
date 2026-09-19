# Field Cabinet

Direction 03 treats the homepage as an edited field of objects. Categories exist only in the Index and metadata belongs to detail pages.

## Files

- `material-mesh.png` — primary pale woven material
- `material-metal.png` — secondary vermilion and oxidized-metal contrast
- `index-page.png` — searchable retrieval layer
- `detail-page.png` — first viewport of a content object
- `PROMPTS.md` — reusable generation prompts

## Implementation judgment

No lighting or WebGL module is required. The visual depth can be reproduced with real image assets, two-layer CSS shadows, a restrained paper/plaster texture, and small GSAP transforms. The objects should move only a few pixels and at most two degrees. WebGL would add complexity without materially improving this direction.

The images should be exported to AVIF/WebP for production. The plaster texture can be CSS noise; mesh and metal should remain photographic assets.
