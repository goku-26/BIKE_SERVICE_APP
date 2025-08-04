import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import '../../styles/BookingForm.css';

function BookingForm() {
  const [form, setForm] = useState({
    bikeBrand: '',
    bikeName: '',
    serviceType: '',
    bookingDate: ''
  });

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const services = [
    'General Service',
    'Oil Change',
    'Wiring or Electrical Related',
    'Brake Repair',
    'Sensor Repair'
  ];

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const checkExistingBooking = async () => {
      if (!user?.email) return;
      try {
        const response = await API.get(`/bookings/customer/${user.email}`);
        if (Array.isArray(response.data) && response.data.some(b => b.serviceType)) {
          navigate('/customer-dashboard');
        }
      } catch (error) {
        console.error('Error checking booking:', error);
      }
    };
    checkExistingBooking();
  }, [navigate, user]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await API.get('/bikes/brands');
        setBrands(response.data);
      } catch (err) {
        console.error('Error fetching brands:', err);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      if (!form.bikeBrand) return setModels([]);
      try {
        const response = await API.get(`/bikes/models/${encodeURIComponent(form.bikeBrand)}`);
        setModels(response.data);
      } catch (err) {
        console.error('Error fetching models:', err);
        setModels([]);
      }
    };
    fetchModels();
  }, [form.bikeBrand]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bookingData = {
      customerName: user?.name || '',
      email: user?.email || '',
      user: user?._id || '',
      bikeBrand: form.bikeBrand,
      bikeName: form.bikeName,
      serviceType: form.serviceType,
      bookingDate: form.bookingDate
    };

    try {
      await API.post('/bookings', bookingData);
      alert('Booking submitted successfully!');
      navigate('/customer-dashboard');
    } catch (err) {
      console.error('Booking failed:', err);
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Book a Bike Service</h2>

        <select name="bikeBrand" value={form.bikeBrand} onChange={handleChange} required>
          <option value="">Select Bike Brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>

        <select name="bikeName" value={form.bikeName} onChange={handleChange} required disabled={!form.bikeBrand}>
          <option value="">Select Bike Name</option>
          {models.map((model) => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>

        <select name="serviceType" value={form.serviceType} onChange={handleChange} required>
          <option value="">Select Service</option>
          {services.map((service, index) => (
            <option key={index} value={service}>{service}</option>
          ))}
        </select>

        <input
          type="date"
          name="bookingDate"
          value={form.bookingDate}
          onChange={handleChange}
          required
          min={new Date().toISOString().split('T')[0]}
        />
        
        <button type="submit" disabled={loading}>
          {loading ? 'Booking...' : 'Submit Booking'}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
