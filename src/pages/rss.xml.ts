import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import type { APIContext } from "astro"

export async function GET(context: APIContext) {
  const blog = await getCollection("blog")

  // Sort posts by date, descending
  blog.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  )

  return rss({
    title: "minpan.dev | Blog",
    description: "我的最新博客文章与想法。",
    site: context.site || "https://minpan.dev",
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>zh-cn</language>`,
  })
}
