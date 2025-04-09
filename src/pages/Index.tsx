
import React from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProblemStatement from "@/components/ProblemStatement";
import ServicesSection from "@/components/ServicesSection";
import TrustBuildingSection from "@/components/TrustBuildingSection";
import CoursesSection from "@/components/CoursesSection";
import WorkShowcase from "@/components/WorkShowcase";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <ScrollIndicator />
      <Navigation />
      <HeroSection />
      <ProblemStatement />
      <ServicesSection />
      <TrustBuildingSection />
      <CoursesSection />
      <WorkShowcase />
      <Footer />
    </div>
  );
};

export default Index;
