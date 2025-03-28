
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
import { ArrowRight, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
  });
  
  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      console.log("Form submitted:", values);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Registration successful! We'll get back to you soon.");
      form.reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
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
  
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-accent/30 rounded-lg border border-white/10">
      <h2 className="text-2xl font-bold mb-6 gradient-text text-center">Create Account</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
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

          {/* Full Name Field */}
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

          {/* Password Field */}
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

          {/* Confirm Password Field */}
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

          {/* Project Description Field */}
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

          {/* Service Options Checkboxes */}
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
                <div className="space-y-3">
                  {serviceOptions.map((option) => (
                    <FormField
                      key={option.id}
                      control={form.control}
                      name="serviceOptions"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={option.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
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
                            <FormLabel className="text-white/70 font-normal">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />

          {/* Project Details Field */}
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

          {/* Animated Submit Button */}
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className={cn(
              "w-full group relative overflow-hidden transition-all duration-300",
              isSubmitting 
                ? "bg-sky-700" 
                : "bg-sky-600 hover:bg-sky-500"
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
                  <Send size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              )}
            </span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
        </form>
      </Form>
      
      <p className="mt-6 text-center text-white/50 text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-white hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
};

export default RegistrationForm;
