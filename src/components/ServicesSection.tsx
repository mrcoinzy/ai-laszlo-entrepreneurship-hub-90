
import React from "react";
import { Code, Target, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  const services = [
    {
      icon: <Code className="h-12 w-12 text-purple-500 mb-4" />,
      title: "Website Development",
      description: "Modern, responsive business websites optimized for SEO, speed and conversions. Built with code or modern no-code tools."
    },
    {
      icon: <Target className="h-12 w-12 text-purple-500 mb-4" />,
      title: "Online Marketing Strategy",
      description: "Customized SEO, PPC, content and email marketing plans that align with your goals and resources."
    },
    {
      icon: <LineChart className="h-12 w-12 text-purple-500 mb-4" />,
      title: "Conversion Optimization",
      description: "A/B testing, UX enhancements, CTA tuning and analytics – so more visitors become real clients."
    }
  ];

  return (
    <section className="w-full bg-black py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            My Services That Deliver <span className="text-[#8A2BE2]">Results</span>
          </h2>
          <p className="text-lg text-white/70">
            Everything you need for a high-converting online presence – in one place, backed by AI.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 bg-zinc-900/50 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
            >
              {service.icon}
              <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
              <p className="text-white/70">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/contact">
            <Button 
              className="bg-white text-black hover:bg-white/90 px-8 py-6 rounded-md text-base"
            >
              Not sure what you need? Let's talk – book a free consultation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
