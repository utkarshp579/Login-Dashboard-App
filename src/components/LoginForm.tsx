// src/components/LoginForm.tsx
import React, { useState } from "react";
import { graphqlRequest } from "../api/graphql";
import { useAuth } from "../auth/useAuth";
import styles from "../styles/styles";

const LoginForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const LOGIN_MUTATION = `
        mutation Login($input: UsersPermissionsLoginInput!) {
          login(input: $input) {
            jwt
            user {
              id
              username
              email
              role {
                name
              }
            }
          }
        }
`     ;  

      const data = await graphqlRequest(LOGIN_MUTATION, {
        input: formData,
      });

      const { jwt, user } = data.login;
      login(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role?.name || "user",
        },
        jwt
      );
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.title}>Login</h2>
      <div style={styles.form}>
        <input
          name="identifier"
          onChange={handleInputChange}
          value={formData.identifier}
          placeholder="Username or Email"
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          onChange={handleInputChange}
          value={formData.password}
          placeholder="Password"
          style={styles.input}
        />
        {error && <div style={styles.error}>{error}</div>}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {}),
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
      <p style={styles.switchText}>
        Don't have an account?{" "}
        <span style={styles.link} onClick={onSwitch}>
          Sign up here
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
