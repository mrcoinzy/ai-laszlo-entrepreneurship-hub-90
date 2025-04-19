
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in as admin
  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [user, isAdmin, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      toast.success('Logged in successfully');
      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error('Error logging in:', error);
      toast.error(error.message || 'Failed to log in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
    } catch (error: any) {
      console.error('Error logging out:', error);
      toast.error(error.message || 'Failed to log out');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToDashboard = () => {
    navigate('/admin/dashboard');
  };

  // If already logged in, show logout option or redirect
  if (user && isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If logged in but not an admin, just show that info
  if (user && !isAdmin) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Admin Access Denied</CardTitle>
          <CardDescription>
            You are logged in but don't have admin privileges
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="text-center">
            <p className="mb-4">Logged in as: {user.email}</p>
            <div className="space-y-2">
              <Button 
                onClick={handleLogout} 
                disabled={isLoading}
                variant="destructive"
                className="w-full"
              >
                {isLoading ? 'Logging out...' : 'Logout'}
              </Button>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="text-xs text-muted-foreground">
          <p>Contact an administrator if you need access</p>
        </CardFooter>
      </Card>
    );
  }

  // Login form
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Admin Login</CardTitle>
        <CardDescription>
          Login to access admin features
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </form>
      </CardContent>
      
      <CardFooter className="text-xs text-muted-foreground">
        <p>Use your admin credentials to login</p>
      </CardFooter>
    </Card>
  );
};

export default AdminLogin;
