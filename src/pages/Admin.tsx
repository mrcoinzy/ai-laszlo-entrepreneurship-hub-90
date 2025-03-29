
import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDashboard from "@/components/admin/AdminDashboard";
import ClientsManagement from "@/components/admin/ClientsManagement";
import ProjectsManagement from "@/components/admin/ProjectsManagement";
import MessagingInterface from "@/components/admin/MessagingInterface";
import { Card } from "@/components/ui/card";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="md:hidden bg-background/80 backdrop-blur-md py-4 px-4 flex items-center justify-between border-b border-white/10 sticky top-0 z-50">
        <h2 className="text-xl font-bold gradient-text">Admin Panel</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu />
        </Button>
      </div>
      
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col space-y-4 mb-8 hidden md:flex">
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
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard" className="p-2 md:p-4">
              <AdminDashboard />
            </TabsContent>
            <TabsContent value="clients" className="p-2 md:p-4">
              <ClientsManagement />
            </TabsContent>
            <TabsContent value="projects" className="p-2 md:p-4">
              <ProjectsManagement />
            </TabsContent>
            <TabsContent value="messages" className="p-2 md:p-4">
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
