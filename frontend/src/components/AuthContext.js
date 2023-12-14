import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(
    sessionStorage.getItem('isLoggedIn') === 'true'
  );
  const [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem('userInfo'))
  );

  const login = (userData) => {
    setLoggedIn(true);
    setUserInfo(userData);
    sessionStorage.setItem('isLoggedIn', true);
    sessionStorage.setItem('userInfo', userData);
  };
  
  const logout = () => {
    setLoggedIn(false);
    setUserInfo(null);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
