
import { Routes, Route, Navigate } from "react-router-dom"
import Index from "@/pages/Index"
import About from "@/pages/About"
import Courses from "@/pages/Courses"
import CourseDetail from "@/pages/CourseDetail"
import Works from "@/pages/Works"
import Register from "@/pages/Register"
import Login from "@/pages/Login"
import Admin from "@/pages/Admin"
import Dashboard from "@/pages/Dashboard"
import Billing from "@/pages/Billing"
import Messages from "@/pages/Messages"
import Settings from "@/pages/Settings"
import Help from "@/pages/Help"
import NotFound from "@/pages/NotFound"
import Logout from "@/pages/Logout"
import PendingApproval from "@/pages/PendingApproval"
import RejectedAccount from "@/pages/RejectedAccount"
import { AuthProvider, useAuth } from "@/contexts/AuthContext"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Create a client
const queryClient = new QueryClient()

// Protected route wrapper
const ProtectedRoute = ({ children, requiredRole = null, requiredStatus = null }: { 
  children: React.ReactNode, 
  requiredRole?: "admin" | "client" | null,
  requiredStatus?: "approved" | "pending" | "rejected" | null
}) => {
  const { user, loading, isAdmin, isPending, isApproved } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse text-primary">Loading...</div>
    </div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
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
              <Route path="/help" element={<Help />} />
              
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
                <ProtectedRoute requiredRole="admin">
                  <Admin />
                </ProtectedRoute>
              } />
              
              {/* Client Routes (Requires Approval) */}
              <Route path="/dashboard" element={
                <ProtectedRoute requiredRole="client" requiredStatus="approved">
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/billing" element={
                <ProtectedRoute requiredRole="client" requiredStatus="approved">
                  <Billing />
                </ProtectedRoute>
              } />
              <Route path="/messages" element={
                <ProtectedRoute requiredRole="client" requiredStatus="approved">
                  <Messages />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute requiredStatus="approved">
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
