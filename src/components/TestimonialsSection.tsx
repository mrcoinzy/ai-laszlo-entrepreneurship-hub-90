
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "Kovács Péter",
    role: "Ügyvezető, TechSolution Kft.",
    content: "AI László teljes mértékben átalakította a webhelyünket, és ezzel együtt az online jelenlétünket. Az eredmények messze felülmúlták az elvárásainkat, a látogatók száma 140%-kal nőtt három hónap alatt.",
    rating: 5
  },
  {
    id: 2,
    name: "Nagy Eszter",
    role: "Alapító, EcoBeauty",
    content: "Korábban több mint 500.000 Ft-ot költöttünk marketingre látható eredmények nélkül. László nemcsak felépítette a webhelyünket, de stratégiai tanácsaival is segített, ami 45%-os konverziós arány növekedést hozott.",
    rating: 5
  },
  {
    id: 3,
    name: "Szabó János",
    role: "Coach, MindfulSuccess",
    content: "László munkája túlmutat a technikai szakértelmen. Valódi üzleti tanácsadó, aki megértette a coaching vállalkozásom céljait, és olyan digitális jelenlétet teremtett, amely 3× annyi foglalást eredményez havi szinten.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Ők már megtapasztalták, milyen, ha valaki tényleg <span className="gradient-text">törődik</span> az online sikerükkel.
          </h2>
          <p className="text-lg text-white/70">
            Az alábbi visszajelzések valódi ügyfelektől származnak, akik AI Lászlóval dolgoztak együtt egyedi, konverzió-orientált megoldásokon.
          </p>
        </motion.div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_10px_40px_-15px_rgba(138,43,226,0.3)] hover:scale-[1.03] group"
              >
                <div className="flex items-center justify-center mb-6 overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/30 to-purple-800/10 flex items-center justify-center text-2xl font-bold text-white border border-purple-500/20">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                
                <div className="flex mb-4 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-purple-500 fill-purple-500" />
                  ))}
                </div>
                
                <p className="text-white/80 mb-6 italic text-center">
                  "{testimonial.content}"
                </p>
                
                <div className="text-center">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-white/60 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile View - Carousel */}
        <div className="md:hidden mb-16">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_10px_40px_-15px_rgba(138,43,226,0.3)] hover:scale-[1.03] group">
                    <div className="flex items-center justify-center mb-6 overflow-hidden">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/30 to-purple-800/10 flex items-center justify-center text-2xl font-bold text-white border border-purple-500/20">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    
                    <div className="flex mb-4 justify-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-purple-500 fill-purple-500" />
                      ))}
                    </div>
                    
                    <p className="text-white/80 mb-6 italic text-center">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="text-center">
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-white/60 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="relative static bg-zinc-900/70 hover:bg-purple-500/20 border-zinc-800 hover:border-purple-500/50" />
              <CarouselNext className="relative static bg-zinc-900/70 hover:bg-purple-500/20 border-zinc-800 hover:border-purple-500/50" />
            </div>
          </Carousel>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-center"
        >
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

export default TestimonialsSection;
