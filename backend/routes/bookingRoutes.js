const express = require('express');
const {
  createBooking,
  updateStatus,
  getBookings,
  getUserBookings,
  suggestService,
  acceptSuggestedService // ✅ Newly added
} = require('../controllers/bookingController');

const router = express.Router();

// Create a new booking
router.post('/', createBooking);

// Update booking status (used by owner)
router.put('/:id/status', updateStatus);

// Suggest additional service (used by owner)
router.put('/:id/suggest-service', suggestService);

// ✅ Accept suggested service (used by customer)
router.put('/:id/accept-suggested-service', acceptSuggestedService);

// Get all bookings (for admin/owner dashboard)
router.get('/', getBookings);

// Get bookings by user ID (for customer dashboard)
router.get('/user/:userId', getUserBookings);

module.exports = router;

