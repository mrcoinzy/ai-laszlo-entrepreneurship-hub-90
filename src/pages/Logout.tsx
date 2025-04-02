
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Logout = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  useEffect(() => {
    const performLogout = async () => {
      try {
        await signOut();
        toast.success("Logged out successfully!");
        // Ensure we direct back to the login page
        navigate("/login", { replace: true });
      } catch (error) {
        console.error("Error logging out:", error);
        toast.error("Error logging out. Please try again.");
        navigate("/dashboard");
      }
    };
    
    performLogout();
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
