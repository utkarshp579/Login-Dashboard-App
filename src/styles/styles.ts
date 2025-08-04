// src/styles/styles.ts
// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "100vh",
//     backgroundColor: "#f5f5f5",
//     fontFamily: "Arial, sans-serif",
//   },
//   formContainer: {
//     backgroundColor: "white",
//     padding: "2rem",
//     borderRadius: "8px",
//     boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//     width: "100%",
//     maxWidth: "400px",
//   },
//   // ...rest of your styles
// };
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center' as const,
    marginBottom: '1.5rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#555',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box' as const,
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
    cursor: 'not-allowed',
  },
  error: {
    color: '#dc3545',
    padding: '0.5rem',
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  success: {
    color: '#155724',
    padding: '0.5rem',
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  switchText: {
    textAlign: 'center' as const,
    marginTop: '1rem',
    color: '#666',
  },
  link: {
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  dashboard: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    borderBottom: '1px solid #eee',
    paddingBottom: '1rem',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  welcomeMessage: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem',
  },
  placeholder: {
    backgroundColor: '#e9ecef',
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center' as const,
    color: '#6c757d',
  },
};

export default styles;
