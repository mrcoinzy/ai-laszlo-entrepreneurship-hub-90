
import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDashboard from "@/components/admin/AdminDashboard";
import ClientsManagement from "@/components/admin/ClientsManagement";
import ProjectsManagement from "@/components/admin/ProjectsManagement";
import MessagingInterface from "@/components/admin/MessagingInterface";
import { Card } from "@/components/ui/card";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col space-y-4 mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text">Admin Panel</h1>
          <p className="text-white/70">
            Manage clients, projects, and track your performance
          </p>
        </div>

        <Card className="bg-accent/30 border-accent p-1 mb-8">
          <Tabs 
            defaultValue="dashboard" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard" className="p-4">
              <AdminDashboard />
            </TabsContent>
            <TabsContent value="clients" className="p-4">
              <ClientsManagement />
            </TabsContent>
            <TabsContent value="projects" className="p-4">
              <ProjectsManagement />
            </TabsContent>
            <TabsContent value="messages" className="p-4">
              <MessagingInterface />
            </TabsContent>
          </Tabs>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
