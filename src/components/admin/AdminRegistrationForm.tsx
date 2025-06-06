
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import { supabaseAdmin } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

const AdminRegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First create the user with admin role in metadata
      const { data: authData, error: signUpError } = await supabaseAdmin.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'admin',
            full_name: email.split('@')[0] // Default name from email
          }
        }
      });

      if (signUpError) throw signUpError;

      if (!authData.user) {
        throw new Error('No user data returned');
      }

      toast.success('Admin account created successfully! Please log in.');
      navigate('/admin');
    } catch (error: any) {
      console.error('Error creating admin:', error);
      toast.error(error.message || 'Failed to create admin account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Admin Account</CardTitle>
        <CardDescription>Register a new administrator account</CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Admin Account'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminRegistrationForm;
