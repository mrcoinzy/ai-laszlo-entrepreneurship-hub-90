
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Menu, AlertCircle, Loader2, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ConsultationsList from "@/components/admin/ConsultationsList";
import EmailList from "@/components/admin/EmailList";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("consultations");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const { user, loading, isAdmin, adminCheck } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAccess = async () => {
      const timeoutId = setTimeout(() => {
        console.log("Admin auth check timeout reached, redirecting to login");
        navigate("/login");
        toast.error("Authentication timeout. Please login again.");
      }, 5000);
      
      try {
        if (!loading) {
          if (!user) {
            navigate("/login");
            toast.error("Please login to access the admin panel");
            return;
          }
          
          // Check if user is admin, with retries
          let retries = 0;
          let isUserAdmin = false;
          
          while (retries < 3 && !isUserAdmin) {
            isUserAdmin = await adminCheck();
            
            if (!isUserAdmin) {
              console.log(`Admin check failed, retry ${retries + 1}/3`);
              // Short delay between retries
              await new Promise(resolve => setTimeout(resolve, 500));
              retries++;
            }
          }
          
          if (!isUserAdmin) {
            console.log("User is not an admin after retries, redirecting");
            navigate("/dashboard");
            toast.error("Unauthorized: Admin access required");
            return;
          }
          
          console.log("Admin access verified successfully");
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
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text">Admin Panel</h1>
          <p className="text-white/70">
            Kezelje a konzultációs kéréseket és email feliratkozókat
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
                Konzultációk
              </TabsTrigger>
              <TabsTrigger value="emails">
                <Mail className="h-4 w-4 mr-2" />
                Email Lista
              </TabsTrigger>
            </TabsList>
            <TabsContent value="consultations" className="p-2 md:p-4">
              <ConsultationsList />
            </TabsContent>
            <TabsContent value="emails" className="p-2 md:p-4">
              <EmailList />
            </TabsContent>
          </Tabs>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
