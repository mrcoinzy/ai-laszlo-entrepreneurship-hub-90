
import React, { useState } from "react";
import { motion } from "framer-motion";
import CTAButton from "@/components/ui/cta-button";
import AnimatedSection from "./ui/animated-section";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const EmailLeadMagnetSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Kérjük, adja meg az e-mail címét!");
      return;
    }
    setLoading(true);

    try {
      // Insert the email into the subscribers table
      const { data, error } = await supabase
        .from("email_subscribers")
        .insert([{ email, source: "Newsletter Section" }])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        
        if (error.code === "23505") {
          // Unique constraint violated (already subscribed)
          toast.error("Ez az e-mail cím már fel van iratkozva.");
        } else {
          toast.error("Hiba történt a feliratkozáskor: " + error.message);
          console.error("Subscription error:", error);
        }
        setLoading(false);
        return;
      }

      // If subscription was successful, call the edge function to send the email
      if (data && data.length > 0) {
        const subscriber = data[0];
        
        try {
          // Call the edge function to send the email
          const response = await fetch(
            "https://jffkwmrwwmmmlbaazvry.supabase.co/functions/v1/send-subscription-email", 
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${supabase.auth.session()?.access_token || ""}`,
                "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmZmt3bXJ3d21tbWxiYWF6dnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNTgzNTcsImV4cCI6MjA2MDYzNDM1N30.KeyC24HRq6xw8zbZ4Dp_jYX_jTqLZRx6Me2dWdsZ0vs"
              },
              body: JSON.stringify(subscriber),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Hiba történt az email küldésekor");
          }
          
          toast.success("Sikeres feliratkozás! Elküldtük az eBook-ot az email címére.");
          setEmail("");
        } catch (emailError: any) {
          console.error("Email sending error:", emailError);
          toast.error("Sikeres feliratkozás, de az email küldése közben hiba történt. Kérjük, próbálja újra később!");
        }
      }
    } catch (err) {
      console.error("Subscription process error:", err);
      toast.error("Hiba történt a feliratkozáskor. Kérjük, próbálja újra később!");
    }
    
    setLoading(false);
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
          Iratkozzon fel hírlevelünkre, és töltse le MOST az ingyenes eBook-ot! Csak 24 óráig elérhető!
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
            text={loading ? "Feldolgozás..." : "Ingyenes PDF Letöltése"} 
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
