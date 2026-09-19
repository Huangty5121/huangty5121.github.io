# Layout logic

The layout should be controlled, not randomly scattered. It uses curated compositions plus a seeded constraint solver.

## Object model

```json
{
  "id": "item-01",
  "priority": 1,
  "relations": ["item-02"],
  "presentation": {
    "component": "instant-photo",
    "material": "instant-film",
    "scale": "focus",
    "preferredZone": "center",
    "rotationRange": [-2, 1],
    "annotationAnchor": "right-edge"
  }
}
```

Presentation is an editorial field, not a hard mapping from content category. A project is not automatically metal and a note is not automatically paper.

## Placement sequence

1. Reserve interface-safe areas for identity, Index, language, theme and text-size controls.
2. Select one focus object from editorial priority.
3. Choose one of a small set of authored constellations according to viewport ratio and visible item count.
4. Place the focus object first, then place two or three related objects around it.
5. Apply only narrow seeded variation: small offsets, `-2deg` to `2deg` rotation, and controlled overlap.
6. Resolve collisions while maintaining minimum gaps and a large negative-space region.
7. Assign depth explicitly. Shadows derive from depth and one shared light direction.
8. Compute annotation endpoints from the actual DOM object bounds. Recalculate them with `ResizeObserver` whenever layout changes.

The seed keeps a composition stable between visits and languages. A different seed is used only when the editorial arrangement is intentionally changed.

## Component vocabulary

- `InstantPhoto` — a real photo container with instant-film border and optional reverse caption
- `PaperCard` — white or black fibrous paper, printed, blind-embossed or handwritten
- `TextileSwatch` — stitched, woven or repaired material; used only when editorially relevant
- `MetalTag` — oxidized, etched, punched or heat-treated surface
- `PhotoPrint` — borderless photographic print
- `ScreenFragment` — a screenshot or moving-image frame without fake physical material
- `Annotation` — one-font digital label anchored to a real object or image feature

## Motion

- Hover: object rises `4–8px`, rotates toward zero and strengthens its contact shadow.
- Select: use GSAP Flip to expand the object into its detail layout.
- Annotation: reveal only labels related to the active object.
- Reduced motion: remove parallax and use a short opacity change.

Three.js is optional. If added later, keep it behind the DOM and use it only for one low-resolution deforming surface or moving light. Load it dynamically, cap device pixel ratio, pause it when hidden and retain the static image fallback.

