export interface BlogCardProps {
  title: string;
  description: string;
  date: Date;
  slug: string;
  tags?: string[];
}

export default function BlogCard({ title, description, date, slug, tags }: BlogCardProps) {
  return (
    <a href={`/blog/${slug}`} className="group block h-full">
      <article className="relative h-full flex flex-col p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1 overflow-hidden">
        {/* Subtle gradient background effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 flex-grow">
          <time className="text-sm text-muted-foreground mb-3 block" dateTime={date.toISOString()}>
            {date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground line-clamp-3">
            {description}
          </p>
        </div>
        
        {tags && tags.length > 0 && (
          <div className="relative z-10 mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </a>
  );
}
