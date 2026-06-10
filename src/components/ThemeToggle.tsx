import React, { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Theme = "light" | "dark" | "system"

export const ThemeToggle: React.FC = () => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof localStorage !== "undefined") {
      const stored = localStorage.getItem("theme") as Theme | null
      if (stored && ["light", "dark", "system"].includes(stored)) {
        return stored
      }
    }
    return "system"
  })

  useEffect(() => {
    if (theme !== "system") return

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const applySystem = () => {
      document.documentElement.classList[mq.matches ? "add" : "remove"]("dark")
    }
    applySystem()
    mq.addEventListener("change", applySystem)
    return () => mq.removeEventListener("change", applySystem)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark")
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      document.documentElement.classList[isDark ? "add" : "remove"]("dark")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="切换主题"
          className="aria-expanded:bg-transparent aria-expanded:text-muted-foreground"
        >
          <Sun className="dark:hidden" />
          <Moon className="hidden dark:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(v) => setTheme(v as Theme)}
        >
          <DropdownMenuRadioItem value="light">浅色</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">深色</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">系统</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
