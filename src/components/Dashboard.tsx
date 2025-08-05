// src/components/Dashboard.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import styles from "../styles/styles";

interface UserData {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt?: string;
  lastLogin?: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    department?: string;
    position?: string;
  };
  preferences?: {
    theme?: string;
    notifications?: boolean;
    language?: string;
  };
  stats?: {
    loginCount?: number;
    lastActivity?: string;
    accountStatus?: string;
  };
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching additional user data from user-db collection
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // In a real app, you would fetch from your API
        // const response = await fetch(`/api/users/${user?.id}`);
        // const data = await response.json();

        // Mock extended user data for demonstration
        const mockExtendedData: UserData = {
          id: user?.id || "1",
          username: user?.username || "johndoe",
          email: user?.email || "john@example.com",
          role: user?.role || "user",
          createdAt: "2024-01-15T10:30:00Z",
          lastLogin: "2024-08-05T08:45:00Z",
          profile: {
            firstName: "John",
            lastName: "Doe",
            phone: "+1 (555) 123-4567",
            address: "123 Main St, City, State 12345",
            department: "Engineering",
            position: "Senior Developer",
          },
          preferences: {
            theme: "light",
            notifications: true,
            language: "en",
          },
          stats: {
            loginCount: 47,
            lastActivity: "2024-08-05T09:15:00Z",
            accountStatus: "active",
          },
        };

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setUserData(mockExtendedData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch user data");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return "N/A";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    return String(value);
  };

  const renderDataTable = () => {
    if (!userData) return null;

    const tableData = [
      { label: "User ID", value: userData.id },
      { label: "Username", value: userData.username },
      { label: "Email", value: userData.email },
      { label: "Role", value: userData.role },
      {
        label: "Account Created",
        value: userData.createdAt ? formatDate(userData.createdAt) : "N/A",
      },
      {
        label: "Last Login",
        value: userData.lastLogin ? formatDate(userData.lastLogin) : "N/A",
      },
      { label: "First Name", value: userData.profile?.firstName },
      { label: "Last Name", value: userData.profile?.lastName },
      { label: "Phone", value: userData.profile?.phone },
      { label: "Address", value: userData.profile?.address },
      { label: "Department", value: userData.profile?.department },
      { label: "Position", value: userData.profile?.position },
      { label: "Theme", value: userData.preferences?.theme },
      { label: "Notifications", value: userData.preferences?.notifications },
      { label: "Language", value: userData.preferences?.language },
      { label: "Login Count", value: userData.stats?.loginCount },
      {
        label: "Last Activity",
        value: userData.stats?.lastActivity
          ? formatDate(userData.stats.lastActivity)
          : "N/A",
      },
      { label: "Account Status", value: userData.stats?.accountStatus },
    ];

    return (
      <div style={styles.tableContainer}>
        <h3 style={styles.sectionTitle}>User Information</h3>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.tableHeader}>Field</th>
              <th style={styles.tableHeader}>Value</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr
                key={index}
                style={
                  index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
                }
              >
                <td style={styles.tableCell}>{item.label}</td>
                <td style={styles.tableCell}>{formatValue(item.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderStatsCards = () => {
    if (!userData?.stats) return null;

    return (
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h4 style={styles.statTitle}>Total Logins</h4>
          <p style={styles.statValue}>{userData.stats.loginCount || 0}</p>
        </div>
        <div style={styles.statCard}>
          <h4 style={styles.statTitle}>Account Status</h4>
          <p
            style={{
              ...styles.statValue,
              color:
                userData.stats.accountStatus === "active"
                  ? "#28a745"
                  : "#dc3545",
            }}
          >
            {userData.stats.accountStatus?.toUpperCase() || "UNKNOWN"}
          </p>
        </div>
        <div style={styles.statCard}>
          <h4 style={styles.statTitle}>Member Since</h4>
          <p style={styles.statValue}>
            {userData.createdAt
              ? new Date(userData.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.dashboard}>
      <div style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <button style={styles.logoutButton} onClick={logout}>
          Logout
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.welcomeMessage}>
        <h2>
          Welcome back, {userData?.profile?.firstName || userData?.username}! 👋
        </h2>
        <p>Here's your account overview and latest information.</p>
      </div>

      {renderStatsCards()}
      {renderDataTable()}

      <div style={styles.actionsContainer}>
        <button style={styles.primaryButton}>Edit Profile</button>
        <button style={styles.secondaryButton}>Download Data</button>
        <button style={styles.secondaryButton}>Account Settings</button>
      </div>
    </div>
  );
};

export default Dashboard;
// // src/components/Dashboard.tsx
// import React from "react";
// import { useAuth } from "../auth/useAuth";
// import styles from "../styles/styles";

// const Dashboard: React.FC = () => {
//   const { user, logout } = useAuth();

//   return (
//     <div style={styles.dashboard}>
//       <div style={styles.header}>
//         <h1>Dashboard</h1>
//         <button onClick={logout} style={styles.logoutButton}>
//           Logout
//         </button>
//       </div>

//       <div style={styles.welcomeMessage}>
//         <h2>Welcome, {user?.username}!</h2>
//         <p>Email: {user?.email}</p>
//         <p>Role: {user?.role}</p>
//         <p>User ID: {user?.id}</p>
//       </div>

//       <div style={styles.placeholder}>
//         <p>Dashboard features will be implemented in the next part.</p>
//         <p>
//           This is where you'll fetch and display user data from the user-db
//           collection.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
