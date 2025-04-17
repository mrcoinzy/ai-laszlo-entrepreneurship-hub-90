
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <AnimatedBackground />
      <div className="container mx-auto px-4 sm:px-6 pt-32 pb-20">
        <motion.div 
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tighter mb-6">
              AI-alapú ügyfélszerzés vállalkozóknak – <span className="text-[#8A2BE2]">stratégia, technológia, kreatív</span> egy kézben.
            </h1>
            <motion.div 
              className="text-lg md:text-xl text-white/70 mb-8 mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="mb-4">
                Egyedi rendszert építek vállalkozásod köré:
              </p>
              <ul className="flex flex-col space-y-1 mb-4">
                <li className="flex items-center justify-center">
                  <span className="text-[#8A2BE2] font-semibold mr-2">✅</span> marketingstratégia,
                </li>
                <li className="flex items-center justify-center">
                  <span className="text-[#8A2BE2] font-semibold mr-2">✅</span> weboldal,
                </li>
                <li className="flex items-center justify-center">
                  <span className="text-[#8A2BE2] font-semibold mr-2">✅</span> hirdetések,
                </li>
                <li className="flex items-center justify-center">
                  <span className="text-[#8A2BE2] font-semibold mr-2">✅</span> videós tartalom –
                </li>
              </ul>
              <p>
                mindezt úgy, hogy <span className="text-[#8A2BE2] font-semibold">valóban ügyfeleid legyenek</span>, ne csak nézőid.
              </p>
            </motion.div>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Link to="/contact">
                <Button className="bg-[#8A2BE2] text-white hover:bg-[#7B1FA2] hover:shadow-[0_10px_25px_-5px_rgba(138,43,226,0.3)] hover:-translate-y-1 px-8 py-6 rounded-xl text-base transition-all duration-300 group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    Kérek egy díjmentes konzultációt
                    <ChevronRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
              <p className="text-xs text-white/60 mt-2 sm:hidden">
                48 órán belül személyesen felveszem Önnel a kapcsolatot.
              </p>
              <Link to="/courses">
                <Button variant="outline" className="px-8 py-6 rounded-xl text-base hover:bg-[#8A2BE2]/10 hover:text-white hover:border-[#8A2BE2] transition-all duration-300">
                  Nézze meg, hogyan dolgozom
                </Button>
              </Link>
            </motion.div>
            <motion.div 
              className="text-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
                <span className="flex items-center">
                  <span className="text-[#8A2BE2] mr-1">👉</span> 5+ év tapasztalat
                </span>
                <span className="flex items-center">
                  <span className="hidden sm:inline">|</span>
                </span>
                <span className="flex items-center">
                  <span className="text-[#8A2BE2] mr-1">👉</span> 50+ projekt
                </span>
                <span className="flex items-center">
                  <span className="hidden sm:inline">|</span>
                </span>
                <span className="flex items-center">
                  <span className="text-[#8A2BE2] mr-1">👉</span> 100% magyar nyelven
                </span>
              </div>
              <p className="text-sm text-white/70 mt-2">
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
