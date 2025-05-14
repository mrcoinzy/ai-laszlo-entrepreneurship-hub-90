
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CTAButton from "./ui/cta-button";
import { ScrollReveal, ScrollRevealY } from "@/components/ui/scroll-reveal";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-black/60 z-0"></div>
      
      {/* Animated background elements - reduced complexity on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Animated gradient blobs - fewer on mobile */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-purple-600/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
        {!isMobile && (
          <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-blue-600/20 rounded-full filter blur-[120px] animate-pulse-slow animation-delay-2000"></div>
        )}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full filter blur-[80px] animate-pulse-slow animation-delay-1000"></div>
        
        {/* Small floating particles - fewer on mobile */}
        <div className="absolute w-full h-full opacity-30">
          {[...Array(isMobile ? 10 : 20)].map((_, i) => (
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
      
      {/* Decorative elements - optimized for mobile */}
      {!isMobile && (
        <>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-600/20 rounded-full filter blur-3xl"></div>
          <div className="absolute top-20 right-10 w-32 h-32 bg-blue-600/20 rounded-full filter blur-3xl"></div>
        </>
      )}
      
      <div className="container mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-20 relative z-10">
        <motion.div 
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-3xl mx-auto relative">
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
            
            <ScrollRevealY className="w-full mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter mb-6 text-white">
                Teljes online vállalkozási rendszer - <span className="bg-gradient-to-r from-white via-purple-300 to-blue-300 bg-clip-text text-transparent">egy kézből AI-al felgyorsítva</span>
              </h1>
            </ScrollRevealY>
            
            <ScrollRevealY 
              className="text-base md:text-xl text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto w-full"
              delay={0.3}
            >
              <p className="text-base sm:text-lg md:text-xl mb-4 font-medium text-white/90">
                🧠 Egyedi rendszert építek, ami vevőket hoz, nem csak látogatókat:
              </p>
              
              {/* Improved styling for the boxes - Single column on mobile, 2 columns on larger screens */}
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-3 mb-6`}>
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 shadow-sm hover:shadow-purple-500/10">
                  <div className="flex items-center">
                    <CheckCircle size={18} className="text-purple-400 mr-3 flex-shrink-0" />
                    <span className="text-white/80 text-sm sm:text-base">marketingstratégia</span>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 shadow-sm hover:shadow-purple-500/10">
                  <div className="flex items-center">
                    <CheckCircle size={18} className="text-purple-400 mr-3 flex-shrink-0" />
                    <span className="text-white/80 text-sm sm:text-base">weboldal</span>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 shadow-sm hover:shadow-purple-500/10">
                  <div className="flex items-center">
                    <CheckCircle size={18} className="text-purple-400 mr-3 flex-shrink-0" />
                    <span className="text-white/80 text-sm sm:text-base">hirdetések</span>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 shadow-sm hover:shadow-purple-500/10">
                  <div className="flex items-center">
                    <CheckCircle size={18} className="text-purple-400 mr-3 flex-shrink-0" />
                    <span className="text-white/80 text-sm sm:text-base">videós tartalom</span>
                  </div>
                </div>
              </div>
              
              <p className="text-white/90 font-medium">
                Mindezt úgy, hogy valóban ügyfelei legyenek, ne csak látogatói.
              </p>
            </ScrollRevealY>
            
            <ScrollReveal delay={0.5} className="w-full mx-auto">
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link to="/consultation" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-[0_8px_25px_-5px_rgba(138,43,226,0.5)] 
                    hover:-translate-y-1 px-6 sm:px-8 py-5 sm:py-6 rounded-xl text-sm sm:text-base 
                    transition-all duration-300 group border-0">
                    <span className="relative z-10 flex items-center justify-center">
                      Kérek egy díjmentes konzultációt
                      <ChevronRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
                <Link to="#ugyfeleim" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 rounded-xl text-sm sm:text-base border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300">
                    Nézze meg az ügyfeleim eredményeit
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.6} className="w-full mx-auto">
              <div className="text-center mt-8 sm:mt-10">
                <p className="text-white/60 text-xs sm:text-sm mb-4 sm:mb-6 flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-1">
                  <span className="inline-flex items-center"><span className="text-purple-400 mr-1.5">👉</span> 5+ év tapasztalat</span> 
                  <span className="inline-flex items-center"><span className="text-purple-400 mr-1.5">|</span> 50+ projekt</span> 
                  <span className="inline-flex items-center"><span className="text-purple-400 mr-1.5">|</span> 100% magyar nyelven</span>
                </p>
                <p className="text-white/60 text-xs sm:text-sm">
                  <span className="inline-flex items-center"><span className="text-purple-400 mr-1.5">👉</span> Garantált figyelem, nem sablonmunka</span>
                </p>
              </div>
            </ScrollReveal>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
