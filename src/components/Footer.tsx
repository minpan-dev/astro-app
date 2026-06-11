import { Button } from "@/components/ui/button"
import React from "react"
import { Separator } from "@/components/ui/separator"
import { SocialIcon } from "./SocialIcon"
import { SITE } from "@/config"

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          <a
            href="/"
            className="text-xl font-bold text-foreground transition-colors hover:text-foreground/80"
          >
            {SITE.site.title}
          </a>

          <div className="flex items-center gap-2">
            {SITE.socials
              .filter((social) => social.showInFooter)
              .map((social) => (
                <Button key={social.name} variant="ghost" size="icon" asChild>
                  <a
                    href={social.url}
                    aria-label={social.linkTitle}
                    title={social.linkTitle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcon name={social.name} className="size-5" />
                  </a>
                </Button>
              ))}
          </div>

          <Separator className="w-full max-w-xs" />

          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {SITE.site.title}. 保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
