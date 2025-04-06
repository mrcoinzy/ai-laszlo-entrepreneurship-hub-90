
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, FileText, TrendingUp, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { format, differenceInDays } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardStats {
  totalClients: number;
  totalProjects: number;
  totalRevenue: number;
  avgCompletionTime: string; // in days
  clientGrowth: number;
  projectGrowth: number;
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
    totalProjects: 0,
    totalRevenue: 0,
    avgCompletionTime: '0',
    clientGrowth: 0,
    projectGrowth: 0,
    revenueGrowth: 0
  });
  
  const [recentClients, setRecentClients] = useState<RecentClient[]>([]);
  
  // Fetch dashboard statistics
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['adminDashboardStats'],
    queryFn: async () => {
      if (!isAdmin) return null;
      
      // Get clients count
      const { data: clients, error: clientsError } = await supabase
        .from('users')
        .select('id, created_at')
        .eq('role', 'client');
      
      if (clientsError) throw clientsError;
      
      // Get projects
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('id, created_at, start_time, end_time');
        
      if (projectsError) throw projectsError;
      
      // Get invoices
      const { data: invoices, error: invoicesError } = await supabase
        .from('invoices')
        .select('id, amount, created_at');
      
      if (invoicesError) throw invoicesError;
      
      // Calculate total revenue
      const totalRevenue = invoices?.reduce((sum, invoice) => sum + parseFloat(invoice.amount.toString()), 0) || 0;
      
      // Calculate average completion time for completed projects
      let avgCompletionDays = 0;
      const completedProjects = projects?.filter(p => p.start_time && p.end_time) || [];
      
      if (completedProjects.length > 0) {
        const totalDays = completedProjects.reduce((sum, project) => {
          const startTime = new Date(project.start_time);
          const endTime = new Date(project.end_time);
          return sum + differenceInDays(endTime, startTime);
        }, 0);
        
        avgCompletionDays = totalDays / completedProjects.length;
      }
      
      // Get recent clients
      const { data: recentClientData, error: recentClientsError } = await supabase
        .from('users')
        .select('id, full_name, created_at, status')
        .eq('role', 'client')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (recentClientsError) throw recentClientsError;
      
      // Format recent clients data
      const formattedRecentClients = recentClientData?.map(client => ({
        id: client.id,
        name: client.full_name,
        date: format(new Date(client.created_at), 'yyyy-MM-dd'),
        status: client.status
      })) || [];
      
      // Calculate growth (mocked for now - would need historical data for real calculation)
      // In a real app, we'd compare against previous period
      const clientGrowth = clients?.length > 0 ? 10 : 0; // Mock growth percentage
      const projectGrowth = projects?.length > 0 ? 15 : 0; // Mock growth percentage
      const revenueGrowth = totalRevenue > 0 ? 8 : 0; // Mock growth percentage
      
      return {
        clients: clients || [],
        projects: projects || [],
        invoices: invoices || [],
        totalRevenue,
        avgCompletionDays,
        recentClients: formattedRecentClients,
        clientGrowth,
        projectGrowth,
        revenueGrowth
      };
    },
    enabled: isAdmin // Only run query if user is admin
  });
  
  useEffect(() => {
    if (dashboardData) {
      setStats({
        totalClients: dashboardData.clients.length,
        totalProjects: dashboardData.projects.length,
        totalRevenue: dashboardData.totalRevenue,
        avgCompletionTime: dashboardData.avgCompletionDays.toFixed(1),
        clientGrowth: dashboardData.clientGrowth,
        projectGrowth: dashboardData.projectGrowth,
        revenueGrowth: dashboardData.revenueGrowth
      });
      
      setRecentClients(dashboardData.recentClients);
    }
  }, [dashboardData]);

  // Navigate to specific sections when cards are clicked
  const navigateToSection = (section: string) => {
    navigate(`/admin?section=${section}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Admin Overview</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Clients Card */}
        <Card className="bg-accent/30 border-accent hover:bg-accent/40 transition-colors cursor-pointer" 
          onClick={() => navigateToSection("clients")}>
          <CardHeader className="pb-2">
            <CardDescription>Total Clients</CardDescription>
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

        {/* Projects Card */}
        <Card className="bg-accent/30 border-accent hover:bg-accent/40 transition-colors cursor-pointer"
          onClick={() => navigateToSection("projects")}>
          <CardHeader className="pb-2">
            <CardDescription>Total Projects</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">
                {isLoading ? '...' : stats.totalProjects}
              </CardTitle>
              <FileText className="text-primary h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-white/70">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">{stats.projectGrowth}%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Card */}
        <Card className="bg-accent/30 border-accent hover:bg-accent/40 transition-colors cursor-pointer"
          onClick={() => navigateToSection("revenue")}>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
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

        {/* Completion Time Card */}
        <Card className="bg-accent/30 border-accent hover:bg-accent/40 transition-colors cursor-pointer"
          onClick={() => navigateToSection("performance")}>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Completion Time</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">
                {isLoading ? '...' : `${stats.avgCompletionTime} days`}
              </CardTitle>
              <Clock className="text-primary h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-white/70">
              Per project completion average
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Performance Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Clients */}
        <Card className="bg-accent/30 border-accent">
          <CardHeader>
            <CardTitle className="text-lg">Recent Client Activity</CardTitle>
            <CardDescription>Latest client registrations and status updates</CardDescription>
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
                      client.status === 'approved' ? 'bg-green-500/20 text-green-500' : 
                      client.status === 'pending' ? 'bg-amber-500/20 text-amber-500' : 
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {client.status === "approved" ? "Approved" : 
                      client.status === "pending" ? "Pending" : "Rejected"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-white/70">
                No recent client activity
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Metrics */}
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
                  <span className="text-sm">Project Completion Rate</span>
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
                  <span className="text-sm">Client Approval Rate</span>
                  <span className="text-sm">
                    {isLoading ? '...' : 
                      `${(recentClients.filter(c => c.status === 'approved').length / 
                      (recentClients.length || 1) * 100).toFixed(0)}%`}
                  </span>
                </div>
                <Progress 
                  value={recentClients.filter(c => c.status === 'approved').length / 
                    (recentClients.length || 1) * 100} 
                  className="h-2" 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
