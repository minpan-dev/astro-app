import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getReadingTime(content: string): string {
  const wordsPerMinute = 200
  // Remove markdown formatting
  const cleanContent = content.replace(/[#*`_]/g, "")
  const words = cleanContent.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}
