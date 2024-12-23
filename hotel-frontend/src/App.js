import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import RoomList from './components/RoomList'; // Correct import path for RoomList
import AddRoom from './components/AddRoom';
import UpdateRoom from './components/UpdateRoom';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import './styles.css';

// Private Route Component
const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

// Route for logged-in users accessing login page
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" />; // Redirect to HomePage if already logged in
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home page for all users */}
          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route path="/RoomList" element={<RoomList />} /> {/* Updated route to /RoomList */}

          {/* Protected routes for admins */}
          <Route
            path="/add-room"
            element={
              <PrivateRoute role="admin">
                <ErrorBoundary>
                  <AddRoom />
                </ErrorBoundary>
              </PrivateRoute>
            }
          />
          <Route
            path="/update-room/:id"
            element={
              <PrivateRoute role="admin">
                <ErrorBoundary>
                  <UpdateRoom />
                </ErrorBoundary>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <ErrorBoundary>
                  <AdminPage />
                </ErrorBoundary>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;


