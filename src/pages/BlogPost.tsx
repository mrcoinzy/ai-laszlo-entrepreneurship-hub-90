
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import CTAButton from "@/components/ui/cta-button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Fetch current blog post
  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', id],
    queryFn: async () => {
      const { data: blogPost, error: blogError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (blogError) throw blogError;
      
      if (blogPost.author_id) {
        const { data: authorData } = await supabase
          .from('users')
          .select('full_name')
          .eq('id', blogPost.author_id)
          .single();
        
        return {
          ...blogPost,
          author: authorData
        };
      }
      
      return {
        ...blogPost,
        author: null
      };
    }
  });

  // Fetch related posts (excluding current post)
  const { data: relatedPosts } = useQuery({
    queryKey: ['related-posts', id],
    queryFn: async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('id, title, created_at')
        .neq('id', id)
        .limit(5)
        .order('created_at', { ascending: false });
      return data;
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Takes up 2/3 of the space on desktop */}
          <article className="prose prose-invert lg:col-span-2 mx-auto lg:mx-0 w-full">
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

          {/* Sidebar - Takes up 1/3 of the space on desktop */}
          <aside className="space-y-8">
            {/* Free Consultation CTA */}
            <Card className="p-6 bg-accent/5 border-accent/20">
              <h2 className="text-2xl font-bold mb-4">Get Free Consultation</h2>
              <p className="text-muted-foreground mb-6">
                Let's discuss how we can help your business grow and achieve its goals.
              </p>
              <CTAButton 
                text="Book Your Free Consultation" 
                to="/consultation"
                variant="primary"
                className="w-full"
              />
            </Card>

            {/* Recent Posts */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
              <div className="space-y-4">
                {relatedPosts?.map((relatedPost) => (
                  <Card 
                    key={relatedPost.id}
                    className="p-4 hover:bg-accent/5 cursor-pointer transition-colors"
                    onClick={() => navigate(`/blog/${relatedPost.id}`)}
                  >
                    <h4 className="font-medium mb-2">{relatedPost.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(relatedPost.created_at), { addSuffix: true })}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;

