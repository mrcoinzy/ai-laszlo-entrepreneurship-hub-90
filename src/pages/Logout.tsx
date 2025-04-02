
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const Logout = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  useEffect(() => {
    const performLogout = async () => {
      try {
        // Force clear all Supabase auth sessions
        const { error } = await supabase.auth.signOut({ scope: 'global' });
        if (error) throw error;
        
        // Execute the auth context signOut which clears local state
        await signOut();
        
        // Show success toast
        toast.success("Logged out successfully!");
        
        // Redirect to login page
        navigate("/login", { replace: true });
      } catch (error) {
        console.error("Error logging out:", error);
        toast.error("Error logging out. Please try again.");
        
        // Even if there's an error, still redirect to login
        navigate("/login", { replace: true });
      }
    };
    
    performLogout();
    
    // This cleanup function ensures we don't have any lingering effects
    return () => {
      // Additional cleanup if needed
    };
  }, [navigate, signOut]);
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 gradient-text">Logging you out...</h1>
        <p className="text-white/70">Please wait while we sign you out of your account.</p>
      </div>
    </div>
  );
};

export default Logout;
