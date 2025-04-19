
import React from "react";
import { Routes, Route } from "react-router-dom";
import ConsultationsList from "@/components/admin/ConsultationsList";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";
import AdminDashboard from "@/components/admin/AdminDashboard";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const { user, isAdmin, isLoading } = useAuth();

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
          <Route index element={<AdminDashboard />} />
          <Route path="consultations" element={<ConsultationsList />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
