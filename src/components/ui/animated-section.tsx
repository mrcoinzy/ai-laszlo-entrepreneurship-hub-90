
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
  withGrid = false,
  id
}: AnimatedSectionProps) => {
  // Animation variants for children elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const elementVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id={id} 
      className={`section-base ${className}`}
    >
      {/* Enhanced background elements with animated gradients */}
      {withGradient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Primary gradient orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="absolute top-0 right-0 w-2/3 h-2/3 bg-purple-600/10 rounded-full filter blur-[120px]"
          />
          
          {/* Secondary gradient orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
            className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-blue-600/10 rounded-full filter blur-[120px]"
          />
          
          {/* Accent gradient orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-purple-500/10 rounded-full filter blur-[100px]"
          />
        </div>
      )}
      
      {withAnimation ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto relative z-10"
        >
          <motion.div variants={elementVariants}>
            {children}
          </motion.div>
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
