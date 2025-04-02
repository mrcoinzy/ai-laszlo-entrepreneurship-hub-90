
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Globe, Moon, Sun, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("dark");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Loading states
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [isEmailUpdating, setIsEmailUpdating] = useState(false);
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);
  
  const { user, userData, loading } = useAuth();
  
  useEffect(() => {
    if (userData) {
      // Split full name into first and last name (if it contains a space)
      const nameParts = userData.full_name ? userData.full_name.split(' ') : ['', ''];
      setFirstName(nameParts[0] || '');
      setLastName(nameParts.slice(1).join(' ') || '');
      setEmail(userData.email || '');
    }
  }, [userData]);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleProfileUpdate = async () => {
    try {
      if (!user) return;
      
      setIsProfileUpdating(true);
      
      // Combine first and last name
      const fullName = `${firstName} ${lastName}`.trim();
      
      const { error } = await supabase
        .from('users')
        .update({
          full_name: fullName,
          // We don't update email here as it's part of auth
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(`Failed to update profile: ${error.message}`);
    } finally {
      setIsProfileUpdating(false);
    }
  };

  const handleEmailUpdate = async () => {
    try {
      if (!newEmail) {
        toast.error('Please enter a new email address');
        return;
      }
      
      setIsEmailUpdating(true);
      
      const { error } = await supabase.auth.updateUser({
        email: newEmail,
      });
      
      if (error) throw error;
      
      toast.success('Email update initiated. Please check your inbox to confirm the change.');
      setNewEmail('');
    } catch (error: any) {
      console.error('Error updating email:', error);
      toast.error(`Failed to update email: ${error.message}`);
    } finally {
      setIsEmailUpdating(false);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      if (!currentPassword || !newPassword || !confirmPassword) {
        toast.error('Please fill in all password fields');
        return;
      }
      
      if (newPassword !== confirmPassword) {
        toast.error('New passwords do not match');
        return;
      }
      
      setIsPasswordUpdating(true);
      
      // First verify the current password by trying to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: userData?.email || '',
        password: currentPassword,
      });
      
      if (signInError) {
        throw new Error('Current password is incorrect');
      }
      
      // Then update the password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) throw error;
      
      toast.success('Password updated successfully');
      
      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error('Error updating password:', error);
      toast.error(`Failed to update password: ${error.message}`);
    } finally {
      setIsPasswordUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 overflow-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold gradient-text">Settings</h1>
            <p className="text-white/70 mt-2">Manage your account preferences</p>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-4">
              <Card className="bg-accent/30 border-accent">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="bg-secondary/50" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="bg-secondary/50" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="profileEmail">Email</Label>
                    <Input 
                      id="profileEmail" 
                      type="email" 
                      value={email}
                      disabled
                      className="bg-secondary/50" 
                    />
                    <p className="text-xs text-white/60">To change your email, go to the Account tab</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="bg-secondary/50" 
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      onClick={handleProfileUpdate}
                      disabled={isProfileUpdating}
                    >
                      {isProfileUpdating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : 'Save Changes'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account" className="space-y-4">
              <Card className="bg-accent/30 border-accent">
                <CardHeader>
                  <CardTitle>Email Address</CardTitle>
                  <CardDescription>Change your email address</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentEmail">Current Email</Label>
                    <Input 
                      id="currentEmail" 
                      type="email" 
                      value={userData?.email || ''} 
                      disabled 
                      className="bg-secondary/50" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newEmail">New Email</Label>
                    <Input 
                      id="newEmail" 
                      type="email" 
                      className="bg-secondary/50"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)} 
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      onClick={handleEmailUpdate}
                      disabled={isEmailUpdating}
                    >
                      {isEmailUpdating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : 'Update Email'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-accent/30 border-accent">
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      type="password" 
                      className="bg-secondary/50"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      type="password" 
                      className="bg-secondary/50"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      className="bg-secondary/50"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      onClick={handlePasswordUpdate}
                      disabled={isPasswordUpdating}
                    >
                      {isPasswordUpdating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : 'Update Password'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences" className="space-y-4">
              <Card className="bg-accent/30 border-accent">
                <CardHeader>
                  <CardTitle>Language & Theme</CardTitle>
                  <CardDescription>Customize your user experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <div className="pt-2">
                      <ToggleGroup type="single" value={language} onValueChange={(value) => value && setLanguage(value)}>
                        <ToggleGroupItem value="en" className="flex gap-2">
                          <Globe size={16} />
                          <span>English</span>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="hu" className="flex gap-2">
                          <Globe size={16} />
                          <span>Hungarian</span>
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <div className="pt-2">
                      <ToggleGroup type="single" value={theme} onValueChange={(value) => value && setTheme(value)}>
                        <ToggleGroupItem value="light" className="flex gap-2">
                          <Sun size={16} />
                          <span>Light</span>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="dark" className="flex gap-2">
                          <Moon size={16} />
                          <span>Dark</span>
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-accent/30 border-accent">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications" className="text-base">Email Notifications</Label>
                      <p className="text-sm text-white/60">Receive email notifications about updates and messages</p>
                    </div>
                    <Switch 
                      id="emailNotifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketingEmails" className="text-base">Marketing Emails</Label>
                      <p className="text-sm text-white/60">Receive promotional content and newsletters</p>
                    </div>
                    <Switch 
                      id="marketingEmails"
                      checked={marketingEmails}
                      onCheckedChange={setMarketingEmails}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
