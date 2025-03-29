
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // In a real app, you would clear auth tokens, etc.
    console.log("Logging out user...");
    
    // Redirect to login page
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }, [navigate]);
  
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
