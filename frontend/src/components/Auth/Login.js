import React, { useState } from 'react';
import API from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post('/auth/login', { email, password });

     
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

     
      if (res.data.user.isOwner) {
        localStorage.setItem('isOwner', true);
        navigate('/ownerdashboard');
      } else {
        navigate('/booking-form'); 
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please try again.';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="login-container">
    <h2 className="login-title">Login</h2>
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value.trim())}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  </div>
);
}

export default Login;
