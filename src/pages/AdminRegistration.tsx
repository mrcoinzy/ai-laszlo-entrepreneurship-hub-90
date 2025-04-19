
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import AdminRegistrationForm from "@/components/admin/AdminRegistrationForm";
import Footer from "@/components/Footer";

const AdminRegistration = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-10 sm:py-20">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 gradient-text">
            Admin Registration
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base">
            Create an administrative account for managing the platform.
          </p>
        </div>
        
        <AdminRegistrationForm />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-white/60">
            Already have an account? <Link to="/admin" className="text-sky-400 hover:underline">Go to Admin Login</Link>
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminRegistration;
