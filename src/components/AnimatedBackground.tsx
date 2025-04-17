
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas to full viewport size
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    
    const particles: Particle[] = [];
    const particleCount = 60; // Increased particle count for better visual effect
    
    // Enhanced color palette with more vibrant purples
    const colors = [
      "rgba(148, 0, 211, 0.7)",  // Dark Violet
      "rgba(138, 43, 226, 0.6)", // Blue Violet
      "rgba(153, 102, 255, 0.5)", // Medium Purple
      "rgba(147, 112, 219, 0.4)", // Medium Purple
      "rgba(186, 85, 211, 0.5)",  // Medium Orchid
    ];
    
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      glow: number;
      alpha: number;
      pulse: number;
      pulseSpeed: number;
    }
    
    // Create particles with more varied properties
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 25 + 10, // Larger size range
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        glow: Math.random() * 20 + 10,
        alpha: Math.random() * 0.5 + 0.5, // Varied opacity
        pulse: 0,
        pulseSpeed: Math.random() * 0.02 + 0.01
      });
    }
    
    function drawParticle(particle: Particle) {
      if (!ctx) return;
      
      // Pulsating effect
      particle.pulse += particle.pulseSpeed;
      const sizeChange = Math.sin(particle.pulse) * 5;
      const currentSize = particle.size + sizeChange;
      
      // Enhanced glow effect
      ctx.shadowBlur = particle.glow + sizeChange;
      ctx.shadowColor = particle.color;
      ctx.globalAlpha = particle.alpha * (0.8 + Math.sin(particle.pulse) * 0.2);
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, Math.max(currentSize, 5), 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      
      // Reset
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    }
    
    function createGradient() {
      if (!ctx || !canvas) return;
      
      // More dynamic background gradient with animation
      const time = Date.now() * 0.0001;
      const centerX = canvas.width / 2 + Math.sin(time) * canvas.width * 0.1;
      const centerY = canvas.height / 2 + Math.cos(time) * canvas.height * 0.1;
      
      const gradient = ctx.createRadialGradient(
        centerX, 
        centerY, 
        0, 
        centerX, 
        centerY, 
        Math.max(canvas.width, canvas.height) * 0.8
      );
      
      // More dramatic gradient colors
      gradient.addColorStop(0, "rgba(40, 20, 60, 1)");
      gradient.addColorStop(0.4, "rgba(20, 10, 40, 1)");
      gradient.addColorStop(1, "rgba(5, 0, 20, 1)");
      
      return gradient;
    }
    
    function connectParticles() {
      if (!ctx) return;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            // Smoother connection lines with gradient opacity
            const opacity = 0.25 - distance/800;
            
            if (opacity > 0) {
              ctx.beginPath();
              const gradient = ctx.createLinearGradient(
                particles[i].x, 
                particles[i].y, 
                particles[j].x, 
                particles[j].y
              );
              gradient.addColorStop(0, particles[i].color.replace(')', `, ${opacity})`).replace('rgba', 'rgba'));
              gradient.addColorStop(1, particles[j].color.replace(')', `, ${opacity})`).replace('rgba', 'rgba'));
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 1.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }
    }
    
    function update() {
      if (!ctx || !canvas) return;
      
      // Clear with gradient background
      ctx.fillStyle = createGradient() || "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Apply subtle noise texture
      ctx.globalAlpha = 0.02;
      ctx.fillStyle = "rgba(255, 255, 255, 0.01)";
      for (let i = 0; i < 100; i++) {
        ctx.fillRect(
          Math.random() * canvas.width, 
          Math.random() * canvas.height, 
          1, 
          1
        );
      }
      ctx.globalAlpha = 1;
      
      // Update and draw particles
      particles.forEach(particle => {
        // Smoother movement with slight acceleration
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Improved boundary handling - wrap around screen edges
        if (particle.x > canvas.width + particle.size) {
          particle.x = -particle.size;
        } else if (particle.x < -particle.size) {
          particle.x = canvas.width + particle.size;
        }
        
        if (particle.y > canvas.height + particle.size) {
          particle.y = -particle.size;
        } else if (particle.y < -particle.size) {
          particle.y = canvas.height + particle.size;
        }
        
        drawParticle(particle);
      });
      
      connectParticles();
      requestAnimationFrame(update);
    }
    
    const handleResize = () => {
      setCanvasDimensions();
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
        className="absolute inset-0 opacity-30"
        animate={{ 
          background: [
            "radial-gradient(circle at 20% 20%, rgba(148, 0, 211, 0.4), transparent 70%)",
            "radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.4), transparent 70%)",
            "radial-gradient(circle at 80% 20%, rgba(186, 85, 211, 0.4), transparent 70%)",
            "radial-gradient(circle at 20% 80%, rgba(153, 102, 255, 0.4), transparent 70%)",
            "radial-gradient(circle at 20% 20%, rgba(148, 0, 211, 0.4), transparent 70%)",
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Enhanced full-screen gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-black/50"></div>
      
      {/* Large vibrant blobs for depth */}
      <div className="absolute -left-[10%] top-[20%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[150px] animate-pulse-slow"></div>
      <div className="absolute -right-[10%] bottom-[10%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[150px] animate-pulse-slow animation-delay-2000"></div>
      <div className="absolute left-[30%] bottom-[5%] w-[45%] h-[45%] bg-violet-500/5 rounded-full blur-[150px] animate-pulse-slow animation-delay-1000"></div>
      
      {/* Stars effect */}
      <div className="stars absolute inset-0"></div>
    </div>
  );
};

export default AnimatedBackground;
