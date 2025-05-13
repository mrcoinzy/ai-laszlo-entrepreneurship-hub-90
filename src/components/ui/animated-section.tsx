
import React from "react";
import { motion } from "framer-motion";
import { ScrollRevealY } from "@/components/ui/scroll-reveal";
import { useIsMobile } from "@/hooks/use-mobile";

interface AnimatedSectionProps {
  className?: string;
  children: React.ReactNode;
  withAnimation?: boolean;
  withGradient?: boolean;
  withGrid?: boolean;
  id?: string;
  mobilePadding?: "small" | "medium" | "large" | "none";
}

const AnimatedSection = ({
  className = "",
  children,
  withAnimation = true,
  withGradient = true,
  withGrid = false,
  id,
  mobilePadding = "medium",
}: AnimatedSectionProps) => {
  const isMobile = useIsMobile();
  
  // Mobile padding classes based on the provided prop
  const mobilePaddingClasses = {
    none: "py-0 px-0",
    small: "py-6 px-4",
    medium: "py-12 px-4",
    large: "py-16 px-4",
  };
  
  // Desktop padding is preserved from the existing styles
  const sectionClasses = `section-base w-full ${className} ${isMobile ? mobilePaddingClasses[mobilePadding] : ""}`;

  return (
    <section 
      id={id} 
      className={sectionClasses}
    >
      {/* Background elements */}
      {withGradient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-purple-600/10 rounded-full filter blur-[120px] opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-blue-600/10 rounded-full filter blur-[120px] opacity-40"></div>
        </div>
      )}
      
      {withAnimation ? (
        <ScrollRevealY 
          className="container mx-auto px-4 sm:px-6 relative z-10 w-full" 
          distance={isMobile ? 15 : 20}
          duration={isMobile ? 0.5 : 0.7}
        >
          {children}
        </ScrollRevealY>
      ) : (
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {children}
        </div>
      )}
    </section>
  );
};

export default AnimatedSection;
