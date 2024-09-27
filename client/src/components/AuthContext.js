// src/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Create Context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = (props) => {
  const [token, setToken] = useState(""); // Change initial state to an empty string
  const login = (token) => {
    setToken(token);
  };
  const logout = () => {
    setToken("");
  };
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
