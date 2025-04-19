
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Globe, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

const portfolioProjects = [
  {
    id: 1,
    name: "SportCraft Webáruház",
    description: "Teljes e-commerce platform újratervezése és SEO optimalizálása",
    result: "237% bevételnövekedés 3 hónap alatt",
    icon: <Globe className="h-10 w-10 text-purple-500" />
  },
  {
    id: 2,
    name: "VitalCoach Tanácsadás",
    description: "Konverzióorientált landing page és automatizált email rendszer",
    result: "2× több bejelentkezés 1 hónap alatt",
    icon: <Target className="h-10 w-10 text-purple-500" />
  },
  {
    id: 3,
    name: "ArtisanBrew Kávézó",
    description: "Teljes online jelenlét kialakítása és Google Térkép optimalizálás",
    result: "45% növekedés a helyi forgalomban",
    icon: <BarChart2 className="h-10 w-10 text-purple-500" />
  }
];

const PortfolioSection = () => {
  const isMobile = useIsMobile();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Nézze meg, hogyan segítettem más <span className="gradient-text">vállalkozásoknak</span> is fejlődni.
          </h2>
          <p className="text-lg text-white/70">
            Minden projekt mögött egy megoldott probléma áll. Tekintsen meg néhány példát, hogyan alakítottam át ügyfeleim online jelenlétét kézzelfogható eredményekkel.
          </p>
        </motion.div>

        {/* Desktop View - Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="hidden md:grid md:grid-cols-3 gap-6 mb-16"
        >
          {portfolioProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_10px_40px_-15px_rgba(138,43,226,0.3)] hover:scale-[1.03] group"
            >
              <div className="flex items-center justify-center mb-6 w-16 h-16 rounded-full bg-black/40 border border-zinc-800 group-hover:border-purple-500/40 transition-all duration-300">
                <div className="transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {project.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-all duration-300">
                {project.name}
              </h3>
              <p className="text-white/70 mb-4 text-sm">
                {project.description}
              </p>
              <div className="flex items-center gap-2 text-purple-500 font-medium">
                <span className="text-lg">{project.result}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View - Carousel */}
        <div className="md:hidden mb-12">
          <Carousel className="w-full">
            <CarouselContent>
              {portfolioProjects.map((project) => (
                <CarouselItem key={project.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_10px_40px_-15px_rgba(138,43,226,0.3)] hover:scale-[1.03] group">
                    <div className="flex items-center justify-center mb-6 w-16 h-16 rounded-full bg-black/40 border border-zinc-800 group-hover:border-purple-500/40 transition-all duration-300">
                      <div className="transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                        {project.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-all duration-300">
                      {project.name}
                    </h3>
                    <p className="text-white/70 mb-4 text-sm">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 text-purple-500 font-medium">
                      <span className="text-lg">{project.result}</span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-6">
              <CarouselPrevious className="relative static translate-y-0 left-0 top-0 h-12 w-12 rounded-full bg-zinc-900/70 hover:bg-purple-500/20 border-zinc-800 hover:border-purple-500/50" />
              <CarouselNext className="relative static translate-y-0 right-0 top-0 h-12 w-12 rounded-full bg-zinc-900/70 hover:bg-purple-500/20 border-zinc-800 hover:border-purple-500/50" />
            </div>
          </Carousel>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h3 className="text-2xl font-bold mb-6 text-white">
            Ön is hasonló eredményeket szeretne elérni?
          </h3>
          <Link to="/contact">
            <Button
              className="bg-white text-black hover:bg-[#8A2BE2] hover:text-white hover:shadow-[0_10px_25px_-5px_rgba(138,43,226,0.3)] hover:-translate-y-1 px-8 py-6 rounded-xl text-base transition-all duration-300 group overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center">
                Kérek egy konzultációt
                <ArrowRight className="ml-2 transition-all duration-300 group-hover:translate-x-1" size={18} />
              </span>
              <span className="absolute inset-0 bg-[#8A2BE2] origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
