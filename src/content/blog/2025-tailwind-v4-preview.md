---
title: "Tailwind CSS v4 is Finally Here"
description: "Exploring the massive performance improvements and the new JIT engine in Tailwind CSS v4."
publishDate: 2025-05-15
tags: ["CSS", "Tailwind", "Design"]
---

# Tailwind CSS v4 is Finally Here

Tailwind CSS has completely revolutionized the way we write CSS. With the release of version 4, the framework has become even faster and more powerful.

## The Oxidized Engine

The biggest headline for v4 is the complete rewrite of the engine in Rust. This has resulted in build times that are an order of magnitude faster than v3. For massive codebases, this means instant feedback in development.

## No More Config Files

Another exciting change is how configuration is handled. Instead of relying on a bulky `tailwind.config.js`, version 4 introduces a CSS-first configuration approach using standard CSS variables.

```css
@theme {
  --color-primary: #3b82f6;
  --font-sans: "Inter", sans-serif;
}
```

This brings Tailwind closer to standard web platform features while maintaining its utility-first philosophy.
