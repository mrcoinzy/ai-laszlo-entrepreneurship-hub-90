
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
      
      {/* Curved gradient lines background similar to reference images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-full h-full">
          <img 
            src="/lovable-uploads/3f5323ac-a3e3-49de-ad38-a0589dfd2c64.png" 
            alt="Background Wave"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 pt-32 pb-20 relative z-10">
        <motion.div 
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-3xl relative">
            {/* Small badge/ribbon similar to reference image */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 inline-block"
            >
              <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Új szolgáltatások érhetők el!
              </span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tighter mb-6 text-white">
              AI-alapú ügyfélszerzés <span className="bg-gradient-to-r from-white via-purple-300 to-blue-300 bg-clip-text text-transparent">egyedülálló</span> megközelítéssel
            </h1>
            
            <motion.p 
              className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Egyedi rendszert építek vállalkozása köré: marketingstratégia, weboldal, hirdetések, videós tartalom – úgy, hogy valóban ügyfelei legyenek, ne csak nézői.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-5 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-[0_8px_25px_-5px_rgba(138,43,226,0.5)] 
                  hover:-translate-y-1 px-8 py-6 rounded-xl text-base 
                  transition-all duration-300 group border-0">
                  <span className="relative z-10 flex items-center">
                    Kérek egy díjmentes konzultációt
                    <ChevronRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" className="px-8 py-6 rounded-xl text-base border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300">
                  Nézze meg, hogyan dolgozom
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="grid grid-cols-3 gap-8 md:gap-12 lg:gap-20 items-center max-w-3xl mx-auto">
                <img src="/lovable-uploads/6ab4697c-84e2-4cbc-9d93-646a500bf266.png" alt="Partner Logo" className="h-6 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <img src="/lovable-uploads/29be933e-5bf8-4b71-8ab8-dc0061de73ba.png" alt="Partner Logo" className="h-6 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <img src="/lovable-uploads/6ab4697c-84e2-4cbc-9d93-646a500bf266.png" alt="Partner Logo" className="h-6 object-contain opacity-70 hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-white/50 mt-6">
                Garantált figyelem, nem sablonmunka • 5+ év tapasztalat • 50+ projekt
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-600/20 rounded-full filter blur-3xl"></div>
      <div className="absolute top-20 right-10 w-32 h-32 bg-blue-600/20 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default HeroSection;
