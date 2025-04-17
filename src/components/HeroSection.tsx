
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 sm:px-6 pt-32 pb-20 relative z-10">
        <motion.div 
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-3xl relative">
            {/* Enhanced gradient backdrop behind headline */}
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 via-purple-500/10 to-transparent blur-xl rounded-3xl -z-10"></div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tighter mb-6 text-white">
              AI-alapú ügyfélszerzés vállalkozóknak – <span className="text-[#8A2BE2] relative">
                stratégia, technológia, kreatív
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#8A2BE2] to-transparent"></span>
              </span> egy kézben.
            </h1>
            
            <motion.div 
              className="text-lg md:text-xl text-white/80 mb-10 mx-auto glass-panel p-8 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="mb-4">
                Egyedi rendszert építek vállalkozásod köré:
              </p>
              <ul className="flex flex-col space-y-2 mb-4">
                <li className="flex items-center justify-center">
                  <span className="flex items-center justify-center w-6 h-6 mr-3 rounded-full bg-[#8A2BE2]/20 text-[#8A2BE2]">✓</span> 
                  marketingstratégia,
                </li>
                <li className="flex items-center justify-center">
                  <span className="flex items-center justify-center w-6 h-6 mr-3 rounded-full bg-[#8A2BE2]/20 text-[#8A2BE2]">✓</span> 
                  weboldal,
                </li>
                <li className="flex items-center justify-center">
                  <span className="flex items-center justify-center w-6 h-6 mr-3 rounded-full bg-[#8A2BE2]/20 text-[#8A2BE2]">✓</span> 
                  hirdetések,
                </li>
                <li className="flex items-center justify-center">
                  <span className="flex items-center justify-center w-6 h-6 mr-3 rounded-full bg-[#8A2BE2]/20 text-[#8A2BE2]">✓</span> 
                  videós tartalom –
                </li>
              </ul>
              <p>
                mindezt úgy, hogy <span className="font-semibold relative inline-block">
                  <span className="relative z-10 text-white">valóban ügyfeleid legyenek</span>
                  <span className="absolute bottom-0 left-0 w-full h-2 bg-[#8A2BE2]/30 -z-1"></span>
                </span>, ne csak nézőid.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-5 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Link to="/contact">
                <Button className="bg-[#8A2BE2] text-white hover:bg-[#7B1FA2] 
                  hover:shadow-[0_10px_25px_-5px_rgba(138,43,226,0.5)] 
                  hover:-translate-y-1 px-8 py-6 rounded-xl text-base 
                  transition-all duration-300 group relative overflow-hidden w-full sm:w-auto">
                  <span className="relative z-10 flex items-center">
                    Kérek egy díjmentes konzultációt
                    <ChevronRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#9A4BF2] to-[#8A2BE2] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </Link>
              <p className="text-xs text-white/60 mt-2 sm:hidden">
                48 órán belül személyesen felveszem Önnel a kapcsolatot.
              </p>
              <Link to="/courses">
                <Button variant="outline" className="px-8 py-6 rounded-xl text-base border-white/20 bg-white/5 backdrop-blur-sm hover:bg-[#8A2BE2]/10 hover:border-[#8A2BE2]/50 hover:text-white transition-all duration-300 w-full sm:w-auto">
                  Nézze meg, hogyan dolgozom
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center px-5 py-3 rounded-full glass-panel">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/80">
                  <span className="flex items-center">
                    <span className="text-[#8A2BE2] mr-1">👉</span> 5+ év tapasztalat
                  </span>
                  <span className="hidden sm:block text-white/30">|</span>
                  <span className="flex items-center">
                    <span className="text-[#8A2BE2] mr-1">👉</span> 50+ projekt
                  </span>
                  <span className="hidden sm:block text-white/30">|</span>
                  <span className="flex items-center">
                    <span className="text-[#8A2BE2] mr-1">👉</span> 100% magyar nyelven
                  </span>
                </div>
              </div>
              <p className="text-sm text-white/70 mt-3">
                Garantált figyelem, nem sablonmunka
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
