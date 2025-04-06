
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";

const RejectedAccount = () => {
  const { userData, signOut } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="max-w-md w-full bg-accent/30 border-accent">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-red-500">Account Application Rejected</CardTitle>
            <CardDescription>Your account request was not approved</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4 text-center">
            <div className="flex justify-center my-6">
              <XCircle className="h-12 w-12 text-red-500" />
            </div>
            
            <p className="text-white/80">
              Hello <span className="font-semibold">{userData?.full_name}</span>, unfortunately,
              your account application has been rejected by an administrator.
            </p>
            
            <p className="text-white/80">
              If you believe this is an error, please contact our support team for assistance.
              You may also try registering again with additional information.
            </p>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2">
            <Button 
              variant="default" 
              className="w-full" 
              onClick={() => navigate('/')}
            >
              Return to Homepage
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={signOut}
            >
              Sign Out
            </Button>
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default RejectedAccount;
