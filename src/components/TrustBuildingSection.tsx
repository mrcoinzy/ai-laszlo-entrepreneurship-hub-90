import React from "react";
import { ShieldCheck, UserCheck, Zap, Target, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const TrustBuildingSection = () => {
  const valuePropositions = [
    {
      icon: <ShieldCheck className="h-10 w-10 text-purple-500 transition-all duration-300 group-hover:scale-110" />,
      title: "100% Egyedi",
      description: "Nem használok sablonokat. Minden megoldás az Ön vállalkozására van szabva."
    },
    {
      icon: <Zap className="h-10 w-10 text-purple-500 transition-all duration-300 group-hover:scale-110" />,
      title: "AI-alapú munkafolyamat",
      description: "Mesterséges intelligencia eszközöket használok a munkafolyamat gyorsítására és fejlesztésére."
    },
    {
      icon: <UserCheck className="h-10 w-10 text-purple-500 transition-all duration-300 group-hover:scale-110" />,
      title: "Osztatlan figyelem",
      description: "Egyszerre csak 1–2 ügyféllel dolgozom. Ön sosem lesz háttérbe szorítva."
    },
    {
      icon: <Target className="h-10 w-10 text-purple-500 transition-all duration-300 group-hover:scale-110" />,
      title: "Eredményfókusz",
      description: "A célom nem csupán lenyűgözni – hanem több ügyfelet hozni Önnek."
    },
    {
      icon: <Award className="h-10 w-10 text-purple-500 transition-all duration-300 group-hover:scale-110" />,
      title: "Elégedettségi garancia",
      description: "A végső díjat csak akkor kell kifizetnie, ha Ön teljes mértékben elégedett."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section className="w-full bg-black py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-white">
            Ön nem csupán egy újabb projekt – <span className="text-[#8A2BE2]">Ön a prioritás</span>.
          </h2>
          <p className="text-lg text-white/70 text-center mb-16 max-w-3xl mx-auto">
            Ellentétben egy ügynökséggel, én közvetlenül Önnel dolgozom – az alapoktól építem fel az online sikerét, teljes fókuszsal és felelősséggel.
          </p>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {valuePropositions.map((prop, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group flex items-start gap-5 p-6 bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-[0_15px_30px_-15px_rgba(138,43,226,0.2)] hover:scale-[1.02] hover:bg-zinc-900/50"
              >
                <div className="mt-1 p-2 rounded-full bg-zinc-800/50 flex-shrink-0 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(138,43,226,0.4)]">
                  {prop.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">{prop.title}</h3>
                  <p className="text-white/70">{prop.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            className="mt-16 p-8 bg-zinc-900/30 backdrop-blur-sm rounded-2xl border border-zinc-800 text-center mx-auto max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-3 text-white">
              Nem fizet, amíg Ön nem mondja: <span className="text-[#8A2BE2]">'Igen – ez működik.'</span>
            </h3>
            <p className="text-white/70">
              Ez nem marketing szöveg – így dolgozom.
            </p>
          </motion.div>
          
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="text-2xl font-medium mb-6 text-white">
              Készen áll egy olyan webes jelenlétre, amely valóban az Ön céljaira van szabva?
            </h3>
            <Link to="/contact">
              <Button
                className="relative bg-white text-black hover:bg-[#8A2BE2] hover:text-white px-8 py-6 rounded-xl text-base transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(138,43,226,0.3)] hover:-translate-y-1 overflow-hidden group"
              >
                <span className="relative z-10">
                  Kérek egy konzultációt
                </span>
                <ChevronRight className="ml-2 relative z-10 transition-transform group-hover:translate-x-1" />
                <span className="absolute inset-0 bg-[#8A2BE2] origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBuildingSection;
