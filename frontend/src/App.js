import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Auth/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BookingForm from './components/Customer/BookingForm';
import CustomerDashboard from './components/Customer/CustomerDashboard'; 
import OwnerDashboard from './components/Owner/Dashboard';
import Services from './components/Owner/Services';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking-form" element={<BookingForm />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} /> 
        <Route path="/ownerdashboard" element={<OwnerDashboard />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  );
}

export default App;
