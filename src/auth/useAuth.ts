
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


// defining a custom hook
// instead of
//const { login } = useContext(AuthContext);
// write this 
// const { login } = useAuth();
