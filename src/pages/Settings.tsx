
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Globe, Moon, Sun } from "lucide-react";

const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("dark");
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
                      <Input id="firstName" defaultValue="John" className="bg-secondary/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" className="bg-secondary/50" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="profileEmail">Email</Label>
                    <Input id="profileEmail" type="email" defaultValue="john.doe@example.com" className="bg-secondary/50" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="bg-secondary/50" />
                  </div>
                  
                  <div className="pt-2">
                    <Button>Save Changes</Button>
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
                    <Input id="currentEmail" type="email" defaultValue="john.doe@example.com" disabled className="bg-secondary/50" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newEmail">New Email</Label>
                    <Input id="newEmail" type="email" className="bg-secondary/50" />
                  </div>
                  
                  <div className="pt-2">
                    <Button>Update Email</Button>
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
                    <Input id="currentPassword" type="password" className="bg-secondary/50" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" className="bg-secondary/50" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" className="bg-secondary/50" />
                  </div>
                  
                  <div className="pt-2">
                    <Button>Update Password</Button>
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
                    <Switch id="marketingEmails" />
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
