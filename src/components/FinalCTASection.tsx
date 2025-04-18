
import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";

const FinalCTASection = () => {
  return (
    <section className="w-full bg-black py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#0A0A1A] to-transparent"></div>
        <div className="absolute bottom-0 left-1/4 w-full h-96 bg-gradient-to-tr from-purple-600/10 to-transparent rounded-full filter blur-[100px]"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center"
        >
          <div className="inline-flex mb-4">
            <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <TextEffect per="char" preset="fade">
                Egyszerű következő lépés
              </TextEffect>
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white to-purple-300 bg-clip-text text-transparent">
            <TextEffect per="word" preset="slide">
              Kérek egy konzultációt
            </TextEffect>
          </h2>
          
          <p className="text-lg text-white/70 max-w-3xl mx-auto mb-12">
            <TextEffect per="word" preset="fade" delay={0.3}>
              48 órán belül személyesen felveszem Önnel a kapcsolatot.
            </TextEffect>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_10px_40px_-15px_rgba(138,43,226,0.3)]"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center border border-white/20">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-white">
                <TextEffect per="word" preset="fade" delay={0.3}>
                  Üzenet küldése
                </TextEffect>
              </h3>
              
              <p className="text-white/70 mb-6">
                <TextEffect per="word" preset="fade" delay={0.4}>
                  Küldjön üzenetet, és részletezze projektjét, én pedig 48 órán belül válaszolok.
                </TextEffect>
              </p>
              
              <Link to="/contact">
                <Button variant="secondary" className="px-8 py-6 rounded-xl text-base">
                  <TextEffect per="word" preset="fade" delay={0.5}>
                    Üzenet küldése
                  </TextEffect>
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_10px_40px_-15px_rgba(138,43,226,0.3)]"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center border border-white/20">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-white">
                <TextEffect per="word" preset="fade" delay={0.3}>
                  Konzultáció foglalása
                </TextEffect>
              </h3>
              
              <p className="text-white/70 mb-6">
                <TextEffect per="word" preset="fade" delay={0.4}>
                  Foglaljon egy 30 perces ingyenes konzultációt, hogy megbeszéljük az Ön projektjét és céljait.
                </TextEffect>
              </p>
              
              <Link to="/contact">
                <RainbowButton>
                  <TextEffect per="word" preset="fade" delay={0.5}>
                    Időpont foglalása
                  </TextEffect>
                </RainbowButton>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
