// components/AdminPage.js

import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <p>Manage rooms, bookings, and more.</p>

      <div className="admin-actions">
        {/* Link to add room */}
        <Link to="/add-room" className="btn">
          Add Room
        </Link>

        {/* Link to update room */}
        <Link to="/update-room/1" className="btn">
          Update Room
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
