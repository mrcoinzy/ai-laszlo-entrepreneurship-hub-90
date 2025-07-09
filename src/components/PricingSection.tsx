import React from "react";
import { Check, Star, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PricingSection = () => {
  const packages = [
    {
      name: "ENTERPRISE",
      originalName: "Prémium csomag",
      price: "159.000",
      icon: <Star className="h-8 w-8 text-purple-400" />,
      popular: true,
      features: [
        "Garancia 2 évig",
        "2025-ös design",
        "Legmodernebb rendszerrel (React.js, Vue, Node.js, Flutter)",
        "100% biztonság és védelem DDOS, SQL Injection, titkosítás",
        "Ingyenes tárhely Ai László dedikált szerverrel",
        "SEO, és marketing szövegek az oldalon",
        "Ingyenes karbantartás",
        "Közösségi média kezelés"
      ]
    },
    {
      name: "STARTER",
      originalName: "Standard csomag",
      price: "49.000",
      icon: <Zap className="h-8 w-8 text-purple-400" />,
      popular: false,
      features: [
        "Garancia 2 évig",
        "2025-ös design",
        "Legmodernebb rendszerrel (React.js, Vue, Node.js, Flutter)",
        "100% biztonság és védelem DDOS, SQL Injection, titkosítás",
        "Ingyenes tárhely Ai László dedikált szerverrel"
      ]
    },
    {
      name: "PROFESSIONAL",
      originalName: "Közepes csomag",
      price: "89.000",
      icon: <Shield className="h-8 w-8 text-purple-400" />,
      popular: false,
      features: [
        "Garancia 2 évig",
        "2025-ös design",
        "Legmodernebb rendszerrel (React.js, Vue, Node.js, Flutter)",
        "100% biztonság és védelem DDOS, SQL Injection, titkosítás",
        "Ingyenes tárhely Ai László dedikált szerverrel",
        "SEO, és marketing szövegek az oldalon"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="w-full bg-black py-20 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-purple-600/10 rounded-full filter blur-[120px] opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-blue-600/10 rounded-full filter blur-[120px] opacity-40"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex mb-4">
            <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Árlista
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-white to-purple-300 bg-clip-text text-transparent">
            Weboldal készítés garantáltan 1 héten belül!
          </h2>
          <p className="text-lg text-white/70">
            Válassza ki az Önnek megfelelő csomagot és indítsuk el a munkát még ma!
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {packages.map((pkg, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className={`relative h-full flex flex-col bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border transition-all duration-300 hover:shadow-[0_20px_50px_-15px_rgba(138,43,226,0.3)] hover:translate-y-[-8px] ${
                pkg.popular 
                  ? "border-purple-400/50 shadow-[0_10px_30px_-10px_rgba(138,43,226,0.4)] scale-105" 
                  : "border-white/10 hover:border-white/20"
              }`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Legnépszerűbb
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-purple-500/20 border border-purple-400/30">
                      {pkg.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    {pkg.name}
                  </CardTitle>
                  <div className="text-center">
                    <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                      {pkg.price}
                    </span>
                    <span className="text-white/70 ml-1">Ft-tól</span>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="pt-6">
                  <Link to="/consultation" className="w-full">
                    <Button 
                      className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                        pkg.popular
                          ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-[0_10px_25px_-5px_rgba(138,43,226,0.5)]"
                          : "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40"
                      }`}
                    >
                      Megrendelem most
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-white/70 mb-6">
            Nem biztos, melyik csomag lenne a legjobb Önnek?
          </p>
          <Link to="/consultation">
            <Button 
              variant="outline"
              className="bg-transparent border-purple-400/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 px-8 py-3"
            >
              Kérjen ingyenes konzultációt
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;