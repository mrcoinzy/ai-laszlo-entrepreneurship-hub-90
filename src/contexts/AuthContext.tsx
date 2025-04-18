
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
      // First check if we already have userData cached
      if (userData && userData.role === 'admin') {
        return true;
      }
      
      // Check if the user is registered as an admin in the metadata
      const isAdminInMetadata = user.user_metadata && user.user_metadata.role === 'admin';
      
      // If admin in metadata, verify in database
      if (isAdminInMetadata) {
        const refreshedData = await fetchUserData(user.id);
        
        // If found in database and is admin, update state and return true
        if (refreshedData && refreshedData.role === 'admin') {
          setIsAdmin(true);
          setUserData(refreshedData);
          
          // Also update status
          setIsPending(refreshedData.status === 'pending');
          setIsApproved(refreshedData.status === 'approved');
          
          return true;
        }
        
        // If admin in metadata but not in database yet, create the record
        if (!refreshedData) {
          try {
            const { data, error } = await supabase
              .from('users')
              .insert({
                id: user.id,
                email: user.email,
                full_name: user.user_metadata.full_name || '',
                role: 'admin',
                status: 'approved'
              })
              .select()
              .single();
            
            if (error) throw error;
            
            if (data) {
              setUserData(data as UserData);
              setIsAdmin(true);
              setIsApproved(true);
              setIsPending(false);
              return true;
            }
          } catch (error) {
            console.error("Error creating admin user record:", error);
          }
        }
      }
      
      // Final database check - important for cases where metadata doesn't have role
      const refreshedData = await fetchUserData(user.id);
      if (refreshedData && refreshedData.role === 'admin') {
        setIsAdmin(true);
        setUserData(refreshedData);
        
        // Also update status
        setIsPending(refreshedData.status === 'pending');
        setIsApproved(refreshedData.status === 'approved');
        
        return true;
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
      
      setUser(null);
      setSession(null);
      setUserData(null);
      setIsAdmin(false);
      setIsPending(false);
      setIsApproved(false);
      
      localStorage.removeItem('supabase.auth.token');
      sessionStorage.clear();
      
      console.log("Local auth state cleared");
      return Promise.resolve();
    } catch (error: any) {
      console.error("Error during local state cleanup in signOut:", error);
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
