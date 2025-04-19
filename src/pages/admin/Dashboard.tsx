
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ConsultationsList from "@/components/admin/ConsultationsList";
import DashboardSidebar from "@/components/admin/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";
import AdminOverview from "@/components/admin/AdminOverview";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isLoading } = useAuth();

  // If still loading, show a loading spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <main className={`flex-1 p-8 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
        <Routes>
          <Route index element={<AdminOverview />} />
          <Route path="consultations" element={<ConsultationsList />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
