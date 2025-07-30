import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const isAuthenticated = !!token; // Derived from token state

  // useEffect for initial load is no longer needed for isAuthenticated,
  // as it's derived. Token is initialized from localStorage directly.
  console.log('AuthContext: Initial token from localStorage:', localStorage.getItem('token'));
  console.log('AuthContext: Initial isAuthenticated:', isAuthenticated);

  const login = (newToken) => {
    console.log('AuthContext: login function called with token:', newToken);
    localStorage.setItem('token', newToken);
    setToken(newToken); // isAuthenticated will update as it's derived from token
    console.log('AuthContext: token state after login attempt:', newToken);
  };

  const logout = () => {
    console.log('AuthContext: logout function called');
    localStorage.removeItem('token');
    setToken(null); // isAuthenticated will update as it's derived from token
    console.log('AuthContext: token state after logout attempt: null');
    // Optionally, redirect to home or login page
    // window.location.href = '/signin';
  };
  
  console.log('AuthContext: Current token state:', token);
  console.log('AuthContext: Current isAuthenticated state:', isAuthenticated);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};