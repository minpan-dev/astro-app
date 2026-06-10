import { SiGithub } from "react-icons/si"
import { ExternalLink } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import React from "react"
import { Button } from "@/components/ui/button"

export interface ProjectCardProps {
  title: string
  description: string
  date: Date
  slug: string
  tags?: string[]
  image?: string
  githubUrl?: string
  liveUrl?: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  date,
  slug,
  tags,
  image,
  githubUrl,
  liveUrl,
}: ProjectCardProps) => {
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden bg-card/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
      {/* Subtle hover gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {image && (
        <a
          href={`/projects/${slug}`}
          className="relative block aspect-video w-full overflow-hidden border-b border-border/30 bg-muted"
        >
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
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
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </time>
          <div className="flex items-center gap-1">
            {githubUrl && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                asChild
              >
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Source Code"
                >
                  <SiGithub />
                </a>
              </Button>
            )}
            {liveUrl && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                asChild
              >
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Live Demo"
                >
                  <ExternalLink />
                </a>
              </Button>
            )}
          </div>
        </div>
        <a href={`/projects/${slug}`} className="group/link block">
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
      </CardHeader>
    </Card>
  )
}

export default ProjectCard
