
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Send, Mail, Phone, MapPin, Clock } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Kérjük, adja meg a nevét"
  }),
  email: z.string().email({
    message: "Érvényes email címet adjon meg"
  }),
  subject: z.string().min(5, {
    message: "Kérjük, adjon meg egy tárgyat"
  }),
  message: z.string().min(10, {
    message: "Az üzenetnek legalább 10 karaktert kell tartalmaznia"
  })
});

const Contact = () => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Köszönjük megkeresését!",
      description: "Hamarosan felvesszük Önnel a kapcsolatot.",
    });
    form.reset();
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navigation />
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-3 px-4 py-1 rounded-full bg-purple-500/10 backdrop-blur-sm border border-purple-500/20">
              <span className="text-sm font-medium text-purple-300">Kapcsolatfelvétel</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Vegye fel velünk a kapcsolatot!
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Küldje el kérdéseit, és mi 48 órán belül válaszolunk. Célunk, hogy minden ügyfelünk számára személyre szabott megoldásokat nyújtsunk.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="glass-card p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6 text-white">Küldjön üzenetet</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80">Név</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Az Ön neve" 
                                className="bg-white/5 border-white/10 focus:border-purple-500/50 text-white" 
                                {...field} 
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
                            <FormLabel className="text-white/80">Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="email@example.com" 
                                className="bg-white/5 border-white/10 focus:border-purple-500/50 text-white" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/80">Tárgy</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Miben segíthetünk?" 
                              className="bg-white/5 border-white/10 focus:border-purple-500/50 text-white" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/80">Üzenet</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Részletezze kérését vagy kérdését..." 
                              className="bg-white/5 border-white/10 focus:border-purple-500/50 text-white min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-xl transition-all hover:shadow-[0_10px_25px_-5px_rgba(138,43,226,0.4)]"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Üzenet küldése
                    </Button>
                  </form>
                </Form>
              </div>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="glass-card p-8 rounded-2xl mb-8">
                <h3 className="text-xl font-bold mb-6 text-white">Elérhetőségeink</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 mr-4 mt-1">
                      <Mail className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white/80 font-medium">Email</p>
                      <a href="mailto:info@ailaszlo.hu" className="text-white hover:text-purple-300 transition-colors">
                        info@ailaszlo.hu
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 mr-4 mt-1">
                      <Phone className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white/80 font-medium">Telefon</p>
                      <a href="tel:+36201234567" className="text-white hover:text-purple-300 transition-colors">
                        +36 20 123 4567
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 mr-4 mt-1">
                      <MapPin className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white/80 font-medium">Cím</p>
                      <p className="text-white">
                        1121 Budapest, <br />
                        Alkotás utca 37-41.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 mr-4 mt-1">
                      <Clock className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white/80 font-medium">Nyitvatartás</p>
                      <p className="text-white">
                        Hétfő - Péntek: 9:00 - 17:00 <br />
                        Hétvégén: Zárva
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-white">Kövessen minket</h3>
                <p className="text-white/70 mb-6">Kövessen minket a közösségi médiában a legfrissebb hírekért és ajánlatokért!</p>
                
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center hover:bg-purple-500/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  
                  <a href="#" className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center hover:bg-purple-500/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  
                  <a href="#" className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center hover:bg-purple-500/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                  
                  <a href="#" className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center hover:bg-purple-500/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Map */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-card p-4 rounded-2xl overflow-hidden"
          >
            <div className="aspect-[16/7] w-full rounded-xl overflow-hidden bg-black/30 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 mx-auto flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Térképi helyszín</h3>
                <p className="text-white/70 max-w-md mx-auto">
                  Az interaktív térkép betöltéséhez kattintson a gombra
                </p>
                <Button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">
                  Térkép betöltése
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
