import React, { useEffect, useState } from "react"
import { Star, GitFork, CircleDot, Scale } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface ProjectCardProps {
  title: string
  description: string
  date: Date
  tags?: string[]
  image?: string
  githubUrl?: string
  license?: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  date,
  tags,
  image,
  githubUrl,
  license,
}: ProjectCardProps) => {
  const [repoData, setRepoData] = useState<{
    stars: number
    forks: number
    issues: number
    language: string
  } | null>(() => {
    if (
      typeof sessionStorage !== "undefined" &&
      githubUrl &&
      githubUrl.includes("github.com/")
    ) {
      const urlParts = githubUrl.split("github.com/")[1].split("/")
      if (urlParts[0] && urlParts[1]) {
        const cacheKey = `gh_repo_${urlParts[0]}_${urlParts[1]}`
        const cached = sessionStorage.getItem(cacheKey)
        if (cached) {
          try {
            return JSON.parse(cached)
          } catch {
            // ignore parse error
          }
        }
      }
    }
    return null
  })

  useEffect(() => {
    if (repoData) return // already cached
    if (!githubUrl || !githubUrl.includes("github.com/")) return

    const urlParts = githubUrl.split("github.com/")[1].split("/")
    const owner = urlParts[0]
    const repo = urlParts[1]

    if (!owner || !repo) return

    const cacheKey = `gh_repo_${owner}_${repo}`

    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          const newData = {
            stars: data.stargazers_count,
            forks: data.forks_count,
            issues: data.open_issues_count,
            language: data.language,
          }
          setRepoData(newData)
          sessionStorage.setItem(cacheKey, JSON.stringify(newData))
        } else if (data.message && data.message.includes("rate limit")) {
          // Fallback for local development when rate limit is hit
          if (import.meta.env.DEV) {
            setRepoData({
              stars: Math.floor(Math.random() * 500) + 50,
              forks: Math.floor(Math.random() * 100),
              issues: Math.floor(Math.random() * 20),
              language: "TypeScript",
            })
            console.warn(
              `[DEV] GitHub API Rate Limited for ${owner}/${repo}. Displaying mock data.`
            )
          }
        }
      })
      .catch(console.error)
  }, [githubUrl])

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden bg-card/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
      {image && (
        <a
          href={githubUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block aspect-[2/1] w-full overflow-hidden border-b border-border/30 bg-muted"
        >
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-center"
            loading="lazy"
          />
        </a>
      )}

      <CardHeader className="relative z-10 flex-grow pb-4">
        <div className="mb-2 flex items-center justify-between">
          <time
            className="text-xs text-muted-foreground"
            dateTime={date.toISOString()}
          >
            {date.toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
            })}
          </time>
        </div>
        <a
          href={githubUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link block"
        >
          <CardTitle className="text-xl leading-tight transition-colors group-hover/link:text-primary">
            {title}
          </CardTitle>
        </a>
        <CardDescription className="mt-2 line-clamp-3 text-sm">
          {description}
        </CardDescription>

        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-md bg-secondary/70 font-medium backdrop-blur-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {(repoData || license) && (
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border/50 pt-4 text-xs font-medium text-muted-foreground">
            {license && (
              <div
                className="flex items-center gap-1 text-foreground"
                title="开源协议"
              >
                <Scale className="h-3.5 w-3.5" />
                <span>{license}</span>
              </div>
            )}
            {repoData?.language && (
              <div className="flex items-center gap-1.5" title="主要语言">
                <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
                {repoData.language}
              </div>
            )}
            {repoData && (
              <>
                <div className="flex items-center gap-1" title="Stars">
                  <Star className="h-3.5 w-3.5" />
                  <span>{repoData.stars}</span>
                </div>
                <div className="flex items-center gap-1" title="Forks">
                  <GitFork className="h-3.5 w-3.5" />
                  <span>{repoData.forks}</span>
                </div>
                <div
                  className="flex items-center gap-1 text-green-600 dark:text-green-400"
                  title="未关闭 Issues"
                >
                  <CircleDot className="h-3.5 w-3.5" />
                  <span>{repoData.issues}</span>
                </div>
              </>
            )}
          </div>
        )}
      </CardHeader>
    </Card>
  )
}

export default ProjectCard
