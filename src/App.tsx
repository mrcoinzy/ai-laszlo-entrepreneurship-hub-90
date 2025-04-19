
import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import Index from "@/pages/Index"
import Consultation from "@/pages/Consultation"
import ConsultationThankYou from "@/pages/ConsultationThankYou"
import NotFound from "@/pages/NotFound"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import AdminDashboard from "@/pages/admin/Dashboard"

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin } = useAuth();
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/consultation-thankyou" element={<ConsultationThankYou />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default App
