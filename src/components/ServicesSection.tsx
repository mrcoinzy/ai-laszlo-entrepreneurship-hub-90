
import React from "react";
import { Code, Target, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ServicesSection = () => {
  const services = [
    {
      icon: <Code className="h-12 w-12 text-purple-500 mb-4 transition-all duration-300 group-hover:scale-110" />,
      title: "Weboldal Fejlesztés",
      description: "Modern, reszponzív üzleti weboldalak, amelyek SEO-ra, sebességre és konverziókra vannak optimalizálva. Kóddal vagy modern no-code eszközökkel készítve."
    },
    {
      icon: <Target className="h-12 w-12 text-purple-500 mb-4 transition-all duration-300 group-hover:scale-110" />,
      title: "Online Marketing Stratégia",
      description: "Testre szabott SEO, PPC, tartalom és e-mail marketing tervek, amelyek összhangban vannak az Ön céljaival és erőforrásaival."
    },
    {
      icon: <LineChart className="h-12 w-12 text-purple-500 mb-4 transition-all duration-300 group-hover:scale-110" />,
      title: "Konverzió Optimalizálás",
      description: "A/B tesztelés, UX fejlesztések, CTA hangolás és elemzés – hogy több látogató váljon valódi ügyféllé."
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
    <section className="w-full bg-black py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={headerVariants}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Szolgáltatásaim, amelyek <span className="highlight-text">eredményeket</span> hoznak
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
              className="group flex flex-col items-center text-center p-6 bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-[0_10px_40px_-15px_rgba(138,43,226,0.2)] hover:scale-[1.03] hover:bg-zinc-900/60"
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
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link to="/contact">
            <Button 
              className="relative bg-white text-black hover:bg-[#8A2BE2] hover:text-white px-8 py-6 rounded-xl text-base transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(138,43,226,0.3)] hover:-translate-y-1 overflow-hidden group"
            >
              <span className="relative z-10">
                Nem biztos benne, mire van szüksége? Beszéljünk – foglaljon ingyenes konzultációt
              </span>
              <span className="absolute inset-0 bg-[#8A2BE2] origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
