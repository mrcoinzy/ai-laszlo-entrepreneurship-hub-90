
import React from "react";
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
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const DashboardSidebar = ({ isOpen, toggleSidebar }: DashboardSidebarProps) => {
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

  return (
    <div
      className={cn(
        "h-screen bg-accent/30 border-r border-white/10 fixed md:static z-40 transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          {isOpen ? (
            <Link to="/" className="text-xl font-bold gradient-text">
              Ai Laszlo
            </Link>
          ) : (
            <div className="w-full flex justify-center">
              <span className="text-xl font-bold gradient-text">AL</span>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={toggleSidebar}
          >
            {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </Button>
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
                  <item.icon size={18} className={isOpen ? "mr-3" : "mx-auto"} />
                  {isOpen && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-white/10 space-y-2">
          {isOpen && (
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
                <HelpCircle size={18} className={isOpen ? "mr-3" : "mx-auto"} />
                {isOpen && <span>Help</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                className="flex items-center px-3 py-2 rounded-md transition-colors hover:bg-accent/50"
              >
                <LogOut size={18} className={isOpen ? "mr-3" : "mx-auto"} />
                {isOpen && <span>Logout</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
