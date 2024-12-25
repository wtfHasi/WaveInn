import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoLink}>WaveInn</Link>
      </div>
      <nav style={styles.nav}>
        {user ? (
          <>
            <Link to="/" style={styles.link}>Home</Link>
            {user.role === 'admin' && (
              <>
                <Link to="/add-room" style={styles.link}>Add Room</Link>
                <Link to="/update-room/1" style={styles.link}>Update Room</Link>
              </>
            )}
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

// Styles with modern and responsive design
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#2C3E50', // Dark blue background
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    position: 'sticky',
    top: '0',
    zIndex: '1000',
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#ECF0F1',
  },
  logoLink: {
    textDecoration: 'none',
    color: '#ECF0F1',
    transition: 'color 0.3s ease',
  },
  nav: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    color: '#ECF0F1',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  },
  logoutButton: {
    backgroundColor: '#E74C3C', // Red color for logout
    color: '#ECF0F1',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  // Hover effects
  linkHover: {
    color: '#1ABC9C',
  },
  buttonHover: {
    backgroundColor: '#C0392B',
  },
};

export default Header;

