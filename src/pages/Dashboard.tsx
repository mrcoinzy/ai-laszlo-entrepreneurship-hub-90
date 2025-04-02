
import React, { useState, useEffect } from "react";
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
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// Define types for our data
interface Project {
  id: string;
  title: string;
  status: string;
  completion: number;
  start_date: string;
  due_date?: string;
  description?: string;
  cost?: string;
  feedback?: string;
}

interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  date: string;
  status: string;
  project_title?: string;
}

interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { userData } = useAuth();
  
  // State for data
  const [projects, setProjects] = useState<Project[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [spending, setSpending] = useState({ current: 0, total: 5000 });

  // Fetch user's projects from Supabase
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userData?.id) return;

      setIsLoading(true);
      try {
        // Fetch projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('client_id', userData.id);

        if (projectsError) throw projectsError;
        
        // Transform projects data
        const formattedProjects = projectsData.map(p => ({
          id: p.id,
          title: p.title,
          status: p.status,
          completion: p.progress,
          start_date: p.start_date,
          due_date: p.due_date,
          description: p.description,
          cost: '', // We'll fetch this from invoices if needed
          feedback: ''
        }));
        
        setProjects(formattedProjects);

        // Fetch invoices
        const { data: invoicesData, error: invoicesError } = await supabase
          .from('invoices')
          .select('*')
          .eq('client_id', userData.id);

        if (invoicesError) throw invoicesError;
        
        // Transform invoices data
        const formattedInvoices = invoicesData.map(inv => ({
          id: inv.id,
          invoice_number: inv.invoice_number,
          amount: inv.amount,
          date: inv.date,
          status: inv.status,
          project_title: inv.details
        }));
        
        setInvoices(formattedInvoices);
        
        // Calculate spending
        if (invoicesData.length > 0) {
          const totalSpent = invoicesData.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
          setSpending({ current: totalSpent, total: Math.max(5000, totalSpent * 1.5) });
        }

        // For notifications, we'll use mock data for now since there's no notifications table
        // This could be replaced with real data if a notifications table is added
        setNotifications([
          {
            id: 1,
            message: "Your account has been set up successfully",
            time: "Just now",
            read: false
          }
        ]);

      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load your dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userData?.id]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Helper function to count projects by status
  const countProjectsByStatus = (status: string) => {
    return projects.filter(p => p.status === status).length;
  };

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 container mx-auto px-4 pt-6 pb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-2">Client Dashboard</h1>
              <p className="text-white/70">
                Welcome back, {userData?.full_name || 'User'}. Here's an overview of your projects and spending.
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="relative">
                <Bell size={18} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
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
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      Status
                    </CardTitle>
                    <CardDescription>Current availability</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <span className="capitalize font-medium text-lg">Online</span>
                    </div>
                    <p className="text-sm text-white/70 mt-2">
                      Available for new projects and consultations
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
                      <span className="font-medium">${spending.current}</span>
                    </div>
                    <Progress 
                      value={(spending.current / spending.total) * 100} 
                      className="h-2 mb-4" 
                    />
                    <div className="text-sm text-white/70">
                      Budget: ${spending.current} / ${spending.total}
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
                        <span>{projects.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Completed</span>
                        <span>{countProjectsByStatus('completed')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>In Progress</span>
                        <span>{countProjectsByStatus('in-progress')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Projects */}
              <h2 className="text-2xl font-bold mb-4">Recent Projects</h2>
              <div className="space-y-4">
                {projects.length > 0 ? (
                  projects.slice(0, 2).map(project => (
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
                            {project.start_date}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="bg-accent/30 border-accent">
                    <CardContent className="p-4 text-center py-8">
                      <p className="text-white/70">You don't have any projects yet.</p>
                      <Button variant="outline" className="mt-4">Start a New Project</Button>
                    </CardContent>
                  </Card>
                )}
                
                {projects.length > 0 && (
                  <div className="text-center mt-4">
                    <Button variant="outline" onClick={() => setActiveTab("projects")}>
                      View All Projects
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Recent Notifications */}
              <h2 className="text-2xl font-bold mb-4">Recent Notifications</h2>
              <Card className="bg-accent/30 border-accent">
                <CardContent className="p-4">
                  {notifications.length > 0 ? (
                    <ul className="space-y-3">
                      {notifications.map(notification => (
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
                  ) : (
                    <p className="text-center py-4 text-white/70">No notifications yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="projects" className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
              {projects.length > 0 ? (
                <div className="space-y-6">
                  {projects.map(project => (
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
                              <div>{project.start_date}</div>
                            </div>
                          </div>
                          {project.due_date && (
                            <div className="flex items-center gap-2">
                              <Clock size={16} className="text-primary" />
                              <div>
                                <div className="text-xs text-white/60">Due Date</div>
                                <div>{project.due_date}</div>
                              </div>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-primary" />
                            <div>
                              <div className="text-xs text-white/60">Status</div>
                              <div className="capitalize">{project.status.replace('-', ' ')}</div>
                            </div>
                          </div>
                        </div>
                        
                        {project.description && (
                          <div className="mt-4 p-3 bg-primary/10 rounded-md">
                            <div className="text-xs text-white/60 mb-1">Description</div>
                            <p className="text-sm">{project.description}</p>
                          </div>
                        )}
                        
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
              ) : (
                <Card className="bg-accent/30 border-accent">
                  <CardContent className="p-8 text-center">
                    <FileText className="mx-auto h-12 w-12 text-white/30 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Projects Found</h3>
                    <p className="text-white/70 mb-4">You don't have any projects yet.</p>
                    <Button>Start a New Project</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="invoices" className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Your Invoices</h2>
              {invoices.length > 0 ? (
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
                        {invoices.map(invoice => (
                          <TableRow key={invoice.id}>
                            <TableCell>{invoice.invoice_number}</TableCell>
                            <TableCell>{invoice.project_title || 'General'}</TableCell>
                            <TableCell>{invoice.date}</TableCell>
                            <TableCell>${invoice.amount}</TableCell>
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
              ) : (
                <Card className="bg-accent/30 border-accent">
                  <CardContent className="p-8 text-center">
                    <CreditCard className="mx-auto h-12 w-12 text-white/30 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Invoices Found</h3>
                    <p className="text-white/70 mb-4">You don't have any invoices yet.</p>
                  </CardContent>
                </Card>
              )}
              
              {invoices.length > 0 && (
                <div className="mt-6">
                  <Card className="bg-accent/30 border-accent">
                    <CardHeader>
                      <CardTitle>Payment Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Total Invoiced</span>
                          <span>${invoices.reduce((sum, inv) => sum + parseFloat(inv.amount.toString()), 0).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Paid</span>
                          <span>${invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + parseFloat(inv.amount.toString()), 0).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pending</span>
                          <span>${invoices.filter(inv => inv.status !== 'paid').reduce((sum, inv) => sum + parseFloat(inv.amount.toString()), 0).toFixed(2)}</span>
                        </div>
                        <div className="pt-2 mt-2 border-t border-white/10 flex justify-between font-medium">
                          <span>Balance</span>
                          <span>${invoices.filter(inv => inv.status !== 'paid').reduce((sum, inv) => sum + parseFloat(inv.amount.toString()), 0).toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="activity" className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
              {projects.length > 0 || invoices.length > 0 ? (
                <Card className="bg-accent/30 border-accent">
                  <CardContent className="p-4">
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-white/10 before:z-0">
                      {/* Registration activity */}
                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 shrink-0 z-10">
                          <UserCircle size={18} className="text-primary" />
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[45%] bg-accent/20 rounded-md p-4 ml-4 md:ml-0">
                          <div className="font-medium">Account Created</div>
                          <div className="text-sm text-white/60">Your account was successfully registered</div>
                          <div className="text-xs text-white/50 mt-1">Recently</div>
                        </div>
                      </div>

                      {/* Show most recent project if available */}
                      {projects.length > 0 && (
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 shrink-0 z-10">
                            <FileText size={18} className="text-primary" />
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[45%] bg-accent/20 rounded-md p-4 ml-4 md:ml-0">
                            <div className="font-medium">Project "{projects[0].title}" created</div>
                            <div className="text-sm text-white/60">Project was added to your account</div>
                            <div className="text-xs text-white/50 mt-1">Recently</div>
                          </div>
                        </div>
                      )}

                      {/* Show most recent invoice if available */}
                      {invoices.length > 0 && (
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 shrink-0 z-10">
                            <CreditCard size={18} className="text-primary" />
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[45%] bg-accent/20 rounded-md p-4 ml-4 md:ml-0">
                            <div className="font-medium">New invoice created</div>
                            <div className="text-sm text-white/60">Invoice #{invoices[0].invoice_number} for ${invoices[0].amount}</div>
                            <div className="text-xs text-white/50 mt-1">Recently</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-accent/30 border-accent">
                  <CardContent className="p-8 text-center">
                    <Clock className="mx-auto h-12 w-12 text-white/30 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Activity Yet</h3>
                    <p className="text-white/70">Your activity history will appear here as you use the platform.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
