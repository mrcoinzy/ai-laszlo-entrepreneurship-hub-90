
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MultiStepForm, FormStep } from "@/components/ui/multi-step-form";
import { Form } from "@/components/ui/form";
import { BasicInfoStep } from "@/features/consultation/components/BasicInfoStep";
import { BusinessInfoStep } from "@/features/consultation/components/BusinessInfoStep";
import { GoalsStep } from "@/features/consultation/components/GoalsStep";
import { ServicesStep } from "@/features/consultation/components/ServicesStep";
import { useConsultationForm } from "@/features/consultation/hooks/useConsultationForm";

const Consultation = () => {
  const { form, submitting, onSubmit } = useConsultationForm();

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-300 to-blue-300 bg-clip-text text-transparent">
              Ingyenes konzultáció
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              Írja le igényeit, és személyre szabott segítséget nyújtok a digitális jelenléte fejlesztéséhez
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)]">
            <Form {...form}>
              <form onSubmit={onSubmit}>
                <MultiStepForm isSubmitting={submitting}>
                  <FormStep 
                    title="Alapvető információk" 
                    description="Ezek az adatok segítenek, hogy felvehessem Önnel a kapcsolatot."
                  >
                    <BasicInfoStep form={form} />
                  </FormStep>

                  <FormStep 
                    title="Vállalkozásának adatai" 
                    description="Segítsen jobban megérteni a vállalkozását."
                  >
                    <BusinessInfoStep form={form} />
                  </FormStep>

                  <FormStep 
                    title="Célok és kihívások" 
                    description="Segítsen megérteni, mire van szüksége."
                  >
                    <GoalsStep form={form} />
                  </FormStep>

                  <FormStep 
                    title="További információk a hatékonyabb segítségnyújtáshoz" 
                    description="Ezek az információk segítenek, hogy célzottabb tanácsokat adhassak."
                  >
                    <ServicesStep form={form} />
                  </FormStep>
                </MultiStepForm>
              </form>
            </Form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Consultation;
