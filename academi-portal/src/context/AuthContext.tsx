import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService, type ApiResponse } from "@/services/api";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut as firebaseSignOut, getIdToken } from "firebase/auth";

export type UserRole = "admin" | "faculty" | "student" | null;

interface UserProfile {
  _id?: string;
  fullName: string;
  email: string;
  role: UserRole;
  department?: string;
  employeeId?: string;
  studentId?: string;
  academicYear?: string;
  organization?: string;
  designation?: string;
  specialization?: string;
  rollNumber?: string;
  semester?: number;
  status?: string;
  profileCompleted?: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  role: UserRole;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  selectRole: (role: UserRole) => Promise<void>;
  completeProfile: (profile: Partial<UserProfile>) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On app load, restore session from stored JWT token
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const data: ApiResponse = await authService.getMe();
          if (data?.user) {
            setUser(data.user as UserProfile);
            setRole((data.user.role as UserRole) || null);
            setIsAuthenticated(true);
          }
        } catch {
          // Token is invalid or expired – clear it quietly
          localStorage.removeItem("token");
        }
      }
      setIsLoading(false);
    };
    restoreSession();
  }, []);

  const login = async (email: string, password: string) => {
    const data: ApiResponse = await authService.login({ email, password });
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    setIsAuthenticated(true);
    setUser((data.user as UserProfile) ?? null);
    setRole((data.user?.role as UserRole) ?? null);
  };

  const signup = async (name: string, email: string, password: string) => {
    const data: ApiResponse = await authService.signup({ fullName: name, email, password });
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    setIsAuthenticated(true);
    setUser((data.user as UserProfile) ?? null);
    setRole((data.user?.role as UserRole) ?? null);
  };

  const selectRole = async (selectedRole: UserRole) => {
    const data: ApiResponse = await authService.selectRole(selectedRole as string);
    setRole(selectedRole);
    if (data?.user) {
      setUser(data.user as UserProfile);
    } else if (user) {
      setUser({ ...user, role: selectedRole });
    }
  };

  const completeProfile = async (profile: Partial<UserProfile>) => {
    const data: ApiResponse = await authService.completeProfile(profile as Record<string, any>);
    if (data?.user) {
      setUser(data.user as UserProfile);
      setRole((data.user.role as UserRole) ?? null);
    } else if (user) {
      setUser({ ...user, ...profile, profileCompleted: true });
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
    // Also sign out from Firebase (clears Google session)
    try { await firebaseSignOut(auth); } catch { /* ignore */ }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, role, isLoading, login, signup, selectRole, completeProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
