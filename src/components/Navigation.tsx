
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Menu, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin } = useAuth();
  
  const handleScroll = (elementId: string) => {
    setIsOpen(false);
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    const handleScrollEffect = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScrollEffect);
    return () => {
      window.removeEventListener('scroll', handleScrollEffect);
    };
  }, []);
  
  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-black/70 backdrop-blur-xl py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]" 
        : "bg-transparent py-5"
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-medium relative">
            <motion.span 
              className={scrolled ? "gradient-nav-animation" : "text-white"}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              AI László
            </motion.span>
            <div className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#8A2BE2] to-transparent transition-all duration-300 ${scrolled ? 'w-full' : 'w-0'}`}></div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            {["services", "portfolio", "about", "blog", "contact"].map((item) => (
              <button 
                key={item}
                onClick={() => handleScroll(item)} 
                className="text-sm text-white/80 hover:text-white transition-colors relative group"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#8A2BE2] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>
          
          <div className="hidden md:block">
            <Button 
              variant="outline" 
              className="bg-white/5 backdrop-blur-lg text-white border-white/20 hover:bg-[#8A2BE2] hover:text-white hover:border-[#8A2BE2]/50 transition-all duration-300 hover:shadow-[0_10px_20px_-10px_rgba(138,43,226,0.5)]"
              onClick={() => handleScroll('contact')}
            >
              Kérek egy ingyenes konzultációt <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <motion.button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>
      
      {/* Mobile menu with improved animation */}
      {isOpen && (
        <motion.div 
          className="md:hidden h-screen w-full bg-black/90 backdrop-blur-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col p-8 space-y-6">
            {["services", "portfolio", "about", "blog", "contact"].map((item, index) => (
              <motion.button 
                key={item}
                onClick={() => handleScroll(item)} 
                className="text-lg font-medium text-white/90 hover:text-white py-2 border-b border-white/10 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.button>
            ))}
            
            <motion.div 
              className="pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <Button 
                variant="outline" 
                className="w-full bg-gradient-to-r from-[#8A2BE2] to-[#7B1FA2] text-white border-none hover:from-[#9A4BF2] hover:to-[#8A2BE2] hover:shadow-[0_10px_25px_-5px_rgba(138,43,226,0.3)] transition-all py-6"
                onClick={() => {
                  setIsOpen(false);
                  handleScroll('contact');
                }}
              >
                Kérek egy ingyenes konzultációt <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <p className="text-xs text-white/60 mt-2 text-center">
                48 órán belül személyesen felveszem Önnel a kapcsolatot.
              </p>
            </motion.div>
            
            {user && (
              <motion.div 
                className="pt-6 flex flex-col space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <Link to={isAdmin ? "/admin" : "/dashboard"} onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full text-white/80 hover:text-white hover:bg-white/10">
                    Fiók
                  </Button>
                </Link>
                <Link to="/logout">
                  <Button 
                    variant="ghost" 
                    className="w-full text-white/80 hover:text-white hover:bg-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    Kijelentkezés
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navigation;
