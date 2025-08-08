import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MiniIntroSection from "@/components/MiniIntroSection";
import ProblemStatement from "@/components/ProblemStatement";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
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
import StatsSection from "@/components/StatsSection";
import ProcessSection from "@/components/ProcessSection";
import ToolsSection from "@/components/ToolsSection";

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

  React.useEffect(() => {
    document.title = "Webfejlesztés és online marketing | AI László";
    const desc = "Modern weboldal, arculat és online hirdetés – mind egy kézből, hogy vállalkozásod ne csak létezzen, hanem növekedjen is.";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;
  }, []);


  // Apply scroll reveal wrapper to sections
  const withScrollReveal = (component) => (
    <ScrollRevealY className="w-full mx-auto" width="100%" distance={30}>
      {component}
    </ScrollRevealY>
  );

  return (
    <div className="min-h-screen w-full bg-black overflow-visible">
      <ScrollIndicator />
      <Navigation />
      <main className="w-full overflow-visible">
        <HeroSection />
        <div id="bemutatkozas" className="w-full">
          {withScrollReveal(<MiniIntroSection />)}
        </div>
        <div id="garancia" className="w-full">
          <ProblemStatement />
        </div>
        <div id="szolgaltatasok" className="w-full">
          {withScrollReveal(<ServicesSection />)}
        </div>
        <div id="arlista" className="w-full">
          {withScrollReveal(<PricingSection />)}
        </div>
        <div id="miert-engem" className="w-full">
          {withScrollReveal(<TrustBuildingSection />)}
        </div>
        <div className="w-full">
          {withScrollReveal(<StatsSection />)}
        </div>
        <div className="w-full">
          {withScrollReveal(<ToolsSection />)}
        </div>
        <div id="eredmenyeim" className="w-full">
          {withScrollReveal(<PortfolioSection />)}
        </div>
        <div id="ugyfeleim" className="w-full">
          {withScrollReveal(<TestimonialsSection />)}
        </div>
        <div className="w-full">
          {withScrollReveal(<ProcessSection />)}
        </div>
        <div className="w-full">
          {withScrollReveal(<EmailLeadMagnetSection />)}
        </div>
        <div className="w-full">
          {withScrollReveal(<LeadMagnetSection />)}
        </div>
        {posts && posts.length > 0 && (
          <div id="blog" className="w-full max-w-full overflow-x-hidden">
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
        <div id="contact" className="w-full">
          {withScrollReveal(<FinalCTASection />)}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
