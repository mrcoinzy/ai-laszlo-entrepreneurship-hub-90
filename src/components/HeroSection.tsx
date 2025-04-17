
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-black/60 z-0"></div>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-600/20 rounded-full filter blur-3xl"></div>
      <div className="absolute top-20 right-10 w-32 h-32 bg-blue-600/20 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 pt-32 pb-20 relative z-10">
        <motion.div 
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-3xl relative">
            {/* Small badge/ribbon */}
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
            
            <motion.div 
              className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="text-lg md:text-xl mb-4 font-medium text-white/90">
                🧠 Egyedi rendszert építek vállalkozásod köré:
              </p>
              <ul className="flex flex-col space-y-2 mb-6">
                <li className="flex items-center">
                  <CheckCircle size={20} className="text-purple-400 mr-2 flex-shrink-0" />
                  <span className="text-white/80">marketingstratégia,</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={20} className="text-purple-400 mr-2 flex-shrink-0" />
                  <span className="text-white/80">weboldal,</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={20} className="text-purple-400 mr-2 flex-shrink-0" />
                  <span className="text-white/80">hirdetések,</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={20} className="text-purple-400 mr-2 flex-shrink-0" />
                  <span className="text-white/80">videós tartalom –</span>
                </li>
              </ul>
              <p className="text-white/90 font-medium">
                mindezt úgy, hogy valóban ügyfeleid legyenek, ne csak nézőid.
              </p>
            </motion.div>
            
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
              className="text-center mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <p className="text-white/60 text-sm mb-6 flex flex-wrap justify-center gap-x-6 gap-y-1">
                <span className="inline-flex items-center"><span className="text-purple-400 mr-1.5">👉</span> 5+ év tapasztalat</span> 
                <span className="inline-flex items-center"><span className="text-purple-400 mr-1.5">|</span> 50+ projekt</span> 
                <span className="inline-flex items-center"><span className="text-purple-400 mr-1.5">|</span> 100% magyar nyelven</span>
              </p>
              <p className="text-white/60 text-sm">
                <span className="inline-flex items-center"><span className="text-purple-400 mr-1.5">👉</span> Garantált figyelem, nem sablonmunka</span>
              </p>
            </motion.div>
            
            <motion.div 
              className="mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className="grid grid-cols-3 gap-8 md:gap-12 lg:gap-20 items-center max-w-3xl mx-auto">
                <img src="/lovable-uploads/6ab4697c-84e2-4cbc-9d93-646a500bf266.png" alt="Partner Logo" className="h-6 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <img src="/lovable-uploads/29be933e-5bf8-4b71-8ab8-dc0061de73ba.png" alt="Partner Logo" className="h-6 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <img src="/lovable-uploads/6ab4697c-84e2-4cbc-9d93-646a500bf266.png" alt="Partner Logo" className="h-6 object-contain opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
