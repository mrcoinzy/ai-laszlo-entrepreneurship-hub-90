
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
              Elege van abból, hogy a weboldala csak viszi a pénzt, de <span className="text-[#8A2BE2]">nem hoz ügyfeleket?</span>
            </h1>
            <motion.p 
              className="text-lg md:text-xl text-white/70 mb-8 mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Segítek, hogy honlapja vevőmágnessé váljon — marketingre optimalizált fejlesztéssel, <span className="text-[#8A2BE2] font-semibold">garantált eredménnyel</span>.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Link to="/contact">
                <Button className="bg-[#8A2BE2] text-white hover:bg-[#7B1FA2] hover:shadow-[0_10px_25px_-5px_rgba(138,43,226,0.3)] hover:-translate-y-1 px-8 py-6 rounded-xl text-base transition-all duration-300 group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    Ingyenes auditot szeretnék
                    <ChevronRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
              <p className="text-xs text-white/60 mt-2 sm:hidden">
                48 órán belül személyesen felveszem Önnel a kapcsolatot.
              </p>
              <Link to="/courses">
                <Button variant="outline" className="px-8 py-6 rounded-xl text-base hover:bg-[#8A2BE2]/10 hover:text-white hover:border-[#8A2BE2] transition-all duration-300">
                  Ingyenes tudástár böngészése
                </Button>
              </Link>
            </motion.div>
            <motion.p 
              className="text-xs text-white/60 mt-4 hidden sm:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              48 órán belül személyesen felveszem Önnel a kapcsolatot, és átbeszéljük a lehetőségeket.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
