import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  width = "fit-content",
  delay = 0.25,
  className = "",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  return (
    <motion.div
      ref={ref}
      className={`${className} mx-auto`}
      style={{ width, overflow: "hidden", position: "relative" }}
      variants={{
        hidden: { opacity: 0, filter: "blur(8px)" },
        visible: { opacity: 1, filter: "blur(0px)" }
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export const ScrollRevealY: React.FC<ScrollRevealProps & { distance?: number }> = ({
  children,
  width = "fit-content",
  delay = 0.25,
  className = "",
  distance = 20,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  return (
    <motion.div
      ref={ref}
      className={`${className} mx-auto`}
      style={{ 
        width: width === "100%" ? "100%" : width, 
        maxWidth: "100%", 
        overflow: "visible", 
        position: "relative" 
      }}
      variants={{
        hidden: { opacity: 0, y: distance, filter: "blur(8px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" }
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
