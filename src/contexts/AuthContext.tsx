
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { ensureAvatarsBucketExists } from '@/lib/supabase-storage';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAdmin: false,
  isLoading: true
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Setup auth state change listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        // Update session and user synchronously
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // If session exists, check admin status in a setTimeout to avoid potential Supabase deadlock
        if (newSession?.user) {
          setTimeout(async () => {
            try {
              const { data: adminData, error } = await supabase.rpc('is_admin');
              if (error) throw error;
              setIsAdmin(!!adminData);
            } catch (error) {
              console.error('Error checking admin status:', error);
              setIsAdmin(false);
            } finally {
              setIsLoading(false);
            }
          }, 0);
        } else {
          setIsAdmin(false);
          setIsLoading(false);
        }
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          try {
            const { data: adminData, error: adminError } = await supabase.rpc('is_admin');
            if (adminError) throw adminError;
            setIsAdmin(!!adminData);
            
            ensureAvatarsBucketExists().catch(console.error);
          } catch (adminError) {
            console.error('Error checking admin status:', adminError);
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        toast.error('Authentication error. Please try refreshing the page.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Clean up subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, isLoading }}>
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
