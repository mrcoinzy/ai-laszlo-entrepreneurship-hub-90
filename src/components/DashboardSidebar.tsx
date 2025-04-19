
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  MessageSquare,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DashboardSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const DashboardSidebar = ({ isOpen, toggleSidebar }: DashboardSidebarProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  // Check if screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/admin");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/admin/dashboard"
    },
    {
      icon: FileText,
      label: "Consultations",
      href: "/admin/dashboard/consultations"
    },
    {
      icon: Users,
      label: "Users",
      href: "/admin/dashboard/users"
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/admin/dashboard/settings"
    }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center justify-between border-b border-white/10">
        {isOpen || isMobile ? (
          <Link to="/admin/dashboard" className="text-xl font-bold gradient-text">
            Admin Panel
          </Link>
        ) : (
          <div className="w-full flex justify-center">
            <span className="text-xl font-bold gradient-text">AP</span>
          </div>
        )}
        {!isMobile && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={toggleSidebar}
          >
            {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </Button>
        )}
      </div>
      
      <nav className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item, index) => (
            <li key={index}>
              {isOpen || isMobile ? (
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md transition-colors",
                    isActive(item.href) 
                      ? "bg-primary text-white" 
                      : "hover:bg-accent/50"
                  )}
                >
                  <item.icon size={18} className="mr-3" />
                  <span>{item.label}</span>
                </Link>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center justify-center px-3 py-2 rounded-md transition-colors",
                        isActive(item.href) 
                          ? "bg-primary text-white" 
                          : "hover:bg-accent/50"
                      )}
                    >
                      <item.icon size={18} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-white/10 space-y-2">
        {(isOpen || isMobile) && user && (
          <div className="px-3 py-2">
            <div className="text-sm font-medium">{user.email}</div>
            <div className="text-xs text-white/60">Administrator</div>
          </div>
        )}
        
        <ul className="space-y-1 px-2">
          <li>
            {isOpen || isMobile ? (
              <Link
                to="/help"
                className="flex items-center px-3 py-2 rounded-md transition-colors hover:bg-accent/50"
              >
                <HelpCircle size={18} className="mr-3" />
                <span>Help</span>
              </Link>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/help"
                    className="flex items-center justify-center px-3 py-2 rounded-md transition-colors hover:bg-accent/50"
                  >
                    <HelpCircle size={18} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Help
                </TooltipContent>
              </Tooltip>
            )}
          </li>
          <li>
            {isOpen || isMobile ? (
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start px-3 py-2 rounded-md transition-colors hover:bg-accent/50"
                onClick={handleLogout}
              >
                <LogOut size={18} className="mr-3" />
                <span>Logout</span>
              </Button>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-center px-3 py-2 rounded-md transition-colors hover:bg-accent/50"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Logout
                </TooltipContent>
              </Tooltip>
            )}
          </li>
        </ul>
      </div>
    </div>
  );

  // Render a Sheet on mobile, regular sidebar on desktop
  return isMobile ? (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-4 left-4 z-40 md:hidden"
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-accent/30 border-r border-white/10">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </Button>
    </>
  ) : (
    <div
      className={cn(
        "h-screen bg-accent/30 border-r border-white/10 fixed md:relative z-40 transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <SidebarContent />
    </div>
  );
};

export default DashboardSidebar;
