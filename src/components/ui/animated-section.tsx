
import React from "react";
import { motion } from "framer-motion";

interface AnimatedSectionProps {
  className?: string;
  children: React.ReactNode;
  withAnimation?: boolean;
  withGradient?: boolean;
  withGrid?: boolean;
  id?: string;
}

const AnimatedSection = ({
  className = "",
  children,
  withAnimation = true,
  withGradient = true,
  withGrid = false, // Changed default to false
  id
}: AnimatedSectionProps) => {
  return (
    <section 
      id={id} 
      className={`section-base ${className}`}
    >
      {/* Background elements */}
      {withGradient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-purple-600/10 rounded-full filter blur-[120px] opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-blue-600/10 rounded-full filter blur-[120px] opacity-40"></div>
        </div>
      )}
      
      {withAnimation ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto relative z-10"
        >
          {children}
        </motion.div>
      ) : (
        <div className="container mx-auto relative z-10">
          {children}
        </div>
      )}
    </section>
  );
};

export default AnimatedSection;
