import React from "react";
import { Star } from "lucide-react";
import CTAButton from "@/components/ui/cta-button";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

const testimonials = [
  {
    id: 1,
    name: "Kovács Péter",
    role: "Ügyvezető, TechSolution Kft.",
    content: "AI László teljes mértékben átalakította a webhelyünket, és ezzel együtt az online jelenlétünket. Az eredmények messze felülmúlták az elvárásainkat.",
    rating: 5,
    metric: {
      value: "140%",
      label: "Látogatószám növekedés",
      period: "3 hónap alatt"
    }
  },
  {
    id: 2,
    name: "Nagy Eszter",
    role: "Alapító, EcoBeauty",
    content: "Korábban több mint 500.000 Ft-ot költöttünk marketingre látható eredmények nélkül. László stratégiái végre valódi változást hoztak – már 6 hete folyamatosan jönnek az új megrendelők.",
    rating: 5,
    metric: {
      value: "45%",
      label: "Konverziós arány növekedés",
      period: "6 hónap alatt"
    }
  },
  {
    id: 3,
    name: "Szabó János",
    role: "Coach, MindfulSuccess",
    content: "László munkája túlmutat a technikai szakértelmen. Valódi üzleti tanácsadó, aki megértette a coaching vállalkozásom céljait, és olyan digitális jelenlétet teremtett, amely 3× annyi foglalást eredményez havi szinten.",
    rating: 5,
    metric: {
      value: "45%",
      label: "Konverziós arány növekedés",
      period: "6 hónap alatt"
    }
  }
];

const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-16 sm:py-24 bg-black overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex mb-4">
            <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Ügyfeleim Sikerei
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-white to-purple-300 bg-clip-text text-transparent">
          Ők már megtapasztalták, milyen, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">amikor</span> valaki végre komolyan veszi a vállalkozásukat.
          </h2>
          <p className="text-lg text-white/70">
          Valódi visszajelzések olyan ügyfelektől, akik már megtapasztalták, mit jelent AI Lászlóval együttműködni: fókusz, eredmény és emberi támogatás.
          </p>
        </motion.div>

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
                className="bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-sm rounded-xl border border-white/10 p-6 transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_10px_40px_-15px_rgba(138,43,226,0.3)] hover:translate-y-[-8px] group"
              >
                {testimonial.metric && (
                  <div className="mb-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <div className="text-3xl font-bold text-purple-400 mb-1">
                      {testimonial.metric.value}
                    </div>
                    <div className="text-sm text-white/80">
                      {testimonial.metric.label}
                    </div>
                    <div className="text-xs text-white/60">
                      {testimonial.metric.period}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-center mb-6 overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center text-2xl font-bold text-white border border-white/20">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                
                <div className="flex mb-4 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-purple-400 fill-purple-400" />
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

        <div className="md:hidden mb-12">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-sm rounded-xl border border-white/10 p-6 transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_10px_40px_-15px_rgba(138,43,226,0.3)] group">
                    {testimonial.metric && (
                      <div className="mb-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <div className="text-3xl font-bold text-purple-400 mb-1">
                          {testimonial.metric.value}
                        </div>
                        <div className="text-sm text-white/80">
                          {testimonial.metric.label}
                        </div>
                        <div className="text-xs text-white/60">
                          {testimonial.metric.period}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-center mb-6 overflow-hidden">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center text-2xl font-bold text-white border border-white/20">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    
                    <div className="flex mb-4 justify-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-purple-400 fill-purple-400" />
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
            <div className="flex justify-center gap-4 mt-6">
              <CarouselPrevious className="relative static translate-y-0 left-0 top-0 h-12 w-12 rounded-full bg-white/5 hover:bg-purple-500/20 border-white/10 hover:border-purple-500/30" />
              <CarouselNext className="relative static translate-y-0 right-0 top-0 h-12 w-12 rounded-full bg-white/5 hover:bg-purple-500/20 border-white/10 hover:border-purple-500/30" />
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
          <CTAButton 
            text="Szeretném, hogy rólam is ilyen sikersztori szülessen" 
            to="/consultation" 
            className="whitespace-normal px-4 py-8 text-sm md:text-base md:px-6 md:py-3"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
