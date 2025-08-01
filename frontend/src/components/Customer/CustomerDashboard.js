import React, { useEffect, useState } from 'react';
import API from '../../api/axios';
import '../../styles/CustomerDashboard.css';

function CustomerDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get('/bookings');
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const handleAcceptSuggestedService = async (bookingId) => {
    try {
      await API.put(`/bookings/${bookingId}/accept-suggested-service`);
      alert('Suggested service accepted!');
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId
            ? { ...b, service: `${b.service}, ${b.suggestedService}`, suggestedService: '' }
            : b
        )
      );
    } catch (error) {
      console.error("Error accepting suggested service:", error);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <h2 className="dashboard-title">My Bookings</h2>
      <div className="booking-table-container">
        <table className="booking-table">
          <thead>
            <tr>
              <th>Bike Brand</th>
              <th>Bike Name</th>
              <th>Service</th>
              <th>Suggested Service</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.bikeBrand}</td>
                <td>{b.bikeName}</td>
                <td>{b.service}</td>
                <td>{b.suggestedService || 'N/A'}</td>
                <td>{b.status}</td>
                <td>
                  {b.suggestedService && b.status !== 'Completed' && (
                    <button
                      className="accept-btn"
                      onClick={() => handleAcceptSuggestedService(b._id)}
                    >
                      Accept
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerDashboard;
