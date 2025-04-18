
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type CTAButtonProps = {
  text: ReactNode;
  to: string;
  variant?: "primary" | "secondary";
  className?: string;
};

const CTAButton = ({ text, to, variant = "primary", className }: CTAButtonProps) => {
  return (
    <Link to={to}>
      <button 
        className={cn(
          "inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-medium transition-all duration-300",
          variant === "primary" 
            ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1" 
            : "bg-white/10 border border-white/20 text-white hover:bg-white/15 hover:border-white/30",
          className
        )}
      >
        {text}
      </button>
    </Link>
  );
};

export default CTAButton;
