
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FinalCTASection = () => {
  return (
    <section className="py-28 bg-black overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Készen áll arra, hogy vállalkozása végre <span className="gradient-text">valódi eredményeket</span> érjen el online?
          </h2>
          <p className="text-lg text-white/70 mb-10">
            Foglaljon időpontot egy ingyenes konzultációra, ahol átbeszéljük, hogyan alakíthatjuk át az online jelenlétét ügyfélszerző gépezetté – érthetően, konkrétan, sablonok nélkül.
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8"
          >
            <Link to="/contact">
              <Button
                className="bg-[#8A2BE2] text-white hover:bg-[#9A4BF2] hover:shadow-[0_15px_35px_-5px_rgba(138,43,226,0.4)] hover:-translate-y-1 px-10 py-7 rounded-xl text-lg transition-all duration-300 group"
              >
                <span className="flex items-center">
                  Kérek egy konzultációt
                  <ArrowRight className="ml-2 transition-all duration-300 group-hover:translate-x-1" size={20} />
                </span>
              </Button>
            </Link>
            <p className="text-xs text-white/50 mt-4">
              48 órán belül személyesen felveszem Önnel a kapcsolatot.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center space-x-4 mt-8"
          >
            <a 
              href="#" 
              className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900/70 border border-zinc-800 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 group"
              aria-label="Messenger"
            >
              <MessageCircle className="h-5 w-5 text-white/70 group-hover:text-purple-400" />
            </a>
            <a 
              href="#" 
              className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900/70 border border-zinc-800 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 group"
              aria-label="Calendar"
            >
              <Calendar className="h-5 w-5 text-white/70 group-hover:text-purple-400" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
