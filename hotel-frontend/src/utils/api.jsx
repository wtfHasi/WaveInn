import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:5000/api';

// Fetch rooms from the API
export const fetchRooms = async () => {
  try {
    const response = await axios.get(`${API_URL}/rooms`);
    return response.data; // Return the rooms data
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw new Error('Failed to load rooms. Please try again later.');
  }
};

// Delete a room from the API
export const deleteRoom = async (roomId, token) => {
  try {
    await axios.delete(`${API_URL}/rooms/${roomId}`, {
      headers: { Authorization: `Bearer ${token}` }, // Send the token for authorization
    });
  } catch (error) {
    console.error('Error deleting room:', error);
    throw new Error('Failed to delete room. Please try again later.');
  }
};
