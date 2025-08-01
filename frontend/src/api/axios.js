import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Optional: You can also handle global response errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API response error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default API;

