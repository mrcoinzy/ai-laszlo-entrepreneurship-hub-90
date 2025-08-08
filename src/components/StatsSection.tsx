import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "7+", label: "Év tapasztalat" },
  { value: "95+", label: "Átadott projekt" },
  { value: "6", label: "Kocka csapattag" },
  { value: "999+", label: "Csésze kávé" },
];

const StatsSection = () => {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[120%] h-64 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 lg:gap-12"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-5xl md:text-6xl font-extrabold text-primary/70 leading-none">
                {s.value}
              </div>
              <div className="mt-3 text-sm md:text-base text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
