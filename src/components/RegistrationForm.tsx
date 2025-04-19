
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { ArrowRight, ArrowLeft, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

// Create a schema for form validation
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
  projectDescription: z.string().min(10, { message: "Please provide a brief description of your project." }),
  serviceOptions: z.array(z.string()).refine(value => value.length > 0, {
    message: "Please select at least one service.",
  }),
  projectDetails: z.string().min(20, { message: "Please provide more details about your project." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      projectDescription: "",
      serviceOptions: [],
      projectDetails: "",
    },
    mode: "onChange",
  });
  
  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Register with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
          },
        },
      });
      
      if (authError) throw authError;
      
      // Create a new consultation entry instead of project
      const { error: consultationError } = await supabase
        .from('consultations')
        .insert({
          name: values.fullName,
          email: values.email,
          main_goal: values.projectDescription,
          business_details: values.projectDetails,
          business_type: "New Registration",
          biggest_challenge: "To be determined",
          online_presence: "To be determined",
          interested_services: values.serviceOptions,
          budget_range: 0
        });
      
      if (consultationError) throw consultationError;
      
      toast.success("Registration successful! We'll get back to you soon.");
      
      // Reset form and redirect
      form.reset();
      setCurrentStep(0);
      
      // Log the user out after registration since we want admin to approve first
      await supabase.auth.signOut();
      setTimeout(() => navigate('/'), 2000);
      
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const serviceOptions = [
    { id: "website", label: "Website development" },
    { id: "webapp", label: "Web application development" },
    { id: "marketing", label: "Marketing and sales" },
    { id: "business", label: "Building a business from scratch" },
    { id: "self-development", label: "Self-development" },
  ];

  const steps = [
    { name: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
    { name: "fullName", label: "Full Name", type: "text", placeholder: "John Doe" },
    { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
    { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "••••••••" },
    { name: "projectDescription", label: "Project Description", type: "textarea", placeholder: "Briefly describe the project you want me to create..." },
    { name: "serviceOptions", label: "Select Services", type: "checkboxes" },
    { name: "projectDetails", label: "Project Details", type: "textarea", placeholder: "Please provide more details about your project..." },
  ];

  const nextStep = async () => {
    const currentFieldName = steps[currentStep].name as keyof FormData;
    
    // Validate only the current field
    const result = await form.trigger(currentFieldName);
    
    if (result) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-accent/30 rounded-lg border border-white/10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 gradient-text text-center">Create Account</h2>
      
      {/* Progress indicator */}
      <div className="w-full bg-secondary/50 h-1 mb-4 sm:mb-6 rounded-full overflow-hidden">
        <div 
          className="bg-sky-600 h-full transition-all duration-300 ease-in-out"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="email-step"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="min-h-[120px] sm:min-h-[140px] flex flex-col justify-center"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          className="bg-secondary/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}
            
            {currentStep === 1 && (
              <motion.div
                key="fullName-step"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="min-h-[120px] sm:min-h-[140px] flex flex-col justify-center"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="John Doe"
                          className="bg-secondary/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}
            
            {currentStep === 2 && (
              <motion.div
                key="password-step"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="min-h-[120px] sm:min-h-[140px] flex flex-col justify-center"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="bg-secondary/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}
            
            {currentStep === 3 && (
              <motion.div
                key="confirmPassword-step"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="min-h-[120px] sm:min-h-[140px] flex flex-col justify-center"
              >
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="bg-secondary/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}
            
            {currentStep === 4 && (
              <motion.div
                key="projectDescription-step"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="min-h-[150px] sm:min-h-[180px] flex flex-col justify-center"
              >
                <FormField
                  control={form.control}
                  name="projectDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Project Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Briefly describe the project you want me to create..."
                          className="bg-secondary/50 min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}
            
            {currentStep === 5 && (
              <motion.div
                key="serviceOptions-step"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="min-h-[200px] sm:min-h-[240px]"
              >
                <FormField
                  control={form.control}
                  name="serviceOptions"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-white/70">Select Services</FormLabel>
                        <FormDescription className="text-white/50 text-xs">
                          Choose the services you're interested in
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                        {serviceOptions.map((option) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name="serviceOptions"
                            render={({ field }) => {
                              return (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ 
                                    duration: 0.3,
                                    delay: serviceOptions.indexOf(option) * 0.1 
                                  }}
                                >
                                  <FormItem
                                    key={option.id}
                                    className="flex flex-row items-start space-x-3 space-y-0 p-3 bg-secondary/20 rounded-md hover:bg-secondary/30 transition-all"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, option.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== option.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-white/70 font-normal text-sm sm:text-base">
                                      {option.label}
                                    </FormLabel>
                                  </FormItem>
                                </motion.div>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage className="mt-2" />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}
            
            {currentStep === 6 && (
              <motion.div
                key="projectDetails-step"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="min-h-[180px] sm:min-h-[200px] flex flex-col justify-center"
              >
                <FormField
                  control={form.control}
                  name="projectDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Project Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide more details about your project..."
                          className="bg-secondary/50 min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-6 sm:mt-8">
            {!isFirstStep && (
              <Button 
                type="button" 
                variant="outline"
                onClick={prevStep}
                className="flex items-center gap-1 sm:gap-2 bg-transparent border-sky-600/50 text-sky-400 hover:text-sky-100 hover:bg-sky-700/20 px-3 sm:px-4 py-1.5 sm:py-2 text-sm"
              >
                <ArrowLeft size={14} className="sm:size-16" />
                Back
              </Button>
            )}
            
            {!isLastStep ? (
              <Button 
                type="button" 
                onClick={nextStep}
                className={cn(
                  "ml-auto group relative overflow-hidden transition-all duration-300",
                  "bg-sky-600 hover:bg-sky-500 px-3 sm:px-4 py-1.5 sm:py-2 text-sm"
                )}
              >
                <span className="relative z-10 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  Next
                  <ArrowRight size={14} className="ml-1 sm:ml-2 sm:size-16 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className={cn(
                  "ml-auto group relative overflow-hidden transition-all duration-300",
                  isSubmitting 
                    ? "bg-sky-700" 
                    : "bg-sky-600 hover:bg-sky-500 px-3 sm:px-4 py-1.5 sm:py-2 text-sm"
                )}
              >
                <span className="relative z-10 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  {isSubmitting ? (
                    <span className="flex items-center">
                      Processing
                      <span className="ml-1 animate-pulse">...</span>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Sign Up
                      <Send size={14} className="ml-1 sm:ml-2 sm:size-16 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  )}
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            )}
          </div>
        </form>
      </Form>
      
      <p className="mt-5 sm:mt-6 text-center text-white/50 text-xs sm:text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-white hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
};

export default RegistrationForm;
