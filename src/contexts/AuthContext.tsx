
import React from 'react';

// This is a simplified AuthContext that does nothing
// It's kept as a placeholder in case we want to add authentication back later
// For now, it prevents errors when using the useAuth hook

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
