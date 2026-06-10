# Shadcn/ui Full Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all custom UI code with shadcn/ui components and Lucide React icons across all pages and components.

**Architecture:** Add 4 new shadcn components (separator, sheet, tooltip, skeleton), rewrite Footer from Astro to React, add mobile nav via Sheet, replace all inline SVGs with lucide-react, and replace all custom-styled tags/links with Badge/Button/Separator.

**Tech Stack:** Astro v6, React 19, shadcn/ui (Radix Nova), Tailwind v4, TypeScript 6, lucide-react

---

### Task 1: Add new shadcn/ui components

**Files:**
- Create: `src/components/ui/separator.tsx`
- Create: `src/components/ui/sheet.tsx`
- Create: `src/components/ui/tooltip.tsx`
- Create: `src/components/ui/skeleton.tsx`

- [ ] **Step 1: Install all four shadcn components**

```bash
pnpm dlx shadcn@latest add separator sheet tooltip skeleton
```

Expected: Four new files created in `src/components/ui/`. No errors.

- [ ] **Step 2: Verify all files were created**

```bash
ls src/components/ui/separator.tsx src/components/ui/sheet.tsx src/components/ui/tooltip.tsx src/components/ui/skeleton.tsx
```

Expected: All four paths printed.

- [ ] **Step 3: Run typecheck to confirm no import errors**

```bash
pnpm run typecheck
```

Expected: No errors related to new components.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/separator.tsx src/components/ui/sheet.tsx src/components/ui/tooltip.tsx src/components/ui/skeleton.tsx
git commit -m "feat: add shadcn separator, sheet, tooltip, and skeleton components"
```

---

### Task 2: Refactor Navbar with mobile Sheet menu and Lucide icons

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Rewrite Navbar.tsx with Sheet mobile menu**

Replace the entire content of `src/components/Navbar.tsx` with:

```tsx
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/projects", label: "Projects" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-border/50 shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-2xl font-bold text-foreground hover:text-foreground/80 transition-colors"
            >
              minpan.dev
            </a>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button key={link.href} variant="ghost" asChild>
                <a href={link.href}>{link.label}</a>
              </Button>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile nav trigger */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] pt-12">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Button
                      key={link.href}
                      variant="ghost"
                      className="justify-start text-lg"
                      asChild
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </a>
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Run typecheck**

```bash
pnpm run typecheck
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add mobile sheet menu and lucide icons to Navbar"
```

---

### Task 3: Rewrite Footer from Astro to React with shadcn components

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create Footer.tsx**

Create `src/components/Footer.tsx` (new file):

```tsx
import { Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-6">
          <a
            href="/"
            className="text-xl font-bold text-foreground hover:text-foreground/80 transition-colors"
          >
            minpan.dev
          </a>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <Twitter />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="#" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <Github />
              </a>
            </Button>
          </div>

          <Separator className="max-w-xs w-full" />

          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} minpan.dev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Run typecheck**

```bash
pnpm run typecheck
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: rewrite Footer as React component with shadcn button and separator"
```

---

### Task 4: Remove old Footer.astro and update layout import

**Files:**
- Delete: `src/components/Footer.astro`
- Modify: `src/layouts/main.astro`

- [ ] **Step 1: Delete the old Footer.astro**

```bash
rm src/components/Footer.astro
```

- [ ] **Step 2: Update main.astro import**

In `src/layouts/main.astro`, change the Footer import from:

```
import Footer from "@/components/Footer.astro"
```

to:

```
import Footer from "@/components/Footer.tsx"
```

The Edit call:

```
old_string: import Footer from "@/components/Footer.astro"
new_string: import Footer from "@/components/Footer.tsx"
```

- [ ] **Step 3: Run typecheck**

```bash
pnpm run typecheck
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.astro src/layouts/main.astro
git commit -m "refactor: replace Footer.astro with Footer.tsx"
```

---

### Task 5: Replace inline SVGs in ProjectCard with lucide-react

**Files:**
- Modify: `src/components/ProjectCard.tsx`

- [ ] **Step 1: Update ProjectCard.tsx imports and remove inline SVG components**

Replace the import section and inline SVG icons (lines 1-29) in `src/components/ProjectCard.tsx`.

Remove these local components entirely (lines 16-29):
```
const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ExternalLinkIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);
```

Add to the imports at top:
```
import { Github, ExternalLink } from "lucide-react";
```

Then replace `<GithubIcon size={16} />` with `<Github />` and `<ExternalLinkIcon size={16} />` with `<ExternalLink />` in the JSX.

- [ ] **Step 2: Run typecheck**

```bash
pnpm run typecheck
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "refactor: replace inline SVGs with lucide-react icons in ProjectCard"
```

---

### Task 6: Refactor homepage with shadcn Button and Separator

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Rewrite index.astro**

Replace the entire content of `src/pages/index.astro` with:

```astro
---
import Layout from "../layouts/main.astro";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Github, Mail } from "lucide-react";
---

