import React from "react";
import { Code, Target, LineChart, ChevronRight } from "lucide-react";
import CTAButton from "@/components/ui/cta-button";
import { motion } from "framer-motion";

const ServicesSection = () => {
  const services = [
    {
      icon: <Code className="h-12 w-12 text-purple-400 mb-4 transition-all duration-300 group-hover:scale-110" />,
      title: "Weboldal Fejlesztés",
      description: "Modern üzleti weboldalak, amelyek gyorsak, mobilbarátok. Kóddal vagy no-code technológiával – attól függően, hogy mi hozza a leggyorsabb eredményt Önnek."
    },
    {
      icon: <Target className="h-12 w-12 text-purple-400 mb-4 transition-all duration-300 group-hover:scale-110" />,
      title: "Online Marketing Stratégia",
      description: "Célzott marketingterv – SEO, PPC, tartalom, e-mail – nem sablon alapján. Minden az Ön vállalkozásához, költségkeretéhez és céljához illesztve."
    },
    {
      icon: <LineChart className="h-12 w-12 text-purple-400 mb-4 transition-all duration-300 group-hover:scale-110" />,
      title: "Konverzió Optimalizálás",
      description: "Több vásárló, kevesebb lemorzsolódás. UX fejlesztés, CTA-k finomhangolása, és adatalapú döntések."
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="w-full bg-black py-20 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-purple-600/10 rounded-full filter blur-[120px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-blue-600/10 rounded-full filter blur-[120px] opacity-40"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={headerVariants}
        >
          <div className="inline-flex mb-4">
            <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Szolgáltatások
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-white to-purple-300 bg-clip-text text-transparent">
            Szolgáltatások, amiktől a weboldala nem csak szép lesz – hanem vevőt is hoz.
          </h2>
          <p className="text-lg text-white/70">
            Minden, amire szüksége van egy magas konverziós online jelenléthez – egy helyről, AI támogatással.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group flex flex-col items-center text-center p-6 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-[0_10px_40px_-15px_rgba(138,43,226,0.2)] hover:translate-y-[-8px]"
            >
              <div className="relative">
                {service.icon}
                <div className="absolute inset-0 bg-purple-500/10 rounded-full filter blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 scale-75 group-hover:scale-110"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
              <p className="text-white/70">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <CTAButton 
            text="Indítsuk el a növekedést – kérjen díjmentes konzultációt most!" 
            to="/consultation"
            className="whitespace-normal px-8 py-2 text-sm md:text-base md:px-6 md:py-3 p-8"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
