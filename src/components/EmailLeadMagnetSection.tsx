import React from "react";
import { motion } from "framer-motion";
import CTAButton from "@/components/ui/cta-button";
const EmailLeadMagnetSection = () => {
  return <section className="py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/10 filter blur-[120px] opacity-60"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 filter blur-[120px] opacity-60"></div>
      </div>
      
      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20 bg-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-3xl sm:text-4xl font-bold mb-6">
            A konverzió pszichológiája - mi működik 2025-ben?
          </motion.h2>
          
          <motion.p initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.2,
          duration: 0.6
        }} className="text-lg text-white/70 mb-8">
            Iratkozzon fel hírlevelünkre, és tudja meg elsőként a legújabb trendeket és taktikákat!
          </motion.p>
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.4,
          duration: 0.5
        }} className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input type="email" placeholder="Írja be az e-mail címét" className="w-full sm:w-auto px-6 py-3 rounded-xl text-black" />
            <CTAButton text="Feliratkozom" to="#" variant="secondary" />
          </motion.div>
        </div>
      </div>
    </section>;
};
export default EmailLeadMagnetSection;