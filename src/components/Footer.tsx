import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Mail, Instagram } from "lucide-react";
import CTAButton from "@/components/ui/cta-button";

const Footer = () => {
  return (
    <footer className="w-full bg-black pt-16 pb-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-600/5 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand column */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <h3 className="text-2xl font-bold text-white">AI László</h3>
            </Link>
            
            <p className="text-white/70 mb-6">
              Segítek a vállalkozóknak, hogy üzleteiket sikertörténetekké alakítsák innovatív stratégiákkal és élvonalbeli AI eszközökkel.
            </p>
            
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/ailaszlo.start/" className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center border border-white/10 hover:border-purple-500/30 transition-colors">
                <Instagram className="h-5 w-5 text-white/70 hover:text-white" />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Gyors Linkek</h4>
            
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-white/70 hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/consultation" className="text-white/70 hover:text-white transition-colors">Konzultáció</Link>
              </li>
              <li>
                <Link to="/legal" className="text-white/70 hover:text-white transition-colors">ÁSZF</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Kapcsolat</h4>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                <a href="mailto:info@ailaszlo.com" className="text-white/70 hover:text-white transition-colors">
                  info@ailaszlo.com
                </a>
              </li>
              <li className="flex items-start">
                <Instagram className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                <a href="https://www.instagram.com/ailaszlo.start/" className="text-white/70 hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li className="flex items-start">
                {/* Custom TikTok icon since it's not available in lucide-react */}
                <svg 
                  className="h-5 w-5 text-purple-400 mr-3 mt-1" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                  <path d="M15 8h.01"></path>
                  <path d="M15 12h.01"></path>
                  <path d="M15 16h.01"></path>
                  <path d="M9 4h10v16H9a6 6 0 0 1 0-12"></path>
                </svg>
                <a href="https://www.tiktok.com/@ailaszlo.start" className="text-white/70 hover:text-white transition-colors">
                  TikTok
                </a>
              </li>
            </ul>
            
            <div className="mt-8">
              <CTAButton 
                text="Kérek egy konzultációt" 
                to="/consultation" 
                variant="secondary" 
                className="w-full justify-center"
              />
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-white/50 text-sm mb-3 sm:mb-0">
              © {new Date().getFullYear()} AI László. Minden jog fenntartva.
            </p>
            <div className="flex space-x-4 text-sm">
              <Link to="/legal" className="text-white/50 hover:text-white transition-colors">
                Jogi nyilatkozat
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
