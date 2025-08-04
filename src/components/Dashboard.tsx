// src/components/Dashboard.tsx
import React from "react";
import { useAuth } from "../auth/useAuth";
import styles from "../styles/styles";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div style={styles.dashboard}>
      <div style={styles.header}>
        <h1>Dashboard</h1>
        <button onClick={logout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      <div style={styles.welcomeMessage}>
        <h2>Welcome, {user?.username}!</h2>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
        <p>User ID: {user?.id}</p>
      </div>

      <div style={styles.placeholder}>
        <p>Dashboard features will be implemented in the next part.</p>
        <p>
          This is where you'll fetch and display user data from the user-db
          collection.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
