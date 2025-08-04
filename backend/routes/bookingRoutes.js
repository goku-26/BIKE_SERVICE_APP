const express = require('express');
const {
  createBooking,
  updateStatus,
  getBookings,
  getUserBookings,
  suggestService,
  acceptSuggestedService,
  getBookingsByCustomerEmail
} = require('../controllers/bookingController');

const router = express.Router();


router.post('/', createBooking);


router.put('/:id/status', updateStatus);


router.put('/:id/suggest-service', suggestService);


router.put('/:id/accept-suggested-service', acceptSuggestedService);


router.get('/', getBookings);


router.get('/user/:userId', getUserBookings);


router.get('/customer/:email', getBookingsByCustomerEmail);

module.exports = router;

