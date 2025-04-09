
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.1)_0,rgba(0,0,0,0)_70%)]"></div>
      <div className="container mx-auto px-4 sm:px-6 pt-32 pb-20">
        <motion.div 
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tighter mb-6">
              Weboldal és marketing egyben, hogy vállalkozása <span className="vevomagnes-text relative">vevőmágnessé</span> váljon.
            </h1>
            <motion.p 
              className="text-lg md:text-xl text-white/70 mb-8 mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              AI László abban segít Önnek, hogy vállalkozása ne csak jelen legyen az interneten, hanem eredményeket is hozzon. Teljes körű webfejlesztés és marketing – egy kézből, érthetően és hatékonyan.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Link to="/contact">
                <Button className="bg-white text-black hover:bg-white/90 hover:shadow-[0_10px_25px_-5px_rgba(138,43,226,0.3)] hover:-translate-y-1 px-8 py-6 rounded-md text-base transition-all duration-300">
                  <span className="relative z-10">Kérek egy ingyenes konzultációt</span>
                  <ChevronRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <p className="text-xs text-white/60 mt-2 sm:hidden">
                48 órán belül személyesen felveszem Önnel a kapcsolatot.
              </p>
              <Link to="/courses">
                <Button variant="outline" className="px-8 py-6 rounded-md text-base hover:bg-white/10 hover:text-white transition-all duration-300">
                  Ingyenes kurzusok böngészése
                </Button>
              </Link>
            </motion.div>
            <motion.p 
              className="text-xs text-white/60 mt-2 hidden sm:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              48 órán belül személyesen felveszem Önnel a kapcsolatot.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
