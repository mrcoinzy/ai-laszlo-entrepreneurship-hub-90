
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  XCircle, 
  ChevronDown, 
  ChevronUp,
  Calendar,
  Mail
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Types for our data
interface Client {
  id: string;
  email: string;
  full_name: string;
  profile_image_url: string | null;
  bio: string | null;
  role: string;
  created_at: string;
}

interface Project {
  id: string;
  client_id: string;
  title: string;
  description: string;
  start_date: string | null;
  due_date: string | null;
  progress: number;
  status: string;
  time_spent: string;
  is_active: boolean;
  created_at: string;
}

// Helper function to format service options for display
const formatServiceOptions = (options: string[]) => {
  const serviceMap: Record<string, string> = {
    "website": "Website Development",
    "webapp": "Web Application",
    "marketing": "Marketing & Sales",
    "business": "Business Development",
    "self-development": "Self Development"
  };
  
  return options.map(opt => serviceMap[opt] || opt).join(", ");
};

const ClientsManagement = () => {
  const [expandedClient, setExpandedClient] = useState<string | null>(null);
  const queryClient = useQueryClient();
  
  // Fetch all clients with role 'client'
  const { data: clients = [], isLoading: isLoadingClients } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'client');
      
      if (error) throw error;
      return data as Client[];
    }
  });
  
  // Fetch all projects where is_active is false (pending approval)
  const { data: pendingProjects = [], isLoading: isLoadingPending } = useQuery({
    queryKey: ['pendingProjects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          users:client_id (id, full_name, email, created_at)
        `)
        .eq('is_active', false);
      
      if (error) throw error;
      return data;
    }
  });
  
  // Fetch active projects
  const { data: activeProjects = [], isLoading: isLoadingActive } = useQuery({
    queryKey: ['activeProjects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          users:client_id (id, full_name, email, created_at)
        `)
        .eq('is_active', true);
      
      if (error) throw error;
      return data;
    }
  });
  
  // Mutation to approve a project
  const approveMutation = useMutation({
    mutationFn: async (projectId: string) => {
      const { error } = await supabase
        .from('projects')
        .update({ 
          is_active: true,
          status: 'in-progress' 
        })
        .eq('id', projectId);
      
      if (error) throw error;
      return projectId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingProjects'] });
      queryClient.invalidateQueries({ queryKey: ['activeProjects'] });
      toast.success("Client accepted successfully! An email notification has been sent.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to accept client. Please try again.");
    }
  });
  
  // Mutation to reject a project
  const rejectMutation = useMutation({
    mutationFn: async (projectId: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);
      
      if (error) throw error;
      return projectId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingProjects'] });
      toast.info("Client request declined. An automated email has been sent.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to decline client. Please try again.");
    }
  });
  
  const toggleClientDetails = (clientId: string) => {
    setExpandedClient(expandedClient === clientId ? null : clientId);
  };
  
  // Handle client acceptance
  const handleAcceptClient = (projectId: string) => {
    approveMutation.mutate(projectId);
  };
  
  // Handle client rejection
  const handleRejectClient = (projectId: string) => {
    rejectMutation.mutate(projectId);
  };

  // Extract active clients from active projects
  const activeClients = activeProjects.map((project: any) => ({
    id: project.users.id,
    fullName: project.users.full_name,
    email: project.users.email,
    registrationDate: new Date(project.users.created_at).toISOString().split('T')[0],
    projectDescription: project.title,
    serviceOptions: ["website"], // Default placeholder, should come from a separate table in real implementation
    projectDetails: project.description,
    status: "active",
    projectId: project.id
  }));

  // Format pending clients from pending projects
  const pendingClients = pendingProjects.map((project: any) => ({
    id: project.users.id,
    fullName: project.users.full_name,
    email: project.users.email,
    registrationDate: new Date(project.users.created_at).toISOString().split('T')[0],
    projectDescription: project.title,
    serviceOptions: ["website"], // Default placeholder, should come from a separate table in real implementation
    projectDetails: project.description,
    status: "pending",
    projectId: project.id
  }));

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="all">All Clients</TabsTrigger>
          <TabsTrigger value="incoming">
            Incoming Clients
            {pendingClients.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {pendingClients.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card className="bg-accent/30 border-accent">
            <CardHeader>
              <CardTitle>All Clients</CardTitle>
              <CardDescription>Manage your existing clients</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingActive ? (
                <div className="text-center py-8">Loading clients...</div>
              ) : activeClients.length === 0 ? (
                <div className="text-center py-8 text-white/70">No active clients yet</div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Name</TableHead>
                        <TableHead>Services</TableHead>
                        <TableHead className="hidden md:table-cell">Registration Date</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeClients.map((client) => (
                        <React.Fragment key={client.id}>
                          <TableRow className="hover:bg-accent/10">
                            <TableCell className="font-medium">{client.fullName}</TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {formatServiceOptions(client.serviceOptions)}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-white/70" />
                                {client.registrationDate}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Badge variant="default">
                                Active
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => toggleClientDetails(client.id)}
                                aria-label="Toggle client details"
                              >
                                {expandedClient === client.id ? 
                                  <ChevronUp className="h-4 w-4" /> : 
                                  <ChevronDown className="h-4 w-4" />
                                }
                              </Button>
                            </TableCell>
                          </TableRow>
                          
                          {/* Expanded Details Row */}
                          {expandedClient === client.id && (
                            <TableRow className="bg-accent/10">
                              <TableCell colSpan={5} className="p-4">
                                <div className="space-y-3">
                                  <div>
                                    <h4 className="text-sm font-medium mb-1">Contact Information</h4>
                                    <div className="flex items-center text-sm">
                                      <Mail className="mr-2 h-4 w-4 text-white/70" />
                                      {client.email}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="text-sm font-medium mb-1">Project Description</h4>
                                    <p className="text-sm text-white/80">{client.projectDescription}</p>
                                  </div>
                                  
                                  <div>
                                    <h4 className="text-sm font-medium mb-1">Project Details</h4>
                                    <p className="text-sm text-white/80">{client.projectDetails}</p>
                                  </div>
                                  
                                  <div className="flex gap-2 pt-2">
                                    <Button size="sm" variant="outline">
                                      View Projects
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      Send Message
                                    </Button>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="incoming">
          <Card className="bg-accent/30 border-accent">
            <CardHeader>
              <CardTitle>Incoming Client Requests</CardTitle>
              <CardDescription>Review and respond to new client inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingPending ? (
                <div className="text-center py-8">Loading requests...</div>
              ) : pendingClients.length === 0 ? (
                <div className="text-center py-6 text-white/70">
                  No pending client requests at this time
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingClients.map((client) => (
                    <Card key={client.id} className="bg-accent/20 border-white/10">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{client.fullName}</CardTitle>
                            <CardDescription>{client.email}</CardDescription>
                          </div>
                          <Badge variant="outline">New Request</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Registration Date</h4>
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-2 h-4 w-4 text-white/70" />
                            {client.registrationDate}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Requested Services</h4>
                          <p className="text-sm text-white/80">
                            {formatServiceOptions(client.serviceOptions)}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Project Description</h4>
                          <p className="text-sm text-white/80">{client.projectDescription}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Project Details</h4>
                          <p className="text-sm text-white/80">{client.projectDetails}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t border-white/10 pt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-400 border-red-400/30 hover:bg-red-400/10"
                          onClick={() => handleRejectClient(client.projectId)}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Decline
                        </Button>
                        <Button 
                          variant="default"
                          size="sm"
                          className="bg-green-600 hover:bg-green-500"
                          onClick={() => handleAcceptClient(client.projectId)}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Accept Client
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientsManagement;
