// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Effect to run once when the component is mounted
  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decode the token and set the user accordingly
        const decodedUser = jwt.decode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Error decoding token:", error);
        // Handle the error as needed (e.g., logout)
        logout();
      }
    }
  }, []); // Empty dependency array ensures this effect runs only once

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token); // Save the token to localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
