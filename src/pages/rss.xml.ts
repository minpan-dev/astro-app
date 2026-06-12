import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import type { APIContext } from "astro"
import MarkdownIt from "markdown-it"
import sanitizeHtml from "sanitize-html"

const parser = new MarkdownIt()

export async function GET(context: APIContext) {
  const blog = await getCollection("blog")

  // Sort posts by date, descending
  blog.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  )

  const site = context.site ?? new URL("https://minpan.dev")

  return rss({
    title: "minpan.dev | Blog",
    description: "我最博文与法",
    site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      content: sanitizeHtml(parser.render(post.body ?? ""), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          img: ["src", "alt", "title", "width", "height"],
        },
      }),
    })),
    customData: `<language>zh-cn</language>`,
  })
}
