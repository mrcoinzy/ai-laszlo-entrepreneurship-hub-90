
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ConsultationsList from "@/components/admin/ConsultationsList";
import DashboardSidebar from "@/components/admin/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";
import AdminOverview from "@/components/admin/AdminOverview";
import { toast } from "sonner";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isLoading, isAdmin, user } = useAuth();
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  // Set a timeout to show a message if loading takes too long
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setLoadingTimeout(true);
      }, 5000); // 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // If not authenticated as admin, redirect to login
  if (!isLoading && (!user || !isAdmin)) {
    toast.error("Admin access required");
    return <Navigate to="/admin/login" />;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
        <p className="text-muted-foreground">Loading dashboard...</p>
        {loadingTimeout && (
          <p className="text-muted-foreground mt-4 max-w-md text-center px-4">
            This is taking longer than expected. If the page doesn't load soon, 
            try refreshing the browser or clearing your cache.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex w-full bg-background">
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <main className={`flex-1 p-4 md:p-8 transition-all duration-300 w-full ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
        <Routes>
          <Route index element={<AdminOverview />} />
          <Route path="consultations" element={<ConsultationsList />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
