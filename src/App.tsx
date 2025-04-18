import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Index from "@/pages/Index"
import About from "@/pages/About"
import Courses from "@/pages/Courses"
import CourseDetail from "@/pages/CourseDetail"
import Works from "@/pages/Works"
import Register from "@/pages/Register"
import Login from "@/pages/Login"
import Admin from "@/pages/Admin"
import AdminRegister from "@/pages/AdminRegister"
import Dashboard from "@/pages/Dashboard"
import Billing from "@/pages/Billing"
import Messages from "@/pages/Messages"
import Settings from "@/pages/Settings"
import Help from "@/pages/Help"
import NotFound from "@/pages/NotFound"
import Logout from "@/pages/Logout"
import PendingApproval from "@/pages/PendingApproval"
import RejectedAccount from "@/pages/RejectedAccount"
import Consultation from "@/pages/Consultation"
import ConsultationThankYou from "@/pages/ConsultationThankYou"
import { AuthProvider, useAuth } from "@/contexts/AuthContext"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Create a client
const queryClient = new QueryClient()

// Protected route wrapper
const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  requiredStatus = null,
  fallbackPath = "/login"
}: { 
  children: React.ReactNode, 
  requiredRole?: "admin" | "client" | null,
  requiredStatus?: "approved" | "pending" | "rejected" | null,
  fallbackPath?: string
}) => {
  const { user, loading, isAdmin, isPending, isApproved } = useAuth();
  
  // Set a timeout to prevent infinite loading
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.log("Protected route timeout reached, redirecting to login");
        window.location.href = "/login"; // Hard redirect if React navigation is stuck
      }
    }, 5000);
    
    return () => clearTimeout(timeoutId);
  }, [loading]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <div className="text-primary">Verifying authentication...</div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to={fallbackPath} />;
  }
  
  // Check role requirements
  if (requiredRole === "admin" && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  if (requiredRole === "client" && isAdmin) {
    return <Navigate to="/admin" />;
  }
  
  // Check status requirements
  if (requiredStatus === "approved" && !isApproved) {
    return <Navigate to={isPending ? "/pending" : "/rejected"} />;
  }
  
  if (requiredStatus === "pending" && !isPending) {
    return <Navigate to={isApproved ? "/dashboard" : "/rejected"} />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <TooltipProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/works" element={<Works />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin-register" element={<AdminRegister />} />
              <Route path="/help" element={<Help />} />
              <Route path="/consultation" element={<Consultation />} />
              <Route path="/consultation-thankyou" element={<ConsultationThankYou />} />
              
              {/* Registration Approval Flow */}
              <Route path="/pending" element={
                <ProtectedRoute requiredStatus="pending">
                  <PendingApproval />
                </ProtectedRoute>
              } />
              <Route path="/rejected" element={
                <ProtectedRoute>
                  <RejectedAccount />
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute requiredRole="admin" fallbackPath="/login">
                  <Admin />
                </ProtectedRoute>
              } />
              
              {/* Client Routes (Requires Approval) */}
              <Route path="/dashboard" element={
                <ProtectedRoute requiredRole="client" requiredStatus="approved" fallbackPath="/login">
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/billing" element={
                <ProtectedRoute requiredRole="client" requiredStatus="approved" fallbackPath="/login">
                  <Billing />
                </ProtectedRoute>
              } />
              <Route path="/messages" element={
                <ProtectedRoute requiredRole="client" requiredStatus="approved" fallbackPath="/login">
                  <Messages />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute requiredStatus="approved" fallbackPath="/login">
                  <Settings />
                </ProtectedRoute>
              } />
              
              {/* Special Routes */}
              <Route path="/logout" element={<Logout />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>

            <Toaster />
            <SonnerToaster />
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
