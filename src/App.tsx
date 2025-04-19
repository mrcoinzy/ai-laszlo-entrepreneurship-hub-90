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
import AdminRegistration from "@/pages/AdminRegistration"
import AdminLogin from "@/components/AdminLogin"
import AdminProfile from "@/pages/admin/Profile"
import AdminBlog from "@/pages/admin/Blog"
import AdminsManagement from "@/pages/admin/AdminsManagement"
import BlogPost from "@/pages/BlogPost"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>;
  }
  
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/consultation-thankyou" element={<ConsultationThankYou />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegistration />} />
          <Route 
            path="/admin/dashboard/*" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/profile" 
            element={
              <ProtectedRoute>
                <AdminProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/blog" 
            element={
              <ProtectedRoute>
                <AdminBlog />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/admins" 
            element={
              <ProtectedRoute>
                <AdminsManagement />
              </ProtectedRoute>
            } 
          />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default App
