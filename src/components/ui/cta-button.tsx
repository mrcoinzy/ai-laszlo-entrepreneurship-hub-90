import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CTAButtonProps {
  text: string;
  to: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const CTAButton = ({ 
  text, 
  to, 
  variant = "primary", 
  className = "", 
  type,
  disabled
}: CTAButtonProps) => {
  const buttonContent = (
    <span className="relative z-10 flex items-center">
      {text}
      <ChevronRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={18} />
    </span>
  );

  // Common button props
  const buttonProps = {
    className: variant === "primary" 
      ? `bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 
         hover:shadow-[0_8px_25px_-5px_rgba(138,43,226,0.5)] px-8 py-6 rounded-xl text-base 
         transition-all duration-300 hover:-translate-y-1 group ${className}`
      : variant === "secondary"
        ? `bg-purple-500/20 text-white border border-purple-500/30 
           hover:bg-purple-500/30 px-8 py-6 rounded-xl text-base 
           transition-all duration-300 hover:-translate-y-1 group ${className}`
        : `px-8 py-6 rounded-xl text-base border-white/20 bg-white/5 
           hover:bg-white/10 hover:border-white/30 transition-all duration-300 ${className}`,
    type,
    disabled
  };

  // If it's a submit button or disabled, don't wrap in Link
  if (type === "submit" || disabled) {
    return (
      <Button {...buttonProps}>
        {buttonContent}
      </Button>
    );
  }
  
  // Otherwise render with Link for navigation
  return (
    <Link to={to}>
      <Button {...buttonProps}>
        {buttonContent}
      </Button>
    </Link>
  );
};

export default CTAButton;
