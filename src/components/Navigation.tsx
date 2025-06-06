
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Menu, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Section IDs and their display names
  const sections = [
    { id: "bemutatkozas", name: "Bemutatkozás" },
    { id: "garancia", name: "Garancia" },
    { id: "szolgaltatasok", name: "Szolgáltatások" },
    { id: "miert-engem", name: "Miért Engem" },
    { id: "eredmenyeim", name: "Eredményeim" },
    { id: "ugyfeleim", name: "Ügyfeleim" },
    { id: "blog", name: "Blog" }
  ];
  
  const handleScroll = (elementId: string) => {
    setIsOpen(false);
    
    // If we're not on the home page, navigate to the home page first
    if (location.pathname !== "/") {
      navigate(`/#${elementId}`);
      return;
    }
    
    const element = document.getElementById(elementId);
    if (element) {
      const navHeight = 80; // Height of the fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      console.warn(`Element with ID "${elementId}" not found.`);
    }
  };

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
    
    // Handle hash in URL for direct section navigation
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const navHeight = 80; // Height of the fixed navbar
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - navHeight;
  
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 500); // Increased timeout to ensure DOM is fully loaded
    }

    return () => {
      window.removeEventListener('scroll', handleScrollEffect);
    };
  }, [location]);
  
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
          
          <div className="hidden xl:flex items-center space-x-10 justify-center flex-1 mx-4">
            {sections.map((section) => (
              <button 
                key={section.id}
                onClick={() => handleScroll(section.id)} 
                className="text-sm text-white/80 hover:text-white transition-colors relative overflow-hidden group"
              >
                {section.name}
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <Link 
              to="/consultation"
              className="text-sm text-white/80 hover:text-white transition-colors relative overflow-hidden group"
            >
              Konzultáció
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
          
          <div className="hidden xl:block">
            <Button 
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:shadow-[0_8px_15px_-5px_rgba(138,43,226,0.5)] rounded-full px-6 py-2 transition-all duration-300 hover:-translate-y-1"
              onClick={handleConsultation}
            >
              Ingyenes konzultáció <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <motion.button 
            className="xl:hidden text-white"
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
          className="xl:hidden h-screen w-full bg-black/90 backdrop-blur-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col p-8 space-y-6">
            {sections.map((section, index) => (
              <motion.button 
                key={section.id}
                onClick={() => handleScroll(section.id)} 
                className="text-lg font-medium text-white/90 hover:text-white py-2 border-b border-white/10 transition-colors text-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
              >
                {section.name}
              </motion.button>
            ))}
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="text-center"
            >
              <Link 
                to="/consultation"
                className="block text-lg font-medium text-white/90 hover:text-white py-2 border-b border-white/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Konzultáció
              </Link>
            </motion.div>
            
            <motion.div 
              className="pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
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

export default Navigation;
