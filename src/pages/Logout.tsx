
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const Logout = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [isTimedOut, setIsTimedOut] = useState(false);
  
  useEffect(() => {
    const performLogout = async () => {
      try {
        // Start a timeout fallback to ensure we don't get stuck
        const timeoutId = setTimeout(() => {
          console.log("Logout timeout reached, forcing redirect");
          setIsTimedOut(true);
          navigate("/login", { replace: true });
        }, 3000);
        
        // First clear local auth state to prevent any redirects during process
        await signOut();
        
        // Force clear all Supabase auth sessions
        const { error } = await supabase.auth.signOut({ scope: 'global' });
        if (error) throw error;
        
        // Show success toast
        toast.success("Logged out successfully!");
        
        // Clear the timeout since we completed successfully
        clearTimeout(timeoutId);
        
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
  }, [navigate, signOut]);
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 gradient-text">Logging you out...</h1>
        <p className="text-white/70">Please wait while we sign you out of your account.</p>
        {isTimedOut && (
          <p className="mt-4 text-amber-400">
            Logout is taking longer than expected. Redirecting you anyway...
          </p>
        )}
      </div>
    </div>
  );
};

export default Logout;
