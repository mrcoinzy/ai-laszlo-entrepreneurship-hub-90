
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, FileText, TrendingUp, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { supabaseAdmin } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import ConsultationsList from "./ConsultationsList";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'consultations'>('overview');

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Admin Dashboard</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'overview' 
                ? 'bg-primary text-white' 
                : 'bg-accent/30 hover:bg-accent/50'
            }`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('consultations')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'consultations' 
                ? 'bg-primary text-white' 
                : 'bg-accent/30 hover:bg-accent/50'
            }`}
          >
            Consultations
          </button>
        </div>
      </div>
      
      {activeTab === 'overview' ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card 
              className="bg-accent/30 border-accent hover:bg-accent/40 transition-colors cursor-pointer"
              onClick={() => setActiveTab('consultations')}
            >
              <CardHeader className="pb-2">
                <CardDescription>Total Consultations</CardDescription>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">
                    {stats.totalConsultations}
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

            <Card className="bg-accent/30 border-accent hover:bg-accent/40 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardDescription>Total Budget</CardDescription>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">
                    ${stats.totalRevenue.toFixed(2)}
                  </CardTitle>
                  <BarChart3 className="text-primary h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-xs text-white/70">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500">8%</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-accent/30 border-accent hover:bg-accent/40 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardDescription>Avg. Response Time</CardDescription>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">
                    {stats.avgResponseTime} days
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
        </>
      ) : (
        <ConsultationsList />
      )}
    </div>
  );
};

export default AdminDashboard;
