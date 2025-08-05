import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

 // import React, { useState, createContext, useContext, ReactNode } from 'react';

// // Types
// interface User {
//   id: string;
//   username: string;
//   email: string;
//   role: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (user: User, token: string) => void;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// // Auth Context
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Auth Provider
// const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   const login = (userData: User, token: string) => {
//     setUser(userData);
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   };

//   const isAuthenticated = !!user;

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Hook to use Auth Context
// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// // GraphQL API functions
// const GRAPHQL_ENDPOINT = 'http://13.200.172.225:1337/graphql';

// const graphqlRequest = async (query: string, variables?: any) => {
//   const response = await fetch(GRAPHQL_ENDPOINT, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query,
//       variables,
//     }),
//   });

//   const result = await response.json();

//   if (result.errors) {
//     throw new Error(result.errors[0].message);
//   }

//   return result.data;
// };

// // Login Component
// const LoginForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
//   const [formData, setFormData] = useState({
//     identifier: '',
//     password: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const { login } = useAuth();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const LOGIN_MUTATION = `
//         mutation Login($input: UsersPermissionsLoginInput!) {
//           login(input: $input) {
//             jwt
//             user {
//               id
//               username
//               email
//               role {
//                 name
//               }
//             }
//           }
//         }
//       `;

//       const data = await graphqlRequest(LOGIN_MUTATION, {
//         input: {
//           identifier: formData.identifier,
//           password: formData.password,
//         },
//       });

//       const { jwt, user } = data.login;

//       login(
//         {
//           id: user.id,
//           username: user.username,
//           email: user.email,
//           role: user.role?.name || 'user',
//         },
//         jwt
//       );
//     } catch (err: any) {
//       setError(err.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.formContainer}>
//       <h2 style={styles.title}>Login</h2>
//       <div style={styles.form}>
//         <div style={styles.inputGroup}>
//           <label style={styles.label}>Username or Email:</label>
//           <input
//             type="text"
//             name="identifier"
//             value={formData.identifier}
//             onChange={handleInputChange}
//             required
//             style={styles.input}
//             placeholder="Enter username or email"
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label style={styles.label}>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             required
//             style={styles.input}
//             placeholder="Enter password"
//           />
//         </div>

//         {error && <div style={styles.error}>{error}</div>}

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           style={{...styles.button, ...(loading ? styles.buttonDisabled : {})}}
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </div>

//       <p style={styles.switchText}>
//         Don't have an account?{' '}
//         <span style={styles.link} onClick={onSwitch}>
//           Sign up here
//         </span>
//       </p>
//     </div>
//   );
// };

// // Signup Component
// const SignupForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       setLoading(false);
//       return;
//     }

//     try {
//       const REGISTER_MUTATION = `
//         mutation Register($input: UsersPermissionsRegisterInput!) {
//           register(input: $input) {
//             jwt
//             user {
//               id
//               username
//               email
//               role {
//                 name
//               }
//             }
//           }
//         }
//       `;

//       const data = await graphqlRequest(REGISTER_MUTATION, {
//         input: {
//           username: formData.username,
//           email: formData.email,
//           password: formData.password,
//           role: 'sailor',
//           confirmed: true,
//         },
//       });

//       setSuccess('Account created successfully! You can now login.');
//       setFormData({
//         username: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//       });
//     } catch (err: any) {
//       setError(err.message || 'Registration failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.formContainer}>
//       <h2 style={styles.title}>Sign Up</h2>
//       <div style={styles.form}>
//         <div style={styles.inputGroup}>
//           <label style={styles.label}>Username:</label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleInputChange}
//             required
//             style={styles.input}
//             placeholder="Enter username"
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label style={styles.label}>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//             style={styles.input}
//             placeholder="Enter email"
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label style={styles.label}>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             required
//             style={styles.input}
//             placeholder="Enter password"
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label style={styles.label}>Confirm Password:</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleInputChange}
//             required
//             style={styles.input}
//             placeholder="Confirm password"
//           />
//         </div>

//         {error && <div style={styles.error}>{error}</div>}
//         {success && <div style={styles.success}>{success}</div>}

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           style={{...styles.button, ...(loading ? styles.buttonDisabled : {})}}
//         >
//           {loading ? 'Creating Account...' : 'Sign Up'}
//         </button>
//       </div>

//       <p style={styles.switchText}>
//         Already have an account?{' '}
//         <span style={styles.link} onClick={onSwitch}>
//           Login here
//         </span>
//       </p>
//     </div>
//   );
// };

// // Dashboard Component (placeholder for now)
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
//         <p>This is where you'll fetch and display user data from the user-db collection.</p>
//       </div>
//     </div>
//   );
// };

// // Main App Component
// const App: React.FC = () => {
//   const [showLogin, setShowLogin] = useState(true);
//   const { isAuthenticated, user } = useAuth();
//   const { login } = useAuth();
//   // Check for existing session on app load
//   React.useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');

//     if (token && userData) {
//       // In a real app, you'd validate the token here
//       // For now, we'll just restore the user data
//       // const { login } = useAuth();
//       login(JSON.parse(userData), token);
//     }
//   }, []);

//   if (isAuthenticated) {
//     return <Dashboard />;
//   }

//   return (
//     <div style={styles.container}>
//       {showLogin ? (
//         <LoginForm onSwitch={() => setShowLogin(false)} />
//       ) : (
//         <SignupForm onSwitch={() => setShowLogin(true)} />
//       )}
//     </div>
//   );
// };

