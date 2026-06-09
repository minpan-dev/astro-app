import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-background border-border/50 shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              minpan.dev
            </a>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:block mr-4">
              <ul className="flex space-x-8">

                <li>
                  <a href="/blog" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/projects" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                    Projects
                  </a>
                </li>

              </ul>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
