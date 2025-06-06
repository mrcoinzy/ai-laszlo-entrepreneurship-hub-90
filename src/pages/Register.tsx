
import React from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-10 sm:py-20">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 gradient-text">
            Sign Up to Work With Ai Laszlo
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base">
            Fill out the form below to start your journey with us. Tell us about your project
            and what services you're interested in.
          </p>
        </div>
        
        <RegistrationForm />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-white/60">
            Admin access: <Link to="/admin" className="text-sky-400 hover:underline">Go to Admin Panel</Link>
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
