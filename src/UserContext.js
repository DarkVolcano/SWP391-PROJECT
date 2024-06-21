import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    setLoginMessage("");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, loginMessage, setLoginMessage, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
