
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
  status: string;
  created_at: string;
}

interface Project {
  id: string;
  client_id: string;
  title: string;
  description: string;
  start_time: string | null;
  end_time: string | null;
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
  
  // Fetch all users with role 'client'
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
  
  // Fetch all pending clients
  const { data: pendingClients = [], isLoading: isLoadingPending } = useQuery({
    queryKey: ['pendingClients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'client')
        .eq('status', 'pending');
      
      if (error) throw error;
      return data as Client[];
    }
  });
  
  // Fetch approved clients
  const { data: approvedClients = [], isLoading: isLoadingApproved } = useQuery({
    queryKey: ['approvedClients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'client')
        .eq('status', 'approved');
      
      if (error) throw error;
      return data as Client[];
    }
  });
  
  // Fetch all projects for approved clients
  const { data: projects = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ['clientProjects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          users:client_id (id, full_name, email, created_at)
        `);
      
      if (error) throw error;
      return data;
    }
  });
  
  // Mutation to approve a client
  const approveMutation = useMutation({
    mutationFn: async (clientId: string) => {
      const { error } = await supabase
        .from('users')
        .update({ status: 'approved' })
        .eq('id', clientId);
      
      if (error) throw error;
      return clientId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingClients'] });
      queryClient.invalidateQueries({ queryKey: ['approvedClients'] });
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success("Client approved successfully! An email notification has been sent.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to approve client. Please try again.");
    }
  });
  
  // Mutation to reject a client
  const rejectMutation = useMutation({
    mutationFn: async (clientId: string) => {
      const { error } = await supabase
        .from('users')
        .update({ status: 'rejected' })
        .eq('id', clientId);
      
      if (error) throw error;
      return clientId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingClients'] });
      queryClient.invalidateQueries({ queryKey: ['approvedClients'] });
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.info("Client request rejected. An automated email has been sent.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to reject client. Please try again.");
    }
  });
  
  const toggleClientDetails = (clientId: string) => {
    setExpandedClient(expandedClient === clientId ? null : clientId);
  };
  
  // Handle client approval
  const handleApproveClient = (clientId: string) => {
    approveMutation.mutate(clientId);
  };
  
  // Handle client rejection
  const handleRejectClient = (clientId: string) => {
    rejectMutation.mutate(clientId);
  };
  
  // Format pending clients data
  const formattedPendingClients = pendingClients.map(client => ({
    id: client.id,
    fullName: client.full_name,
    email: client.email,
    registrationDate: new Date(client.created_at).toISOString().split('T')[0],
    status: "pending",
  }));

  // Format approved clients data
  const formattedApprovedClients = approvedClients.map(client => {
    // Find projects for this client
    const clientProjects = projects.filter((p: any) => p.client_id === client.id);
    
    return {
      id: client.id,
      fullName: client.full_name,
      email: client.email,
      registrationDate: new Date(client.created_at).toISOString().split('T')[0],
      projectCount: clientProjects.length,
      projects: clientProjects,
      status: "approved",
    };
  });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="all">All Clients</TabsTrigger>
          <TabsTrigger value="incoming">
            Pending Approval
            {formattedPendingClients.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {formattedPendingClients.length}
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
              {isLoadingApproved ? (
                <div className="text-center py-8">Loading clients...</div>
              ) : formattedApprovedClients.length === 0 ? (
                <div className="text-center py-8 text-white/70">No approved clients yet</div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="hidden md:table-cell">Registration Date</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formattedApprovedClients.map((client) => (
                        <React.Fragment key={client.id}>
                          <TableRow className="hover:bg-accent/10">
                            <TableCell className="font-medium">{client.fullName}</TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {client.email}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-white/70" />
                                {client.registrationDate}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Badge variant="default" className="bg-green-600">
                                Approved
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
                                    <h4 className="text-sm font-medium mb-1">Projects ({client.projectCount})</h4>
                                    {client.projects.length > 0 ? (
                                      <div className="space-y-2">
                                        {client.projects.map((project: any) => (
                                          <div key={project.id} className="p-2 bg-accent/20 rounded-md">
                                            <div className="font-medium">{project.title}</div>
                                            <div className="text-sm text-white/70">{project.description}</div>
                                            <div className="flex justify-between mt-1 text-xs text-white/60">
                                              <div>Status: {project.status}</div>
                                              <div>Progress: {project.progress}%</div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-sm text-white/70">No projects yet</p>
                                    )}
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
              <CardTitle>Pending Client Requests</CardTitle>
              <CardDescription>Review and approve new client registrations</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingPending ? (
                <div className="text-center py-8">Loading requests...</div>
              ) : formattedPendingClients.length === 0 ? (
                <div className="text-center py-6 text-white/70">
                  No pending client requests at this time
                </div>
              ) : (
                <div className="space-y-4">
                  {formattedPendingClients.map((client) => (
                    <Card key={client.id} className="bg-accent/20 border-white/10">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{client.fullName}</CardTitle>
                            <CardDescription>{client.email}</CardDescription>
                          </div>
                          <Badge variant="outline" className="bg-amber-500/20 text-amber-500">
                            Pending Approval
                          </Badge>
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
                      </CardContent>
                      <CardFooter className="flex justify-between border-t border-white/10 pt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-400 border-red-400/30 hover:bg-red-400/10"
                          onClick={() => handleRejectClient(client.id)}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                        <Button 
                          variant="default"
                          size="sm"
                          className="bg-green-600 hover:bg-green-500"
                          onClick={() => handleApproveClient(client.id)}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve Access
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
