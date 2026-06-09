import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2"></path>
    <path d="M12 20v2"></path>
    <path d="m4.93 4.93 1.41 1.41"></path>
    <path d="m17.66 17.66 1.41 1.41"></path>
    <path d="M2 12h2"></path>
    <path d="M20 12h2"></path>
    <path d="m6.34 17.66-1.41 1.41"></path>
    <path d="m19.07 4.93-1.41 1.41"></path>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
  </svg>
);

export function ThemeToggle() {
  const [theme, setThemeState] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setThemeState(isDark ? "dark" : "light");
    
    // Listen for storage events (e.g. if theme changed in another tab)
    const handleStorage = () => {
      const isDarkNow = document.documentElement.classList.contains("dark");
      setThemeState(isDarkNow ? "dark" : "light");
    };
    
    // We actually only need to sync with the initial document class 
    // because our toggle function updates both state and document synchronously.
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setThemeState(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="text-muted-foreground hover:text-foreground relative"
    >
      <div className={`transition-all duration-300 absolute ${theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}>
        <SunIcon />
      </div>
      <div className={`transition-all duration-300 absolute ${theme === "dark" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}>
        <MoonIcon />
      </div>
    </Button>
  );
}
