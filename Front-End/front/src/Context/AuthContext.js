import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try to get user from localStorage on initial load
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Save user to localStorage whenever it changes
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);


  const [token, setToken] = useState(localStorage.getItem("token"));

  const fetchData = async () => {
    try {
      if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, fetchData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

