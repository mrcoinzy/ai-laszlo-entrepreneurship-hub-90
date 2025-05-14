import React, { useState } from "react";
import { motion } from "framer-motion";
import CTAButton from "@/components/ui/cta-button";
import AnimatedSection from "./ui/animated-section";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { downloadAndTrackPdf } from "@/lib/pdfTracking";

const EmailLeadMagnetSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from("email_subscribers")
        .insert([{ email, source: "Newsletter Section" }]);

      if (error) {
        if (error.code === "23505") {
          // Unique constraint violated (already subscribed)
          toast.error("Ez az e-mail cím már fel van iratkozva.");
          // Download PDF anyway for existing subscribers
          downloadAndTrackPdf("konverzio_pszichologia_2025.pdf", email);
          toast.success("A PDF letöltése megkezdődött");
        } else {
          toast.error("Hiba történt a feliratkozáskor.");
        }
      } else {
        toast.success("Sikeres feliratkozás!");
        setEmail("");
        
        // Automatically download the PDF after successful subscription
        downloadAndTrackPdf("konverzio_pszichologia_2025.pdf", email);
        toast.success("A PDF letöltése megkezdődött");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Váratlan hiba történt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedSection className="py-24">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-6"
        >
          A konverzió pszichológiája - mi működik 2025-ben?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-white/70 mb-8"
        >
          Iratkozzon fel hírlevelünkre, és tudja meg elsőként a legújabb trendeket és taktikákat!
          <br/>
          <span className="text-purple-300 font-medium mt-2 inline-block">
            Feliratkozás után automatikusan letöltődik az ingyenes PDF útmutatónk.
          </span>
        </motion.p>
        
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          onSubmit={handleSubscribe}
        >
          <input 
            type="email" 
            placeholder="Írja be az e-mail címét" 
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-black"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          <CTAButton 
            text={loading ? "Feliratkozás..." : "Feliratkozom"} 
            to="#" 
            variant="secondary"
            type="submit"
            disabled={loading}
          />
        </motion.form>
      </div>
    </AnimatedSection>
  );
};

export default EmailLeadMagnetSection;
