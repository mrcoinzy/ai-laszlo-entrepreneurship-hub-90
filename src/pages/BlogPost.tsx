
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const BlogPost = () => {
  const { id } = useParams();
  
  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', id],
    queryFn: async () => {
      // First fetch the blog post
      const { data: blogPost, error: blogError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (blogError) throw blogError;
      
      // Then fetch the author details separately if we have an author_id
      if (blogPost.author_id) {
        const { data: authorData, error: authorError } = await supabase
          .from('users')
          .select('full_name')
          .eq('id', blogPost.author_id)
          .single();
        
        if (!authorError && authorData) {
          return {
            ...blogPost,
            author: authorData
          };
        }
      }
      
      // Return the blog post without author if we couldn't fetch author data
      return {
        ...blogPost,
        author: null
      };
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-16">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/4 mb-8" />
          <Skeleton className="w-full aspect-video mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold">Blog post not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <article className="prose prose-invert mx-auto">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-muted-foreground mb-8">
            Posted {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            {post.author?.full_name && ` by ${post.author.full_name}`}
          </div>
          
          {post.featured_image_url && (
            <img 
              src={post.featured_image_url} 
              alt={post.title}
              className="w-full rounded-lg mb-8"
            />
          )}
          
          <div className="whitespace-pre-wrap">{post.content}</div>
          
          {post.keywords && (
            <div className="mt-8 pt-8 border-t border-border">
              <h2 className="text-xl font-semibold mb-4">Related Topics</h2>
              <div className="flex flex-wrap gap-2">
                {post.keywords.split(',').map((keyword) => (
                  <span 
                    key={keyword} 
                    className="px-3 py-1 bg-accent/20 rounded-full text-sm"
                  >
                    {keyword.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
