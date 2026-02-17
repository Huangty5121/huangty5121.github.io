# Frosty Neon — huangty5121.github.io

Personal portfolio & research hub for Tin-Yeh Huang (黄天野).  
Built with Astro, React, Tailwind CSS, and deployed on GitHub Pages.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Terminal — dashboard-style homepage with location, weather, status, recent signals & publications |
| `/about` | About — bio, contact, experience wall (brick-layout logos), education |
| `/lab` | Lab — research publications & projects |
| `/signal` | Signal — blog / writing index |
| `/signal/[slug]` | Individual signal post (Markdown) |
| `/playground` | Playground — moments (polaroid cards), music, experiments |

## Tech Stack

- **Framework**: [Astro](https://astro.build) v5 (SSG)
- **UI**: React 19, Framer Motion, GSAP
- **Styling**: Tailwind CSS 3 + custom design tokens (Frosty Neon theme)
- **Data**: YAML-driven content (`src/data/`, `src/content/`)
- **Deploy**: GitHub Pages via GitHub Actions

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/       # React & Astro components
│   ├── about/        # About page components (EmailPopover, ExperienceWall, WeChatPopover)
│   ├── effects/      # Visual effects (DotMatrixBg, Spotlight)
│   └── playground/   # Playground components (PolaroidCard, etc.)
├── content/          # Static content (location.yaml, status.yaml)
├── data/             # Data files (experience.yaml, publications, signals)
├── layouts/          # Astro layouts (OSLayout)
├── pages/            # Route pages
├── styles/           # Global CSS
└── utils/            # Utility functions
public/
├── fonts/            # Custom fonts (Geist, Geist Mono)
├── images/           # Static images & logos
└── icons/            # App icons
```

## Key Features

- Dark/light theme with OS-style UI chrome
- Dot-matrix code rain background (canvas-based, ultra-subtle)
- YAML-driven experience & publication data
- Responsive brick-layout logo wall with inline expand (desktop) / modal (mobile)
- Static location from `src/content/location.yaml` (no runtime IP detection)
- RSS feed at `/rss.xml`

## License

© 2026 Tin-Yeh Huang. All rights reserved.

