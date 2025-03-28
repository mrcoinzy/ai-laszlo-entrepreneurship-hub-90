
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.1)_0,rgba(0,0,0,0)_70%)]"></div>
      <div className="container mx-auto px-4 sm:px-6 pt-32 pb-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tighter mb-6">
              Empowering <span className="gradient-text">entrepreneurs</span> to turn ideas into success stories
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl">
              Ai Laszlo is a visionary entrepreneur and mentor who has helped hundreds of startups 
              transform their ideas into thriving businesses with innovative strategies and cutting-edge AI tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/works">
                <Button className="bg-white text-black hover:bg-white/90 px-8 py-6 rounded-md text-base">
                  Explore My Work
                  <ChevronRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" className="px-8 py-6 rounded-md text-base">
                  Browse Free Courses
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 mt-12 md:mt-0">
            <div className="relative">
              <div className="w-full h-[400px] sm:h-[500px] bg-gradient-to-br from-gray-800/30 to-black/50 rounded-lg flex items-center justify-center rotating-border">
                <div className="text-center p-8">
                  <h2 className="text-2xl font-bold mb-4 gradient-text">From Zero to Hero</h2>
                  <p className="text-white/70 mb-8">
                    10+ years of experience helping entrepreneurs build successful businesses from scratch.
                  </p>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-3xl font-bold gradient-text">200+</p>
                      <p className="text-sm text-white/50">Startups Mentored</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold gradient-text">85%</p>
                      <p className="text-sm text-white/50">Success Rate</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold gradient-text">$12M+</p>
                      <p className="text-sm text-white/50">Client Revenue</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold gradient-text">5000+</p>
                      <p className="text-sm text-white/50">Students Trained</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
