
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Blog7 } from "@/components/ui/blog7";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollRevealY } from "@/components/ui/scroll-reveal";

const BlogListing = () => {
  const isMobile = useIsMobile();
  
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
      <div className="pt-16 sm:pt-24 w-full">
        {posts && posts.length > 0 && (
          <ScrollRevealY className="w-full">
            <Blog7 
              posts={posts}
              tagline="Összes blog"
              heading="Személyes blogjaim"
              description="Fedezd fel az összes informatív blogjaimat, amelyeket napra készen írok meg."
              gridClassName={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mx-auto ${
                isMobile ? 'p-4 max-w-full pb-16' : 'p-6 max-w-7xl'
              }`}
            />
          </ScrollRevealY>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogListing;
