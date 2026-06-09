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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ExternalLinkIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
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
    <article className="group relative flex flex-col rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 overflow-hidden h-full">
      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

      {/* Project Image Banner */}
      {image && (
        <div className="relative aspect-video w-full overflow-hidden border-b border-border/30 bg-muted">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      {/* Project Card Content */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-3">
            <time className="text-xs text-muted-foreground" dateTime={date.toISOString()}>
              {date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </time>
            
            {/* Quick Links */}
            <div className="flex items-center gap-3">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  title="View Source Code"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GithubIcon size={18} />
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  title="Live Demo"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLinkIcon size={18} />
                </a>
              )}
            </div>
          </div>

          <a href={`/projects/${slug}`} className="block group/link">
            <h3 className="text-xl font-bold mb-2 group-hover/link:text-primary transition-colors">
              {title}
            </h3>
          </a>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {description}
          </p>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-auto pt-4 flex flex-wrap gap-2 border-t border-border/30">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs font-medium bg-secondary/70 text-secondary-foreground rounded-md backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
