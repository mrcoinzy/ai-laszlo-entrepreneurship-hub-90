import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, FileText, TrendingUp, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import AdminRegistrationForm from "./AdminRegistrationForm";

interface DashboardStats {
  totalClients: number;
  totalConsultations: number;
  totalRevenue: number;
  avgResponseTime: string; // in days
  clientGrowth: number;
  consultationGrowth: number;
  revenueGrowth: number;
}

interface RecentClient {
  id: string;
  name: string;
  date: string;
  status: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    totalConsultations: 0,
    totalRevenue: 0,
    avgResponseTime: '0',
    clientGrowth: 0,
    consultationGrowth: 0,
    revenueGrowth: 0
  });
  
  const [recentClients, setRecentClients] = useState<RecentClient[]>([]);
  
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['adminDashboardStats'],
    queryFn: async () => {
      if (!isAdmin) return null;
      
      // Get users count
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id, created_at, role')
        .eq('role', 'user');
      
      if (usersError) throw usersError;
      
      // Get consultations
      const { data: consultations, error: consultationsError } = await supabase
        .from('consultations')
        .select('*');
        
      if (consultationsError) throw consultationsError;
      
      // Calculate total revenue from consultations
      const totalRevenue = consultations?.reduce((sum, consultation) => 
        sum + (consultation.budget_range || 0), 0) || 0;
      
      // Get recent users with profiles
      const { data: recentUserData, error: recentUsersError } = await supabase
        .from('profiles')
        .select('id, full_name, email, created_at')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (recentUsersError) throw recentUsersError;
      
      // Format recent users data
      const formattedRecentClients = recentUserData?.map(user => ({
        id: user.id,
        name: user.full_name || user.email,
        date: format(new Date(user.created_at), 'yyyy-MM-dd'),
        status: 'user'
      })) || [];
      
      return {
        users: users || [],
        consultations: consultations || [],
        totalRevenue,
        recentClients: formattedRecentClients,
        clientGrowth: 10, // Mock growth percentage
        consultationGrowth: 15,
        revenueGrowth: 8
      };
    },
    enabled: isAdmin
  });

  useEffect(() => {
    if (dashboardData) {
      setStats({
        totalClients: dashboardData.users.length,
        totalConsultations: dashboardData.consultations.length,
        totalRevenue: dashboardData.totalRevenue,
        avgResponseTime: '1.5', // Hardcoded for now
        clientGrowth: dashboardData.clientGrowth,
        consultationGrowth: dashboardData.consultationGrowth,
        revenueGrowth: dashboardData.revenueGrowth
      });
      
      setRecentClients(dashboardData.recentClients);
    }
  }, [dashboardData]);

  const navigateToSection = (section: string) => {
    navigate(`/admin?section=${section}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Admin Overview</h2>
      
      <AdminRegistrationForm />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-accent/30 border-accent hover:bg-accent/40 transition-colors cursor-pointer" 
          onClick={() => navigateToSection("clients")}>
          <CardHeader className="pb-2">
            <CardDescription>Total Users</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">
                {isLoading ? '...' : stats.totalClients}
              </CardTitle>
              <Users className="text-primary h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-white/70">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">{stats.clientGrowth}%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent/30 border-accent hover:bg-accent/40 transition-colors cursor-pointer"
          onClick={() => navigateToSection("consultations")}>
          <CardHeader className="pb-2">
            <CardDescription>Total Consultations</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">
                {isLoading ? '...' : stats.totalConsultations}
              </CardTitle>
              <FileText className="text-primary h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-white/70">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">{stats.consultationGrowth}%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent/30 border-accent hover:bg-accent/40 transition-colors cursor-pointer"
          onClick={() => navigateToSection("revenue")}>
          <CardHeader className="pb-2">
            <CardDescription>Total Budget</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">
                {isLoading ? '...' : `$${stats.totalRevenue.toFixed(2)}`}
              </CardTitle>
              <BarChart3 className="text-primary h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-white/70">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">{stats.revenueGrowth}%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent/30 border-accent hover:bg-accent/40 transition-colors cursor-pointer"
          onClick={() => navigateToSection("performance")}>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Response Time</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">
                {isLoading ? '...' : `${stats.avgResponseTime} days`}
              </CardTitle>
              <Clock className="text-primary h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-white/70">
              Per consultation average
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card className="bg-accent/30 border-accent">
          <CardHeader>
            <CardTitle className="text-lg">Recent User Activity</CardTitle>
            <CardDescription>Latest user registrations and status updates</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Clock className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : recentClients.length > 0 ? (
              <div className="space-y-4">
                {recentClients.map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-3 bg-accent/20 rounded-md">
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-xs text-white/70">Joined: {client.date}</p>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      client.status === 'admin' ? 'bg-green-500/20 text-green-500' : 
                      'bg-amber-500/20 text-amber-500'
                    }`}>
                      {client.status === "admin" ? "Admin" : "User"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-white/70">
                No recent user activity
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-accent/30 border-accent">
          <CardHeader>
            <CardTitle className="text-lg">Performance Metrics</CardTitle>
            <CardDescription>Current performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Client Satisfaction</span>
                  <span className="text-sm">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Consultation Response Rate</span>
                  <span className="text-sm">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">On-time Delivery</span>
                  <span className="text-sm">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">User Approval Rate</span>
                  <span className="text-sm">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
