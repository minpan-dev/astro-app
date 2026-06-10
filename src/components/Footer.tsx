import { SiGithub, SiX } from "react-icons/si"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          <a
            href="/"
            className="text-xl font-bold text-foreground transition-colors hover:text-foreground/80"
          >
            minpan.dev
          </a>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="#"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiX className="size-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="#"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiGithub className="size-5" />
              </a>
            </Button>
          </div>

          <Separator className="w-full max-w-xs" />

          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} minpan.dev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
