// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../src/lib/firebase';
import { useNavigation } from './NavigationContext';

type UserProfile = {
  uid: string;
  email: string | null;
  role: 'admin' | 'customer';
};

type AuthContextType = {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, pass: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading,HvLoading] = useState(true);
  const { setView } = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Simple logic: If email contains 'admin', they are admin. 
        // In production, use Firebase Custom Claims or a 'users' collection in Firestore.
        const role = currentUser.email?.includes('admin') ? 'admin' : 'customer';
        setUser({ uid: currentUser.uid, email: currentUser.email, role });
      } else {
        setUser(null);
      }
      HvLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
    const role = email.includes('admin') ? 'admin' : 'customer';
    if (role === 'admin') setView('admin');
    else setView('home');
  };

  const register = async (email: string, pass: string) => {
    await createUserWithEmailAndPassword(auth, email, pass);
    setView('home');
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setView('login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};