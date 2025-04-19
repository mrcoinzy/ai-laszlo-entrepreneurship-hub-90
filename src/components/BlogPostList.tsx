
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const BlogPostList = () => {
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
      <div className="animate-pulse space-y-4">
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
    <div className="space-y-4">
      {posts?.map((post) => (
        <Card key={post.id} className="bg-accent/5">
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>
              Posted {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{post.excerpt || post.content.substring(0, 150)}...</p>
          </CardContent>
          <CardFooter>
            <Link to={`/blog/${post.id}`}>
              <Button variant="secondary" className="gap-2">
                <ExternalLink size={16} />
                Read More
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default BlogPostList;
