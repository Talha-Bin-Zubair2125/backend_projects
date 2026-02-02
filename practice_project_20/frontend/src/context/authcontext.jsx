import { createContext, useState } from "react";

// Create Context
export const AuthContext = createContext(null);

// Create Provider -- in which we wrapped context and user state and it's function so that app and all it's components when need the context consumes it
export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null); // logged-in user
  const [users, setUsers] = useState([]); // all users (admin)
  const [tasks, setTasks] = useState([]); // for tasks
  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, users, setUsers, tasks, setTasks }}
    >
      {children}
    </AuthContext.Provider>
  );
};
