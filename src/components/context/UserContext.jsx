// create user context in javascript

import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getUserFromLocalStorage();
    setUser(user);
  }, []);

  const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  const setUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, setUserToLocalStorage, removeUserFromLocalStorage }}>
      {children}
    </UserContext.Provider>
  );
}
