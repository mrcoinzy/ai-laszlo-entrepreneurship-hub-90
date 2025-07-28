import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Menu, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const EbookNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const handleConsultation = () => {
    setIsOpen(false);
    navigate('/consultation');
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
        ? "bg-black/60 backdrop-blur-xl py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]" 
        : "bg-transparent py-5"
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-medium relative">
            <motion.span 
              className="bg-gradient-to-r from-white via-purple-300 to-blue-300 bg-clip-text text-transparent font-bold"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              AI László
            </motion.span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8 justify-center flex-1 mx-4">
            <Link 
              to="/"
              className="text-sm text-white/80 hover:text-white transition-colors relative overflow-hidden group"
            >
              Vissza a fő oldalra
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <Button 
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:shadow-[0_8px_15px_-5px_rgba(138,43,226,0.5)] rounded-full px-6 py-2 transition-all duration-300 hover:-translate-y-1"
              onClick={handleConsultation}
            >
              Ingyenes konzultáció <ChevronRight className="ml-1 h-4 w-4" />
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
      
      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden h-screen w-full bg-black/90 backdrop-blur-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col p-8 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="text-center"
            >
              <Link 
                to="/"
                className="block text-lg font-medium text-white/90 hover:text-white py-2 border-b border-white/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Vissza a fő oldalra
              </Link>
            </motion.div>
            
            <motion.div 
              className="pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:shadow-[0_8px_15px_-5px_rgba(138,43,226,0.5)] rounded-xl py-6"
                onClick={handleConsultation}
              >
                Kérek egy ingyenes konzultációt <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <p className="text-xs text-white/60 mt-2 text-center">
                48 órán belül személyesen felveszem Önnel a kapcsolatot.
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default EbookNavigation;