import React, { useEffect, useState } from 'react';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import '../../styles/CustomerDashboard.css';

function CustomerDashboard() {
  const { user } = useAuth() || {};
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?._id) return;
      try {
        const res = await API.get(`/bookings/user/${user._id}`);
        setBookings(res.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, [user?._id]);

  const handleAcceptSuggestedService = async (bookingId) => {
    try {
      await API.put(`/bookings/${bookingId}/accept-suggested-service`);
      alert('Suggested service accepted!');
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId
            ? {
                ...b,
                serviceType: b.ownerSuggestedService
                  ? `${b.serviceType}, ${b.ownerSuggestedService}`
                  : b.serviceType,
                suggestedServiceAccepted: true,
              }
            : b
        )
      );
    } catch (error) {
      console.error('Error accepting suggested service:', error);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <h2 className="dashboard-title">My Bookings</h2>
      <div className="booking-table-container">
        {bookings.length === 0 ? (
          <p className="no-bookings">No bookings found.</p>
        ) : (
          <table className="booking-table">
            <thead>
              <tr>
                <th>Bike Brand</th>
                <th>Bike Name</th>
                <th>Booked Service</th>
                <th>Suggested Service</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.bikeBrand}</td>
                  <td>{booking.bikeName}</td>
                  <td>{booking.serviceType}</td>
                  <td>{booking.ownerSuggestedService || 'N/A'}</td>
                  <td>{booking.status}</td>
                  <td>
                    {booking.ownerSuggestedService &&
                      !booking.suggestedServiceAccepted &&
                      booking.status !== 'Completed' && (
                        <button
                          className="accept-btn"
                          onClick={() => handleAcceptSuggestedService(booking._id)}
                        >
                          Accept
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default CustomerDashboard;
