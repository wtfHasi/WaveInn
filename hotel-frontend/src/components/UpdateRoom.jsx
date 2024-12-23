import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BGImage from './BG.jpg'; // Assuming BG image is in the components folder

const UpdateRoom = () => {
  const { id } = useParams(); // Get room ID from URL
  const { user } = useAuth(); // Get user details
  const [room, setRoom] = useState({
    room_name: '',
    type: '',
    price: '',
    availability: true,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if user is not an admin
  useEffect(() => {
    if (user?.role !== 'admin') {
      alert('You do not have permission to update rooms. Redirecting...');
      const timer = setTimeout(() => navigate('/'), 3000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  // Fetch room data on mount
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/rooms/${id}`)
      .then((res) => setRoom(res.data))
      .catch((err) => {
        console.error('Error fetching room:', err);
        setError('Failed to fetch room details. Please try again.');
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Input validation
    if (!room.room_name.trim() || !room.type.trim() || room.price <= 0) {
      setError('All fields are required, and price must be a positive number.');
      setIsLoading(false);
      return;
    }

    try {
      await axios.patch(
        `http://localhost:5000/api/rooms/${id}/status`, // Hardcoded URL
        room,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      setError(null); // Clear any previous errors
      alert('Room updated successfully!');
      navigate('/'); // Redirect to home page
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update room. Please try again.');
      console.error('Error updating room:', err);
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
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Update Room</h2>

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
            <label
              htmlFor="room_name"
              style={{ textAlign: 'left', display: 'block', marginBottom: '5px' }}
            >
              Room Name:
            </label>
            <input
              type="text"
              id="room_name"
              placeholder="Enter Room Name"
              value={room.room_name || ''}
              onChange={(e) => setRoom({ ...room, room_name: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                outline: 'none',
                marginBottom: '15px',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="type"
              style={{ textAlign: 'left', display: 'block', marginBottom: '5px' }}
            >
              Type:
            </label>
            <input
              type="text"
              id="type"
              placeholder="Enter Room Type"
              value={room.type || ''}
              onChange={(e) => setRoom({ ...room, type: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                outline: 'none',
                marginBottom: '15px',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="price"
              style={{ textAlign: 'left', display: 'block', marginBottom: '5px' }}
            >
              Price:
            </label>
            <input
              type="number"
              id="price"
              placeholder="Enter Price"
              value={room.price || ''}
              onChange={(e) => setRoom({ ...room, price: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                outline: 'none',
                marginBottom: '15px',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="availability"
              style={{ textAlign: 'left', display: 'block', marginBottom: '5px' }}
            >
              Availability:
            </label>
            <select
              id="availability"
              value={room.availability}
              onChange={(e) => setRoom({ ...room, availability: e.target.value === 'true' })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                outline: 'none',
                marginBottom: '20px',
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
              padding: '14px 24px',
              borderRadius: '5px',
              border: 'none',
              fontSize: '1.1rem',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            {isLoading ? 'Updating...' : 'Update Room'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoom;

