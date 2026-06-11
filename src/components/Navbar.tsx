import React, { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { ThemeToggle } from "./ThemeToggle"

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: "/blog", label: "博客" },
    { href: "/projects", label: "项目" },
  ]

  return (
    <header className="navbar-reveal fixed top-0 z-50 w-full border-b border-transparent bg-transparent backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-2xl font-bold text-foreground transition-colors hover:text-foreground/80"
            >
              minpan.dev
            </a>
          </div>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Button key={link.href} variant="ghost" asChild>
                <a href={link.href}>{link.label}</a>
              </Button>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile nav trigger */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="打开菜单">
                  <Menu />
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

export default Navbar
