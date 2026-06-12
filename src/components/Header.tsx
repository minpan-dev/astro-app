import React, { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/ThemeToggle"
import { SocialIcon } from "@/components/SocialIcon"
import config from "@/config"
const { site, navLinks, socials } = config

const Header: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar-reveal fixed top-0 z-50 w-full border-b border-transparent bg-transparent backdrop-blur-md">
      <div className="box-border w-full p-5 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-2xl font-bold text-foreground transition-colors hover:text-foreground/80"
            >
              {site.title}
            </a>
          </div>

          {/* Desktop nav */}
          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                className="text-base font-normal"
                asChild
              >
                <a href={link.href}>{link.label}</a>
              </Button>
            ))}
            {socials
              .filter((social) => social.showInNavbar)
              .map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  aria-label={social.linkTitle}
                  asChild
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.linkTitle}
                  >
                    <SocialIcon name={social.name} className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            <ThemeToggle />
          </div>

          {/* Mobile nav trigger */}
          <div className="flex items-center gap-2 md:hidden">
            {socials
              .filter((social) => social.showInNavbar)
              .map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  aria-label={social.linkTitle}
                  asChild
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.linkTitle}
                  >
                    <SocialIcon name={social.name} className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="打开菜单">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] pt-12">
                <SheetTitle className="sr-only">导航菜单</SheetTitle>
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Button
                      key={link.href}
                      variant="ghost"
                      className="justify-start text-lg"
                      asChild
                    >
                      <a href={link.href} onClick={() => setOpen(false)}>
                        {link.label}
                      </a>
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
