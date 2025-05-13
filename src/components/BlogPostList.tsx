
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const BlogPostList = () => {
  const isMobile = useIsMobile();
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4 px-4 sm:px-0 max-w-7xl mx-auto w-full">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-accent/5">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/4 mt-2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-muted rounded w-full"></div>
              <div className="h-3 bg-muted rounded w-5/6 mt-2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 md:px-0 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        {posts?.map((post) => (
          <Card key={post.id} className="bg-accent/5 h-full flex flex-col">
            {post.featured_image_url && (
              <div className="w-full">
                <AspectRatio ratio={16/9} className="bg-muted overflow-hidden">
                  <img 
                    src={post.featured_image_url} 
                    alt={post.title}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </AspectRatio>
              </div>
            )}
            <CardHeader className={post.featured_image_url ? "pt-3" : ""}>
              <CardTitle className="text-base sm:text-lg line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="text-xs">
                Posted {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </CardDescription>
              {post.keywords && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.keywords.split(',').slice(0, isMobile ? 2 : 3).map((keyword, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs"
                    >
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {post.excerpt || post.content.substring(0, isMobile ? 80 : 120)}...
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link to={`/blog/${post.id}`} className="w-full sm:w-auto">
                <Button variant="secondary" className="gap-2 w-full sm:w-auto text-xs sm:text-sm">
                  <ExternalLink size={isMobile ? 14 : 16} />
                  Read More
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogPostList;
