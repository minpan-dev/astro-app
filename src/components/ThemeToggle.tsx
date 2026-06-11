import React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export const ThemeToggle: React.FC = () => {
  const toggleTheme = (event: React.MouseEvent) => {
    // The classList is our single source of truth since there might be multiple toggles
    const currentlyDark = document.documentElement.classList.contains("dark")
    const nextIsDark = !currentlyDark

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.documentElement.classList.toggle("dark", nextIsDark)
      localStorage.setItem("theme", nextIsDark ? "dark" : "light")
      return
    }

    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      document.documentElement.classList.toggle("dark", nextIsDark)
      localStorage.setItem("theme", nextIsDark ? "dark" : "light")
    })

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]

      document.documentElement.animate(
        {
          clipPath: nextIsDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 400,
          easing: "ease-out",
          fill: "forwards",
          pseudoElement: nextIsDark
            ? "::view-transition-old(root)"
            : "::view-transition-new(root)",
        }
      )
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="切换主题"
      title="切换主题"
      onClick={toggleTheme}
    >
      <Sun className="h-5 w-5 dark:hidden" />
      <Moon className="hidden h-5 w-5 dark:block" />
    </Button>
  )
}
