/**
 * Copy-to-clipboard handler for code blocks.
 * Attached once per page load via `astro:page-load`.
 */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll(".copy-code-btn")

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const pre = button.closest("pre")
      if (!pre) return
      const code = pre.querySelector("code")
      if (!code) return

      const textToCopy = code.innerText

      try {
        await navigator.clipboard.writeText(textToCopy)

        const copyIcon = button.querySelector(".icon-copy")
        const checkIcon = button.querySelector(".icon-check")

        if (copyIcon && checkIcon) {
          copyIcon.classList.remove("block")
          copyIcon.classList.add("hidden")
          checkIcon.classList.remove("hidden")
          checkIcon.classList.add("block")

          setTimeout(() => {
            copyIcon.classList.remove("hidden")
            copyIcon.classList.add("block")
            checkIcon.classList.remove("block")
            checkIcon.classList.add("hidden")
          }, 2000)
        }
      } catch (err) {
        console.error("Failed to copy text: ", err)
      }
    })
  })
}

document.addEventListener("astro:page-load", initCopyButtons)
