
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
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, ShieldCheck } from "lucide-react";

// Form validation schema
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, user, isAdmin } = useAuth();
  
  // Redirect user if already logged in
  useEffect(() => {
    if (user) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate, isAdmin]);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const onSubmit = async (values: FormData) => {
    setIsLoading(true);
    
    try {
      console.log("Attempting login with:", values.email);
      await signIn(values.email, values.password);
      
      // Add a slight delay to ensure the auth state is updated
      setTimeout(() => {
        if (isAdmin) {
          toast.success("Admin login successful!");
          navigate("/admin");
        } else {
          toast.success("Login successful!");
          navigate("/dashboard");
        }
      }, 500);
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Check for common errors and provide helpful messages
      if (error.message?.includes("Invalid login") || error.message?.includes("Invalid email or password")) {
        toast.error("Invalid email or password. Please try again.");
      } else if (error.message?.includes("Email not confirmed")) {
        toast.error("Your email has not been confirmed. Please check your inbox.");
      } else {
        toast.error(error.message || "Login failed. Please check your credentials.");
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
              <ShieldCheck className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 gradient-text">
              Admin Login
            </h1>
            <p className="text-white/70">
              Enter your admin credentials to access the dashboard
            </p>
          </div>
          
          <div className="bg-accent/30 rounded-lg border border-white/10 p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Email</FormLabel>
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
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Logging in...
                      </>
                    ) : "Log In as Admin"}
                  </Button>
                </div>
              </form>
            </Form>
            
            <div className="mt-4 text-center text-sm text-white/50">
              <p>
                Need an admin account?{" "}
                <Link 
                  to="/admin-register" 
                  className="text-sky-400 hover:underline"
                >
                  Register Here
                </Link>
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-white/50">
            <p>
              For demonstration purposes:
            </p>
            <p className="mt-1">
              Admin: admin@example.com / password123
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
