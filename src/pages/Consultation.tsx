
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MultiStepForm, FormStep } from "@/components/ui/multi-step-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const consultationFormSchema = z.object({
  name: z.string().min(2, { message: "A név legalább 2 karakter hosszú kell legyen" }),
  email: z.string().email({ message: "Érvénytelen email cím" }),
  website: z.string().optional(),
  businessType: z.string().min(1, { message: "Kérjük válasszon egy üzleti típust" }),
  businessDetails: z.string().optional(),
  mainGoal: z.string().min(1, { message: "Kérjük adja meg fő célját" }),
  onlinePresence: z.enum(["yes", "no", "social"], { 
    required_error: "Kérjük válasszon egy opciót" 
  }),
  biggestChallenge: z.string().min(5, { message: "Kérjük, fejtse ki bővebben" }),
  interestedServices: z.array(z.string()).min(1, { message: "Válasszon legalább egy szolgáltatást" }),
  budgetRange: z.array(z.number()).length(1, { message: "Kérjük állítsa be a költségvetési tartományt" })
});

type ConsultationFormValues = z.infer<typeof consultationFormSchema>;

const Consultation = () => {
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
    if (submitting) return; // Prevent multiple submissions
    
    try {
      setSubmitting(true);
      
      console.log("Submitting consultation:", values);
      
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Köszönjük a kitöltést!");
      navigate("/consultation-thankyou");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Hiba történt a küldés során. Kérjük próbálja újra!");
    } finally {
      setSubmitting(false);
    }
  };

  const formatBudget = (value: number) => {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      maximumFractionDigits: 0
    }).format(value);
  };

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
              <MultiStepForm onSubmit={form.handleSubmit(onSubmit)}>
                <FormStep 
                  title="Alapvető információk" 
                  description="Ezek az adatok segítenek, hogy felvehessem Önnel a kapcsolatot."
                >
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Név</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              placeholder="Teljes neve" 
                              className="border-white/20 bg-white/5 text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email cím</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email" 
                              placeholder="email@pelda.hu" 
                              className="border-white/20 bg-white/5 text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Weboldal (opcionális)</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="https://az-on-oldala.hu" 
                              className="border-white/20 bg-white/5 text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormStep>

                <FormStep 
                  title="Vállalkozásának adatai" 
                  description="Segítsen jobban megérteni a vállalkozását."
                >
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="businessType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Vállalkozás típusa</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-white/20 bg-white/5 text-white">
                                <SelectValue placeholder="Válasszon egy típust" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="border-white/20 bg-black/90 backdrop-blur-lg text-white">
                              <SelectItem value="service">Szolgáltató</SelectItem>
                              <SelectItem value="webshop">Webáruház</SelectItem>
                              <SelectItem value="coach">Coach / Tanácsadó</SelectItem>
                              <SelectItem value="realestate">Ingatlan</SelectItem>
                              <SelectItem value="startup">Startup</SelectItem>
                              <SelectItem value="restaurant">Vendéglátás</SelectItem>
                              <SelectItem value="other">Egyéb</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("businessType") === "other" && (
                      <FormField
                        control={form.control}
                        name="businessDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Egyéb vállalkozás részletei</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                placeholder="Kérjük, írja le a vállalkozás típusát" 
                                className="border-white/20 bg-white/5 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="onlinePresence"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-white">Jelenlegi online jelenlét</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-2"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="yes" className="border-white/30 text-purple-500" />
                                </FormControl>
                                <FormLabel className="font-normal text-white">
                                  Van weboldalam és aktív közösségi média jelenlétem
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="social" className="border-white/30 text-purple-500" />
                                </FormControl>
                                <FormLabel className="font-normal text-white">
                                  Csak közösségi médián vagyok jelen
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="no" className="border-white/30 text-purple-500" />
                                </FormControl>
                                <FormLabel className="font-normal text-white">
                                  Nincs online jelenlétem
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormStep>

                <FormStep 
                  title="Célok és kihívások" 
                  description="Segítsen megérteni, mire van szüksége."
                >
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="mainGoal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Fő cél a konzultációval</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="Pl. Szeretném növelni az online értékesítést, vagy új weboldalt szeretnék készíteni..." 
                              className="border-white/20 bg-white/5 text-white min-h-[100px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="biggestChallenge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Legnagyobb jelenlegi kihívás</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="Milyen nehézségekkel küzd jelenleg az online jelenléttel vagy marketinggel kapcsolatban?" 
                              className="border-white/20 bg-white/5 text-white min-h-[120px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormStep>

                <FormStep 
                  title="További információk a hatékonyabb segítségnyújtáshoz" 
                  description="Ezek az információk segítenek, hogy célzottabb tanácsokat adhassak."
                >
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="interestedServices"
                      render={() => (
                        <FormItem>
                          <div className="mb-2">
                            <FormLabel className="text-white">Milyen szolgáltatások érdeklik? (több is választható)</FormLabel>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {[
                              { id: "website", label: "Weboldal fejlesztés" },
                              { id: "strategy", label: "Marketing stratégia" },
                              { id: "ads", label: "Online hirdetések" },
                              { id: "video", label: "Videó marketing" },
                              { id: "seo", label: "SEO optimalizálás" },
                              { id: "notsure", label: "Még nem tudom pontosan" }
                            ].map((service) => (
                              <FormField
                                key={service.id}
                                control={form.control}
                                name="interestedServices"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={service.id}
                                      className="flex flex-row items-start space-x-3 space-y-0 border border-white/10 p-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(service.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, service.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== service.id
                                                  )
                                                )
                                          }}
                                          className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal text-white">
                                        {service.label}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="budgetRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white mb-6 block">
                            Tervezett költségvetési keret (opcionális)
                          </FormLabel>
                          <div className="space-y-4">
                            <div className="flex justify-between text-sm text-white/70">
                              <span>0 Ft</span>
                              <span>2,900,000 Ft</span>
                            </div>
                            <FormControl>
                              <Slider
                                min={0}
                                max={2900000}
                                step={100000}
                                value={field.value}
                                onValueChange={field.onChange}
                                className="w-full"
                              />
                            </FormControl>
                            <div className="text-center font-medium text-lg text-white">
                              {formatBudget(field.value[0])}
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="p-4 border border-blue-500/20 bg-blue-500/5 rounded-lg mt-8">
                      <p className="text-blue-300 text-sm">
                        24 órán belül személyre szabott válasszal keresem Önt a megadott email címen.
                      </p>
                    </div>
                  </div>
                </FormStep>
              </MultiStepForm>
            </Form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Consultation;
