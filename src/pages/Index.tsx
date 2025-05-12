
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
import { ScrollReveal, ScrollRevealY } from "@/components/ui/scroll-reveal";

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

  // Apply scroll reveal wrapper to sections
  const withScrollReveal = (component) => (
    <ScrollRevealY className="w-full" width="100%" distance={30}>
      {component}
    </ScrollRevealY>
  );

  return (
    <div className="min-h-screen w-full bg-black overflow-visible">
      <ScrollIndicator />
      <Navigation />
      <main className="w-full overflow-visible">
        <HeroSection />
        <div id="bemutatkozas">
          {withScrollReveal(<MiniIntroSection />)}
        </div>
        <div id="garancia">
          <ProblemStatement />
        </div>
        <div id="szolgaltatasok">
          {withScrollReveal(<ServicesSection />)}
        </div>
        <div id="miert-engem">
          {withScrollReveal(<TrustBuildingSection />)}
        </div>
        <div id="eredmenyeim">
          {withScrollReveal(<PortfolioSection />)}
        </div>
        <div id="ugyfeleim">
          {withScrollReveal(<TestimonialsSection />)}
        </div>
        {withScrollReveal(<EmailLeadMagnetSection />)}
        {withScrollReveal(<LeadMagnetSection />)}
        {posts && posts.length > 0 && (
          <div id="blog">
            {withScrollReveal(
              <Blog7 
                posts={posts}
                tagline="Friss Üzleti Tippek"
                heading="Legújabb Cikkeim Önnek"
                description="Fedezze fel a legfrissebb ügyfélszerzési stratégiákat és sikertörténeteket"
                buttonText="Szeretném tudni, hogyan szerezhetek több ügyfelet"
                buttonUrl="/blog"
              />
            )}
          </div>
        )}
        <div id="contact">
          {withScrollReveal(<FinalCTASection />)}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
