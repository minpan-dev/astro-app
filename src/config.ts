import { defineConfig } from "@/types/config"

const config = defineConfig({
  site: {
    title: "minpan.dev",
    author: "Min Pan",
    description:
      "一名前端开发工程师和设计师，致力于打造优雅、高性能的数字体验，对细节和极致美感有着执着的追求。",
    url: "https://minpan.dev",
    lang: "zh-CN",
    favicon: "/favicon.svg",
    ogImage: "/og.png",
    themeColor: "#ffffff",
    timezone: "Asia/Shanghai",
  },
  navLinks: [
    { href: "/blog", label: "博客" },
    { href: "/projects", label: "项目" },
  ],
  socials: [
    {
      name: "github",
      url: "https://github.com/minpan-dev",
      linkTitle: "GitHub",
      showInNavbar: true,
      showInFooter: true,
      showInHero: true,
    },
    {
      name: "twitter",
      url: "https://x.com/minpandev",
      linkTitle: "Twitter",
      showInFooter: true,
      showInHero: true,
    },
    {
      name: "weibo",
      url: "https://weibo.com/u/6686849996",
      linkTitle: "微博",
      showInHero: true,
    },
    {
      name: "zhihu",
      url: "https://www.zhihu.com/people/minpan-dev",
      linkTitle: "知乎",
      showInHero: true,
    },
    {
      name: "bilibili",
      url: "https://space.bilibili.com/490523113",
      linkTitle: "哔哩哔哩",
      showInHero: true,
    },
    {
      name: "mail",
      url: "mailto:minpan1206@gmail.com",
      linkTitle: "邮箱",
      showInHero: true,
    },
    {
      name: "rss",
      url: "/rss.xml",
      linkTitle: "RSS 订阅",
      showInNavbar: true,
    },
  ],
  shareLinks: [
    {
      name: "twitter",
      linkTitle: "分享到 X (Twitter)",
      generateUrl: (postUrl, title) =>
        `https://twitter.com/intent/tweet?url=${postUrl}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "weibo",
      linkTitle: "分享到微博",
      generateUrl: (postUrl, title) =>
        `http://service.weibo.com/share/share.php?url=${postUrl}&title=${encodeURIComponent(title)}`,
    },
    {
      name: "qq",
      linkTitle: "分享到 QQ",
      generateUrl: (postUrl, title, description) =>
        `http://connect.qq.com/widget/shareqq/index.html?url=${postUrl}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description || title)}`,
    },
  ],
})

export default config
