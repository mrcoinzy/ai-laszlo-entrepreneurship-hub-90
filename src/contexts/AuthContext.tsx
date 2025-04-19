
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { ensureAvatarsBucketExists } from '@/lib/supabase-storage';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isLoading: true
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const { data: adminData } = await supabase
            .rpc('is_admin');
          setIsAdmin(!!adminData);
        } else {
          setIsAdmin(false);
        }
        
        setIsLoading(false);
      }
    );

    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const { data: adminData } = await supabase
          .rpc('is_admin');
        setIsAdmin(!!adminData);

        ensureAvatarsBucketExists().catch(console.error);
      } else {
        setIsAdmin(false);
      }
      
      setIsLoading(false);
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, isLoading }}>
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
