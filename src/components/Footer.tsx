
import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Mail, Instagram, TikTok } from "lucide-react";
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
                <Linkedin className="h-5 w-5 text-white/70 hover:text-white" />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Gyors Linkek</h4>
            
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors">Bemutatkozás</Link>
              </li>
              <li>
                <Link to="#garancia" className="text-white/70 hover:text-white transition-colors">Garancia</Link>
              </li>
              <li>
                <Link to="#szolgaltatasok" className="text-white/70 hover:text-white transition-colors">Szolgáltatások</Link>
              </li>
              <li>
                <Link to="#miert-engem" className="text-white/70 hover:text-white transition-colors">Miért Engem</Link>
              </li>
              <li>
                <Link to="#eredmenyeim" className="text-white/70 hover:text-white transition-colors">Eredményeim</Link>
              </li>
              <li>
                <Link to="#ugyfeleim" className="text-white/70 hover:text-white transition-colors">Ügyfeleim</Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/70 hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/consultation" className="text-white/70 hover:text-white transition-colors">Konzultáció</Link>
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
                <Instagram className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                <a href="https://instagram.com/ailaszlo" className="text-white/70 hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li className="flex items-start">
                <TikTok className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                <a href="https://tiktok.com/@ailaszlo" className="text-white/70 hover:text-white transition-colors">
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

