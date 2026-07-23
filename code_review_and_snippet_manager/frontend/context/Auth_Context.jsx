import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = useContext(null);

// Creating a custom hook for consuming context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // States
  const [User, setUser] = useState("");
  const [Role, setRole] = useState("");
  const [isAuthenticated, setisAuthenticated] = useState(false);

  useEffect(() => {
    // we fecth user data here when user logs in and send the fecthed data to user dashboard
  }, []);
  
  const data = {
    User,
    setUser,
    Role,
    setRole,
    isAuthenticated,
    setisAuthenticated,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
