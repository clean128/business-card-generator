import React, { useContext, useEffect, useState } from "react";
import { User, AuthContextType } from "../types/auth";
import { useLocalStorage } from "../hooks/use-local-storage";
import { v4 as uuidv4 } from "uuid";

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useLocalStorage<User | null>("auth-user", null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useLocalStorage<
    Record<
      string,
      { email: string; password: string; name: string; id: string }
    >
  >("users", {});

  useEffect(() => {
    // Simulate loading auth state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const userRecord = Object.values(users).find((u) => u.email === email);

    if (!userRecord || userRecord.password !== password) {
      setLoading(false);
      throw new Error("Invalid email or password");
    }

    const loggedInUser: User = {
      id: userRecord.id,
      email: userRecord.email,
      name: userRecord.name,
    };

    setUser(loggedInUser);
    setLoading(false);
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const existingUser = Object.values(users).find((u) => u.email === email);

    if (existingUser) {
      setLoading(false);
      throw new Error("Email already in use");
    }

    const userId = uuidv4();
    const newUser = { id: userId, email, password, name };

    setUsers((prev) => ({
      ...prev,
      [userId]: newUser,
    }));

    const loggedInUser: User = {
      id: userId,
      email,
      name,
    };

    setUser(loggedInUser);
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    setUser(null);
    setLoading(false);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
