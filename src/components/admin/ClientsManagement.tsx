
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

// Mock client data
const mockClients = [
  {
    id: 1,
    fullName: "Jane Cooper",
    email: "jane@example.com",
    registrationDate: "2023-06-15",
    projectDescription: "E-commerce website for selling handmade crafts",
    serviceOptions: ["website", "marketing"],
    projectDetails: "Looking for a complete solution with payment processing and inventory management.",
    status: "active"
  },
  {
    id: 2,
    fullName: "Wade Warren",
    email: "wade@example.com",
    registrationDate: "2023-06-10",
    projectDescription: "Mobile app for fitness tracking",
    serviceOptions: ["webapp"],
    projectDetails: "Need an app that integrates with wearable devices and provides workout recommendations.",
    status: "active"
  },
  {
    id: 3,
    fullName: "Esther Howard",
    email: "esther@example.com",
    registrationDate: "2023-06-05",
    projectDescription: "Business consultation and brand development",
    serviceOptions: ["business", "marketing"],
    projectDetails: "Starting a new salon business and need help with business planning and marketing strategy.",
    status: "active"
  }
];

// Mock incoming client requests
const mockIncomingClients = [
  {
    id: 101,
    fullName: "Brooklyn Simmons",
    email: "brooklyn@example.com",
    registrationDate: "2023-06-18",
    projectDescription: "Personal portfolio website with blog functionality",
    serviceOptions: ["website"],
    projectDetails: "I'm a photographer looking to showcase my work and start a blog to share tips and techniques.",
    status: "pending"
  },
  {
    id: 102,
    fullName: "Cameron Williamson",
    email: "cameron@example.com",
    registrationDate: "2023-06-17",
    projectDescription: "Online course platform development",
    serviceOptions: ["webapp", "marketing"],
    projectDetails: "I want to create an online learning platform for teaching digital marketing skills with payment integration.",
    status: "pending"
  }
];

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
  const [expandedClient, setExpandedClient] = useState<number | null>(null);
  
  const toggleClientDetails = (clientId: number) => {
    setExpandedClient(expandedClient === clientId ? null : clientId);
  };
  
  // Handle client acceptance
  const handleAcceptClient = (clientId: number) => {
    // In a real app, this would call an API to update the client status
    toast.success("Client accepted successfully! An email notification has been sent.");
    console.log("Accepted client with ID:", clientId);
  };
  
  // Handle client rejection
  const handleRejectClient = (clientId: number) => {
    // In a real app, this would call an API to update the client status and send an email
    toast.info("Client request declined. An automated email has been sent.");
    console.log("Rejected client with ID:", clientId);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="all">All Clients</TabsTrigger>
          <TabsTrigger value="incoming">
            Incoming Clients
            {mockIncomingClients.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {mockIncomingClients.length}
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
                    {mockClients.map((client) => (
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
                            <Badge variant={client.status === "active" ? "default" : "secondary"}>
                              {client.status === "active" ? "Active" : "Pending"}
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
              {mockIncomingClients.length === 0 ? (
                <div className="text-center py-6 text-white/70">
                  No pending client requests at this time
                </div>
              ) : (
                <div className="space-y-4">
                  {mockIncomingClients.map((client) => (
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
                          onClick={() => handleRejectClient(client.id)}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Decline
                        </Button>
                        <Button 
                          variant="default"
                          size="sm"
                          className="bg-green-600 hover:bg-green-500"
                          onClick={() => handleAcceptClient(client.id)}
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
