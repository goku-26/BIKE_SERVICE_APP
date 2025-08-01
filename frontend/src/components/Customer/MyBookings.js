import React, { useEffect, useState } from 'react';
import API from '../../api/axios';

function MyBookings() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get(`/bookings/user/${user._id}`).then((res) => setBookings(res.data));
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.map((b) => (
        <div key={b._id}>
          <p>Bike: {b.bikeBrand} - {b.bikeName}</p>
          <p>Date: {new Date(b.bookingDate).toLocaleDateString()}</p>
          <p>Status: {b.status}</p>
          {b.status === 'Completed' && (
            <p>Cost: ₹{b.cost} | Pickup: {b.pickupTime}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyBookings;