
import React from "react";
import { motion } from "framer-motion";
import { User, ArrowRight } from "lucide-react";
import CTAButton from "./ui/cta-button";
import AnimatedSection from "./ui/animated-section";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const MiniIntroSection = () => {
  return (
    <AnimatedSection className="py-20 pt-28">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          {/* Image column */}
          <motion.div 
            className="md:col-span-2 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <Avatar className="w-64 h-64 border-4 border-purple-500/30 shadow-xl">
                <AvatarImage src="/placeholder.svg" alt="AI László" className="object-cover grayscale contrast-125" />
                <AvatarFallback className="bg-gradient-to-br from-purple-900/50 to-black text-4xl font-bold">
                  AL
                </AvatarFallback>
              </Avatar>
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl -z-10"></div>
            </div>
          </motion.div>
          
          {/* Text column */}
          <motion.div 
            className="md:col-span-3 text-left"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-4 inline-flex items-center">
              <User size={18} className="text-purple-400 mr-2" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                Ki az az AI László?
              </h2>
            </div>
            
            <div className="space-y-4 text-white/80">
              <p>
                Több mint 5 éve segítek vállalkozóknak abban, hogy a digitális jelenlétük valódi üzleti eredményt hozzon – nem csak szép dizájnt.
              </p>
              <p>
                Egy kézben adok mindent: AI-alapú ügyfélszerző weboldalt, hirdetéseket, kampánytartalmat és stratégiát.
              </p>
              <p>
                Nem „ügynökségként", hanem személyesen, üzleti szemlélettel dolgozom – mert a cél nem a lájk, hanem az ügyfél.
              </p>
            </div>
            
            <div className="mt-6">
              <button 
                onClick={() => {
                  const element = document.getElementById('szolgaltatasok');
                  if (element) {
                    const navHeight = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - navHeight;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }} 
                className="inline-flex items-center text-purple-400 hover:text-white group transition-colors"
              >
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default MiniIntroSection;
