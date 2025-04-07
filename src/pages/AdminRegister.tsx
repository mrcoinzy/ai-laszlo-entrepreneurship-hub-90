
import React, { useState, useEffect } from "react";
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
import { supabase, testConnection } from "@/lib/supabase";
import { Loader2, Shield, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Form validation schema without admin code
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
});

// Define the type using the schema
type FormData = z.infer<typeof formSchema>;

const AdminRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [registrationTimeout, setRegistrationTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  
  // Test connection to Supabase on component mount
  useEffect(() => {
    const checkConnection = async () => {
      const result = await testConnection();
      if (!result.success) {
        setConnectionError('Unable to connect to the server. Please try again later.');
        toast.error('Server connection issue detected');
      } else {
        setConnectionError(null);
        toast.success('Connected to Supabase successfully');
      }
    };
    
    checkConnection();
  }, []);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    // Setting mode to onChange to validate as user types
    mode: "onBlur",
  });
  
  const onSubmit = async (values: FormData) => {
    setIsLoading(true);
    
    // Clear any previous timeout
    if (registrationTimeout) {
      clearTimeout(registrationTimeout);
    }
    
    // Set a timeout to prevent infinite loading state
    const timeout = setTimeout(() => {
      setIsLoading(false);
      toast.error("Registration request timed out. Please try again.");
    }, 15000); // 15 seconds timeout
    
    setRegistrationTimeout(timeout);
    
    try {
      console.log("Starting admin registration with:", values.email);
      
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
      
      if (!authData.user) {
        throw new Error('User registration failed - no user returned');
      }
      
      console.log("Admin user created:", authData.user.id);
      
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
      
      // Clear the timeout since registration was successful
      clearTimeout(timeout);
      setRegistrationTimeout(null);
      
      toast.success("Admin registration successful! Signing in...");
      
      // Immediately sign in to refresh the session with the new role
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (signInError) throw signInError;
      
      console.log("Admin registration complete, redirecting to admin dashboard");
      
      // Navigate to admin dashboard after successful registration and sign in
      navigate("/admin");
      
    } catch (error: any) {
      console.error("Registration error:", error);
      
      // Clear the timeout
      clearTimeout(timeout);
      setRegistrationTimeout(null);
      
      // Provide detailed error feedback
      if (error.message.includes('timeout')) {
        toast.error("Connection to server timed out. Please check your internet connection and try again.");
      } else if (error.message.includes('already registered')) {
        toast.error("Email is already registered. Try logging in instead.");
      } else {
        toast.error(error.message || "Registration failed. Please try again.");
      }
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
              Register as an administrator to manage the platform
            </p>
          </div>
          
          {connectionError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription>
                {connectionError}
              </AlertDescription>
            </Alert>
          )}
          
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
                          disabled={isLoading || !!connectionError}
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
                          disabled={isLoading || !!connectionError}
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
                          disabled={isLoading || !!connectionError}
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
                    disabled={isLoading || !!connectionError}
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
              Administrators have full access to manage users, content and settings.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminRegister;
