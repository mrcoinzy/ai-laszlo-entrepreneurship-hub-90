
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface Post {
  id: string;
  title: string;
  content: string;
  author_id?: string;
  created_at: string;
  featured_image_url?: string;
  excerpt?: string;
  published: boolean;
  keywords?: string;
}

interface Blog7Props {
  tagline?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  posts: Post[];
  gridClassName?: string;
}

const Blog7 = ({
  tagline = "Latest Updates",
  heading = "Blog Posts",
  description = "Stay updated with our latest insights, tips, and expert knowledge. Discover trends and best practices in modern web development and design.",
  buttonText = "View all articles",
  buttonUrl = "/blog",
  posts = [],
  gridClassName = "grid gap-8 md:grid-cols-2 lg:gap-10"
}: Blog7Props) => {
  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto flex flex-col items-center gap-8 sm:gap-12">
        <div className="text-center max-w-3xl mx-auto px-4">
          <Badge variant="secondary" className="mb-3 sm:mb-4">
            {tagline}
          </Badge>
          <h2 className="mb-3 text-pretty text-2xl font-semibold md:text-3xl lg:text-4xl">
            {heading}
          </h2>
          <p className="mb-4 sm:mb-6 text-muted-foreground text-sm sm:text-base">
            {description}
          </p>
          <Button variant="link" className="w-full sm:w-auto" asChild>
            <Link to={buttonUrl}>
              {buttonText}
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
        <div className={gridClassName}>
          {posts.map((post) => (
            <Card key={post.id} className="grid grid-rows-[auto_auto_auto_auto] overflow-hidden h-full">
              <div className="aspect-[16/9] w-full">
                <Link
                  to={`/blog/${post.id}`}
                  className="transition-opacity duration-200 fade-in hover:opacity-70"
                >
                  <img
                    src={post.featured_image_url || "/placeholder.svg"}
                    alt={post.title}
                    className="h-full w-full object-cover object-center"
                  />
                </Link>
              </div>
              <div className="px-4 pt-3 space-y-1">
                {post.keywords && (
                  <div className="flex flex-wrap gap-1">
                    {post.keywords.split(',').slice(0, 3).map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {keyword.trim()}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <CardHeader className="px-4 py-2">
                <h3 className="text-base sm:text-lg font-semibold hover:underline line-clamp-2">
                  <Link to={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </p>
              </CardHeader>
              <CardContent className="px-4 py-1">
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt || post.content.substring(0, 120)}...
                </p>
              </CardContent>
              <CardFooter className="px-4 pt-0 pb-4 mt-auto">
                <Link
                  to={`/blog/${post.id}`}
                  className="flex items-center text-foreground hover:underline text-xs sm:text-sm"
                >
                  Read more
                  <ArrowRight className="ml-2 size-3" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog7 };
