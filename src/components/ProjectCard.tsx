import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface ProjectCardProps {
  title: string;
  description: string;
  date: Date;
  slug: string;
  tags?: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
}

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ExternalLinkIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

export default function ProjectCard({
  title,
  description,
  date,
  slug,
  tags,
  image,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  return (
    <Card className="group flex flex-col overflow-hidden h-full bg-card/40 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 relative">
      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {image && (
        <a href={`/projects/${slug}`} className="block relative aspect-video w-full overflow-hidden border-b border-border/30 bg-muted">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </a>
      )}

      <CardHeader className="relative z-10 flex-grow pb-4">
        <div className="flex items-center justify-between mb-2">
          <time className="text-xs text-muted-foreground" dateTime={date.toISOString()}>
            {date.toLocaleDateString("en-US", { year: "numeric", month: "long" })}
          </time>
          <div className="flex items-center gap-1">
            {githubUrl && (
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" asChild>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" title="View Source Code">
                  <GithubIcon size={16} />
                </a>
              </Button>
            )}
            {liveUrl && (
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" asChild>
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" title="Live Demo">
                  <ExternalLinkIcon size={16} />
                </a>
              </Button>
            )}
          </div>
        </div>
        <a href={`/projects/${slug}`} className="block group/link">
          <CardTitle className="text-xl group-hover/link:text-primary transition-colors leading-tight">
            {title}
          </CardTitle>
        </a>
        <CardDescription className="line-clamp-3 mt-2 text-sm">
          {description}
        </CardDescription>
      </CardHeader>

      {tags && tags.length > 0 && (
        <CardFooter className="relative z-10 pt-0 mt-auto flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-medium rounded-md bg-secondary/70 backdrop-blur-sm">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  );
}
