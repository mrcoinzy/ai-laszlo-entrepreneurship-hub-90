import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 " +
        (scrolled ? "bg-black/60 backdrop-blur-md border-b border-white/10" : "bg-transparent")
      }
      role="banner"
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/lovable-uploads/cc9654f3-72f3-4745-a08a-ec255351e656.png"
            alt="László logó"
            className="h-7 w-auto"
          />
          <span className="sr-only">AI László</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-white/80">
          <Link to="/" className="hover:text-white transition-colors">Kezdőlap</Link>
          <a href="#services" className="hover:text-white transition-colors">Szolgáltatások</a>
          <a href="#about" className="hover:text-white transition-colors">Rólunk</a>
          <a href="#news" className="hover:text-white transition-colors">Újdonságok</a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/consultation">
            <Button className="rounded-full px-5 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:brightness-110 shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.5)]">
              Kezdjük el
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
