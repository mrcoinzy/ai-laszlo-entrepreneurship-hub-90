
import React from "react";
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
import BlogPostList from "@/components/BlogPostList";

const Index = () => {
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
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Latest Blog Posts</h2>
        <BlogPostList />
      </div>
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
