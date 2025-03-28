
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  // Mock data for dashboard
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    spending: {
      current: 2500,
      total: 5000
    },
    projects: [
      {
        id: 1,
        title: "Brand Identity Design",
        status: "completed",
        completion: 100
      },
      {
        id: 2,
        title: "Website Redesign",
        status: "in-progress",
        completion: 65
      },
      {
        id: 3,
        title: "Marketing Campaign",
        status: "pending",
        completion: 0
      }
    ],
    status: "online"
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Dashboard</h1>
          <p className="text-white/70">
            Welcome back, {userData.name}. Here's an overview of your projects and spending.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Status Card */}
          <Card className="bg-accent/30 border-accent">
            <CardHeader>
              <CardTitle className="text-xl">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className={`h-3 w-3 rounded-full mr-2 ${
                  userData.status === "online" ? "bg-green-500" : "bg-gray-500"
                }`}></div>
                <span className="capitalize">{userData.status}</span>
              </div>
              <p className="text-sm text-white/70 mt-2">
                {userData.status === "online" 
                  ? "Available for new projects and consultations" 
                  : "Currently unavailable for new projects"}
              </p>
            </CardContent>
          </Card>
          
          {/* Spending Card */}
          <Card className="bg-accent/30 border-accent">
            <CardHeader>
              <CardTitle className="text-xl">Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span>Current</span>
                <span className="font-medium">${userData.spending.current}</span>
              </div>
              <Progress 
                value={(userData.spending.current / userData.spending.total) * 100} 
                className="h-2 mb-4" 
              />
              <div className="text-sm text-white/70">
                Budget: ${userData.spending.current} / ${userData.spending.total}
              </div>
            </CardContent>
          </Card>
          
          {/* Projects Summary Card */}
          <Card className="bg-accent/30 border-accent">
            <CardHeader>
              <CardTitle className="text-xl">Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Projects</span>
                  <span>{userData.projects.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed</span>
                  <span>{userData.projects.filter(p => p.status === "completed").length}</span>
                </div>
                <div className="flex justify-between">
                  <span>In Progress</span>
                  <span>{userData.projects.filter(p => p.status === "in-progress").length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project List */}
        <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
        <div className="space-y-4">
          {userData.projects.map(project => (
            <Card key={project.id} className="bg-accent/30 border-accent">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{project.title}</h3>
                  <Badge variant={
                    project.status === "completed" ? "default" : 
                    project.status === "in-progress" ? "secondary" : "outline"
                  }>
                    {project.status === "in-progress" ? "In Progress" : 
                     project.status === "completed" ? "Completed" : "Pending"}
                  </Badge>
                </div>
                <Progress value={project.completion} className="h-2" />
                <div className="text-sm text-white/70 mt-2">
                  {project.completion}% complete
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
