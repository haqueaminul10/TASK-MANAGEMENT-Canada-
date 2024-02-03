"use client";

import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: "", token: "" });
  useEffect(() => {
    const data = localStorage.getItem(`auth`);
    if (data) {
      const dataParse = JSON.parse(data);
      setAuth({
        user: dataParse.user,
        token: dataParse.token,
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
