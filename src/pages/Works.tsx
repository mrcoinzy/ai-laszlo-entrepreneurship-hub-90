
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Works = () => {
  const works = [
    {
      id: 1,
      title: "Precision Edge Knives",
      description: "Complete brand overhaul and e-commerce strategy for a premium kitchen knife manufacturer.",
      image: "/knife-showcase.jpg",
      category: "E-commerce",
      initialInvestment: "$5,000",
      completionTime: "6 Weeks",
      roi: "358%",
      revenueIncrease: "210%",
      clientComment: "Ai Laszlo completely transformed our business. His strategic approach to our e-commerce platform and branding resulted in a 3x increase in sales within just two months. His understanding of both technology and marketing is truly exceptional.",
      clientName: "James Morrison",
      clientPosition: "CEO, Precision Edge"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 gradient-text">
            Featured Works
          </h1>
          <p className="text-lg text-white/70">
            Explore a selection of transformative projects where I've helped entrepreneurs
            scale their businesses and achieve remarkable results.
          </p>
        </div>
        
        {works.map((work) => (
          <Card 
            key={work.id}
            className="mb-20 bg-accent/30 border-accent hover:border-white/30 transition-all duration-300 card-hover"
          >
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-square md:aspect-auto overflow-hidden bg-black">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${work.image})`,
                      backgroundSize: "cover"
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                  </div>
                </div>
                
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs text-white/70 mb-6">
                      {work.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
                      {work.title}
                    </h3>
                    <p className="text-white/70 mb-8">
                      {work.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div>
                        <p className="text-sm text-white/50">Initial Investment</p>
                        <p className="text-xl font-bold gradient-text">{work.initialInvestment}</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/50">Completion Time</p>
                        <p className="text-xl font-bold gradient-text">{work.completionTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/50">ROI</p>
                        <p className="text-xl font-bold gradient-text">{work.roi}</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/50">Revenue Increase</p>
                        <p className="text-xl font-bold gradient-text">{work.revenueIncrease}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6 p-4 border-l-2 border-white/20">
                      <p className="text-white/80 italic mb-2">"{work.clientComment}"</p>
                      <p className="text-sm text-white/60">
                        {work.clientName}, <span className="text-white/40">{work.clientPosition}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Footer />
    </div>
  );
};

export default Works;
