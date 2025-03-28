
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 gradient-text text-center">
            About Ai Laszlo
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-white/80 mb-6">
              Ai Laszlo is a visionary entrepreneur, mentor, and business strategist with over 10 years of experience
              helping startups transform their ideas into thriving businesses.
            </p>
            
            <p className="text-lg text-white/80 mb-6">
              With a background in both technology and marketing, Ai brings a unique perspective to business development,
              combining cutting-edge AI tools with proven marketing strategies to create sustainable growth for his clients.
            </p>
            
            <p className="text-lg text-white/80 mb-10">
              Throughout his career, Ai has mentored more than 200 startups across various industries, with an impressive
              85% success rate. His clients have collectively generated over $12 million in revenue, and his training programs
              have educated more than 5,000 entrepreneurs worldwide.
            </p>
            
            <h2 className="text-2xl font-bold mb-4 gradient-text">Philosophy</h2>
            <p className="text-lg text-white/80 mb-6">
              Ai believes that entrepreneurship is not just about creating profitable businesses but about solving real problems
              and making a positive impact. His approach focuses on sustainable growth, ethical business practices, and
              leveraging technology to create efficient systems that scale.
            </p>
            
            <h2 className="text-2xl font-bold mb-4 gradient-text">Expertise</h2>
            <ul className="space-y-2 text-white/80 mb-10">
              <li>• Business strategy and market positioning</li>
              <li>• AI integration for business optimization</li>
              <li>• Digital marketing and brand development</li>
              <li>• E-commerce optimization and scaling</li>
              <li>• Bootstrap entrepreneurship</li>
            </ul>
            
            <div className="bg-accent/30 p-6 rounded-lg border border-white/10 text-center mb-8">
              <h3 className="text-xl font-bold mb-3 gradient-text">Ready to transform your business?</h3>
              <p className="text-white/70 mb-4">
                Book a free 30-minute consultation to discuss your business goals and challenges.
              </p>
              <a 
                href="mailto:consult@ailaszlo.com" 
                className="inline-block bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
              >
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
