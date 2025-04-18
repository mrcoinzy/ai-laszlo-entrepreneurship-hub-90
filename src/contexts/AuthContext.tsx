
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isPending: boolean;
  isApproved: boolean;
  adminCheck: () => Promise<boolean>;
  refreshUserSession: () => Promise<void>;
}

interface UserData {
  id: string;
  full_name: string;
  email: string;
  role: string;
  status: string;
  profile_image_url: string | null;
  bio: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async (userId: string) => {
    try {
      console.log("Fetching user data for:", userId);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user data:', error);
        return null;
      }
      
      console.log("User data fetched:", data);
      return data as UserData;
    } catch (error) {
      console.error('Error in fetchUserData:', error);
      return null;
    }
  };

  const refreshUserSession = async () => {
    try {
      console.log("Refreshing user session...");
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) throw error;
      
      if (data && data.session) {
        console.log("Session refreshed successfully");
        setSession(data.session);
        setUser(data.user);
        
        if (data.user) {
          const freshUserData = await fetchUserData(data.user.id);
          if (freshUserData) {
            setUserData(freshUserData);
            setIsAdmin(freshUserData.role === 'admin');
            setIsPending(freshUserData.status === 'pending');
            setIsApproved(freshUserData.status === 'approved');
          }
        }
      }
    } catch (error) {
      console.error("Error refreshing session:", error);
      toast.error("Failed to refresh session. Please try logging in again.");
    }
  };

  const adminCheck = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // First, if we already have verified userData that shows admin
      if (userData && userData.role === 'admin' && userData.status === 'approved') {
        return true;
      }
      
      // Direct database check for most up-to-date status
      const { data, error } = await supabase
        .from('users')
        .select('role, status')
        .eq('id', user.id)
        .single();
        
      if (error) {
        console.error('Error during admin database check:', error);
      }
      
      // If we found a record and it shows admin status
      if (data && data.role === 'admin' && data.status === 'approved') {
        // Update local state
        if (userData) {
          setUserData({...userData, role: data.role, status: data.status});
        } else {
          // Fetch full user data if we don't have it
          const fullUserData = await fetchUserData(user.id);
          if (fullUserData) {
            setUserData(fullUserData);
          }
        }
        
        setIsAdmin(true);
        setIsApproved(data.status === 'approved');
        setIsPending(data.status === 'pending');
        
        return true;
      }
      
      // Check if admin in user metadata
      const isAdminInMetadata = user.user_metadata && user.user_metadata.role === 'admin';
      
      // If admin in metadata but not found in database, create the record
      if (isAdminInMetadata && (!data || data.role !== 'admin')) {
        try {
          const { data: insertData, error: insertError } = await supabase
            .from('users')
            .upsert({
              id: user.id,
              email: user.email || '',
              full_name: user.user_metadata.full_name || '',
              role: 'admin',
              status: 'approved'
            }, { onConflict: 'id' })
            .select()
            .single();
          
          if (insertError) {
            console.error("Error creating admin user record:", insertError);
            return false;
          }
          
          if (insertData) {
            setUserData(insertData as UserData);
            setIsAdmin(true);
            setIsApproved(true);
            setIsPending(false);
            return true;
          }
        } catch (error) {
          console.error("Error creating admin user record:", error);
          return false;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  };

  useEffect(() => {
    console.log("Setting up auth state listener...");
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log("Auth state changed:", _event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const data = await fetchUserData(session.user.id);
          setUserData(data);
          
          if (data) {
            setIsAdmin(data.role === 'admin');
            setIsPending(data.status === 'pending');
            setIsApproved(data.status === 'approved');

            if (data.status === 'pending' && window.location.pathname !== '/pending') {
              navigate('/pending');
            }
            
            if (data.status === 'rejected' && window.location.pathname !== '/rejected') {
              navigate('/rejected');
            }
          } else {
            setIsAdmin(false);
            setIsPending(false);
            setIsApproved(false);
          }
        } else {
          setUserData(null);
          setIsAdmin(false);
          setIsPending(false);
          setIsApproved(false);
        }
        
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log("Initial session fetch:", session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const data = await fetchUserData(session.user.id);
        setUserData(data);
        
        if (data) {
          setIsAdmin(data.role === 'admin');
          setIsPending(data.status === 'pending');
          setIsApproved(data.status === 'approved');

          if (data.status === 'pending' && window.location.pathname !== '/pending') {
            navigate('/pending');
          }
          
          if (data.status === 'rejected' && window.location.pathname !== '/rejected') {
            navigate('/rejected');
          }
        }
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Signing in with:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      setUser(data.user);
      setSession(data.session);
      
      if (data.user) {
        const userData = await fetchUserData(data.user.id);
        setUserData(userData);
        
        if (userData) {
          setIsAdmin(userData.role === 'admin');
          setIsPending(userData.status === 'pending');
          setIsApproved(userData.status === 'approved');
          
          if (userData.status === 'pending') {
            navigate('/pending');
            toast.info("Your account is pending approval.");
          } else if (userData.status === 'rejected') {
            navigate('/rejected');
            toast.error("Your account has been rejected.");
          } else if (userData.role === 'admin') {
            navigate('/admin');
            toast.success("Welcome, Admin!");
          } else {
            navigate('/dashboard');
            toast.success("Login successful!");
          }
        } else if (data.user.user_metadata?.role === 'admin') {
          // Create user record for admins who don't have one yet
          try {
            const { error: insertError } = await supabase
              .from('users')
              .upsert({
                id: data.user.id,
                email: data.user.email || '',
                full_name: data.user.user_metadata.full_name || '',
                role: 'admin',
                status: 'approved'
              }, { onConflict: 'id' });
              
            if (!insertError) {
              setIsAdmin(true);
              setIsApproved(true);
              navigate('/admin');
              toast.success("Welcome, Admin!");
            }
          } catch (error) {
            console.error("Error creating admin user record during login:", error);
            navigate('/dashboard');
          }
        } else {
          navigate('/dashboard');
          toast.success("Login successful!");
        }
      }
      
      console.log("Sign in successful:", data.user?.id);
    } catch (error: any) {
      console.error("Sign in error:", error.message);
      toast.error(error.message || "Login failed");
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log("Signing out user...");
      
      // First clean up local state
      setUser(null);
      setSession(null);
      setUserData(null);
      setIsAdmin(false);
      setIsPending(false);
      setIsApproved(false);
      
      // Then sign out from Supabase
      await supabase.auth.signOut();
      
      localStorage.removeItem('supabase.auth.token');
      sessionStorage.clear();
      
      console.log("Sign out completed");
      navigate('/login');
      return Promise.resolve();
    } catch (error: any) {
      console.error("Error during signOut:", error);
      return Promise.resolve();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userData,
        loading,
        signIn,
        signOut,
        isAdmin,
        isPending,
        isApproved,
        adminCheck,
        refreshUserSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
