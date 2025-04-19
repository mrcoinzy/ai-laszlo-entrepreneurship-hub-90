
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MiniIntroSection from "@/components/MiniIntroSection";
import ProblemStatement from "@/components/ProblemStatement";
import ServicesSection from "@/components/ServicesSection";
import TrustBuildingSection from "@/components/TrustBuildingSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import EmailLeadMagnetSection from "@/components/EmailLeadMagnetSection";
import LeadMagnetSection from "@/components/LeadMagnetSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import { Blog7 } from "@/components/ui/blog7";

const Index = () => {
  const { data: posts } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(2);
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="min-h-screen bg-black">
      <ScrollIndicator />
      <Navigation />
      <HeroSection />
      <MiniIntroSection />
      <ProblemStatement />
      <div id="services">
        <ServicesSection />
      </div>
      <div id="about">
        <TrustBuildingSection />
      </div>
      <div id="portfolio">
        <PortfolioSection />
      </div>
      <TestimonialsSection />
      <EmailLeadMagnetSection />
      <LeadMagnetSection />
      {posts && posts.length > 0 && (
        <div id="blog">
          <Blog7 
            posts={posts}
            tagline="Friss Üzleti Tippek"
            heading="Legújabb Cikkeim Önnek"
            description="Fedezze fel a legfrissebb ügyfélszerzési stratégiákat és sikertörténeteket"
            buttonText="Szeretném tudni, hogyan szerezhetek több ügyfelet"
            buttonUrl="/blog"
          />
        </div>
      )}
      <div id="contact">
        <FinalCTASection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
