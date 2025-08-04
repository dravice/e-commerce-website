import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Logout user
  const logout = useCallback(() => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Remove auth header
    delete axios.defaults.headers.common['Authorization'];
    
    setCurrentUser(null);
    setIsAuthenticated(false);
    setLoading(false);
  }, []);

  // Fetch user profile
  const fetchUserProfile = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/profile');
      setCurrentUser(res.data);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user profile', error);
      logout();
    }
  }, [logout]);

  useEffect(() => {
    // Check if user is logged in on page load
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Check if token is expired
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        if (decodedToken.exp < currentTime) {
          // Token expired, logout user
          logout();
        } else {
          // Set auth token header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          // Get user data
          fetchUserProfile();
        }
      } catch (error) {
        console.error('Invalid token', error);
        logout();
      }
    } else {
      setLoading(false);
    }
  }, [fetchUserProfile, logout]);

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post('http://localhost:5000/api/users/register', userData);
      
      // Save token to localStorage
      localStorage.setItem('token', res.data.token);
      
      // Set auth token header
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      setCurrentUser(res.data);
      setIsAuthenticated(true);
      setLoading(false);
      return res.data;
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  // Login user
  const login = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post('http://localhost:5000/api/users/login', userData);
      
      // Save token to localStorage
      localStorage.setItem('token', res.data.token);
      
      // Set auth token header
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      setCurrentUser(res.data);
      setIsAuthenticated(true);
      setLoading(false);
      return res.data;
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.put('http://localhost:5000/api/users/profile', userData);
      
      // Update token if returned
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      }
      
      setCurrentUser(res.data);
      setLoading(false);
      return res.data;
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Profile update failed');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};