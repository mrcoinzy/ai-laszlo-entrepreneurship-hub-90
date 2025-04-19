
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { consultationFormSchema, type ConsultationFormValues } from "../schema";

export const useConsultationForm = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  
  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      website: "",
      businessType: "",
      businessDetails: "",
      mainGoal: "",
      onlinePresence: "no",
      biggestChallenge: "",
      interestedServices: [],
      budgetRange: [1000000]
    }
  });

  const onSubmit = async (values: ConsultationFormValues) => {
    if (submitting) return;
    
    try {
      setSubmitting(true);
      console.log("Starting form submission with values:", values);
      
      const supabaseData = {
        name: values.name,
        email: values.email,
        website: values.website || null,
        business_type: values.businessType,
        business_details: values.businessDetails || null,
        main_goal: values.mainGoal,
        online_presence: values.onlinePresence,
        biggest_challenge: values.biggestChallenge,
        interested_services: values.interestedServices,
        budget_range: values.budgetRange[0]
      };
      
      console.log("Transformed data for Supabase:", supabaseData);
      
      const { data, error } = await supabase
        .from('consultations')
        .insert(supabaseData)
        .select()
        .single();
      
      if (error) {
        console.error("Error inserting data into Supabase:", error);
        toast.error("Hiba történt a küldés során. Kérjük próbálja újra!");
        return;
      }
      
      console.log("Successfully submitted to Supabase:", data);
      toast.success("Köszönjük a kitöltést!");
      navigate("/consultation-thankyou");
    } catch (error) {
      console.error("Unexpected error submitting form:", error);
      toast.error("Váratlan hiba történt. Kérjük próbálja újra!");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    submitting,
    onSubmit: form.handleSubmit(onSubmit)
  };
};
