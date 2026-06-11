import React from "react"
import { SITE } from "@/config"

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="box-border w-full">
      <div className="p-5 sm:p-8">
        <div className="flex flex-col items-center gap-6">
          <p className="text-sm text-muted-foreground opacity-60 transition-opacity hover:opacity-100">
            &copy; {currentYear} {SITE.site.title}. 保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
