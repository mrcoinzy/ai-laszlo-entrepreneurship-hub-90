
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
import ProjectStatusCard from "@/components/Dashboard/ProjectStatusCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Define types for our data
interface Project {
  id: string;
  title: string;
  status: string;
  completion: number;
  start_time: string | null;
  due_date?: string;
  description?: string;
  cost?: string;
  feedback?: string;
  progress: number;
  is_active: boolean;
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

interface WorkSession {
  id: string;
  project_id: string;
  admin_id: string;
  start_time: string;
  end_time: string | null;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { userData } = useAuth();
  const queryClient = useQueryClient();
  
  // State for data
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [spending, setSpending] = useState({ current: 0, total: 5000 });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Fetch user's projects from Supabase
  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ['clientProjects'],
    queryFn: async () => {
      if (!userData?.id) return [];

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', userData.id);

      if (error) throw error;
      
      // Transform projects data
      const formattedProjects = data.map(p => ({
        id: p.id,
        title: p.title,
        status: p.status,
        completion: p.progress,
        start_time: p.start_time,
        due_date: p.due_date,
        description: p.description,
        progress: p.progress,
        is_active: p.is_active,
        cost: '', // We'll fetch this from invoices if needed
        feedback: ''
      }));
      
      return formattedProjects as Project[];
    },
    enabled: !!userData?.id
  });

  // Fetch user's invoices from Supabase
  const { data: invoices = [], isLoading: invoicesLoading } = useQuery({
    queryKey: ['clientInvoices'],
    queryFn: async () => {
      if (!userData?.id) return [];

      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('client_id', userData.id);

      if (error) throw error;
      
      // Transform invoices data
      const formattedInvoices = data.map(inv => ({
        id: inv.id,
        invoice_number: inv.invoice_number,
        amount: inv.amount,
        date: inv.date,
        status: inv.status,
        project_title: inv.details
      }));
      
      // Calculate spending
      if (formattedInvoices.length > 0) {
        const totalSpent = formattedInvoices.reduce((sum, inv) => sum + parseFloat(inv.amount.toString()), 0);
        setSpending({ current: totalSpent, total: Math.max(5000, totalSpent * 1.5) });
      }
      
      return formattedInvoices as Invoice[];
    },
    enabled: !!userData?.id
  });

  // Fetch work sessions to see active projects
  const { data: workSessions = [] } = useQuery({
    queryKey: ['workSessions'],
    queryFn: async () => {
      if (!userData?.id) return [];

      // Find all work sessions for user's projects
      const { data: projectIds } = await supabase
        .from('projects')
        .select('id')
        .eq('client_id', userData.id);
      
      if (!projectIds || projectIds.length === 0) return [];
      
      const projectIdList = projectIds.map(p => p.id);
      
      const { data, error } = await supabase
        .from('work_sessions')
        .select('*')
        .in('project_id', projectIdList)
        .is('end_time', null); // Only active sessions
      
      if (error) throw error;
      return data as WorkSession[];
    },
    enabled: !!userData?.id
  });

  // Setup real-time subscriptions
  useEffect(() => {
    if (!userData?.id) return;
    
    // Subscribe to project updates for this user
    const projectSubscription = supabase
      .channel('client_projects')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'projects',
          filter: `client_id=eq.${userData.id}`
        }, 
        () => {
          // Refresh projects data
          queryClient.invalidateQueries({ queryKey: ['clientProjects'] });
        }
      )
      .subscribe();
    
    // For notifications, we'll use mock data for now since there's no notifications table
    setNotifications([
      {
        id: 1,
        message: "Your account has been approved.",
        time: "Recently",
        read: false
      }
    ]);
    
    return () => {
      projectSubscription.unsubscribe();
    };
  }, [userData?.id]);

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
                        <span>{projectsLoading ? '...' : projects.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Completed</span>
                        <span>{projectsLoading ? '...' : countProjectsByStatus('completed')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>In Progress</span>
                        <span>{projectsLoading ? '...' : countProjectsByStatus('in-progress')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Active Work Card */}
                <Card className={`bg-accent/30 border-accent ${projects.some(p => p.is_active) ? 'border-green-500 bg-green-500/5' : ''}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Clock size={18} />
                      Work Status
                    </CardTitle>
                    <CardDescription>Current project activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {projects.some(p => p.is_active) ? (
                      <div className="space-y-2">
                        <div className="flex items-center text-green-500">
                          <div className="h-3 w-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                          <span className="font-medium">Active Work</span>
                        </div>
                        <p className="text-sm text-white/80">
                          Work is currently in progress on your project
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center text-white/70">
                          <div className="h-3 w-3 rounded-full bg-white/30 mr-2"></div>
                          <span className="font-medium">No Active Work</span>
                        </div>
                        <p className="text-sm text-white/70">
                          No work is currently in progress
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Recent Projects */}
              <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
              <div className="space-y-4">
                {projectsLoading ? (
                  <div className="text-center py-8">
                    <Clock className="w-8 h-8 animate-spin mx-auto text-primary mb-2" />
                    <div>Loading projects...</div>
                  </div>
                ) : projects.length > 0 ? (
                  projects.slice(0, 2).map(project => (
                    <ProjectStatusCard key={project.id} project={project} />
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
              {projectsLoading ? (
                <div className="text-center py-8">
                  <Clock className="w-8 h-8 animate-spin mx-auto text-primary mb-2" />
                  <div>Loading projects...</div>
                </div>
              ) : projects.length > 0 ? (
                <div className="space-y-6">
                  {projects.map(project => (
                    <ProjectStatusCard key={project.id} project={project} />
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
              {invoicesLoading ? (
                <div className="text-center py-8">
                  <Clock className="w-8 h-8 animate-spin mx-auto text-primary mb-2" />
                  <div>Loading invoices...</div>
                </div>
              ) : invoices.length > 0 ? (
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
                          <div className="font-medium">Account Approved</div>
                          <div className="text-sm text-white/60">Your account has been approved by an administrator</div>
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
                      
                      {/* Show active work session if available */}
                      {projects.some(p => p.is_active) && (
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/20 shrink-0 z-10">
                            <Clock size={18} className="text-green-500" />
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[45%] bg-green-500/10 rounded-md p-4 ml-4 md:ml-0">
                            <div className="font-medium text-green-500">Work in progress</div>
                            <div className="text-sm text-white/60">
                              Work on project "{projects.find(p => p.is_active)?.title}" is active
                            </div>
                            <div className="text-xs text-white/50 mt-1">Now</div>
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
