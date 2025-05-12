
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const isMobile = useIsMobile();
  
  // Transform for parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-purple-900/20 to-transparent"></div>
        <div 
          className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-gradient-to-tr from-purple-700/10 to-transparent rounded-full blur-[80px] animate-pulse-slow"
        ></div>
        <div 
          className="absolute bottom-[10%] -right-[5%] w-[30%] h-[30%] bg-gradient-to-tl from-purple-800/10 to-transparent rounded-full blur-[70px] animate-pulse-slow animation-delay-1000"
        ></div>
        <div 
          className="absolute top-[40%] -right-[5%] w-[25%] h-[25%] bg-gradient-to-bl from-indigo-600/10 to-transparent rounded-full blur-[70px] animate-pulse-slow animation-delay-2000"
        ></div>
        
        {/* Star field effect */}
        <div className="absolute inset-0 stars"></div>
      </div>
      
      {/* Hero content */}
      <motion.div 
        style={{ y, opacity }} 
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 z-10 pt-16 md:pt-0"
      >
        <div className="container max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }} 
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tighter mb-6 text-white">
              <span className="golden-text-gradient font-extrabold">Egy kézből Ai-val felgyorsítvát</span> -
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9A4BF2] to-[#B066FF]">
                Vevőszerző rendszer
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed text-white/80">
              Adjon 30 napot – és én egy teljes vevőszerző rendszert építek Önnek, 
              amely folyamatosan új ajánlatkéréseket hoz. Ha nem lesz elégedett, visszaadom a pénzét.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }} 
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center space-y-5"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
              <Link to="/consultation" className="w-full sm:w-auto">
                <Button 
                  className="
                    w-full
                    bg-gradient-to-r from-[#9A4BF2] to-[#7B1FA2] 
                    text-white hover:shadow-[0_10px_25px_-5px_rgba(138,43,226,0.4)] 
                    hover:-translate-y-1 
                    px-6 py-4 sm:px-8 sm:py-6 
                    rounded-xl text-base sm:text-lg 
                    transition-all duration-300 group
                  "
                >
                  <span className="flex items-center justify-center gap-1">
                    Kérek egy díjmentes konzultációt 
                    <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
              <a href="#miert-engem" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="
                    w-full
                    border-purple-500/40 hover:border-purple-500 
                    text-white hover:bg-zinc-900/90 
                    hover:-translate-y-1 
                    px-6 py-4 sm:px-8 sm:py-6 
                    rounded-xl text-base sm:text-lg 
                    transition-all duration-300
                    focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                  "
                >
                  Miért bízzon bennem?
                </Button>
              </a>
            </div>
            
            <div className="mt-10 sm:mt-14 flex flex-col items-center">
              <div className="text-white/50 mb-2 text-center">Görgessen lejjebb és fedezze fel, hogyan segíthetek</div>
              <ChevronDown className="h-6 w-6 text-white/50 animate-bounce" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
