
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">AI Laszlo</h3>
            <p className="text-white/70 mb-4">
              Segítek a vállalkozóknak, hogy ötleteiket sikertörténetekké alakítsák innovatív stratégiákkal és élvonalbeli AI eszközökkel.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">Gyors Linkek</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors">
                  Főoldal
                </Link>
              </li>
              <li>
                <Link to="/works" className="text-white/70 hover:text-white transition-colors">
                  Munkáim
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-white/70 hover:text-white transition-colors">
                  Kurzusok
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">
                  Rólam
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">Kapcsolat</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@ailaszlo.com" className="text-white/70 hover:text-white transition-colors">
                  contact@ailaszlo.com
                </a>
              </li>
              <li>
                <a href="https://twitter.com/ailaszlo" className="text-white/70 hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/ailaszlo" className="text-white/70 hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} AI László. Minden jog fenntartva.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
