
import React, { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Dashboard from "./components/Dashboard";
// import Dashboard2 from "./components/DashBoard2"; 
import { useAuth } from "./auth/useAuth";
import styles from "./styles/styles";

const App: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      login(JSON.parse(userData), token);
    }
  }, []); // Run this effect only once, when the component first mounts

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <div style={styles.container}>
      {showLogin ? (
        <LoginForm onSwitch={() => setShowLogin(false)} />
      ) : (
        <SignupForm onSwitch={() => setShowLogin(true)} />
      )}
    </div>
  );
};

export default App;

