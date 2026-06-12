import React, { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import type { NavLink } from "@/types/config"

export interface MobileMenuProps {
  navLinks: NavLink[]
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ navLinks }) => {
  const [open, setOpen] = useState(false)

  return (
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
  )
}

export default MobileMenu
