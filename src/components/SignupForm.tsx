// src/components/SignupForm.tsx
import React, { useState } from "react";
import { graphqlRequest } from "../api/graphql";
import styles from "../styles/styles";

const SignupForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const REGISTER_MUTATION = `
        mutation Register($input: UsersPermissionsRegisterInput!) {
          register(input: $input) {
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
      `;

      await graphqlRequest(REGISTER_MUTATION, {
        input: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: "sailor",
          confirmed: true,
        },
      });

      setSuccess("Account created successfully! You can now login.");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.title}>Sign Up</h2>
      <div style={styles.form}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
          style={styles.input}
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm Password"
          required
          style={styles.input}
        />

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {}),
          }}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </div>

      <p style={styles.switchText}>
        Already have an account?{" "}
        <span style={styles.link} onClick={onSwitch}>
          Login here
        </span>
      </p>
    </div>
  );
};

export default SignupForm;
