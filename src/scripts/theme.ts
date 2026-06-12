/**
 * Theme persistence script.
 * Re-applies the stored theme after Astro view-transition swaps
 * so the dark class stays in sync with localStorage.
 */
function applyTheme() {
  const stored = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  const isDark = stored === "dark" || (!stored && prefersDark)
  document.documentElement.classList.toggle("dark", isDark)
}

document.addEventListener("astro:after-swap", applyTheme)
