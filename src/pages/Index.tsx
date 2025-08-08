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
      <main className="w-full overflow-visible">
        <HeroSection />
      </main>
    </div>
  );
};

export default Index;
