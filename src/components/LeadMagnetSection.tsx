
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const LeadMagnetSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Hiba!",
        description: "Kérjük, adjon meg egy érvényes email címet!",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Sikeres feliratkozás!",
        description: "Az útmutató letöltése pár percen belül megérkezik az e-mail címére.",
        variant: "default"
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail("");
        setName("");
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section className="py-20 bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 p-8 md:p-10 transition-all duration-300 hover:shadow-[0_20px_80px_-15px_rgba(138,43,226,0.15)]">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Töltse le ingyen: <span className="gradient-text">5 kritikus hiba</span>, amit a legtöbb vállalkozó elkövet a weboldalán.
              </h2>
              <p className="text-white/70">
                Ez az útmutató gyakorlati példákon keresztül mutatja meg, hogyan növelheti a látogatók számát, az érdeklődéseket – és végső soron a bevételét.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Az Ön neve (opcionális)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-black/50 border-zinc-700 focus:border-purple-500 transition-all duration-300 h-12 placeholder:text-white/30 text-white"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email cím *"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/50 border-zinc-700 focus:border-purple-500 transition-all duration-300 h-12 placeholder:text-white/30 text-white"
                />
              </div>
              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full bg-white text-black hover:bg-[#8A2BE2] hover:text-white hover:shadow-[0_10px_25px_-5px_rgba(138,43,226,0.3)] py-6 rounded-xl text-base transition-all duration-300 group overflow-hidden relative ${
                    isSubmitted ? "bg-green-500 text-white" : ""
                  }`}
                >
                  <span className="relative z-10 flex items-center">
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    ) : isSubmitted ? (
                      <Check className="mr-2 h-5 w-5" />
                    ) : (
                      <Download className="mr-2 h-5 w-5" />
                    )}
                    {isSubmitting
                      ? "Feldolgozás..."
                      : isSubmitted
                      ? "Elküldve!"
                      : "Letöltöm az útmutatót »"}
                  </span>
                  <span className="absolute inset-0 bg-[#8A2BE2] origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-white/50 text-sm">Már több mint 120 letöltés az első héten.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadMagnetSection;
