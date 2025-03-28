
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Login = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <div className="bg-accent/30 rounded-lg border border-white/10 p-8">
            <h1 className="text-2xl font-bold mb-6 gradient-text text-center">Welcome Back</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm text-white/70 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="bg-secondary/50"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm text-white/70 mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="bg-secondary/50"
                />
              </div>
              
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-white/70 hover:text-white">
                  Forgot password?
                </Link>
              </div>
              
              <Button type="submit" className="w-full bg-white text-black hover:bg-white/90">
                Log in
              </Button>
            </form>
            
            <p className="mt-6 text-center text-white/50 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-white hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
