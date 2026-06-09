# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An Astro v6 + React 19 application with Tailwind CSS v4, shadcn/ui (Radix UI Nova style), and TypeScript 6. Uses pnpm as the package manager. Requires Node >= 22.12.0.

## Commands

```bash
pnpm run dev          # Start dev server (astro dev)
pnpm run build        # Production build (astro build)
pnpm run preview      # Preview production build (astro preview)
pnpm run lint         # ESLint on all files
pnpm run format       # Prettier format on TS/TSX/Astro files
pnpm run typecheck    # Type checking (astro check)
pnpm run astro        # Astro CLI passthrough
```

To add new shadcn/ui components:
```bash
pnpm dlx shadcn@latest add <component-name>
```

## Git Conventions

### Git Hooks (husky)
- **pre-commit**: Runs `lint-staged` — formats (Prettier) and lints (ESLint) staged `.ts/.tsx/.astro` files. Commit is blocked if checks fail.
- **commit-msg**: Runs `commitlint` with `@commitlint/config-conventional`. Enforces [Conventional Commits](https://www.conventionalcommits.org/) format.

### Commit Message Format
All commits MUST use: `type: description`

Common types: `feat` `fix` `docs` `style` `refactor` `perf` `test` `chore` `ci` `build`

Examples:
- `feat: add user authentication`
- `fix: resolve button alignment issue`
- `chore: update dependencies`

## Code Architecture

### Routing (file-based)
- **`src/pages/`** — Astro file-based routing. Each `.astro` file maps to a route.
- **`src/layouts/`** — Shared page layouts wrapping `<slot />` for page content.

### Components
- **`src/components/ui/`** — shadcn/ui React components (Radix UI primitives). Imported as `@/components/ui/<name>`.
- React interactive components use Astro's `client:load` (or other client directives) when rendered in `.astro` pages.

### Styling
- **`src/styles/global.css`** — Tailwind CSS v4 entry point. Imports `shadcn/tailwind.css` and `tw-animate-css`. CSS variables (oklch) for theming with `.dark` class support.
- Path alias `@/` maps to `./src/*` (configured in `tsconfig.json`).

### Utilities
- **`src/lib/utils.ts`** — `cn()` helper combing `clsx` and `tailwind-merge` for conditional class merging.
- Font: Geist Variable (`@fontsource-variable/geist`) as sans-serif default.
- Icon library: Lucide React.

### Key Config Files
| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro config: React integration, Tailwind Vite plugin |
| `tsconfig.json` | TypeScript strict, path alias `@/*` |
| `eslint.config.js` | ESLint flat config: recommended JS/TS + React Hooks |
| `.prettierrc` | Prettier with Astro + Tailwind CSS plugins |
| `components.json` | shadcn/ui configuration (component registry, aliases) |
| `.mcp.json` | MCP server configs: shadcn (component tools), astro-docs (documentation) |

### Adding New Pages
1. Create a `.astro` file in `src/pages/`
2. Use `src/layouts/main.astro` as the layout wrapper
3. Import React components with `client:*` directives for interactivity
