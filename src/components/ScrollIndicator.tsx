
import { useState, useEffect } from 'react';

const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = 
        document.documentElement.scrollHeight - 
        document.documentElement.clientHeight;
      const scrolled = `${scrollPx / winHeightPx * 100}%`;
      
      setScrollProgress(scrollPx / winHeightPx * 100);
    };
    
    window.addEventListener('scroll', updateScrollProgress);
    
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return (
    <div 
      className="scroll-indicator" 
      style={{ width: `${scrollProgress}%` }}
    ></div>
  );
};

export default ScrollIndicator;
