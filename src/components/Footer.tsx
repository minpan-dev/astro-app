import React from "react"
import { SITE } from "@/config"

const Footer: React.FC = () => {
  return (
    <footer className="box-border w-full">
      <div className="p-5 sm:p-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground opacity-60 transition-opacity hover:opacity-100">
            <a
              target="_blank"
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground hover:underline"
            >
              CC BY-NC-SA 4.0
            </a>
            <span>2026-PRESENT &copy; {SITE.site.title}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
