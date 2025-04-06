
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { Loader2, Shield, Lock } from "lucide-react";

// Environment variable for admin code - in a real app this would be from environment variables
const ADMIN_CODE = "admin123"; // This should be properly secured in a real application

// Form validation schema
const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  adminCode: z.string().min(1, {
    message: "Admin code is required.",
  }).refine(value => value === ADMIN_CODE, {
    message: "Invalid admin code.",
  }),
});

type FormData = z.infer<typeof formSchema>;

const AdminRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      adminCode: "",  // Fixed: Now correctly initialized as empty string
    },
  });
  
  const onSubmit = async (values: FormData) => {
    setIsLoading(true);
    
    try {
      // First, register the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
            role: 'admin', // Set role in user_metadata
          },
        },
      });
      
      if (authError) throw authError;
      
      if (authData.user) {
        // Then create a record in the users table with admin role
        const { error: userError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: values.email,
            full_name: values.fullName,
            role: 'admin',
            status: 'approved', // Admins are auto-approved
          });
        
        if (userError) throw userError;
        
        toast.success("Admin registration successful!");
        navigate("/login");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-10 sm:py-20">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 gradient-text">
              Admin Registration
            </h1>
            <p className="text-white/70">
              Register as an administrator with the correct access code
            </p>
          </div>
          
          <div className="bg-accent/30 rounded-lg border border-white/10 p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          className="bg-background/50" 
                          {...field} 
                          disabled={isLoading}
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
                      <FormLabel className="text-white/70">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="admin@example.com" 
                          className="bg-background/50" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
                          className="bg-background/50" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="adminCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1 text-white/70">
                        <Lock className="h-3 w-3" />
                        Admin Access Code
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Enter admin code" 
                          className="bg-background/50" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Registering...
                      </>
                    ) : "Register as Admin"}
                  </Button>
                </div>
              </form>
            </Form>
            
            <div className="mt-4 text-center text-sm text-white/50">
              <p>
                Already have an admin account?{" "}
                <Link 
                  to="/login" 
                  className="text-sky-400 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-white/50">
            <p>
              For demonstration purposes, use admin code: admin123
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminRegister;
