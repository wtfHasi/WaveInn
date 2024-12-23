import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaSpinner, FaTrashAlt, FaEdit } from 'react-icons/fa'; // Add icons

const RoomList = () => {
  const { user } = useAuth(); // Get user info from context
  const [rooms, setRooms] = useState([]); // State for room data
  const [error, setError] = useState(''); // State for error messages
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    // Fetch rooms data when component mounts
    axios
      .get('http://localhost:5000/api/rooms') // Ensure correct endpoint
      .then((res) => {
        setRooms(res.data); // Set room data to state
        setError(''); // Clear any previous errors
      })
      .catch((err) => {
        setError('Failed to load rooms. Please try again later.'); // Set error message
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  }, []);

  // Function to handle room deletion
  const handleDelete = (roomId) => {
    axios
      .delete(`http://localhost:5000/api/rooms/${roomId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Pass token for authentication
      })
      .then(() => {
        setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId)); // Remove deleted room from state
        setError(''); // Clear any previous errors
      })
      .catch((err) => {
        setError('Failed to delete room. Please try again later.'); // Set error message
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Available Rooms</h2>
      
      {/* Display loading state */}
      {loading && (
        <div className="flex justify-center items-center space-x-2 mb-4">
          <FaSpinner className="animate-spin text-3xl text-blue-500" />
          <p className="text-blue-500">Loading rooms...</p>
        </div>
      )}
      
      {/* Display error message if present */}
      {error && (
        <div className="flex justify-center items-center space-x-2 mb-4 text-red-500">
          <FaExclamationTriangle className="text-2xl" />
          <p>{error}</p>
        </div>
      )}
      
      {/* Display room list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No rooms available.</p>
        ) : (
          rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition-all hover:shadow-xl hover:border-blue-500"
            >
              <h3 className="text-2xl font-semibold text-gray-800">{room.room_name}</h3>
              <p className="text-gray-600">Price: ${room.price}</p>
              <p className="text-sm text-gray-500 mt-2">{room.description}</p>
              
              {/* Admin-specific actions */}
              {user?.role === 'admin' && (
                <div className="mt-4 flex justify-between items-center">
                  <Link
                    to={`/update-room/${room.id}`}
                    className="flex items-center text-blue-500 hover:text-blue-700 transition duration-300"
                  >
                    <FaEdit className="mr-2" />
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="flex items-center text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <FaTrashAlt className="mr-2" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* Admin-only option to add a new room */}
      {user?.role === 'admin' && (
        <div className="mt-6 text-center">
          <Link
            to="/add-room"
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Room
          </Link>
        </div>
      )}
    </div>
  );
};

export default RoomList;
