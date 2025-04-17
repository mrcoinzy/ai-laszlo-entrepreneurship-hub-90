
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-black/60 z-0"></div>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10 z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Animated gradient blobs */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-purple-600/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-blue-600/20 rounded-full filter blur-[120px] animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full filter blur-[80px] animate-pulse-slow animation-delay-1000"></div>
        
        {/* Small floating particles */}
        <div className="absolute w-full h-full opacity-30">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>
      
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
              
              {/* Improved styling for the boxes */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 shadow-sm hover:shadow-purple-500/10">
                  <div className="flex items-center">
                    <CheckCircle size={18} className="text-purple-400 mr-2 flex-shrink-0" />
                    <span className="text-white/80 text-sm sm:text-base truncate">marketingstratégia</span>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 shadow-sm hover:shadow-purple-500/10">
                  <div className="flex items-center">
                    <CheckCircle size={18} className="text-purple-400 mr-2 flex-shrink-0" />
                    <span className="text-white/80 text-sm sm:text-base truncate">weboldal</span>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 shadow-sm hover:shadow-purple-500/10">
                  <div className="flex items-center">
                    <CheckCircle size={18} className="text-purple-400 mr-2 flex-shrink-0" />
                    <span className="text-white/80 text-sm sm:text-base truncate">hirdetések</span>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 shadow-sm hover:shadow-purple-500/10">
                  <div className="flex items-center">
                    <CheckCircle size={18} className="text-purple-400 mr-2 flex-shrink-0" />
                    <span className="text-white/80 text-sm sm:text-base truncate">videós tartalom</span>
                  </div>
                </div>
              </div>
              
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
                {/* No logos section */}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
