const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));           // 🔐 Auth (Login/Register)
app.use('/api/services', require('./routes/serviceRoutes'));    // 🛠️ Service types
app.use('/api/bookings', require('./routes/bookingRoutes'));    // 📋 Bookings
app.use('/api/bikes', require('./routes/bikeRoutes'));          // 🚲 Bike Brands & Models

// Health Check
app.get('/', (req, res) => {
  res.send('🚀 Bike Service Booking API is running...');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong on the server.' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
