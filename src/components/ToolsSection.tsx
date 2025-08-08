import React from "react";
import { motion } from "framer-motion";

const tools = [
  "WordPress",
  "Figma",
  "Adobe",
  "Google",
  "Facebook",
  "Slack",
];

const ToolsSection = () => {
  return (
    <section className="relative py-12 sm:py-20">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <p className="text-sm text-muted-foreground mb-6">Eszközök, amelyek segítik a munkánkat</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-10 items-center">
          {tools.map((t) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-muted-foreground/80 text-sm md:text-base tracking-wide opacity-70"
            >
              {t}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
