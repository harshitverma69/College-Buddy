import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const isAuthenticated = !!token;

  // Handle automatic logout when website is closed
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Clear token when user closes the website
      localStorage.removeItem('token');
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // User has switched tabs or minimized the browser
        // We could implement a timeout here if needed
      }
    };

    // Listen for page unload (closing tab/window)
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Listen for visibility changes (switching tabs, minimizing)
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup listeners
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Fetch user profile when token changes
  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      setUser(null);
      setIsVerified(false);
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsVerified(data.user.isVerified);
      } else {
        // Token is invalid, logout
        logout();
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      logout();
    }
  };

  const login = (newToken, userData) => {
    console.log('AuthContext: login function called with token:', newToken);
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
    setIsVerified(userData.isVerified);
    console.log('AuthContext: token state after login attempt:', newToken);
  };

  const logout = () => {
    console.log('AuthContext: logout function called');
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsVerified(false);
    console.log('AuthContext: token state after logout attempt: null');
  };
  
  console.log('AuthContext: Current token state:', token);
  console.log('AuthContext: Current isAuthenticated state:', isAuthenticated);
  console.log('AuthContext: Current user state:', user);

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, isVerified, login, logout }}>
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