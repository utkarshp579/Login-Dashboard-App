// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import Root from "./App"; // or wherever your Root component is

// const root = ReactDOM.createRoot(document.getElementById("root")!);
// root.render(
//   <React.StrictMode>
//     <Root />
//   </React.StrictMode>
// );
