import { createContext, useState } from "react";
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState("");
  return (
    <AuthContext.Provider value={{ user, setuser }}>
      {children}
    </AuthContext.Provider>
  );
};

/* 
Why no two default exports:
Each file is a module and has only one default slot — think of it like a box with one main item.

Why named exports can be multiple: // named exports = labeled items, can have as many as you want
Each one has its own name so no confusion — default has no name so only one allowed.
*/