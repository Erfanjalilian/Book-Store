"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// تعریف نوع اطلاعات کاربر
interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
}

// نوع برای مقدار کانتکس
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// مقدار پیش‌فرض کانتکس
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// کامپوننت Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// هوک برای استفاده از کانتکس
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
