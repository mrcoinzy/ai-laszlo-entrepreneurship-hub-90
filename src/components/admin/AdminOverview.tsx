
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, FileText, TrendingUp, Clock, Book } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { supabaseAdmin } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const AdminOverview = () => {
  const navigate = useNavigate();

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['adminDashboardStats'],
    queryFn: async () => {
      const { data: consultations, error: consultationsError } = await supabaseAdmin
        .from('consultations')
        .select('*');
        
      if (consultationsError) throw consultationsError;
      
      // Calculate total revenue from consultations
      const totalRevenue = consultations?.reduce((sum, consultation) => 
        sum + (consultation.budget_range || 0), 0) || 0;
      
      return {
        consultations: consultations || [],
        totalRevenue,
        consultationGrowth: 15, // Mock growth percentage
      };
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Clock className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const stats = {
    totalConsultations: dashboardData?.consultations.length || 0,
    totalRevenue: dashboardData?.totalRevenue || 0,
    consultationGrowth: dashboardData?.consultationGrowth || 0,
    avgResponseTime: '1.5' // Hardcoded for demo
  };

  const recentConsultations = dashboardData?.consultations.slice(0, 5) || [];

  return (
    <div className="space-y-6 w-full max-w-none">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold">Dashboard Overview</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        <Card 
          className="bg-accent/10 hover:bg-accent/20 transition-colors cursor-pointer w-full"
          onClick={() => navigate('/admin/dashboard/consultations')}
        >
          <CardHeader className="pb-2">
            <CardDescription>Total Consultations</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl md:text-2xl">
                {stats.totalConsultations}
              </CardTitle>
              <FileText className="text-primary h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">{stats.consultationGrowth}%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent/10 hover:bg-accent/20 transition-colors cursor-pointer w-full">
          <CardHeader className="pb-2">
            <CardDescription>Total Budget</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl md:text-2xl">
                ${stats.totalRevenue.toFixed(2)}
              </CardTitle>
              <BarChart3 className="text-primary h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">8%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent/10 hover:bg-accent/20 transition-colors cursor-pointer w-full">
          <CardHeader className="pb-2">
            <CardDescription>Avg. Response Time</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl md:text-2xl">
                {stats.avgResponseTime} days
              </CardTitle>
              <Clock className="text-primary h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Per consultation average
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent/10 hover:bg-accent/20 transition-colors cursor-pointer w-full">
          <CardHeader className="pb-2">
            <CardDescription>Blog Posts</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl md:text-2xl">
                0
              </CardTitle>
              <Book className="text-primary h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              <span className="text-primary cursor-pointer" onClick={() => navigate('/admin/blog')}>
                Create your first post
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8 w-full">
        <Card className="bg-accent/10 w-full">
          <CardHeader>
            <CardTitle className="text-lg">Recent Consultations</CardTitle>
            <CardDescription>Latest client inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            {recentConsultations.length > 0 ? (
              <div className="space-y-4">
                {recentConsultations.map((consultation) => (
                  <div key={consultation.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-background rounded-md gap-2">
                    <div className="flex-1">
                      <div className="font-medium">{consultation.name}</div>
                      <div className="text-xs text-muted-foreground">{new Date(consultation.created_at).toLocaleDateString()}</div>
                    </div>
                    <div className="text-sm font-medium">${consultation.budget_range}</div>
                  </div>
                ))}
                <button 
                  className="text-sm text-primary mt-2"
                  onClick={() => navigate('/admin/dashboard/consultations')}
                >
                  View all consultations →
                </button>
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No consultations yet
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-accent/10 w-full">
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
