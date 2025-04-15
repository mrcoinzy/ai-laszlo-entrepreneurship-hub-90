
import React from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProblemStatement from "@/components/ProblemStatement";
import ServicesSection from "@/components/ServicesSection";
import TrustBuildingSection from "@/components/TrustBuildingSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LeadMagnetSection from "@/components/LeadMagnetSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <ScrollIndicator />
      <Navigation />
      <HeroSection />
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
      <div id="blog">
        <LeadMagnetSection />
      </div>
      <div id="contact">
        <FinalCTASection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
