
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
import { useAuth } from "@/contexts/AuthContext";

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

type FormData = z.infer<typeof formSchema>;

const AdminRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { adminCheck } = useAuth();
  
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const result = await testConnection();
        if (!result.success) {
          setConnectionError('Unable to connect to the server. Please try again later.');
          toast.error('Server connection issue detected');
        } else {
          setConnectionError(null);
          toast.success('Connected to Supabase successfully');
        }
      } catch (error) {
        console.error("Connection test error:", error);
        setConnectionError('Error testing connection. Please try again later.');
        toast.error('Connection test failed');
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
    mode: "onBlur",
  });
  
  const onSubmit = async (values: FormData) => {
    if (isLoading) return; // Prevent multiple submissions
    
    setIsLoading(true);
    
    try {
      console.log("Starting admin registration with:", values.email);
      
      // Sign up the admin user with the role metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
            role: 'admin',
          },
        },
      });
      
      if (authError) throw authError;
      
      if (!authData.user) {
        throw new Error('User registration failed - no user returned');
      }
      
      console.log("Admin user created:", authData.user.id);
      
      // Create or update the admin user record directly
      const { error: userError } = await supabase
        .from('users')
        .upsert({
          id: authData.user.id,
          email: values.email,
          full_name: values.fullName,
          role: 'admin',
          status: 'approved'
        }, { onConflict: 'id' });
      
      if (userError) {
        console.error("Error ensuring admin record:", userError);
        throw new Error(userError.message || "Failed to create admin record");
      }
      
      toast.success("Admin registration successful! Signing in...");
      
      // Sign in with the newly created admin account
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (signInError) throw signInError;
      
      // Reset form after successful registration
      form.reset();
      
      // Redirect to admin page
      toast.success("Registration successful! Redirecting to admin panel...");
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
      
    } catch (error: any) {
      console.error("Registration error:", error);
      
      if (error.message?.includes('already registered')) {
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
