
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particles: Particle[] = [];
    const particleCount = 40;
    const colors = [
      "rgba(138, 43, 226, 0.6)", // Purple
      "rgba(147, 112, 219, 0.5)", // Medium Purple
      "rgba(106, 90, 205, 0.4)", // Slate Blue
      "rgba(75, 0, 130, 0.4)", // Indigo
      "rgba(72, 61, 139, 0.3)", // Dark Slate Blue
    ];
    
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      glow: number;
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 20 + 10,
        speedX: Math.random() * 1.5 - 0.75,
        speedY: Math.random() * 1.5 - 0.75,
        color: colors[Math.floor(Math.random() * colors.length)],
        glow: Math.random() * 15 + 10
      });
    }
    
    function drawParticle(particle: Particle) {
      if (!ctx) return;
      
      // Enhanced glow effect
      ctx.shadowBlur = particle.glow;
      ctx.shadowColor = particle.color;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      
      // Reset shadow
      ctx.shadowBlur = 0;
    }
    
    function createGradient() {
      if (!ctx) return;
      
      // More dynamic background gradient
      const gradient = ctx.createRadialGradient(
        width / 2, 
        height / 2, 
        0, 
        width / 2, 
        height / 2, 
        Math.max(width, height) / 1.2
      );
      
      // More vibrant gradient colors
      gradient.addColorStop(0, "rgba(30, 20, 40, 1)");
      gradient.addColorStop(0.5, "rgba(20, 15, 30, 1)");
      gradient.addColorStop(1, "rgba(10, 5, 20, 1)");
      
      return gradient;
    }
    
    function connectParticles() {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 180) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(138, 43, 226, ${0.2 - distance/900})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    function update() {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = createGradient() || "black";
      ctx.fillRect(0, 0, width, height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // More fluid boundary handling
        if (particle.x > width || particle.x < 0) particle.speedX *= -1;
        if (particle.y > height || particle.y < 0) particle.speedY *= -1;
        
        drawParticle(particle);
      });
      
      connectParticles();
      requestAnimationFrame(update);
    }
    
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    update();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
      />
      
      {/* Enhanced dynamic ambient lights */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full opacity-40"
        animate={{ 
          background: [
            "radial-gradient(circle at 20% 20%, rgba(138, 43, 226, 0.2), transparent 70%)",
            "radial-gradient(circle at 80% 80%, rgba(75, 0, 130, 0.2), transparent 70%)",
            "radial-gradient(circle at 80% 20%, rgba(106, 90, 205, 0.2), transparent 70%)",
            "radial-gradient(circle at 20% 80%, rgba(147, 112, 219, 0.2), transparent 70%)",
            "radial-gradient(circle at 20% 20%, rgba(138, 43, 226, 0.2), transparent 70%)",
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Enhanced decorative elements */}
      <div className="absolute left-[10%] top-[30%] w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute right-[15%] bottom-[20%] w-56 h-56 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      {/* Dark gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80"></div>
    </div>
  );
};

export default AnimatedBackground;
