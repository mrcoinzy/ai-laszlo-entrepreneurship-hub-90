
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  BarChart3,
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

interface DashboardSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const DashboardSidebar = ({ isOpen, toggleSidebar }: DashboardSidebarProps) => {
  const [isMobile, setIsMobile] = useState(false);

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

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
      active: true
    },
    {
      icon: FileText,
      label: "Projects",
      href: "/dashboard/projects"
    },
    {
      icon: CreditCard,
      label: "Billing",
      href: "/dashboard/billing"
    },
    {
      icon: BarChart3,
      label: "Reports",
      href: "/dashboard/reports"
    },
    {
      icon: MessageSquare,
      label: "Messages",
      href: "/dashboard/messages"
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/dashboard/settings"
    }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center justify-between border-b border-white/10">
        {isOpen || isMobile ? (
          <Link to="/" className="text-xl font-bold gradient-text">
            Ai Laszlo
          </Link>
        ) : (
          <div className="w-full flex justify-center">
            <span className="text-xl font-bold gradient-text">AL</span>
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
              <Link
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-colors",
                  item.active 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent/50"
                )}
              >
                <item.icon size={18} className={(isOpen || isMobile) ? "mr-3" : "mx-auto"} />
                {(isOpen || isMobile) && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-white/10 space-y-2">
        {(isOpen || isMobile) && (
          <div className="px-3 py-2">
            <div className="text-sm font-medium">John Doe</div>
            <div className="text-xs text-white/60">john@example.com</div>
          </div>
        )}
        
        <ul className="space-y-1 px-2">
          <li>
            <Link
              to="/help"
              className="flex items-center px-3 py-2 rounded-md transition-colors hover:bg-accent/50"
            >
              <HelpCircle size={18} className={(isOpen || isMobile) ? "mr-3" : "mx-auto"} />
              {(isOpen || isMobile) && <span>Help</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/logout"
              className="flex items-center px-3 py-2 rounded-md transition-colors hover:bg-accent/50"
            >
              <LogOut size={18} className={(isOpen || isMobile) ? "mr-3" : "mx-auto"} />
              {(isOpen || isMobile) && <span>Logout</span>}
            </Link>
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
