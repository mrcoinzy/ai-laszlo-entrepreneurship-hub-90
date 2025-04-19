
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Blog7 } from "@/components/ui/blog7";

const BlogListing = () => {
  const { data: posts } = useQuery({
    queryKey: ['all-blog-posts'],
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

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <div className="pt-24">
        {posts && posts.length > 0 && (
          <Blog7 
            posts={posts}
            tagline="All Articles"
            heading="Our Blog"
            description="Explore our complete collection of insights, tutorials, and updates."
            gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4"
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogListing;
