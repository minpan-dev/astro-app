export interface SiteConfig {
  /** The deployed URL of the site */
  url: string
  /** Global site title */
  title: string
  /** Default author name */
  author: string
  /** Short description used in SEO meta */
  description: string
  /** HTML lang attribute (default: "zh-CN") */
  lang?: string
  /** Path to favicon (default: "/favicon.svg") */
  favicon?: string
  /** Fallback OG image (default: "/og.png") */
  ogImage?: string
  /** Theme color for mobile browsers */
  themeColor?: string
  /** IANA timezone for post dates */
  timezone?: string
  /** Author profile URL for JSON-LD */
  profile?: string
  /** Google Search Console verification meta tag */
  googleVerification?: string
}

export type SocialName = "github" | "twitter" | "mail" | "rss"

export interface SocialLink {
  /** Identifier used to resolve the icon */
  name: SocialName
  /** URL to the social profile or mailto link */
  url: string
  /** Accessible label for the link */
  linkTitle: string
  /** Whether to show in Navbar. Default: false */
  showInNavbar?: boolean
  /** Whether to show in Footer. Default: true */
  showInFooter?: boolean
  /** Whether to show in Index Hero. Default: false */
  showInHero?: boolean
}

export type ShareName = "twitter" | "weibo" | "qq"

export interface ShareLink {
  /** Identifier used to resolve the icon */
  name: ShareName
  /** Accessible label for the share button */
  linkTitle: string
  /** Function to generate the target URL with encoded params */
  generateUrl: (postUrl: string, title: string, description?: string) => string
}

export interface MinpanConfig {
  site: SiteConfig
  socials: SocialLink[]
  shareLinks: ShareLink[]
}

/** Type helper for configuration. */
export function defineConfig(config: MinpanConfig): MinpanConfig {
  return config
}
