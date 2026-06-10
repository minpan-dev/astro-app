import { z, defineCollection } from "astro:content"
import { glob } from "astro/loaders"

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    featured: z.boolean().optional(),
  }),
})

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    githubUrl: z.string().optional(),
    liveUrl: z.string().optional(),
    featured: z.boolean().optional(),
  }),
})

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
}
