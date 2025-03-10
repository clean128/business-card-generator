import React, { createContext, useContext, useEffect, useState } from "react";
import { User, AuthContextType } from "../types/auth";
import { useLocalStorage } from "../hooks/use-local-storage";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { addToast } from "@heroui/react";

const AuthContext = createContext<AuthContextType>({
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

  useEffect(() => {
    // Simulate loading auth state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/signin", {
        email,
        password,
      });

      const loggedInUser: User = {
        id: response.data.id,
        email: response.data.email,
        name: response.data.name,
        token: response.data.token,
      };

      addToast({
        title: "Login successful",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "success",
        radius: "sm",
      });

      setUser(loggedInUser);
    } catch (error: any) {
      // Handle API errors
      addToast({
        title: error.response.data.message || "Something went wrong",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "danger",
        radius: "sm",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        username: name,
        email,
        password,
      });

      console.log("Response:", response.data);

      const loggedInUser: User = {
        id: response.data.id,
        email,
        name,
        token: response.data.token,
      };

      addToast({
        title: "Signup successful",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "success",
        radius: "sm",
      });

      setUser(loggedInUser);
    } catch (error: any) {
      // Handle API errors
      addToast({
        title: error.response.data.message || "Something went wrong",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "danger",
        radius: "sm",
      });

      console.error("Sign in error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await axios.delete("http://localhost:5000/signout");

      addToast({
        title: "Signout successful",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "success",
        radius: "sm",
      });

      setUser(null);
    } catch (error: any) {
      // Handle API errors
      console.error("Sign in error:", error);

      addToast({
        title: error.response.data.message || "Something went wrong",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "danger",
        radius: "sm",
      });
      throw error;
    } finally {
      setLoading(false);
    }
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
