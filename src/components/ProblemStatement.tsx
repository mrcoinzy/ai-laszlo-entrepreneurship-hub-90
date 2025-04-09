
import React from "react";
import { Check, X, Clock, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

const ProblemStatement = () => {
  const problems = [
    {
      icon: <X className="h-6 w-6 text-purple-500" />,
      text: "Weboldala nem hoz új ügyfeleket – csupán 'létezik' az interneten."
    },
    {
      icon: <Check className="h-6 w-6 text-purple-500 opacity-0" />,
      text: "Hirdetései nem hoznak konverziót, és nincs egyértelmű stratégiája."
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-500" />,
      text: "Nincs ideje külön fejlesztőt, marketingest és szövegírót keresni."
    },
    {
      icon: <Users className="h-6 w-6 text-purple-500" />,
      text: "A látogatók jönnek, de senki sem foglal, hív vagy vásárol."
    },
    {
      icon: <Zap className="h-6 w-6 text-purple-500" />,
      text: "Úgy érzi, lemaradt az AI eszközökkel és a modern technológiával kapcsolatban."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
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
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-white">
            Ismerős ezek közül <span className="text-[#8A2BE2]">bármelyik</span>?
          </h2>
          
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {problems.map((problem, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="flex items-start gap-4 bg-zinc-900/50 p-5 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-[0_10px_25px_-15px_rgba(138,43,226,0.15)] hover:scale-[1.01] group"
              >
                <div className="mt-1 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {problem.icon}
                </div>
                <p className="text-white/90 text-lg">{problem.text}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.p 
            className="mt-12 text-center text-white text-xl font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Ennek nem kell így lennie. A megoldás <span className="font-medium text-[#8A2BE2]">egyszerűbb</span>, mint gondolná.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemStatement;
