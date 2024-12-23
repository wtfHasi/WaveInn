import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BGImage from './BG.jpg'; // Assuming BG image is in the components folder

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      setFeedback({ message: 'Registration successful! Redirecting...', type: 'success' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setFeedback({ message: 'Registration failed. Please try again.', type: 'error' });
    }
  };

  return (
    <div
      className="register-page"
      style={{
        backgroundImage: `url(${BGImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0',
        margin: '0',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background for readability
          padding: '40px',
          borderRadius: '10px',
          maxWidth: '400px',
          width: '100%',
          color: '#FFF',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Register</h2>

        {/* Feedback Message */}
        {feedback.message && (
          <div
            style={{
              backgroundColor: feedback.type === 'success' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)',
              color: feedback.type === 'success' ? '#28a745' : '#dc3545',
              borderRadius: '5px',
              padding: '10px',
              marginBottom: '15px',
              fontWeight: 'bold',
            }}
          >
            {feedback.message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="name" style={{ textAlign: 'left', display: 'block', marginBottom: '5px' }}>
              Name:
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                outline: 'none',
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ textAlign: 'left', display: 'block', marginBottom: '5px' }}>
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                outline: 'none',
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ textAlign: 'left', display: 'block', marginBottom: '5px' }}>
              Password:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                outline: 'none',
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: '#FF7F50',
              color: '#FFF',
              padding: '12px 20px',
              borderRadius: '5px',
              border: 'none',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
