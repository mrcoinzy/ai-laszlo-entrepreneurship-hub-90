
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
}

interface Blog7Props {
  tagline?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  posts: Post[];
}

const Blog7 = ({
  tagline = "Latest Updates",
  heading = "Blog Posts",
  description = "Stay updated with our latest insights, tips, and expert knowledge. Discover trends and best practices in modern web development and design.",
  buttonText = "View all articles",
  buttonUrl = "/blog",
  posts = [],
}: Blog7Props) => {
  return (
    <section className="py-32">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6">
            {tagline}
          </Badge>
          <h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
            {description}
          </p>
          <Button variant="link" className="w-full sm:w-auto" asChild>
            <Link to={buttonUrl}>
              {buttonText}
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="grid grid-rows-[auto_auto_1fr_auto]">
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
              <CardHeader>
                <h3 className="text-lg font-semibold hover:underline md:text-xl">
                  <Link to={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {post.excerpt || post.content.substring(0, 150)}...
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  to={`/blog/${post.id}`}
                  className="flex items-center text-foreground hover:underline"
                >
                  Read more
                  <ArrowRight className="ml-2 size-4" />
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
