
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
    const particleCount = 30;
    const colors = ["rgba(138, 43, 226, 0.6)", "rgba(147, 112, 219, 0.5)", "rgba(106, 90, 205, 0.4)"];
    
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 15 + 5,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    function drawParticle(particle: Particle) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    }
    
    function createGradient() {
      if (!ctx) return;
      const gradient = ctx.createRadialGradient(
        width / 2, 
        height / 2, 
        0, 
        width / 2, 
        height / 2, 
        width > height ? width : height
      );
      gradient.addColorStop(0, "rgba(10, 10, 10, 1)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
      return gradient;
    }
    
    function connectParticles() {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(138, 43, 226, ${0.2 - distance/750})`;
            ctx.lineWidth = 0.5;
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
        
        if (particle.x > width) particle.x = 0;
        else if (particle.x < 0) particle.x = width;
        
        if (particle.y > height) particle.y = 0;
        else if (particle.y < 0) particle.y = height;
        
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
      <motion.div 
        className="absolute inset-0 opacity-40"
        animate={{ 
          background: [
            "radial-gradient(circle at 30% 30%, rgba(138, 43, 226, 0.1), transparent 40%)",
            "radial-gradient(circle at 70% 70%, rgba(138, 43, 226, 0.1), transparent 40%)",
            "radial-gradient(circle at 30% 70%, rgba(138, 43, 226, 0.1), transparent 40%)",
            "radial-gradient(circle at 70% 30%, rgba(138, 43, 226, 0.1), transparent 40%)",
            "radial-gradient(circle at 30% 30%, rgba(138, 43, 226, 0.1), transparent 40%)",
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
    </div>
  );
};

export default AnimatedBackground;
