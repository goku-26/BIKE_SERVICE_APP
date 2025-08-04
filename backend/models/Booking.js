const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: String,
  bikeBrand: String,
  bikeName: String,
  serviceType: String,
  bookingDate: Date,
  status: { type: String, enum: ['Pending', 'Ready for Delivery', 'Completed'], default: 'Pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  email: String,
  cost: Number,
  pickupTime: String,
  suggestedService: { type: String, default: 'N/A' },
  ownerSuggestedService: { type: String, default: '' },
  suggestedServiceAccepted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Booking', bookingSchema);
