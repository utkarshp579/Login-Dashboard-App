
import React, { createContext, useState, ReactNode } from "react";

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create a context to hold auth-related data and functions
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null); // to store loggedin status of user  

  const login = (userData: User, token: string) => { 
      // * set userdata , store related info in localStorage
    setUser(userData);
    localStorage.setItem("token", token); // persist token in Local storage
    localStorage.setItem("user", JSON.stringify(userData)); // stringify :- Converts a JavaScript value to a JavaScript Object Notation (JSON) strin
  };

  const logout = () => {
      // * setuser to null , delete relevant info
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const isAuthenticated = !!user;

  return (
    // The context provider makes user, login, logout, and isAuthenticated available to any child component using useContext(AuthContext).
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
