// context/AuthContext.tsx
"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AUTHENUM, ROLENUM } from "../constants/enum.constants";

interface User {
  id?: number;
  full_name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading:boolean;
  login: (user: User) => void;
  logoutUser: () => void;
  role: string | null;
}

const AuthContext = createContext<AuthContextType | null>(
  null
);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] =
    useState<User | null>(null);
    const [loading,setLoading] = useState(true);
     const [role, setRole] = useState<string | null>(null);

useEffect(() => {
  const storedUser =
    localStorage.getItem(AUTHENUM.USER);

if (storedUser) {
  const parsedUser = JSON.parse(storedUser);
  setUser(parsedUser);
  setRole(parsedUser.role);
}

  setLoading(false);
}, []);

  const login = (userData: User) => {
    setUser(userData);
    setRole(userData.role);
    localStorage.setItem(
      AUTHENUM.USER,
      JSON.stringify(userData)
    );
  };

  const logoutUser = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem(AUTHENUM.USER);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logoutUser,
        loading,
        role
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};