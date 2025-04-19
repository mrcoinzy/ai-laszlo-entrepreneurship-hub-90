
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardSidebar from "@/components/admin/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Mail, UserPlus, UserCheck, UserX, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AdminsManagement = () => {
  const { isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sample data for existing admins
  const [admins] = useState([
    {
      id: "1",
      email: "admin@example.com",
      fullName: "Main Administrator",
      status: "active",
      lastActive: new Date().toISOString()
    },
    {
      id: "2",
      email: "editor@example.com",
      fullName: "Content Editor",
      status: "active",
      lastActive: new Date(Date.now() - 3600000).toISOString()
    }
  ]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    
    try {
      // Create new user with admin role
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'admin',
          },
        },
      });
      
      if (error) throw error;
      
      if (data) {
        toast.success("Admin created successfully");
        setEmail("");
        setPassword("");
        setFullName("");
        setIsDialogOpen(false);
      }
    } catch (error: any) {
      console.error('Error creating admin:', error);
      toast.error(error.message || "Failed to create admin");
    } finally {
      setIsCreating(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <main className={`flex-1 p-8 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Administrators Management</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <UserPlus size={16} />
                  <span>Create Admin</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Administrator</DialogTitle>
                  <DialogDescription>
                    Add a new administrator to your application
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateAdmin}>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium">
                        Initial Password
                      </label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Strong password"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Must be at least 8 characters including a number and a special character
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isCreating}>
                      {isCreating ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        'Create Admin'
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <Card className="bg-accent/5">
            <CardHeader>
              <CardTitle>Administrators List</CardTitle>
              <CardDescription>
                Manage your administrators and their access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {admins.map(admin => (
                  <div 
                    key={admin.id} 
                    className="flex items-center justify-between p-4 bg-background rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {admin.fullName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{admin.fullName}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Mail size={14} className="mr-2" />
                          {admin.email}
                        </div>
                        <div className="flex items-center mt-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            admin.status === 'active' 
                              ? 'bg-green-500/10 text-green-500' 
                              : 'bg-yellow-500/10 text-yellow-500'
                          }`}>
                            {admin.status === 'active' ? 'Active' : 'Pending'}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2">
                            Last active: {formatDate(admin.lastActive)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-primary">
                        <UserCheck size={16} className="mr-1" />
                        Permissions
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <UserX size={16} className="mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminsManagement;
