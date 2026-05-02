import axios from 'axios';
import { createContext, useContext, useState, ReactNode } from 'react';
import api from '../lib/axios';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

interface AuthUser {
  id: number;
  email: string;
  name: string;
  phone: string;
  is_staff: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, phone: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('customerToken')
  );
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('customerUser');
    return saved ? JSON.parse(saved) : null;
  });

  const fetchMe = async (accessToken: string): Promise<AuthUser> => {
    const { data } = await axios.get(`${BASE_URL}/api/auth/me/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data as AuthUser;
  };

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/api/auth/login/', { email, password });
    const access: string = data.access;
    const me = await fetchMe(access);
    if (me.is_staff) throw new Error('staff');
    setToken(access);
    setUser(me);
    localStorage.setItem('customerToken', access);
    localStorage.setItem('customerUser', JSON.stringify(me));
  };

  const signup = async (name: string, phone: string, email: string, password: string) => {
    // Use plain axios (no auth interceptor) so an expired token in localStorage
    // doesn't cause SimpleJWT to reject the unauthenticated signup request with 401.
    await axios.post(`${BASE_URL}/api/auth/signup/`, { name, phone, email, password });
    await login(email, password);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('customerToken');
    localStorage.removeItem('customerUser');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
