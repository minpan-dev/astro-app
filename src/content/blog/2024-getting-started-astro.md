---
title: "Getting Started with Astro"
description: "Why I'm switching from Next.js to Astro for all my content-heavy websites."
publishDate: 2024-03-10
tags: ["Astro", "Web Dev", "Performance"]
---

# Getting Started with Astro

For years, I reached for Next.js by default for almost every project. But recently, I've discovered Astro, and it has completely changed my approach to building content-heavy websites.

## Islands Architecture

The core philosophy of Astro is the "Islands Architecture." By default, Astro ships zero JavaScript to the client. The result is an incredibly fast, static HTML site. When you need interactivity, you can hydrate specific "islands" of UI using React, Vue, Svelte, or even vanilla JS.

## Content Collections

Managing markdown files has never been easier thanks to Astro's Content Collections. It provides built-in type safety for your frontmatter using Zod, ensuring you never deploy a broken page due to a missing title or malformed date.

I highly recommend giving Astro a try for your next blog or documentation site!
