import { createContext, useState } from "react";

// First we have to create a context
export const AuthContext = createContext(null);
// After Creating the Context Wrap the Context in Context Provider
// {children} -- it is a special react prop that represents components not data (children -- <App/>)
export const AuthProvider = ({ children }) => {
  // States
  const [loggedinuser, setloggedinuser] = useState(null);
  const [users, setusers] = useState([]);
  return (
    <AuthContext.Provider
      value={{ loggedinuser, setloggedinuser, users, setusers }}
    >
      {children}
    </AuthContext.Provider>
  );
};
