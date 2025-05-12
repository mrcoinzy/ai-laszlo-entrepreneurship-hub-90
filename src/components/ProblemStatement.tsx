
import React from "react";
import { Check, X, Clock, BadgePercent } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProblemStatement = () => {
  const problems = [
    {
      icon: <X className="h-6 w-6 text-purple-500" />,
      text: "A jelenlegi weboldala nem termel vevőt – csak porosodik a neten."
    },
    {
      icon: <BadgePercent className="h-6 w-6 text-purple-500" />,
      text: "A hirdetései csak pénzt égetnek – vevőt nem hoznak."
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-500" />,
      text: "Elege van abból, hogy minden részfeladatra mást kell keresnie?"
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
    <section className="relative w-full bg-black py-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-purple-900/10 to-transparent"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-1/2 h-1/2 bg-gradient-to-tl from-purple-600/10 to-transparent rounded-full blur-[100px]"></div>
        <div className="absolute top-[30%] -left-[10%] w-1/3 h-1/3 bg-gradient-to-tr from-indigo-600/10 to-transparent rounded-full blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-white">
            <span className="relative">
              <span className="relative z-10">
                <span className="animated-text-gradient font-extrabold">Fizettett már ki weboldalt</span> vagy kampányt,
              </span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8A2BE2]/70 to-transparent"></span>
            </span>
            <br/>ami végül nem hozott semmit?
          </h2>
          
          <div className="bg-zinc-900/30 backdrop-blur-xl rounded-2xl border border-zinc-800/50 p-8 mb-16 text-center shadow-[0_10px_25px_-15px_rgba(138,43,226,0.25)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]"></div>
            
            <h3 className="text-2xl font-bold mb-4 text-white relative z-10">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9A4BF2] to-[#B066FF]">Nálam ez nem történhet meg</span>,<br/>ha 1 hónapon belül nem jön több ajánlatkérés, visszafizetem a pénzét!
            </h3>
            <p className="text-white/80 relative z-10">
            Ez nem marketing duma – így dolgozom. Ha nem jön az eredmény, <br/>egy forintot sem kell fizetni.
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {problems.map((problem, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="flex flex-col items-center text-center gap-4 bg-gradient-to-b from-zinc-900/70 to-zinc-900/40 backdrop-blur-xl p-7 rounded-xl border border-zinc-800/50 hover:border-[#8A2BE2]/50 transition-all duration-500 hover:shadow-[0_10px_25px_-15px_rgba(138,43,226,0.3)] group"
              >
                <div className="p-3 rounded-full bg-zinc-800/70 border border-zinc-700/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(138,43,226,0.5)] group-hover:border-purple-500/50">
                  {problem.icon}
                </div>
                <p className="text-white/90">{problem.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="stats flex flex-wrap justify-center gap-8 mb-12">
              <div className="stat glass-panel p-5 px-7">
                <div className="bg-clip-text text-transparent bg-gradient-to-r from-[#9A4BF2] to-[#B066FF] text-4xl font-bold mb-2">50+</div>
                <div className="text-white/80">Sikeres projekt</div>
              </div>
              <div className="stat glass-panel p-5 px-7">
                <div className="bg-clip-text text-transparent bg-gradient-to-r from-[#9A4BF2] to-[#B066FF] text-4xl font-bold mb-2">12+</div>
                <div className="text-white/80">Iparág</div>
              </div>
              <div className="stat glass-panel p-5 px-7">
                <div className="bg-clip-text text-transparent bg-gradient-to-r from-[#9A4BF2] to-[#B066FF] text-4xl font-bold mb-2">100%</div>
                <div className="text-white/80">Elégedettségi garancia</div>
              </div>
            </div>

            <Link to="/consultation">
              <Button 
                className="
                  w-full 
                  sm:w-auto
                  bg-gradient-to-r from-[#9A4BF2] to-[#7B1FA2] 
                  text-white 
                  hover:shadow-[0_10px_25px_-5px_rgba(138,43,226,0.4)] 
                  hover:-translate-y-1 
                  px-6 py-4 sm:px-8 sm:py-6 
                  rounded-xl text-base sm:text-lg 
                  transition-all duration-300 group
                  focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 
                "
              >
                <span className="flex items-center justify-center gap-1">
                  Igen, szeretnék több ajánlatkérést!
                  <Check className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="fixed bottom-6 right-6 z-50 md:hidden w-[90vw] max-w-xs px-2">
        <Link to="/consultation" className="block">
          <Button 
            className="
              w-full 
              bg-gradient-to-r from-[#9A4BF2] to-[#7B1FA2] 
              text-white shadow-lg 
              hover:shadow-[0_10px_25px_-5px_rgba(138,43,226,0.4)] 
              px-4 py-3 
              rounded-full text-base 
              sm:text-sm
              transition-all duration-300
              focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
            "
          >
            Kérek egy díjmentes konzultációt
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ProblemStatement;
