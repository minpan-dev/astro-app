import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div
      className={cn(
        "fixed right-8 bottom-8 z-50 transition-all duration-300 ease-in-out",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <Button
        variant="outline"
        size="icon"
        className="h-12 w-12 rounded-full border-border bg-background/80 shadow-lg backdrop-blur-sm transition-transform hover:-translate-y-1 hover:bg-accent hover:text-accent-foreground"
        onClick={scrollToTop}
        aria-label="回到顶部"
      >
        <ArrowUp className="size-6" />
      </Button>
    </div>
  )
}
