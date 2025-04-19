
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Mail, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AnimatedSection from "./ui/animated-section";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

const EmailLeadMagnetSection = () => {
  const isMobile = useIsMobile();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send this to your backend
    console.log("Email submitted:", email);
    setIsSubmitted(true);
  };

  return (
    <AnimatedSection className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
            {/* Content */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-4"
              >
                <Download size={14} className="mr-2" />
                <span>Ingyenes letölthető útmutató</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl sm:text-2xl md:text-3xl font-bold"
              >
                <span className="text-white">3 ok, amiért nem jön ügyfél a weboldaladról</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mt-2">
                  – és hogyan javíts rajta 24 órán belül
                </span>
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4 text-white/80"
              >
                <div className="flex items-start">
                  <CheckCircle size={18} className="text-purple-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">1. ok: Nincs egyértelmű értékajánlat</span>
                    <p className="text-sm mt-1">Megoldás: fókuszált headline + CTA átalakítás</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle size={18} className="text-purple-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">2. ok: A látogató nem tudja, mit tegyen</span>
                    <p className="text-sm mt-1">Megoldás: belső tölcsér, látható CTA, vizuális irányítás</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle size={18} className="text-purple-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">3. ok: Nincs bizalomépítés</span>
                    <p className="text-sm mt-1">Megoldás: vélemények, arc, garancia, eredmények</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="text-white/90 font-medium">
                  "Nem a szép design hozza az ügyfelet, hanem a stratégia."
                </p>
              </motion.div>
            </div>
            
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-4 text-white">Kérem az ingyenes útmutatót</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">
                    Email címem:
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={16} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="pelda@email.hu"
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 
                    hover:shadow-[0_8px_25px_-5px_rgba(138,43,226,0.5)] py-5 sm:py-6 rounded-xl text-base 
                    transition-all duration-300 hover:-translate-y-1 group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Kérem az ingyenes útmutatót
                    <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
                
                <p className="text-xs text-white/50 text-center">
                  Az űrlap elküldésével elfogadod az adatvédelmi irányelveket.
                </p>
              </form>
              
              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="text-sm text-white/70 mb-4">
                  Ha úgy érzed, ez rólad szól, foglalj egy konzultációt:
                </p>
                <Button
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 text-white py-4 sm:py-5 rounded-xl text-base transition-all duration-300"
                  onClick={() => window.location.href = "#contact"}
                >
                  Kérem az ingyenes 30 perces stratégiát
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Thank you dialog */}
      <Dialog open={isSubmitted} onOpenChange={setIsSubmitted}>
        <DialogContent className="bg-black border border-purple-500/30 text-white max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Köszönjük!
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Az útmutatót elküldtük a megadott email címre. Ellenőrizd a levelezésed (akár a spam mappát is).
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
            >
              Rendben
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AnimatedSection>
  );
};

export default EmailLeadMagnetSection;
