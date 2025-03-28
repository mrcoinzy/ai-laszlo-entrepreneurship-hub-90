
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">
            Join Ai Laszlo's Entrepreneurial Community
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Create an account to access exclusive resources, track your progress,
            and get personalized guidance for your entrepreneurial journey.
          </p>
        </div>
        
        <RegistrationForm />
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
