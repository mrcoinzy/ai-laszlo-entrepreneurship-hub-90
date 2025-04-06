
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDashboard from "@/components/admin/AdminDashboard";
import ClientsManagement from "@/components/admin/ClientsManagement";
import ProjectsManagement from "@/components/admin/ProjectsManagement";
import MessagingInterface from "@/components/admin/MessagingInterface";
import { Card } from "@/components/ui/card";
import { Menu, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const { user, loading, isAdmin, adminCheck } = useAuth();
  const navigate = useNavigate();

  // Check authentication and admin status on mount
  useEffect(() => {
    const checkAdminAccess = async () => {
      // Start a timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        console.log("Admin auth check timeout reached, redirecting to login");
        navigate("/login");
        toast.error("Authentication timeout. Please login again.");
      }, 5000);
      
      try {
        if (!loading) {
          // If not authenticated at all
          if (!user) {
            navigate("/login");
            toast.error("Please login to access the admin panel");
            return;
          }
          
          // Verify admin status with a fresh check
          const isUserAdmin = await adminCheck();
          
          if (!isUserAdmin) {
            navigate("/dashboard");
            toast.error("Unauthorized: Admin access required");
            return;
          }
          
          // User is authenticated and is an admin
          setIsAuthChecking(false);
        }
      } catch (error) {
        console.error("Error checking admin access:", error);
        navigate("/login");
        toast.error("Authentication error. Please login again.");
      } finally {
        clearTimeout(timeoutId);
      }
    };
    
    checkAdminAccess();
  }, [user, loading, isAdmin, navigate, adminCheck]);
  
  // If still loading or checking auth, show loading state
  if (loading || isAuthChecking) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-xl font-medium">Verifying admin access...</h2>
        <p className="text-sm text-white/70 mt-2">Please wait while we authenticate your session</p>
      </div>
    );
  }
  
  // If not admin (this shouldn't happen due to the redirect above, but just as a fallback)
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-medium">Unauthorized Access</h2>
        <p className="text-sm text-white/70 mt-2 mb-4">You don't have permission to access the admin panel</p>
        <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
      </div>
    );
  }

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
