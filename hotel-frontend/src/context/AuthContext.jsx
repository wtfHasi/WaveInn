import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state for error handling

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const { exp } = jwtDecode(token); // Decode the token to check expiration

        if (Date.now() >= exp * 1000) {
          localStorage.removeItem('token');
          setLoading(false); // Token expired, so remove and stop loading
          setError('Session expired. Please log in again.');
        } else {
          // Token is valid, fetch user details from the backend
          axios
            .get('http://localhost:5000/protected', {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
              setUser(res.data.user);
            })
            .catch((err) => {
              console.error('Error validating token:', err.response?.data || err.message);
              localStorage.removeItem('token');
              setError('Authentication failed. Please log in again.');
            })
            .finally(() => setLoading(false));
        }
      } catch (err) {
        console.error('Error decoding token:', err.message);
        localStorage.removeItem('token');
        setLoading(false);
        setError('Invalid token. Please log in again.');
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    setError(null); // Clear any previous errors on login
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    setError(null); // Clear errors on logout
  };

  // Add function for refreshing the token automatically
  const refreshToken = async () => {
    try {
      const res = await axios.post('http://localhost:5000/refresh-token', null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      setUser(user);
    } catch (err) {
      console.error('Error refreshing token:', err.response?.data || err.message);
      logout(); // If refresh fails, logout the user
      setError('Session expired. Please log in again.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshToken, error }}>
      {loading ? <div>Loading...</div> : children} {/* Show loading indicator until the auth state is determined */}
    </AuthContext.Provider>
  );
};
