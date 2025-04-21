
import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Calendar } from "lucide-react";
import CTAButton from "@/components/ui/cta-button";

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
              Egyszerű következő lépés
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white to-purple-300 bg-clip-text text-transparent">
            Egy lépésre van attól, hogy a weboldala ügyfeleket hozzon – nem csak látogatókat.
          </h2>
          
          <p className="text-lg text-white/70 max-w-3xl mx-auto mb-12">
          Töltse ki az űrlapot vagy foglaljon időpontot, és 48 órán belül én magam fogom keresni Önt – nem egy asszisztens, nem egy robot.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
              
              <h3 className="text-xl font-bold mb-4 text-white">Időpontfoglalás</h3>
              
              <p className="text-white/70 mb-6">
              Foglaljon egy 30 perces konzultációt, ahol átbeszéljük, hogyan lehet az Ön webes jelenlétéből ügyfélszerző gépezet.
              </p>
              
              <CTAButton text="Kérek egy 30 perces konzultációt" to="/consultation" variant="primary" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
