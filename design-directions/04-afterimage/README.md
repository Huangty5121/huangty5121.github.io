# Afterimage

Direction 04 treats the site as a cinematic archive: one active artifact fills the atmosphere while titles and retrieval controls remain at the edges.

## Files

- `material-membrane.png` — primary full-bleed dark woven material
- `material-specimen.png` — secondary smoked-glass archive object
- `archive-page.png` — searchable dark archive
- `detail-page.png` — readable content-detail opening
- `PROMPTS.md` — reusable generation prompts

## Implementation judgment

The first version also does not need WebGL. Use the generated image as a large crop, CSS masking/gradients for tonal falloff, and GSAP for slow scale and position drift. A short video loop could replace the still later without changing the layout.

Three.js is justified only if the membrane must deform in real time with pointer movement. That raises performance, mobile, reduced-motion, and loading costs, so it should be a later enhancement rather than the foundation.
