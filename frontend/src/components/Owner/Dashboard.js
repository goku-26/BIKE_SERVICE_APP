import React, { useEffect, useState } from 'react';
import API from '../../api/axios';
import '../../styles/OwnerDashboard.css';

function OwnerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [editModeId, setEditModeId] = useState(null);
  const [suggestedService, setSuggestedService] = useState('');

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

  const handleStatusUpdate = async (bookingId) => {
    const cost = prompt("Enter service cost:");
    const pickupTime = prompt("Enter pickup time:");
    const pickupDate = prompt("Enter pickup date:");

    try {
      await API.put(`/bookings/${bookingId}/status`, {
        status: 'Completed',
        cost,
        pickupTime,
        pickupDate,
      });

      alert('Booking updated and email sent!');
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: 'Completed' } : b
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleSuggestService = async (bookingId) => {
    try {
      await API.put(`/bookings/${bookingId}/suggest-service`, {
        suggestedService,
      });

      alert('Suggested service saved!');
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, suggestedService } : b
        )
      );
      setEditModeId(null);
      setSuggestedService('');
    } catch (error) {
      console.error("Error suggesting service:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Customer Booking Details</h2>
      <div className="table-wrapper">
        <table className="booking-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Bike Brand</th>
              <th>Bike Name</th>
              <th>Service</th>
              <th>Status</th>
              <th>Suggested Service</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.customerName}</td>
                <td>{b.email}</td>
                <td>{b.bikeBrand}</td>
                <td>{b.bikeName}</td>
                <td>{b.serviceType}</td>
                <td>{b.status}</td>
                <td>
                  {editModeId === b._id ? (
                    <>
                      <input
                        type="text"
                        value={suggestedService}
                        onChange={(e) => setSuggestedService(e.target.value)}
                        placeholder="e.g. Lubrication of Chain"
                      />
                      <button
                        className="save-btn"
                        onClick={() => handleSuggestService(b._id)}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    b.suggestedService || 'N/A'
                  )}
                </td>
                <td>
                  {b.status !== 'Completed' && (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => setEditModeId(b._id)}
                      >
                        Suggest Service
                      </button>
                      <button
                        className="mark-complete-button"
                        onClick={() => handleStatusUpdate(b._id)}
                      >
                        Mark as Completed
                      </button>
                    </>
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

export default OwnerDashboard;
