import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1 overflow-hidden relative">
        {/* Subtle gradient background effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        <CardHeader className="relative z-10 flex-grow">
          <time className="text-sm text-muted-foreground mb-1 block" dateTime={date.toISOString()}>
            {date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-3 mt-2 text-base">
            {description}
          </CardDescription>
        </CardHeader>
        
        {tags && tags.length > 0 && (
          <CardFooter className="relative z-10 pt-0 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-medium">
                {tag}
              </Badge>
            ))}
          </CardFooter>
        )}
      </Card>
    </a>
  );
}
