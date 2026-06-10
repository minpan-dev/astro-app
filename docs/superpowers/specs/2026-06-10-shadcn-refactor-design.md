# Shadcn/ui Full Refactor Design

**Date:** 2026-06-10
**Status:** Approved

## Goal

Refactor all existing pages and components to maximize shadcn/ui component usage and minimize custom code. Every inline SVG, custom-styled link, and hand-rolled UI element should be replaced with a shadcn component or Lucide React icon.

## New shadcn Components to Add

| Component | Purpose |
|-----------|---------|
| `separator` | Dividers in detail pages, footer, homepage |
| `sheet` | Mobile slide-out navigation menu |
| `tooltip` | Hover tooltips on icon buttons |
| `skeleton` | Loading states for cards/pages (enhancement) |

Not added: `navigation-menu` — overkill for 2 nav links; desktop nav stays simple.

## Architecture Changes

### Component Tree (after refactor)

```
layouts/main.astro
├── Navbar.tsx          (modified: sheet for mobile, lucide icons)
│   └── ThemeToggle.tsx (unchanged, already uses shadcn button)
├── <slot />            (page content)
└── Footer.tsx          (rewritten from .astro: button, separator, lucide)
```

### Per-Component Changes

#### 1. Navbar.tsx
- **Desktop:** Blog/Projects links styled with shadcn button variant ghost visual styles
- **Mobile:** New hamburger menu button (Button + Lucide `Menu`) → Sheet slides from right
- **Sheet content:** Navigation links + ThemeToggle
- **Icons:** All inline SVGs replaced with `lucide-react`
- **Keep:** Scroll detection logic, fixed positioning, glass-morph background
- **New shadcn deps:** `sheet`

#### 2. Footer.astro → Footer.tsx
- **Rewrite:** Astro component → React component (to use shadcn hooks)
- **Social links:** shadcn `button` + `variant="ghost"` + Lucide icons (`Github`, `Twitter`)
- **Divider:** shadcn `separator` between social icons and copyright
- **Remove:** All inline SVGs
- **New shadcn deps:** `separator`

#### 3. Homepage (index.astro)
- **Social links (GitHub, Email):** shadcn `button` + `variant="outline"` + Lucide (`Github`, `Mail`)
- **Remove:** All inline SVGs, custom underline hover effects, custom `<a>` tags
- **New shadcn deps:** `separator` (already added for Footer)

#### 4. BlogCard.tsx & ProjectCard.tsx
- **Replace:** Inline SVG icon components → `lucide-react` (`Github`, `ExternalLink`)
- **Keep:** All existing shadcn usage (Card, Badge, Button) — already well-structured
- **No new shadcn deps**

#### 5. Blog List (blog/index.astro)
- No changes needed — already uses BlogCard via grid layout

#### 6. Project List (projects/index.astro)
- No changes needed — already uses ProjectCard via grid layout

#### 7. Blog Detail (blog/[slug].astro)
- **Tags:** Custom `<span>` → shadcn `badge`
- **No other changes** (blog detail has no external link buttons or complex layout)

#### 8. Project Detail (projects/[slug].astro)
- **Tags:** Custom `<span>` → shadcn `badge`
- **Back link:** Custom `<a>` → shadcn `button` + `variant="ghost"` + Lucide `ArrowLeft`
- **External links (GitHub, Live Demo):** Custom `<a>` → shadcn `button` (outline/primary) + Lucide (`Github`, `ExternalLink`)
- **Divider:** Custom `border-b` div → shadcn `separator`
- **Icons:** All inline SVGs → `lucide-react`

## Files to Modify

| File | Change Type |
|------|-------------|
| `src/components/Navbar.tsx` | Modify |
| `src/components/Footer.astro` | Delete |
| `src/components/Footer.tsx` | Create |
| `src/components/ThemeToggle.tsx` | Review only (already OK) |
| `src/components/ProjectCard.tsx` | Modify (icons only) |
| `src/components/BlogCard.tsx` | Review only (already OK) |
| `src/pages/index.astro` | Modify |
| `src/pages/projects/[slug].astro` | Modify |
| `src/pages/blog/[slug].astro` | Modify |
| `src/components/ui/separator.tsx` | Create (shadcn add) |
| `src/components/ui/sheet.tsx` | Create (shadcn add) |
| `src/components/ui/tooltip.tsx` | Create (shadcn add) |
| `src/components/ui/skeleton.tsx` | Create (shadcn add) |

## What Stays Unchanged

- `ThemeToggle.tsx` — already uses shadcn button
- `BlogCard.tsx` — already uses Card, Badge; no inline SVGs
- `blog/index.astro` — pure layout + card grid
- `projects/index.astro` — pure layout + card grid
- `src/layouts/main.astro` — only needs import updated from `Footer.astro` to `Footer.tsx`
- Content schemas, global CSS, utils
