
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

type Step = "email" | "name" | "password" | "dob";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    dob: ""
  });
  const [currentStep, setCurrentStep] = useState<Step>("email");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === "email" && formData.email) {
      setCurrentStep("name");
    } else if (currentStep === "name" && formData.name) {
      setCurrentStep("password");
    } else if (currentStep === "password" && formData.password) {
      setCurrentStep("dob");
    } else if (currentStep === "dob" && formData.dob) {
      // Submit form
      console.log("Form submitted:", formData);
      // Here you would typically send the data to your backend
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-accent/30 rounded-lg border border-white/10">
      <h2 className="text-2xl font-bold mb-6 gradient-text text-center">Create Account</h2>
      
      <form onSubmit={handleNext} className="space-y-4">
        <div className="relative h-[70px]">
          {currentStep === "email" && (
            <div className="absolute inset-0 animate-form-field-transition">
              <label htmlFor="email" className="block text-sm text-white/70 mb-2">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full bg-secondary/50"
              />
            </div>
          )}
          
          {currentStep === "name" && (
            <div className="absolute inset-0 animate-form-field-transition">
              <label htmlFor="name" className="block text-sm text-white/70 mb-2">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                autoComplete="name"
                className="w-full bg-secondary/50"
              />
            </div>
          )}
          
          {currentStep === "password" && (
            <div className="absolute inset-0 animate-form-field-transition">
              <label htmlFor="password" className="block text-sm text-white/70 mb-2">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                autoComplete="new-password"
                className="w-full bg-secondary/50"
              />
            </div>
          )}
          
          {currentStep === "dob" && (
            <div className="absolute inset-0 animate-form-field-transition">
              <label htmlFor="dob" className="block text-sm text-white/70 mb-2">
                Date of Birth
              </label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full bg-secondary/50"
              />
            </div>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-white text-black hover:bg-white/90 group"
        >
          {currentStep === "dob" ? "Create Account" : "Continue"}
          <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>
      
      <p className="mt-4 text-center text-white/50 text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-white hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
};

export default RegistrationForm;
