import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BGImage from './BG.jpg'; // Assuming BG image is in the components folder

const AddRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [availability, setAvailability] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect unauthorized users
  useEffect(() => {
    if (user?.role !== 'admin') {
      alert('You do not have permission to add rooms. Redirecting...');
      const timer = setTimeout(() => navigate('/'), 3000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Input validation
    if (!roomName.trim() || !type.trim() || price <= 0) {
      setError('All fields are required, and price must be a positive number.');
      setIsLoading(false);
      return;
    }

    try {
      // POST request to API
      await axios.post(
        'http://localhost:5000/api/rooms', // Hardcoded API URL
        { room_name: roomName, type, price, availability },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      setError(null); // Clear any previous errors
      alert('Room added successfully!');
      setRoomName('');
      setType('');
      setPrice('');
      setAvailability(true);
      navigate('/'); // Redirect to home page
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add room. Please try again.');
      alert(err.response?.data?.message || 'An error occurred. Please try again.');
      console.error('Error adding room:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${BGImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background for readability
          padding: '40px',
          borderRadius: '10px',
          maxWidth: '500px',
          width: '100%',
          color: '#FFF',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Add Room</h2>

        {/* Feedback Message */}
        {error && (
          <div
            style={{
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
              color: '#dc3545',
              borderRadius: '5px',
              padding: '10px',
              marginBottom: '15px',
              fontWeight: 'bold',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="room_name" style={{ textAlign: 'left', display: 'block', marginBottom: '5px' }}>
              Room Name:
            </label>
            <input
              type="text"
              id="room_name"
              placeholder="Enter Room Name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="type" style={{ textAlign: 'left', display: 'block', marginBottom: '5px' }}>
              Type:
            </label>
            <input
              type="text"
              id="type"
              placeholder="Enter Room Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="price" style={{ textAlign: 'left', display: 'block', marginBottom: '5px' }}>
              Price:
            </label>
            <input
              type="number"
              id="price"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="availability" style={{ textAlign: 'left', display: 'block', marginBottom: '5px' }}>
              Availability:
            </label>
            <select
              id="availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value === 'true')}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                outline: 'none',
              }}
            >
              <option value={true}>Available</option>
              <option value={false}>Not Available</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? '#ccc' : '#FF7F50',
              color: '#FFF',
              padding: '12px 20px',
              borderRadius: '5px',
              border: 'none',
              fontSize: '1rem',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
            }}
          >
            {isLoading ? 'Adding...' : 'Add Room'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;