<Layout>
  <div class="flex-grow flex flex-col justify-center max-w-3xl mx-auto px-6 lg:px-8 py-12 md:py-16">
    <section class="flex flex-col">
      <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-8">
        Hi, I'm Min Pan.
      </h1>
      <p class="text-xl text-foreground/80 leading-relaxed mb-8">
        A passionate frontend developer and designer crafting beautiful, high-performance digital experiences with an obsessive attention to detail and premium aesthetics.
      </p>
      <article class="prose prose-zinc dark:prose-invert max-w-none text-lg leading-relaxed text-foreground/80 space-y-6 mb-12">
        <p>
          My journey into web development started with a simple fascination for how things look and feel on a screen. Over the years, I've cultivated a deep appreciation for the intersection of design and engineering. I don't just write code; I build interfaces that feel alive, responsive, and intuitive.
        </p>
        <p>
          I believe that a great user experience is invisible. It requires sweating the small stuff—the micro-interactions, the subtle gradients, and the perfect typography.
        </p>
      </article>

      <Separator class="mb-8" />

      <div class="flex items-center justify-start gap-4">
        <Button variant="outline" asChild>
          <a href="https://github.com/minpan" target="_blank" rel="noopener noreferrer">
            <Github class="size-4" />
            GitHub
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href="mailto:hello@minpan.dev">
            <Mail class="size-4" />
            Email
          </a>
        </Button>
      </div>
    </section>
  </div>
</Layout>
```

- [ ] **Step 2: Run typecheck**

```bash
pnpm run typecheck
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "refactor: replace custom social links with shadcn button on homepage"
```

---

### Task 7: Refactor project detail page with Badge, Button, and Separator

**Files:**
- Modify: `src/pages/projects/[slug].astro`

- [ ] **Step 1: Rewrite projects/[slug].astro**

Replace the entire content of `src/pages/projects/[slug].astro` with:

```astro
---
import { getCollection, render } from 'astro:content';
import Layout from '../../layouts/main.astro';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Separator } from '../../components/ui/separator';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';

export async function getStaticPaths() {
  const projectEntries = await getCollection('projects');
  return projectEntries.map(entry => ({
    params: { slug: entry.id }, props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
---

<Layout>
  <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
    <Button variant="ghost" asChild>
      <a href="/projects">
        <ArrowLeft class="size-4" />
        Back to Projects
      </a>
    </Button>

    {entry.data.image && (
      <div class="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50 bg-muted shadow-xl">
        <img
          src={entry.data.image}
          alt={entry.data.title}
          class="h-full w-full object-cover object-center"
        />
      </div>
    )}

    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
      <div class="space-y-4 max-w-2xl">
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight">
          {entry.data.title}
        </h1>
        <time class="block text-sm text-muted-foreground" datetime={entry.data.publishDate.toISOString()}>
          Published in {entry.data.publishDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          })}
        </time>
        {entry.data.tags && entry.data.tags.length > 0 && (
          <div class="flex flex-wrap gap-2 pt-2">
            {entry.data.tags.map(tag => (
              <Badge variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}
      </div>

      <div class="flex items-center gap-3">
        {entry.data.githubUrl && (
          <Button variant="outline" asChild>
            <a href={entry.data.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github class="size-4" />
              Code
            </a>
          </Button>
        )}
        {entry.data.liveUrl && (
          <Button asChild>
            <a href={entry.data.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink class="size-4" />
              Live Demo
            </a>
          </Button>
        )}
      </div>
    </div>

    <Separator />

    <div class="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 max-w-none">
      <Content />
    </div>
  </article>
</Layout>
```

- [ ] **Step 2: Run typecheck**

```bash
pnpm run typecheck
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/projects/[slug].astro
git commit -m "refactor: use shadcn badge, button, separator in project detail page"
```

---

### Task 8: Refactor blog detail page with Badge

**Files:**
- Modify: `src/pages/blog/[slug].astro`

- [ ] **Step 1: Rewrite blog/[slug].astro**

Replace the entire content of `src/pages/blog/[slug].astro` with:

```astro
---
import { getCollection, render } from 'astro:content';
import Layout from '../../layouts/main.astro';
import { Badge } from '../../components/ui/badge';

export async function getStaticPaths() {
  const blogEntries = await getCollection('blog');
  return blogEntries.map(entry => ({
    params: { slug: entry.id }, props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
---

<Layout>
  <article class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <header class="mb-12 text-center">
      {entry.data.tags && entry.data.tags.length > 0 && (
        <div class="flex justify-center gap-2 mb-6">
          {entry.data.tags.map(tag => (
            <Badge variant="secondary">{tag}</Badge>
          ))}
        </div>
      )}
      <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
        {entry.data.title}
      </h1>
      <time class="text-muted-foreground" datetime={entry.data.publishDate.toISOString()}>
        {entry.data.publishDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
    </header>

    <div class="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 max-w-none">
      <Content />
    </div>
  </article>
</Layout>
```

- [ ] **Step 2: Run typecheck**

```bash
pnpm run typecheck
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/blog/[slug].astro
git commit -m "refactor: use shadcn badge for tags in blog detail page"
```

---

### Task 9: Final verification — build, lint, and format

- [ ] **Step 1: Run ESLint**

```bash
pnpm run lint
```

Expected: No errors. If warnings exist, they should be pre-existing, not from our changes.

- [ ] **Step 2: Run Prettier**

```bash
pnpm run format
```

Expected: All files formatted without errors.

- [ ] **Step 3: Run full typecheck**

```bash
pnpm run typecheck
```

Expected: No errors.

- [ ] **Step 4: Run production build**

```bash
pnpm run build
```

Expected: Build succeeds, all pages generated. No errors.

- [ ] **Step 5: Commit any formatting changes**

```bash
git add -A && git diff --cached --quiet || git commit -m "style: apply formatting after shadcn refactor"
```

Expected: Either "nothing to commit" or a commit with formatting changes.
