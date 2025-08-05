import React, { useState } from 'react';
import API from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/auth/register', formData);
      
      alert('Registration successful! Please login.');
      navigate('/login'); 
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed. Please check the fields.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Name"
          required
        />
        <input
          name="email"
          type="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Password"
          required
        />
        <input
          name="mobile"
          onChange={handleChange}
          value={formData.mobile}
          placeholder="Mobile"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
