import React, { useState } from "react";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  CalendarDays, 
  FileText, 
  BarChart3, 
  Clock,
  CreditCard,
  CheckCircle,
  AlertCircle,
  UserCircle,
  Settings,
  Bell
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardSidebar from "@/components/DashboardSidebar";

const Dashboard = () => {
  // Mock data for dashboard
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg",
    spending: {
      current: 2500,
      total: 5000
    },
    projects: [
      {
        id: 1,
        title: "Brand Identity Design",
        status: "completed",
        completion: 100,
        date: "2023-10-15",
        cost: "$1,200",
        feedback: "Excellent work! The design perfectly captures our brand essence."
      },
      {
        id: 2,
        title: "Website Redesign",
        status: "in-progress",
        completion: 65,
        date: "2023-11-20",
        cost: "$2,800",
        feedback: "Going well so far, appreciate the regular updates."
      },
      {
        id: 3,
        title: "Marketing Campaign",
        status: "pending",
        completion: 0,
        date: "2023-12-01",
        cost: "$1,500",
        feedback: ""
      }
    ],
    notifications: [
      {
        id: 1,
        message: "Project 'Website Redesign' has been updated",
        time: "2 hours ago",
        read: false
      },
      {
        id: 2,
        message: "New invoice #INV-2023-11 has been generated",
        time: "Yesterday",
        read: false
      },
      {
        id: 3,
        message: "Project 'Brand Identity Design' has been completed",
        time: "3 days ago",
        read: true
      }
    ],
    invoices: [
      {
        id: "INV-2023-11",
        amount: "$1,200",
        status: "paid",
        date: "2023-10-20",
        project: "Brand Identity Design"
      },
      {
        id: "INV-2023-12",
        amount: "$1,400",
        status: "pending",
        date: "2023-11-15",
        project: "Website Redesign (50%)"
      }
    ],
    status: "online"
  };

  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 container mx-auto px-4 pt-6 pb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-2">Client Dashboard</h1>
              <p className="text-white/70">
                Welcome back, {userData.name}. Here's an overview of your projects and spending.
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="relative">
                <Bell size={18} />
                {userData.notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {userData.notifications.filter(n => !n.read).length}
                  </span>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <Settings size={18} />
              </Button>
              <div className="flex items-center space-x-2 ml-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <UserCircle className="text-primary" />
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full md:w-auto overflow-x-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Status Card */}
                <Card className="bg-accent/30 border-accent">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${
                        userData.status === "online" ? "bg-green-500" : "bg-gray-500"
                      }`}></div>
                      Status
                    </CardTitle>
                    <CardDescription>Current availability</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <span className="capitalize font-medium text-lg">{userData.status}</span>
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
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <CreditCard size={18} />
                      Spending
                    </CardTitle>
                    <CardDescription>Current billing period</CardDescription>
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
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <FileText size={18} />
                      Projects
                    </CardTitle>
                    <CardDescription>Project status summary</CardDescription>
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

              {/* Recent Projects */}
              <h2 className="text-2xl font-bold mb-4">Recent Projects</h2>
              <div className="space-y-4">
                {userData.projects.slice(0, 2).map(project => (
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
                      <div className="flex justify-between mt-2 text-sm text-white/70">
                        <div>{project.completion}% complete</div>
                        <div className="flex items-center gap-1">
                          <CalendarDays size={14} />
                          {project.date}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="text-center mt-4">
                  <Button variant="outline" onClick={() => setActiveTab("projects")}>
                    View All Projects
                  </Button>
                </div>
              </div>
              
              {/* Recent Notifications */}
              <h2 className="text-2xl font-bold mb-4">Recent Notifications</h2>
              <Card className="bg-accent/30 border-accent">
                <CardContent className="p-4">
                  <ul className="space-y-3">
                    {userData.notifications.map(notification => (
                      <li key={notification.id} className={`flex items-start p-2 rounded-md ${!notification.read ? 'bg-primary/10' : ''}`}>
                        <span className={`mt-0.5 mr-2 ${!notification.read ? 'text-primary' : 'text-white/50'}`}>
                          <Bell size={16} />
                        </span>
                        <div>
                          <p className={`${!notification.read ? 'font-medium' : 'text-white/80'}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-white/60">{notification.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="projects" className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
              <div className="space-y-6">
                {userData.projects.map(project => (
                  <Card key={project.id} className="bg-accent/30 border-accent">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>{project.title}</CardTitle>
                        <Badge variant={
                          project.status === "completed" ? "default" : 
                          project.status === "in-progress" ? "secondary" : "outline"
                        }>
                          {project.status === "in-progress" ? "In Progress" : 
                          project.status === "completed" ? "Completed" : "Pending"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Progress value={project.completion} className="h-2" />
                      <div className="text-sm text-white/70">
                        {project.completion}% complete
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={16} className="text-primary" />
                          <div>
                            <div className="text-xs text-white/60">Start Date</div>
                            <div>{project.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard size={16} className="text-primary" />
                          <div>
                            <div className="text-xs text-white/60">Cost</div>
                            <div>{project.cost}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-primary" />
                          <div>
                            <div className="text-xs text-white/60">Status</div>
                            <div className="capitalize">{project.status.replace('-', ' ')}</div>
                          </div>
                        </div>
                      </div>
                      
                      {project.feedback && (
                        <div className="mt-4 p-3 bg-primary/10 rounded-md">
                          <div className="text-xs text-white/60 mb-1">Client Feedback</div>
                          <p className="text-sm">"{project.feedback}"</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="invoices" className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Your Invoices</h2>
              <Card className="bg-accent/30 border-accent">
                <CardContent className="p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userData.invoices.map(invoice => (
                        <TableRow key={invoice.id}>
                          <TableCell>{invoice.id}</TableCell>
                          <TableCell>{invoice.project}</TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>{invoice.amount}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {invoice.status === "paid" ? (
                                <>
                                  <CheckCircle size={14} className="text-green-500" />
                                  <span>Paid</span>
                                </>
                              ) : (
                                <>
                                  <AlertCircle size={14} className="text-yellow-500" />
                                  <span>Pending</span>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <div className="mt-6">
                <Card className="bg-accent/30 border-accent">
                  <CardHeader>
                    <CardTitle>Payment Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Invoiced</span>
                        <span>$2,600</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Paid</span>
                        <span>$1,200</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pending</span>
                        <span>$1,400</span>
                      </div>
                      <div className="pt-2 mt-2 border-t border-white/10 flex justify-between font-medium">
                        <span>Balance</span>
                        <span>$1,400</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="activity" className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
              <Card className="bg-accent/30 border-accent">
                <CardContent className="p-4">
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-white/10 before:z-0">
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 shrink-0 z-10">
                        <FileText size={18} className="text-primary" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[45%] bg-accent/20 rounded-md p-4 ml-4 md:ml-0">
                        <div className="font-medium">Project "Website Redesign" updated</div>
                        <div className="text-sm text-white/60">Progress updated to 65%</div>
                        <div className="text-xs text-white/50 mt-1">2 hours ago</div>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 shrink-0 z-10">
                        <CreditCard size={18} className="text-primary" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[45%] bg-accent/20 rounded-md p-4 ml-4 md:ml-0">
                        <div className="font-medium">New invoice created</div>
                        <div className="text-sm text-white/60">Invoice #INV-2023-12 for $1,400</div>
                        <div className="text-xs text-white/50 mt-1">Yesterday</div>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 shrink-0 z-10">
                        <CheckCircle size={18} className="text-primary" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[45%] bg-accent/20 rounded-md p-4 ml-4 md:ml-0">
                        <div className="font-medium">Project "Brand Identity Design" completed</div>
                        <div className="text-sm text-white/60">Project marked as completed</div>
                        <div className="text-xs text-white/50 mt-1">3 days ago</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
