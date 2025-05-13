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
  const isInView = useInView(ref, { once: true, amount: 0.1 });
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
        hidden: { opacity: 0, filter: "blur(5px)" },
        visible: { opacity: 1, filter: "blur(0px)" }
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export const ScrollRevealY: React.FC<ScrollRevealProps & { distance?: number }> = ({
  children,
  width = "fit-content",
  delay = 0.15,
  className = "",
  distance = 15,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1, rootMargin: "0px 0px 50px 0px" });
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
        position: "relative",
        willChange: "transform, opacity"
      }}
      variants={{
        hidden: { opacity: 0, y: distance, filter: "blur(3px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" }
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
