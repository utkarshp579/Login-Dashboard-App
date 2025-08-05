import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth"; // adjust path as per your folder structure
import { graphqlRequest } from "../api/graphql"; // adjust path as per your folder structure

const USERDB_QUERY = `
  query UserDbs {
    userDbs {
      documentId
      Name
      DOB
      email
      phone
      is_active
      createdAt
      updatedAt
      publishedAt
    }
  }
`;

const DashBoard2: React.FC = () => {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDb = async () => {
      try {
        const data = await graphqlRequest(USERDB_QUERY);
        setUserData(data.userDbs);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDb();
  }, []);

  return (
    <div style={styles.dashboard}>
      <div style={styles.header}>
        <h1>User Dashboard</h1>
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

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((u, index) => (
              <tr key={index}>
                <td>{u.documentId}</td>
                <td>{u.Name}</td>
                <td>{u.DOB}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.is_active ? "Active" : "Inactive"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  dashboard: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    borderBottom: "1px solid #eee",
    paddingBottom: "1rem",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  welcomeMessage: {
    backgroundColor: "#f8f9fa",
    padding: "1.5rem",
    borderRadius: "8px",
    marginBottom: "2rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginTop: "1rem",
  },
  th: {
    borderBottom: "1px solid #ccc",
    padding: "0.5rem",
    textAlign: "left" as const,
    backgroundColor: "#f1f1f1",
  },
  td: {
    borderBottom: "1px solid #ddd",
    padding: "0.5rem",
  },
};

export default DashBoard2;
