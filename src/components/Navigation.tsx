
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Menu, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-background/90 backdrop-blur-md py-3 shadow-lg rounded-b-lg" 
        : "bg-transparent py-5"
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-medium">
            <span className={scrolled ? "gradient-nav-animation" : "text-white"}>AI László</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            <button onClick={() => handleScroll('services')} className="text-sm text-white/80 hover:text-white transition-colors">
              Szolgáltatások
            </button>
            <button onClick={() => handleScroll('portfolio')} className="text-sm text-white/80 hover:text-white transition-colors">
              Portfólió
            </button>
            <button onClick={() => handleScroll('about')} className="text-sm text-white/80 hover:text-white transition-colors">
              Rólam
            </button>
            <button onClick={() => handleScroll('blog')} className="text-sm text-white/80 hover:text-white transition-colors">
              Blog
            </button>
            <button onClick={() => handleScroll('contact')} className="text-sm text-white/80 hover:text-white transition-colors">
              Kapcsolat
            </button>
          </div>
          
          <div className="hidden md:block">
            <Button 
              variant="outline" 
              className="bg-white text-black hover:bg-black hover:text-white border-white transition-all duration-300"
            >
              Kérek egy ingyenes konzultációt <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden h-screen w-full bg-background animate-fade-in">
          <div className="flex flex-col p-8 space-y-6">
            <button onClick={() => handleScroll('services')} className="text-lg font-medium">
              Szolgáltatások
            </button>
            <button onClick={() => handleScroll('portfolio')} className="text-lg font-medium">
              Portfólió
            </button>
            <button onClick={() => handleScroll('about')} className="text-lg font-medium">
              Rólam
            </button>
            <button onClick={() => handleScroll('blog')} className="text-lg font-medium">
              Blog
            </button>
            <button onClick={() => handleScroll('contact')} className="text-lg font-medium">
              Kapcsolat
            </button>
            
            <div className="pt-6">
              <Button 
                variant="outline" 
                className="w-full bg-white text-black hover:bg-black hover:text-white border-white transition-all"
                onClick={() => setIsOpen(false)}
              >
                Kérek egy ingyenes konzultációt <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <p className="text-xs text-white/60 mt-2 text-center">
                48 órán belül személyesen felveszem Önnel a kapcsolatot.
              </p>
            </div>
            
            {user && (
              <div className="pt-6 flex flex-col space-y-4">
                <Link to={isAdmin ? "/admin" : "/dashboard"} onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full">
                    Fiók
                  </Button>
                </Link>
                <Link to="/logout">
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Kijelentkezés
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
