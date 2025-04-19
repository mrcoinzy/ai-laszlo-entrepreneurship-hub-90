
import React from "react";
import { motion } from "framer-motion";
import CTAButton from "@/components/ui/cta-button";
import AnimatedSection from "./ui/animated-section";

const EmailLeadMagnetSection = () => {
  return (
    <AnimatedSection className="py-24">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-6"
        >
          A konverzió pszichológiája - mi működik 2025-ben?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-white/70 mb-8"
        >
          Iratkozzon fel hírlevelünkre, és tudja meg elsőként a legújabb trendeket és taktikákat!
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <input 
            type="email" 
            placeholder="Írja be az e-mail címét" 
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-black" 
          />
          <CTAButton text="Feliratkozom" to="#" variant="secondary" />
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default EmailLeadMagnetSection;
