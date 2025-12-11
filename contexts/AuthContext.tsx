import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigation } from './NavigationContext';

type User = {
  name: string;
  email: string;
  role: 'admin' | 'customer';
} | null;

type AuthContextType = {
  user: User;
  login: (email: string) => void;
  logout: () => void;
  register: (email: string, name: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const { setView } = useNavigation();

  const login = (email: string) => {
    const role: 'admin' | 'customer' = email.includes('admin') ? 'admin' : 'customer';
    const name = role === 'admin' ? 'Admin User' : 'Demo User';
    
    const mockUser = { name, email, role };
    setUser(mockUser);
    
    if (role === 'admin') {
      setView('admin');
    } else {
      setView('home');
    }
  };

  const register = (email: string, name: string) => {
    const newUser = { name, email, role: 'customer' as const };
    setUser(newUser);
    setView('home');
  };

  const logout = () => {
    setUser(null);
    setView('login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within a AuthProvider');
  return context;
};