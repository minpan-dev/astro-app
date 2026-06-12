import type { APIRoute } from "astro"
import { getCollection } from "astro:content"
import satori from "satori"
import { html } from "satori-html"
import { Resvg } from "@resvg/resvg-js"

import fs from "fs"
import path from "path"

// Read the font from the local filesystem instead of fetching at runtime
const fontPath = path.resolve("./src/assets/fonts/noto-sans-sc.woff")
const notoBuffer = fs.readFileSync(fontPath)

export async function getStaticPaths() {
  const blogEntries = await getCollection("blog")
  return blogEntries.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }))
}

export const GET: APIRoute = async ({ props }) => {
  const { entry } = props

  const title = entry.data.title || "Blog Post"

  const description = entry.data.description || "MinPan's Blog"

  // HTML layout for the Open Graph image
  // Satori uses a limited subset of CSS, mostly flexbox.
  const markup = html`
    <div
      style="
        background: #fefbfb;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Noto Sans SC', sans-serif;
      "
    >
      <!-- Shadow offset card -->
      <div
        style="
          position: absolute;
          top: -1px;
          right: -1px;
          border: 4px solid #000;
          background: #ecebeb;
          opacity: 0.9;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          margin: 2.5rem;
          width: 88%;
          height: 80%;
        "
      ></div>
      <!-- Main foreground card -->
      <div
        style="
          border: 4px solid #000;
          background: #fefbfb;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          margin: 2rem;
          width: 88%;
          height: 80%;
        "
      >
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 20px;
            width: 90%;
            height: 90%;
          "
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 90%;
              max-height: 90%;
              overflow: hidden;
              text-align: center;
            "
          >
            <p
              style="font-size: 72px; font-weight: bold; color: #09090b; margin: 0; line-height: 1.2;"
            >
              ${title}
            </p>
            <p style="font-size: 28px; color: #52525b; margin-top: 24px;">
              ${description}
            </p>
          </div>
          <div
            style="
              display: flex;
              justify-content: flex-end;
              width: 100%;
              margin-bottom: 8px;
              font-size: 28px;
              color: #52525b;
            "
          >
            <span style="font-weight: bold;">minpan.dev/blog/${entry.id}</span>
          </div>
        </div>
      </div>
    </div>
  `

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svg = await satori(markup as any, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Noto Sans SC",
        data: notoBuffer!,
        weight: 400,
        style: "normal",
      },
    ],
  })

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1200,
    },
  })

  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Response(pngBuffer as any, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
