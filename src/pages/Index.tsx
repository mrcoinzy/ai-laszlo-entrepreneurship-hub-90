
import React from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WorkShowcase from "@/components/WorkShowcase";
import CoursesSection from "@/components/CoursesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <WorkShowcase />
        <CoursesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
