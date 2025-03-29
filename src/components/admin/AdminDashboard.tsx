
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, FileText, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for the dashboard
  const dashboardData = {
    totalClients: 12,
    totalProjects: 18,
    totalRevenue: "$8,750",
    avgCompletionTime: "4.5 days",
    recentClients: [
      { id: 1, name: "Jane Cooper", date: "2023-06-15", status: "active" },
      { id: 2, name: "Wade Warren", date: "2023-06-10", status: "pending" },
    ],
    clientGrowth: 25, // percentage
    projectGrowth: 15, // percentage
    revenueGrowth: 30, // percentage
  };

  // Navigate to specific sections when cards are clicked
  const navigateToSection = (section: string) => {
    navigate(`/admin?section=${section}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Overview</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Clients Card */}
        <Card className="bg-accent/30 border-accent hover:bg-accent/40 transition-colors cursor-pointer" 
          onClick={() => navigateToSection("clients")}>
          <CardHeader className="pb-2">
            <CardDescription>Total Clients</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">{dashboardData.totalClients}</CardTitle>
              <Users className="text-primary h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-white/70">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">{dashboardData.clientGrowth}%</span>
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
              <CardTitle className="text-2xl">{dashboardData.totalProjects}</CardTitle>
              <FileText className="text-primary h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-white/70">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">{dashboardData.projectGrowth}%</span>
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
              <CardTitle className="text-2xl">{dashboardData.totalRevenue}</CardTitle>
              <BarChart3 className="text-primary h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-white/70">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">{dashboardData.revenueGrowth}%</span>
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
              <CardTitle className="text-2xl">{dashboardData.avgCompletionTime}</CardTitle>
              <TrendingUp className="text-primary h-5 w-5" />
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
            <CardDescription>Latest client registrations and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-3 bg-accent/20 rounded-md">
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-xs text-white/70">Joined: {client.date}</p>
                  </div>
                  <div className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                    {client.status === "active" ? "Active" : "Pending"}
                  </div>
                </div>
              ))}
            </div>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
