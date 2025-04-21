import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, Twitter, MapPin, Phone } from "lucide-react";
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
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center border border-white/10 hover:border-purple-500/30 transition-colors">
                <Facebook className="h-5 w-5 text-white/70 hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center border border-white/10 hover:border-purple-500/30 transition-colors">
                <Twitter className="h-5 w-5 text-white/70 hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center border border-white/10 hover:border-purple-500/30 transition-colors">
                <Instagram className="h-5 w-5 text-white/70 hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center border border-white/10 hover:border-purple-500/30 transition-colors">
                <Linkedin className="h-5 w-5 text-white/70 hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center border border-white/10 hover:border-purple-500/30 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white/70 hover:text-white"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 22V12C9 7 15 7 15 12V22" />
                  <path d="M8 10C8 5 15 5 15 10" />
                  <path d="M15 5C15 3.5 16.5 2 18 2M18 4C16.5 4 15 3 15 2" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Gyors Linkek</h4>
            
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors">Főoldal</Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">Munkáim</Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-white transition-colors">Kurzusok</Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-white/70 hover:text-white transition-colors">Rólam</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Kapcsolat</h4>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                <a href="mailto:contact@ailaszlo.com" className="text-white/70 hover:text-white transition-colors">
                  contact@ailaszlo.com
                </a>
              </li>
              <li className="flex items-start">
                <Twitter className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                <a href="https://twitter.com/ailaszlo" className="text-white/70 hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li className="flex items-start">
                <Linkedin className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                <a href="https://www.linkedin.com/in/ailaszlo" className="text-white/70 hover:text-white transition-colors">
                  LinkedIn
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
        
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} AI László. Minden jog fenntartva.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
