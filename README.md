**[minpan.dev](https://minpan.dev)**

My personal website — a blog and project showcase built with Astro.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) v6 + [React](https://react.dev/) 19 (islands architecture)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4 + [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Language**: TypeScript 6
- **Content**: Astro Content Collections (Markdown + frontmatter)

## Prerequisites

- [Node.js](https://nodejs.org/) `>=22.22.3` (see [`.nvmrc`](./.nvmrc); run `nvm use` to match)
- [pnpm](https://pnpm.io/) `11.5.2` (pinned via `packageManager`)

## Getting Started

```bash
pnpm install   # install dependencies (also sets up husky git hooks)
pnpm run dev   # start the dev server at http://localhost:4321
```

## Commands

```bash
pnpm run dev          # Start dev server (astro dev)
pnpm run build        # Production build (astro build)
pnpm run preview      # Preview the production build
pnpm run lint         # ESLint on all files
pnpm run format       # Prettier format on TS/TSX/Astro files
pnpm run format:check # Check formatting without writing (CI parity)
pnpm run typecheck    # Type checking (astro check)
```

To add new shadcn/ui components:

```bash
pnpm dlx shadcn@latest add <component-name>
```

## Contributing

Commits follow [Conventional Commits](https://www.conventionalcommits.org/) (enforced by commitlint), and a pre-commit hook runs Prettier + ESLint on staged files. See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md) for details.

<br>

<samp>Source code is licensed under <a href='./LICENSE'>MIT</a>.<br> Website content (articles, text, images) is licensed under <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC BY-NC-SA 4.0</a></samp>.
