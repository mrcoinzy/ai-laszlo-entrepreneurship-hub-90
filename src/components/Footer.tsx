import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, Twitter, MapPin, Phone } from "lucide-react";
import CTAButton from "@/components/ui/cta-button";
import { TextEffect } from "@/components/ui/text-effect";

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
              <h3 className="text-2xl font-bold text-white">
                <TextEffect per="char" preset="fade">
                  AI László
                </TextEffect>
              </h3>
            </Link>
            
            <p className="text-white/70 mb-6">
              <TextEffect per="word" preset="fade" delay={0.3}>
                Segítek a vállalkozóknak, hogy üzleteiket sikertörténetekké alakítsák innovatív stratégiákkal és élvonalbeli AI eszközökkel.
              </TextEffect>
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center border border-white/10 hover:border-purple-500/30 transition-colors">
                <Facebook className="h-5 w-5 text-white/70 hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center border border-white/10 hover:border-purple-500/30 transition-colors">
                <Instagram className="h-5 w-5 text-white/70 hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center border border-white/10 hover:border-purple-500/30 transition-colors">
                <Linkedin className="h-5 w-5 text-white/70 hover:text-white" />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              <TextEffect per="word" preset="fade" delay={0.2}>
                Gyors Linkek
              </TextEffect>
            </h4>
            
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors">
                  <TextEffect per="word" preset="fade" delay={0.3}>
                    Főoldal
                  </TextEffect>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">
                  <TextEffect per="word" preset="fade" delay={0.4}>
                    Munkáim
                  </TextEffect>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-white transition-colors">
                  <TextEffect per="word" preset="fade" delay={0.5}>
                    Kurzusok
                  </TextEffect>
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-white/70 hover:text-white transition-colors">
                  <TextEffect per="word" preset="fade" delay={0.6}>
                    Rólam
                  </TextEffect>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              <TextEffect per="word" preset="fade" delay={0.2}>
                Kapcsolat
              </TextEffect>
            </h4>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                <a href="mailto:contact@ailaszlo.com" className="text-white/70 hover:text-white transition-colors">
                  <TextEffect per="word" preset="fade" delay={0.3}>
                    contact@ailaszlo.com
                  </TextEffect>
                </a>
              </li>
              <li className="flex items-start">
                <Twitter className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <TextEffect per="word" preset="fade" delay={0.4}>
                    Twitter
                  </TextEffect>
                </a>
              </li>
              <li className="flex items-start">
                <Linkedin className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <TextEffect per="word" preset="fade" delay={0.5}>
                    LinkedIn
                  </TextEffect>
                </a>
              </li>
            </ul>
            
            <div className="mt-8">
              <CTAButton 
                text={
                  <TextEffect per="word" preset="fade" delay={0.6}>
                    Kérek egy konzultációt
                  </TextEffect>
                } 
                to="/contact" 
                variant="secondary" 
                className="w-full justify-center"
              />
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/50 text-sm">
            <TextEffect per="word" preset="fade" delay={0.4}>
              © {new Date().getFullYear().toString()} AI László. Minden jog fenntartva.
            </TextEffect>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
