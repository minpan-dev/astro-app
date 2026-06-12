import React from "react"
import { Mail, Rss } from "lucide-react"
import { SiGithub, SiX, SiSinaweibo, SiZhihu, SiBilibili } from "react-icons/si"
import { FaQq } from "react-icons/fa"
import type { SocialName, ShareName } from "@/types/config"

export interface SocialIconProps {
  name: SocialName | ShareName
  className?: string
}

export const SocialIcon: React.FC<SocialIconProps> = ({ name, className }) => {
  switch (name) {
    case "github":
      return <SiGithub className={className} />
    case "twitter":
      return <SiX className={className} />
    case "mail":
      return <Mail className={className} />
    case "rss":
      return <Rss className={className} />
    case "weibo":
      return <SiSinaweibo className={className} />
    case "zhihu":
      return <SiZhihu className={className} />
    case "bilibili":
      return <SiBilibili className={className} />
    case "qq":
      return <FaQq className={className} />
    default:
      return null
  }
}
