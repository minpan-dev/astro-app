// @ts-check

import { readFileSync, readdirSync } from "node:fs"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers"
import { transformerFileName } from "./src/utils/transformerFileName.js"
import { transformerCopyCode } from "./src/utils/transformerCopyCode.js"

// Map each blog post URL to its frontmatter publishDate so the sitemap can
// expose a per-page <lastmod>.
const blogDir = new URL("./src/content/blog/", import.meta.url)
const lastmodByPath = new Map()
for (const file of readdirSync(blogDir)) {
  if (!/\.(md|mdx)$/.test(file)) continue
  const raw = readFileSync(new URL(file, blogDir), "utf-8")
  const match = raw.match(/^publishDate:\s*(.+)$/m)
  if (!match) continue
  const date = new Date(match[1].trim())
  if (Number.isNaN(date.valueOf())) continue
  const slug = file.replace(/\.(md|mdx)$/, "")
  lastmodByPath.set(`/blog/${slug}/`, date.toISOString())
}

// https://astro.build/config
export default defineConfig({
  site: "https://minpan.dev",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
      wrap: true,
      transformers: [
        transformerFileName(),
        transformerCopyCode(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  integrations: [
    react(),
    mdx(),
    sitemap({
      serialize(item) {
        const lastmod = lastmodByPath.get(new URL(item.url).pathname)
        if (lastmod) item.lastmod = lastmod
        return item
      },
    }),
  ],
})
