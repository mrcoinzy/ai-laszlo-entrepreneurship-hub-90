
import React, { useState } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Types for our data
interface User {
  id: string;
  email?: string;
  role: string;
  created_at: string;
}

const ClientsManagement = () => {
  const [expandedClient, setExpandedClient] = useState<string | null>(null);
  const queryClient = useQueryClient();
  
  // Fetch all users with role 'user'
  const { data: allUsers = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*');
      
      if (error) throw error;
      return data as User[];
    }
  });
  
  // Fetch all consultations
  const { data: consultations = [], isLoading: isLoadingConsultations } = useQuery({
    queryKey: ['allConsultations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('consultations')
        .select('*');
      
      if (error) throw error;
      return data;
    }
  });
  
  // Mutation to update user role
  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string; newRole: string }) => {
      const { error } = await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', userId);
      
      if (error) throw error;
      return userId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
      toast.success("User role updated successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update user role. Please try again.");
    }
  });
  
  const toggleClientDetails = (clientId: string) => {
    setExpandedClient(expandedClient === clientId ? null : clientId);
  };
  
  // Handle approving user as admin
  const handleApproveAsAdmin = (userId: string) => {
    updateRoleMutation.mutate({ userId, newRole: 'admin' });
  };
  
  // Handle rejecting admin status
  const handleRemoveAdminRole = (userId: string) => {
    updateRoleMutation.mutate({ userId, newRole: 'user' });
  };
  
  // Format users data
  const formattedUsers = allUsers.map(user => {
    // Find consultations for this user by email
    const userConsultations = consultations.filter(
      (c: any) => c.email === user.email
    );
    
    return {
      id: user.id,
      role: user.role,
      email: user.email || 'No email',
      registrationDate: new Date(user.created_at).toISOString().split('T')[0],
      consultationCount: userConsultations.length,
      consultations: userConsultations,
    };
  });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="pending">
            Manage Admins
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card className="bg-accent/30 border-accent">
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Manage your existing users</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingUsers ? (
                <div className="text-center py-8">Loading users...</div>
              ) : formattedUsers.length === 0 ? (
                <div className="text-center py-8 text-white/70">No users found</div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">ID</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="hidden md:table-cell">Registration Date</TableHead>
                        <TableHead className="text-right">Role</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formattedUsers.map((user) => (
                        <React.Fragment key={user.id}>
                          <TableRow className="hover:bg-accent/10">
                            <TableCell className="font-medium">{user.id.substring(0, 8)}...</TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {user.email}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-white/70" />
                                {user.registrationDate}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Badge variant="default" className={user.role === 'admin' ? 'bg-green-600' : 'bg-blue-600'}>
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => toggleClientDetails(user.id)}
                                aria-label="Toggle user details"
                              >
                                {expandedClient === user.id ? 
                                  <ChevronUp className="h-4 w-4" /> : 
                                  <ChevronDown className="h-4 w-4" />
                                }
                              </Button>
                            </TableCell>
                          </TableRow>
                          
                          {/* Expanded Details Row */}
                          {expandedClient === user.id && (
                            <TableRow className="bg-accent/10">
                              <TableCell colSpan={5} className="p-4">
                                <div className="space-y-3">
                                  <div>
                                    <h4 className="text-sm font-medium mb-1">User Information</h4>
                                    <div className="flex items-center text-sm">
                                      <Mail className="mr-2 h-4 w-4 text-white/70" />
                                      {user.email}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="text-sm font-medium mb-1">Consultations ({user.consultationCount})</h4>
                                    {user.consultations.length > 0 ? (
                                      <div className="space-y-2">
                                        {user.consultations.map((consultation: any) => (
                                          <div key={consultation.id} className="p-2 bg-accent/20 rounded-md">
                                            <div className="font-medium">{consultation.main_goal}</div>
                                            <div className="text-sm text-white/70">{consultation.business_type}</div>
                                            <div className="flex justify-between mt-1 text-xs text-white/60">
                                              <div>Budget: ${consultation.budget_range}</div>
                                              <div>Date: {new Date(consultation.created_at).toLocaleDateString()}</div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-sm text-white/70">No consultations yet</p>
                                    )}
                                  </div>
                                  
                                  <div className="flex gap-2 pt-2">
                                    <Button size="sm" variant="outline">
                                      View Details
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
        
        <TabsContent value="pending">
          <Card className="bg-accent/30 border-accent">
            <CardHeader>
              <CardTitle>Manage Admin Access</CardTitle>
              <CardDescription>Grant or revoke admin privileges</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingUsers ? (
                <div className="text-center py-8">Loading users...</div>
              ) : formattedUsers.length === 0 ? (
                <div className="text-center py-6 text-white/70">
                  No users available to modify
                </div>
              ) : (
                <div className="space-y-4">
                  {formattedUsers.map((user) => (
                    <Card key={user.id} className="bg-accent/20 border-white/10">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">User ID: {user.id.substring(0, 8)}...</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                          </div>
                          <Badge variant="outline" className={user.role === 'admin' ? 
                            'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'}>
                            {user.role === 'admin' ? 'Admin' : 'Regular User'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Registration Date</h4>
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-2 h-4 w-4 text-white/70" />
                            {user.registrationDate}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t border-white/10 pt-4">
                        {user.role === 'admin' ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-400 border-red-400/30 hover:bg-red-400/10"
                            onClick={() => handleRemoveAdminRole(user.id)}
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Remove Admin Status
                          </Button>
                        ) : (
                          <Button 
                            variant="default"
                            size="sm"
                            className="bg-green-600 hover:bg-green-500"
                            onClick={() => handleApproveAsAdmin(user.id)}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Grant Admin Access
                          </Button>
                        )}
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
