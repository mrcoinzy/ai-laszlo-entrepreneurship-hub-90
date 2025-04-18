
import React from 'react';

// Simple AuthContext that does nothing but provides the required context
// to prevent errors in components that might still reference it

interface AuthContextType {
  user: null;
  isAdmin: boolean;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  isAdmin: false
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthContext.Provider value={{ user: null, isAdmin: false }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
