import React from "react";
import { motion } from "framer-motion";
import CTAButton from "@/components/ui/cta-button";

const LeadMagnetSection = () => {
  return (
    <section className="w-full bg-black py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glowing orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/10 filter blur-[120px] opacity-60"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 filter blur-[120px] opacity-60"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-12 text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white to-purple-300 bg-clip-text text-transparent"
            >
              Nem fizet, amíg Ön nem mondja:
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mt-2">
                „Igen – ez működik."
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-white/70 max-w-3xl mx-auto mb-10"
            >
              Ez nem marketing szöveg – így dolgozom.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <CTAButton text="Kérek egy konzultációt" to="/contact" />
            </motion.div>
          </motion.div>
          
          {/* Second CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              Készen áll egy olyan webes jelenlétre, amely valóban az <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Ön céljaira</span> van szabva?
            </h3>
            <CTAButton text="Nézze meg, hogyan dolgozom" to="/courses" variant="outline" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnetSection;
