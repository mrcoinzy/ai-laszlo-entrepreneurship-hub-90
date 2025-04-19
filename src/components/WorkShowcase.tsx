
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface WorkItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const works: WorkItem[] = [
  {
    id: 1,
    title: "Precision Edge Knives",
    description: "Complete brand overhaul and e-commerce strategy for a premium kitchen knife manufacturer.",
    image: "/knife-showcase.jpg", // This image needs to be added to public folder
    category: "E-commerce"
  }
];

const WorkShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  
  const nextWork = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === works.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevWork = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? works.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <section className="py-16 sm:py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 gradient-text">
            Transformative Work
          </h2>
          <p className="text-lg text-white/70">
            Explore some of my most impactful projects where I've helped entrepreneurs
            scale their businesses and achieve remarkable results.
          </p>
        </div>
        
        <div className="relative">
          <Card className="bg-accent/30 border-accent overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-video md:aspect-auto overflow-hidden bg-black">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${works[currentIndex].image})`,
                      backgroundSize: "cover"
                    }}
                  >
                    {/* Placeholder - we'll need to add the actual image to the public folder */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs text-white/70 mb-6">
                      {works[currentIndex].category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
                      {works[currentIndex].title}
                    </h3>
                    <p className="text-white/70 mb-8">
                      {works[currentIndex].description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div>
                        <p className="text-sm text-white/50">Initial Investment</p>
                        <p className="text-xl font-bold gradient-text">$5,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/50">Completion Time</p>
                        <p className="text-xl font-bold gradient-text">6 Weeks</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/50">ROI</p>
                        <p className="text-xl font-bold gradient-text">358%</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/50">Revenue Increase</p>
                        <p className="text-xl font-bold gradient-text">210%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <button 
                        onClick={prevWork}
                        className="p-2 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
                        aria-label="Previous work"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        onClick={nextWork}
                        className="p-2 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
                        aria-label="Next work"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                    
                    {!isMobile && (
                      <Link to={`/works/${works[currentIndex].id}`}>
                        <Button variant="ghost" className="group">
                          View Details
                          <ChevronRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    )}
                  </div>
                  
                  {isMobile && (
                    <Link to={`/works/${works[currentIndex].id}`} className="mt-4">
                      <Button variant="ghost" className="group w-full justify-center">
                        View Details
                        <ChevronRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WorkShowcase;
