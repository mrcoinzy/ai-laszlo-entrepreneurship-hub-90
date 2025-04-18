
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Menu, AlertCircle, Loader2, FileText, MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ConsultationsList from "@/components/admin/ConsultationsList";
import PdfDownloadsList from "@/components/admin/PdfDownloadsList";
import { supabase } from "@/lib/supabase";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("consultations");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const { user, loading, isAdmin, adminCheck, userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        if (loading) return;
        
        if (!user) {
          console.log("No user found, redirecting to login");
          navigate("/login");
          toast.error("Please login to access the admin panel");
          return;
        }
        
        // Check if we already have userData and it indicates admin status
        if (userData?.role === 'admin' && userData?.status === 'approved') {
          console.log("Admin access confirmed via userData");
          setIsAuthChecking(false);
          return;
        }
        
        // Direct database check for admin status
        const { data, error } = await supabase
          .from('users')
          .select('role, status')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error("Error checking admin status:", error);
          navigate("/dashboard");
          toast.error("Error verifying admin access");
          return;
        }
        
        if (data?.role === 'admin' && data?.status === 'approved') {
          console.log("Admin access verified via direct DB check");
          setIsAuthChecking(false);
          return;
        }
        
        // Final check using adminCheck helper
        const isUserAdmin = await adminCheck();
        if (isUserAdmin) {
          console.log("Admin access verified via adminCheck");
          setIsAuthChecking(false);
          return;
        }
        
        console.log("User is not an admin, redirecting");
        navigate("/dashboard");
        toast.error("Unauthorized: Admin access required");
        
      } catch (error) {
        console.error("Error checking admin access:", error);
        navigate("/login");
        toast.error("Authentication error. Please login again.");
      }
    };
    
    checkAdminAccess();
  }, [user, loading, navigate, adminCheck, userData]);
  
  if (loading || isAuthChecking) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-xl font-medium">Verifying admin access...</h2>
        <p className="text-sm text-white/70 mt-2">Please wait while we authenticate your session</p>
      </div>
    );
  }
  
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
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text">Admin Dashboard</h1>
          <p className="text-white/70">
            Manage consultation requests and PDF downloads in one place
          </p>
        </div>

        <Card className="bg-accent/30 border-accent p-1 mb-8">
          <Tabs 
            defaultValue="consultations" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="consultations">
                <MessageSquare className="h-4 w-4 mr-2" />
                Consultations
              </TabsTrigger>
              <TabsTrigger value="pdf-downloads">
                <FileText className="h-4 w-4 mr-2" />
                PDF Downloads
              </TabsTrigger>
            </TabsList>
            <TabsContent value="consultations" className="p-2 md:p-4">
              <ConsultationsList />
            </TabsContent>
            <TabsContent value="pdf-downloads" className="p-2 md:p-4">
              <PdfDownloadsList />
            </TabsContent>
          </Tabs>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