// // Styles
// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//     backgroundColor: '#f5f5f5',
//     fontFamily: 'Arial, sans-serif',
//   },
//   formContainer: {
//     backgroundColor: 'white',
//     padding: '2rem',
//     borderRadius: '8px',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//     width: '100%',
//     maxWidth: '400px',
//   },
//   title: {
//     textAlign: 'center' as const,
//     marginBottom: '1.5rem',
//     color: '#333',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column' as const,
//   },
//   inputGroup: {
//     marginBottom: '1rem',
//   },
//   label: {
//     display: 'block',
//     marginBottom: '0.5rem',
//     color: '#555',
//     fontWeight: 'bold',
//   },
//   input: {
//     width: '100%',
//     padding: '0.75rem',
//     border: '1px solid #ddd',
//     borderRadius: '4px',
//     fontSize: '1rem',
//     boxSizing: 'border-box' as const,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     color: 'white',
//     padding: '0.75rem',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '1rem',
//     cursor: 'pointer',
//     marginTop: '1rem',
//   },
//   buttonDisabled: {
//     backgroundColor: '#6c757d',
//     cursor: 'not-allowed',
//   },
//   error: {
//     color: '#dc3545',
//     padding: '0.5rem',
//     backgroundColor: '#f8d7da',
//     border: '1px solid #f5c6cb',
//     borderRadius: '4px',
//     marginBottom: '1rem',
//   },
//   success: {
//     color: '#155724',
//     padding: '0.5rem',
//     backgroundColor: '#d4edda',
//     border: '1px solid #c3e6cb',
//     borderRadius: '4px',
//     marginBottom: '1rem',
//   },
//   switchText: {
//     textAlign: 'center' as const,
//     marginTop: '1rem',
//     color: '#666',
//   },
//   link: {
//     color: '#007bff',
//     cursor: 'pointer',
//     textDecoration: 'underline',
//   },
//   dashboard: {
//     padding: '2rem',
//     maxWidth: '1200px',
//     margin: '0 auto',
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '2rem',
//     borderBottom: '1px solid #eee',
//     paddingBottom: '1rem',
//   },
//   logoutButton: {
//     backgroundColor: '#dc3545',
//     color: 'white',
//     padding: '0.5rem 1rem',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
//   welcomeMessage: {
//     backgroundColor: '#f8f9fa',
//     padding: '1.5rem',
//     borderRadius: '8px',
//     marginBottom: '2rem',
//   },
//   placeholder: {
//     backgroundColor: '#e9ecef',
//     padding: '2rem',
//     borderRadius: '8px',
//     textAlign: 'center' as const,
//     color: '#6c757d',
//   },
// };

// // Root component with provider
// const Root: React.FC = () => {
//   return (
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   );
// };

// export default Root;





//! style before dashboard2


// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//     backgroundColor: '#f5f5f5',
//     fontFamily: 'Arial, sans-serif',
//   },
//   formContainer: {
//     backgroundColor: 'white',
//     padding: '2rem',
//     borderRadius: '8px',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//     width: '100%',
//     maxWidth: '400px',
//   },
//   title: {
//     textAlign: 'center' as const,
//     marginBottom: '1.5rem',
//     color: '#333',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column' as const,
//   },
//   inputGroup: {
//     marginBottom: '1rem',
//   },
//   label: {
//     display: 'block',
//     marginBottom: '0.5rem',
//     color: '#555',
//     fontWeight: 'bold',
//   },
//   input: {
//     width: '100%',
//     padding: '0.75rem',
//     border: '1px solid #ddd',
//     borderRadius: '4px',
//     fontSize: '1rem',
//     boxSizing: 'border-box' as const,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     color: 'white',
//     padding: '0.75rem',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '1rem',
//     cursor: 'pointer',
//     marginTop: '1rem',
//   },
//   buttonDisabled: {
//     backgroundColor: '#6c757d',
//     cursor: 'not-allowed',
//   },
//   error: {
//     color: '#dc3545',
//     padding: '0.5rem',
//     backgroundColor: '#f8d7da',
//     border: '1px solid #f5c6cb',
//     borderRadius: '4px',
//     marginBottom: '1rem',
//   },
//   success: {
//     color: '#155724',
//     padding: '0.5rem',
//     backgroundColor: '#d4edda',
//     border: '1px solid #c3e6cb',
//     borderRadius: '4px',
//     marginBottom: '1rem',
//   },
//   switchText: {
//     textAlign: 'center' as const,
//     marginTop: '1rem',
//     color: '#666',
//   },
//   link: {
//     color: '#007bff',
//     cursor: 'pointer',
//     textDecoration: 'underline',
//   },
//   dashboard: {
//     padding: '2rem',
//     maxWidth: '1200px',
//     margin: '0 auto',
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '2rem',
//     borderBottom: '1px solid #eee',
//     paddingBottom: '1rem',
//   },
//   logoutButton: {
//     backgroundColor: '#dc3545',
//     color: 'white',
//     padding: '0.5rem 1rem',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
//   welcomeMessage: {
//     backgroundColor: '#f8f9fa',
//     padding: '1.5rem',
//     borderRadius: '8px',
//     marginBottom: '2rem',
//   },
//   placeholder: {
//     backgroundColor: '#e9ecef',
//     padding: '2rem',
//     borderRadius: '8px',
//     textAlign: 'center' as const,
//     color: '#6c757d',
//   },
// };
