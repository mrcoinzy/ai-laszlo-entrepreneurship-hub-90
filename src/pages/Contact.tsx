
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
    <div className="min-h-screen bg-[#070714] relative overflow-hidden">
      <Navigation />
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glowing orbs */}
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-purple-600/20 filter blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-blue-600/20 filter blur-[100px]"></div>
        
        {/* Animated lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <svg width="100%" height="100%" className="opacity-20">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8A2BE2" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#4361EE" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path d="M0,100 Q300,50 600,100 T1200,100" stroke="url(#gradient)" strokeWidth="2" fill="none" className="animate-pulse-slow" />
            <path d="M0,200 Q300,150 600,200 T1200,200" stroke="url(#gradient)" strokeWidth="2" fill="none" className="animate-pulse-slow animation-delay-1000" />
            <path d="M0,300 Q300,250 600,300 T1200,300" stroke="url(#gradient)" strokeWidth="2" fill="none" className="animate-pulse-slow animation-delay-2000" />
          </svg>
        </div>
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 py-28 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-3 px-4 py-1 rounded-full bg-purple-500/10 backdrop-blur-sm border border-purple-500/20">
              <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Kapcsolatfelvétel</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
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
              <div className="backdrop-blur-lg bg-black/40 border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(138,43,226,0.15)] p-8">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Küldjön üzenetet</h2>
                
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
                                className="bg-white/5 border-white/10 focus:border-purple-500/50 text-white hover:border-purple-500/30 transition-colors" 
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
                                className="bg-white/5 border-white/10 focus:border-purple-500/50 text-white hover:border-purple-500/30 transition-colors" 
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
                              className="bg-white/5 border-white/10 focus:border-purple-500/50 text-white hover:border-purple-500/30 transition-colors" 
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
                              className="bg-white/5 border-white/10 focus:border-purple-500/50 text-white hover:border-purple-500/30 transition-colors min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(138,43,226,0.3)] hover:shadow-[0_0_25px_rgba(138,43,226,0.5)] hover:-translate-y-1"
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
              <div className="backdrop-blur-lg bg-black/40 border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(138,43,226,0.15)] p-8 mb-8">
                <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Elérhetőségeink</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 mr-4 mt-1 border border-purple-500/30">
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
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 mr-4 mt-1 border border-purple-500/30">
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
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 mr-4 mt-1 border border-purple-500/30">
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
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 mr-4 mt-1 border border-purple-500/30">
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
              
              <div className="backdrop-blur-lg bg-black/40 border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(138,43,226,0.15)] p-8">
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Kövessen minket</h3>
                <p className="text-white/70 mb-6">Kövessen minket a közösségi médiában a legfrissebb hírekért és ajánlatokért!</p>
                
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center hover:bg-purple-500/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  
                  <a href="#" className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center hover:bg-purple-500/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  
                  <a href="#" className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center hover:bg-purple-500/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                  
                  <a href="#" className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center hover:bg-purple-500/40 transition-colors">
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
          
          {/* Map Section with 3D elements */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="backdrop-blur-lg bg-black/40 border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(138,43,226,0.15)] p-4 overflow-hidden"
          >
            <div className="aspect-[16/7] w-full rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center relative">
              {/* 3D geometrical elements */}
              <div className="absolute w-32 h-32 top-[20%] left-[25%] opacity-40">
                <img src="/lovable-uploads/ec073a77-0a74-406d-99bd-335e968656c5.png" alt="3D Element" className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(138,43,226,0.6)]" />
              </div>
              <div className="absolute w-24 h-24 bottom-[15%] right-[20%] opacity-30">
                <img src="/lovable-uploads/9b6bd72b-0e78-47cf-a829-9a14940afd4e.png" alt="3D Element" className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(67,97,238,0.6)]" />
              </div>
              
              <div className="text-center z-10 relative p-8 backdrop-blur-md bg-black/30 rounded-2xl border border-white/10 max-w-lg">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/40 to-blue-500/40 mx-auto flex items-center justify-center mb-4 border border-white/20">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Térképi helyszín</h3>
                <p className="text-white/70 max-w-md mx-auto mb-6">
                  Központi irodánk könnyen megközelíthető a város szívében. Látogasson el hozzánk személyesen!
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300 shadow-[0_0_15px_rgba(138,43,226,0.3)] hover:shadow-[0_0_25px_rgba(138,43,226,0.5)] hover:-translate-y-1">
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
