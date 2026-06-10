import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import React from "react"
import { Badge } from "@/components/ui/badge"

export interface BlogCardProps {
  title: string
  description: string
  date: Date
  slug: string
  tags?: string[]
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  date,
  slug,
  tags,
}: BlogCardProps) => {
  return (
    <a href={`/blog/${slug}`} className="group block h-full">
      <Card className="relative flex h-full flex-col overflow-hidden bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
        {/* Subtle gradient background effect on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <CardHeader className="relative z-10 flex-grow">
          <time
            className="mb-1 block text-sm text-muted-foreground"
            dateTime={date.toISOString()}
          >
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <CardTitle className="text-xl transition-colors group-hover:text-primary">
            {title}
          </CardTitle>
          <CardDescription className="mt-2 line-clamp-3 text-base">
            {description}
          </CardDescription>
        </CardHeader>

        {tags && tags.length > 0 && (
          <CardFooter className="relative z-10 flex flex-wrap gap-2 pt-0">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-medium">
                {tag}
              </Badge>
            ))}
          </CardFooter>
        )}
      </Card>
    </a>
  )
}

export default BlogCard
