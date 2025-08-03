const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


dotenv.config();


connectDB();


const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/auth', require('./routes/authRoutes'));           
app.use('/api/services', require('./routes/serviceRoutes'));    
app.use('/api/bookings', require('./routes/bookingRoutes'));   
app.use('/api/bikes', require('./routes/bikeRoutes'));      


app.get('/', (req, res) => {
  res.send('🚀 Bike Service Booking API is running...');
});


app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong on the server.' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
