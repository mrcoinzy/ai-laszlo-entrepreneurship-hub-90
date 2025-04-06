
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Menu, ChevronRight, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Add a safe logout handler
  const handleLogout = () => {
    // Close mobile menu if it's open
    if (isOpen) setIsOpen(false);
    // Navigate to the logout page
    navigate('/logout');
  };
  
  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold gradient-text">
            Ai Laszlo
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm text-white/80 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/works" className="text-sm text-white/80 hover:text-white transition-colors">
              Works
            </Link>
            <Link to="/courses" className="text-sm text-white/80 hover:text-white transition-colors">
              Courses
            </Link>
            <Link to="/about" className="text-sm text-white/80 hover:text-white transition-colors">
              About
            </Link>
            {user && (
              <Link to="/dashboard" className="text-sm text-white/80 hover:text-white transition-colors">
                Dashboard
              </Link>
            )}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  className="text-white/80 hover:text-white"
                  onClick={() => navigate('/dashboard')}
                >
                  <User size={16} className="mr-2" />
                  Account
                </Button>
                <Button 
                  variant="outline" 
                  className="text-white/80 hover:text-white"
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-white/80 hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-white text-black hover:bg-white/90">
                    Register
                  </Button>
                </Link>
              </>
            )}
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
            <Link to="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/works" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
              Works
            </Link>
            <Link to="/courses" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
              Courses
            </Link>
            <Link to="/about" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
              About
            </Link>
            {user && (
              <Link to="/dashboard" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
            )}
            <div className="pt-6 flex flex-col space-y-4">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      <User size={16} className="mr-2" />
                      Account
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-white text-black hover:bg-white/90">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
