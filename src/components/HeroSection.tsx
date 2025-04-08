
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.1)_0,rgba(0,0,0,0)_70%)]"></div>
      <div className="container mx-auto px-4 sm:px-6 pt-32 pb-20">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tighter mb-6">
              Weboldal és marketing egyben, hogy vállalkozása <span className="waving-gradient">vevőmágnessé</span> váljon.
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-8 mx-auto">
              AI László abban segít Önnek, hogy vállalkozása ne csak jelen legyen az interneten, hanem eredményeket is hozzon. Teljes körű webfejlesztés és marketing – egy kézből, érthetően és hatékonyan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-white text-black hover:bg-white/90 px-8 py-6 rounded-md text-base">
                  Kérek egy ingyenes konzultációt
                  <ChevronRight size={18} className="ml-2" />
                </Button>
              </Link>
              <p className="text-xs text-white/60 mt-2 sm:hidden">
                48 órán belül személyesen felveszem Önnel a kapcsolatot.
              </p>
              <Link to="/courses">
                <Button variant="outline" className="px-8 py-6 rounded-md text-base">
                  Browse Free Courses
                </Button>
              </Link>
            </div>
            <p className="text-xs text-white/60 mt-2 hidden sm:block">
              48 órán belül személyesen felveszem Önnel a kapcsolatot.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
