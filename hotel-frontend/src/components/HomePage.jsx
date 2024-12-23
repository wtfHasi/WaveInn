// components/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import BGImage from './BG.jpg'; // Image import

const HomePage = () => {
  return (
    <div
      className="home-page"
      style={{
        backgroundImage: `url(${BGImage})`, // Background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 0, // Remove any default margin
        padding: 0, // Remove any default padding
      }}
    >
      {/* Container for the content */}
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slightly darker background for better contrast
          padding: '30px',
          borderRadius: '10px', // Rounded corners for a softer look
          maxWidth: '600px', // Limit the width for better readability
          width: '100%',
        }}
      >
        <h1 style={styles.heading}>Welcome to Our Hotel</h1>
        <p style={styles.paragraph}>
          Explore our available rooms and make a reservation today.
        </p>

        {/* View Rooms Button with Hover Effect */}
        <Link to="/RoomList" style={styles.button}>
          View Rooms
        </Link>
      </div>
    </div>
  );
};

// Add some custom styles to improve the UI
const styles = {
  heading: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    letterSpacing: '2px',
    color: '#F0F8FF', // Alice Blue - soft, readable color
  },
  paragraph: {
    fontSize: '1.5rem',
    marginBottom: '30px',
    maxWidth: '600px',
    lineHeight: '1.6',
    color: '#D3D3D3', // Light gray for text
  },
  button: {
    backgroundColor: '#FF7F50', // Coral - warm and inviting button color
    color: '#fff',
    padding: '15px 30px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    display: 'inline-block', // Aligns the button correctly
    marginTop: '20px', // Adds space above the button
  },

  // Button hover effect with smooth scaling
  buttonHover: {
    ':hover': {
      backgroundColor: '#FF6347', // Tomato - subtle darkening effect
      transform: 'scale(1.05)',
      transition: 'transform 0.3s ease-in-out', // Smooth scaling transition
    },
  },
};

export default HomePage;

