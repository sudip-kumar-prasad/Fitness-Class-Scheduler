import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Optionally, persist login
  useEffect(() => {
    const storedUser = localStorage.getItem("fitnessUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("fitnessUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("fitnessUser");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
