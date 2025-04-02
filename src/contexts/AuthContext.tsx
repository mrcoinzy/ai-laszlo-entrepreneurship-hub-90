
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

// Define a type for additional user data from the users table
interface UserData {
  id: string;
  full_name: string;
  email: string;
  role: string;
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

  // Fetch user data from the users table
  const fetchUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user data:', error);
        return null;
      }
      
      return data as UserData;
    } catch (error) {
      console.error('Error in fetchUserData:', error);
      return null;
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log("Auth state changed:", _event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch user data if user is logged in
        if (session?.user) {
          const data = await fetchUserData(session.user.id);
          setUserData(data);
          setIsAdmin(data?.role === 'admin');
        } else {
          setUserData(null);
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log("Initial session fetch:", session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const data = await fetchUserData(session.user.id);
        setUserData(data);
        setIsAdmin(data?.role === 'admin');
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Modified to use safer query that doesn't cause recursion
  const checkUserRole = async (userId: string) => {
    try {
      const userData = await fetchUserData(userId);
      setIsAdmin(userData?.role === 'admin');
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Signing in with:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Set user and session immediately
      setUser(data.user);
      setSession(data.session);
      
      if (data.user) {
        const userData = await fetchUserData(data.user.id);
        setUserData(userData);
        setIsAdmin(userData?.role === 'admin');
      }
      
      console.log("Sign in successful:", data.user?.id);
    } catch (error: any) {
      console.error("Sign in error:", error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // First clear all local state
      setUser(null);
      setSession(null);
      setUserData(null);
      setIsAdmin(false);
      
      // Then sign out from Supabase with global scope to clear all sessions
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) throw error;
      
      // Ensure localStorage is also cleared of any Supabase data
      localStorage.removeItem('supabase.auth.token');
      
      console.log("Successfully logged out");
    } catch (error: any) {
      console.error("Error during signOut:", error);
      throw new Error(error.message || 'Error signing out');
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
