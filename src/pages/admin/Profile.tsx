
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import DashboardSidebar from "@/components/admin/DashboardSidebar";
import { UserCircle, Mail, LockKeyhole, Upload } from "lucide-react";

const Profile = () => {
  const { user, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      // Fetch user profile info
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from('users')
          .select('full_name, profile_image_url')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }
        
        if (data) {
          setFullName(data.full_name || "");
          setAvatarUrl(data.profile_image_url);
        }
      };
      
      fetchProfile();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      if (!user) throw new Error("Not authenticated");
      
      // Update profile info
      const { error: profileError } = await supabase
        .from('users')
        .update({ 
          full_name: fullName,
        })
        .eq('id', user.id);
      
      if (profileError) throw profileError;
      
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      if (!user) throw new Error("Not authenticated");
      
      // Update email via Supabase Auth
      const { error } = await supabase.auth.updateUser({
        email: email,
      });
      
      if (error) throw error;
      
      toast.success("Email update initiated. Check your inbox to confirm.");
    } catch (error: any) {
      console.error('Error updating email:', error);
      toast.error(error.message || "Failed to update email");
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      if (!user) throw new Error("Not authenticated");
      
      if (newPassword !== confirmPassword) {
        throw new Error("New passwords don't match");
      }
      
      // Update password via Supabase Auth
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) throw error;
      
      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error('Error updating password:', error);
      toast.error(error.message || "Failed to update password");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }
    
    const file = files[0];
    setUploading(true);
    
    try {
      if (!user) throw new Error("Not authenticated");
      
      const fileExt = file.name.split('.').pop();
      const filePath = `profile-avatars/${user.id}.${fileExt}`;
      
      // Upload file to Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      const publicUrl = urlData.publicUrl;
      
      // Update profile with URL
      const { error: updateError } = await supabase
        .from('users')
        .update({ profile_image_url: publicUrl })
        .eq('id', user.id);
      
      if (updateError) throw updateError;
      
      setAvatarUrl(publicUrl);
      toast.success("Profile picture updated");
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      
      // If bucket doesn't exist, create it first
      if (error.message.includes('The resource was not found')) {
        toast.error("Storage bucket not set up. Please contact administrator.");
      } else {
        toast.error(error.message || "Failed to upload profile picture");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <main className={`flex-1 p-8 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
          
          <div className="mb-8">
            <Card className="bg-accent/5">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={avatarUrl || ""} alt={fullName} />
                      <AvatarFallback className="bg-primary text-xl">
                        {fullName ? fullName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <label 
                      htmlFor="avatar-upload" 
                      className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors"
                    >
                      <Upload size={16} />
                      <input 
                        id="avatar-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleAvatarUpload}
                        disabled={uploading}
                      />
                    </label>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{fullName || "Administrator"}</h2>
                    <p className="text-muted-foreground">{user?.email}</p>
                    <p className="text-sm text-muted-foreground mt-1">Administrator</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <UserCircle size={16} />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail size={16} />
                <span>Email</span>
              </TabsTrigger>
              <TabsTrigger value="password" className="flex items-center gap-2">
                <LockKeyhole size={16} />
                <span>Password</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Updating..." : "Update Profile"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="email">
              <Card>
                <CardHeader>
                  <CardTitle>Email Address</CardTitle>
                  <CardDescription>
                    Change your email address
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEmailUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                      />
                    </div>
                    
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Updating..." : "Update Email"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="newPassword" className="text-sm font-medium">
                        New Password
                      </label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New password"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-sm font-medium">
                        Confirm Password
                      </label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        required
                      />
                    </div>
                    
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
