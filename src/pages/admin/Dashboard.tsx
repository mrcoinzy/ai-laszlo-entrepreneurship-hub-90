
import React from "react";
import { Routes, Route } from "react-router-dom";
import ConsultationsList from "@/components/admin/ConsultationsList";
import DashboardSidebar from "@/components/DashboardSidebar";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <main className={`flex-1 p-8 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
        <Routes>
          <Route index element={<ConsultationsList />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
