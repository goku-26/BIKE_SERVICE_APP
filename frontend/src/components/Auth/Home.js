import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="home-wrapper">
      {/* Navbar */}
      <div className="navbar">
        <h2>Bike Service Booking</h2>
        <div className="navbar-links">
          {user ? (
            <>
              <span>Welcome, {user.name || user.email}</span>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h3>Welcome to Bike Service Booking!</h3>
          <p>
            Book your bike servicing online in just a few clicks.
            Track status, get pickup times, and enjoy smooth service.
            Start by logging in or registering today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
