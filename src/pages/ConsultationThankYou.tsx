import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Download, ArrowRight } from "lucide-react";
import { downloadAndTrackPdf } from "@/lib/pdfTracking";
import { toast } from "sonner";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const ConsultationThankYou = () => {
  const handleDownloadPdf = () => {
    // Use a temporary email since we don't have user authentication
    const tempEmail = "guest@example.com";
    downloadAndTrackPdf("marketing_guide.pdf", tempEmail);
    toast.success("PDF letöltése megkezdődött");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-32 pb-20 flex items-center justify-center">
        <div className="container max-w-3xl mx-auto px-4">
          <motion.div 
            className="bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-12 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)] text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="w-24 h-24 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle size={48} className="text-green-400" />
            </motion.div>
            
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-300 to-blue-300 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Köszönjük megkeresését!
            </motion.h1>
            
            <motion.p 
              className="text-lg text-white/70 mb-8 max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              24 órán belül személyesen felveszem Önnel a kapcsolatot. Addig is nézze meg esettanulmányaimat vagy töltse le az ingyenes útmutatót.
            </motion.p>
            
            <motion.div 
              className="flex flex-col md:flex-row gap-4 justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Link to="/">
                <Button 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white w-full md:w-auto"
                >
                  Vissza a főoldalra
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:shadow-[0_8px_15px_-5px_rgba(138,43,226,0.5)] transition-all duration-300 hover:-translate-y-1 w-full md:w-auto"
                onClick={handleDownloadPdf}
              >
                PDF útmutató letöltése
                <Download className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ConsultationThankYou;
