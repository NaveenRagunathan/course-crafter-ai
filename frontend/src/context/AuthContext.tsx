import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { authApi } from '../services/api';

export interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  providerData?: any[];
  roles?: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  roles: string[];
  refreshUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user from backend
  const refreshUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authApi.getMe();
      setUser(response as User);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // Login
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await authApi.login(email, password);
      await refreshUser();
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await authApi.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = !!user;
  const isEmailVerified = !!user?.emailVerified;
  const roles = user?.roles || [];

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, isEmailVerified, roles, refreshUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
