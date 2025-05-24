import React, { createContext, useState, ReactNode } from 'react';
import usersData from '../data/users.json';

type User = {
  id: string;
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  forgotPassword: (email: string) => boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(usersData);

  const login = (email: string, password: string) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const register = (email: string, password: string) => {
    const exists = users.some(u => u.email === email);
    if (exists) return false;

    const newUser: User = {
      id: (users.length + 1).toString(),
      email,
      password,
    };
    setUsers([...users, newUser]);
    setUser(newUser);
    return true;
  };

  const forgotPassword = (email: string) => {
    const exists = users.some(u => u.email === email);
    return exists;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, forgotPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
