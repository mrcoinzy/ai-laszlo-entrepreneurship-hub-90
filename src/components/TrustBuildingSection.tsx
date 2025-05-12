import React from "react";
import { ShieldCheck, UserCheck, Zap, Target, Award } from "lucide-react";
import { motion } from "framer-motion";
import CTAButton from "@/components/ui/cta-button";

const TrustBuildingSection = () => {
  const valuePropositions = [
    {
      icon: <ShieldCheck className="h-10 w-10 text-purple-400 transition-all duration-300 group-hover:scale-110" />,
      title: "Sablonok nélkül, csak Önre szabva.",
      description: "Nincs két egyforma cég – ezért minden rendszer is egyedi."
    },
    {
      icon: <Zap className="h-10 w-10 text-purple-400 transition-all duration-300 group-hover:scale-110" />,
      title: "AI-val gyorsítva – de emberi minőségben.",
      description: "Modern technológia, emberi figyelemmel párosítva."
    },
    {
      icon: <UserCheck className="h-10 w-10 text-purple-400 transition-all duration-300 group-hover:scale-110" />,
      title: "Nem lesz egy a sok közül.",
      description: "Nálam nincs \"futószalag\" – csak valódi odafigyelés."
    },
    {
      icon: <Target className="h-10 w-10 text-purple-400 transition-all duration-300 group-hover:scale-110" />,
      title: "Nem látvány, hanem eredmény.",
      description: "A cél mindig: több ajánlatkérés, több vevő."
    },
    {
      icon: <Award className="h-10 w-10 text-purple-400 transition-all duration-300 group-hover:scale-110" />,
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
    <section className="w-full bg-black py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-[100px]"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[100px]"></div>
      
      {/* Fine grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <div className="inline-flex mb-4">
              <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Miért válasszon engem?
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-white to-purple-300 bg-clip-text text-transparent">
              Ön nem csupán egy ügyfél – <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"> nálam az eredménye válik a prioritássá.</span>
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Nem dolgozom egyszerre tucatnyi céggel – csak 1-2 vállalkozással, hogy Ön valódi figyelmet kapjon.
            Teljes fókusz, személyre szabott rendszer, mérhető eredményekkel.
            </p>
          </div>
          
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
                className="group flex items-start gap-5 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-[0_15px_30px_-15px_rgba(138,43,226,0.2)] hover:translate-y-[-8px]"
              >
                <div className="mt-1 p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex-shrink-0 transition-all duration-300 border border-purple-500/20 group-hover:border-purple-500/40">
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
            className="mt-16 p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-md rounded-2xl border border-white/10 text-center mx-auto max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-3 text-white">
              Csak akkor fizet, ha elégedett. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">"Az Ön sikere az én garanciám."</span>
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
            <CTAButton 
              text="Igen erre van szükségem – kérek egy konzultációt" 
              to="/consultation" 
              className="whitespace-normal px-4 py-2 text-sm md:text-base md:px-6 md:py-3"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBuildingSection;
