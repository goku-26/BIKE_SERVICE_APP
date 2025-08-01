import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import API from '../../api/axios';
import '../../styles/BookingForm.css';

function BookingForm() {
  const [form, setForm] = useState({
    bikeBrand: '',
    bikeName: '',
    service: '',
    bookingDate: '',
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
    // Fetch all bike brands from backend
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
    // Fetch bike models when brand is selected
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
      ...form,
      customerName: user?.name || '',
      email: user?.email || '',
      user: user?._id || '',
    };

    try {
      await API.post('/bookings', bookingData);
      alert('Booking submitted successfully!');
      setForm({
        bikeBrand: '',
        bikeName: '',
        service: '',
        bookingDate: '',
      });
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

        {/* Bike Brand */}
        <select
          name="bikeBrand"
          value={form.bikeBrand}
          onChange={handleChange}
          required
        >
          <option value="">Select Bike Brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>

        {/* Bike Name */}
        <select
          name="bikeName"
          value={form.bikeName}
          onChange={handleChange}
          disabled={!form.bikeBrand}
          required
        >
          <option value="">Select Bike Name</option>
          {models.map((model) => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>

        {/* Service */}
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          required
        >
          <option value="">Select Service</option>
          {services.map((service, index) => (
            <option key={index} value={service}>{service}</option>
          ))}
        </select>

        {/* Booking Date */}
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
